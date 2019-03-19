if (window.navigator.geolocation) {
  // geolocation is available
  window.navigator.geolocation.getCurrentPosition((position) => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamRlaiIsImEiOiJjanRkaGx6b3gwa216NGFxZDF3bzBscHY4In0.XBJCeZ8R-moIfYJUwJsS_g';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [position.coords.longitude, position.coords.latitude],
      zoom: 13,
    });

    // let geojson = {
    //   type: 'FeatureCollection',
    //   features: [{
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: [2.188854217529297, 41.43085452425],
    //     },
    //     properties: {
    //       title: 'Mapbox',
    //       description: 'Java',
    //     },
    //   },
    //   {
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: [2.1865206956863403, 41.40263407490894],
    //     },
    //     properties: {
    //       title: 'Mapbox',
    //       description: 'Marketing',
    //     },
    //   }],
    // };

    // add markers to map
    var geojson = JSON.parse($('#points').text());
    $('#points').remove();
    geojson.features.forEach((marker) => {
      // create a HTML element for each feature
      const el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({ offset: 25 })
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
        .addTo(map);
    });

    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    }));

    map.on('click', (evt) => {
      socket.emit('map:selectedPosition', {
        pos: evt.lngLat,
      });
    });
  });
}
