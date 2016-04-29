
var map = L.map('map-embed', {
    center: [30, -25],
    zoom: 3,
    scrollWheelZoom: false
});

var theme_colors = ["#fcec74", "#f7df05", "#f2bd0b", "#fff030", "#95D5D2", "#1F3050"];

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

var geojsonLayer = new L.layerGroup();

$.getJSON("//data.transformap.co/raw/5d6b9d3d32097fd68322008744001eec", function(data) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            var marker = L.circleMarker(latlng, {
                color: theme_colors[(Math.floor(Math.random() * 6) + 1)],
                opacity: 1,
                fillOpacity: 1,
            });
            return marker;
        },
        onEachFeature: createLayers
        });
    });

function createLayers(feature, featureLayer) {
	featureLayer.bindPopup('<a href="' + feature.properties.url + '"">' + feature.properties.name + '</a><p>' + feature.properties.concept + '</p>' );
    geojsonLayer.addLayer(featureLayer);
}

geojsonLayer.addTo(map);

