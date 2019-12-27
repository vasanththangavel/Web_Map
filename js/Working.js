document.body.onload = function mapcreation(){
    var OpenStreetMap_France =new L.tileLayer.provider('OpenStreetMap.France');
    var Esri_WI=new L.tileLayer.provider('Esri.WorldImagery');
    var Basemap={
        "<span style='color: black'>Street</span>" : OpenStreetMap_France,
        "<span style='color: black'>Satellite</span>":Esri_WI
    };
    var map = new L.map('map',{layers: [OpenStreetMap_France]},{drawControl: true}).setView([51.505, -0.09], 15);
    var drawnItems =new  L.FeatureGroup().addTo(map);
    L.control.layers(Basemap,{ 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);
    console.log("statment worked1")
    map.addControl(new L.Control.Draw({
        edit:{
            featureGroup:drawnItems,
            poly:{
                allowIntersection:false
            }
        },
        draw:{
            polygon:{
                allowIntersection:false,
                showArea: true
            }
        }     
    }));

    console.log("statment worked2")
    map.on(L.Draw.Event.CREATED, function(e) {
        var type=e.layerType;
        var layer = e.layer;
        drawnItems.addLayer(layer);
    });
     document.getElementById('delete').onclick = function(e) {
            drawnItems.clearLayers();
        }
    document.getElementById('export').onclick = function(e) {
        // Extract GeoJson from featureGroup
    var data = drawnItems.toGeoJSON();

        // Stringify the GeoJson
    var convertedData = 'text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data));

        // Create export
    document.getElementById('export').setAttribute('href', 'data:' + convertedData);
    document.getElementById('export').setAttribute('download','data.geojson');
    }
};


