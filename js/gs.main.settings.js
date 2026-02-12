

var settingsEditData = new Array;
var settingsUserData = new Array;
var settingsObjectData = new Array;
var settingsObjectGroupData = new Array;
var settingsObjectDriverData = new Array;
var settingsObjectTrailerData = new Array;
var settingsEventData = new Array;
var settingsTemplateData = new Array;
var settingsSubaccountData = new Array;
var settingsLoadPromises = {};



function settingsOpen() {
    Promise.all([
        getSettingsPromise("user"),
        getSettingsPromise("objects")
    ])
        .then(function() {
            $("#settings_main_object_list_grid").trigger("reloadGrid");
            $("#dialog_settings").dialog("open");
        })
        .catch(function(error) {
            var section = error && error.section ? error.section : "settings_open";
            handleSettingsError(section, null, error && error.xhr ? error.xhr : error);
        });
}

function getSettingsPromise(entity) {
    if (settingsLoadPromises[entity]) {
        return settingsLoadPromises[entity];
    }

    if (isSettingsLoaded(entity)) {
        return Promise.resolve(true);
    }

    settingsLoadPromises[entity] = loadSettingsPromise(entity).catch(function(error) {
        settingsLoadPromises[entity] = null;
        throw error;
    });

    return settingsLoadPromises[entity];
}

function isSettingsLoaded(entity) {
    if ("user" === entity) {
        return settingsUserData && Object.keys(settingsUserData).length > 0;
    }

    if ("objects" === entity) {
        return settingsObjectData && Object.keys(settingsObjectData).length > 0;
    }

    return !1;
}

function settingsOpenUser() {
    settingsOpen(); 
    document.getElementById("settings_main_my_account_tab").click();
}


function settingsReloadUser() {
    setTimeout(function() {
        window.location.reload()
    }, 2e3)
}

function settingsSave() {
    if (utilsCheckPrivileges("viewer")) {
        if ("subuser" != settingsUserData.privileges) var e = document
            .getElementById("settings_main_sms_gateway").checked,
            t = document.getElementById("settings_main_sms_gateway_type")
            .value,
            a = document.getElementById("settings_main_sms_gateway_url")
            .value,
            o = document.getElementById(
                "settings_main_sms_gateway_identifier").value;
        else e = "", t = "", a = "", o = "";
        var i = document.getElementById("settings_main_push_notify_desktop")
            .checked,
            s = document.getElementById("settings_main_chat_notify_sound_file")
            .value,
            n = document.getElementById("settings_main_map_startup_possition")
            .value,
            l = document.getElementById("settings_main_map_icon_size").value,
            d = "#" + document.getElementById(
                "settings_main_history_route_color").value,
            r = "#" + document.getElementById(
                "settings_main_history_route_highlight_color").value,
            _ = document.getElementById(
                "settings_main_map_object_cluster_popup").checked,
            c = {
                objects: document.getElementById(
                    "settings_main_groups_collapsed_objects").checked,
                markers: document.getElementById(
                    "settings_main_groups_collapsed_markers").checked,
                routes: document.getElementById(
                    "settings_main_groups_collapsed_routes").checked,
                zones: document.getElementById(
                    "settings_main_groups_collapsed_zones").checked
            };
        c = JSON.stringify(c);
        var g = document.getElementById("settings_main_od").value,
            m = {
                no_connection: document.getElementById(
                    "settings_main_ohc_no_connection").checked,
                no_connection_color: "#" + document.getElementById(
                    "settings_main_ohc_no_connection_color").value,
                stopped: document.getElementById("settings_main_ohc_stopped")
                    .checked,
                stopped_color: "#" + document.getElementById(
                    "settings_main_ohc_stopped_color").value,
                moving: document.getElementById("settings_main_ohc_moving")
                    .checked,
                moving_color: "#" + document.getElementById(
                    "settings_main_ohc_moving_color").value,
                engine_idle: document.getElementById(
                    "settings_main_ohc_engine_idle").checked,
                engine_idle_color: "#" + document.getElementById(
                    "settings_main_ohc_engine_idle_color").value
            };
        m = JSON.stringify(m);
        var u = document.getElementById("settings_main_datalist_position")
            .value,
            p = multiselectGetValues(document.getElementById(
                "settings_main_datalist_items"));
        "" == p && (p = !1);
        var y = document.getElementById("settings_main_language").value,
            v = document.getElementById("settings_main_distance_unit").value;
        v += "," + document.getElementById("settings_main_capacity_unit").value,
            v += "," + document.getElementById("settings_main_temperature_unit")
            .value;
        var b = document.getElementById("settings_main_currency").value,
            h = document.getElementById("settings_main_timezone").value,
            E = document.getElementById("settings_main_dst").checked,
            f = document.getElementById("settings_main_dst_start_mmdd").value +
            " " + document.getElementById("settings_main_dst_start_hhmm").value,
            I = document.getElementById("settings_main_dst_end_mmdd").value +
            " " + document.getElementById("settings_main_dst_end_hhmm").value;
        0 != E && 11 == f.length && 11 == I.length || (E = !1, f = "", I = "");
        var B = {
            name: document.getElementById("settings_main_name_surname")
                .value,
            company: document.getElementById("settings_main_company").value,
            address: document.getElementById("settings_main_address").value,
            post_code: document.getElementById("settings_main_post_code")
                .value,
            city: document.getElementById("settings_main_city").value,
            country: document.getElementById("settings_main_country").value,
            phone1: document.getElementById("settings_main_phone1").value,
            phone2: document.getElementById("settings_main_phone2").value,
            email: document.getElementById("settings_main_email").value
        };
        B = JSON.stringify(B);
        var D = document.getElementById("settings_main_old_password").value,
            O = document.getElementById("settings_main_new_password").value,
            j = document.getElementById("settings_main_new_password_rep").value;
        if (D.length > 0) {
            if (O.length < 6) return void notifyBox("error", la.ERROR, la
                .PASSWORD_LENGHT_AT_LEAST);
            if (-1 != O.indexOf(" ")) return void notifyBox("error", la.ERROR,
                la.PASSWORD_SPACE_CHARACTERS);
            if (O != j) return void notifyBox("error", la.ERROR, la
                .REPEATED_PASSWORD_IS_INCORRECT)
        }
        var T = {
            cmd: "save_user_settings",
            sms_gateway: e,
            sms_gateway_type: t,
            sms_gateway_url: a,
            sms_gateway_identifier: o,
            chat_notify: s,
            map_sp: n,
            map_is: l,
            map_rc: d,
            map_rhc: r,
            map_ocp: _,
            groups_collapsed: c,
            od: g,
            ohc: m,
            datalist: u,
            datalist_items: p,
            push_notify_desktop: i,
            push_notify_mobile: "na",
            push_notify_mobile_interval: "na",
            startup_tab: "na",
            language: y,
            units: v,
            currency: b,
            timezone: h,
            dst: E,
            dst_start: f,
            dst_end: I,
            info: B,
            old_password: D,
            new_password: O
        };
        $.ajax({
            type: "POST",
            url: "func/fn_settings.php",
            data: T,
            cache: !1,
            success: function(e) {
                "OK" == e ? (settingsReloadUser(), notifyBox("info",
                        la.INFORMATION, la
                        .CHANGES_SAVED_SUCCESSFULLY)) :
                    "ERROR_INCORRECT_PASSWORD" == e && notifyBox(
                        "error", la.ERROR, la.INCORRECT_PASSWORD)
            }
        })
    }
}

function settingsSaveCookies() {
    var e = guiDragbars.objects + ";" + guiDragbars.events + ";" + guiDragbars
        .history + ";" + guiDragbars.bottom_panel;
    if (setCookie("gs_dragbars", e, 30), null != map && map.getZoom() && map
        .getCenter() && map.getCenter()) {
        var t = map.getCenter().lat + ";" + map.getCenter().lng + ";" + map
            .getZoom() + ";" + gsValues.map_layer + ";";
        t += gsValues.map_objects + ";" + gsValues.map_object_labels + ";" +
            gsValues.map_markers + ";" + gsValues.map_routes + ";" + gsValues
            .map_zones + ";" + gsValues.map_clusters, setCookie("gs_map", t, 30)
    }
}

function settingsChatPlaySound() {
    var e = document.getElementById("settings_main_chat_notify_sound_file")
        .value;
    "" != e && new Audio("snd/" + e).play()
}

function settingsSMSGatewayClearQueue() {
    confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_CLEAR_SMS_QUEUE, function(e) {
        if (e) {
            $.ajax({
                type: "POST",
                url: "func/fn_settings.php",
                data: {
                    cmd: "clear_sms_queue"
                },
                success: function(e) {
                    "OK" == e && (document.getElementById(
                        "settings_main_sms_gateway_total_in_queue"
                        ).innerHTML = "0")
                }
            })
        }
    })
}


function settingsSMSGatewaySwitchType() {
    "app" == document.getElementById("settings_main_sms_gateway_type").value ? (
        document.getElementById("settings_main_sms_app").style.display = "",
        document.getElementById("settings_main_sms_http").style.display =
        "none") : (document.getElementById("settings_main_sms_app").style
        .display = "none", document.getElementById("settings_main_sms_http")
        .style.display = "")
}

function settingsObjectAdd(e) {
    if (utilsCheckPrivileges("subuser") && utilsCheckPrivileges("obj_add"))
        switch (e) {
            case "open":
                document.getElementById("dialog_settings_object_add_name")
                    .value = "", document.getElementById(
                        "dialog_settings_object_add_imei").value = "", $(
                        "#dialog_settings_object_add").dialog("open");
                break;
            case "cancel":
                $("#dialog_settings_object_add").dialog("close");
                break;
            case "add":
                if (!utilsCheckPrivileges("viewer")) return;
                var t = document.getElementById(
                        "dialog_settings_object_add_name").value,
                    a = document.getElementById(
                        "dialog_settings_object_add_imei").value;
                if ("" == t) return void notifyBox("error", la.ERROR, la
                    .NAME_CANT_BE_EMPTY);
                if (!isIMEIValid(a)) return void notifyBox("error", la.ERROR, la
                    .IMEI_IS_NOT_VALID);
                var o = {
                    cmd: "add_object",
                    name: t,
                    imei: a
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.objects.php",
                    data: o,
                    cache: !1,
                    success: function(e) {
                        "OK" == e ? (settingsReloadObjects(), $(
                                    "#dialog_settings_object_add")
                                .dialog("close"), notifyBox("info",
                                    la.INFORMATION, la
                                    .CHANGES_SAVED_SUCCESSFULLY)) :
                            "ERROR_IMEI_EXISTS" == e ? notifyBox(
                                "error", la.ERROR, la
                                .THIS_IMEI_ALREADY_EXISTS) :
                            "ERROR_OBJECT_LIMIT" == e && notifyBox(
                                "error", la.ERROR, la
                                .OBJECT_LIMIT_IS_REACHED)
                    }
                })
        }
}

function settingsObjectClearHistory(e) {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        utilsCheckPrivileges("obj_history_clear") && confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_CLEAR_HISTORY_EVENTS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "clear_history_object",
                        imei: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.objects.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && settingsReloadObjects()
                        }
                    })
                }
            })
}

function settingsObjectDelete(e) {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        utilsCheckPrivileges("obj_delete") && confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_object",
                        imei: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.objects.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && settingsReloadObjects()
                        }
                    })
                }
            })
}

