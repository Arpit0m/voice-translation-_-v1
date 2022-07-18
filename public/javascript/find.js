var audioArray = $(".audioUrl");
var audioElements = [];
console.log(audioArray);

for (let i = 0; i < audioArray.length; i++)      // removing empty characters from array 
{
    if (audioArray[i].innerText === "") {
        continue;
    } else {
       audioElements.push(audioArray[i].innerText);
    }
    
}
let index = Math.floor(Math.random()*audioElements.length);

if (audioElements.length === 0) {
    $("#audioButton").addClass("d-none");
}


$("#audioButton").click(function(){
    var audio = new Audio(audioElements[index])
    audio.play();
 });

