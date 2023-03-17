const express = require("express"); 
const https = require("https"); 
const bodyParser = require("body-parser"); 
const app = express(); 

app.use(bodyParser.urlencoded({extended: true})); 

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html"); 
}); 

app.post("/", function(req, res) {
    const query = req.body.city; 
    const apiKey = "e75d02e438cf7d1ed05fc1fa5b9d55c9"; 
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {
        response.on("data", function(data) {
            const weatherData = JSON.parse(data); 
            const temp = weatherData.main.temp; 
            const description = weatherData.weather[0].description; 
            const icon = weatherData.weather[0].icon; 
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<p>The weather description is " + description + "</p>"); 
            res.write("<h1>The temperature of " + query + " is " + temp + " Celsius.</h1>");
            res.write("<img src=" + imageURL + ">"); 
            res.send();
        }); 
    });
}); 

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is running on port 3000."); 
}); 