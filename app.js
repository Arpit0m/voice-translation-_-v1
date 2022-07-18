const express = require("express");
const bodyParser = require("body-parser");
const translate = require('@vitalets/google-translate-api');
const EventEmitter = require("events");
const tunnel = require('tunnel');
const ejs = require("ejs");
const app = express();
const https = require("https");
const mongoose = require("mongoose");
const {
  on
} = require("events");


const output = [" "];



mongoose.connect("mongodb://localhost:27017/translationDB");

const userSchema = new mongoose.Schema({
  text: String,
  inputlanguage: String,
  outputlanguage: String
});

const Text = new mongoose.model("Text", userSchema);

const defaultText = new Text({
  text: "Hello select click convert this text to Hindi",
  inputlanguage: "en",
  outputlanguage: "hi",
});

// defaultText.save();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));



let query = " ";
let meanings = [];
let partOfSpeech = [];
let definations = [];
let audio = [];
let incorrectFlag = false;



app.get("/", function(req, res) {
  res.render("home");
})

app.get("/translate", function(req, res) {
  res.render("translate", {
    output: output
  });
});

app.get("/find", function(req, res) {
  res.render("find", {
    partOfSpeech: partOfSpeech,
    definations: definations,
    query: query,
    audio: audio,
    incorrectFlag: incorrectFlag
  });
  query = "";
  meanings = [];
  partOfSpeech = [];
  definations = [];
  audio = [];
  incorrectFlag = false;
});


app.post("/translate", function(req, res) {

  const inputText = req.body.text;

  let inputLang = req.body.inputLang;
  let outputLang = req.body.outputLang;
  let outputText = " ";
  console.log(req.body);
  translate(inputText, {
    to: outputLang,
    from: inputLang
  }).then(function(response) {
    outputText = response.text;
    output.push(outputText);
    res.redirect("/translate");

  });

});





const apiRoot = "https://api.dictionaryapi.dev/api/v2/entries/en";

app.post("/find", function(req, res) {
  query = req.body.word;
  const url = apiRoot + "/" + query;
  console.log(req.body);

  // console.log(url);  // testing
  https.get(url, function(response) {
    // console.log(response);   //testing
    console.log('statusCode', res.statusCode);
    console.log('headers', res.header);


    response.on('data', function(data) {
      const apiResponse = JSON.parse(data);
      if (apiResponse.title) {
        incorrectFlag = true;
        res.redirect("/find");
      } else {
        //   console.log(apiResponse.length);  // testing
        for (let i = 0; i < apiResponse.length; i++) {
          apiResponse[i].meanings.forEach(meaning => {
            meanings.push(meaning);

          });
          apiResponse[i].phonetics.forEach(phonetic => {
            audio.push(phonetic.audio);
          });

          console.log(audio);
        }


        meanings.forEach(meanings => {
          partOfSpeech.push(meanings.partOfSpeech);
          definations.push(meanings.definitions);
        });
        console.log(audio.length);
        // console.log(definations.length);   //testing
        //   console.log(meanings.length);    //testing
        //   console.log(partOfSpeech);       //testing


        res.redirect("/find");

      }



    });


  })


});




app.listen(3000, function(req, res) {

  console.log("server running");
});
