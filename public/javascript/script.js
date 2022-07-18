const selectTag = document.querySelectorAll("select");

selectTag.forEach(tag => {
    for (const country_code in countries) {
          // console.log(countries[country_code]);
          const code = country_code.slice(0,-3);
          const id  = country_code;
          const name = countries[country_code];
          let options = ' <option value='+ code + ' class = "option"  >' + name +'</option>';
          tag.insertAdjacentHTML("beforeEnd",options);  

        

        }


});


// var exchange = document.querySelector("#exchangeButton");
// exchange.addEventListener("click" ,function(){
//   console.log("button clicked");
  
// })

var spoken = [];


$(".option").select(function (e)  {
  console.log("clicked");
})

$("#mic").click(function(event){
  
  alert("Select Languange from dropdown");
  
  $("#mic").addClass("btn-danger");
  recogniation.start();
 
});


window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition ;
const recogniation = new SpeechRecognition();
recogniation.interimResults = true;

// recogniation.lang = "hi-IN";

recogniation.onresult = function(event){
   
    console.log(event);
    spoken.push(event.results[0][0].transcript);
    $("#textbox").text(spoken[spoken.length-1]);
}
recogniation.onspeechend = function (event) {
  console.log( "speech eneded ");
  $("#mic").removeClass("btn-danger");
  
  
}



