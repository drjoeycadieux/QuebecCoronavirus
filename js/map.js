const mapbox_token =
  "pk.eyJ1Ijoiam9leWNyZWF0b3IiLCJhIjoiY2tva253dHRxMDFhMzJubzF0NmNidTV1byJ9.fuQQQ11Nb0tnr-jbWemOsQ";

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-96.052335, 39.159882],
  zoom: 3.0
});

/*map.scrollZoom.disable(); */

fetch("/daily-virus.json")
  .then((response) => response.json())
  .then((data) => {
    const { places, reports } = data;

    reports
      .filter((report) => !report.hide)
      .forEach((report) => {
        const { infected, placeId } = report;
        const currentPlace = places.find((place) => place.id === placeId);

        new mapboxgl.Marker({})
          .setLngLat([currentPlace.longitude, currentPlace.latitude])
          .addTo(map);
      });
  });
