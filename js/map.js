$( document ).ready(function() {
    var mapboxTiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
          maxZoom: 18,
          id: 'jahde.mmllmcng',
          accessToken: 'pk.eyJ1IjoiamFoZGUiLCJhIjoiNjk4ZGYyZGJkNWNjY2I1MzM4MTVlYmUxNmNiZTkzYzYifQ.stPmhXbpMlB7zX9v5KzFEA'
    });

    var map = L.map('map')
        .addLayer(mapboxTiles)
        .setView([40.736, -74.015], 13);

    // jQuery to grab the businesses JSON
    var promise = $.getJSON("businesses.json");
    promise.then(function(data) {

      // var allbusinesses = L.geoJson(data);
      // allbusinesses.addTo(map);
      L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
          return L.marker(latlng, {

          }).on('mouseover', function() {
            this.bindPopup(feature.properties.Name).openPopup();
          });
        }
      }).addTo(map);

      map.fitBounds(allbusinesses.getBounds(), {
        padding: [50, 50]
      })

      // console.log(data)
    })
});
