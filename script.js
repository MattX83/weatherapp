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
	//        console.log(day);

	var date = eachDay.getDate();
	//    console.log(date);

	var month = convertMonth(eachDay.getMonth());
	//    console.log(month);


	var time = convertTime(eachDay.getHours());
	//    console.log(time);

	return day + "," + " " + month + " " + date + " | " + time;
}

/*gets day for the button innerHTML (This code should be refactored with the weekDay function and turn it into an object with methods.  That way it can handle any date or time need accross the app) */

function day(str) {
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
	var eachDay = new Date(str);
	var day = convertDay(eachDay.getDay());

	return day;
}

//Creates each day block div inside button
function createDayNode(date, icon, upperDesc, highTemp, lowTemp) {
	var dayBlock = document.getElementById("forecast");

	var addDate = document.createTextNode(date);
	//      console.log(addDate);   
	//var addDay = document.createTextNode(theDay);

	var addUpper = document.createTextNode(upperDesc);
	//      console.log(addUpper);
	var addHigh = document.createTextNode("High: " + highTemp);
	//      console.log(addTemp);
	var addLow = document.createTextNode("Low: " + lowTemp);
	//      console.log(addLow);



	var theDate = document.createElement("p");
	theDate.appendChild(addDate);
	theDate.setAttribute("class", "day");


	var addIconElement = document.createElement("img");
	addIconElement.src = icon;
	addIconElement.setAttribute("class", "icon");


	var theDesc = document.createElement("p");
	theDesc.appendChild(addUpper);
	theDesc.setAttribute("class", "weather");


	var theHigh = document.createElement("p");
	theHigh.appendChild(addHigh);
	theHigh.setAttribute("class", "high");


	var theLow = document.createElement("p");
	theLow.appendChild(addLow);
	theLow.setAttribute("class", "low");


	var dropDiv = document.createElement("DIV");
	dropDiv.setAttribute("class", "dropdown");
	dropDiv.setAttribute("class", "dropdown-content");
	dropDiv.appendChild(theDate);
	dropDiv.appendChild(theDesc);
	dropDiv.appendChild(addIconElement);
	dropDiv.appendChild(theHigh);
	dropDiv.appendChild(theLow);

	var newDiv = document.createElement("DIV");
	newDiv.setAttribute("id", "myDropdown");


	dayBlock.appendChild(dropDiv);



	//    var newLi = document.createElement("li");
	//    newLi.setAttribute("class", "panel");
	//    newLi.appendChild(theDay);
	//    newLi.appendChild(theDesc);
	//    newLi.appendChild(addIconElement);
	//    newLi.appendChild(theTemp);
	//    newLi.appendChild(theFeel);
	//    dayBlock.appendChild(newLi);


}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */



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
//$.getJSON("http://api.openweathermap.org/data/2.5/forecast?zip=30517,us&units=imperial&appid=f299fe1664f7a29b0d3100ebe150b2a2", function (data) {

//    console.log(data);
//
//    for (var i = 0; i < data.list.length; i++) {
//
//        var date = weekDay(data.list[i].dt_txt);
//
//        var theDay = day(data.list[i].dt_txt);
//
//        var icon = "http://api.openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png";
//
//        var description = data.list[i].weather[0].description;
//
//        var upperDesc = upperCase(description);
//
//        var temp = Math.round(data.list[i].main.temp) + "\xB0";
//
//        var feelLike = Math.round(data.list[i].main.feels_like) + "\xB0";


/*   console.log(date); 
   console.log(icon);
   console.log(upperDesc);
   console.log("Temp: " + temp);
   console.log("Feels Like: " + feelLike);*/

//createDayNode(date, theDay, icon, upperDesc, temp, feelLike);

//    };
//})

$.getJSON("https://api.openweathermap.org/data/2.5/onecall?lat=34.111046&lon=-83.815783&units=imperial&exclude=minutely,hourly&appid=f299fe1664f7a29b0d3100ebe150b2a2", function (data) {
	console.log(data);
	//Looping to get only 5 days of forecast
	for (var i = 1; i < data.daily.length - 2; i++) {

		var date = new Date(data.daily[i].dt * 1000).toDateString();
		//		console.log(date);

		var icon = "http://api.openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png";
		//		console.log(icon);

		var description = data.daily[i].weather[0].description;
		//console.log(description);

		var upperDesc = upperCase(description);
		//		console.log(upperDesc);

		var highTemp = Math.round(data.daily[i].temp.max) + "\xB0";
		//		console.log(highTemp);

		var lowTemp = Math.round(data.daily[i].temp.min) + "\xB0";
		//		console.log(lowTemp);

		createDayNode(date, icon, upperDesc, highTemp, lowTemp);
	};
})

//This function will show the current percipitation map

// Initialize and add the map
function initMap() {
  // The location of Uluru
  var uluru = {lat: 34.111046,
			lng: -83.815783};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 10, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
}


var radarLayer = "https://openweathermap.org/weathermap?basemap=map&cities=false&layer=radar&lat=34.111046&lon=-83.815783&zoom=10";
