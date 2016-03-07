var map,baseLayer,markerLayer,_cluster;
function init(){

	//set the map
	map = new OpenLayers.Map ("map", {
                controls:[
                    new OpenLayers.Control.Navigation(),
                    new OpenLayers.Control.PanZoomBar(),
                    new OpenLayers.Control.LayerSwitcher(),
					new OpenLayers.Control.ScaleLine(),
                    new OpenLayers.Control.Attribution()],
                units: 'm',
				center: new OpenLayers.LonLat(0, 0),
                projection: new OpenLayers.Projection("EPSG:900913"),
                displayProjection: new OpenLayers.Projection("EPSG:4326")
				} );
	
	
	//set base layer
	baseLayer = new OpenLayers.Layer.OSM("Open Street Map");
	map.addLayer(baseLayer);
	

	
	//set marker layer
	markerLayer = new OpenLayers.Layer.Markers("Markers");
	map.addLayer(markerLayer);
	
	
				 
	var cent = new OpenLayers.LonLat(0, 0).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
	map.setCenter(cent, 3);

	//set the cluster
	_cluster = new OpenLayers.myCluster({m:map});	
	
	var lonlat = new OpenLayers.LonLat(6,12);
	addMarker(lonlat);
	
	lonlat = new OpenLayers.LonLat(6,12.0923346);
	addMarker(lonlat);

	lonlat = new OpenLayers.LonLat(5.99827,12.2973);
	addMarker(lonlat);
	
	lonlat = new OpenLayers.LonLat(7,13.295743);
	addMarker(lonlat);
	
	lonlat = new OpenLayers.LonLat(6.813,11.1233);
	addMarker(lonlat);
	
	lonlat = new OpenLayers.LonLat(6.113,14.1233);
	addMarker(lonlat);
	
	lonlat = new OpenLayers.LonLat(27.113,45.1233);
	addMarker(lonlat);
	
	markerLayer.setZIndex(335);
	//init after all markers added
	_cluster.init();
	
	
    
	

}
function addMarker(lonlat){

	lonlat = lonlat.transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());            
	//icon
	var size = new OpenLayers.Size(42,32);
	var offset = new OpenLayers.Pixel(-size.w/2, -size.h);
	var icon = new OpenLayers.Icon('marker.png',size,offset);
	
	//create feature
	var feature = new OpenLayers.Feature(markerLayer, lonlat); 
	
	//feature data
	
	feature.popupClass =new OpenLayers.Class(OpenLayers.Popup.Anchored, {
                    'autoSize': false
                    
                });
	feature.data.icon = icon.clone();
	feature.data.lonlat = lonlat;
	feature.data.popupContentHTML = "<span>Hello</span>";
	feature.data.size = new OpenLayers.Size(100,50);
	
	//create marker
	var marker = feature.createMarker();
	markerLayer.addMarker(marker);
	


	//create popup ~ click popup
	feature.popup =  setPopup(lonlat,'popup1');
	map.addPopup(feature.popup);
	//create popup2 ~ hover popup
	feature.popup2 =  setPopup2(lonlat,'popup2');
	map.addPopup(feature.popup2);

	_cluster.af(feature);
	
}
function setPopup(ll, html) {
            
            popup = new OpenLayers.Popup(
                           null,
                           ll,
                           null,
                           html,
                           true);

            popup.div.style.padding = "0px";
			
            popup.overflow = 'hidden';
            popup.autoSize = false;
            popup.minSize = new OpenLayers.Size(180,300);
            popup.maxSize = new OpenLayers.Size(180,300);
			popup.padding = "22px 4px";
			

            popup.contentDiv.style.position = "relative";
			popup.contentDiv.style.wordBreak= "break-word";
			popup.contentDiv.style.display = "inline-block";
			popup.contentDiv.style.paddingTop = "5px";
			popup.contentDiv.style.paddingRight = "24px";
         
            popup.groupDiv.style.border = "0px";
            popup.groupDiv.style.margin = "0px";
            popup.groupDiv.style.fontSize = "12px";

            popup.div.style.overflow = "hidden";

            popup.groupDiv.style.overflow = "hidden";

            return popup;
	
        }
        function setPopup2 (ll,html) {
            if(html=='')html = 'undefined';
            popup = new OpenLayers.Popup(
                           null,
                           ll,
                           null,
                           html,
                           false);
            
            popup.div.style.width = "150px";
            popup.div.style.height = "auto";
            popup.div.style.padding = "0px";
            popup.div.style.border = "0px";
            popup.padding = 0;
            popup.overflow = 'hidden';
            popup.autoSize = true;
            popup.minSize = new OpenLayers.Size(100,22);
            popup.maxSize = new OpenLayers.Size(300,22);

            popup.contentDiv.style.fontSize = "12px";
            popup.contentDiv.style.padding = "3px";
            popup.contentDiv.style.margin = "0 auto";
            popup.contentDiv.style.border = "0px";
            popup.contentDiv.style.position = "relative";
           // popup.contentDiv.style.background = "#ffffef";
            popup.contentDiv.style.textAlign = "center";

            popup.groupDiv.style.padding = "0px";
            popup.groupDiv.style.border = "0px";
            popup.groupDiv.style.margin = "0px";

            popup.div.style.overflow = "hidden";

            popup.contentDiv.style.overflow = "hidden";
            popup.groupDiv.style.overflow = "hidden";



            return popup;
        }