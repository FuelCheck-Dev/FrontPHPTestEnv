
var placesGroupData = new Array;
placesGroupData.groups = new Array; 
placesGroupData.edit_group_id = false;
var placesMarkerData = new Array;


function placesExport() {
    if (utilsCheckPrivileges("viewer")==true && utilsCheckPrivileges("subuser")==true &&  gsValues.map_bussy != true) {
        window.location = "func/fn_export.php?format=plc";
    }
}



function placesMarkerReload() {
    placesGroupLoadData(); 
    placesMarkerLoadData(); 
    $("#side_panel_places_marker_list_grid").trigger("reloadGrid");
}

function placesMarkerSetListNumber() {
    document.getElementById("side_panel_places_markers_num").innerHTML = "(" +
        Object.keys(placesMarkerData.markers).length + ")"
}



function placesZoneAddZoneToMap(id, name, color, visible, name_visible, area, vertices) {
	
    var latLngs = placesZoneVerticesStringToLatLngs(vertices);
    var polygon = L.polygon(latLngs, {
            color: color,
            fill: true,
            fillColor: color,
            fillOpacity: .4,
            opacity: .8,
            weight: 3
        });
  
    if(area !="0"){
    var	measure_area = getAreaFromLatLngs(polygon.getLatLngs()[0]);
    
    	if(area =="1"){
    		measure_area*= 247105e-9;
    		measure_area = Math.round(100 * measure_area) / 100;
    		measure_area = measure_area + " " + la.UNIT_ACRE;
    		
    	}
    	if(area =="2"){
    		 measure_area *= 1e-4; 
    		 measure_area = Math.round(100 * measure_area) / 100;
    		 measure_area = measure_area + " " + la.UNIT_HECTARES;
    		 	
    	}
    	if(area =="3"){
    		measure_area = Math.round(100 * measure_area) / 100;
    		measure_area = measure_area + " " + la.UNIT_SQ_M;
    		
    	}
    	
    	if(area =="4"){
    		measure_area = measure_area *= 1e-6;
    		measure_area = Math.round(100 * measure_area) / 100;
    		measure_area = measure_area + " " + la.UNIT_SQ_KM;	
    	}

    	if(area =="5"){
    		measure_area = measure_area *= 10.7639;
    		measure_area = Math.round(100 * measure_area) / 100;
    		measure_area = measure_area + " " + la.UNIT_SQ_FT;	
    	}
    	
    	if(area =="6"){
    		measure_area =1e-6 * measure_area *.386102;
    		measure_area = Math.round(100 * measure_area) / 100;
    		measure_area = measure_area + " " + la.UNIT_SQ_MI;	
    	}
    	name = name + " (" + measure_area + ")";
    }
    
    var center = polygon.getBounds().getCenter();
    var  tooltip= L.tooltip({
    	permanent: false,
        direction: "center"
    });
    
    tooltip.setLatLng(center);
    tooltip.setContent(name);
    polygon.bindPopup(name);
    //polygon.bindTooltip(tooltip);
    if(visible !="false"){
    	mapLayers.places_zones.addLayer(polygon);
    	
    	if(!("false" == name_visible && "0" == area)){
  	
    //	 mapLayers.places_zones.addLayer(tooltip);
    	 placesZoneData.zones[id].zone_layer = polygon;
    	 placesZoneData.zones[id].label_layer = tooltip;
    	
    }
    

}
}

function placesZoneRemoveAllFromMap() {
    mapLayers.places_zones.clearLayers();
}


function placesZoneSearchMap(e) {
    for (var zoneIndex in placesZoneData.zones) {
        var zone = placesZoneData.zones[zoneIndex];
        if(strMatches(zone.data.name, e)){
        	if(true == zone.visible){ 
        	placesZoneVisible(zoneIndex, true);
        	}else{
            placesZoneVisible(zoneIndex, false);
        }
    }
}
}

