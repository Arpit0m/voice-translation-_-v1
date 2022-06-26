

const express = require("express");
const bodyParser = require("body-parser");
const translate = require('@vitalets/google-translate-api');
const tunnel = require('tunnel');
const ejs = require("ejs");
const app = express();

const output = [" "];



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
    translate(inputText ,{ to : outputLang}).then(function(response){
            outputText = response.text;
            output.push(outputText);
            res.redirect("/translate");
            
    });

});






app.listen(3000, function(req,res){

    console.log("server running");
})



//     key    ===    Zd/PM+c5iruFxufdQikXe5+GiaUovKWKGSVYe2cvrCj/81OQNHiZFw==