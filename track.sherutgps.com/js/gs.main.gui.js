



function initSelectListMapLayerList(){
    var map_layer = document.getElementById('map_layer');
    map_layer.options.length = 0;
    if(gsValues.map_osm){
        map_layer.options.add(new Option('OSM Map', 'osm'));
    }
    if(gsValues.map_bing){
        map_layer.options.add(new Option('Bing Road', 'broad'));
        map_layer.options.add(new Option('Bing Aerial', 'baer'));
        map_layer.options.add(new Option('Bing Hybrid', 'bhyb'));
    }

    if(gsValues.map_google){
        map_layer.options.add(new Option('Google Streets', 'gmap'));
        map_layer.options.add(new Option('Google Satellite', 'gsat'));
        map_layer.options.add(new Option('Google Hybrid', 'ghyb'));
        map_layer.options.add(new Option('Google Terrain', 'gter'));
    }
    if(gsValues.map_mapbox){
        map_layer.options.add(new Option('Mapbox Streets', 'mbmap'));
        map_layer.options.add(new Option('Mapbox Satellite', 'mbsat'));
    }
    if(gsValues.map_yandex){
        map_layer.options.add(new Option('Yandex', 'yandex'));
    
    }

  for (var t = 0; t < gsValues.map_custom.length; t++) {
    var layer_id = gsValues.map_custom[t].layer_id;
    var name  = gsValues.map_custom[t].name;
    map_layer.options.add(new Option(name, layer_id))
  }

}
function initSelectListSubAccountsMarkerList(){
    var dialog_available_markers = document.getElementById('dialog_settings_subaccount_available_markers');
      multiselectClear(dialog_available_markers);
      var markers = getGroupsPlacesArray('markers');
      multiselectSetGroups(dialog_available_markers, markers);
}

function initSelectListEventsRouteList(){
    var dialog_settings_event_routes = document.getElementById('dialog_settings_event_routes');
      multiselectClear(dialog_settings_event_routes);
      var routes = getGroupsPlacesArray('routes');
      multiselectSetGroups(dialog_settings_event_routes, routes);
}

function initSelectListSubaccountsRouteList(){
    var dialog_subaccount__routes = document.getElementById('dialog_settings_subaccount_available_routes');
      multiselectClear(dialog_subaccount__routes);
      var routes = getGroupsPlacesArray('routes');
      multiselectSetGroups(dialog_settings_event_routes, routes);
}
function initSelectListEventsZoneList(){
    var dialog_settings_event_zones = document.getElementById('dialog_settings_event_zones');
      multiselectClear(dialog_settings_event_zones);
      var zones = getGroupsPlacesArray('zones');
      multiselectSetGroups(dialog_settings_event_zones, zones);
}

function initSelectListSubaccountsZoneList(){
    var dialog = document.getElementById('dialog_settings_subaccount_available_zones');
      multiselectClear(dialog);
      var zones = getGroupsPlacesArray('zones');
      multiselectSetGroups(dialog, zones);
}

function initSelectListReportZoneList(){
    var dialog = document.getElementById('dialog_report_zone_list');
      multiselectClear(dialog);
      var zones = getGroupsPlacesArray('zones');
      multiselectSetGroups(dialog, zones);
}

function initSelectListGroupObjectList(){
    var dialog = document.getElementById('dialog_settings_object_group_objects');
    dialog.options.length = 0;
    for(var objectIndex in settingsObjectData ){
        var object = settingsObjectData[objectIndex];
        if('true' == object.active){
            dialog.options.add(new Option(object.name, objectIndex));
        }
    }
    sortSelectList(dialog);
}

function initSelectListEventsObjectList(){
    var dialog = document.getElementById('dialog_settings_event_objects');
      multiselectClear(dialog);
      var groupsObjectsArray = getGroupsObjectsArray();
      multiselectSetGroups(dialog, groupsObjectsArray);
}

function initSelectListSubaccountsObjectList(){
    var dialog = document.getElementById('dialog_settings_subaccount_available_objects');
      multiselectClear(dialog);
      var groupsObjectsArray = getGroupsObjectsArray();
      multiselectSetGroups(dialog, groupsObjectsArray);
}

function initSelectListHistoryObjectList(){
    var dialog = document.getElementById('side_panel_history_object_list');
    dialog.options.length = 0;
    for(var objectIndex in settingsObjectData ){
        var object = settingsObjectData[objectIndex];
        if('true' == object.active){
            dialog.options.add(new Option(object.name, objectIndex));
        }
    }
    sortSelectList(dialog);
}
function initSelectListReportObjectList(){
    var dialog = document.getElementById('dialog_report_object_list');
      multiselectClear(dialog);
      var groupsObjectsArray = getGroupsObjectsArray();
      multiselectSetGroups(dialog, groupsObjectsArray);
}

