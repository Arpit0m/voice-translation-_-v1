

const express = require("express");
const bodyParser = require("body-parser");
const translate = require('@vitalets/google-translate-api');
const EventEmitter = require("events");
const tunnel = require('tunnel');
const ejs = require("ejs");
const app = express();

const mongoose = require("mongoose");

const output = [" "];


mongoose.connect("mongodb://localhost:27017/translationDB");

const userSchema = new mongoose.Schema({
    text : String,
    inputlanguage : String,
    outputlanguage : String
});

const Text = new mongoose.model("Text", userSchema);

const defaultText = new Text({
    text : "Hello select click convert this text to Hindi",
    inputlanguage : "en",
    outputlanguage : "hi",
});

// defaultText.save();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended :true}));








app.get("/",function(req,res){
    res.render("home");
})

app.get("/translate" ,function(req,res){
    res.render("translate" , {output : output});
});

app.get("/find",function(req,res){
    res.render("find");
});


app.post("/translate", function(req,res){

    const inputText = req.body.text;
    
    let inputLang = req.body.inputLang;
    let outputLang = req.body.outputLang;
    let outputText =" ";
    console.log(req.body);
    translate(inputText ,{ to : outputLang , from : inputLang}).then(function(response){
            outputText = response.text;
            output.push(outputText);
            res.redirect("/translate");
            
    });

});






app.listen(3000, function(req,res){

    console.log("server running");
})



//     key    ===    Zd/PM+c5iruFxufdQikXe5+GiaUovKWKGSVYe2cvrCj/81OQNHiZFw==