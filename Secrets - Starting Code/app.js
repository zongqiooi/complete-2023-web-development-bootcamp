require('dotenv').config(); 
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session"); 
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate"); 

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(session({
    secret: 'Our little secret.',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize()); 
app.use(passport.session()); 

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/userDB'); 

    const userSchema = new mongoose.Schema({
        email: String, 
        password: String, 
        googleId: String,
        secret: String  
    }); 

    userSchema.plugin(passportLocalMongoose);
    userSchema.plugin(findOrCreate); 

    const User = mongoose.model("User", userSchema); 
    
    passport.use(User.createStrategy()); 

    passport.serializeUser(function(user, done) {
        done(null, user.id); 
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    }); 

    passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/secrets"
      },
      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));

    app.get("/", function(req, res) {
        res.render("home"); 
    }); 

    app.route('/auth/google')
        .get(passport.authenticate('google', {
            scope: ['profile']
        }));
    
    app.get('/auth/google/secrets', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
          // Successful authentication, redirect home.
          res.redirect('/secrets');
    });
    
    app.get("/login", function(req, res) {
        res.render("login"); 
    }); 

    app.get("/register", function(req, res) {
        res.render("register"); 
    }); 

    app.get("/secrets", function(req, res) {
        res.render("secrets"); 
    }); 

    app.get("/submit", function(req, res) {
        res.render("submit"); 
    }); 

    app.get("/logout", function(req, res) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    }); 

    app.post("/register", function(req, res) {
        User.register({username: req.body.username}, req.body.password, function(err, user) {
            if (err) { 
                console.log(err); 
                res.redirect("/register"); 
            }
            else {
                passport.authenticate("local")(req, res, function() {
                    res.redirect("/secrets"); 
                }); 
            } 
        });
    }); 

    app.post("/login", passport.authenticate("local"), function(req, res){
        res.redirect("/secrets");
    });
    
    app.post("/submit", async function(req, res) {
        const submittedSecret = req.body.secret; 
        const foundUser = await User.findById({_id: req.user.id});

        if (foundUser) {
            foundUser.secret = submittedSecret; 
            foundUser.save(); 

            res.redirect("/secrets");
        }
        else {
            console.log("User is not found."); 
        }
    });

    app.listen(3000, function() {
        console.log("Server started on port 3000");
    });
}