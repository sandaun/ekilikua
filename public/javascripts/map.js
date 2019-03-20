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
        .setHTML('<h3><a href=' + marker.properties.link + '>' + marker.properties.title + '</a></h3><p>' + marker.properties.description + '</p>'))
        .addTo(map);
    });

    map.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    }));

    map.on('click', (evt) => {
      // Send position to server
      socket.emit('map:selectedPosition', {
        pos: evt.lngLat,
      });

      console.log(evt);

      if ($('#lng') && $('#lat')) {
        $('#lng').val(evt.lngLat.lng);
        $('#lat').val(evt.lngLat.lat);
      }
    });
  });
}
