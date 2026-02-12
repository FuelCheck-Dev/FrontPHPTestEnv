function load () {
  if (isIE) {
    return (
      '<div class="row">Please use one of these browsers:</div>',
      '<div class="row"><a href="http://www.mozilla.org/en-US/" target="_blank"><img style="border:0px" src="img/firefox.png" /></a>',
      '&nbsp;&nbsp;&nbsp;',
      '<a href="https://www.google.com/intl/en/chrome/browser/" target="_blank"><img style="border:0px" src="img/chrome.png" /></a></div>',
      void (document.getElementById('loading_panel_text').innerHTML =
        '<div class="row">This application uses features that are unavailables in your browser.</div><div class="row">Please use one of these browsers:</div><div class="row"><a href="http://www.mozilla.org/en-US/" target="_blank"><img style="border:0px" src="img/firefox.png" /></a>&nbsp;&nbsp;&nbsp;<a href="https://www.google.com/intl/en/chrome/browser/" target="_blank"><img style="border:0px" src="img/chrome.png" /></a></div>')
    )
  }
  loadLanguage(function (e) {
    var objectGroupsPromise = loadSettingsPromise('object_groups')
    var objectsPromise = objectGroupsPromise.then(function () {
      return loadSettingsPromise('objects')
    })

    var settingsPromises = [
      loadSettingsPromise('server'),
      loadSettingsPromise('user'),
      loadSettingsPromise('cookies'),
      loadSettingsPromise('object_drivers'),
      loadSettingsPromise('object_trailers'),
      objectGroupsPromise,
      objectsPromise,
      objectsPromise.then(function () {
        return loadSettingsPromise('events')
      }),
      loadSettingsPromise('templates'),
      loadSettingsPromise('subaccounts')
    ]

    Promise.all(settingsPromises)
      .then(function () {
        load2()
      })
      .catch(function (error) {
        handleSettingsError('loading_all', error)
      })
  })
}



