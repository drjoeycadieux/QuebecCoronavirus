const mapbox_token =
    "pk.eyJ1Ijoiam9leWNyZWF0b3IiLCJhIjoiY2tva253dHRxMDFhMzJubzF0NmNidTV1byJ9.fuQQQ11Nb0tnr-jbWemOsQ";

mapboxgl.accessToken = mapbox_token;

var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/light-v10",
    center: [- 73.5673, 45.5017],
    zoom: 8.0
});

map.scrollZoom.disable();

map.on('load', function() {
    // Add a data source containing GeoJSON data.
    map.addSource('covid-data', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'geometry': {
                'type': 'Polygon',
                // These coordinates outline Maine.
                'coordinates': [
                    [
                        [- 73.5673, 45.5017],
                        [-73.7990, 45.4720],
                        [-73.8206, 45.4896]
                    ]
                ]
            }
        }
    });

    // Add a new layer to visualize the polygon.
    map.addLayer({
        'id': 'covid-data',
        'type': 'fill',
        'source': 'covid-data', // reference the data source
        'layout': {},
        'paint': {
            'fill-color': 'red', // blue color fill
            'fill-opacity': 0.5
        }
    });
    // Add a black outline around the polygon.
    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'covid-data',
        'layout': {},
        'paint': {
            'line-color': '#000',
            'line-width': 3
        }
    });
});