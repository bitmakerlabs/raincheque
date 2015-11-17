$(document).ready(function() {
  if ( "geolocation" in navigator ) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
      /* We now have the user's position as lat and log */
      getWeatherByPosition(position);
    });
  }

  $('.city-search').on('submit', function(e) {
    e.preventDefault();

    var self = $(this);

    getWeatherByCityName( self.find('input').val() );
  });
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

    drawMap(position);
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

    drawMap({
      coords: {
        latitude: data.coord.lat,
        longitude: data.coord.lon
      }
    });
  });
}

function drawMap(position) {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: position.coords.latitude, lng: position.coords.longitude },
    zoom: 13,
    draggable: false,
    disableDoubleClickZoom: true,
    scaleControl: false,
    scrollwheel: false,
    mapTypeControl: false,
    streetViewControl: false,
    zoomControl: false
  });
}
