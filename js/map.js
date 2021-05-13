const mapbox_token =
  "pk.eyJ1Ijoiam9leWNyZWF0b3IiLCJhIjoiY2tva253dHRxMDFhMzJubzF0NmNidTV1byJ9.fuQQQ11Nb0tnr-jbWemOsQ";

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/dark-v10",
  center: [-71.208, 46.8139],
  zoom: 6.0
});

// disable map zoom when using scroll
map.scrollZoom.disable();

map.on("load", function () {
  var layers = map.getStyle().layers;
  var firstSymbolId;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === "symbol") {
      firstSymbolId = layers[i].id;
      break;
    }
  }
  map.addSource("spcday1", {
    type: "geojson",
    data: "https://www.spc.noaa.gov/products/outlook/day1otlk_cat.nolyr.geojson"
  });

  map.addLayer({
    id: "spcday1",
    type: "fill",
    source: "spcday1",
    layout: {},
    paint: {
      "fill-color": ["get", "fill"],
      "fill-outline-color": ["get", "stroke"],
      "fill-opacity": 0.3
    }
  });
});

map.on("load", function () {
  map.addSource("places", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {
            description:
              "<strong>Norman, Oklahoma</strong><p>Norman is a city in the U.S. state of Oklahoma located 20 miles south of downtown Oklahoma City. As the county seat of Cleveland County and a part of the Oklahoma City metropolitan area, its population was 110,925 at the 2010 census</p>"
          },
          geometry: {
            type: "Point",
            coordinates: [-97.445938, 35.22105]
          }
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a Mad Men Season Five Finale Watch Party, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>"
          },
          geometry: {
            type: "Point",
            coordinates: [-77.003168, 38.894651]
          }
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>Big Backyard Beach Bash and Wine Fest</strong><p>EatBar (2761 Washington Boulevard Arlington VA) is throwing a Big Backyard Beach Bash and Wine Fest on Saturday, serving up conch fritters, fish tacos and crab sliders, and Red Apron hot dogs. 12:00-3:00 p.m. $25.</p>"
          },
          geometry: {
            type: "Point",
            coordinates: [-77.090372, 38.881189]
          }
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>Ballston Arts & Crafts Market</strong><p>The Ballston Arts & Crafts Market sets up shop next to the Ballston metro this Saturday for the first of five dates this summer. Nearly 35 artists and crafters will be on hand selling their wares. 10:00-4:00 p.m.</p>"
          },
          geometry: {
            type: "Point",
            coordinates: [-77.111561, 38.882342]
          }
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>A Little Night Music</strong><p>The Arlington Players' production of Stephen Sondheim's <em>A Little Night Music</em> comes to the Kogod Cradle at The Mead Center for American Theater (1101 6th Street SW) this weekend and next. 8:00 p.m.</p>"
          },
          geometry: {
            type: "Point",
            coordinates: [-77.020945, 38.878241]
          }
        },
        {
          type: "Feature",
          properties: {
            description:
              "<strong>Truckeroo</strong><p>Truckeroo brings dozens of food trucks, live music, and games to half and M Street SE (across from Navy Yard Metro Station) today from 11:00 a.m. to 11:00 p.m.</p>"
          },
          geometry: {
            type: "Point",
            coordinates: [-77.007481, 38.876516]
          }
        }
      ]
    }
  });

  map.addLayer({
    id: "places",
    type: "circle",
    source: "places",
    paint: {
      "circle-color": "#4264fb",
      "circle-radius": 6,
      "circle-stroke-width": 2,
      "circle-stroke-color": "#ffffff"
    }
  });

  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on("mouseenter", "places", function (e) {
    map.getCanvas().style.cursor = "pointer";

    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;

    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on("mouseleave", "places", function () {
    map.getCanvas().style.cursor = "";
    popup.remove();
  });
});
