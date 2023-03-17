const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wikiDB'); 

    const articleSchema = new mongoose.Schema({
        title: String, 
        content: String 
    }); 

    const Article = mongoose.model("Article", articleSchema); 
    
    ////////////////// Request Targeting All Articles //////////////////

    app.route("/articles")
        .get(async function(req, res) {
            res.send(await Article.find({}));
        })
        .post(function(req, res) {
            console.log(req.body.title); 
            console.log(req.body.content); 

            const article = new Article({
                title: req.body.title, 
                content: req.body.content
            }); 

            article.save();
        })
        .delete(async function(req, res) {
            await Article.deleteMany({}); 
        }); 
    
    ////////////////// Request Targeting A Specific Article //////////////////

    app.route("/articles/:articleTitle")
        .get(async function(req, res) {
            const article = await Article.findOne({title: req.params.articleTitle});

            if (article) {
                res.send(await Article.findOne({title: req.params.articleTitle})); 
            }
            else {
                res.send("No such article is found!"); 
            }
        })
        .put(async function(req, res) {
            await Article.updateOne({title: req.params.articleTitle}, {title: req.body.title, content: req.body.content}, {overwrite: true});
        })
        .patch(async function(req, res) {
            await Article.updateOne({title: req.params.articleTitle}, {$set: req.body});
        })
        .delete(async function(req, res) {
            await Article.deleteOne({title: req.params.articleTitle}); 
        }); 
 
    app.listen(3000, function() {
        console.log("Server started on port 3000");
    });
}