function  loadSettingsCookie(callback){
    var gragbars = getCookie('gs_dragbars');
    if(gragbars == null){
        gragbars =   guiDragbars.objects + ';' + guiDragbars.events + ';' +  guiDragbars.history + ';' + guiDragbars.bottom_panel;

    }
    gragbars = gragbars.split(';');
    if(gragbars[0] != null && '' != gragbars[0]){
        guiDragbars.objects = gragbars[0];
    }
    if(gragbars[1] != null && '' != gragbars[1]){
        guiDragbars.events = gragbars[1];
    }
    if(gragbars[2] != null && '' != gragbars[2]){
        guiDragbars.history = gragbars[2];
    }
    if(gragbars[3] != null && '' != gragbars[3]){
        guiDragbars.bottom_panel = gragbars[3];
    }

    var map = getCookie('gs_map')
    if(map == null){
        map = gsValues.map_lat +';' + gsValues.map_lng +';' + gsValues.map_zoom +  ';' + gsValues.map_layer +';';
        map +=  gsValues.map_objects +';' + gsValues.map_object_labels + ';' + gsValues.map_markers + ';' +  gsValues.map_routes + ';' + gsValues.map_zones + ';' +
            gsValues.map_clusters;
    }
    map = map.split(';');
    if('last' == settingsUserData.map_sp){
        if(map[0] != null && '' != map[0]){
            gsValues.map_lat = map[0];
        }

        if(map[1] != null && '' != map[1]){
            gsValues.map_lng = map[1];
        }
        if(map[2] != null && '' != map[2]){
            gsValues.map_zoom = map[2];
        }
    }
        if(map[3] != null && '' != map[3]){
            gsValues.map_layer = map[3];
        }
        if(map[4] != null && '' != map[4]){
            gsValues.map_objects = strToBoolean(map[4]);
        }
        if(map[5] != null && '' != map[5]){
            gsValues.map_object_labels = strToBoolean(map[5]);
        }
        if(map[6] != null && '' != map[6]){
            gsValues.map_markers = strToBoolean(map[6]);
        }
        if(map[7] != null && '' != map[7]){
            gsValues.map_routes = strToBoolean(map[7]);
        }
        if(map[8] != null && '' != map[8]){
            gsValues.map_zones = strToBoolean(map[8]);
        }
        if(map[9] != null && '' != map[9]){
            gsValues.map_clusters = strToBoolean(map[9]);
        }
   
        callback(true);
    }
   
    function  loadSettingsServer(callback, errorCallback){
        var data = {
            cmd: 'load_server_data'
          }
          return $.ajax({
            type: 'POST',
            url: 'func/fn_settings.php',
            data: data,
            dataType: 'json',
            cache: false,
            success: function (result) {
              gsValues.url_root = result.url_root;
              gsValues.map_custom = result.map_custom;
              gsValues.map_osm = strToBoolean(result.map_osm);
              gsValues.map_bing = strToBoolean(result.map_bing);
            gsValues.map_google = strToBoolean(result.map_google);
            gsValues.map_google_street_view = strToBoolean(result.map_google_street_view);
            gsValues.map_google_traffic = strToBoolean(result.map_google_traffic);
            gsValues.map_mapbox = strToBoolean(result.map_mapbox);
            gsValues.map_yandex = strToBoolean(result.map_yandex);
            gsValues.map_bing_key = result.map_bing_key;
            gsValues.map_mapbox_key = result.map_mapbox_key;
            gsValues.routing_osmr_service_url = result.routing_osmr_service_url;
            gsValues.map_layer = result.map_layer;
            gsValues.map_zoom = result.map_zoom;
            gsValues.map_lat = result.map_lat;
            gsValues.map_lng = result.map_lng;
            gsValues.address_display_object_data_list = strToBoolean(result.address_display_object_data_list);
            gsValues.address_display_event_data_list = strToBoolean(result.address_display_event_data_list);
            gsValues.address_display_history_route_data_list = strToBoolean(result.address_display_history_route_data_list);
            gsValues.notify_obj_expire = strToBoolean(result.notify_obj_expire);
            gsValues.notify_obj_expire_period = result.notify_obj_expire_period;
            gsValues.notify_account_expire = strToBoolean(result.notify_account_expire);
            gsValues.notify_account_expire_period =result.notify_account_expire_period;
            callback(true);
            },
            error: function (xhr) {
              handleSettingsError('server', errorCallback, xhr)
            }
          })

    }

    function  loadSettingsUser(callback, errorCallback){
        var  data = {
            cmd: 'load_user_data'
          }
          return $.ajax({
            type: 'POST',
            url: 'func/fn_settings.php',
            data: data,
            dataType: 'json',
            cache: false,
            success: function (result) {
                settingsUserData = result; 
                if(settingsUserData.privileges != 'subuser'){
                document.getElementById('settings_main_sms_gateway').checked = strToBoolean(settingsUserData.sms_gateway);
                
                if('' == settingsUserData.sms_gateway_type ){
             settingsUserData.sms_gateway_type = 'app';
                }
            document.getElementById('settings_main_sms_gateway_type').value =settingsUserData.sms_gateway_type;
            document.getElementById('settings_main_sms_gateway_url').value =settingsUserData.sms_gateway_url;
            document.getElementById('settings_main_sms_gateway_identifier').value = settingsUserData.sms_gateway_identifier;
            document.getElementById('settings_main_sms_gateway_total_in_queue').innerHTML = settingsUserData.sms_gateway_total_in_queue;
            settingsSMSGatewaySwitchType();
				}
           document.getElementById('settings_main_push_notify_desktop').checked = strToBoolean(settingsUserData.push_notify_desktop);
              
        if ('' == settingsUserData.chat_notify){
        settingsUserData.chat_notify = 'alarm1.mp3';
        }
        document.getElementById('settings_main_chat_notify_sound_file').value = settingsUserData.chat_notify;
        document.getElementById('settings_main_map_startup_possition').value = settingsUserData.map_sp;
        document.getElementById('settings_main_map_icon_size').value = settingsUserData.map_is;
        document.getElementById('settings_main_history_route_color').value = settingsUserData.map_rc.substr(1);
        document.getElementById('settings_main_history_route_color').style.backgroundColor = settingsUserData.map_rc;
        document.getElementById('settings_main_history_route_highlight_color').value = settingsUserData.map_rhc.substr(1);
        document.getElementById('settings_main_history_route_highlight_color').style.backgroundColor = settingsUserData.map_rhc;
        document.getElementById('settings_main_map_object_cluster_popup').checked = strToBoolean(settingsUserData.map_ocp);
        document.getElementById('settings_main_groups_collapsed_objects').checked = settingsUserData.groups_collapsed.objects;
        document.getElementById('settings_main_groups_collapsed_markers').checked = settingsUserData.groups_collapsed.markers;
        document.getElementById('settings_main_groups_collapsed_routes').checked = settingsUserData.groups_collapsed.routes;
        document.getElementById('settings_main_groups_collapsed_zones').checked = settingsUserData.groups_collapsed.zones;
        document.getElementById('settings_main_od').value =settingsUserData.od;
        settingsUserData.ohc;
        document.getElementById('settings_main_ohc_no_connection').checked = settingsUserData.ohc.no_connection;
        document.getElementById('settings_main_ohc_no_connection_color').value = settingsUserData.ohc.no_connection_color.substr(1);
        document.getElementById('settings_main_ohc_no_connection_color').style.backgroundColor = settingsUserData.ohc.no_connection_color;
        document.getElementById('settings_main_datalist_position').value =settingsUserData.datalist;
        var settings_main_datalist_items = document.getElementById('settings_main_datalist_items');
              if (0 != settings_main_datalist_items) {
                var dataItems = settingsUserData.datalist_items.split(',')
                multiselectSetValues(settings_main_datalist_items, dataItems)
              }


               document.getElementById('settings_main_ohc_stopped').checked =settingsUserData.ohc.stopped;
              document.getElementById('settings_main_ohc_stopped_color').value = settingsUserData.ohc.stopped_color.substr(1);
            document.getElementById('settings_main_ohc_stopped_color').style.backgroundColor = settingsUserData.ohc.stopped_color;
            document.getElementById('settings_main_ohc_moving').checked = settingsUserData.ohc.moving;
            document.getElementById('settings_main_ohc_moving_color').value = settingsUserData.ohc.moving_color.substr(1);
            document.getElementById('settings_main_ohc_moving_color').style.backgroundColor = settingsUserData.ohc.moving_color;
            document.getElementById('settings_main_ohc_engine_idle').checked =settingsUserData.ohc.engine_idle;
            document.getElementById('settings_main_ohc_engine_idle_color').value = settingsUserData.ohc.engine_idle_color.substr(1);
            document.getElementById('settings_main_ohc_engine_idle_color').style.backgroundColor = settingsUserData.ohc.engine_idle_color;
            document.getElementById('settings_main_language').value =settingsUserData.language;
            document.getElementById('system_language').value = settingsUserData.language;
            document.getElementById('settings_main_distance_unit').value = settingsUserData.unit_distance;
            document.getElementById('settings_main_capacity_unit').value = settingsUserData.unit_capacity;
            document.getElementById('settings_main_temperature_unit').value =settingsUserData.unit_temperature;
            document.getElementById('settings_main_currency').value =settingsUserData.currency;
            document.getElementById('settings_main_timezone').value =settingsUserData.timezone;
            if( 11 == settingsUserData.dst_start.length && 11 == settingsUserData.dst_end.length) {
              
                document.getElementById('settings_main_dst').checked = strToBoolean( settingsUserData.dst);
              
                var dst_start = settingsUserData.dst_start.split(' ')
                document.getElementById('settings_main_dst_start_mmdd').value =dst_start[0];
                document.getElementById('settings_main_dst_start_hhmm').value = dst_start[1];
                var dst_end = settingsUserData.dst_end.split(' ')
                document.getElementById('settings_main_dst_end_mmdd').value = dst_end[0];
                document.getElementById('settings_main_dst_end_hhmm').value = dst_end[1];
              } else{
                document.getElementById('settings_main_dst').checked = false;
                document.getElementById('settings_main_dst_start_mmdd').value ='';
                document.getElementById('settings_main_dst_start_hhmm').value ='00:00';
                document.getElementById('settings_main_dst_end_mmdd').value ='';
                document.getElementById('settings_main_dst_end_hhmm').value ='00:00';
              }
              var info = settingsUserData.info;
              document.getElementById('settings_main_name_surname').value =info.name;
              document.getElementById('settings_main_company').value = info.company;
              document.getElementById('settings_main_address').value = info.address;
              document.getElementById('settings_main_post_code').value =info.post_code;
              document.getElementById('settings_main_city').value = info.city;
              document.getElementById('settings_main_country').value =info.country;
              document.getElementById('settings_main_phone1').value = info.phone1;
              document.getElementById('settings_main_phone2').value = info.phone2;
              document.getElementById('settings_main_email').value = info.email;
              document.getElementById('settings_main_usage_email_daily').innerHTML =
                  settingsUserData.usage_email_daily_cnt +
                  '/' +
                  settingsUserData.usage_email_daily;
              document.getElementById('settings_main_usage_sms_daily').innerHTML =
                  settingsUserData.usage_sms_daily_cnt +
                  '/' +
                  settingsUserData.usage_sms_daily;
              document.getElementById('settings_main_usage_api_daily').innerHTML =
                settingsUserData.usage_api_daily_cnt +
                '/' +
                settingsUserData.usage_api_daily;
              settingsCheck();
              callback(true)
            },
            error: function (xhr) {
              handleSettingsError('user', errorCallback, xhr)
            }
          });


    }

    function loadSettingsObjects (callback, errorCallback) {

      var   data = {
            cmd: 'load_object_data'
          }
          return $.ajax({
            type: 'POST',
            url: 'func/fn_settings.objects.php',
            data: data,
            dataType: 'json',
            cache: false,
            success: function (result) {
                result = transformsToSettingsObjectData(result);
                settingsObjectData = result;
                settingsEditData.sensor_id = false;
              for (var objectData in settingsObjectData){
                var object = settingsObjectData[objectData];
                if( null == settingsObjectGroupData[object.group_id] ){
                    settingsObjectData[objectData].group_id = '0' 
                }
            }
        
                initSelectList('group_object_list');
                initSelectList('events_object_list');
                initSelectList('subaccounts_object_list');
                initSelectList('history_object_list');
                initSelectList('report_object_list');
                initSelectList('report_driver_list');
                initSelectList('tasks_object_list');
                initSelectList('task_object_list');
                initSelectList('rilogbook_object_list');
                initSelectList('dtc_object_list');
                initSelectList('cmd_gprs_object_list');
                initSelectList('cmd_sms_object_list');
                initSelectList('image_gallery_object_list');
                initSelectList('maintenance_object_list');
                loadObjectMapMarkerIcons();
                callback(true);
            },
            error: function (xhr) {
              handleSettingsError('objects', errorCallback, xhr)
            }
          });


    }

    function loadSettingsObjectgroups(callback, errorCallback) {

      var   data = {
            cmd: 'load_object_group_data'
          }
          return $.ajax({
            type: 'POST',
            url: 'func/fn_settings.groups.php',
            data: data,
            dataType: 'json',
            cache: false,
            success: function (result) {
              settingsObjectGroupData = result;
              settingsEditData.group_id = false;
              initSelectList('object_group_list');
              callback(true);
            },
            error: function (xhr) {
              handleSettingsError('object_groups', errorCallback, xhr)
            }
          })

    }

    function loadSettingsObjectDrivers(callback, errorCallback) {

       var  data = {
            cmd: 'load_object_driver_data'
          }
          return $.ajax({
            type: 'POST',
            url: 'func/fn_settings.drivers.php',
            data: data,
            dataType: 'json',
            cache: false,
            success: function (result) {
                settingsObjectDriverData = result;
              settingsEditData.driver_id = false;
            initSelectList('object_driver_list');
            callback(true);
            },
            error: function (xhr) {
              handleSettingsError('object_drivers', errorCallback, xhr)
            }
          })
      }

      function loadSettingsObjectTrailers(callback, errorCallback) {


        var  data = {
             cmd: 'load_object_trailer_data'
           }
           return $.ajax({
             type: 'POST',
             url: 'func/fn_settings.trailers.php',
             data: data,
             dataType: 'json',
             cache: false,
             success: function (result) {
                settingsObjectTrailerData = result;
                settingsEditData.trailer_id = false;
             initSelectList('object_trailer_list');
             callback(true);
             },
             error: function (xhr) {
              handleSettingsError('object_trailers', errorCallback, xhr)
             }
           })
      }

       function loadSettingsEvents(callback, errorCallback) {
      

        var  data = {
             cmd: 'load_event_data'
           }
           return $.ajax({
             type: 'POST',
             url: 'func/fn_settings.events.php',
             data: data,
             dataType: 'json',
             cache: false,
             success: function (result) {
                settingsEventData = result;
                settingsEditData.event_id = false;
            callback(true);
             },
             error: function (xhr) {
              handleSettingsError('events', errorCallback, xhr)
             }
           })
       }

