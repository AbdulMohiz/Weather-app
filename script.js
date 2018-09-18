
var lat;
var long;
var temp;

//check which button is pressed
var degreeButtonPressed = true;
var celsiusButtonPressed = false;




function getWeather(json) {
  var summary = json.currently.summary;
  var icon = json.currently.icon;
  if (degreeButtonPressed) {
    temp = Math.floor(json.currently.temperature);
    $(".temp").html(temp + " &#8457");
  } else {
    temp = Math.floor((json.currently.temperature - 32) * (5 / 9));
    $(".temp").html(temp + " &#8451");
  }
  $(".summary").html(summary);
  $(".icon").html('<canvas id="icon1" width="35" height="35"></canvas>');
  var skycons = new Skycons({
    "color": "white"
  });
  switch (icon) {
    case "rain":
      skycons.add("icon1", Skycons.RAIN);
      skycons.play();
      break;
    case "clear-day":
      skycons.add("icon1", Skycons.CLEAR_DAY);
      skycons.play();
      break;
    case "clear-night":
      skycons.add("icon1", Skycons.CLEAR_NIGHT);
      skycons.play();
      break;
    case "partly-cloudy-day":
      skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
      skycons.play();
      break;
    case "partly-cloudy-night":
      skycons.add("icon1", Skycons.PARTLY_CLOUDY_NIGHT);
      skycons.play();
      break;
    case "cloudy":
      skycons.add("icon1", Skycons.CLOUDY);
      skycons.play();
      break;
    case "sleet":
      skycons.add("icon1", Skycons.SLEET);
      skycons.play();
      break;
    case "snow":
      skycons.add("icon1", Skycons.SNOW);
      skycons.play();
      break;
    case "wind":
      skycons.add("icon1", Skycons.RAIN);
      skycons.play();
      break;
    case "fog":
      skycons.add("icon1", Skycons.FOG);
      skycons.play();
      break;
  }
}

function getLocation(json) {
  var location = json.results[2].formatted_address;
  $(".loc").html(location);
}

function getCoords() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude;
      var apiKey = "61b25c733c8f1e3632d05ed4ff0f51d9";
      var weather_url = "https://api.darksky.net/forecast/" + apiKey + "/" + lat + "," + long + "?callback=?";
      var apiKey2 = "AIzaSyA2FyNv1PAM55HTQWNruhOQ7ybP_GRMSso";
      var location_url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=" + apiKey2;
      $.getJSON(weather_url, getWeather);
      $.getJSON(location_url, getLocation);
    })
  }
}

$("#deg").on("click", function() {
  $("#deg").css("background-color", "black");
  $("#deg").css("color", "white");
  $("#cel").css("background-color", "white");
  $("#cel").css("color", "black");
  $(".temp").html('<p><i class="fa fa-spinner" aria-hidden="true"></i></p>');
  degreeButtonPressed = true;
  celsiusButtonPressed = false;
  getCoords();
});

$("#cel").on("click", function() {
  $("#cel").css("background-color", "black");
  $("#cel").css("color", "white");
  $("#deg").css("background-color", "white");
  $("#deg").css("color", "black");
  $(".temp").html('<p><i class="fa fa-spinner" aria-hidden="true"></i></p>');
  degreeButtonPressed = false;
  celsiusButtonPressed = true;
  getCoords();
})


getCoords();
getLocation();
getweather();