function initSelectListReportDriverList(){
    var dialog = document.getElementById('dialog_report_driver_list');
    dialog.options.length = 0;
    for(var objectIndex in settingsObjectDriverData ){
        var object = settingsObjectDriverData[objectIndex];
            dialog.options.add(new Option(object.name, objectIndex));
        }
    
    sortSelectList(dialog);

}



function initSelectLisTasksObjectList(){
    var dialog = document.getElementById('dialog_tasks_object_list');
    dialog.options.length = 0;
    for(var objectIndex in settingsObjectData ){
        var object = settingsObjectData[objectIndex];
        if('true' == object.active){
            dialog.options.add(new Option(object.name, objectIndex));
        }
    }
    sortSelectList(dialog);
    dialog.options.add(new Option(la.ALL_OBJECTS, ''),0);
    dialog.value = '';

}

function initSelectLisTaskObjectList(){
    var dialog = document.getElementById('dialog_task_object_list');
    dialog.options.length = 0;
    for(var objectIndex in settingsObjectData ){
        var object = settingsObjectData[objectIndex];
        if('true' == object.active){
            dialog.options.add(new Option(object.name, objectIndex));
        }
    }
    sortSelectList(dialog);
}
function initSelectListRilogbookObjectList(){
    var dialog = document.getElementById('dialog_rilogbook_object_list');
    dialog.options.length = 0;
    for(var objectIndex in settingsObjectData ){
        var object = settingsObjectData[objectIndex];
        if('true' == object.active){
            dialog.options.add(new Option(object.name, objectIndex));
        }
    }
    sortSelectList(dialog);
    dialog.options.add(new Option(la.ALL_OBJECTS, ''),0);
    dialog.value = '';

}

function initSelectListDtcObjectList(){
    var dialog = document.getElementById('dialog_dtc_object_list');
    dialog.options.length = 0;
    for(var objectIndex in settingsObjectData ){
        var object = settingsObjectData[objectIndex];
        if('true' == object.active){
            dialog.options.add(new Option(object.name, objectIndex));
        }
    }
    sortSelectList(dialog);
    dialog.options.add(new Option(la.ALL_OBJECTS, ''),0);
    dialog.value = '';

}

function initSelectListCmdGprsObjecList(){
    var dialog = document.getElementById('cmd_gprs_object_list');
      multiselectClear(dialog);
      var groupsObjectsArray = getGroupsObjectsArray();
      multiselectSetGroups(dialog, groupsObjectsArray);
}

function initSelectListCmdSmsObjecList(){
    var dialog = document.getElementById('cmd_sms_object_list');
      multiselectClear(dialog);
      var groupsObjectsArray = getGroupsObjectsArray();
      multiselectSetGroups(dialog, groupsObjectsArray);
}

function initSelectListImageGalleryObjecList(){
    var dialog = document.getElementById('dialog_image_gallery_object_list');
    dialog.options.length = 0;
    for(var objectIndex in settingsObjectData ){
        var object = settingsObjectData[objectIndex];
        if('true' == object.active){
            dialog.options.add(new Option(object.name, objectIndex));
        }
    }
    sortSelectList(dialog);
    dialog.options.add(new Option(la.ALL_OBJECTS, ''),0);
    dialog.value = '';
}