function loadSettingsTemplates(callback, errorCallback) {

    var  data = {
             cmd: 'load_template_data'
           }
           return $.ajax({
             type: 'POST',
             url: 'func/fn_settings.templates.php',
             data: data,
             dataType: 'json',
             cache: false,
             success: function (result) {
                settingsTemplateData = result;
                settingsEditData.template_id = false;
                initSelectList('email_sms_template_list');
                callback(true);
             },
             error: function (xhr) {
              handleSettingsError('templates', errorCallback, xhr)
             }
           })
       }

       function loadSettingsSubaccounts(callback, errorCallback) {
        var  data = {
             cmd: 'load_subaccount_data'
           }
           return $.ajax({
             type: 'POST',
             url: 'func/fn_settings.subaccounts.php',
             data: data,
             dataType: 'json',
             cache: false,
             success: function (result) {
                settingsSubaccountData = result;
                settingsEditData.subaccount_id = false;
                callback(true);
             },
             error: function (xhr) {
              handleSettingsError('subaccounts', errorCallback, xhr)
             }
           })
       }
       
       
function load2() {
            var e;
            (initMap(), initGui(), initGrids(), initGraph(), objectLoadList(),fuelLoadData(),
                objectLoadData(), eventsLoadData(), placesGroupLoadData(function(e) {
                    placesMarkerLoadData(), placesRouteLoadData(),
                        placesZoneLoadData()
                }), 1 == settingsUserData.privileges_reports && reportsLoadData(), 1 ==
                settingsUserData.privileges_object_control && cmdTemplateLoadData(),
                1 == settingsUserData.privileges_chat && chatLoadData(), 1 ==
                settingsUserData.billing && billingLoadData(), "subuser" ==
                settingsUserData.privileges) ? ($("#settings_main").tabs("option",
                    "active", 4), (e = document.getElementById("settings_main_objects"))
                .parentNode.removeChild(e), (e = document.getElementById(
                    "settings_main_objects_tab")).parentNode.removeChild(e), (e =
                    document.getElementById("settings_main_events")).parentNode
                .removeChild(e), (e = document.getElementById(
                    "settings_main_events_tab")).parentNode.removeChild(e), (e =
                    document.getElementById("settings_main_templates")).parentNode
                .removeChild(e), (e = document.getElementById(
                    "settings_main_templates_tab")).parentNode.removeChild(e), (e =
                    document.getElementById("settings_main_sms")).parentNode
                .removeChild(e), (e = document.getElementById("settings_main_sms_tab"))
                .parentNode.removeChild(e), (e = document.getElementById(
                    "settings_main_subaccounts")).parentNode.removeChild(e), (e =
                    document.getElementById("settings_main_subaccounts_tab")).parentNode
                .removeChild(e), (e = document.getElementById("reports_generated"))
                .parentNode.removeChild(e), (e = document.getElementById(
                    "reports_generated_tab")).parentNode.removeChild(e)) : 0 ==
                settingsUserData.privileges_subaccounts && ((e = document
                        .getElementById("settings_main_subaccounts")).parentNode
                    .removeChild(e), (e = document.getElementById(
                        "settings_main_subaccounts_tab")).parentNode.removeChild(e));
            "bottom_panel" == settingsUserData.datalist ? ($(
                        "#side_panel_objects_dragbar").off(), $(
                        "#side_panel_events_dragbar").off(), $(
                        "#side_panel_history_dragbar").off(), document.getElementById(
                        "side_panel_objects_dragbar").style.display = "none", document
                    .getElementById("side_panel_objects_object_data_list").style
                    .display = "none", document.getElementById(
                        "side_panel_events_dragbar").style.display = "none", document
                    .getElementById("side_panel_events_event_data_list").style.display =
                    "none", document.getElementById("side_panel_history_dragbar").style
                    .display = "none", document.getElementById(
                        "side_panel_history_route_data_list").style.display = "none") :
                (document.getElementById("bottom_panel_datalist_tab").style.display =
                    "none", document.getElementById("bottom_panel_datalist").style
                    .display = "none"), document.getElementById("loading_panel").style
                .display = "none", document.getElementById("content").style.visibility =
                "visible", notifyCheck("expiring_objects"), notifyCheck(
                    "inactive_objects"), notifyCheck("session_check"), "true" ==
                settingsUserData.push_notify_desktop && Push.Permission.request(null,
                    null)
        }

