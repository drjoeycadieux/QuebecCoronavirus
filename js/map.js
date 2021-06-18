fetch('https://api.covid19api.com/summary')
.then(res => res.json())
.then(data => {
  console.log(data);
});

mapboxgl.accessToken = 'pk.eyJ1Ijoiam9leWNyZWF0b3IiLCJhIjoiY2tva253dHRxMDFhMzJubzF0NmNidTV1byJ9.fuQQQ11Nb0tnr-jbWemOsQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/dark-v10',
  center: [-96.052335, 39.159882],
  zoom: 4.5
});

map.scrollZoom.disable();