function initSelectListMaintenanceObjecList(){
    var dialog = document.getElementById('dialog_maintenance_service_objects');
    multiselectClear(dialog);
    var groupsObjectsArray = getGroupsObjectsArray();
    multiselectSetGroups(dialog, groupsObjectsArray);
}
function initSelectListObjectGroupList(){
    var dialog = document.getElementById('dialog_settings_object_edit_group');
    dialog.options.length = 0;
    for(var objectIndex in settingsObjectGroupData ){
        var object = settingsObjectGroupData[objectIndex];
        if(object.name != la.UNGROUPED){
            dialog.options.add(new Option(object.name, objectIndex));
        }
    }
    sortSelectList(dialog);
    dialog.options.add(new Option(la.UNGROUPED, 0),0);
  
}
function initSelectListObjectEditDriverList(){
    var dialog = document.getElementById('dialog_settings_object_edit_driver');
    dialog.options.length = 0;
    for(var objectIndex in settingsObjectDriverData ){
        var object = settingsObjectDriverData[objectIndex];
            dialog.options.add(new Option(object.name, objectIndex));
        }
    
    sortSelectList(dialog);
    dialog.options.add(new Option(la.AUTO_ASSIGN, 0),0);
    dialog.options.add(new Option(la.NO_DRIVER,-1),0);
}
function initSelectListObjectTrailerList(){
    var dialog = document.getElementById('dialog_settings_object_edit_trailer');
    dialog.options.length = 0;
    for(var objectIndex in settingsObjectTrailerData ){
        var object = settingsObjectTrailerData[objectIndex];
            dialog.options.add(new Option(object.name, objectIndex));
        }
    
    sortSelectList(dialog);
    dialog.options.add(new Option(la.AUTO_ASSIGN, 0),0);
    dialog.options.add(new Option(la.NO_TRAILER,-1),0);
}
function initSelectListEmailSmsTemplateList(){
    var dialogEmail = document.getElementById('dialog_settings_event_notify_email_template');
    dialogEmail.options.length = 0;
    var dialogSms = document.getElementById('dialog_settings_event_notify_sms_template');
    dialogSms.options.length = 0;
    for(var objectIndex in settingsTemplateData ){
        var object = settingsTemplateData[objectIndex];
            dialogEmail.options.add(new Option(object.name, objectIndex));
            dialogSms.options.add(new Option(object.name, objectIndex));
        }
    
    sortSelectList(dialogEmail);
    sortSelectList(dialogSms);
    dialogEmail.options.add(new Option(la.DEFAULT, 0),0);
    dialogSms.options.add(new Option(la.DEFAULT, 0),0);
}
function initSelectListPlacesGroupList(){
    var dialogmarker = document.getElementById('dialog_places_marker_group');
    dialogmarker.options.length = 0;
    var dialogRoute = document.getElementById('dialog_places_route_group');
    dialogRoute.options.length = 0;
    var dialogZone = document.getElementById('dialog_places_zone_group');
    dialogZone.options.length = 0;
    for(var objectIndex in placesGroupData.groups ){
        var object = placesGroupData.groups[objectIndex];
        if(object.name != la.UNGROUPED){
            dialogmarker.options.add(new Option(object.name, objectIndex));
            dialogRoute.options.add(new Option(object.name, objectIndex));
            dialogZone.options.add(new Option(object.name, objectIndex));
        }
        }
    
    sortSelectList(dialogmarker);
    sortSelectList(dialogRoute);
    sortSelectList(dialogZone);
    dialogmarker.options.add(new Option(la.UNGROUPED, 0),0);
    dialogRoute.options.add(new Option(la.UNGROUPED, 0),0);
    dialogZone.options.add(new Option(la.UNGROUPED, 0),0);
}


function initSelectList (entityList) {
  switch (entityList) {
    case 'map_layer_list':
        initSelectListMapLayerList();
      break;
    case 'subaccounts_marker_list':
        initSelectListSubAccountsMarkerList();
      break;
    case 'events_route_list':
        initSelectListEventsRouteList();
      break;
    case 'subaccounts_route_list':
        initSelectListSubaccountsRouteList();
      break;
    case 'events_zone_list':
        initSelectListEventsZoneList();
      break;
    case 'subaccounts_zone_list':
        initSelectListSubaccountsZoneList();
      break;
    case 'report_zone_list':
        initSelectListReportZoneList();
      break;
    case 'group_object_list':
        initSelectListGroupObjectList();
      break
    case 'events_object_list':
        initSelectListEventsObjectList();
      break;
    case 'subaccounts_object_list':
        initSelectListSubaccountsObjectList();
      break;
    case 'history_object_list':
        initSelectListHistoryObjectList();
      break;
    case 'report_object_list':
        initSelectListReportObjectList();
      break;
    case 'report_driver_list':
    	initSelectListReportDriverList();
    	break;
    case 'tasks_object_list':
        initSelectLisTasksObjectList();
      break;
    case 'task_object_list':
        initSelectLisTaskObjectList();
      break;
    case 'rilogbook_object_list':
        initSelectListRilogbookObjectList();
      break
    case 'dtc_object_list':
        initSelectListDtcObjectList();
      break;
    case 'cmd_gprs_object_list':
        initSelectListCmdGprsObjecList();
      break;

    case 'cmd_sms_object_list':
        initSelectListCmdSmsObjecList();
      break
    case 'image_gallery_object_list':
        initSelectListImageGalleryObjecList();
      break;
    case 'maintenance_object_list':
        initSelectListMaintenanceObjecList();
      break;
    case 'object_group_list':
        initSelectListObjectGroupList();
      break;
    case 'object_driver_list':
        initSelectListObjectEditDriverList();
      break
    case 'object_trailer_list':
        initSelectListObjectTrailerList();
      break
    case 'email_sms_template_list':
        initSelectListEmailSmsTemplateList();
      break
    case 'places_group_list':
        initSelectListPlacesGroupList();
  }
}