function settingsObjectClearHistorySelected() {
    if (utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        utilsCheckPrivileges("obj_history_clear")) {
        var e = $("#settings_main_object_list_grid").jqGrid("getGridParam",
            "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_CLEAR_SELECTED_ITEMS_HISTORY_EVENTS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "clear_history_selected_objects",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.objects.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && settingsReloadObjects()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function settingsObjectDeleteSelected() {
    if (utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        utilsCheckPrivileges("obj_delete")) {
        var e = $("#settings_main_object_list_grid").jqGrid("getGridParam",
            "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_objects",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.objects.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && settingsReloadObjects()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function settingsObjectDuplicate(e) {
    if (utilsCheckPrivileges("subuser") && utilsCheckPrivileges("obj_add"))
        switch (e) {
            default:
                var t = e;
                settingsEditData.object_duplicate_imei = t, document
                    .getElementById("dialog_settings_object_duplicate_name")
                    .value = "", document.getElementById(
                        "dialog_settings_object_duplicate_imei").value = "", $(
                        "#dialog_settings_object_duplicate").dialog("open");
                break;
            case "duplicate":
                if (!utilsCheckPrivileges("viewer")) return;
                var a = settingsEditData.object_duplicate_imei,
                    o = document.getElementById(
                        "dialog_settings_object_duplicate_name").value;
                t = document.getElementById(
                    "dialog_settings_object_duplicate_imei").value;
                if ("" == o) return void notifyBox("error", la.ERROR, la
                    .NAME_CANT_BE_EMPTY);
                if (!isIMEIValid(t)) return void notifyBox("error", la.ERROR, la
                    .IMEI_IS_NOT_VALID);
                var i = {
                    cmd: "duplicate_object",
                    duplicate_imei: a,
                    name: o,
                    imei: t
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.objects.php",
                    data: i,
                    cache: !1,
                    success: function(e) {
                        "OK" == e ? (settingsReloadObjects(), $(
                                "#dialog_settings_object_duplicate"
                                ).dialog("close"), notifyBox(
                                "info", la.INFORMATION, la
                                .CHANGES_SAVED_SUCCESSFULLY)) :
                            "ERROR_IMEI_EXISTS" == e ? notifyBox(
                                "error", la.ERROR, la
                                .THIS_IMEI_ALREADY_EXISTS) :
                            "ERROR_OBJECT_LIMIT" == e && notifyBox(
                                "error", la.ERROR, la
                                .OBJECT_LIMIT_IS_REACHED)
                    }
                });
                break;
            case "cancel":
                $("#dialog_settings_object_duplicate").dialog("close")
        }
}

function settingsObjectEdit(e) {
    if (utilsCheckPrivileges("subuser") && utilsCheckPrivileges("obj_edit"))
        switch (e) {
            default:
                var t = e;
                settingsEditData.object_imei = t;
                var a = settingsObjectData[t].group_id;
                null == settingsObjectGroupData[a] ? document.getElementById(
                        "dialog_settings_object_edit_group").value = 0 :
                    document.getElementById("dialog_settings_object_edit_group")
                    .value = settingsObjectData[t].group_id, $(
                        "#dialog_settings_object_edit_group").multipleSelect(
                        "refresh");
                var o = settingsObjectData[t].driver_id;
                null == settingsObjectDriverData[o] ? document.getElementById(
                        "dialog_settings_object_edit_driver").value = 0 :
                    document.getElementById(
                        "dialog_settings_object_edit_driver").value =
                    settingsObjectData[t].driver_id, $(
                        "#dialog_settings_object_edit_driver").multipleSelect(
                        "refresh");
                var i = settingsObjectData[t].trailer_id;
                null == settingsObjectTrailerData[i] ? document.getElementById(
                        "dialog_settings_object_edit_trailer").value = 0 :
                    document.getElementById(
                        "dialog_settings_object_edit_trailer").value =
                    settingsObjectData[t].trailer_id, $(
                        "#dialog_settings_object_edit_trailer").multipleSelect(
                        "refresh"), document.getElementById(
                        "dialog_settings_object_edit_name").value =
                    settingsObjectData[t].name, document.getElementById(
                        "dialog_settings_object_edit_imei").value = t, document
                    .getElementById("dialog_settings_object_edit_device")
                    .value = settingsObjectData[t].device, document
                    .getElementById("dialog_settings_object_edit_sim_number")
                    .value = settingsObjectData[t].sim_number, document
                    .getElementById("dialog_settings_object_edit_model").value =
                    settingsObjectData[t].model, document.getElementById(
                        "dialog_settings_object_edit_vin").value =
                    settingsObjectData[t].vin, document.getElementById(
                        "dialog_settings_object_edit_plate_number").value =
                    settingsObjectData[t].plate_number, document.getElementById(
                        "dialog_settings_object_edit_icon").innerHTML =
                    '<img src="' + settingsObjectData[t].icon + '" />',
                    settingsEditData.object_icon = settingsObjectData[t].icon;
                var s = settingsObjectData[t].map_arrows;
                document.getElementById(
                        "dialog_settings_object_edit_arrow_no_connection")
                    .value = s.arrow_no_connection, $(
                        "#dialog_settings_object_edit_arrow_no_connection")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_object_edit_arrow_stopped").value = s
                    .arrow_stopped, $(
                        "#dialog_settings_object_edit_arrow_stopped")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_object_edit_arrow_moving").value = s
                    .arrow_moving, $(
                        "#dialog_settings_object_edit_arrow_moving")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_object_edit_arrow_engine_idle").value =
                    s.arrow_engine_idle, $(
                        "#dialog_settings_object_edit_arrow_engine_idle")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_object_edit_map_icon").value =
                    settingsObjectData[t].map_icon, $(
                        "#dialog_settings_object_edit_map_icon").multipleSelect(
                        "refresh"), document.getElementById(
                        "dialog_settings_object_edit_tail_color").value =
                    settingsObjectData[t].tail_color.substr(1), document
                    .getElementById("dialog_settings_object_edit_tail_color")
                    .style.backgroundColor = settingsObjectData[t].tail_color,
                    document.getElementById(
                        "dialog_settings_object_edit_tail_points").value =
                    settingsObjectData[t].tail_points, document.getElementById(
                        "dialog_settings_object_edit_fcr_source").value =
                    settingsObjectData[t].fcr.source, $(
                        "#dialog_settings_object_edit_fcr_source")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_object_edit_fcr_measurement").value =
                    settingsObjectData[t].fcr.measurement, $(
                        "#dialog_settings_object_edit_fcr_measurement")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_object_edit_fcr_cost").value =
                    settingsObjectData[t].fcr.cost, document.getElementById(
                        "dialog_settings_object_edit_fcr_summer").value =
                    settingsObjectData[t].fcr.summer, document.getElementById(
                        "dialog_settings_object_edit_fcr_winter").value =
                    settingsObjectData[t].fcr.winter, document.getElementById(
                        "dialog_settings_object_edit_fcr_winter_start").value =
                    settingsObjectData[t].fcr.winter_start, document
                    .getElementById(
                        "dialog_settings_object_edit_fcr_winter_end").value =
                    settingsObjectData[t].fcr.winter_end,
                    settingsObjectEditSwitchFCRMeasurement(), document
                    .getElementById("settings_object_accuracy_time_adj").value =
                    settingsObjectData[t].time_adj, $(
                        "#settings_object_accuracy_time_adj").multipleSelect(
                        "refresh"), document.getElementById(
                        "settings_object_accuracy_detect_stops").value =
                    settingsObjectData[t].accuracy.stops, $(
                        "#settings_object_accuracy_detect_stops")
                    .multipleSelect("refresh"), document.getElementById(
                        "settings_object_accuracy_moving_speed").value =
                    settingsObjectData[t].accuracy.min_moving_speed, document
                    .getElementById("settings_object_accuracy_idle_speed")
                    .value = settingsObjectData[t].accuracy.min_idle_speed,
                    document.getElementById(
                        "settings_object_accuracy_diff_points").value =
                    settingsObjectData[t].accuracy.min_diff_points, document
                    .getElementById("settings_object_accuracy_use_gpslev")
                    .checked = settingsObjectData[t].accuracy.use_gpslev,
                    document.getElementById("settings_object_accuracy_gpslev")
                    .value = settingsObjectData[t].accuracy.min_gpslev, document
                    .getElementById("settings_object_accuracy_use_hdop")
                    .checked = settingsObjectData[t].accuracy.use_hdop, document
                    .getElementById("settings_object_accuracy_hdop").value =
                    settingsObjectData[t].accuracy.max_hdop, document
                    .getElementById("settings_object_accuracy_fuel_speed")
                    .value = settingsObjectData[t].accuracy.min_fuel_speed,
                    document.getElementById("settings_object_accuracy_ff")
                    .value = settingsObjectData[t].accuracy.min_ff, document
                    .getElementById("settings_object_accuracy_ft").value =
                    settingsObjectData[t].accuracy.min_ft, document
                    .getElementById("dialog_settings_object_edit_odometer_type")
                    .value = settingsObjectData[t].odometer_type, $(
                        "#dialog_settings_object_edit_odometer_type")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_object_edit_engine_hours_type").value =
                    settingsObjectData[t].engine_hours_type, $(
                        "#dialog_settings_object_edit_engine_hours_type")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_object_edit_odometer").value =
                    settingsObjectData[t].odometer, document.getElementById(
                        "dialog_settings_object_edit_engine_hours").value =
                    settingsObjectData[t].engine_hours, settingsEditData
                    .odometer = settingsObjectData[t].odometer, settingsEditData
                    .engine_hours = settingsObjectData[t].engine_hours, $(
                        "#settings_object_sensor_list_grid").jqGrid(
                        "setGridParam", {
                            url: "func/fn_settings.sensors.php?cmd=load_object_sensor_list&imei=" +
                                t
                        }).trigger("reloadGrid"), $(
                        "#settings_object_service_list_grid").jqGrid(
                        "setGridParam", {
                            url: "func/fn_settings.service.php?cmd=load_object_service_list&imei=" +
                                t
                        }).trigger("reloadGrid"), $(
                        "#settings_object_custom_fields_list_grid").jqGrid(
                        "setGridParam", {
                            url: "func/fn_settings.customfields.php?cmd=load_object_custom_field_list&imei=" +
                                t
                        }).trigger("reloadGrid"), $(
                        "#settings_object_info_list_grid").jqGrid(
                        "setGridParam", {
                            url: "func/fn_settings.objects.php?cmd=load_object_info_list&imei=" +
                                t
                        }).trigger("reloadGrid"), $(
                        "#dialog_settings_object_edit").dialog("open");
                break;
            case "save":
                if (!utilsCheckPrivileges("viewer")) return;
                a = document.getElementById("dialog_settings_object_edit_group")
                    .value, o = document.getElementById(
                        "dialog_settings_object_edit_driver").value, i =
                    document.getElementById(
                        "dialog_settings_object_edit_trailer").value;
                var n = document.getElementById(
                        "dialog_settings_object_edit_name").value,
                    l = settingsEditData.object_icon;
                fileExist(l) || (l = "img/markers/objects/land-truck.svg");
                s = {
                    arrow_no_connection: document.getElementById(
                        "dialog_settings_object_edit_arrow_no_connection"
                        ).value,
                    arrow_stopped: document.getElementById(
                            "dialog_settings_object_edit_arrow_stopped")
                        .value,
                    arrow_moving: document.getElementById(
                            "dialog_settings_object_edit_arrow_moving")
                        .value,
                    arrow_engine_idle: document.getElementById(
                            "dialog_settings_object_edit_arrow_engine_idle")
                        .value
                };
                s = JSON.stringify(s);
                var d = document.getElementById(
                        "dialog_settings_object_edit_map_icon").value,
                    r = (t = settingsEditData.object_imei, document
                        .getElementById("dialog_settings_object_edit_device")
                        .value),
                    _ = document.getElementById(
                        "dialog_settings_object_edit_model").value,
                    c = document.getElementById(
                        "dialog_settings_object_edit_vin").value,
                    g = document.getElementById(
                        "dialog_settings_object_edit_plate_number").value,
                    m = document.getElementById(
                        "dialog_settings_object_edit_sim_number").value,
                    u = "#" + document.getElementById(
                        "dialog_settings_object_edit_tail_color").value,
                    p = document.getElementById(
                        "dialog_settings_object_edit_tail_points").value,
                    y = {
                        source: document.getElementById(
                            "dialog_settings_object_edit_fcr_source").value,
                        measurement: document.getElementById(
                                "dialog_settings_object_edit_fcr_measurement")
                            .value,
                        cost: document.getElementById(
                            "dialog_settings_object_edit_fcr_cost").value,
                        summer: document.getElementById(
                            "dialog_settings_object_edit_fcr_summer").value,
                        winter: document.getElementById(
                            "dialog_settings_object_edit_fcr_winter").value,
                        winter_start: document.getElementById(
                                "dialog_settings_object_edit_fcr_winter_start")
                            .value,
                        winter_end: document.getElementById(
                                "dialog_settings_object_edit_fcr_winter_end")
                            .value
                    };
                y = JSON.stringify(y), "" == document.getElementById(
                        "settings_object_accuracy_moving_speed").value && (
                        document.getElementById(
                            "settings_object_accuracy_moving_speed").value = 6),
                    "" == document.getElementById(
                        "settings_object_accuracy_idle_speed").value && (
                        document.getElementById(
                            "settings_object_accuracy_idle_speed").value = 3),
                    "" == document.getElementById(
                        "settings_object_accuracy_diff_points").value && (
                        document.getElementById(
                            "settings_object_accuracy_diff_points").value = 5e-4
                        ), document.getElementById(
                        "settings_object_accuracy_gpslev").value < 1 && (
                        document.getElementById(
                            "settings_object_accuracy_gpslev").value = 5),
                    document.getElementById("settings_object_accuracy_hdop")
                    .value < 1 && (document.getElementById(
                        "settings_object_accuracy_hdop").value = 3), document
                    .getElementById("settings_object_accuracy_fuel_speed")
                    .value < 1 && (document.getElementById(
                        "settings_object_accuracy_fuel_speed").value = 10),
                    document.getElementById("settings_object_accuracy_ff")
                    .value < 1 && (document.getElementById(
                        "settings_object_accuracy_ff").value = 10), document
                    .getElementById("settings_object_accuracy_ft").value < 1 &&
                    (document.getElementById("settings_object_accuracy_ft")
                        .value = 10);
                var v = document.getElementById(
                        "settings_object_accuracy_time_adj").value,
                    b = {
                        stops: document.getElementById(
                            "settings_object_accuracy_detect_stops").value,
                        min_moving_speed: document.getElementById(
                            "settings_object_accuracy_moving_speed").value,
                        min_idle_speed: document.getElementById(
                            "settings_object_accuracy_idle_speed").value,
                        min_diff_points: document.getElementById(
                            "settings_object_accuracy_diff_points").value,
                        use_gpslev: document.getElementById(
                            "settings_object_accuracy_use_gpslev").checked,
                        min_gpslev: document.getElementById(
                            "settings_object_accuracy_gpslev").value,
                        use_hdop: document.getElementById(
                            "settings_object_accuracy_use_hdop").checked,
                        max_hdop: document.getElementById(
                            "settings_object_accuracy_hdop").value,
                        min_fuel_speed: document.getElementById(
                            "settings_object_accuracy_fuel_speed").value,
                        min_ff: document.getElementById(
                            "settings_object_accuracy_ff").value,
                        min_ft: document.getElementById(
                            "settings_object_accuracy_ft").value
                    };
                b = JSON.stringify(b);
                var h = document.getElementById(
                        "dialog_settings_object_edit_odometer_type").value,
                    E = document.getElementById(
                        "dialog_settings_object_edit_engine_hours_type").value,
                    f = document.getElementById(
                        "dialog_settings_object_edit_odometer").value,
                    I = document.getElementById(
                        "dialog_settings_object_edit_engine_hours").value;
                if (f == settingsEditData.odometer && (f = !1), I ==
                    settingsEditData.engine_hours && (I = !1), "" == n) {
                    notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                    break
                }
                var B = {
                    cmd: "edit_object",
                    group_id: a,
                    driver_id: o,
                    trailer_id: i,
                    name: n,
                    imei: t,
                    device: r,
                    sim_number: m,
                    model: _,
                    vin: c,
                    plate_number: g,
                    icon: l,
                    map_arrows: s,
                    map_icon: d,
                    tail_color: u,
                    tail_points: p,
                    fcr: y,
                    time_adj: v,
                    accuracy: b,
                    odometer_type: h,
                    engine_hours_type: E,
                    odometer: f,
                    engine_hours: I
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.objects.php",
                    data: B,
                    cache: !1,
                    success: function(e) {
                        "OK" == e && (settingsReloadObjects(), $(
                                "#dialog_settings_object_edit")
                            .dialog("close"), notifyBox("info",
                                la.INFORMATION, la
                                .CHANGES_SAVED_SUCCESSFULLY))
                    }
                });
                break;
            case "cancel":
                $("#dialog_settings_object_edit").dialog("close")
        }
}

function settingsClose() {
    loadSettings("objects", function() {
        objectReloadData();
    })
}

function settingsReloadObjects () {
  loadSettings('objects', function () {
  if( 1 != $('#dialog_settings').dialog('isOpen')){ 
       objectReloadData();
  }
});
  $('#settings_main_object_list_grid').trigger('reloadGrid');

}

function settingsReloadObjectGroups () {
  loadSettings('object_groups', function () {});
    $('#settings_main_object_group_list_grid').trigger('reloadGrid');
}

function settingsReloadObjectDrivers () {
  loadSettings('object_drivers', function () {});
    $('#settings_main_object_driver_list_grid').trigger('reloadGrid');
}

function settingsReloadObjectPassengers () {
  $('#settings_main_object_passenger_list_grid').trigger('reloadGrid');
}

function settingsReloadObjectTrailers () {
  loadSettings('object_trailers', function () {});
    $('#settings_main_object_trailer_list_grid').trigger('reloadGrid');
}

function settingsReloadEvents () {
  loadSettings('events', function () {});
    $('#settings_main_events_event_list_grid').trigger('reloadGrid');
}

function settingsReloadTemplates () {
  loadSettings('templates', function () {});
    $('#settings_main_templates_template_list_grid').trigger('reloadGrid');
}

function settingsReloadSubaccounts () {
  loadSettings('subaccounts', function () {});
    $('#settings_main_subaccount_list_grid').trigger('reloadGrid');
}

function settingsCheck () {
    var isMainDst =    document.getElementById('settings_main_dst').checked;
    if(isMainDst){
    document.getElementById('settings_main_dst_start_mmdd').disabled = false;
      document.getElementById('settings_main_dst_start_hhmm').disabled = false;
      document.getElementById('settings_main_dst_end_mmdd').disabled = false;
      document.getElementById('settings_main_dst_end_hhmm').disabled = false;
    }else{
    document.getElementById('settings_main_dst_start_mmdd').disabled = true;
      document.getElementById('settings_main_dst_start_hhmm').disabled = true;
      document.getElementById('settings_main_dst_end_mmdd').disabled = true;
      document.getElementById('settings_main_dst_end_hhmm').disabled = true;
}
}



function settingsObjectEditSwitchTimeAdj() {
    confirmDialog(la.TIME_ADJ_WARNING, function(e) {
        if (!e) {
            var t = settingsEditData.object_imei;
            document.getElementById("settings_object_accuracy_time_adj")
                .value = settingsObjectData[t].time_adj, $(
                    "#settings_object_accuracy_time_adj")
                .multipleSelect("refresh")
        }
    })
}

function settingsObjectEditIcon() {
    $("#dialog_settings_object_edit_select_icon").dialog("open"),
        settingsObjectEditLoadDefaultIconList(),
        settingsObjectEditLoadCustomIconList()
}

function settingsObjectEditSelectDefaultIcon(e) {
    settingsEditData.object_icon = e, document.getElementById(
            "dialog_settings_object_edit_icon").innerHTML = '<img src="' + e +
        '" />', $("#dialog_settings_object_edit_select_icon").dialog("close")
}

function settingsObjectEditSelectCustomIcon(e) {
    settingsEditData.object_icon = e, document.getElementById(
            "dialog_settings_object_edit_icon").innerHTML = '<img src="' + e +
        '" />', $("#dialog_settings_object_edit_select_icon").dialog("close")
}


function settingsObjectEditLoadDefaultIconList() {
    0 == settingsEditData.default_icons_loaded && $.ajax({
        type: "POST",
        url: "func/fn_files.php",
        data: {
            path: "img/markers/objects"
        },
        dataType: "json",
        success: function(e) {
            var t = '<div class="row2">';
            for (document.getElementById(
                    "settings_object_edit_select_icon_default_list")
                .innerHTML = "", i = 0; i < e.length; i++) {
                var a = "img/markers/objects/" + e[i];
                t += '<div class="icon-object-edit">', t +=
                    '<a href="#" onclick="settingsObjectEditSelectDefaultIcon(\'' +
                    a + "');\">", t += '<img src="' + a +
                    '" style="padding:5px; width: 32px; height: 32px;"/>',
                    t += "</a>", t += "</div>"
            }
            t += "</div>", document.getElementById(
                    "settings_object_edit_select_icon_default_list")
                .innerHTML = t, settingsEditData
                .default_icons_loaded = !0
        }
    })
}

function settingsObjectEditLoadCustomIconList() {
    0 == settingsEditData.custom_icons_loaded && $.ajax({
        type: "POST",
        url: "func/fn_files.php",
        data: {
            path: "data/user/objects"
        },
        dataType: "json",
        success: function(e) {
            var t = '<div class="row2">';
            for (document.getElementById(
                    "settings_object_edit_select_icon_custom_list")
                .innerHTML = "", i = 0; i < e.length; i++) {
                var a = "data/user/objects/" + e[i];
                t += '<div class="icon-object-edit">', t +=
                    '<a href="#" onclick="settingsObjectEditSelectCustomIcon(\'' +
                    a + "');\">", t += '<img src="' + a +
                    '" style="padding:5px; width: 32px; height: 32px;"/>',
                    t += "</a>", t +=
                    '<div class="icon-custom-delete">', t +=
                    '<a href="#" onclick="settingsObjectEditDeleteCustomIcon(\'' +
                    a + "');\">", t +=
                    '<img border="0" src="theme/images/remove.svg" width="8px">',
                    t += "</a>", t += "</div>", t += "</div>"
            }
            t += "</div>", document.getElementById(
                    "settings_object_edit_select_icon_custom_list")
                .innerHTML = t, settingsEditData
                .custom_icons_loaded = !0
        }
    })
}


function settingsObjectEditUploadCustomIcon() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", settingsObjectEditUploadCustomIconFile,
            !1), document.getElementById("load_file").click())
}

function settingsObjectEditUploadCustomIconFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onloadend = function(e) {
        var a = e.target.result;
        if ("image/png" == t[0].type || "image/svg+xml" == t[0].type) {
            var o = new Image;
            o.src = a, o.onload = function() {
                if (o.src.includes("image/png")) {
                    if (32 != o.width || 32 != o.height)
                    return void notifyBox("error", la.ERROR, la
                            .ICON_SIZE_SHOULD_BE_32_32);
                    var e = "func/fn_upload.php?file=object_icon_png"
                } else e = "func/fn_upload.php?file=object_icon_svg";
                $.ajax({
                    url: e,
                    type: "POST",
                    data: a,
                    processData: !1,
                    contentType: !1,
                    success: function(e) {
                        settingsEditData
                            .custom_icons_loaded = !1,
                            settingsObjectEditLoadCustomIconList()
                    }
                })
            }, document.getElementById("load_file").value = ""
        } else notifyBox("error", la.ERROR, la.FILE_TYPE_MUST_BE_PNG_OR_SVG)
    }, a.readAsDataURL(t[0]), this.removeEventListener("change",
        settingsObjectEditUploadCustomIconFile, !1)
}


function settingsObjectEditDeleteCustomIcon(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE_THIS_ICON,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_custom_icon",
                    file: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.objects.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && (settingsEditData
                            .custom_icons_loaded = !1,
                            settingsObjectEditLoadCustomIconList()
                            )
                    }
                })
            }
        })
}

function settingsObjectEditDeleteAllCustomIcon() {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE_ALL_CUSTOM_ICONS,
        function(e) {
            if (e) {
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.objects.php",
                    data: {
                        cmd: "delete_all_custom_icons"
                    },
                    success: function(e) {
                        "OK" == e && (settingsEditData
                            .custom_icons_loaded = !1,
                            settingsObjectEditLoadCustomIconList()
                            )
                    }
                })
            }
        })
}

function settingsObjectEditSwitchFCRMeasurement() {
    "l100km" == document.getElementById(
        "dialog_settings_object_edit_fcr_measurement").value ? (document
        .getElementById("dialog_settings_object_edit_fcr_cost_label")
        .innerHTML = la.COST_PER_LITER, document.getElementById(
            "dialog_settings_object_edit_fcr_summer_label").innerHTML = la
        .SUMMER_RATE_L100KM, document.getElementById(
            "dialog_settings_object_edit_fcr_winter_label").innerHTML = la
        .WINTER_RATE_L100KM) : (document.getElementById(
            "dialog_settings_object_edit_fcr_cost_label").innerHTML = la
        .COST_PER_GALLON, document.getElementById(
            "dialog_settings_object_edit_fcr_summer_label").innerHTML = la
        .SUMMER_RATE_MPG, document.getElementById(
            "dialog_settings_object_edit_fcr_winter_label").innerHTML = la
        .WINTER_RATE_MPG)
}



function settingsObjectSensorResultPreview() {
    var e = settingsEditData.object_imei;
    if (null != objectsData[e].data[0]) {
        var t = objectsData[e].data[0].params,
            a = document.getElementById("dialog_settings_object_sensor_type")
            .value,
            o = document.getElementById("dialog_settings_object_sensor_param")
            .value,
            i = document.getElementById(
                "dialog_settings_object_sensor_result_type").value,
            s = document.getElementById("dialog_settings_object_sensor_units")
            .value,
            n = document.getElementById("dialog_settings_object_sensor_text_1")
            .value,
            l = document.getElementById("dialog_settings_object_sensor_text_0")
            .value,
            d = document.getElementById("dialog_settings_object_sensor_formula")
            .value,
            r = document.getElementById("dialog_settings_object_sensor_lv")
            .value,
            _ = document.getElementById("dialog_settings_object_sensor_hv")
            .value,
            c = settingsEditData.sensor_calibration;
        1 == c.length && (c = []);
        var g = settingsEditData.sensor_dictionary,
            m = getParamValue(t, o);
        document.getElementById("dialog_settings_object_sensor_cur_param_val")
            .value = m;
        var u = getSensorValue(t, {
            type: a,
            param: o,
            result_type: i,
            text_1: n,
            text_0: l,
            units: s,
            lv: r,
            hv: _,
            formula: d,
            calibration: c,
            dictionary: g
        });
        document.getElementById("dialog_settings_object_sensor_result_preview")
            .value = u.value_full
    }
}





function settingsObjectSensorImport() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", settingsObjectSensorImportSENFile, !1),
        document.getElementById("load_file").click())
}

function settingsObjectSensorExport() {
    if (utilsCheckPrivileges("viewer")) {
        var e = "func/fn_export.php?format=sen&imei=" + settingsEditData
            .object_imei;
        window.location = e
    }
}


function settingsObjectSensorImportSENFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        try {
            var t = $.parseJSON(e.target.result);
            if ("0.1v" == t.sen) {
                var a = settingsEditData.object_imei,
                    o = t.sensors.length;
                if (0 == o) return void notifyBox("info", la.INFORMATION, la
                    .NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
                confirmDialog(sprintf(la.SENSORS_FOUND, o) + " " + la
                    .ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
                    function(t) {
                        if (t) {
                            loadingData(!0);
                            var o = {
                                format: "sen",
                                data: e.target.result,
                                imei: a
                            };
                            $.ajax({
                                type: "POST",
                                url: "func/fn_import.php",
                                data: o,
                                cache: !1,
                                success: function(e) {
                                    loadingData(!1), "OK" ==
                                        e && (
                                            settingsReloadObjects(),
                                            $(
                                                "#settings_object_sensor_list_grid")
                                            .trigger(
                                                "reloadGrid"
                                                ))
                                },
                                error: function(e, t) {
                                    loadingData(!1)
                                }
                            })
                        }
                    })
            } else notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        } catch (e) {
            notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        }
        document.getElementById("load_file").value = ""
    }, a.readAsText(t[0], "UTF-8"), this.removeEventListener("change",
        settingsObjectSensorImportSENFile, !1)
}

function settingsObjectClearDetectedSensorCache() {
    var e = settingsEditData.object_imei;
    confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_CLEAR_DETECTED_SENSOR_CACHE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "clear_detected_sensor_cache",
                    imei: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.sensors.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && (settingsReloadObjects(),
                            $(
                                "#settings_object_sensor_list_grid")
                            .trigger("reloadGrid"))
                    }
                })
            }
        })
}


