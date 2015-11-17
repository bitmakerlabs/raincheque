$(document).ready(function() {
  if ( "geolocation" in navigator ) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
      /* We now have the user's position as lat and log */
      getWeatherByPosition(position);
    });
  }
});

function getWeatherByPosition(position) {
  $.getJSON('http://api.openweathermap.org/data/2.5/weather', {
    lat: position.coords.latitude,
    lon: position.coords.longitude,
    appid: Raincheque.openWeatherMap.appId
  })
  .done(function(data) {
    /* We got the weather for the given location */
    console.log(data);
  });
}

function getWeatherByCityName(city) {
  $.getJSON('http://api.openweathermap.org/data/2.5/weather', {
    q: city,
    appid: Raincheque.openWeatherMap.appId
  })
  .done(function(data) {
    /* We got the weather for the given location */
    console.log(data);
  });
}
