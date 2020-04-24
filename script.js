//    Capitalizing the first letter of the weather string
function upperCase(str) {

    str = str.split(" ");

    for (var i = 0; i < str.length; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }
    return str.join(" ");

}
//Creates the day and time string
function weekDay(str) {
    //    could do a manual if then part to return day of week

    //Day number to name
    var convertDay = function (day) {
        if (day === 0) {
            return "Sunday"
        } else if (day === 1) {
            return "Monday"
        } else if (day === 2) {
            return "Tuesday"
        } else if (day === 3) {
            return "Wednesday"
        } else if (day === 4) {
            return "Thursday"
        } else if (day === 5) {
            return "Friday"
        } else {
            return "Saturday"
        }
    }

    //Hours 0 - 23 converted to am/pm 
    var convertTime = function (time) {
        if (time > 0 && time < 11) {
            return time + " a.m.";
        } else if (time >= 12 && time < 24) {
            if ((time - 12) === 0) {
                return "12 p.m."
            } else {
                var pmTime = time - 12;
                return pmTime + " p.m.";
            }
        } else {
            return "12 a.m";
        }
    }

    //Month number to name
    var convertMonth = function (month) {
        if (month === 0) {
            return "January";
        } else if (month === 1) {
            return "February";
        } else if (month === 2) {
            return "March";
        } else if (month === 3) {
            return "April";
        } else if (month === 4) {
            return "May";
        } else if (month === 5) {
            return "June";
        } else if (month === 6) {
            return "July";
        } else if (month === 7) {
            return "August";
        } else if (month === 8) {
            return "September";
        } else if (month === 9) {
            return "October";
        } else if (month === 10) {
            return "November";
        } else {
            return "December"
        }
    }


    var eachDay = new Date(str);
    //    console.log(eachDay);


    var day = convertDay(eachDay.getDay());
    //    console.log(day);

    var date = eachDay.getDate();
    //    console.log(date);

    var month = convertMonth(eachDay.getMonth());
    //    console.log(month);


    var time = convertTime(eachDay.getHours());
    //    console.log(time);

    return day + "," + " " + month + " " + date + " | " + time;
}

//Creates each day block li
function createDayNode(date, icon, upperDesc, temp, feelLike) {


    //var dayBlock = document.getElementById("fiveDay");

    var dayBlockOne = document.getElementById("one");
    var dayBlockTwo = document.getElementById("two");
    var dayBlockThree = document.getElementById("three");
    var dayBlockFour = document.getElementById("four");
    var dayBlockFive = document.getElementById("five");

    var addDate = document.createTextNode(date);
    //      console.log(addDate);   
    var addUpper = document.createTextNode(upperDesc);
    //      console.log(addUpper);
    var addTemp = document.createTextNode("Temp: " + temp);
    //      console.log(addTemp);
    var addFeel = document.createTextNode("Feels Like: " + feelLike);
    //      console.log(addFeel);


    var theDay = document.createElement("p");
    theDay.appendChild(addDate);
    theDay.setAttribute("class", "day");


    var addIconElement = document.createElement("img");
    addIconElement.src = icon;
    addIconElement.setAttribute("class", "icon");


    var theDesc = document.createElement("p");
    theDesc.appendChild(addUpper);
    theDesc.setAttribute("class", "weather");


    var theTemp = document.createElement("p");
    theTemp.appendChild(addTemp);
    theTemp.setAttribute("class", "temp");


    var theFeel = document.createElement("p");
    theFeel.appendChild(addFeel);
    theFeel.setAttribute("class", "feels");

    //Write this block to insert hour blocks under each day div
    if (date === "Saturday") {

    }

    var newLi = document.createElement("li");
    newLi.setAttribute("class", "extendedForecast");
    newLi.appendChild(theDay);
    newLi.appendChild(theDesc);
    newLi.appendChild(addIconElement);
    newLi.appendChild(theTemp);
    newLi.appendChild(theFeel);
    dayBlockOne.appendChild(newLi);
}


//Current weather block.
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
    $(".currentTemp").append("Current Temp: " + temp);
    $(".currentFeels").append("Feels Like: " + feelLike);


});

//Pulling and writing the 5-day forecast (EVERY 3 HOURS BLOCKS)
$.getJSON("http://api.openweathermap.org/data/2.5/forecast?zip=30517,us&units=imperial&appid=f299fe1664f7a29b0d3100ebe150b2a2", function (data) {

    console.log(data);

    for (var i = 0; i < data.list.length; i++) {

        var date = weekDay(data.list[i].dt_txt);

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

        //Potentially Rewrite code to send to organizeDay function, then in organizeDay call createDayNode 
        createDayNode(date, icon, upperDesc, temp, feelLike);

    };
})