function loadSettingsPromise (entity) {
  return new Promise(function (resolve, reject) {
    try {
      var request = loadSettings(entity, function () {
        resolve(true)
      }, function (section, xhr) {
        reject({ section: section || entity, xhr: xhr })
      })

      if (request && typeof request.fail === 'function') {
        request.fail(function (xhr) {
          reject({ section: entity, xhr: xhr })
        })
      }
    } catch (error) {
      reject({ section: entity, xhr: error })
    }
  })
}

function handleSettingsError (section, errorCallback, xhr) {
  if (typeof errorCallback === 'function') {
    errorCallback(section, xhr)
    return
  }

  var loadingPanelText = document.getElementById('loading_panel_text')
  var errorMessage = 'Failed to load settings: ' + section

  if (loadingPanelText) {
    loadingPanelText.innerHTML = '<div class="row">' + errorMessage + '</div><div class="row">Please try reloading the page.</div>'
  }

  if (window.console && typeof window.console.error === 'function') {
    window.console.error(errorMessage, xhr)
  }
}

function loadSettings (entity, callback, errorCallback) {
  switch (entity) {
    case 'cookies':
        loadSettingsCookie(callback);
      break;
    case 'server':
        return loadSettingsServer(callback, errorCallback);
      break;
    case 'user':
        return loadSettingsUser(callback, errorCallback);
      break;
    case 'objects':
        return loadSettingsObjects(callback, errorCallback);
      break;
    case 'object_groups':
        return loadSettingsObjectgroups(callback, errorCallback);
        break;
    case 'object_drivers':
        return loadSettingsObjectDrivers(callback, errorCallback);
      break;
    case 'object_trailers':
        return loadSettingsObjectTrailers(callback, errorCallback);
      break;
    case 'events':
        return loadSettingsEvents(callback, errorCallback);
      break;
    case 'templates':
        return loadSettingsTemplates(callback, errorCallback);
      break;
    case 'subaccounts':
        return loadSettingsSubaccounts(callback, errorCallback);
  }
}