function placesZoneDeleteAll() {
    if(utilsCheckPrivileges("viewer") == true  && utilsCheckPrivileges("subuser") == true && 
    	true != gsValues.map_bussy ){ 
    	confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE,
            function(e) {
                if (e) {
                    $.ajax({
                        type: "POST",
                        url: "func/fn_places.php",
                        data: {
                            cmd: "delete_all_zones"
                        },
                        success: function(res) {
                            if("OK" == res){ 
                            placesZoneLoadData(); 
                            $("#side_panel_places_zone_list_grid").trigger("reloadGrid");
                            }
                        }
                    })
                }
            })
    }
}
function placesZoneInitLists() {
    initSelectList("report_zone_list"); 
    initSelectList("events_zone_list");
    initSelectList("subaccounts_zone_list");
}

function placesZoneSetListNumber() {
    document.getElementById("side_panel_places_zones_num").innerHTML = "(" +
        Object.keys(placesZoneData.zones).length + ")";
}

function placesZoneSetListCheckbox() {
    for (var groupIndex in placesGroupData.groups) {
    	placesSetListCheckbox("zone_group_visible_" + groupIndex, placesGroupData.groups[groupIndex].zone_visible);
    }
    for (var zoneIndex in placesZoneData.zones){ 
    	placesSetListCheckbox("zone_visible_" +zoneIndex, placesZoneData.zones[zoneIndex].visible);
    }
}

function placesZoneAddAllToMap() {
    var panel_places_zone_list = document.getElementById("side_panel_places_zone_list_search").value;
    for (var id in placesZoneRemoveAllFromMap(), placesZoneData.zones) {
        var zone = placesZoneData.zones[id];
        if (strMatches(zone.data.name, panel_places_zone_list)) {
            var name = zone.data.name;
            var color = zone.data.color;
            var visible = zone.data.visible;
            var name_visible = zone.data.name_visible;
            var area = zone.data.area;
            var vertices = zone.data.vertices;
            try {
                placesZoneAddZoneToMap(id, name, color, visible, name_visible, area, vertices)
            } catch (e) {}
        }
    }
}

function placesZoneNew(e) {
	  if(utilsCheckPrivileges("viewer")==true && true != gsValues.map_bussy) { 
	    map.doubleClickZoom.disable();
	     gsValues.map_bussy = true; 
	     document.getElementById("dialog_places_zone_name").value = la.NEW_ZONE + " " + placesZoneData.new_zone_id; 
	     document.getElementById("dialog_places_zone_group").value = 0; 
	     $("#dialog_places_zone_group").multipleSelect("refresh"); 
	     document.getElementById("dialog_places_zone_color").value = "FF0000";
	     document.getElementById("dialog_places_zone_color").style.backgroundColor = "#FF0000"; 
	     document.getElementById("dialog_places_zone_visible").checked = !0; 
	     document.getElementById("dialog_places_zone_name_visible").checked = !0;
	     document.getElementById("dialog_places_zone_area").value = 0; 
	     $("#dialog_places_zone_area").multipleSelect("refresh"); 
	     $("#dialog_places_zone_properties").dialog("open");
	     if( null != e ){
	      map.editTools.startPolygon(e)
	      }else { 
	        map.editTools.startPolygon(); 
	        map.on("editable:drawing:end", function(e) {
	              placesZoneData.edit_zone_layer = e.layer; 
	              if(placesZoneData.edit_zone_layer.getLatLngs()[0].length < 3){
	                  placesZoneProperties("cancel");
	               }else{ 
	                 if(placesZoneData.edit_zone_layer.getLatLngs()[0].length > 220){
	                  notifyBox("error", la.ERROR, la.ZONE_CANT_HAVE_MORE_THAN_NUM_VERTICES)
	                  }else{ 
	                    map.off("editable:drawing:end");
	                  }
	                }
	          });
	}
	  }
	}


