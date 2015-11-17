// NOTE: These are codes that are returned by Yahoo for rainy types of weather
var RAIN = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 17, 18, 35, 37, 38, 39, 40, 45, 47];

$(document).ready(function() {
  if ( "geolocation" in navigator ) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
      /* We now have the user's position as lat and log */
      getWeather(position);
    });
  }

  $('#get-started').on('click', function(e) {
    e.preventDefault();
    $('.weather-map, .weather').addClass('is-visible');
  })

  $('.city-search').on('submit', function(e) {
    e.preventDefault();

    var self = $(this),
        input = self.find('input');

    getWeather({ city: input.val() });

    // Clear out the input when we're done!
    input.val('');
  });
});

function getWeather(location) {
  $.simpleWeather({
    location: location.coords ? location.coords.latitude + ',' + location.coords.longitude : location.city,
    unit: 'c',
    success: function(weather) {
      /* We got the weather for the given location */
      console.log(weather);
      $('.weather-city-region').html(weather.city + ', ' + weather.country);
      $('.weather-currently').html(weather.currently);
      $('.weather-icon').html( $('<img>').attr('src', weather.image).attr('alt', weather.currently) );

      if ( RAIN.find(function(code) { return code === parseInt(weather.code, 10) }) ) {
        $('.weather-recommendation').html('Luckily you\'ve been saving your money for a day like today!');
      } else {
        $('.weather-recommendation').html('Time to put some money away for a rainy day!');
      }

      drawMap(location);
    }
  });
}

function drawMap(location) {
  if ( !Raincheque.map ) {
    var coords = { lat: location.coords.latitude || 43.7, lng: location.coords.longitude || 79.4 };

    Raincheque.map = new google.maps.Map(document.getElementById('map'), {
      center: coords,
      zoom: 12,
      draggable: false,
      disableDoubleClickZoom: true,
      scaleControl: false,
      scrollwheel: false,
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false
    });

    var marker = new google.maps.Marker({
        map: Raincheque.map,
        position: coords
    });
  }

  if ( Raincheque.map && location.city ) {
    var geocoder = new google.maps.Geocoder();

    geocoder.geocode( { 'address': location.city }, function(results, status) {
      if ( status === google.maps.GeocoderStatus.OK ) {
        Raincheque.map.setCenter(results[0].geometry.location);

        var marker = new google.maps.Marker({
            map: Raincheque.map,
            position: results[0].geometry.location
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}
