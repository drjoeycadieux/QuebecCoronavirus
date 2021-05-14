const mapbox_token =
  "pk.eyJ1Ijoiam9leWNyZWF0b3IiLCJhIjoiY2tva253dHRxMDFhMzJubzF0NmNidTV1byJ9.fuQQQ11Nb0tnr-jbWemOsQ";

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-96.052335, 39.159882],
  zoom: 3.0
});

map.scrollZoom.disable();

map.on("load", function () {
  /** Add a custom vector tileset source. The tileset used in
   * this example contains a feature for every state and
   * county in the U.S.
   * Each state contains four properties. For example:
   *     {
   *         isState: true,
   *         name: "Wyoming",
   *         population: 584153,
   *         state: 56
   *     }
   * Each county contains four properties. For example:
   *     {
   *         county: 16049,
   *         isCounty: true,
   *         name: "Idaho County",
   *         population: 16315
   *     }
   */
  map.addSource("population", {
    type: "vector",
    url: "mapbox://mapbox.660ui7x6"
  });

  map.addLayer(
    {
      id: "state-population",
      source: "population",
      "source-layer": "state_county_population_2014_cen",
      maxzoom: zoomThreshold,
      type: "fill",
      // only include features for which the "isState"
      // property is "true"
      filter: ["==", "isState", true],
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["get", "population"],
          0,
          "#F2F12D",
          500000,
          "#EED322",
          750000,
          "#E6B71E",
          1000000,
          "#DA9C20",
          2500000,
          "#CA8323",
          5000000,
          "#B86B25",
          7500000,
          "#A25626",
          10000000,
          "#8B4225",
          25000000,
          "#723122"
        ],
        "fill-opacity": 0.75
      }
    },
    "waterway-label"
  );

  map.addLayer(
    {
      id: "county-population",
      source: "population",
      "source-layer": "state_county_population_2014_cen",
      minzoom: zoomThreshold,
      type: "fill",
      // only include features for which the "isCounty"
      // property is "true"
      filter: ["==", "isCounty", true],
      paint: {
        "fill-color": [
          "interpolate",
          ["linear"],
          ["get", "population"],
          0,
          "#F2F12D",
          100,
          "#EED322",
          1000,
          "#E6B71E",
          5000,
          "#DA9C20",
          10000,
          "#CA8323",
          50000,
          "#B86B25",
          100000,
          "#A25626",
          500000,
          "#8B4225",
          1000000,
          "#723122"
        ],
        "fill-opacity": 0.75
      }
    },
    "waterway-label"
  );
});

var stateLegendEl = document.getElementById("state-legend");
var countyLegendEl = document.getElementById("county-legend");
map.on("zoom", function () {
  if (map.getZoom() > zoomThreshold) {
    stateLegendEl.style.display = "none";
    countyLegendEl.style.display = "block";
  } else {
    stateLegendEl.style.display = "block";
    countyLegendEl.style.display = "none";
  }
});

/* fetch("daily-virus.json")
  .then((response) => response.json())
  .then((data) => {
    const { places, reports } = data;

    reports
      .filter((report) => !report.hide)
      .forEach((report) => {
        const { infected, placeId } = report;
        const currentPlace = place.find((place) => place.id == placeId);
        console.log(infected, currentPlace);

        // Set options
        new mapboxgl.Marker()
          .setLngLat([currentPlace.longitude, currentPlace.latitude])
          .addTo(map);
      });
  }); */
