const express = require("express"); 
const app = express();

app.get("/", function(req, res) {
    res.send("<h1>Hello world</h1>"); 
});

app.get("/contact", function(req, res) {
    res.send("Contact me at: zongqiooi.career@gmail.com"); 
});

app.get("/about", function(req, res) {
    res.send("My name is ZongQi Ooi and I love Ashleynguci! ❤️");
});

app.get("/hobbies", function(req, res) {
    res.send("<ul><li>Gym</li><li>Math</li></ul>");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
}); 

