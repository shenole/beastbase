function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    mapTypeId: 'satellite',
    center: {lat: 20, lng: 0},
    zoom: 2
  });
}
