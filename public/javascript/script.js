const selectTag = document.querySelectorAll("select");

selectTag.forEach(tag => {
    for (const country_code in countries) {
          console.log(countries[country_code]);
          const code = country_code.slice(0,2);
          const name = countries[country_code];
          let options = ' <option value='+ code + '>' + name +'</option>';
          tag.insertAdjacentHTML("beforeEnd",options);  
        }


});


var exchange = document.querySelector("#exchangeButton");
exchange.addEventListener("click" ,function(){
  console.log("button clicked");
  
})