function placesMarkerLoadData() {
    $.ajax({
        type: "POST",
        url: "func/fn_places.php",
        data: {
            cmd: "load_marker_data"
        },
        dataType: "json",
        cache: false,
        success: function(result) {
            placesMarkerData.markers = result; 
            placesMarkerInitLists();
            placesMarkerSetListCheckbox();
            placesMarkerSetListNumber(); 
          if("" != placesMarkerData.markers){
             placesMarkerAddAllToMap();
          }else{
             placesMarkerRemoveAllFromMap();
          }
        }
    })
}
function placesMarkerInitLists() {
    initSelectList("subaccounts_marker_list");
}

function placesCSVToPLC(source) {

var entity = false;
var data = {
  plc: "0.1v",
  markers: new Array,
  routes: new Array,
  zones: new Array
};
for(var i=0; i< source.length;i++){
var entityRow = source[i];
if(t == false){
if(entityRow.name !=null && entityRow.desc !=null && entityRow.icon != null && entityRow.visible != null && entityRow.lat != null && entityRow.lng != null  ){
  entity = "marker";
}else if(entityRow.name !=null && entityRow.color !=null  && entityRow.visible != null && entityRow.name_visible != null && entityRow.deviation != null && entityRow.points !=null){
  entity = "route";
}else if(entityRow.name !=null && entityRow.color !=null  && entityRow.visible != null && entityRow.name_visible != null && entityRow.area != null && entityRow.vertices !=null){
  entity = "zone";
}
}

if(entity == "marker"){
  data.markers.push({
    name: entityRow.name,
    desc: entityRow.desc,
    icon: "img/markers/places/" + entityRow.icon,
    visible: entityRow.visible,
    lat: entityRow.lat,
    lng: entityRow.lng
});
}
if (entity == "route"){ 
  data.routes.push({
  name: entityRow.name,
  color: entityRow.color,
  visible: entityRow.visible,
  name_visible: entityRow.name_visible,
  deviation: entityRow.deviation,
  points: entityRow.points
});
}

if (entity == "zone"){ 
  data.zones.push({
    name: entityRow.name,
    color: entityRow.color,
    visible: entityRow.visible,
    name_visible: entityRow.name_visible,
    area: entityRow.area,
    vertices: entityRow.vertices
});
}

}
return data;
}



