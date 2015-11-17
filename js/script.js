$(document).ready(function() {
  if ( "geolocation" in navigator ) {
    /* geolocation is available */
    navigator.geolocation.getCurrentPosition(function(position) {
      /* We now have the user's position as lat and log */
      getWeather(position);
    });
  }

  $('.city-search').on('submit', function(e) {
    e.preventDefault();

    var self = $(this);

    getWeather({ city: self.find('input').val() });
  });
});

function getWeather(location) {
  $.simpleWeather({
    location: location.coords ? location.coords.latitude + ',' + location.coords.longitude : location.city,
    unit: 'c',
    success: function(weather) {
      /* We got the weather for the given location */
      console.log(weather);
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
