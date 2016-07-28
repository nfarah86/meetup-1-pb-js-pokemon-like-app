
function geoFindMe(){
var output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

      function success(position) {
      var lat1  = position.coords.latitude;
      var long1 = position.coords.longitude;

      output.innerHTML = '<p>Latitude is ' + lat1 + '° <br>Longitude is ' + long1 + '°</p>';

      mapLocation(lat1, long1);
    };

    function error() {
      output.innerHTML = "Unable to retrieve your location";
    };

    output.innerHTML = "<p>Locating…</p>";
    navigator.geolocation.getCurrentPosition(success, error);
  
    function mapLocation(lat1, long1) {


    L.mapbox.accessToken = 'pk.eyJ1IjoibmFkaW5lMTIxMiIsImEiOiJjaXI1cmh6b2IwMDh4ZzdubnRqdDFyNXlwIn0.mVYNJqMFyiQqXlKFpXj3Sg';
    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([lat1, long1], 25);

   // make a get request to nodal to get json

    var geoJson = [{
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [long1, lat1]
          },
          properties: {
              "icon": {
                  "iconUrl": "https://www.mapbox.com/mapbox.js/assets/images/astronaut2.png",
                  "iconSize": [25, 25], // size of the icon
                  "iconAnchor": [30, 30], // point of the icon which will correspond to marker's location
                  "className": "dot"
              }
          }
        },
        {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [-122.413682,37.775408]
            },
            properties: {
              "icon": {
                  "iconUrl": "https://www.mapbox.com/mapbox.js/assets/images/astronaut2.png",
                  "iconSize": [50, 50], // size of the icon
                  "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
                  "className": "dot"
              }
            }
    }];



    var myLayer = L.mapbox.featureLayer().addTo(map);

    myLayer.setGeoJSON(geoJson);

      function calcDistance(lat1, lat2, long1, long2) {
          var R = 6371e3; // metres
          var Δφ = toRadians(lat2-lat1);
          var Δλ = toRadians(long2-long1);

          var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(lat1) * Math.cos(lat2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          var d = R * c;
          console.log(d)
          return d;
      }

      function toRadians(Value) {
          return Value * Math.PI / 180;
      }

     myLayer.on('layeradd', function(e) {
      var marker = e.layer,
          feature = marker.feature;
      marker.setIcon(L.icon(feature.properties.icon));
    });

     myLayer.setGeoJSON(geoJson);

    myLayer.on('click', function(e) {
       var pokemonCoordinates =  e.layer.feature.geometry.coordinates
        var distance = calcDistance(lat1, pokemonCoordinates[1], long1, pokemonCoordinates[0]);
        if (distance < 100) {
            e.layer.feature.properties['oldIconUrl'] = e.layer.feature.properties.icon['iconUrl'];
            e.layer.feature.properties.icon['iconUrl'] = 'http://vignette2.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png/revision/latest?cb=20140520015336';
            myLayer.setGeoJSON(geoJson);
      }
    });
  }
}
