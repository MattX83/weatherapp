//    Capitalizing the first letter of the weather string
function upperCase(str) {

    str = str.split(" ");

    for (var i = 0; i < str.length; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");

}
//Converting the date string into day and time does not currently work.  Need to figure out how to get everyday listed in the loop.
function weekDay(str) {
    //    could do a manual if then part to return day of week

    str = new Date();

    var date = str.toDateString();

    return str;
}

function createDayNode(date, icon, upperDesc, temp, feelLike) {
    var dayBlock = document.getElementById('forecast');
    
    var addDate = document.createTextNode(date);
//      console.log(addDate);   
    var addUpper = document.createTextNode(upperDesc);
//      console.log(addUpper);
    var addTemp = document.createTextNode(temp);
//      console.log(addTemp);
    var addFeel = document.createTextNode(feelLike);
//      console.log(addFeel);
    
    var theDay = document.createElement('p');
    theDay.appendChild(addDate);
    dayBlock.appendChild(theDay);
    
    var addIconElement = document.createElement('img');
    addIconElement.src = icon;
    dayBlock.appendChild(addIconElement);
    
    var theDesc = document.createElement('p');
    theDesc.appendChild(addUpper);
    dayBlock.appendChild(theDesc);
    
    var theTemp = document.createElement('p');
    theTemp.appendChild(addTemp);
    dayBlock.appendChild(theTemp);
    
    var theFeel = document.createElement('p');
    theFeel.appendChild(addFeel);
    dayBlock.appendChild(theFeel);  
       
}


//Pulling weather data from openweathermap and setting cuurent weather block.
$.getJSON("http://api.openweathermap.org/data/2.5/weather?zip=30517,us&units=imperial&appid=f299fe1664f7a29b0d3100ebe150b2a2", function (data) {
    console.log(data);

    var city = data.name;

    var icon = "http://api.openweathermap.org/img/w/" + data.weather[0].icon + ".png";

    var description = data.weather[0].description;

    var upperDesc = upperCase(description);

    var temp = Math.round(data.main.temp) + "\xB0";

    var feelLike = Math.round(data.main.feels_like) + "\xB0";

    //Creating the current weather block 
    $(".city").append("Location: " + city);
    $(".icon").attr("src", icon);
    $(".weather").append(upperDesc);
    $(".temp").append("Current Temp: " + temp);
    $(".feels").append("Feels Like: " + feelLike);
    

});

//Pulling and writing the 5-day forecast
$.getJSON("http://api.openweathermap.org/data/2.5/forecast?zip=30517,us&units=imperial&appid=f299fe1664f7a29b0d3100ebe150b2a2", function (data) {

    console.log(data);

    for (var i = 0; i < data.list.length; i++) {

        var date = data.list[i].dt_txt;

        var icon = "http://api.openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";

        var description = data.list[i].weather[0].description;

        var upperDesc = upperCase(description);

        var temp = Math.round(data.list[i].main.temp) + "\xB0";

        var feelLike = Math.round(data.list[i].main.feels_like) + "\xB0";


        /*   console.log(date); 
           console.log(icon);
           console.log(upperDesc);
           console.log("Temp: " + temp);
           console.log("Feels Like: " + feelLike);*/

        
        createDayNode(date,icon,upperDesc,temp,feelLike);

    };
})
