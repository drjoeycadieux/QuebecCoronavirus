const mapbox_token =
  "pk.eyJ1Ijoiam9leWNyZWF0b3IiLCJhIjoiY2tva253dHRxMDFhMzJubzF0NmNidTV1byJ9.fuQQQ11Nb0tnr-jbWemOsQ";

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-96.052335, 39.159882],
  zoom: 3.5
});

// disable map zoom when using scroll
map.scrollZoom.disable();

fetch("/get-latest.json")
  .then((response) => response.json())
  .then((data) => {
    // const places = data.places;
    // const reports = data.reports;
    const { places, reports } = data;



     .filter(report => !report.hide)
     .forEach(report => {
      const { infected, placeId } = report;
      const currentPlace = place.find(place => place.Id == placeId);



      var marker = new mapboxgl.Marker()
      .setLngLat([currentPlace.longitude, currentPlace.latitude])
      .addTo(map);
     });
  });