function placesImportPLCFile(e) {
	  var files = e.target.files;
	  var    reader = new FileReader;
	  reader.onload = function(result) {
	      try {

	        var plc ="";
	        var plcJson = "";
	          if ("kml" == files[0].name.split(".").pop().toLowerCase()){
	              plc = placesKMLToPLC((new X2JS).xml_str2json(result.target.result));
	               plcJson = JSON.stringify(plc);
	          }
	          else if ("csv" == files[0].name.split(".").pop().toLowerCase()){
	          plc =placesCSVToPLC(csv2json(result.target.result)); 
	          plcJson = JSON.stringify(plc);
	        }
	          else {
	            plc = $.parseJSON(result.target.result);
	            plcJson = result.target.result;
	          }
	          if ("0.1v" == plc.plc) {
	              var markersLength = plc.markers.length;
	              var routesLength=   plc.routes.length;
	              var zonesLength =     plc.zones.length;
	              if (0 == markersLength && 0 == routesLength && 0 == zonesLength){
	                 return void notifyBox("info", la.INFORMATION, la.NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
	              }else{
	              confirmDialog(sprintf(la.MARKERS_ROUTES_ZONES_FOUND, markersLength, routesLength,zonesLength) + " " + la.ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
	                  function(confirm) {
	                      if (confirm) {
	                          loadingData(true);
	                          var data = {
	                              format: "plc",
	                              data: plcJson,
	                              markers: true,
	                              routes: true,
	                              zones: true
	                          };
	                          $.ajax({
	                              type: "POST",
	                              url: "func/fn_import.php",
	                              data: data,
	                              cache: false,
	                              success: function(res) {
	                                  loadingData(false); 
	                                  if( "OK" == res){
	                                    placesMarkerLoadData();
	                                    placesRouteLoadData();
	                                    placesZoneLoadData();
	                                $("#side_panel_places_marker_list_grid").trigger("reloadGrid"); 
	                                $("#side_panel_places_route_list_grid").trigger("reloadGrid"); 
	                                $("#side_panel_places_zone_list_grid").trigger("reloadGrid")
	                                }
	                                 if("ERROR_MARKER_LIMIT" == res){ 
	                                   notifyBox("error", la.ERROR, la.MARKER_LIMIT_IS_REACHED);
	                                 }
	                                 if("ERROR_ROUTE_LIMIT" == res){ 
	                                   notifyBox("error", la.ERROR, la.ROUTE_LIMIT_IS_REACHED);
	                                 }
	                                 if("ERROR_ZONE_LIMIT" == res){ 
	                                  notifyBox("error", la.ERROR, la.ZONE_LIMIT_IS_REACHED);
	                                 }
	                              },
	                              error: function(e, t) {
	                                  loadingData(false);
	                              }
	                          })
	                      }
	                  })
	                }
	          } else notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
	      } catch (e) {
	          notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
	      }
	      document.getElementById("load_file").value = "";
	  }; 
	  reader.readAsText(files[0], "UTF-8"); 
	  this.removeEventListener("change",placesImportPLCFile, false);
	}



function placesImport() {
	if(utilsCheckPrivileges("viewer")==true && utilsCheckPrivileges("subuser") == true ){
		document.getElementById("load_file").addEventListener("change", placesImportPLCFile, false);
		document.getElementById("load_file").click();
		
	}

}


function placesKMLToPLC(root) {
	var  suffixMarker = 1;
	var suffixZone  =1;
var result = {
			plc: "0.1v",
            markers: new Array,
            routes: new Array,
            zones: new Array
			}	
var polyStyle = root.kml.Document.Style;
var styleMap = root.kml.Document.StyleMap;
var placemarks = root.kml.Document.Folder.Placemark;

for(i =0; i<placemarks.length; i++){
	var placemark = placemarks[i];
	if(placemark.Point != null ){
		
		if(placemark.name !=null){
			var name = placemark.name;
		}else{
			name = "Marker " + suffixMarker;
			suffixMarker +=1;
		}
		if(placemark.description.__text !=null){
			var desc = placemark.description.toString();
		}else{
			desc = "";
		}
		var latlang = placemark.Point.coordinates.split(",");
		var lng = latlang[0];
		var lat = latlang[1];
	 result.markers.push({
                name: name,
                desc: desc,
                icon: "img/markers/places/pin-1.svg",
                visible: "true",
                lat: lat,
                lng: lng
            })
	
}

	if (placemark.Polygon != null){
		if(placemark.name !=null){
			var name = placemark.name;
		}else{
			name = "Zone " + suffixZone;
			suffixZone +=1;
		}
		var color = "#FF6738";
		var styleUrl = placemark.styleUrl;
		if(styleMap != undefined){
		for(var j =0 ; j <styleMap.length ; ++j){
			if(styleUrl == "#" + styleMap[j]._id ){
					for(var k = 0; k<polyStyle.length; ++k){
						if(styleMap[j].Pair[0].styleUrl == "#" + polyStyle[k]._id){
							color  = "#" + polyStyle[j].PolyStyle.color.slice(0,-2);
							break;
						}
						
					}

				break;
			}
			
		}
		}else{
			color = "#" +	polyStyle.PolyStyle.color.slice(0,-2);
		}

		var coordinates = placemark.Polygon.outerBoundaryIs.LinearRing.coordinates.split(" ");
		 if(coordinates.length <= 80 ){
		
			 for ( var vertices = [] , j = 0; j < coordinates.length; j++) {
                    var currentlatlang = coordinates[j].split(",");
					var lng = currentlatlang[0]; 
					var lat = currentlatlang[1]; 
		vertices.push(parseFloat(lat).toFixed(6) + "," + parseFloat(lng).toFixed(6));
			 }
			  vertices = vertices.toString();

			  result.zones.push({
                    name: name,
                    color: color,
                    visible: "true",
                    name_visible: "true",
                    area: "0",
                    vertices: vertices
                })
		 }
	}
	}


 return result;
}
