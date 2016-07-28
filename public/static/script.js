
function geoFindMe(){
var output = document.getElementById("out");

    if (!navigator.geolocation){
      output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
      return;
    }

      function success(position) {
      var latitude  = position.coords.latitude;
      var longitude = position.coords.longitude;

      output.innerHTML = '<p>Latitude is ' + latitude + '° <br>Longitude is ' + longitude + '°</p>';

      mapLocation(latitude, longitude);
    };

    function error() {
      output.innerHTML = "Unable to retrieve your location";
    };

    output.innerHTML = "<p>Locating…</p>";
    navigator.geolocation.getCurrentPosition(success, error);
  
    function mapLocation(latitude, longitude) {


    L.mapbox.accessToken = 'pk.eyJ1IjoibmFkaW5lMTIxMiIsImEiOiJjaXI1cmh6b2IwMDh4ZzdubnRqdDFyNXlwIn0.mVYNJqMFyiQqXlKFpXj3Sg';
    var map = L.mapbox.map('map', 'mapbox.streets')
        .setView([latitude, longitude], 25);

    var geoJson = [{
          type: 'Feature',
          geometry: {
              type: 'Point',
              coordinates: [longitude, latitude]
          },
          properties: {
              // title: 'Marker One',
              // 'marker-color': '#bbb'
              "icon1": {
                  "iconUrl": "https://www.mapbox.com/mapbox.js/assets/images/astronaut2.png",
                  "iconSize": [25, 25], // size of the icon
                  "iconAnchor": [30, 30], // point of the icon which will correspond to marker's location
                  "className": "dot"
                  }
          }
    }];



    var myLayer = L.mapbox.featureLayer().addTo(map);

    myLayer.setGeoJSON(geoJson);

    function catchPokemon() {
        for (var i = 0; i < geoJson.length; i++) {
            geoJson[i].properties.icon1['iconUrl'] = geoJson[i].properties.icon1['oldIconUrl'] ||
                geoJson[i].properties.icon1['iconUrl'];
        }
    }

    myLayer.on('layeradd', function(e) {
      var marker = e.layer,
          feature = marker.feature;
      marker.setIcon(L.icon(feature.properties.icon1));
    });

    myLayer.setGeoJSON(geoJson);

    myLayer.on('click', function(e) {
        catchPokemon();
        e.layer.feature.properties['oldIconUrl'] = e.layer.feature.properties.icon1['iconUrl'];
        e.layer.feature.properties.icon1['iconUrl'] = 'http://vignette2.wikia.nocookie.net/pokemon-fano/images/6/6f/Poke_Ball.png/revision/latest?cb=20140520015336';
        myLayer.setGeoJSON(geoJson);
    });

}

}



        // var geojson = [
        //   {
        //     "type": "Feature",
        //     "geometry": {
        //       "type": "Point",
        //       "coordinates": [-121.929, 37.730]
        //     },
        //     "properties": {
        //       "title": "Mapbox DC",
        //       "description": "1714 14th St NW, Washington DC",
        //       "image": "https://farm9.staticflickr.com/8604/15769066303_3e4dcce464_n.jpg",
        //       "icon": {
        //           "iconUrl": "https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png",
        //           "iconSize": [50, 50], // size of the icon
        //           "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
        //           "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
        //           "className": "dot"
        //       }
        //     }
        //   },
        //   {
        //     "type": "Feature",
        //     "geometry": {
        //       "type": "Point",
        //       "coordinates": [-122.413682,37.775408]
        //     },
        //     "properties": {
        //       "title": "Mapbox SF",
        //       "description": "155 9th St, San Francisco",
        //       "image": "https://farm9.staticflickr.com/8571/15844010757_63b093d527_n.jpg",
        //       "icon": {
        //           "iconUrl": "https://www.mapbox.com/mapbox.js/assets/images/astronaut2.png",
        //           "iconSize": [50, 50], // size of the icon
        //           "iconAnchor": [25, 25], // point of the icon which will correspond to marker's location
        //           "popupAnchor": [0, -25], // point from which the popup should open relative to the iconAnchor
        //           "className": "dot"
        //       }
        //     }
        //   }
        // ];


  //       myLayer.on('layeradd', function(e) {



  //         var marker = e.layer,
  //           feature = marker.feature;
  //         marker.setIcon(L.icon(feature.properties.icon));
          

  //         var content = '<h2>'+ feature.properties.title+'<\/h2>' + '<img src="'+feature.properties.image+'" alt="">';
  //         marker.bindPopup(content);

  //       });
  //       myLayer.setGeoJSON(geojson);
  //       mapTooltipsJS.scrollWheelZoom.disable();

  // }



// });