function settingsObjectSensorProperties(a) {
    var b = settingsEditData.object_imei;
    switch (a) {
        default:
            var c = a;
            settingsEditData.sensor_id = c;
            var d = document.getElementById(
                "dialog_settings_object_sensor_param");
            d.options.length = 0;
            for (var f = getObjectParamsArray(b), i = 0; i < f.length; i++) d
                .options.add(new Option(f[i], f[i]));
            document.getElementById("dialog_settings_object_sensor_type")
                .value = settingsObjectData[b].sensors[c].type, $(
                    "#dialog_settings_object_sensor_type").multipleSelect(
                    "refresh"), settingsObjectSensorType(), document
                .getElementById("dialog_settings_object_sensor_result_type")
                .value = settingsObjectData[b].sensors[c].result_type, $(
                    "#dialog_settings_object_sensor_result_type")
                .multipleSelect("refresh"), settingsObjectSensorResultType(),
                document.getElementById("dialog_settings_object_sensor_name")
                .value = settingsObjectData[b].sensors[c].name, document
                .getElementById("dialog_settings_object_sensor_param").value =
                settingsObjectData[b].sensors[c].param, $(
                    "#dialog_settings_object_sensor_param").multipleSelect(
                    "refresh"), document.getElementById(
                    "dialog_settings_object_sensor_units").value =
                settingsObjectData[b].sensors[c].units, document.getElementById(
                    "dialog_settings_object_sensor_text_1").value =
                settingsObjectData[b].sensors[c].text_1, document
                .getElementById("dialog_settings_object_sensor_text_0").value =
                settingsObjectData[b].sensors[c].text_0;
            var h = settingsObjectData[b].sensors[c].result_type;
            "abs" == h || "rel" == h ? (document.getElementById(
                        "dialog_settings_object_sensor_data_list").checked = !1,
                    document.getElementById(
                        "dialog_settings_object_sensor_popup").checked = !1) : (
                    document.getElementById(
                        "dialog_settings_object_sensor_data_list").checked =
                    strToBoolean(settingsObjectData[b].sensors[c].data_list),
                    document.getElementById(
                        "dialog_settings_object_sensor_popup").checked =
                    strToBoolean(settingsObjectData[b].sensors[c].popup)),
                "value" != h && "accum" != h && "abs" != h && "rel" != h || (
                    document.getElementById(
                        "dialog_settings_object_sensor_formula").value =
                    settingsObjectData[b].sensors[c].formula), "percentage" ==
                h ? (document.getElementById("dialog_settings_object_sensor_lv")
                    .value = settingsObjectData[b].sensors[c].lv, document
                    .getElementById("dialog_settings_object_sensor_hv").value =
                    settingsObjectData[b].sensors[c].hv) : (document
                    .getElementById("dialog_settings_object_sensor_lv").value =
                    "", document.getElementById(
                        "dialog_settings_object_sensor_hv").value = ""),
                "acc" == settingsObjectData[b].sensors[c].type ? document
                .getElementById("dialog_settings_object_sensor_acc_ignore")
                .checked = !1 : document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").checked =
                strToBoolean(settingsObjectData[b].sensors[c].acc_ignore),
                document.getElementById("settings_object_sensor_calibration_x")
                .value = "", document.getElementById(
                    "settings_object_sensor_calibration_y").value = "",
                settingsEditData.sensor_calibration = settingsObjectData[b]
                .sensors[c].calibration.slice(0),
                settingsObjectSensorCalibrationList(), document.getElementById(
                    "settings_object_sensor_dictionary_value").value = "",
                document.getElementById(
                    "settings_object_sensor_dictionary_text").value = "",
                settingsEditData.sensor_dictionary = settingsObjectData[b]
                .sensors[c].dictionary.slice(0),
                settingsObjectSensorDictionaryList(), document.getElementById(
                    "dialog_settings_object_sensor_cur_param_val").value = "",
                document.getElementById(
                    "dialog_settings_object_sensor_result_preview").value = "",
                $("#dialog_settings_object_sensor_properties").dialog("open"),
                settingsObjectSensorResultPreview();
            break;
        case "add":
            if (settingsEditData.sensor_id = !1, "" != settingsObjectData[b]
                .params) {
                var d = document.getElementById(
                    "dialog_settings_object_sensor_param");
                d.options.length = 0;
                for (var f = getObjectParamsArray(b), i = 0; i < f.length; i++)
                    d.options.add(new Option(f[i], f[i]));
                document.getElementById("dialog_settings_object_sensor_type")
                    .value = "batt", $("#dialog_settings_object_sensor_type")
                    .multipleSelect("refresh"), settingsObjectSensorType(),
                    document.getElementById(
                        "dialog_settings_object_sensor_result_type").value =
                    "value", $("#dialog_settings_object_sensor_result_type")
                    .multipleSelect("refresh"),
                settingsObjectSensorResultType(), document.getElementById(
                        "dialog_settings_object_sensor_name").value = "",
                    document.getElementById(
                        "dialog_settings_object_sensor_param").value = "", $(
                        "#dialog_settings_object_sensor_param").multipleSelect(
                        "refresh"), document.getElementById(
                        "dialog_settings_object_sensor_data_list").checked = !0,
                    document.getElementById(
                        "dialog_settings_object_sensor_popup").checked = !1,
                    document.getElementById(
                        "dialog_settings_object_sensor_acc_ignore").checked = !
                    1, document.getElementById(
                        "dialog_settings_object_sensor_cur_param_val").value =
                    "", document.getElementById(
                        "dialog_settings_object_sensor_result_preview").value =
                    "", $("#dialog_settings_object_sensor_properties").dialog(
                        "open")
            } else notifyBox("info", la.INFORMATION, la
                .SENSOR_PARAMETERS_ARE_NOT_DETECTED_FOR_THIS_GPS_DEVICE);
            break;
        case "cancel":
            $("#dialog_settings_object_sensor_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var j = document.getElementById(
                    "dialog_settings_object_sensor_name").value,
                type = document.getElementById(
                    "dialog_settings_object_sensor_type").value,
                param = document.getElementById(
                    "dialog_settings_object_sensor_param").value,
                data_list = document.getElementById(
                    "dialog_settings_object_sensor_data_list").checked,
                popup = document.getElementById(
                    "dialog_settings_object_sensor_popup").checked,
                h = document.getElementById(
                    "dialog_settings_object_sensor_result_type").value,
                units = document.getElementById(
                    "dialog_settings_object_sensor_units").value,
                text_1 = document.getElementById(
                    "dialog_settings_object_sensor_text_1").value,
                text_0 = document.getElementById(
                    "dialog_settings_object_sensor_text_0").value,
                lv = document.getElementById("dialog_settings_object_sensor_lv")
                .value,
                hv = document.getElementById("dialog_settings_object_sensor_hv")
                .value,
                acc_ignore = document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").checked,
                formula = document.getElementById(
                    "dialog_settings_object_sensor_formula").value;
            if (("" == j || "" == param) && "abs" == h) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (("" == j || "" == param) && "rel" == h) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (("" == j || "" == param || "" == text_1 || "" == text_0) &&
                "logic" == h) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (("" == j || "" == param) && "value" == h) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (("" == j || "" == param) && "string" == h) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (("" == j || "" == param || "" == lv || "" == hv) &&
                "percentage" == h) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if ("" != formula) {
                formula = formula.toLowerCase(), formula = formula.replace(
                    /[^-()\d/*+.x]/g, "");
                var k = formula.replace("x", "1");
                try {
                    eval(k)
                } catch (e) {
                    if (e instanceof SyntaxError) {
                        notifyBox("error", la.ERROR, la.FORMULA_IS_NOT);
                        break
                    }
                    notifyBox("error", la.ERROR, la.FORMULA_IS_NOT);
                    break
                }
                if (!formula.match("x")) {
                    notifyBox("error", la.ERROR, la.FORMULA_IS_NOT);
                    break
                }
            }
            if (0 == settingsEditData.sensor_id) {
                if (0 != getSensorFromType(b, "acc") && "acc" == type) {
                    notifyBox("error", la.ERROR, la
                        .IGNITION_SENSOR_IS_ALREADY_AVAILABLE);
                    break
                }
                if (0 != getSensorFromType(b, "da") && "da" == type) {
                    notifyBox("error", la.ERROR, la
                        .DRIVER_ASSIGN_SENSOR_IS_ALREADY_AVAILABLE);
                    break
                }
                if (0 != getSensorFromType(b, "engh") && "engh" == type) {
                    notifyBox("error", la.ERROR, la
                        .ENGINE_HOURS_SENSOR_IS_ALREADY_AVAILABLE);
                    break
                }
                if (0 != getSensorFromType(b, "fuelsumup") && "fuelsumup" ==
                    type) {
                    notifyBox("error", la.ERROR, la
                        .FUEL_LEVEL_SUM_UP_SENSOR_IS_ALREADY_AVAILABLE);
                    break
                }
                if (0 != getSensorFromType(b, "fuelcons") && "fuelcons" ==
                    type) {
                    notifyBox("error", la.ERROR, la
                        .FUEL_CONSUMPTION_SENSOR_IS_ALREADY_AVAILABLE);
                    break
                }
                if (0 != getSensorFromType(b, "odo") && "odo" == type) {
                    notifyBox("error", la.ERROR, la
                        .ODOMETER_SENSOR_IS_ALREADY_AVAILABLE);
                    break
                }
                if (0 != getSensorFromType(b, "pa") && "pa" == type) {
                    notifyBox("error", la.ERROR, la
                        .PASSENGER_ASSIGN_SENSOR_IS_ALREADY_AVAILABLE);
                    break
                }
                if (0 != getSensorFromType(b, "ta") && "ta" == type) {
                    notifyBox("error", la.ERROR, la
                        .TRAILER_ASSIGN_SENSOR_IS_ALREADY_AVAILABLE);
                    break
                }
            }
            var l = settingsEditData.sensor_calibration;
            if (1 == l.length) {
                notifyBox("error", la.ERROR, la
                .AT_LEAST_TWO_CALIBRATION_POINTS);
                break
            }
            var l = JSON.stringify(l),
                dictionary = settingsEditData.sensor_dictionary,
                dictionary = JSON.stringify(dictionary),
                data = {
                    cmd: "save_object_sensor",
                    sensor_id: settingsEditData.sensor_id,
                    imei: b,
                    name: j,
                    type: type,
                    param: param,
                    data_list: data_list,
                    popup: popup,
                    result_type: h,
                    text_1: text_1,
                    text_0: text_0,
                    units: units,
                    lv: lv,
                    hv: hv,
                    acc_ignore: acc_ignore,
                    formula: formula,
                    calibration: l,
                    dictionary: dictionary
                };
            $.ajax({
                type: "POST",
                url: "func/fn_settings.sensors.php",
                data: data,
                cache: !1,
                success: function(e) {
                    "OK" == e && (settingsReloadObjects(), $(
                            "#settings_object_sensor_list_grid")
                        .trigger("reloadGrid"), $(
                            "#dialog_settings_object_sensor_properties"
                            ).dialog("close"), notifyBox("info",
                            la.INFORMATION, la
                            .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}




function settingsObjectSensorDelete(e) {
    if (utilsCheckPrivileges("viewer")) {
        var t = settingsEditData.object_imei;
        confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE, function(a) {
            if (a) {
                var o = {
                    cmd: "delete_object_sensor",
                    sensor_id: e,
                    imei: t
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.sensors.php",
                    data: o,
                    success: function(e) {
                        "OK" == e && (
                        settingsReloadObjects(), $(
                            "#settings_object_sensor_list_grid"
                            ).trigger("reloadGrid"))
                    }
                })
            }
        })
    }
}


function settingsObjectSensorDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = settingsEditData.object_imei,
            t = $("#settings_object_sensor_list_grid").jqGrid("getGridParam",
                "selarrrow");
        "" != t ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(a) {
                if (a) {
                    var o = {
                        cmd: "delete_selected_object_sensors",
                        items: t,
                        imei: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.sensors.php",
                        data: o,
                        success: function(e) {
                            "OK" == e && (
                            settingsReloadObjects(), $(
                                "#settings_object_sensor_list_grid"
                                ).trigger("reloadGrid"))
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}




function settingsObjectSensorCalibrationList() {
    var e = settingsEditData.sensor_calibration,
        t = [],
        a = $("#settings_object_sensor_calibration_list_grid");
    if (a.clearGridData(!0), 0 != e.length) {
        for (var o = 0; o < e.length; o++) {
            var i = '<a href="#" onclick="settingsObjectSensorCalibrationDel(' +
                o + ');" title="' + la.DELETE +
                '"><img src="theme/images/remove3.svg" /></a>';
            t.push({
                x: e[o].x,
                y: e[o].y,
                modify: i
            })
        }
        for (o = 0; o < t.length; o++) a.jqGrid("addRowData", o, t[o]);
        a.setGridParam({
            sortname: "x",
            sortorder: "asc"
        }).trigger("reloadGrid")
    }
}

function settingsObjectSensorCalibrationAdd() {
    var e = document.getElementById("settings_object_sensor_calibration_x")
        .value,
        t = document.getElementById("settings_object_sensor_calibration_y")
        .value;
    isNumber(e) || (e = 0), isNumber(t) || (t = 0);
    for (var a = 0; a < settingsEditData.sensor_calibration.length; a++)
        if (settingsEditData.sensor_calibration[a].x == e)
        return void notifyBox("error", la.ERROR, la
                .VALUE_IS_ALREADY_AVAILABLE);
    settingsEditData.sensor_calibration.push({
            x: e,
            y: t
        }), document.getElementById("settings_object_sensor_calibration_x")
        .value = "", document.getElementById(
            "settings_object_sensor_calibration_y").value = "",
        settingsObjectSensorCalibrationList()
}

function settingsObjectSensorCalibrationDel(e) {
    settingsEditData.sensor_calibration.splice(e, 1),
        settingsObjectSensorCalibrationList()
}
function settingsObjectSensorDictionaryList() {
    var e = settingsEditData.sensor_dictionary,
        t = [],
        a = $("#settings_object_sensor_dictionary_list_grid");
    if (a.clearGridData(!0), 0 != e.length) {
        for (var o = 0; o < e.length; o++) {
            var i = '<a href="#" onclick="settingsObjectSensorDictionaryDel(' +
                o + ');" title="' + la.DELETE +
                '"><img src="theme/images/remove3.svg" /></a>';
            t.push({
                value: e[o].value,
                text: e[o].text,
                modify: i
            })
        }
        for (o = 0; o < t.length; o++) a.jqGrid("addRowData", o, t[o]);
        a.setGridParam({
            sortname: "value",
            sortorder: "asc"
        }).trigger("reloadGrid")
    }
}
function settingsObjectSensorDictionaryAdd() {
    var e = document.getElementById("settings_object_sensor_dictionary_value")
        .value,
        t = document.getElementById("settings_object_sensor_dictionary_text")
        .value;
    isNumber(e) || (e = 0);
    for (var a = 0; a < settingsEditData.sensor_dictionary.length; a++)
        if (settingsEditData.sensor_dictionary[a].value == e)
        return void notifyBox("error", la.ERROR, la
                .VALUE_IS_ALREADY_AVAILABLE);
    settingsEditData.sensor_dictionary.push({
            value: e,
            text: t
        }), document.getElementById("settings_object_sensor_dictionary_value")
        .value = "", document.getElementById(
            "settings_object_sensor_dictionary_text").value = "",
        settingsObjectSensorDictionaryList()
}

function settingsObjectSensorDictionaryDel(e) {
    settingsEditData.sensor_dictionary.splice(e, 1),
        settingsObjectSensorDictionaryList()
}



function settingsObjectSensorType() {
    var e = document.getElementById("dialog_settings_object_sensor_type").value,
        t = document.getElementById(
        "dialog_settings_object_sensor_result_type");
    switch (t.options.length = 0, e) {
        case "batt":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !1, t
                .options.add(new Option(la.VALUE, "value")), t.options.add(
                    new Option("Percentage", "percentage"));
            break;
        case "di":
        case "do":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !1, t
                .options.add(new Option(la.LOGIC, "logic"));
            break;
        case "da":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_data_list").checked = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_popup").checked = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").checked = !1, t
                .options.add(new Option(la.STRING, "string"));
            break;
        case "engh":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_data_list").checked = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_popup").checked = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").checked = !1, t
                .options.add(new Option(la.ABSOLUTE, "abs")), t.options.add(
                    new Option(la.RELATIVE, "rel"));
            break;
        case "fuel":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !1, t
                .options.add(new Option(la.VALUE, "value")), t.options.add(
                    new Option("Percentage", "percentage"));
            break;
        case "fuelsumup":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").checked = !1;
            break;
        case "fuelcons":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_data_list").checked = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_popup").checked = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !1, t
                .options.add(new Option(la.ABSOLUTE, "abs")), t.options.add(
                    new Option(la.RELATIVE, "rel"));
            break;
        case "gsm":
        case "gps":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !1, t
                .options.add(new Option(la.VALUE, "value")), t.options.add(
                    new Option("Percentage", "percentage"));
            break;
        case "acc":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").checked = !1, t
                .options.add(new Option(la.LOGIC, "logic"));
            break;
        case "odo":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_data_list").checked = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_popup").checked = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").checked = !1, t
                .options.add(new Option(la.ABSOLUTE, "abs")), t.options.add(
                    new Option(la.RELATIVE, "rel"));
            break;
        case "pa":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_data_list").checked = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_popup").checked = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").checked = !1, t
                .options.add(new Option(la.STRING, "string"));
            break;
        case "temp":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !1, t
                .options.add(new Option(la.VALUE, "value"));
            break;
        case "ta":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_data_list").checked = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_popup").checked = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !0,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").checked = !1, t
                .options.add(new Option(la.STRING, "string"));
            break;
        case "cust":
            document.getElementById("dialog_settings_object_sensor_param")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_data_list").disabled = !1,
                document.getElementById("dialog_settings_object_sensor_popup")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_result_type").disabled = !1,
                document.getElementById(
                    "dialog_settings_object_sensor_acc_ignore").disabled = !1, t
                .options.add(new Option(la.LOGIC, "logic")), t.options.add(
                    new Option(la.VALUE, "value")), t.options.add(new Option(la
                    .STRING, "string")), t.options.add(new Option(la.PERCENTAGE,
                    "percentage"))
    }
    settingsObjectSensorResultType()
}


function settingsObjectSensorResultType() {
    switch (document.getElementById("dialog_settings_object_sensor_units")
        .value = "", document.getElementById(
            "dialog_settings_object_sensor_text_1").value = "", document
        .getElementById("dialog_settings_object_sensor_text_0").value = "",
        document.getElementById("dialog_settings_object_sensor_lv").value = "",
        document.getElementById("dialog_settings_object_sensor_hv").value = "",
        document.getElementById("dialog_settings_object_sensor_formula").value =
        "", document.getElementById("settings_object_sensor_calibration_x")
        .value = "", document.getElementById(
            "settings_object_sensor_calibration_y").value = "", settingsEditData
        .sensor_calibration = [], $(
            "#settings_object_sensor_calibration_list_grid").clearGridData(!0),
        document.getElementById("settings_object_sensor_dictionary_value")
        .value = "", document.getElementById(
            "settings_object_sensor_dictionary_text").value = "",
        settingsEditData.sensor_dictionary = [], $(
            "#settings_object_sensor_dictionary_list_grid").clearGridData(!0),
        document.getElementById("dialog_settings_object_sensor_result_type")
        .value) {
        case "":
            document.getElementById("dialog_settings_object_sensor_units")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_text_1").disabled = !0,
                document.getElementById("dialog_settings_object_sensor_text_0")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_lv").disabled = !0, document
                .getElementById("dialog_settings_object_sensor_hv").disabled = !
                0, document.getElementById(
                    "dialog_settings_object_sensor_formula").disabled = !0, $(
                    "#settings_object_sensor_calibration_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "settings_object_sensor_calibration_x").disabled = !0,
                document.getElementById("settings_object_sensor_calibration_y")
                .disabled = !0, document.getElementById(
                    "settings_object_sensor_calibration_add").disabled = !0, $(
                    "#settings_object_sensor_dictionary_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "settings_object_sensor_dictionary_value").disabled = !0,
                document.getElementById(
                    "settings_object_sensor_dictionary_text").disabled = !0,
                document.getElementById("settings_object_sensor_dictionary_add")
                .disabled = !0;
            break;
        case "abs":
        case "rel":
            document.getElementById("dialog_settings_object_sensor_units")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_text_1").disabled = !0,
                document.getElementById("dialog_settings_object_sensor_text_0")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_lv").disabled = !0, document
                .getElementById("dialog_settings_object_sensor_hv").disabled = !
                0, document.getElementById(
                    "dialog_settings_object_sensor_formula").disabled = !1, $(
                    "#settings_object_sensor_calibration_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "settings_object_sensor_calibration_x").disabled = !0,
                document.getElementById("settings_object_sensor_calibration_y")
                .disabled = !0, document.getElementById(
                    "settings_object_sensor_calibration_add").disabled = !0, $(
                    "#settings_object_sensor_dictionary_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "settings_object_sensor_dictionary_value").disabled = !0,
                document.getElementById(
                    "settings_object_sensor_dictionary_text").disabled = !0,
                document.getElementById("settings_object_sensor_dictionary_add")
                .disabled = !0;
            break;
        case "logic":
            document.getElementById("dialog_settings_object_sensor_units")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_text_1").disabled = !1,
                document.getElementById("dialog_settings_object_sensor_text_0")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_lv").disabled = !0, document
                .getElementById("dialog_settings_object_sensor_hv").disabled = !
                0, document.getElementById(
                    "dialog_settings_object_sensor_formula").disabled = !0, $(
                    "#settings_object_sensor_calibration_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "settings_object_sensor_calibration_x").disabled = !0,
                document.getElementById("settings_object_sensor_calibration_y")
                .disabled = !0, document.getElementById(
                    "settings_object_sensor_calibration_add").disabled = !0, $(
                    "#settings_object_sensor_dictionary_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "settings_object_sensor_dictionary_value").disabled = !0,
                document.getElementById(
                    "settings_object_sensor_dictionary_text").disabled = !0,
                document.getElementById("settings_object_sensor_dictionary_add")
                .disabled = !0;
            break;
        case "value":
            document.getElementById("dialog_settings_object_sensor_units")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_text_1").disabled = !0,
                document.getElementById("dialog_settings_object_sensor_text_0")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_lv").disabled = !0, document
                .getElementById("dialog_settings_object_sensor_hv").disabled = !
                0, document.getElementById(
                    "dialog_settings_object_sensor_formula").disabled = !1, $(
                    "#settings_object_sensor_calibration_list_grid").closest(
                    ".ui-jqgrid").unblock(), document.getElementById(
                    "settings_object_sensor_calibration_x").disabled = !1,
                document.getElementById("settings_object_sensor_calibration_y")
                .disabled = !1, document.getElementById(
                    "settings_object_sensor_calibration_add").disabled = !1,
                "cust" == document.getElementById(
                    "dialog_settings_object_sensor_type").value ? ($(
                        "#settings_object_sensor_dictionary_list_grid").closest(
                        ".ui-jqgrid").unblock(), document.getElementById(
                        "settings_object_sensor_dictionary_value").disabled = !
                    1, document.getElementById(
                        "settings_object_sensor_dictionary_text").disabled = !1,
                    document.getElementById(
                        "settings_object_sensor_dictionary_add").disabled = !1
                    ) : ($("#settings_object_sensor_dictionary_list_grid")
                    .closest(".ui-jqgrid").block({
                        message: ""
                    }), document.getElementById(
                        "settings_object_sensor_dictionary_value").disabled = !
                    0, document.getElementById(
                        "settings_object_sensor_dictionary_text").disabled = !0,
                    document.getElementById(
                        "settings_object_sensor_dictionary_add").disabled = !0);
            break;
        case "string":
            document.getElementById("dialog_settings_object_sensor_units")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_text_1").disabled = !0,
                document.getElementById("dialog_settings_object_sensor_text_0")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_lv").disabled = !0, document
                .getElementById("dialog_settings_object_sensor_hv").disabled = !
                0, document.getElementById(
                    "dialog_settings_object_sensor_formula").disabled = !0, $(
                    "#settings_object_sensor_calibration_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "settings_object_sensor_calibration_x").disabled = !0,
                document.getElementById("settings_object_sensor_calibration_y")
                .disabled = !0, document.getElementById(
                    "settings_object_sensor_calibration_add").disabled = !0, $(
                    "#settings_object_sensor_dictionary_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "settings_object_sensor_dictionary_value").disabled = !0,
                document.getElementById(
                    "settings_object_sensor_dictionary_text").disabled = !0,
                document.getElementById("settings_object_sensor_dictionary_add")
                .disabled = !0;
            break;
        case "percentage":
            document.getElementById("dialog_settings_object_sensor_units")
                .value = "%", document.getElementById(
                    "dialog_settings_object_sensor_units").disabled = !0,
                document.getElementById("dialog_settings_object_sensor_text_1")
                .disabled = !0, document.getElementById(
                    "dialog_settings_object_sensor_text_0").disabled = !0,
                document.getElementById("dialog_settings_object_sensor_lv")
                .disabled = !1, document.getElementById(
                    "dialog_settings_object_sensor_hv").disabled = !1, document
                .getElementById("dialog_settings_object_sensor_formula")
                .disabled = !0, $(
                    "#settings_object_sensor_calibration_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "settings_object_sensor_calibration_x").disabled = !0,
                document.getElementById("settings_object_sensor_calibration_y")
                .disabled = !0, document.getElementById(
                    "settings_object_sensor_calibration_add").disabled = !0, $(
                    "#settings_object_sensor_dictionary_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "settings_object_sensor_dictionary_value").disabled = !0,
                document.getElementById(
                    "settings_object_sensor_dictionary_text").disabled = !0,
                document.getElementById("settings_object_sensor_dictionary_add")
                .disabled = !0
    }
}

function settingsObjectServiceImport() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", settingsObjectServiceImportSERFile, !1),
        document.getElementById("load_file").click())
}

function settingsObjectServiceExport() {
    if (utilsCheckPrivileges("viewer")) {
        var e = "func/fn_export.php?format=ser&imei=" + settingsEditData
            .object_imei;
        window.location = e
    }
}

function settingsObjectServiceImportSERFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        try {
            var t = $.parseJSON(e.target.result);
            if ("0.1v" == t.ser) {
                var a = settingsEditData.object_imei,
                    o = t.services.length;
                if (0 == o) return void notifyBox("info", la.INFORMATION, la
                    .NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
                confirmDialog(sprintf(la.SERVICES_FOUND, o) + " " + la
                    .ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
                    function(t) {
                        if (t) {
                            loadingData(!0);
                            var o = {
                                format: "ser",
                                data: e.target.result,
                                imei: a
                            };
                            $.ajax({
                                type: "POST",
                                url: "func/fn_import.php",
                                data: o,
                                cache: !1,
                                success: function(e) {
                                    loadingData(!1), "OK" ==
                                        e && (
                                            settingsReloadObjects(),
                                            $(
                                                "#settings_object_service_list_grid")
                                            .trigger(
                                                "reloadGrid"
                                                ))
                                },
                                error: function(e, t) {
                                    loadingData(!1)
                                }
                            })
                        }
                    })
            } else notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        } catch (e) {
            notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        }
        document.getElementById("load_file").value = ""
    }, a.readAsText(t[0], "UTF-8"), this.removeEventListener("change",
        settingsObjectServiceImportSERFile, !1)
}



function settingsObjectServiceProperties(e) {
    var t = settingsEditData.object_imei;
    switch (e) {
        default:
            var a = e;
            settingsEditData.service_id = a, document.getElementById(
                    "dialog_settings_object_service_name").value =
                settingsObjectData[t].service[a].name, document.getElementById(
                    "dialog_settings_object_service_data_list").checked =
                strToBoolean(settingsObjectData[t].service[a].data_list),
                document.getElementById("dialog_settings_object_service_popup")
                .checked = strToBoolean(settingsObjectData[t].service[a].popup),
                document.getElementById("dialog_settings_object_service_odo")
                .checked = strToBoolean(settingsObjectData[t].service[a].odo),
                1 == document.getElementById(
                    "dialog_settings_object_service_odo").checked ? (document
                    .getElementById(
                        "dialog_settings_object_service_odo_interval").value =
                    settingsObjectData[t].service[a].odo_interval, document
                    .getElementById("dialog_settings_object_service_odo_last")
                    .value = settingsObjectData[t].service[a].odo_last, document
                    .getElementById("dialog_settings_object_service_odo_left")
                    .checked = strToBoolean(settingsObjectData[t].service[a]
                        .odo_left), document.getElementById(
                        "dialog_settings_object_service_odo_left_num").value =
                    settingsObjectData[t].service[a].odo_left_num) : (document
                    .getElementById(
                        "dialog_settings_object_service_odo_interval").value =
                    "", document.getElementById(
                        "dialog_settings_object_service_odo_last").value = "",
                    document.getElementById(
                        "dialog_settings_object_service_odo_left").checked = !1,
                    document.getElementById(
                        "dialog_settings_object_service_odo_left_num").value =
                    ""), document.getElementById(
                    "dialog_settings_object_service_engh").checked =
                strToBoolean(settingsObjectData[t].service[a].engh), 1 ==
                document.getElementById("dialog_settings_object_service_engh")
                .checked ? (document.getElementById(
                        "dialog_settings_object_service_engh_interval").value =
                    settingsObjectData[t].service[a].engh_interval, document
                    .getElementById("dialog_settings_object_service_engh_last")
                    .value = settingsObjectData[t].service[a].engh_last,
                    document.getElementById(
                        "dialog_settings_object_service_engh_left").checked =
                    strToBoolean(settingsObjectData[t].service[a].engh_left),
                    document.getElementById(
                        "dialog_settings_object_service_engh_left_num").value =
                    settingsObjectData[t].service[a].engh_left_num) : (document
                    .getElementById(
                        "dialog_settings_object_service_engh_interval").value =
                    "", document.getElementById(
                        "dialog_settings_object_service_engh_last").value = "",
                    document.getElementById(
                        "dialog_settings_object_service_engh_left").checked = !
                    1, document.getElementById(
                        "dialog_settings_object_service_engh_left_num").value =
                    ""), document.getElementById(
                    "dialog_settings_object_service_days").checked =
                strToBoolean(settingsObjectData[t].service[a].days), 1 ==
                document.getElementById("dialog_settings_object_service_days")
                .checked ? (document.getElementById(
                        "dialog_settings_object_service_days_interval").value =
                    settingsObjectData[t].service[a].days_interval, document
                    .getElementById("dialog_settings_object_service_days_last")
                    .value = settingsObjectData[t].service[a].days_last,
                    document.getElementById(
                        "dialog_settings_object_service_days_left").checked =
                    strToBoolean(settingsObjectData[t].service[a].days_left),
                    document.getElementById(
                        "dialog_settings_object_service_days_left_num").value =
                    settingsObjectData[t].service[a].days_left_num) : (document
                    .getElementById(
                        "dialog_settings_object_service_days_interval").value =
                    "", document.getElementById(
                        "dialog_settings_object_service_days_last").value = "",
                    document.getElementById(
                        "dialog_settings_object_service_days_left").checked = !
                    1, document.getElementById(
                        "dialog_settings_object_service_days_left_num").value =
                    ""), document.getElementById(
                    "dialog_settings_object_service_update_last").checked =
                strToBoolean(settingsObjectData[t].service[a].update_last),
                document.getElementById(
                    "dialog_settings_object_service_odo_curr").value =
                settingsObjectData[t].odometer, document.getElementById(
                    "dialog_settings_object_service_engh_curr").value =
                settingsObjectData[t].engine_hours,
            settingsObjectServiceCheck(), $(
                    "#dialog_settings_object_service_properties").dialog(
                "open");
            break;
        case "add":
            settingsEditData.service_id = !1, document.getElementById(
                    "dialog_settings_object_service_name").value = "", document
                .getElementById("dialog_settings_object_service_data_list")
                .checked = !1, document.getElementById(
                    "dialog_settings_object_service_popup").checked = !1,
                document.getElementById("dialog_settings_object_service_odo")
                .checked = !1, document.getElementById(
                    "dialog_settings_object_service_odo_interval").value = "",
                document.getElementById(
                    "dialog_settings_object_service_odo_last").value = "",
                document.getElementById("dialog_settings_object_service_engh")
                .checked = !1, document.getElementById(
                    "dialog_settings_object_service_engh_interval").value = "",
                document.getElementById(
                    "dialog_settings_object_service_engh_last").value = "",
                document.getElementById("dialog_settings_object_service_days")
                .checked = !1, document.getElementById(
                    "dialog_settings_object_service_days_interval").value = "",
                document.getElementById(
                    "dialog_settings_object_service_days_last").value = "",
                document.getElementById(
                    "dialog_settings_object_service_odo_left").checked = !1,
                document.getElementById(
                    "dialog_settings_object_service_odo_left_num").value = "",
                document.getElementById(
                    "dialog_settings_object_service_engh_left").checked = !1,
                document.getElementById(
                    "dialog_settings_object_service_engh_left_num").value = "",
                document.getElementById(
                    "dialog_settings_object_service_days_left").checked = !1,
                document.getElementById(
                    "dialog_settings_object_service_days_left_num").value = "",
                document.getElementById(
                    "dialog_settings_object_service_update_last").checked = !1,
                document.getElementById(
                    "dialog_settings_object_service_odo_curr").value =
                settingsObjectData[t].odometer, document.getElementById(
                    "dialog_settings_object_service_engh_curr").value =
                settingsObjectData[t].engine_hours,
            settingsObjectServiceCheck(), $(
                    "#dialog_settings_object_service_properties").dialog(
                "open");
            break;
        case "cancel":
            $("#dialog_settings_object_service_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var o = document.getElementById(
                    "dialog_settings_object_service_name").value,
                i = document.getElementById(
                    "dialog_settings_object_service_data_list").checked,
                s = document.getElementById(
                    "dialog_settings_object_service_popup").checked,
                n = document.getElementById(
                    "dialog_settings_object_service_odo").checked,
                l = document.getElementById(
                    "dialog_settings_object_service_odo_interval").value,
                d = document.getElementById(
                    "dialog_settings_object_service_odo_last").value,
                r = document.getElementById(
                    "dialog_settings_object_service_engh").checked,
                _ = document.getElementById(
                    "dialog_settings_object_service_engh_interval").value,
                c = document.getElementById(
                    "dialog_settings_object_service_engh_last").value,
                g = document.getElementById(
                    "dialog_settings_object_service_days").checked,
                m = document.getElementById(
                    "dialog_settings_object_service_days_interval").value,
                u = document.getElementById(
                    "dialog_settings_object_service_days_last").value,
                p = document.getElementById(
                    "dialog_settings_object_service_odo_left").checked,
                y = document.getElementById(
                    "dialog_settings_object_service_odo_left_num").value,
                v = document.getElementById(
                    "dialog_settings_object_service_engh_left").checked,
                b = document.getElementById(
                    "dialog_settings_object_service_engh_left_num").value,
                h = document.getElementById(
                    "dialog_settings_object_service_days_left").checked,
                E = document.getElementById(
                    "dialog_settings_object_service_days_left_num").value,
                f = document.getElementById(
                    "dialog_settings_object_service_update_last").checked;
            if ("" == o) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (1 == n && ("" == l || "" == d)) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (1 == r && ("" == _ || "" == c)) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (1 == g && ("" == m || "" == u)) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (parseFloat(l) <= parseFloat(y) && 1 == p) {
                notifyBox("error", la.ERROR, la
                    .INTERVAL_VALUE_SHOULD_BE_GREATER_THAN_LEFT_VALUE);
                break
            }
            if (parseFloat(_) <= parseFloat(b) && 1 == v) {
                notifyBox("error", la.ERROR, la
                    .INTERVAL_VALUE_SHOULD_BE_GREATER_THAN_LEFT_VALUE);
                break
            }
            if (parseFloat(m) <= parseFloat(E) && 1 == h) {
                notifyBox("error", la.ERROR, la
                    .INTERVAL_VALUE_SHOULD_BE_GREATER_THAN_LEFT_VALUE);
                break
            }
            var I = {
                cmd: "save_object_service",
                service_id: settingsEditData.service_id,
                imei: t,
                name: o,
                data_list: i,
                popup: s,
                odo: n,
                odo_interval: l,
                odo_last: d,
                engh: r,
                engh_interval: _,
                engh_last: c,
                days: g,
                days_interval: m,
                days_last: u,
                odo_left: p,
                odo_left_num: y,
                engh_left: v,
                engh_left_num: b,
                days_left: h,
                days_left_num: E,
                update_last: f
            };
            $.ajax({
                type: "POST",
                url: "func/fn_settings.service.php",
                data: I,
                cache: !1,
                success: function(e) {
                    "OK" == e && (1 == $("#dialog_maintenance")
                        .dialog("isOpen") && $(
                            "#maintenance_list_grid").trigger(
                            "reloadGrid"),
                        settingsReloadObjects(), $(
                            "#dialog_settings_object_service_properties"
                            ).dialog("close"), $(
                            "#settings_object_service_list_grid"
                            ).trigger("reloadGrid"), notifyBox(
                            "info", la.INFORMATION, la
                            .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}


function settingsObjectServiceDelete(e) {
    if (utilsCheckPrivileges("viewer")) {
        var t = settingsEditData.object_imei;
        confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE, function(a) {
            if (a) {
                var o = {
                    cmd: "delete_object_service",
                    service_id: e,
                    imei: t
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.service.php",
                    data: o,
                    success: function(e) {
                        "OK" == e && (1 == $(
                                "#dialog_maintenance")
                            .dialog("isOpen") && $(
                                "#maintenance_list_grid"
                                ).trigger("reloadGrid"),
                            settingsReloadObjects(), $(
                                "#settings_object_service_list_grid"
                                ).trigger("reloadGrid"))
                    }
                })
            }
        })
    }
}


function settingsObjectServiceDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = settingsEditData.object_imei,
            t = $("#settings_object_service_list_grid").jqGrid("getGridParam",
                "selarrrow");
        "" != t ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(a) {
                if (a) {
                    var o = {
                        cmd: "delete_selected_object_services",
                        items: t,
                        imei: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.service.php",
                        data: o,
                        success: function(e) {
                            "OK" == e && (
                            settingsReloadObjects(), $(
                                "#settings_object_service_list_grid"
                                ).trigger("reloadGrid"))
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}


function settingsObjectServiceCheck() {
    1 == document.getElementById("dialog_settings_object_service_odo").checked ?
        (document.getElementById("dialog_settings_object_service_odo_interval")
            .disabled = !1, document.getElementById(
                "dialog_settings_object_service_odo_last").disabled = !1,
            document.getElementById("dialog_settings_object_service_odo_left")
            .disabled = !1, document.getElementById(
                "dialog_settings_object_service_odo_left_num").disabled = !1) :
        (document.getElementById("dialog_settings_object_service_odo_interval")
            .disabled = !0, document.getElementById(
                "dialog_settings_object_service_odo_last").disabled = !0,
            document.getElementById("dialog_settings_object_service_odo_left")
            .disabled = !0, document.getElementById(
                "dialog_settings_object_service_odo_left_num").disabled = !0),
        1 == document.getElementById("dialog_settings_object_service_engh")
        .checked ? (document.getElementById(
                "dialog_settings_object_service_engh_interval").disabled = !1,
            document.getElementById("dialog_settings_object_service_engh_last")
            .disabled = !1, document.getElementById(
                "dialog_settings_object_service_engh_left").disabled = !1,
            document.getElementById(
                "dialog_settings_object_service_engh_left_num").disabled = !1) :
        (document.getElementById("dialog_settings_object_service_engh_interval")
            .disabled = !0, document.getElementById(
                "dialog_settings_object_service_engh_last").disabled = !0,
            document.getElementById("dialog_settings_object_service_engh_left")
            .disabled = !0, document.getElementById(
                "dialog_settings_object_service_engh_left_num").disabled = !0),
        1 == document.getElementById("dialog_settings_object_service_days")
        .checked ? (document.getElementById(
                "dialog_settings_object_service_days_interval").disabled = !1,
            document.getElementById("dialog_settings_object_service_days_last")
            .disabled = !1, document.getElementById(
                "dialog_settings_object_service_days_left").disabled = !1,
            document.getElementById(
                "dialog_settings_object_service_days_left_num").disabled = !1) :
        (document.getElementById("dialog_settings_object_service_days_interval")
            .disabled = !0, document.getElementById(
                "dialog_settings_object_service_days_last").disabled = !0,
            document.getElementById("dialog_settings_object_service_days_left")
            .disabled = !0, document.getElementById(
                "dialog_settings_object_service_days_left_num").disabled = !0),
        1 == document.getElementById("dialog_settings_object_service_odo")
        .checked || 1 == document.getElementById(
            "dialog_settings_object_service_engh").checked || 1 == document
        .getElementById("dialog_settings_object_service_days").checked ?
        document.getElementById("dialog_settings_object_service_update_last")
        .disabled = !1 : document.getElementById(
            "dialog_settings_object_service_update_last").disabled = !0
}


function settingsObjectCustomFieldImport() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", settingsObjectCustomFieldImportCFLFile,
            !1), document.getElementById("load_file").click())
}

function settingsObjectCustomFieldExport() {
    if (utilsCheckPrivileges("viewer")) {
        var e = "func/fn_export.php?format=cfl&imei=" + settingsEditData
            .object_imei;
        window.location = e
    }
}


function settingsObjectCustomFieldImportCFLFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        try {
            var t = $.parseJSON(e.target.result);
            if ("0.1v" == t.cfl) {
                var a = settingsEditData.object_imei,
                    o = t.fields.length;
                if (0 == o) return void notifyBox("info", la.INFORMATION, la
                    .NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
                confirmDialog(sprintf(la.CUSTOM_FIELDS_FOUND, o) + " " + la
                    .ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
                    function(t) {
                        if (t) {
                            loadingData(!0);
                            var o = {
                                format: "cfl",
                                data: e.target.result,
                                imei: a
                            };
                            $.ajax({
                                type: "POST",
                                url: "func/fn_import.php",
                                data: o,
                                cache: !1,
                                success: function(e) {
                                    loadingData(!1), "OK" ==
                                        e && (
                                            settingsReloadObjects(),
                                            $(
                                                "#settings_object_custom_fields_list_grid")
                                            .trigger(
                                                "reloadGrid"
                                                ))
                                },
                                error: function(e, t) {
                                    loadingData(!1)
                                }
                            })
                        }
                    })
            } else notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        } catch (e) {
            notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        }
        document.getElementById("load_file").value = ""
    }, a.readAsText(t[0], "UTF-8"), this.removeEventListener("change",
        settingsObjectCustomFieldImportCFLFile, !1)
}

function settingsObjectCustomFieldDelete(e) {
    if (utilsCheckPrivileges("viewer")) {
        var t = settingsEditData.object_imei;
        confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE, function(a) {
            if (a) {
                var o = {
                    cmd: "delete_object_custom_field",
                    field_id: e,
                    imei: t
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.customfields.php",
                    data: o,
                    success: function(e) {
                        "OK" == e && (
                        settingsReloadObjects(), $(
                            "#settings_object_custom_fields_list_grid"
                            ).trigger("reloadGrid"))
                    }
                })
            }
        })
    }
}

function settingsObjectCustomFieldDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = settingsEditData.object_imei,
            t = $("#settings_object_custom_fields_list_grid").jqGrid(
                "getGridParam", "selarrrow");
        "" != t ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(a) {
                if (a) {
                    var o = {
                        cmd: "delete_selected_object_custom_fields",
                        items: t,
                        imei: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.customfields.php",
                        data: o,
                        success: function(e) {
                            "OK" == e && (
                            settingsReloadObjects(), $(
                                "#settings_object_custom_fields_list_grid"
                                ).trigger("reloadGrid"))
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function settingsObjectCustomFieldProperties(e) {
    var t = settingsEditData.object_imei;
    switch (e) {
        default:
            var a = e;
            settingsEditData.custom_field_id = a, document.getElementById(
                    "dialog_settings_object_custom_field_name").value =
                settingsObjectData[t].custom_fields[a].name, document
                .getElementById("dialog_settings_object_custom_field_value")
                .value = settingsObjectData[t].custom_fields[a].value, document
                .getElementById("dialog_settings_object_custom_field_data_list")
                .checked = strToBoolean(settingsObjectData[t].custom_fields[a]
                    .data_list), document.getElementById(
                    "dialog_settings_object_custom_field_popup").checked =
                strToBoolean(settingsObjectData[t].custom_fields[a].popup), $(
                    "#dialog_settings_object_custom_field_properties").dialog(
                    "open");
            break;
        case "add":
            settingsEditData.custom_field_id = !1, document.getElementById(
                    "dialog_settings_object_custom_field_name").value = "",
                document.getElementById(
                    "dialog_settings_object_custom_field_value").value = "",
                document.getElementById(
                    "dialog_settings_object_custom_field_data_list").checked = !
                0, document.getElementById(
                    "dialog_settings_object_custom_field_popup").checked = !0,
                $("#dialog_settings_object_custom_field_properties").dialog(
                    "open");
            break;
        case "cancel":
            $("#dialog_settings_object_custom_field_properties").dialog(
            "close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var o = document.getElementById(
                    "dialog_settings_object_custom_field_name").value,
                i = document.getElementById(
                    "dialog_settings_object_custom_field_value").value,
                s = document.getElementById(
                    "dialog_settings_object_custom_field_data_list").checked,
                n = document.getElementById(
                    "dialog_settings_object_custom_field_popup").checked;
            if ("" == o) {
                notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                break
            }
            var l = {
                cmd: "save_object_custom_field",
                field_id: settingsEditData.custom_field_id,
                imei: t,
                name: o,
                value: i,
                data_list: s,
                popup: n
            };
            $.ajax({
                type: "POST",
                url: "func/fn_settings.customfields.php",
                data: l,
                cache: !1,
                success: function(e) {
                    "OK" == e && (settingsReloadObjects(), $(
                        "#settings_object_custom_fields_list_grid"
                        ).trigger("reloadGrid"), $(
                        "#dialog_settings_object_custom_field_properties"
                        ).dialog("close"), notifyBox("info",
                        la.INFORMATION, la
                        .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}

function settingsTemplateImport() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", settingsTemplateImportTEMFile, !1),
        document.getElementById("load_file").click())
}

function settingsTemplateExport() {
    if (utilsCheckPrivileges("viewer")) {
        window.location = "func/fn_export.php?format=tem"
    }
}

function settingsTemplateImportTEMFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        try {
            var t = $.parseJSON(e.target.result);
            if ("0.1v" == t.tem) {
                var a = t.templates.length;
                if (0 == a) return void notifyBox("info", la.INFORMATION, la
                    .NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
                confirmDialog(sprintf(la.TEMPLATES_FOUND, a) + " " + la
                    .ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
                    function(t) {
                        if (t) {
                            loadingData(!0);
                            var a = {
                                format: "tem",
                                data: e.target.result
                            };
                            $.ajax({
                                type: "POST",
                                url: "func/fn_import.php",
                                data: a,
                                cache: !1,
                                success: function(e) {
                                    loadingData(!1), "OK" ==
                                        e &&
                                        settingsReloadTemplates()
                                },
                                error: function(e, t) {
                                    loadingData(!1)
                                }
                            })
                        }
                    })
            } else notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        } catch (e) {
            notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        }
        document.getElementById("load_file").value = ""
    }, a.readAsText(t[0], "UTF-8"), this.removeEventListener("change",
        settingsTemplateImportTEMFile, !1)
}


function settingsTemplateProperties(e) {
    switch (e) {
        default:
            var t = e;
            settingsEditData.template_id = t, document.getElementById(
                    "dialog_settings_template_name").value =
                settingsTemplateData[t].name, document.getElementById(
                    "dialog_settings_template_desc").value =
                settingsTemplateData[t].desc, document.getElementById(
                    "dialog_settings_template_subject").value =
                settingsTemplateData[t].subject, document.getElementById(
                    "dialog_settings_template_message").value =
                settingsTemplateData[t].message, $(
                    "#dialog_settings_template_properties").dialog("open");
            break;
        case "add":
            settingsEditData.template_id = !1, document.getElementById(
                    "dialog_settings_template_name").value = "", document
                .getElementById("dialog_settings_template_desc").value = "",
                document.getElementById("dialog_settings_template_subject")
                .value = "", document.getElementById(
                    "dialog_settings_template_message").value = "", $(
                    "#dialog_settings_template_properties").dialog("open");
            break;
        case "cancel":
            $("#dialog_settings_template_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var a = document.getElementById("dialog_settings_template_name")
                .value,
                o = document.getElementById("dialog_settings_template_desc")
                .value,
                i = document.getElementById("dialog_settings_template_subject")
                .value,
                s = document.getElementById("dialog_settings_template_message")
                .value;
            if ("" == a) {
                notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                break
            }
            var n = {
                cmd: "save_template",
                template_id: settingsEditData.template_id,
                name: a,
                desc: o,
                subject: i,
                message: s
            };
            $.ajax({
                type: "POST",
                url: "func/fn_settings.templates.php",
                data: n,
                cache: !1,
                success: function(e) {
                    "OK" == e && (settingsReloadTemplates(), $(
                        "#dialog_settings_template_properties"
                        ).dialog("close"), notifyBox("info",
                        la.INFORMATION, la
                        .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}

function settingsTemplateDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_template",
                    template_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.templates.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && settingsReloadTemplates()
                    }
                })
            }
        })
}

function settingsTemplateDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#settings_main_templates_template_list_grid").jqGrid(
            "getGridParam", "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_templates",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.templates.php",
                        data: a,
                        success: function(e) {
                            "OK" == e &&
                                settingsReloadTemplates()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function settingsSubaccountGenerateAU() {
    var e = settingsUserData.email + moment();
    return CryptoJS.MD5(e).toString().toUpperCase()
}

function settingsSubaccountCheck() {
    1 == document.getElementById("dialog_settings_subaccount_expire").checked ?
        document.getElementById("dialog_settings_subaccount_expire_dt")
        .disabled = !1 : document.getElementById(
            "dialog_settings_subaccount_expire_dt").disabled = !0
}

function settingsSubaccountProperties(e) {
    if (utilsCheckPrivileges("subuser") && utilsCheckPrivileges("subaccounts"))
        switch (e) {
            default:
                var t = e;
                settingsEditData.subaccount_id = t, document.getElementById(
                        "dialog_settings_subaccount_active").checked =
                    strToBoolean(settingsSubaccountData[t].active), document
                    .getElementById("dialog_settings_subaccount_username")
                    .value = settingsSubaccountData[t].username, document
                    .getElementById("dialog_settings_subaccount_email").value =
                    settingsSubaccountData[t].email, document.getElementById(
                        "dialog_settings_subaccount_password").value = "",
                    document.getElementById("dialog_settings_subaccount_send")
                    .checked = !1;
                var a = strToBoolean(settingsSubaccountData[t].account_expire);
                document.getElementById("dialog_settings_subaccount_expire_dt")
                    .checked = a, document.getElementById(
                        "dialog_settings_subaccount_expire_dt").value = 1 == a ?
                    settingsSubaccountData[t].account_expire_dt : "", document
                    .getElementById("dialog_settings_subaccount_dashboard")
                    .checked = settingsSubaccountData[t].dashboard, document
                    .getElementById("dialog_settings_subaccount_history")
                    .checked = settingsSubaccountData[t].history, document
                    .getElementById("dialog_settings_subaccount_reports")
                    .checked = settingsSubaccountData[t].reports, document
                    .getElementById("dialog_settings_subaccount_tasks")
                    .checked = settingsSubaccountData[t].tasks, document
                    .getElementById("dialog_settings_subaccount_rilogbook")
                    .checked = settingsSubaccountData[t].rilogbook, document
                    .getElementById("dialog_settings_subaccount_dtc").checked =
                    settingsSubaccountData[t].dtc, document.getElementById(
                        "dialog_settings_subaccount_maintenance").checked =
                    settingsSubaccountData[t].maintenance, document
                    .getElementById("dialog_settings_subaccount_object_control")
                    .checked = settingsSubaccountData[t].object_control,
                    document.getElementById(
                        "dialog_settings_subaccount_image_gallery").checked =
                    settingsSubaccountData[t].image_gallery, document
                    .getElementById("dialog_settings_subaccount_chat").checked =
                    settingsSubaccountData[t].chat;
                var o = document.getElementById(
                        "dialog_settings_subaccount_available_objects"),
                    i = settingsSubaccountData[t].imei.split(",");
                multiselectSetValues(o, i), $(
                        "#dialog_settings_subaccount_available_objects")
                    .multipleSelect("refresh");
                var s = document.getElementById(
                        "dialog_settings_subaccount_available_markers"),
                    n = settingsSubaccountData[t].marker.split(",");
                multiselectSetValues(s, n), $(
                        "#dialog_settings_subaccount_available_markers")
                    .multipleSelect("refresh");
                var l = document.getElementById(
                        "dialog_settings_subaccount_available_routes"),
                    d = settingsSubaccountData[t].route.split(",");
                multiselectSetValues(l, d), $(
                        "#dialog_settings_subaccount_available_routes")
                    .multipleSelect("refresh");
                var r = document.getElementById(
                        "dialog_settings_subaccount_available_zones"),
                    _ = settingsSubaccountData[t].zone.split(",");
                multiselectSetValues(r, _), $(
                        "#dialog_settings_subaccount_available_zones")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_subaccount_au_active").checked =
                    settingsSubaccountData[t].au_active, settingsEditData
                    .subaccount_au = settingsSubaccountData[t].au, "" ==
                    settingsEditData.subaccount_au && (settingsEditData
                        .subaccount_au = settingsSubaccountGenerateAU()),
                    document.getElementById("dialog_settings_subaccount_au")
                    .value = gsValues.url_root + "/index.php?au=" +
                    settingsEditData.subaccount_au, document.getElementById(
                        "dialog_settings_subaccount_au_mobile").value = gsValues
                    .url_root + "/index.php?au=" + settingsEditData
                    .subaccount_au + "&m=true", settingsSubaccountCheck(), $(
                        "#dialog_settings_subaccount_properties").dialog(
                    "open");
                break;
            case "add":
                settingsEditData.subaccount_id = !1, document.getElementById(
                        "dialog_settings_subaccount_active").checked = !0,
                    document.getElementById(
                        "dialog_settings_subaccount_username").value = "",
                    document.getElementById("dialog_settings_subaccount_email")
                    .value = "", document.getElementById(
                        "dialog_settings_subaccount_password").value = "",
                    document.getElementById("dialog_settings_subaccount_send")
                    .checked = !0, document.getElementById(
                        "dialog_settings_subaccount_expire").checked = !1,
                    document.getElementById(
                        "dialog_settings_subaccount_expire_dt").value = "",
                    document.getElementById(
                        "dialog_settings_subaccount_dashboard").checked = !1,
                    document.getElementById(
                        "dialog_settings_subaccount_history").checked = !1,
                    document.getElementById(
                        "dialog_settings_subaccount_reports").checked = !1,
                    document.getElementById("dialog_settings_subaccount_tasks")
                    .checked = !1, document.getElementById(
                        "dialog_settings_subaccount_rilogbook").checked = !1,
                    document.getElementById("dialog_settings_subaccount_dtc")
                    .checked = !1, document.getElementById(
                        "dialog_settings_subaccount_maintenance").checked = !1,
                    document.getElementById(
                        "dialog_settings_subaccount_object_control").checked = !
                    1, document.getElementById(
                        "dialog_settings_subaccount_image_gallery").checked = !
                    1, document.getElementById(
                        "dialog_settings_subaccount_chat").checked = !1, $(
                        "#dialog_settings_subaccount_available_objects option:selected"
                        ).removeAttr("selected"), $(
                        "#dialog_settings_subaccount_available_objects")
                    .multipleSelect("refresh"), $(
                        "#dialog_settings_subaccount_available_markers option:selected"
                        ).removeAttr("selected"), $(
                        "#dialog_settings_subaccount_available_markers")
                    .multipleSelect("refresh"), $(
                        "#dialog_settings_subaccount_available_routes option:selected"
                        ).removeAttr("selected"), $(
                        "#dialog_settings_subaccount_available_routes")
                    .multipleSelect("refresh"), $(
                        "#dialog_settings_subaccount_available_zones option:selected"
                        ).removeAttr("selected"), $(
                        "#dialog_settings_subaccount_available_zones")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_subaccount_au_active").checked = !1,
                    settingsEditData.subaccount_au =
                    settingsSubaccountGenerateAU(), document.getElementById(
                        "dialog_settings_subaccount_au").value = gsValues
                    .url_root + "/index.php?au=" + settingsEditData
                    .subaccount_au, document.getElementById(
                        "dialog_settings_subaccount_au_mobile").value = gsValues
                    .url_root + "/index.php?au=" + settingsEditData
                    .subaccount_au + "&m=true", settingsSubaccountCheck(), $(
                        "#dialog_settings_subaccount_properties").dialog(
                    "open");
                break;
            case "cancel":
                $("#dialog_settings_subaccount_properties").dialog("close");
                break;
            case "save":
                if (!utilsCheckPrivileges("viewer")) return;
                var c = document.getElementById(
                        "dialog_settings_subaccount_active").checked,
                    g = document.getElementById(
                        "dialog_settings_subaccount_username").value,
                    m = document.getElementById(
                        "dialog_settings_subaccount_email").value,
                    u = document.getElementById(
                        "dialog_settings_subaccount_password").value,
                    p = document.getElementById(
                        "dialog_settings_subaccount_send").checked,
                    y = (a = document.getElementById(
                            "dialog_settings_subaccount_expire").checked,
                        document.getElementById(
                            "dialog_settings_subaccount_expire_dt").value);
                if ("" == g) {
                    notifyBox("error", la.ERROR, la.USERNAME_CANT_BE_EMPTY);
                    break
                }
                if (-1 != g.indexOf(" ")) {
                    notifyBox("error", la.ERROR, la.USERNAME_SPACE_CHARACTERS);
                    break
                }
                if (!isEmailValid(m)) {
                    notifyBox("error", la.ERROR, la.THIS_EMAIL_IS_NOT_VALID);
                    break
                }
                if (0 == settingsEditData.subaccount_id) {
                    if ("" == u) {
                        notifyBox("error", la.ERROR, la.PASSWORD_CANT_BE_EMPTY);
                        break
                    }
                    if (-1 != u.indexOf(" ")) return void notifyBox("error", la
                        .ERROR, la.PASSWORD_SPACE_CHARACTERS);
                    if (u.length < 6) {
                        notifyBox("error", la.ERROR, la
                            .PASSWORD_LENGHT_AT_LEAST);
                        break
                    }
                } else if ("" != u && u.length < 6) {
                    notifyBox("error", la.ERROR, la.PASSWORD_LENGHT_AT_LEAST);
                    break
                }
                if (1 == a) {
                    if ("" == y) return void notifyBox("error", la.ERROR, la
                        .DATE_CANT_BE_EMPTY, !0)
                } else y = "";
                o = document.getElementById(
                        "dialog_settings_subaccount_available_objects"), s =
                    document.getElementById(
                        "dialog_settings_subaccount_available_markers"), l =
                    document.getElementById(
                        "dialog_settings_subaccount_available_routes"), r =
                    document.getElementById(
                        "dialog_settings_subaccount_available_zones");
                var v = {
                    cmd: "save_subaccount",
                    subaccount_id: settingsEditData.subaccount_id,
                    active: c,
                    username: g,
                    email: m,
                    password: u,
                    send: p,
                    account_expire: a,
                    account_expire_dt: y,
                    dashboard: document.getElementById(
                        "dialog_settings_subaccount_dashboard").checked,
                    history: document.getElementById(
                        "dialog_settings_subaccount_history").checked,
                    reports: document.getElementById(
                        "dialog_settings_subaccount_reports").checked,
                    tasks: document.getElementById(
                        "dialog_settings_subaccount_tasks").checked,
                    rilogbook: document.getElementById(
                        "dialog_settings_subaccount_rilogbook").checked,
                    dtc: document.getElementById(
                        "dialog_settings_subaccount_dtc").checked,
                    maintenance: document.getElementById(
                            "dialog_settings_subaccount_maintenance")
                        .checked,
                    object_control: document.getElementById(
                            "dialog_settings_subaccount_object_control")
                        .checked,
                    image_gallery: document.getElementById(
                            "dialog_settings_subaccount_image_gallery")
                        .checked,
                    chat: document.getElementById(
                        "dialog_settings_subaccount_chat").checked,
                    imei: multiselectGetValues(o),
                    marker: multiselectGetValues(s),
                    route: multiselectGetValues(l),
                    zone: multiselectGetValues(r),
                    au_active: document.getElementById(
                        "dialog_settings_subaccount_au_active").checked,
                    au: settingsEditData.subaccount_au
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.subaccounts.php",
                    data: v,
                    cache: !1,
                    success: function(e) {
                        "OK" == e ? (settingsReloadSubaccounts(), $(
                                "#dialog_settings_subaccount_properties"
                                ).dialog("close"), notifyBox(
                                "info", la.INFORMATION, la
                                .CHANGES_SAVED_SUCCESSFULLY)) :
                            "ERROR_EMAIL_EXISTS" == e ? notifyBox(
                                "error", la.ERROR, la
                                .THIS_EMAIL_ALREADY_EXISTS) :
                            "ERROR_USERNAME_EXISTS" == e ?
                            notifyBox("error", la.ERROR, la
                                .THIS_USERNAME_ALREADY_EXISTS) :
                            "ERROR_NOT_SENT" == e && notifyBox(
                                "error", la.ERROR, la
                                .CANT_SEND_EMAIL + " " + la
                                .CONTACT_ADMINISTRATOR)
                    }
                })
        }
}


function settingsSubaccountDelete(e) {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        utilsCheckPrivileges("subaccounts") && confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_subaccount",
                        subaccount_id: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.subaccounts.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && settingsReloadSubaccounts()
                        }
                    })
                }
            })
}

function settingsSubaccountDeleteSelected() {
    if (utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        utilsCheckPrivileges("subaccounts")) {
        var e = $("#settings_main_subaccount_list_grid").jqGrid("getGridParam",
            "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_subaccounts",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.subaccounts.php",
                        data: a,
                        success: function(e) {
                            "OK" == e &&
                                settingsReloadSubaccounts()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function settingsEventPlaySound() {
    var e = document.getElementById(
        "dialog_settings_event_notify_system_sound_file").value;
    new Audio("snd/" + e).play()
}

function settingsEventImport() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", settingsEventImportEVTFile, !1),
        document.getElementById("load_file").click())
}

function settingsEventExport() {
    if (utilsCheckPrivileges("viewer")) {
        window.location = "func/fn_export.php?format=evt"
    }
}

function settingsEventImportEVTFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        try {
            var t = $.parseJSON(e.target.result);
            if ("0.1v" == t.evt) {
                var a = t.events.length;
                if (0 == a) return void notifyBox("info", la.INFORMATION, la
                    .NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
                confirmDialog(sprintf(la.EVENTS_FOUND, a) + " " + la
                    .ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
                    function(t) {
                        if (t) {
                            loadingData(!0);
                            var a = {
                                format: "evt",
                                data: e.target.result
                            };
                            $.ajax({
                                type: "POST",
                                url: "func/fn_import.php",
                                data: a,
                                cache: !1,
                                success: function(e) {
                                    loadingData(!1), "OK" ==
                                        e &&
                                        settingsReloadEvents()
                                },
                                error: function(e, t) {
                                    loadingData(!1)
                                }
                            })
                        }
                    })
            } else notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        } catch (e) {
            notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        }
        document.getElementById("load_file").value = ""
    }, a.readAsText(t[0], "UTF-8"), this.removeEventListener("change",
        settingsEventImportEVTFile, !1)
}

function settingsEventProperties(e) {
    switch (e) {
        default:
            var t = e;
            settingsEditData.event_id = t, document.getElementById(
                    "dialog_settings_event_name").value = settingsEventData[t]
                .name, document.getElementById("dialog_settings_event_type")
                .value = settingsEventData[t].type, $(
                    "#dialog_settings_event_type").multipleSelect("refresh"),
                document.getElementById("dialog_settings_event_active")
                .checked = strToBoolean(settingsEventData[t].active), document
                .getElementById(
                    "dialog_settings_event_duration_from_last_event").checked =
                strToBoolean(settingsEventData[t].duration_from_last_event),
                document.getElementById(
                    "dialog_settings_event_duration_from_last_event_minutes")
                .value = settingsEventData[t].duration_from_last_event_minutes;
            var a = settingsEventData[t].week_days.split(",");
            document.getElementById("dialog_settings_event_wd_sun").checked =
                strToBoolean(a[0]), document.getElementById(
                    "dialog_settings_event_wd_mon").checked = strToBoolean(a[
                1]), document.getElementById("dialog_settings_event_wd_tue")
                .checked = strToBoolean(a[2]), document.getElementById(
                    "dialog_settings_event_wd_wed").checked = strToBoolean(a[
                3]), document.getElementById("dialog_settings_event_wd_thu")
                .checked = strToBoolean(a[4]), document.getElementById(
                    "dialog_settings_event_wd_fri").checked = strToBoolean(a[
                5]), document.getElementById("dialog_settings_event_wd_sat")
                .checked = strToBoolean(a[6]), null != (p = settingsEventData[t]
                    .day_time) ? (document.getElementById(
                        "dialog_settings_event_dt").checked = p.dt, document
                    .getElementById("dialog_settings_event_dt_mon").checked = p
                    .mon, document.getElementById(
                        "dialog_settings_event_dt_mon_from").value = p.mon_from,
                    $("#dialog_settings_event_dt_mon_from").multipleSelect(
                        "refresh"), document.getElementById(
                        "dialog_settings_event_dt_mon_to").value = p.mon_to, $(
                        "#dialog_settings_event_dt_mon_to").multipleSelect(
                        "refresh"), document.getElementById(
                        "dialog_settings_event_dt_tue").checked = p.tue,
                    document.getElementById("dialog_settings_event_dt_tue_from")
                    .value = p.tue_from, $("#dialog_settings_event_dt_tue_from")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_event_dt_tue_to").value = p.tue_to, $(
                        "#dialog_settings_event_dt_tue_to").multipleSelect(
                        "refresh"), document.getElementById(
                        "dialog_settings_event_dt_wed").checked = p.wed,
                    document.getElementById("dialog_settings_event_dt_wed_from")
                    .value = p.wed_from, $("#dialog_settings_event_dt_wed_from")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_event_dt_wed_to").value = p.wed_to, $(
                        "#dialog_settings_event_dt_wed_to").multipleSelect(
                        "refresh"), document.getElementById(
                        "dialog_settings_event_dt_thu").checked = p.thu,
                    document.getElementById("dialog_settings_event_dt_thu_from")
                    .value = p.thu_from, $("#dialog_settings_event_dt_thu_from")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_event_dt_thu_to").value = p.thu_to, $(
                        "#dialog_settings_event_dt_thu_to").multipleSelect(
                        "refresh"), document.getElementById(
                        "dialog_settings_event_dt_fri").checked = p.fri,
                    document.getElementById("dialog_settings_event_dt_fri_from")
                    .value = p.fri_from, $("#dialog_settings_event_dt_fri_from")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_event_dt_fri_to").value = p.fri_to, $(
                        "#dialog_settings_event_dt_fri_to").multipleSelect(
                        "refresh"), document.getElementById(
                        "dialog_settings_event_dt_sat").checked = p.sat,
                    document.getElementById("dialog_settings_event_dt_sat_from")
                    .value = p.sat_from, $("#dialog_settings_event_dt_sat_from")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_event_dt_sat_to").value = p.sat_to, $(
                        "#dialog_settings_event_dt_sat_to").multipleSelect(
                        "refresh"), document.getElementById(
                        "dialog_settings_event_dt_sun").checked = p.sun,
                    document.getElementById("dialog_settings_event_dt_sun_from")
                    .value = p.sun_from, $("#dialog_settings_event_dt_sun_from")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_settings_event_dt_sun_to").value = p.sun_to, $(
                        "#dialog_settings_event_dt_sun_to").multipleSelect(
                        "refresh")) : settingsEventResetDayTime(),
                settingsEventSwitchDayTime();
            var o = document.getElementById("dialog_settings_event_objects"),
                i = settingsEventData[t].imei.split(",");
            if (multiselectSetValues(o, i), $("#dialog_settings_event_objects")
                .multipleSelect("refresh"), "connno" == settingsEventData[t]
                .type || "gpsno" == settingsEventData[t].type || "stopped" ==
                settingsEventData[t].type || "moving" == settingsEventData[t]
                .type || "engidle" == settingsEventData[t].type ? (document
                    .getElementById("dialog_settings_event_time_period")
                    .disabled = !1, document.getElementById(
                        "dialog_settings_event_time_period").value =
                    settingsEventData[t].checked_value) : (document
                    .getElementById("dialog_settings_event_time_period")
                    .disabled = !0, document.getElementById(
                        "dialog_settings_event_time_period").value = ""),
                "overspeed" == settingsEventData[t].type || "underspeed" ==
                settingsEventData[t].type ? (document.getElementById(
                        "dialog_settings_event_speed_limit").disabled = !1,
                    document.getElementById("dialog_settings_event_speed_limit")
                    .value = settingsEventData[t].checked_value) : (document
                    .getElementById("dialog_settings_event_speed_limit")
                    .disabled = !0, document.getElementById(
                        "dialog_settings_event_speed_limit").value = ""),
                "param" == settingsEventData[t].type || "sensor" ==
                settingsEventData[t].type ? ($(
                        "#settings_event_param_sensor_condition_list_grid")
                    .closest(".ui-jqgrid").unblock(), document.getElementById(
                        "dialog_settings_event_param_sensor_condition_src")
                    .disabled = !1, document.getElementById(
                        "dialog_settings_event_param_sensor_condition_cn")
                    .disabled = !1, document.getElementById(
                        "dialog_settings_event_param_sensor_condition_val")
                    .disabled = !1, document.getElementById(
                        "dialog_settings_event_param_sensor_condition_add")
                    .disabled = !1, "param" == settingsEventData[t].type ?
                    settingsEventParamList() : "sensor" == settingsEventData[t]
                    .type && settingsEventSensorList(), settingsEditData
                    .event_condition = settingsEventData[t].checked_value.slice(
                        0), settingsEventConditionList()) : ($(
                        "#settings_event_param_sensor_condition_list_grid")
                    .closest(".ui-jqgrid").block({
                        message: ""
                    }), document.getElementById(
                        "dialog_settings_event_param_sensor_condition_src")
                    .disabled = !0, document.getElementById(
                        "dialog_settings_event_param_sensor_condition_cn")
                    .disabled = !0, document.getElementById(
                        "dialog_settings_event_param_sensor_condition_val")
                    .disabled = !0, document.getElementById(
                        "dialog_settings_event_param_sensor_condition_add")
                    .disabled = !0, settingsEditData.event_condition = [], $(
                        "#settings_event_param_sensor_condition_list_grid")
                    .clearGridData(!0)), "zone_in" != settingsEventData[t]
                .type && "zone_out" != settingsEventData[t].type) {
                "route_in" == settingsEventData[t].type || "route_out" ==
                    settingsEventData[t].type ? (document.getElementById(
                            "dialog_settings_event_route_trigger").value =
                        "off", $("#dialog_settings_event_route_trigger")
                        .multipleSelect("refresh"), document.getElementById(
                            "dialog_settings_event_route_trigger").disabled = !0
                        ) : (document.getElementById(
                            "dialog_settings_event_route_trigger").value =
                        settingsEventData[t].route_trigger, $(
                            "#dialog_settings_event_route_trigger")
                        .multipleSelect("refresh"), document.getElementById(
                            "dialog_settings_event_route_trigger").disabled = !1
                        ), document.getElementById(
                        "dialog_settings_event_routes").disabled = !1;
                var s = document.getElementById("dialog_settings_event_routes"),
                    n = settingsEventData[t].routes.split(",");
                multiselectSetValues(s, n), $("#dialog_settings_event_routes")
                    .multipleSelect("refresh")
            } else document.getElementById(
                    "dialog_settings_event_route_trigger").value = "off", $(
                    "#dialog_settings_event_route_trigger").multipleSelect(
                    "refresh"), document.getElementById(
                    "dialog_settings_event_route_trigger").disabled = !0,
                document.getElementById("dialog_settings_event_routes")
                .disabled = !0, $(
                    "#dialog_settings_event_routes option:selected").removeAttr(
                    "selected"), $("#dialog_settings_event_routes")
                .multipleSelect("refresh");
            if ("route_in" != settingsEventData[t].type && "route_out" !=
                settingsEventData[t].type) {
                "zone_in" == settingsEventData[t].type || "zone_out" ==
                    settingsEventData[t].type ? (document.getElementById(
                            "dialog_settings_event_zone_trigger").value = "off",
                        $("#dialog_settings_event_zone_trigger").multipleSelect(
                            "refresh"), document.getElementById(
                            "dialog_settings_event_zone_trigger").disabled = !0
                        ) : (document.getElementById(
                            "dialog_settings_event_zone_trigger").value =
                        settingsEventData[t].zone_trigger, $(
                            "#dialog_settings_event_zone_trigger")
                        .multipleSelect("refresh"), document.getElementById(
                            "dialog_settings_event_zone_trigger").disabled = !1
                        ), document.getElementById(
                        "dialog_settings_event_zones").disabled = !1;
                var l = document.getElementById("dialog_settings_event_zones"),
                    d = settingsEventData[t].zones.split(",");
                multiselectSetValues(l, d), $("#dialog_settings_event_zones")
                    .multipleSelect("refresh")
            } else document.getElementById("dialog_settings_event_zone_trigger")
                .value = "off", $("#dialog_settings_event_zone_trigger")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_settings_event_zone_trigger").disabled = !0,
                document.getElementById("dialog_settings_event_zones")
                .disabled = !0, $("#dialog_settings_event_zones")
                .multipleSelect("refresh"), $(
                    "#dialog_settings_event_zones option:selected").removeAttr(
                    "selected");
            var r = settingsEventData[t].notify_system.split(",");
            document.getElementById("dialog_settings_event_notify_system")
                .checked = strToBoolean(r[0]), document.getElementById(
                    "dialog_settings_event_notify_system_hide").checked =
                strToBoolean(r[1]), document.getElementById(
                    "dialog_settings_event_notify_system_sound").checked =
                strToBoolean(r[2]), null != r[3] && (document.getElementById(
                        "dialog_settings_event_notify_system_sound_file")
                    .value = r[3], $(
                        "#dialog_settings_event_notify_system_sound_file")
                    .multipleSelect("refresh")), document.getElementById(
                    "dialog_settings_event_notify_push").checked = strToBoolean(
                    settingsEventData[t].notify_push), document.getElementById(
                    "dialog_settings_event_notify_email").checked =
                strToBoolean(settingsEventData[t].notify_email), document
                .getElementById("dialog_settings_event_notify_email_address")
                .value = settingsEventData[t].notify_email_address, document
                .getElementById("dialog_settings_event_notify_sms").checked =
                strToBoolean(settingsEventData[t].notify_sms), document
                .getElementById("dialog_settings_event_notify_sms_number")
                .value = settingsEventData[t].notify_sms_number, document
                .getElementById("dialog_settings_event_notify_email_template")
                .value = settingsEventData[t].email_template_id, $(
                    "#dialog_settings_event_notify_email_template")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_settings_event_notify_sms_template").value =
                settingsEventData[t].sms_template_id, $(
                    "#dialog_settings_event_notify_sms_template")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_settings_event_notify_arrow").checked =
                strToBoolean(settingsEventData[t].notify_arrow), document
                .getElementById("dialog_settings_event_notify_arrow_color")
                .value = settingsEventData[t].notify_arrow_color, $(
                    "#dialog_settings_event_notify_arrow_color").multipleSelect(
                    "refresh"), document.getElementById(
                    "dialog_settings_event_notify_ohc").checked = strToBoolean(
                    settingsEventData[t].notify_ohc), document.getElementById(
                    "dialog_settings_event_notify_ohc_color").value =
                settingsEventData[t].notify_ohc_color, document.getElementById(
                    "dialog_settings_event_notify_ohc_color").value =
                settingsEventData[t].notify_ohc_color.substr(1), document
                .getElementById("dialog_settings_event_notify_ohc_color").style
                .backgroundColor = settingsEventData[t].notify_ohc_color,
                document.getElementById("dialog_settings_event_webhook_send")
                .checked = strToBoolean(settingsEventData[t].webhook_send),
                document.getElementById("dialog_settings_event_webhook_url")
                .value = settingsEventData[t].webhook_url, document
                .getElementById("dialog_settings_event_cmd_gateway")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_cmd_type").disabled = !1, document
                .getElementById("dialog_settings_event_cmd_send").checked =
                strToBoolean(settingsEventData[t].cmd_send), document
                .getElementById("dialog_settings_event_cmd_template_list")
                .value = "", $("#dialog_settings_event_cmd_template_list")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_settings_event_cmd_gateway").value =
                settingsEventData[t].cmd_gateway, $(
                    "#dialog_settings_event_cmd_gateway").multipleSelect(
                    "refresh"), document.getElementById(
                    "dialog_settings_event_cmd_type").value = settingsEventData[
                    t].cmd_type, $("#dialog_settings_event_cmd_type")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_settings_event_cmd_string").value =
                settingsEventData[t].cmd_string, $(
                    "#dialog_settings_event_properties").dialog("open");
            break;
        case "add":
            settingsEditData.event_id = !1, document.getElementById(
                    "dialog_settings_event_name").value = "", document
                .getElementById("dialog_settings_event_type").value = "sos", $(
                    "#dialog_settings_event_type").multipleSelect("refresh"),
                document.getElementById("dialog_settings_event_active")
                .checked = !0, document.getElementById(
                    "dialog_settings_event_duration_from_last_event")
                .checked = !1, document.getElementById(
                    "dialog_settings_event_duration_from_last_event_minutes")
                .value = 0, document.getElementById(
                    "dialog_settings_event_wd_mon").checked = !0, document
                .getElementById("dialog_settings_event_wd_tue").checked = !0,
                document.getElementById("dialog_settings_event_wd_wed")
                .checked = !0, document.getElementById(
                    "dialog_settings_event_wd_thu").checked = !0, document
                .getElementById("dialog_settings_event_wd_fri").checked = !0,
                document.getElementById("dialog_settings_event_wd_sat")
                .checked = !0, document.getElementById(
                    "dialog_settings_event_wd_sun").checked = !0, $(
                    "#dialog_settings_event_objects option:selected")
                .removeAttr("selected"), $("#dialog_settings_event_objects")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_settings_event_time_period").value = "", document
                .getElementById("dialog_settings_event_speed_limit").value = "",
                document.getElementById(
                    "dialog_settings_event_param_sensor_condition_src").value =
                "", $("#dialog_settings_event_param_sensor_condition_src")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_settings_event_param_sensor_condition_cn").value =
                "", $("#dialog_settings_event_param_sensor_condition_cn")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_settings_event_param_sensor_condition_val").value =
                "", document.getElementById(
                    "dialog_settings_event_notify_system").checked = !1,
                document.getElementById(
                    "dialog_settings_event_notify_system_hide").checked = !1,
                document.getElementById(
                    "dialog_settings_event_notify_system_sound").checked = !1,
                document.getElementById("dialog_settings_event_notify_push")
                .checked = !1, document.getElementById(
                    "dialog_settings_event_notify_email").checked = !1, document
                .getElementById("dialog_settings_event_notify_email_address")
                .value = "", document.getElementById(
                    "dialog_settings_event_notify_sms").checked = !1, document
                .getElementById("dialog_settings_event_notify_sms_number")
                .value = "", document.getElementById(
                    "dialog_settings_event_notify_email_template").value = 0, $(
                    "#dialog_settings_event_notify_email_template")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_settings_event_notify_sms_template").value = 0, $(
                    "#dialog_settings_event_notify_sms_template")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_settings_event_notify_arrow").checked = !1, document
                .getElementById("dialog_settings_event_notify_arrow_color")
                .value = "arrow_yellow", $(
                    "#dialog_settings_event_notify_arrow_color").multipleSelect(
                    "refresh"), document.getElementById(
                    "dialog_settings_event_notify_ohc").checked = !1, document
                .getElementById("dialog_settings_event_notify_ohc_color")
                .value = "FFFF00", document.getElementById(
                    "dialog_settings_event_notify_ohc_color").style
                .backgroundColor = "#FFFF00", document.getElementById(
                    "dialog_settings_event_webhook_send").checked = !1, document
                .getElementById("dialog_settings_event_webhook_url").value = "",
                document.getElementById("dialog_settings_event_cmd_gateway")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_cmd_type").disabled = !1, document
                .getElementById("dialog_settings_event_cmd_send").checked = !1,
                document.getElementById(
                    "dialog_settings_event_cmd_template_list").value = "", $(
                    "#dialog_settings_event_cmd_template_list").multipleSelect(
                    "refresh"), document.getElementById(
                    "dialog_settings_event_cmd_gateway").value = "gprs", $(
                    "#dialog_settings_event_cmd_gateway").multipleSelect(
                    "refresh"), document.getElementById(
                    "dialog_settings_event_cmd_type").value = "ascii", $(
                    "#dialog_settings_event_cmd_type").multipleSelect(
                "refresh"), document.getElementById(
                    "dialog_settings_event_cmd_string").value = "",
                settingsEventSwitchType(), settingsEventResetDayTime(),
                settingsEventSwitchDayTime(), $(
                    "#dialog_settings_event_properties").dialog("open");
            break;
        case "cancel":
            $("#dialog_settings_event_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var _ = document.getElementById("dialog_settings_event_type").value,
                c = document.getElementById("dialog_settings_event_name").value,
                g = document.getElementById("dialog_settings_event_active")
                .checked,
                m = document.getElementById(
                    "dialog_settings_event_duration_from_last_event").checked,
                u = document.getElementById(
                    "dialog_settings_event_duration_from_last_event_minutes")
                .value;
            a = String(document.getElementById("dialog_settings_event_wd_sun")
                .checked) + ",";
            a += String(document.getElementById("dialog_settings_event_wd_mon")
                .checked) + ",", a += String(document.getElementById(
                "dialog_settings_event_wd_tue").checked) + ",", a += String(
                document.getElementById("dialog_settings_event_wd_wed")
                .checked) + ",", a += String(document.getElementById(
                "dialog_settings_event_wd_thu").checked) + ",", a += String(
                document.getElementById("dialog_settings_event_wd_fri")
                .checked) + ",", a += String(document.getElementById(
                "dialog_settings_event_wd_sat").checked);
            var p = {
                dt: document.getElementById("dialog_settings_event_dt")
                    .checked,
                mon: document.getElementById("dialog_settings_event_dt_mon")
                    .checked,
                mon_from: document.getElementById(
                    "dialog_settings_event_dt_mon_from").value,
                mon_to: document.getElementById(
                    "dialog_settings_event_dt_mon_to").value,
                tue: document.getElementById("dialog_settings_event_dt_tue")
                    .checked,
                tue_from: document.getElementById(
                    "dialog_settings_event_dt_tue_from").value,
                tue_to: document.getElementById(
                    "dialog_settings_event_dt_tue_to").value,
                wed: document.getElementById("dialog_settings_event_dt_wed")
                    .checked,
                wed_from: document.getElementById(
                    "dialog_settings_event_dt_wed_from").value,
                wed_to: document.getElementById(
                    "dialog_settings_event_dt_wed_to").value,
                thu: document.getElementById("dialog_settings_event_dt_thu")
                    .checked,
                thu_from: document.getElementById(
                    "dialog_settings_event_dt_thu_from").value,
                thu_to: document.getElementById(
                    "dialog_settings_event_dt_thu_to").value,
                fri: document.getElementById("dialog_settings_event_dt_fri")
                    .checked,
                fri_from: document.getElementById(
                    "dialog_settings_event_dt_fri_from").value,
                fri_to: document.getElementById(
                    "dialog_settings_event_dt_fri_to").value,
                sat: document.getElementById("dialog_settings_event_dt_sat")
                    .checked,
                sat_from: document.getElementById(
                    "dialog_settings_event_dt_sat_from").value,
                sat_to: document.getElementById(
                    "dialog_settings_event_dt_sat_to").value,
                sun: document.getElementById("dialog_settings_event_dt_sun")
                    .checked,
                sun_from: document.getElementById(
                    "dialog_settings_event_dt_sun_from").value,
                sun_to: document.getElementById(
                    "dialog_settings_event_dt_sun_to").value
            };
            if (p = JSON.stringify(p), "" == c) {
                notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                break
            }
            o = document.getElementById("dialog_settings_event_objects");
            if (!multiselectIsSelected(o)) {
                notifyBox("error", la.ERROR, la.AT_LEAST_ONE_OBJECT_SELECTED);
                break
            }
            if (imei = multiselectGetValues(o), "sos" == _ || "bracon" == _ ||
                "bracoff" == _ || "dismount" == _ || "door" == _ || "mandown" ==
                _ || "shock" == _ || "tow" == _ || "pwrcut" == _ ||
                "gpsantcut" == _ || "jamming" == _ || "lowdc" == _ ||
                "lowbat" == _ || "connyes" == _ || "gpsyes" == _ || "haccel" ==
                _ || "hbrake" == _ ||  "econbrake" == _ ||  "ecohaccel" == _ ||   "ecoexthbra" == _ || "hcorn" == _ || "driverch" == _ ||
                "trailerch" == _ || "service" == _ || "dtc" == _ ||
                "route_in" == _ || "route_out" == _ || "zone_in" == _ ||
                "zone_out" == _) var y = "";
            if ("connno" == _) {
                if ("" == (y = document.getElementById(
                        "dialog_settings_event_time_period").value)) {
                    notifyBox("error", la.ERROR, la
                        .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                    break
                }
                y < 5 && (y = 5)
            }
            if ("gpsno" == _) {
                if ("" == (y = document.getElementById(
                        "dialog_settings_event_time_period").value)) {
                    notifyBox("error", la.ERROR, la
                        .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                    break
                }
                y < 5 && (y = 5)
            }
            if ("stopped" == _ || "moving" == _ || "engidle" == _) {
                if ("" == (y = document.getElementById(
                        "dialog_settings_event_time_period").value)) {
                    notifyBox("error", la.ERROR, la
                        .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                    break
                }
                y < 1 && (y = 1)
            }
            if ("overspeed" == _ || "underspeed" == _)
                if ("" == (y = document.getElementById(
                        "dialog_settings_event_speed_limit").value)) {
                    notifyBox("error", la.ERROR, la
                        .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                    break
                } if ("param" == _ || "sensor" == _) {
                var v = settingsEditData.event_condition;
                if (0 == v.length) {
                    notifyBox("error", la.ERROR, la.AT_LEAST_ONE_CONDITION);
                    break
                }
                y = JSON.stringify(v)
            }
            var b = "";
            s = "";
            if ("route_in" != _ || "route_out" != _) {
                var h = document.getElementById("dialog_settings_event_routes");
                if ("route_in" == _ || "route_out" == _) {
                    if (b = "off", !multiselectIsSelected(h)) {
                        notifyBox("error", la.ERROR, la
                            .AT_LEAST_ONE_ROUTE_SELECTED);
                        break
                    }
                } else b = document.getElementById(
                    "dialog_settings_event_route_trigger").value;
                s = multiselectGetValues(h)
            }
            var E = "";
            l = "";
            if ("route_in" != _ && "route_out" != _) {
                var f = document.getElementById("dialog_settings_event_zones");
                if ("zone_in" == _ || "zone_out" == _) {
                    if (E = "off", !multiselectIsSelected(f)) {
                        notifyBox("error", la.ERROR, la
                            .AT_LEAST_ONE_ZONE_SELECTED);
                        break
                    }
                } else E = document.getElementById(
                    "dialog_settings_event_zone_trigger").value;
                l = multiselectGetValues(f)
            }
            r = (r = document.getElementById(
                    "dialog_settings_event_notify_system").checked) + "," +
                document.getElementById(
                    "dialog_settings_event_notify_system_hide").checked + "," +
                document.getElementById(
                    "dialog_settings_event_notify_system_sound").checked + "," +
                document.getElementById(
                    "dialog_settings_event_notify_system_sound_file").value;
            var I = document.getElementById("dialog_settings_event_notify_push")
                .checked,
                B = document.getElementById(
                    "dialog_settings_event_notify_email").checked,
                D = document.getElementById(
                    "dialog_settings_event_notify_email_address").value;
            if (1 == B)
                for (var O = D.split(","), j = 0; j < O.length; j++)
                    if (O[j] = O[j].trim(), !isEmailValid(O[j]))
                    return notifyBox("error", la.ERROR, la
                            .THIS_EMAIL_IS_NOT_VALID), !1;
            var T = document.getElementById("dialog_settings_event_notify_sms")
                .checked,
                R = document.getElementById(
                    "dialog_settings_event_notify_sms_number").value,
                k = document.getElementById(
                    "dialog_settings_event_notify_email_template").value,
                S = document.getElementById(
                    "dialog_settings_event_notify_sms_template").value,
                w = document.getElementById(
                    "dialog_settings_event_notify_arrow").checked,
                L = document.getElementById(
                    "dialog_settings_event_notify_arrow_color").value,
                A = document.getElementById("dialog_settings_event_notify_ohc")
                .checked,
                x = "#" + document.getElementById(
                    "dialog_settings_event_notify_ohc_color").value,
                N = document.getElementById(
                    "dialog_settings_event_webhook_send").checked,
                M = document.getElementById("dialog_settings_event_webhook_url")
                .value,
                C = document.getElementById("dialog_settings_event_cmd_send")
                .checked,
                P = document.getElementById("dialog_settings_event_cmd_gateway")
                .value,
                U = document.getElementById("dialog_settings_event_cmd_type")
                .value,
                G = document.getElementById("dialog_settings_event_cmd_string")
                .value;
            if (1 == C) {
                if ("" == G) return notifyBox("error", la.ERROR, la
                    .COMMAND_CANT_BE_EMPTY, !0), !1;
                if ("hex" == U && (G = G.toUpperCase(), !isHexValid(G.replace(
                        "%IMEI%", "")))) return notifyBox("error", la.ERROR, la
                    .COMMAND_HEX_NOT_VALID, !0), !1
            }
            var V = {
                cmd: "save_event",
                event_id: settingsEditData.event_id,
                type: _,
                name: c,
                active: g,
                duration_from_last_event: m,
                duration_from_last_event_minutes: u,
                week_days: a,
                day_time: p,
                imei: imei,
                checked_value: y,
                route_trigger: b,
                zone_trigger: E,
                routes: s,
                zones: l,
                notify_system: r,
                notify_push: I,
                notify_email: B,
                notify_email_address: D,
                notify_sms: T,
                notify_sms_number: R,
                email_template_id: k,
                sms_template_id: S,
                notify_arrow: w,
                notify_arrow_color: L,
                notify_ohc: A,
                notify_ohc_color: x,
                webhook_send: N,
                webhook_url: M,
                cmd_send: C,
                cmd_gateway: P,
                cmd_type: U,
                cmd_string: G
            };
            $.ajax({
                type: "POST",
                url: "func/fn_settings.events.php",
                data: V,
                cache: !1,
                success: function(e) {
                    "OK" == e && (settingsReloadEvents(), $(
                            "#dialog_settings_event_properties")
                        .dialog("close"), notifyBox("info", la
                            .INFORMATION, la
                            .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}

function settingsEventDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_event",
                    event_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.events.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && settingsReloadEvents()
                    }
                })
            }
        })
}

function settingsEventDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#settings_main_events_event_list_grid").jqGrid(
            "getGridParam", "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_events",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.events.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && settingsReloadEvents()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function settingsEventConditionList() {
    var e = settingsEditData.event_condition,
        t = [],
        a = $("#settings_event_param_sensor_condition_list_grid");
    if (a.clearGridData(!0), 0 != e.length) {
        for (var o = 0; o < e.length; o++) {
            var i = '<a href="#" onclick="settingsEventConditionDel(' + o +
                ');" title="' + la.DELETE +
                '"><img src="theme/images/remove3.svg" /></a>';
            t.push({
                src: e[o].src,
                cn: e[o].cn,
                val: e[o].val,
                modify: i
            })
        }
        for (o = 0; o < t.length; o++) a.jqGrid("addRowData", o, t[o]);
        a.setGridParam({
            sortname: "src",
            sortorder: "asc"
        }).trigger("reloadGrid")
    }
}

function settingsEventConditionAdd() {
    var e = document.getElementById(
            "dialog_settings_event_param_sensor_condition_src").value,
        t = document.getElementById(
            "dialog_settings_event_param_sensor_condition_cn").value,
        a = document.getElementById(
            "dialog_settings_event_param_sensor_condition_val").value;
    if ("" != e && "" != t && "" != a) {
        for (var o = 0; o < settingsEditData.event_condition.length; o++)
            if (settingsEditData.event_condition[o].src == e)
            return void notifyBox("error", la.ERROR, la
                    .SAME_SOURCE_ITEM_AVAILABLE);
        settingsEditData.event_condition.push({
                src: e,
                cn: t,
                val: a
            }), document.getElementById(
                "dialog_settings_event_param_sensor_condition_src").value = "",
            $("#dialog_settings_event_param_sensor_condition_src")
            .multipleSelect("refresh"), document.getElementById(
                "dialog_settings_event_param_sensor_condition_cn").value = "",
            $("#dialog_settings_event_param_sensor_condition_cn")
            .multipleSelect("refresh"), document.getElementById(
                "dialog_settings_event_param_sensor_condition_val").value = "",
            settingsEventConditionList()
    } else notifyBox("error", la.ERROR, la
        .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT)
}

function settingsEventConditionDel(e) {
    settingsEditData.event_condition.splice(e, 1), settingsEventConditionList()
}

function settingsEventParamList() {
    var e = document.getElementById(
        "dialog_settings_event_param_sensor_condition_src");
    e.options.length = 0, e.options.add(new Option("", "")), e.options.add(
        new Option(la.SPEED.toLowerCase(), "speed"));
    for (var t = getAllParamsArray(), a = 0; a < t.length; a++) e.options.add(
        new Option(t[a], t[a]));
    sortSelectList(e)
}

function settingsEventSensorList() {
    var e = document.getElementById(
        "dialog_settings_event_param_sensor_condition_src");
    e.options.length = 0;
    var t = getAllSensorsArray();
    e.options.add(new Option("", "")), e.options.add(new Option(la.SPEED,
        "speed"));
    for (var a = 0; a < t.length; a++) e.options.add(new Option(t[a], t[a]));
    sortSelectList(e)
}

function settingsEventSwitchType() {
    switch (document.getElementById("dialog_settings_event_time_period").value =
        "", document.getElementById("dialog_settings_event_speed_limit").value =
        "", $("#dialog_settings_event_routes option:selected").removeAttr(
            "selected"), $("#dialog_settings_event_routes").multipleSelect(
            "refresh"), $("#dialog_settings_event_zones option:selected")
        .removeAttr("selected"), $("#dialog_settings_event_zones")
        .multipleSelect("refresh"), document.getElementById(
            "dialog_settings_event_route_trigger").value = "off", $(
            "#dialog_settings_event_route_trigger").multipleSelect("refresh"),
        document.getElementById("dialog_settings_event_zone_trigger").value =
        "off", $("#dialog_settings_event_zone_trigger").multipleSelect(
            "refresh"), settingsEditData.event_condition = [], $(
            "#settings_event_param_sensor_condition_list_grid").clearGridData(!
            0), document.getElementById("dialog_settings_event_type").value) {
        case "sos":
        case "bracon":
        case "bracoff":
        case "dismount":
        case "door":
        case "mandown":
        case "shock":
        case "tow":
        case "pwrcut":
        case "gpsantcut":
        case "jamming":
        case "lowdc":
        case "lowbat":
        case "connyes":
        case "gpsyes":
        case "haccel":	
        case "hbrake":
        case "econbrake":	
        case "ecohaccel":
        case "ecoexthbra":	
        case "hcorn":
        case "driverch":
        case "trailerch":
        case "service":
        case "dtc":
            document.getElementById("dialog_settings_event_time_period")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_speed_limit").disabled = !0, $(
                    "#settings_event_param_sensor_condition_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "dialog_settings_event_param_sensor_condition_src")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_cn")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_val")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_add")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_route_trigger").disabled = !1,
                document.getElementById("dialog_settings_event_zone_trigger")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_routes").disabled = !1, document
                .getElementById("dialog_settings_event_zones").disabled = !1;
            break;
        case "connno":
        case "gpsno":
            document.getElementById("dialog_settings_event_time_period")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_speed_limit").disabled = !0, "" ==
                document.getElementById("dialog_settings_event_time_period")
                .value && (document.getElementById(
                    "dialog_settings_event_time_period").value = 60), $(
                    "#settings_event_param_sensor_condition_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "dialog_settings_event_param_sensor_condition_src")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_cn")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_val")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_add")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_route_trigger").disabled = !1,
                document.getElementById("dialog_settings_event_zone_trigger")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_routes").disabled = !1, document
                .getElementById("dialog_settings_event_zones").disabled = !1;
            break;
        case "stopped":
        case "moving":
        case "engidle":
            document.getElementById("dialog_settings_event_time_period")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_speed_limit").disabled = !0, "" ==
                document.getElementById("dialog_settings_event_time_period")
                .value && (document.getElementById(
                    "dialog_settings_event_time_period").value = 5), $(
                    "#settings_event_param_sensor_condition_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "dialog_settings_event_param_sensor_condition_src")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_cn")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_val")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_add")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_route_trigger").disabled = !1,
                document.getElementById("dialog_settings_event_zone_trigger")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_routes").disabled = !1, document
                .getElementById("dialog_settings_event_zones").disabled = !1;
            break;
        case "overspeed":
        case "underspeed":
            document.getElementById("dialog_settings_event_time_period")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_speed_limit").disabled = !1, "" ==
                document.getElementById("dialog_settings_event_speed_limit")
                .value && (document.getElementById(
                    "dialog_settings_event_speed_limit").value = 60), $(
                    "#settings_event_param_sensor_condition_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "dialog_settings_event_param_sensor_condition_src")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_cn")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_val")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_add")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_route_trigger").disabled = !1,
                document.getElementById("dialog_settings_event_zone_trigger")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_routes").disabled = !1, document
                .getElementById("dialog_settings_event_zones").disabled = !1;
            break;
        case "param":
            document.getElementById("dialog_settings_event_time_period")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_speed_limit").disabled = !0, $(
                    "#settings_event_param_sensor_condition_list_grid").closest(
                    ".ui-jqgrid").unblock(), document.getElementById(
                    "dialog_settings_event_param_sensor_condition_src")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_cn")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_val")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_add")
                .disabled = !1, settingsEventParamList(), document
                .getElementById("dialog_settings_event_route_trigger")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_zone_trigger").disabled = !1,
                document.getElementById("dialog_settings_event_routes")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_zones").disabled = !1;
            break;
        case "sensor":
            document.getElementById("dialog_settings_event_time_period")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_speed_limit").disabled = !0, $(
                    "#settings_event_param_sensor_condition_list_grid").closest(
                    ".ui-jqgrid").unblock(), document.getElementById(
                    "dialog_settings_event_param_sensor_condition_src")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_cn")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_val")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_add")
                .disabled = !1, settingsEventSensorList(), document
                .getElementById("dialog_settings_event_route_trigger")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_zone_trigger").disabled = !1,
                document.getElementById("dialog_settings_event_routes")
                .disabled = !1, document.getElementById(
                    "dialog_settings_event_zones").disabled = !1;
            break;
        case "route_in":
        case "route_out":
            document.getElementById("dialog_settings_event_time_period")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_speed_limit").disabled = !0, $(
                    "#settings_event_param_sensor_condition_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "dialog_settings_event_param_sensor_condition_src")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_cn")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_val")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_add")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_route_trigger").disabled = !0,
                document.getElementById("dialog_settings_event_zone_trigger")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_routes").disabled = !1, document
                .getElementById("dialog_settings_event_zones").disabled = !0;
            break;
        case "zone_in":
        case "zone_out":
            document.getElementById("dialog_settings_event_time_period")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_speed_limit").disabled = !0, $(
                    "#settings_event_param_sensor_condition_list_grid").closest(
                    ".ui-jqgrid").block({
                    message: ""
                }), document.getElementById(
                    "dialog_settings_event_param_sensor_condition_src")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_cn")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_val")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_param_sensor_condition_add")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_route_trigger").disabled = !0,
                document.getElementById("dialog_settings_event_zone_trigger")
                .disabled = !0, document.getElementById(
                    "dialog_settings_event_routes").disabled = !0, document
                .getElementById("dialog_settings_event_zones").disabled = !1
    }
}

function settingsEventResetDayTime() {
    document.getElementById("dialog_settings_event_dt").checked = !1, document
        .getElementById("dialog_settings_event_dt_mon").checked = !1, document
        .getElementById("dialog_settings_event_dt_mon_from").value = "00:00", $(
            "#dialog_settings_event_dt_mon_from").multipleSelect("refresh"),
        document.getElementById("dialog_settings_event_dt_mon_to").value =
        "24:00", $("#dialog_settings_event_dt_mon_to").multipleSelect(
        "refresh"), document.getElementById("dialog_settings_event_dt_tue")
        .checked = !1, document.getElementById(
            "dialog_settings_event_dt_tue_from").value = "00:00", $(
            "#dialog_settings_event_dt_tue_from").multipleSelect("refresh"),
        document.getElementById("dialog_settings_event_dt_tue_to").value =
        "24:00", $("#dialog_settings_event_dt_tue_to").multipleSelect(
        "refresh"), document.getElementById("dialog_settings_event_dt_wed")
        .checked = !1, document.getElementById(
            "dialog_settings_event_dt_wed_from").value = "00:00", $(
            "#dialog_settings_event_dt_wed_from").multipleSelect("refresh"),
        document.getElementById("dialog_settings_event_dt_wed_to").value =
        "24:00", $("#dialog_settings_event_dt_wed_to").multipleSelect(
        "refresh"), document.getElementById("dialog_settings_event_dt_thu")
        .checked = !1, document.getElementById(
            "dialog_settings_event_dt_thu_from").value = "00:00", $(
            "#dialog_settings_event_dt_thu_from").multipleSelect("refresh"),
        document.getElementById("dialog_settings_event_dt_thu_to").value =
        "24:00", $("#dialog_settings_event_dt_thu_to").multipleSelect(
        "refresh"), document.getElementById("dialog_settings_event_dt_fri")
        .checked = !1, document.getElementById(
            "dialog_settings_event_dt_fri_from").value = "00:00", $(
            "#dialog_settings_event_dt_fri_from").multipleSelect("refresh"),
        document.getElementById("dialog_settings_event_dt_fri_to").value =
        "24:00", $("#dialog_settings_event_dt_fri_to").multipleSelect(
        "refresh"), document.getElementById("dialog_settings_event_dt_sat")
        .checked = !1, document.getElementById(
            "dialog_settings_event_dt_sat_from").value = "00:00", $(
            "#dialog_settings_event_dt_sat_from").multipleSelect("refresh"),
        document.getElementById("dialog_settings_event_dt_sat_to").value =
        "24:00", $("#dialog_settings_event_dt_sat_to").multipleSelect(
        "refresh"), document.getElementById("dialog_settings_event_dt_sun")
        .checked = !1, document.getElementById(
            "dialog_settings_event_dt_sun_from").value = "00:00", $(
            "#dialog_settings_event_dt_sun_from").multipleSelect("refresh"),
        document.getElementById("dialog_settings_event_dt_sun_to").value =
        "24:00", $("#dialog_settings_event_dt_sun_to").multipleSelect("refresh")
}

function settingsEventSwitchDayTime() {
    0 == document.getElementById("dialog_settings_event_dt").checked ? (document
        .getElementById("dialog_settings_event_dt_mon").disabled = !0,
        document.getElementById("dialog_settings_event_dt_mon_from")
        .disabled = !0, document.getElementById(
            "dialog_settings_event_dt_mon_to").disabled = !0, document
        .getElementById("dialog_settings_event_dt_tue").disabled = !0,
        document.getElementById("dialog_settings_event_dt_tue_from")
        .disabled = !0, document.getElementById(
            "dialog_settings_event_dt_tue_to").disabled = !0, document
        .getElementById("dialog_settings_event_dt_wed").disabled = !0,
        document.getElementById("dialog_settings_event_dt_wed_from")
        .disabled = !0, document.getElementById(
            "dialog_settings_event_dt_wed_to").disabled = !0, document
        .getElementById("dialog_settings_event_dt_thu").disabled = !0,
        document.getElementById("dialog_settings_event_dt_thu_from")
        .disabled = !0, document.getElementById(
            "dialog_settings_event_dt_thu_to").disabled = !0, document
        .getElementById("dialog_settings_event_dt_fri").disabled = !0,
        document.getElementById("dialog_settings_event_dt_fri_from")
        .disabled = !0, document.getElementById(
            "dialog_settings_event_dt_fri_to").disabled = !0, document
        .getElementById("dialog_settings_event_dt_sat").disabled = !0,
        document.getElementById("dialog_settings_event_dt_sat_from")
        .disabled = !0, document.getElementById(
            "dialog_settings_event_dt_sat_to").disabled = !0, document
        .getElementById("dialog_settings_event_dt_sun").disabled = !0,
        document.getElementById("dialog_settings_event_dt_sun_from")
        .disabled = !0, document.getElementById(
            "dialog_settings_event_dt_sun_to").disabled = !0) : (document
        .getElementById("dialog_settings_event_dt_mon").disabled = !1,
        document.getElementById("dialog_settings_event_dt_mon_from")
        .disabled = !1, document.getElementById(
            "dialog_settings_event_dt_mon_to").disabled = !1, document
        .getElementById("dialog_settings_event_dt_tue").disabled = !1,
        document.getElementById("dialog_settings_event_dt_tue_from")
        .disabled = !1, document.getElementById(
            "dialog_settings_event_dt_tue_to").disabled = !1, document
        .getElementById("dialog_settings_event_dt_wed").disabled = !1,
        document.getElementById("dialog_settings_event_dt_wed_from")
        .disabled = !1, document.getElementById(
            "dialog_settings_event_dt_wed_to").disabled = !1, document
        .getElementById("dialog_settings_event_dt_thu").disabled = !1,
        document.getElementById("dialog_settings_event_dt_thu_from")
        .disabled = !1, document.getElementById(
            "dialog_settings_event_dt_thu_to").disabled = !1, document
        .getElementById("dialog_settings_event_dt_fri").disabled = !1,
        document.getElementById("dialog_settings_event_dt_fri_from")
        .disabled = !1, document.getElementById(
            "dialog_settings_event_dt_fri_to").disabled = !1, document
        .getElementById("dialog_settings_event_dt_sat").disabled = !1,
        document.getElementById("dialog_settings_event_dt_sat_from")
        .disabled = !1, document.getElementById(
            "dialog_settings_event_dt_sat_to").disabled = !1, document
        .getElementById("dialog_settings_event_dt_sun").disabled = !1,
        document.getElementById("dialog_settings_event_dt_sun_from")
        .disabled = !1, document.getElementById(
            "dialog_settings_event_dt_sun_to").disabled = !1)
}

function settingsEventCmdTemplateList() {
    for (var e = document.getElementById(
                "dialog_settings_event_cmd_template_list"), t = e
            .getElementsByTagName("optgroup"), a = t.length - 1; a >= 0; a--) e
        .removeChild(t[a]);
    e.options.length = 0;
    var o = new Array;
    for (var i in gsValues.cmd_default) o.push(gsValues.cmd_default[i].name);
    o.length > 0 && (n = $('<optgroup label="' + la.DEFAULT + '" />')).appendTo(
        e);
    for (o.sort(), a = 0; a < o.length; a += 1) e.options.add(new Option(la[o[a]
        .toUpperCase()], o[a]));
    var s = new Array,
        n = $('<optgroup label="' + la.CUSTOM + '" />');
    for (var i in n.appendTo(e), e.options.add(new Option(la.CUSTOM, "")),
            cmdData.cmd_templates) {
        var l = cmdData.cmd_templates[i];
        s.push({
            name: l.name,
            key: i
        })
    }
    for (s = sortArrayByElement(s, "name"), a = 0; a < s.length; a += 1) e
        .options.add(new Option(s[a].name, s[a].key))
}

function settingsEventCmdTemplateSwitch() {
    var e = document.getElementById("dialog_settings_event_cmd_template_list")
        .value,
        t = "",
        a = "";
    for (var o in gsValues.cmd_default) {
        var i = gsValues.cmd_default[o];
        if (e == i.name) {
            t = i.name, null != i.params && (a = i.params);
            break
        }
    }
    "" != t ? (document.getElementById("dialog_settings_event_cmd_gateway")
        .disabled = !0, document.getElementById(
            "dialog_settings_event_cmd_type").disabled = !0, document
        .getElementById("dialog_settings_event_cmd_gateway").value = "gprs",
        document.getElementById("dialog_settings_event_cmd_type").value =
        "ascii", "" != a && (t = t + "," + a), document.getElementById(
            "dialog_settings_event_cmd_string").value = t) : "" != e ? (
        document.getElementById("dialog_settings_event_cmd_gateway")
        .disabled = !1, document.getElementById(
            "dialog_settings_event_cmd_type").disabled = !1, document
        .getElementById("dialog_settings_event_cmd_gateway").value = cmdData
        .cmd_templates[e].gateway, document.getElementById(
            "dialog_settings_event_cmd_type").value = cmdData.cmd_templates[
            e].type, document.getElementById(
            "dialog_settings_event_cmd_string").value = cmdData
        .cmd_templates[e].cmd) : (document.getElementById(
            "dialog_settings_event_cmd_gateway").disabled = !1, document
        .getElementById("dialog_settings_event_cmd_type").disabled = !1,
        document.getElementById("dialog_settings_event_cmd_gateway").value =
        "gprs", document.getElementById("dialog_settings_event_cmd_type")
        .value = "ascii", document.getElementById(
            "dialog_settings_event_cmd_string").value = ""), $(
        "#dialog_settings_event_cmd_gateway").multipleSelect("refresh"), $(
        "#dialog_settings_event_cmd_type").multipleSelect("refresh")
}

function settingsObjectGroupImport() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", settingsObjectGroupImportOGRFile, !1),
        document.getElementById("load_file").click())
}

function settingsObjectGroupExport() {
    if (utilsCheckPrivileges("viewer")) {
        window.location = "func/fn_export.php?format=ogr"
    }
}

function settingsObjectGroupImportOGRFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        try {
            var t = $.parseJSON(e.target.result);
            if ("0.1v" == t.ogr) {
                var a = t.groups.length;
                if (0 == a) return void notifyBox("info", la.INFORMATION, la
                    .NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
                confirmDialog(sprintf(la.GROUPS_FOUND, a) + " " + la
                    .ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
                    function(t) {
                        if (t) {
                            loadingData(!0);
                            var a = {
                                format: "ogr",
                                data: e.target.result
                            };
                            $.ajax({
                                type: "POST",
                                url: "func/fn_import.php",
                                data: a,
                                cache: !1,
                                success: function(e) {
                                    loadingData(!1), "OK" ==
                                        e &&
                                        settingsReloadObjectGroups()
                                },
                                error: function(e, t) {
                                    loadingData(!1)
                                }
                            })
                        }
                    })
            } else notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        } catch (e) {
            notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        }
        document.getElementById("load_file").value = ""
    }, a.readAsText(t[0], "UTF-8"), this.removeEventListener("change",
        settingsObjectGroupImportOGRFile, !1)
}

function settingsObjectGroupDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_object_group",
                    group_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.groups.php",
                    data: a,
                    success: function(e) {
                        "OK" == e &&
                        settingsReloadObjectGroups()
                    }
                })
            }
        })
}

function settingsObjectGroupDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#settings_main_object_group_list_grid").jqGrid(
            "getGridParam", "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_object_groups",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.groups.php",
                        data: a,
                        success: function(e) {
                            "OK" == e &&
                                settingsReloadObjectGroups()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function settingsObjectGroupProperties(e) {
    switch (e) {
        default:
            var t = e;
            settingsEditData.group_id = t, document.getElementById(
                    "dialog_settings_object_group_name").value =
                settingsObjectGroupData[t].name, document.getElementById(
                    "dialog_settings_object_group_desc").value =
                settingsObjectGroupData[t].desc;
            var a = document.getElementById(
                    "dialog_settings_object_group_objects"),
                o = new Array;
            for (var i in settingsObjectData) settingsObjectData[i].group_id ==
                t && o.push(i);
            multiselectSetValues(a, o), $(
                    "#dialog_settings_object_group_objects").multipleSelect(
                    "refresh"), $("#dialog_settings_object_group_properties")
                .dialog("open");
            break;
        case "add":
            settingsEditData.group_id = !1, document.getElementById(
                    "dialog_settings_object_group_name").value = "", document
                .getElementById("dialog_settings_object_group_desc").value = "",
                $("#dialog_settings_object_group_objects option:selected")
                .removeAttr("selected"), $(
                    "#dialog_settings_object_group_objects").multipleSelect(
                    "refresh"), $("#dialog_settings_object_group_properties")
                .dialog("open");
            break;
        case "cancel":
            $("#dialog_settings_object_group_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var s = document.getElementById("dialog_settings_object_group_name")
                .value,
                n = document.getElementById("dialog_settings_object_group_desc")
                .value,
                l = multiselectGetValues(document.getElementById(
                    "dialog_settings_object_group_objects"));
            if ("" == s) {
                notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                break
            }
            for (var i in settingsObjectData) settingsObjectData[i].group_id ==
                settingsEditData.group_id && (settingsObjectData[i].group_id =
                    0);
            var d = l.split(",");
            for (var i in settingsObjectData)
                for (var r = 0; r < d.length; r++) i == d[r] && (
                    settingsObjectData[i].group_id = settingsEditData
                    .group_id);
            var _ = {
                cmd: "save_object_group",
                group_id: settingsEditData.group_id,
                group_name: s,
                group_desc: n,
                group_imei: l
            };
            $.ajax({
                type: "POST",
                url: "func/fn_settings.groups.php",
                data: _,
                cache: !1,
                success: function(e) {
                    "OK" == e && (settingsReloadObjectGroups(), $(
                        "#dialog_settings_object_group_properties"
                        ).dialog("close"), notifyBox("info",
                        la.INFORMATION, la
                        .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}

function settingsObjectDriverImport() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", settingsObjectDriverImportODRFile, !1),
        document.getElementById("load_file").click())
}

function settingsObjectDriverExport() {
    if (utilsCheckPrivileges("viewer")) {
        window.location = "func/fn_export.php?format=odr"
    }
}

function settingsObjectDriverImportODRFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        try {
            var t = $.parseJSON(e.target.result);
            if ("0.1v" == t.odr) {
                var a = t.drivers.length;
                if (0 == a) return void notifyBox("info", la.INFORMATION, la
                    .NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
                confirmDialog(sprintf(la.DRIVERS_FOUND, a) + " " + la
                    .ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
                    function(t) {
                        if (t) {
                            loadingData(!0);
                            var a = {
                                format: "odr",
                                data: e.target.result
                            };
                            $.ajax({
                                type: "POST",
                                url: "func/fn_import.php",
                                data: a,
                                cache: !1,
                                success: function(e) {
                                    loadingData(!1), "OK" ==
                                        e &&
                                        settingsReloadObjectDrivers()
                                },
                                error: function(e, t) {
                                    loadingData(!1)
                                }
                            })
                        }
                    })
            } else notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        } catch (e) {
            notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        }
        document.getElementById("load_file").value = ""
    }, a.readAsText(t[0], "UTF-8"), this.removeEventListener("change",
        settingsObjectDriverImportODRFile, !1)
}

function settingsObjectDriverDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_object_driver",
                    driver_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.drivers.php",
                    data: a,
                    success: function(e) {
                        "OK" == e &&
                            settingsReloadObjectDrivers()
                    }
                })
            }
        })
}

function settingsObjectDriverDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#settings_main_object_driver_list_grid").jqGrid(
            "getGridParam", "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_object_drivers",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.drivers.php",
                        data: a,
                        success: function(e) {
                            "OK" == e &&
                                settingsReloadObjectDrivers()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function settingsObjectDriverProperties(e) {
    switch (e) {
        default:
            var t = e;
            settingsEditData.driver_id = t, settingsEditData.driver_img_file = !
                1;
            var a = document.getElementById(
                "dialog_settings_object_driver_photo");
            "" == settingsObjectDriverData[t].img ? a.src =
                "img/user-blank.svg" : a.src = "data/user/drivers/" +
                settingsObjectDriverData[t].img, document.getElementById(
                    "dialog_settings_object_driver_name").value =
                settingsObjectDriverData[t].name, document.getElementById(
                    "dialog_settings_object_driver_assign_id").value =
                settingsObjectDriverData[t].assign_id, document.getElementById(
                    "dialog_settings_object_driver_idn").value =
                settingsObjectDriverData[t].idn, document.getElementById(
                    "dialog_settings_object_driver_address").value =
                settingsObjectDriverData[t].address, document.getElementById(
                    "dialog_settings_object_driver_phone").value =
                settingsObjectDriverData[t].phone, document.getElementById(
                    "dialog_settings_object_driver_email").value =
                settingsObjectDriverData[t].email, document.getElementById(
                    "dialog_settings_object_driver_desc").value =
                settingsObjectDriverData[t].desc, $(
                    "#dialog_settings_object_driver_properties").dialog("open");
            break;
        case "add":
            settingsEditData.driver_id = !1, settingsEditData
                .driver_img_file = !1, (a = document.getElementById(
                    "dialog_settings_object_driver_photo")).src =
                "img/user-blank.svg", document.getElementById(
                    "dialog_settings_object_driver_name").value = "", document
                .getElementById("dialog_settings_object_driver_assign_id")
                .value = "", document.getElementById(
                    "dialog_settings_object_driver_idn").value = "", document
                .getElementById("dialog_settings_object_driver_address").value =
                "", document.getElementById(
                    "dialog_settings_object_driver_phone").value = "", document
                .getElementById("dialog_settings_object_driver_email").value =
                "", document.getElementById(
                    "dialog_settings_object_driver_desc").value = "", $(
                    "#dialog_settings_object_driver_properties").dialog("open");
            break;
        case "cancel":
            $("#dialog_settings_object_driver_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var o = document.getElementById(
                    "dialog_settings_object_driver_name").value,
                i = document.getElementById(
                    "dialog_settings_object_driver_assign_id").value,
                s = document.getElementById("dialog_settings_object_driver_idn")
                .value,
                n = document.getElementById(
                    "dialog_settings_object_driver_address").value,
                l = document.getElementById(
                    "dialog_settings_object_driver_phone").value,
                d = document.getElementById(
                    "dialog_settings_object_driver_email").value,
                r = document.getElementById(
                    "dialog_settings_object_driver_desc").value;
            if ("" == o) {
                notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                break
            }
            var _ = {
                cmd: "save_object_driver",
                driver_id: settingsEditData.driver_id,
                driver_name: o,
                driver_assign_id: i,
                driver_idn: s,
                driver_address: n,
                driver_phone: l,
                driver_email: d,
                driver_desc: r,
                driver_img_file: settingsEditData.driver_img_file
            };
            $.ajax({
                type: "POST",
                url: "func/fn_settings.drivers.php",
                data: _,
                cache: !1,
                success: function(e) {
                    "OK" == e && (settingsReloadObjectDrivers(), $(
                        "#dialog_settings_object_driver_properties"
                        ).dialog("close"), notifyBox("info",
                        la.INFORMATION, la
                        .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}


function settingsObjectDriverPhotoDelete() {
    utilsCheckPrivileges("viewer") && (settingsEditData.driver_img_file =
        "delete", document.getElementById(
            "dialog_settings_object_driver_photo").src =
        "img/user-blank.svg")
}

function settingsObjectDriverPhotoUpload() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", settingsObjectDriverPhotoUploadFile, !
        1), document.getElementById("load_file").click())
}

function settingsObjectDriverPhotoUploadFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onloadend = function(e) {
        var a = e.target.result;
        if (t[0].type.match("image/png") || t[0].type.match("image/jpeg")) {
            var o = new Image;
            o.src = a, o.onload = function() {
                o.width > 640 || o.height > 480 ? notifyBox("error", la
                        .ERROR, la
                        .IMAGE_SIZE_SHOULD_NOT_BE_BIGGER_THAN_640_480) :
                    $.ajax({
                        url: "func/fn_upload.php?file=driver_photo",
                        type: "POST",
                        data: a,
                        processData: !1,
                        contentType: !1,
                        success: function(e) {
                            document.getElementById(
                                    "dialog_settings_object_driver_photo"
                                    ).src = e + "?t=" + (
                                    new Date).getTime(),
                                settingsEditData
                                .driver_img_file = !0
                        }
                    })
            }, document.getElementById("load_file").value = ""
        } else notifyBox("error", la.ERROR, la.FILE_TYPE_MUST_BE_PNG_OR_JPG)
    }, a.readAsDataURL(t[0]), this.removeEventListener("change",
        settingsObjectDriverPhotoUploadFile, !1)
}

function settingsObjectPassengerImport() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", settingsObjectPassengerImportOPAFile, !
            1), document.getElementById("load_file").click())
}

function settingsObjectPassengerExport() {
    if (utilsCheckPrivileges("viewer")) {
        window.location = "func/fn_export.php?format=opa"
    }
}

function settingsObjectPassengerImportOPAFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        try {
            var t = $.parseJSON(e.target.result);
            if ("0.1v" == t.opa) {
                var a = t.passengers.length;
                if (0 == a) return void notifyBox("info", la.INFORMATION, la
                    .NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
                confirmDialog(sprintf(la.PASSENGERS_FOUND, a) + " " + la
                    .ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
                    function(t) {
                        if (t) {
                            loadingData(!0);
                            var a = {
                                format: "opa",
                                data: e.target.result
                            };
                            $.ajax({
                                type: "POST",
                                url: "func/fn_import.php",
                                data: a,
                                cache: !1,
                                success: function(e) {
                                    loadingData(!1), "OK" ==
                                        e &&
                                        settingsReloadObjectPassengers()
                                },
                                error: function(e, t) {
                                    loadingData(!1)
                                }
                            })
                        }
                    })
            } else notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        } catch (e) {
            notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        }
        document.getElementById("load_file").value = ""
    }, a.readAsText(t[0], "UTF-8"), this.removeEventListener("change",
        settingsObjectPassengerImportOPAFile, !1)
}

function settingsObjectPassengerDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_object_passenger",
                    passenger_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.passengers.php",
                    data: a,
                    success: function(e) {
                        "OK" == e &&
                            settingsReloadObjectPassengers()
                    }
                })
            }
        })
}

function settingsObjectPassengerDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#settings_main_object_passenger_list_grid").jqGrid(
            "getGridParam", "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_object_passengers",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.passengers.php",
                        data: a,
                        success: function(e) {
                            "OK" == e &&
                                settingsReloadObjectPassengers()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function settingsObjectPassengerProperties(e) {
    switch (e) {
        default:
            var t = e,
                a = {
                    cmd: "load_object_passenger_data",
                    passenger_id: t
                };
            $.ajax({
                type: "POST",
                url: "func/fn_settings.passengers.php",
                data: a,
                dataType: "json",
                cache: !1,
                success: function(e) {
                    settingsEditData.passenger_id = t, document
                        .getElementById(
                            "dialog_settings_object_passenger_name")
                        .value = e.name, document.getElementById(
                            "dialog_settings_object_passenger_assign_id"
                            ).value = e.assign_id, document
                        .getElementById(
                            "dialog_settings_object_passenger_idn")
                        .value = e.idn, document.getElementById(
                            "dialog_settings_object_passenger_address"
                            ).value = e.address, document
                        .getElementById(
                            "dialog_settings_object_passenger_phone"
                            ).value = e.phone, document
                        .getElementById(
                            "dialog_settings_object_passenger_email"
                            ).value = e.email, document
                        .getElementById(
                            "dialog_settings_object_passenger_desc")
                        .value = e.desc, $(
                            "#dialog_settings_object_passenger_properties"
                            ).dialog("open")
                }
            });
            break;
        case "add":
            settingsEditData.passenger_id = !1, document.getElementById(
                    "dialog_settings_object_passenger_name").value = "",
                document.getElementById(
                    "dialog_settings_object_passenger_assign_id").value = "",
                document.getElementById("dialog_settings_object_passenger_idn")
                .value = "", document.getElementById(
                    "dialog_settings_object_passenger_address").value = "",
                document.getElementById(
                    "dialog_settings_object_passenger_phone").value = "",
                document.getElementById(
                    "dialog_settings_object_passenger_email").value = "",
                document.getElementById("dialog_settings_object_passenger_desc")
                .value = "", $("#dialog_settings_object_passenger_properties")
                .dialog("open");
            break;
        case "cancel":
            $("#dialog_settings_object_passenger_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var o = document.getElementById(
                    "dialog_settings_object_passenger_name").value,
                i = document.getElementById(
                    "dialog_settings_object_passenger_assign_id").value,
                s = document.getElementById(
                    "dialog_settings_object_passenger_idn").value,
                n = document.getElementById(
                    "dialog_settings_object_passenger_address").value,
                l = document.getElementById(
                    "dialog_settings_object_passenger_phone").value,
                d = document.getElementById(
                    "dialog_settings_object_passenger_email").value,
                r = document.getElementById(
                    "dialog_settings_object_passenger_desc").value;
            if ("" == o) {
                notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                break
            }
            a = {
                cmd: "save_object_passenger",
                passenger_id: settingsEditData.passenger_id,
                passenger_name: o,
                passenger_assign_id: i,
                passenger_idn: s,
                passenger_address: n,
                passenger_phone: l,
                passenger_email: d,
                passenger_desc: r
            };
            $.ajax({
                type: "POST",
                url: "func/fn_settings.passengers.php",
                data: a,
                cache: !1,
                success: function(e) {
                    "OK" == e && (settingsReloadObjectPassengers(),
                        $(
                            "#dialog_settings_object_passenger_properties")
                        .dialog("close"), notifyBox("info", la
                            .INFORMATION, la
                            .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}

function settingsObjectTrailerImport() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", settingsObjectTrailerImportOTRFile, !1),
        document.getElementById("load_file").click())
}

function settingsObjectTrailerExport() {
    if (utilsCheckPrivileges("viewer")) {
        window.location = "func/fn_export.php?format=otr"
    }
}

function settingsObjectTrailerImportOTRFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        try {
            var t = $.parseJSON(e.target.result);
            if ("0.1v" == t.otr) {
                var a = t.trailers.length;
                if (0 == a) return void notifyBox("info", la.INFORMATION, la
                    .NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
                confirmDialog(sprintf(la.TRAILERS_FOUND, a) + " " + la
                    .ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
                    function(t) {
                        if (t) {
                            loadingData(!0);
                            var a = {
                                format: "otr",
                                data: e.target.result
                            };
                            $.ajax({
                                type: "POST",
                                url: "func/fn_import.php",
                                data: a,
                                cache: !1,
                                success: function(e) {
                                    loadingData(!1), "OK" ==
                                        e &&
                                        settingsReloadObjectTrailers()
                                },
                                error: function(e, t) {
                                    loadingData(!1)
                                }
                            })
                        }
                    })
            } else notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        } catch (e) {
            notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        }
        document.getElementById("load_file").value = ""
    }, a.readAsText(t[0], "UTF-8"), this.removeEventListener("change",
        settingsObjectTrailerImportOTRFile, !1)
}

function settingsObjectTrailerDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_object_trailer",
                    trailer_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_settings.trailers.php",
                    data: a,
                    success: function(e) {
                        "OK" == e &&
                            settingsReloadObjectTrailers()
                    }
                })
            }
        })
}

function settingsObjectTrailerDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#settings_main_object_trailer_list_grid").jqGrid(
            "getGridParam", "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_object_trailers",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_settings.trailers.php",
                        data: a,
                        success: function(e) {
                            "OK" == e &&
                                settingsReloadObjectTrailers()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function settingsObjectTrailerProperties(e) {
    switch (e) {
        default:
            var t = e;
            settingsEditData.trailer_id = t, document.getElementById(
                    "dialog_settings_object_trailer_name").value =
                settingsObjectTrailerData[t].name, document.getElementById(
                    "dialog_settings_object_trailer_assign_id").value =
                settingsObjectTrailerData[t].assign_id, document.getElementById(
                    "dialog_settings_object_trailer_model").value =
                settingsObjectTrailerData[t].model, document.getElementById(
                    "dialog_settings_object_trailer_vin").value =
                settingsObjectTrailerData[t].vin, document.getElementById(
                    "dialog_settings_object_trailer_plate_number").value =
                settingsObjectTrailerData[t].plate_number, document
                .getElementById("dialog_settings_object_trailer_desc").value =
                settingsObjectTrailerData[t].desc, $(
                    "#dialog_settings_object_trailer_properties").dialog(
                "open");
            break;
        case "add":
            settingsEditData.trailer_id = !1, document.getElementById(
                    "dialog_settings_object_trailer_name").value = "", document
                .getElementById("dialog_settings_object_trailer_assign_id")
                .value = "", document.getElementById(
                    "dialog_settings_object_trailer_model").value = "", document
                .getElementById("dialog_settings_object_trailer_vin").value =
                "", document.getElementById(
                    "dialog_settings_object_trailer_plate_number").value = "",
                document.getElementById("dialog_settings_object_trailer_desc")
                .value = "", $("#dialog_settings_object_trailer_properties")
                .dialog("open");
            break;
        case "cancel":
            $("#dialog_settings_object_trailer_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var a = document.getElementById(
                    "dialog_settings_object_trailer_name").value,
                o = document.getElementById(
                    "dialog_settings_object_trailer_assign_id").value,
                i = document.getElementById(
                    "dialog_settings_object_trailer_model").value,
                s = document.getElementById(
                    "dialog_settings_object_trailer_vin").value,
                n = document.getElementById(
                    "dialog_settings_object_trailer_plate_number").value,
                l = document.getElementById(
                    "dialog_settings_object_trailer_desc").value;
            if ("" == a) {
                notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                break
            }
            var d = {
                cmd: "save_object_trailer",
                trailer_id: settingsEditData.trailer_id,
                trailer_name: a,
                trailer_assign_id: o,
                trailer_model: i,
                trailer_vin: s,
                trailer_plate_number: n,
                trailer_desc: l
            };
            $.ajax({
                type: "POST",
                url: "func/fn_settings.trailers.php",
                data: d,
                cache: !1,
                success: function(e) {
                    "OK" == e && (settingsReloadObjectTrailers(), $(
                        "#dialog_settings_object_trailer_properties"
                        ).dialog("close"), notifyBox("info",
                        la.INFORMATION, la
                        .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}
