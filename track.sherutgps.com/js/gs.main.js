var dashboardData = new Array,
    timer_dashboardInit;

function dashboardOpen() {
    utilsCheckPrivileges("dashboard") && $("#dialog_dashboard").dialog("open"),
        dashboardInit(!1)
}

function dashboardResize() {
    var e = $(window).width() - 30,
        t = $(window).height() - 30;
    $("#dialog_dashboard").dialog("option", "width", e), $("#dialog_dashboard")
        .dialog("option", "height", t), e -= 30, t -= 30, dashboardData
        .container_height = (t - 36 - 10) / 2, document.getElementById(
            "dialog_dashboard_objects").style.height = dashboardData
        .container_height + "px", document.getElementById(
            "dialog_dashboard_events").style.height = dashboardData
        .container_height + "px", null != document.getElementById(
            "dialog_dashboard_tasks") && (document.getElementById(
                "dialog_dashboard_tasks").style.height = dashboardData
            .container_height + "px"), null != document.getElementById(
            "dialog_dashboard_maintenance") && (document.getElementById(
                "dialog_dashboard_maintenance").style.height = dashboardData
            .container_height + "px"), document.getElementById(
            "dialog_dashboard_odometer").style.height = dashboardData
        .container_height + "px", document.getElementById(
            "dialog_dashboard_mileage").style.height = dashboardData
        .container_height + "px", null != document.getElementById(
            "dashboard_objects_graph_plot") && (document.getElementById(
                "dashboard_objects_graph_plot").style.height = dashboardData
            .container_height - 30 - 20 + "px"), null != document
        .getElementById("dashboard_objects_text") && (document.getElementById(
                "dashboard_objects_text").style.height = dashboardData
            .container_height - 30 - 20 + "px"), null != document
        .getElementById("dashboard_events_graph_plot") && (document
            .getElementById("dashboard_events_graph_plot").style.height =
            dashboardData.container_height - 30 - 20 + "px"), null != document
        .getElementById("dashboard_events_text") && (document.getElementById(
                "dashboard_events_text").style.height = dashboardData
            .container_height - 30 - 20 + "px"), null != document
        .getElementById("dashboard_maintenance_graph_plot") && (document
            .getElementById("dashboard_maintenance_graph_plot").style.height =
            dashboardData.container_height - 30 - 20 + "px"), null != document
        .getElementById("dashboard_maintenance_text") && (document
            .getElementById("dashboard_maintenance_text").style.height =
            dashboardData.container_height - 30 - 20 + "px"), null != document
        .getElementById("dashboard_tasks_graph_plot") && (document
            .getElementById("dashboard_tasks_graph_plot").style.height =
            dashboardData.container_height - 30 - 20 + "px"), null != document
        .getElementById("dashboard_tasks_text") && (document.getElementById(
                "dashboard_tasks_text").style.height = dashboardData
            .container_height - 30 - 20 + "px"), null != document
        .getElementById("dashboard_odometer_graph_plot") && (document
            .getElementById("dashboard_odometer_graph_plot").style.height =
            dashboardData.container_height - 30 - 20 + "px"), null != document
        .getElementById("dashboard_odometer_text") && (document.getElementById(
                "dashboard_odometer_text").style.height = dashboardData
            .container_height - 30 - 20 + "px"), null != document
        .getElementById("dashboard_mileage_graph_plot") && (document
            .getElementById("dashboard_mileage_graph_plot").style.height =
            dashboardData.container_height - 30 - 20 + "px"), null != document
        .getElementById("dashboard_mileage_text") && (document.getElementById(
                "dashboard_mileage_text").style.height = dashboardData
            .container_height - 30 - 20 + "px")
}

function dashboardInit(e) {
    1 == $("#dialog_dashboard").dialog("isOpen") ? (e ? (1 == settingsUserData
            .privileges_maintenance && dashboardInitMaintenance(), 1 ==
            settingsUserData.privileges_tasks && dashboardInitTasks(),
            dashboardInitOdometer(), dashboardInitMileage()) : (
            dashboardInitObjects(), dashboardInitEvents(), 1 ==
            settingsUserData.privileges_maintenance &&
            dashboardInitMaintenance(), 1 == settingsUserData
            .privileges_tasks && dashboardInitTasks(),
            dashboardInitOdometer(), dashboardInitMileage()), clearTimeout(
            timer_dashboardInit), timer_dashboardInit = setTimeout(
            "dashboardInit(true);", 1e3 * gsValues.dashboard_refresh)) :
        clearTimeout(timer_dashboardInit)
}

function dashboardInitObjects() {
    if (Object.keys(objectsData).length > 0) {
        var e = [],
            t = 0,
            a = 0,
            o = 0,
            i = 0,
            s = 0;
        for (var n in objectsData) {
            var l = objectsData[n].status;
            0 == l ? t += 1 : "off" == l ? a += 1 : "s" == l ? o += 1 : "m" ==
                l ? i += 1 : "i" == l && (s += 1)
        }
        e.push({
            label: la.NO_DATA,
            data: t
        }), e.push({
            label: la.OFFLINE,
            data: a
        }), e.push({
            label: la.STOPPED,
            data: o
        }), e.push({
            label: la.MOVING,
            data: i
        }), e.push({
            label: la.IDLE,
            data: s
        });
        var d = '<div class="dashboard-container-header">';
        d += '<div class="dashboard-container-header-icon"><span class="icon-objects"></span></div><div class="dashboard-container-header-title">' +
            la.OBJECTS + "</div></div>", d +=
            '<div id="dashboard_objects_graph_plot"></div>', document
            .getElementById("dialog_dashboard_objects").innerHTML = d, document
            .getElementById("dashboard_objects_graph_plot").style.height =
            dashboardData.container_height - 30 - 20 + "px";
        var r = $("#dashboard_objects_graph_plot");
        $.plot(r, e, {
            series: {
                pie: {
                    innerRadius: .5,
                    show: !0,
                    radius: 1,
                    label: {
                        show: !0,
                        radius: .75,
                        formatter: function(e, t) {
                            return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" +
                                e + "<br/>" + Math.round(t
                                .percent) + "%</div>"
                        },
                        background: {
                            opacity: .5
                        }
                    }
                }
            },
            legend: {
                show: !1
            }
        })
    } else {
        d = '<div class="dashboard-container-header">';
        d += '<div class="dashboard-container-header-icon"><span class="icon-objects"></span></div><div class="dashboard-container-header-title">' +
            la.OBJECTS + "</div></div>", d +=
            '<div id="dashboard_objects_text" class="dashboard-container-text">' +
            la.NO_DATA_HAS_BEEN_COLLECTED_YET + "</div>", document
            .getElementById("dialog_dashboard_objects").innerHTML = d, document
            .getElementById("dashboard_objects_text").style.height =
            dashboardData.container_height - 30 - 20 + "px"
    }
}

function dashboardInitEvents() {
    var e = moment().format("YYYY-MM-DD"),
        t = moment().add("days", 1).format("YYYY-MM-DD"),
        a = {
            cmd: "load_events_data",
            dtf: e += " 00:00:00",
            dtt: t += " 00:00:00"
        };
    $.ajax({
        type: "POST",
        url: "func/fn_dashboard.php",
        data: a,
        dataType: "json",
        cache: !1,
        success: function(e) {
            if (Object.keys(e).length > 0) {
                var t = [];
                for (var a in e) {
                    var o = e[a].name,
                        i = e[a].count;
                    t.push({
                        label: o,
                        data: i
                    })
                }
                var s = '<div class="dashboard-container-header">';
                s += '<div class="dashboard-container-header-icon"><span class="icon-route-event"></span></div><div class="dashboard-container-header-title">' +
                    la.EVENTS + "</div></div>", s +=
                    '<div id="dashboard_events_graph_plot"></div>',
                    document.getElementById(
                        "dialog_dashboard_events").innerHTML = s,
                    document.getElementById(
                        "dashboard_events_graph_plot").style
                    .height = dashboardData.container_height - 30 -
                    20 + "px";
                var n = $("#dashboard_events_graph_plot");
                $.plot(n, t, {
                    series: {
                        pie: {
                            innerRadius: .5,
                            show: !0,
                            radius: 1,
                            label: {
                                show: !0,
                                radius: .75,
                                formatter: function(e, t) {
                                    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" +
                                        e + "<br/>" +
                                        Math.round(t
                                            .percent) +
                                        "%</div>"
                                },
                                background: {
                                    opacity: .5
                                }
                            }
                        }
                    },
                    legend: {
                        show: !1
                    }
                })
            } else {
                s = '<div class="dashboard-container-header">';
                s += '<div class="dashboard-container-header-icon"><span class="icon-route-event"></span></div><div class="dashboard-container-header-title">' +
                    la.EVENTS + "</div></div>", s +=
                    '<div id="dashboard_events_text" class="dashboard-container-text">' +
                    la.NO_DATA_HAS_BEEN_COLLECTED_YET + "</div>",
                    document.getElementById(
                        "dialog_dashboard_events").innerHTML = s,
                    document.getElementById("dashboard_events_text")
                    .style.height = dashboardData.container_height -
                    30 - 20 + "px"
            }
        }
    })
}

function dashboardInitMaintenance() {
    $.ajax({
        type: "POST",
        url: "func/fn_dashboard.php",
        data: {
            cmd: "load_maintenance_data"
        },
        dataType: "json",
        cache: !1,
        success: function(e) {
            if (Object.keys(e).length > 0) {
                var t = [],
                    a = 0,
                    o = 0;
                for (var i in e) {
                    var s = e[i].odometer_left_val,
                        n = e[i].engine_hours_left_val,
                        l = e[i].days_left_val;
                    s < 0 || n < 0 || l < 0 ? o += 1 : a += 1
                }
                t.push({
                    label: la.VALID,
                    data: a,
                    color: "#4DA74D"
                }), t.push({
                    label: la.EXPIRED,
                    data: o,
                    color: "#CB4B4B"
                });
                var d = '<div class="dashboard-container-header">';
                d += '<a href="#" onclick="dashboardOpenMaintenance();"><div class="dashboard-container-header-icon"><span class="icon-maintenance"></span></div><div class="dashboard-container-header-title">' +
                    la.MAINTENANCE + "</div></a></div>", d +=
                    '<div id="dashboard_maintenance_graph_plot"></div>',
                    document.getElementById(
                        "dialog_dashboard_maintenance").innerHTML =
                    d, document.getElementById(
                        "dashboard_maintenance_graph_plot").style
                    .height = dashboardData.container_height - 30 -
                    20 + "px";
                var r = $("#dashboard_maintenance_graph_plot");
                $.plot(r, t, {
                    series: {
                        pie: {
                            innerRadius: .5,
                            show: !0,
                            radius: 1,
                            label: {
                                show: !0,
                                radius: .75,
                                formatter: function(e, t) {
                                    return "<div style='font-size:8pt; text-align:center; padding:2px; color:white;'>" +
                                        e + "<br/>" +
                                        Math.round(t
                                            .percent) +
                                        "%</div>"
                                },
                                background: {
                                    opacity: .5
                                }
                            }
                        }
                    },
                    legend: {
                        show: !1
                    }
                })
            } else {
                d = '<div class="dashboard-container-header">';
                d += '<a href="#" onclick="dashboardOpenMaintenance();"><div class="dashboard-container-header-icon"><span class="icon-maintenance"></span></div><div class="dashboard-container-header-title">' +
                    la.MAINTENANCE + "</div></a></div>", d +=
                    '<div id="dashboard_maintenance_text" class="dashboard-container-text">' +
                    la.NO_DATA_HAS_BEEN_COLLECTED_YET + "</div>",
                    document.getElementById(
                        "dialog_dashboard_maintenance").innerHTML =
                    d, document.getElementById(
                        "dashboard_maintenance_text").style.height =
                    dashboardData.container_height - 30 - 20 + "px"
            }
        }
    })
}

function dashboardInitTasks() {
    var e = moment().format("YYYY-MM-DD"),
        t = moment().add("days", 1).format("YYYY-MM-DD"),
        a = {
            cmd: "load_tasks_data",
            dtf: e += " 00:00:00",
            dtt: t += " 00:00:00"
        };
    $.ajax({
        type: "POST",
        url: "func/fn_dashboard.php",
        data: a,
        dataType: "json",
        cache: !1,
        success: function(e) {
            if (Object.keys(e).length > 0) {
                var t = [];
                for (var a in e) {
                    var o = e[a].name,
                        i = e[a].count;
                    color = "", 0 == a ? color = "#AFD8F8" : 1 ==
                        a ? color = "#EDC240" : 2 == a ? color =
                        "#4DA74D" : 3 == a && (color = "#CB4B4B"), t
                        .push({
                            data: [
                                [o, i]
                            ],
                            color: color
                        })
                }
                var s = '<div class="dashboard-container-header">';
                s += '<a href="#" onclick="dashboardOpenTasks();"><div class="dashboard-container-header-icon"><span class="icon-tasks"></span></div><div class="dashboard-container-header-title">' +
                    la.TASKS + "</div></a></div>", s +=
                    '<div id="dashboard_tasks_graph_plot" class="dashboard-container-graph-plot"></div>',
                    document.getElementById(
                        "dialog_dashboard_tasks").innerHTML = s,
                    document.getElementById(
                        "dashboard_tasks_graph_plot").style.height =
                    dashboardData.container_height - 30 - 20 + "px";
                var n = $("#dashboard_tasks_graph_plot");
                $.plot(n, t, {
                    series: {
                        bars: {
                            show: !0,
                            fill: !0,
                            barWidth: .5,
                            lineWidth: 0,
                            align: "center",
                            fillColor: {
                                colors: [{
                                    opacity: 1
                                }, {
                                    opacity: 1
                                }]
                            }
                        }
                    },
                    xaxis: {
                        mode: "categories",
                        showTicks: !1,
                        gridLines: !1
                    }
                })
            } else {
                s = '<div class="dashboard-container-header">';
                s += '<a href="#" onclick="dashboardOpenTasks();"><div class="dashboard-container-header-icon"><span class="icon-tasks"></span></div><div class="dashboard-container-header-title">' +
                    la.TASKS + "</div></a></div>", s +=
                    '<div id="dashboard_tasks_text" class="dashboard-container-text">' +
                    la.NO_DATA_HAS_BEEN_COLLECTED_YET + "</div>",
                    document.getElementById(
                        "dialog_dashboard_tasks").innerHTML = s,
                    document.getElementById("dashboard_tasks_text")
                    .style.height = dashboardData.container_height -
                    30 - 20 + "px"
            }
        }
    })
}

function dashboardInitOdometer() {
    $.ajax({
        type: "POST",
        url: "func/fn_dashboard.php",
        data: {
            cmd: "load_odometer_data"
        },
        dataType: "json",
        cache: !1,
        success: function(e) {
            if (Object.keys(e).length > 0) {
                var t = [];
                for (var a in e) t.push({
                    label: e[a].name,
                    data: [
                        [e[a].name, e[a].odometer]
                    ]
                });
                var o = '<div class="dashboard-container-header">';
                o += '<div class="dashboard-container-header-icon"><span class="icon-odometer"></span></div><div class="dashboard-container-header-title">' +
                    la.ODOMETER_TOP_10 + " (" + la.UNIT_DISTANCE +
                    ")</div></div>", o +=
                    '<div id="dashboard_odometer_graph_plot" class="dashboard-container-graph-plot"></div>',
                    document.getElementById(
                        "dialog_dashboard_odometer").innerHTML = o,
                    document.getElementById(
                        "dashboard_odometer_graph_plot").style
                    .height = dashboardData.container_height - 30 -
                    20 + "px";
                var i = $("#dashboard_odometer_graph_plot");
                $.plot(i, t, {
                    legend: {
                        show: !0,
                        margin: 10,
                        backgroundOpacity: .5,
                        noColumns: 2,
                        position: "ne",
                        labelFormatter: function(e, t) {
                            return '<div style="color:#444444">' +
                                e + "</div>"
                        }
                    },
                    series: {
                        bars: {
                            show: !0,
                            fill: !0,
                            barWidth: .5,
                            lineWidth: 0,
                            align: "center",
                            fillColor: {
                                colors: [{
                                    opacity: 1
                                }, {
                                    opacity: 1
                                }]
                            }
                        }
                    },
                    yaxes: {
                        min: 0
                    },
                    xaxis: {
                        show: !1,
                        mode: "categories",
                        showTicks: !1,
                        gridLines: !1
                    }
                })
            } else {
                o = '<div class="dashboard-container-header">';
                o += '<div class="dashboard-container-header-icon"><span class="icon-odometer"></span></div><div class="dashboard-container-header-title">' +
                    la.ODOMETER + " (" + la.UNIT_DISTANCE +
                    ")</div></div>", o +=
                    '<div id="dashboard_odometer_text" class="dashboard-container-text">' +
                    la.NO_DATA_HAS_BEEN_COLLECTED_YET + "</div>",
                    document.getElementById(
                        "dialog_dashboard_odometer").innerHTML = o,
                    document.getElementById(
                        "dashboard_odometer_text").style.height =
                    dashboardData.container_height - 30 - 20 + "px"
            }
        }
    })
}

function dashboardInitMileage() {
    $.ajax({
        type: "POST",
        url: "func/fn_dashboard.php",
        data: {
            cmd: "load_mileage_data"
        },
        dataType: "json",
        cache: !1,
        success: function(e) {
            if (Object.keys(e).length > 0) {
                var t = [];
                t.push([
                    [e.mileage_dt_5, e.mileage_5]
                ]), t.push([
                    [e.mileage_dt_4, e.mileage_4]
                ]), t.push([
                    [e.mileage_dt_3, e.mileage_3]
                ]), t.push([
                    [e.mileage_dt_2, e.mileage_2]
                ]), t.push([
                    [e.mileage_dt_1, e.mileage_1]
                ]);
                var a = '<div class="dashboard-container-header">';
                a += '<div class="dashboard-container-header-icon"><span class="icon-odometer"></span></div><div class="dashboard-container-header-title">' +
                    la.MILEAGE + " (" + la.UNIT_DISTANCE +
                    ")</div></div>", a +=
                    '<div id="dashboard_mileage_graph_plot" class="dashboard-container-graph-plot"></div>',
                    document.getElementById(
                        "dialog_dashboard_mileage").innerHTML = a,
                    document.getElementById(
                        "dashboard_mileage_graph_plot").style
                    .height = dashboardData.container_height - 30 -
                    20 + "px";
                var o = $("#dashboard_mileage_graph_plot");
                $.plot(o, t, {
                    series: {
                        bars: {
                            show: !0,
                            fill: !0,
                            barWidth: .5,
                            lineWidth: 0,
                            align: "center",
                            fillColor: {
                                colors: [{
                                    opacity: 1
                                }, {
                                    opacity: 1
                                }]
                            }
                        }
                    },
                    yaxes: {
                        min: 0
                    },
                    xaxis: {
                        mode: "categories",
                        showTicks: !1,
                        gridLines: !1
                    }
                })
            } else {
                a = '<div class="dashboard-container-header">';
                a += '<div class="dashboard-container-header-icon"><span class="icon-odometer"></span></div><div class="dashboard-container-header-title">' +
                    la.MILEAGE + " (" + la.UNIT_DISTANCE +
                    ")</div></div>", a +=
                    '<div id="dashboard_mileage_text" class="dashboard-container-text">' +
                    la.NO_DATA_HAS_BEEN_COLLECTED_YET + "</div>",
                    document.getElementById(
                        "dialog_dashboard_mileage").innerHTML = a,
                    document.getElementById(
                        "dashboard_mileage_text").style.height =
                    dashboardData.container_height - 30 - 20 + "px"
            }
        }
    })
}

function dashboardOpenMaintenance() {
    maintenanceOpen()
}

function dashboardOpenTasks() {
    tasksOpen()
}

function dtcOpen() {
    utilsCheckPrivileges("dtc") && ($("#dialog_dtc").bind("resize", function() {
        $("#dtc_list_grid").setGridHeight($("#dialog_dtc")
        .height() - 133)
    }).trigger("resize"), $("#dialog_dtc").bind("resize", function() {
        $("#dtc_list_grid").setGridWidth($("#dialog_dtc").width())
    }).trigger("resize"), $("#dialog_dtc").dialog("open"))
}

function dtcClose() {
    $("#dialog_dtc").unbind("resize")
}

function dtcShow() {
    var e = "func/fn_dtc.php?cmd=load_dtc_list",
        t = document.getElementById("dialog_dtc_object_list").value,
        a = document.getElementById("dialog_dtc_date_from").value + " " +
        document.getElementById("dialog_dtc_hour_from").value + ":" + document
        .getElementById("dialog_dtc_minute_from").value + ":00",
        o = document.getElementById("dialog_dtc_date_to").value + " " + document
        .getElementById("dialog_dtc_hour_to").value + ":" + document
        .getElementById("dialog_dtc_minute_to").value + ":00";
    "" != t && (e += "&imei=" + t), a != o && (e += "&dtf=" + a + "&dtt=" + o),
        $("#dtc_list_grid").jqGrid("setGridParam", {
            url: e
        }).trigger("reloadGrid")
}

function dtcDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_record",
                    dtc_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_dtc.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && dtcShow()
                    }
                })
            }
        })
}

function dtcDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#dtc_list_grid").jqGrid("getGridParam", "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_records",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_dtc.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && dtcShow()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function dtcDeleteAll() {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE_ALL_DTC_RECORDS,
        function(e) {
            if (e) {
                $.ajax({
                    type: "POST",
                    url: "func/fn_dtc.php",
                    data: {
                        cmd: "delete_all_records"
                    },
                    success: function(e) {
                        "OK" == e && dtcShow()
                    }
                })
            }
        })
}

function dtcExportCSV() {
    var e = "func/fn_export.php?format=dtc_csv",
        t = document.getElementById("dialog_dtc_object_list").value,
        a = document.getElementById("dialog_dtc_date_from").value + " " +
        document.getElementById("dialog_dtc_hour_from").value + ":" + document
        .getElementById("dialog_dtc_minute_from").value + ":00",
        o = document.getElementById("dialog_dtc_date_to").value + " " + document
        .getElementById("dialog_dtc_hour_to").value + ":" + document
        .getElementById("dialog_dtc_minute_to").value + ":00";
    "" != t && (e += "&imei=" + t), a != o && (e += "&dtf=" + a + "&dtt=" + o),
        window.location = e
}

function maintenanceOpen() {
    utilsCheckPrivileges("maintenance") && ($("#dialog_maintenance").bind(
            "resize",
            function() {
                $("#maintenance_list_grid").setGridHeight($(
                    "#dialog_maintenance").height() - 43)
            }).trigger("resize"), $("#dialog_maintenance").bind("resize",
            function() {
                $("#maintenance_list_grid").setGridWidth($(
                    "#dialog_maintenance").width())
            }).trigger("resize"), $("#dialog_maintenance").dialog("open"),
        $("#maintenance_list_grid").trigger("reloadGrid"))
}

function maintenanceClose() {
    $("#dialog_maintenance").unbind("resize")
}

function maintenanceObjectServiceProperties(e, t) {
    settingsEditData.object_imei = e, settingsObjectServiceProperties(t)
}

function maintenanceServiceProperties(e) {
    switch (e) {
        case "add":
            $("#dialog_maintenance_service_objects option:selected").removeAttr(
                    "selected"), $("#dialog_maintenance_service_objects")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_maintenance_service_name").value = "", document
                .getElementById("dialog_maintenance_service_data_list")
                .checked = !1, document.getElementById(
                    "dialog_maintenance_service_popup").checked = !1, document
                .getElementById("dialog_maintenance_service_odo").checked = !1,
                document.getElementById(
                    "dialog_maintenance_service_odo_interval").value = "",
                document.getElementById("dialog_maintenance_service_odo_last")
                .value = "", document.getElementById(
                    "dialog_maintenance_service_engh").checked = !1, document
                .getElementById("dialog_maintenance_service_engh_interval")
                .value = "", document.getElementById(
                    "dialog_maintenance_service_engh_last").value = "", document
                .getElementById("dialog_maintenance_service_days").checked = !1,
                document.getElementById(
                    "dialog_maintenance_service_days_interval").value = "",
                document.getElementById("dialog_maintenance_service_days_last")
                .value = "", document.getElementById(
                    "dialog_maintenance_service_odo_left").checked = !1,
                document.getElementById(
                    "dialog_maintenance_service_odo_left_num").value = "",
                document.getElementById("dialog_maintenance_service_engh_left")
                .checked = !1, document.getElementById(
                    "dialog_maintenance_service_engh_left_num").value = "",
                document.getElementById("dialog_maintenance_service_days_left")
                .checked = !1, document.getElementById(
                    "dialog_maintenance_service_days_left_num").value = "",
                document.getElementById(
                    "dialog_maintenance_service_update_last").checked = !1,
                maintenanceServiceCheck(), $(
                    "#dialog_maintenance_service_properties").dialog("open");
            break;
        case "cancel":
            $("#dialog_maintenance_service_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var t = document.getElementById("dialog_maintenance_service_name")
                .value,
                a = document.getElementById(
                    "dialog_maintenance_service_objects"),
                o = document.getElementById(
                    "dialog_maintenance_service_data_list").checked,
                i = document.getElementById("dialog_maintenance_service_popup")
                .checked,
                s = document.getElementById("dialog_maintenance_service_odo")
                .checked,
                n = document.getElementById(
                    "dialog_maintenance_service_odo_interval").value,
                l = document.getElementById(
                    "dialog_maintenance_service_odo_last").value,
                d = document.getElementById("dialog_maintenance_service_engh")
                .checked,
                r = document.getElementById(
                    "dialog_maintenance_service_engh_interval").value,
                _ = document.getElementById(
                    "dialog_maintenance_service_engh_last").value,
                c = document.getElementById("dialog_maintenance_service_days")
                .checked,
                g = document.getElementById(
                    "dialog_maintenance_service_days_interval").value,
                m = document.getElementById(
                    "dialog_maintenance_service_days_last").value,
                u = document.getElementById(
                    "dialog_maintenance_service_odo_left").checked,
                p = document.getElementById(
                    "dialog_maintenance_service_odo_left_num").value,
                y = document.getElementById(
                    "dialog_maintenance_service_engh_left").checked,
                v = document.getElementById(
                    "dialog_maintenance_service_engh_left_num").value,
                b = document.getElementById(
                    "dialog_maintenance_service_days_left").checked,
                h = document.getElementById(
                    "dialog_maintenance_service_days_left_num").value,
                E = document.getElementById(
                    "dialog_maintenance_service_update_last").checked;
            if ("" == t) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (!multiselectIsSelected(a)) return void notifyBox("error", la
                .ERROR, la.AT_LEAST_ONE_OBJECT_SELECTED);
            if (1 == s && ("" == n || "" == l)) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (1 == d && ("" == r || "" == _)) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (1 == c && ("" == g || "" == m)) {
                notifyBox("error", la.ERROR, la
                    .ALL_AVAILABLE_FIELDS_SHOULD_BE_FILLED_OUT);
                break
            }
            if (parseFloat(n) <= parseFloat(p) && 1 == u) {
                notifyBox("error", la.ERROR, la
                    .INTERVAL_VALUE_SHOULD_BE_GREATER_THAN_LEFT_VALUE);
                break
            }
            if (parseFloat(r) <= parseFloat(v) && 1 == y) {
                notifyBox("error", la.ERROR, la
                    .INTERVAL_VALUE_SHOULD_BE_GREATER_THAN_LEFT_VALUE);
                break
            }
            if (parseFloat(g) <= parseFloat(h) && 1 == b) {
                notifyBox("error", la.ERROR, la
                    .INTERVAL_VALUE_SHOULD_BE_GREATER_THAN_LEFT_VALUE);
                break
            }
            var f = {
                cmd: "save_service",
                name: t,
                imei: multiselectGetValues(a),
                data_list: o,
                popup: i,
                odo: s,
                odo_interval: n,
                odo_last: l,
                engh: d,
                engh_interval: r,
                engh_last: _,
                days: c,
                days_interval: g,
                days_last: m,
                odo_left: u,
                odo_left_num: p,
                engh_left: y,
                engh_left_num: v,
                days_left: b,
                days_left_num: h,
                update_last: E
            };
            $.ajax({
                type: "POST",
                url: "func/fn_maintenance.php",
                data: f,
                cache: !1,
                success: function(e) {
                    "OK" == e && (settingsReloadObjects(), $(
                        "#dialog_maintenance_service_properties"
                        ).dialog("close"), $(
                        "#maintenance_list_grid").trigger(
                        "reloadGrid"))
                }
            })
    }
}

function maintenanceServiceDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_service",
                    service_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_maintenance.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && $("#maintenance_list_grid")
                            .trigger("reloadGrid")
                    }
                })
            }
        })
}

function maintenanceServiceDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#maintenance_list_grid").jqGrid("getGridParam", "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_services",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_maintenance.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && $(
                                    "#maintenance_list_grid")
                                .trigger("reloadGrid")
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function maintenanceServiceCheck() {
    1 == document.getElementById("dialog_maintenance_service_odo").checked ? (
            document.getElementById("dialog_maintenance_service_odo_interval")
            .disabled = !1, document.getElementById(
                "dialog_maintenance_service_odo_last").disabled = !1, document
            .getElementById("dialog_maintenance_service_odo_left").disabled = !
            1, document.getElementById(
                "dialog_maintenance_service_odo_left_num").disabled = !1) : (
            document.getElementById("dialog_maintenance_service_odo_interval")
            .disabled = !0, document.getElementById(
                "dialog_maintenance_service_odo_last").disabled = !0, document
            .getElementById("dialog_maintenance_service_odo_left").disabled = !
            0, document.getElementById(
                "dialog_maintenance_service_odo_left_num").disabled = !0), 1 ==
        document.getElementById("dialog_maintenance_service_engh").checked ? (
            document.getElementById("dialog_maintenance_service_engh_interval")
            .disabled = !1, document.getElementById(
                "dialog_maintenance_service_engh_last").disabled = !1, document
            .getElementById("dialog_maintenance_service_engh_left").disabled = !
            1, document.getElementById(
                "dialog_maintenance_service_engh_left_num").disabled = !1) : (
            document.getElementById("dialog_maintenance_service_engh_interval")
            .disabled = !0, document.getElementById(
                "dialog_maintenance_service_engh_last").disabled = !0, document
            .getElementById("dialog_maintenance_service_engh_left").disabled = !
            0, document.getElementById(
                "dialog_maintenance_service_engh_left_num").disabled = !0), 1 ==
        document.getElementById("dialog_maintenance_service_days").checked ? (
            document.getElementById("dialog_maintenance_service_days_interval")
            .disabled = !1, document.getElementById(
                "dialog_maintenance_service_days_last").disabled = !1, document
            .getElementById("dialog_maintenance_service_days_left").disabled = !
            1, document.getElementById(
                "dialog_maintenance_service_days_left_num").disabled = !1) : (
            document.getElementById("dialog_maintenance_service_days_interval")
            .disabled = !0, document.getElementById(
                "dialog_maintenance_service_days_last").disabled = !0, document
            .getElementById("dialog_maintenance_service_days_left").disabled = !
            0, document.getElementById(
                "dialog_maintenance_service_days_left_num").disabled = !0), 1 ==
        document.getElementById("dialog_maintenance_service_odo").checked ||
        1 == document.getElementById("dialog_maintenance_service_engh")
        .checked || 1 == document.getElementById(
            "dialog_maintenance_service_days").checked ? document
        .getElementById("dialog_maintenance_service_update_last").disabled = !
        1 : document.getElementById("dialog_maintenance_service_update_last")
        .disabled = !0
}

function datalistBottomResize() {
    void 0 !== settingsUserData && "bottom_panel" == settingsUserData
        .datalist && ("none" == document.getElementById("side_panel").style
            .display ? ($("#bottom_panel_datalist_object_data_list").css(
                "width", $(window).width() - 24), $(
                "#bottom_panel_datalist_event_data_list").css("width", $(
                window).width() - 24), $(
                "#bottom_panel_datalist_route_data_list").css("width", $(
                window).width() - 24)) : ($(
                "#bottom_panel_datalist_object_data_list").css("width", $(
                window).width() - 384), $(
                "#bottom_panel_datalist_event_data_list").css("width", $(
                window).width() - 384), $(
                "#bottom_panel_datalist_route_data_list").css("width", $(
                window).width() - 384)), $(
                "#bottom_panel_datalist_object_data_list").css("height",
                guiDragbars.bottom_panel - 51), $(
                "#bottom_panel_datalist_event_data_list").css("height",
                guiDragbars.bottom_panel - 51), $(
                "#bottom_panel_datalist_route_data_list").css("height",
                guiDragbars.bottom_panel - 51))
}

function datalistBottomSwitch(e) {
    if ("bottom_panel" == settingsUserData.datalist) switch (e) {
        case "object":
            document.getElementById(
                    "bottom_panel_datalist_object_data_list").style
                .display = "", document.getElementById(
                    "bottom_panel_datalist_event_data_list").style.display =
                "none", document.getElementById(
                    "bottom_panel_datalist_route_data_list").style.display =
                "none";
            break;
        case "event":
            document.getElementById(
                    "bottom_panel_datalist_object_data_list").style
                .display = "none", document.getElementById(
                    "bottom_panel_datalist_event_data_list").style.display =
                "", document.getElementById(
                    "bottom_panel_datalist_route_data_list").style.display =
                "none";
            break;
        case "route":
            document.getElementById(
                    "bottom_panel_datalist_object_data_list").style
                .display = "none", document.getElementById(
                    "bottom_panel_datalist_event_data_list").style.display =
                "none", document.getElementById(
                    "bottom_panel_datalist_route_data_list").style.display =
                ""
    }
}

function datalistBottomShowData(e, t, a) {
    1 != gsValues.datalist_first_show || "object" != e && "event" != e || (
        showBottomPanel(), gsValues.datalist_first_show = !1);
    var o = "odd",
        s = "",
        n = "",
        l = settingsUserData.datalist_items.split(",");
    switch (e) {
        case "object":
            n = "bottom_panel_datalist_object_data_list";
            break;
        case "event":
            n = "bottom_panel_datalist_event_data_list";
            break;
        case "route":
            n = "bottom_panel_datalist_route_data_list"
    }
    if (document.getElementById(n).innerHTML = "", "" != a) {
        var d = new Array;
        switch (e) {
            case "object":
                if (-1 !== l.indexOf("odometer")) - 1 != (m = getObjectOdometer(
                    t, !1)) && d.push({
                    icon: "icon-odometer",
                    name: la.ODOMETER,
                    value: m + " " + la.UNIT_DISTANCE
                });
                if (-1 !== l.indexOf("engine_hours")) - 1 != (u =
                    getObjectEngineHours(t, !1)) && d.push({
                    icon: "icon-engine-hours",
                    name: la.ENGINE_HOURS,
                    value: u
                });
                if (-1 !== l.indexOf("status")) {
                    var r = objectsData[t].status_string;
                    "" != r && d.push({
                        icon: "icon-status",
                        name: la.STATUS,
                        value: r
                    })
                }
                var _ = settingsObjectData[t].custom_fields;
                for (var c in _) {
                    var g = _[c];
                    "true" == g.data_list && d.push({
                        icon: "icon-default-custom-fields",
                        name: g.name,
                        value: g.value
                    })
                }
                break;
            case "event":
            case "route":
                var m, u;
                if (-1 !== l.indexOf("odometer")) - 1 != (m = getObjectOdometer(
                    t, a.params)) && d.push({
                    icon: "icon-odometer",
                    name: la.ODOMETER,
                    value: m + " " + la.UNIT_DISTANCE
                });
                if (-1 !== l.indexOf("engine_hours")) - 1 != (u =
                    getObjectEngineHours(t, a.params)) && d.push({
                    icon: "icon-engine-hours",
                    name: la.ENGINE_HOURS,
                    value: u
                })
        }
        if (-1 !== l.indexOf("model")) {
            var p = settingsObjectData[t].model;
            "" != p && d.push({
                icon: "icon-model",
                name: la.MODEL,
                value: p
            })
        }
        if (-1 !== l.indexOf("vin")) {
            var y = settingsObjectData[t].vin;
            "" != y && d.push({
                icon: "icon-vin",
                name: la.VIN,
                value: y
            })
        }
        if (-1 !== l.indexOf("plate_number")) {
            var v = settingsObjectData[t].plate_number;
            "" != v && d.push({
                icon: "icon-plate-number",
                name: la.PLATE,
                value: v
            })
        }
        if (-1 !== l.indexOf("sim_number")) {
            var b = settingsObjectData[t].sim_number;
            "" != b && d.push({
                icon: "icon-sim",
                name: la.SIM_CARD_NUMBER,
                value: b
            })
        }
        if (-1 !== l.indexOf("driver")) {
            var h = getDriver(t, a.params);
            if (0 != h) {
                var E = '<a href="#" onclick="utilsShowDriverInfo(\'' + h
                    .driver_id + "');\">" + h.name + "</a>";
                d.push({
                    icon: "icon-user",
                    name: la.DRIVER,
                    value: E
                })
            }
        }
        if (-1 !== l.indexOf("trailer")) {
            var f = getTrailer(t, a.params);
            if (0 != f) {
                var I = '<a href="#" onclick="utilsShowTrailerInfo(\'' + f
                    .trailer_id + "');\">" + f.name + "</a>";
                d.push({
                    icon: "icon-trailer",
                    name: la.TRAILER,
                    value: I
                })
            }
        }
        d = sortArrayByElement(d, "name");
        var B = "";
        for (i = 0; i < d.length; i += 1) {
            B += datalistBottomAddItem(o = "odd" == o ? "even" : "odd", (C = d[
                i]).icon, C.name, C.value)
        }
        s += B;
        var D = new Array;
        switch (e) {
            case "object":
            case "event":
                -1 !== l.indexOf("time_position") && D.push({
                    icon: "icon-time",
                    name: la.TIME_POSITION,
                    value: a.dt_tracker
                }), -1 !== l.indexOf("time_server") && D.push({
                    icon: "icon-time",
                    name: la.TIME_SERVER,
                    value: a.dt_server
                })
        }
        switch (e) {
            case "object":
                if (-1 !== l.indexOf("address") && 1 == gsValues
                    .address_display_object_data_list) {
                    geocoderGetAddress(a.lat, a.lng, function(e) {
                        document.getElementById(n + "_address")
                            .innerHTML = e, document.getElementById(n +
                                "_address").title = e, objectsData[t]
                            .address = e
                    });
                    var O = '<span id="' + n + '_address">' + objectsData[t]
                        .address + "</span>";
                    D.push({
                        icon: "icon-address",
                        name: la.ADDRESS,
                        value: O
                    })
                }
                break;
            case "event":
                if (-1 !== l.indexOf("address") && 1 == gsValues
                    .address_display_event_data_list) {
                    geocoderGetAddress(a.lat, a.lng, function(e) {
                        document.getElementById(n + "_address")
                            .innerHTML = e, document.getElementById(n +
                                "_address").title = e, objectsData[t]
                            .address = e
                    });
                    O = '<span id="' + n + '_address">' + objectsData[t]
                        .address + "</span>";
                    D.push({
                        icon: "icon-address",
                        name: la.ADDRESS,
                        value: O
                    })
                }
                break;
            case "route":
                if (-1 !== l.indexOf("address") && 1 == gsValues
                    .address_display_history_route_data_list) {
                    geocoderGetAddress(a.lat, a.lng, function(e) {
                        document.getElementById(n + "_address")
                            .innerHTML = e, document.getElementById(n +
                                "_address").title = e, objectsData[t]
                            .address = e
                    });
                    O = '<span id="' + n + '_address">' + objectsData[t]
                        .address + "</span>";
                    D.push({
                        icon: "icon-address",
                        name: la.ADDRESS,
                        value: O
                    })
                }
        }
        if (-1 !== l.indexOf("position") && D.push({
                icon: "icon-marker",
                name: la.POSITION,
                value: urlPosition(a.lat, a.lng)
            }), -1 !== l.indexOf("speed") && D.push({
                icon: "icon-speed",
                name: la.SPEED,
                value: a.speed + " " + la.UNIT_SPEED
            }), -1 !== l.indexOf("altitude") && D.push({
                icon: "icon-altitude ",
                name: la.ALTITUDE,
                value: a.altitude + " " + la.UNIT_HEIGHT
            }), -1 !== l.indexOf("angle") && D.push({
                icon: "icon-angle ",
                name: la.ANGLE,
                value: a.angle + " &deg;"
            }), -1 !== l.indexOf("nearest_zone")) {
            var j = getNearestZone(t, a.lat, a.lng);
            "" != j.name && D.push({
                icon: "icon-nearest-zone",
                name: la.NEAREST_ZONE,
                value: j.name + " (" + j.distance + ")"
            })
        }
        if (-1 !== l.indexOf("nearest_marker")) {
            var T = getNearestMarker(t, a.lat, a.lng);
            "" != T.name && D.push({
                icon: "icon-nearest-marker",
                name: la.NEAREST_MARKER,
                value: T.name + " (" + T.distance + ")"
            })
        }
        D = sortArrayByElement(D, "name");
        var R = "";
        for (i = 0; i < D.length; i += 1) {
            R += datalistBottomAddItem(o = "odd" == o ? "even" : "odd", (C = D[
                i]).icon, C.name, C.value)
        }
        s += R;
        var k = new Array,
            S = settingsObjectData[t].sensors;
        for (var c in S) {
            var w = S[c];
            if ("true" == w.data_list) {
                var L = "icon-default-sensor";
                if ("batt" == w.type) {
                    if (L = "icon-battery-lev-3", "percentage" == w.result_type)
                        (A = getSensorValue(a.params, w)).value <= 25 ? L =
                        "icon-battery-lev-0" : A.value <= 50 ? L =
                        "icon-battery-lev-1" : A.value <= 75 ? L =
                        "icon-battery-lev-2" : A.value <= 100 ? L =
                        "icon-battery-lev-3" : A.value > 100 && (L =
                            "icon-battery-lev-3")
                } else "di" == w.type ? L = "icon-di" : "do" == w.type ? L =
                    "icon-do" : "fuel" == w.type ? L = "icon-fuel" :
                    "fuelsumup" == w.type ? L = "icon-fuel" : "gsm" == w.type ?
                    L = "icon-gsm" : "gps" == w.type ? L = "icon-gps" : "acc" ==
                    w.type ? L = "icon-engine" : "temp" == w.type && (L =
                        "icon-temperature");
                if ("fuelsumup" == w.type) {
                    var A = getSensorValueFuelLevelSumUp(t, a.params, w);
                    k.push({
                        icon: L,
                        name: w.name,
                        value: A.value_full
                    })
                } else {
                    A = getSensorValue(a.params, w);
                    k.push({
                        icon: L,
                        name: w.name,
                        value: A.value_full
                    })
                }
            }
        }
        k = sortArrayByElement(k, "name");
        var x = "";
        for (i = 0; i < k.length; i += 1) {
            x += datalistBottomAddItem(o = "odd" == o ? "even" : "odd", (C = k[
                i]).icon, C.name, C.value)
        }
        s += x;
        var N = new Array;
        switch (e) {
            case "object":
                var M = objectsData[t].service;
                for (var c in M) "true" == M[c].data_list && N.push({
                    icon: "icon-warning",
                    name: M[c].name,
                    value: M[c].status
                })
        }
        N = sortArrayByElement(N, "name");
        var $ = "";
        for (i = 0; i < N.length; i += 1) {
            var C;
            $ += datalistBottomAddItem(o = "odd" == o ? "even" : "odd", (C = N[
                i]).icon, C.name, C.value)
        }
        s += $, document.getElementById(n).innerHTML = s
    } else switch (e) {
        case "object":
            document.getElementById(n).innerHTML =
                '<div class="data-item-text">' + la
                .NO_DATA_HAS_BEEN_RECEIVED_YET + "</div>"
    }
}

function datalistBottomAddItem(e, t, a, o) {
    var i = '<div class="datalist-item ' + e + '">';
    return i += 0 == t ? '<span class="datalist-item-icon"></span>' :
        '<span class="datalist-item-icon ' + t + '"></span>', i +=
        '<div class="datalist-item-name">' + a + "</div>", i +=
        '<div class="datalist-item-value">' + o + "</div>", i += "</div>"
}

function datalistClear(e) {
    if ("bottom_panel" == settingsUserData.datalist) switch (e) {
        case "object":
            document.getElementById(
                    "bottom_panel_datalist_object_data_list").innerHTML =
                '<div class="data-item-text">' + la.NO_OBJECT_SELECTED +
                "</div>";
            break;
        case "event":
            document.getElementById("bottom_panel_datalist_event_data_list")
                .innerHTML = '<div class="data-item-text">' + la
                .NO_EVENT_SELECTED + "</div>";
            break;
        case "route":
            document.getElementById("bottom_panel_datalist_route_data_list")
                .innerHTML = '<div class="data-item-text">' + la
                .NO_HISTORY_LOADED + "</div>"
    } else switch (e) {
        case "object":
            $("#side_panel_objects_object_datalist_grid").clearGridData(
                !0);
            break;
        case "event":
            $("#side_panel_events_event_datalist_grid").clearGridData(!
                0);
            break;
        case "route":
            $("#side_panel_history_route_datalist_grid").clearGridData(!
                0)
    }
}

function datalistShowData(e, t, a) {
    if ("bottom_panel" != settingsUserData.datalist) {
        var o = [],
            i = "",
            s = "",
            n = settingsUserData.datalist_items.split(",");
        switch (e) {
            case "object":
                s = "side_panel_objects_object_datalist_grid", i = $(
                    "#side_panel_objects_object_datalist_grid");
                break;
            case "event":
                s = "side_panel_events_event_datalist_grid", i = $(
                    "#side_panel_events_event_datalist_grid");
                break;
            case "route":
                s = "side_panel_history_route_datalist_grid", i = $(
                    "#side_panel_history_route_datalist_grid")
        }
        for (var l = 0; l < 5; l++) null != document.getElementById(s +
            "ghead_0_" + l) && ($("#" + s + "ghead_0_" + l).find("span")
            .hasClass("ui-icon-circlesmall-minus") ? gsValues
            .datalist_groups_colapsed[e][l] = !1 : gsValues
            .datalist_groups_colapsed[e][l] = !0);
        var d = i.closest(".ui-jqgrid-bdiv").scrollTop();
        if (i.clearGridData(!0), "" != a) {
            var r = a.dt_server,
                _ = a.dt_tracker,
                c = a.lat,
                g = a.lng,
                m = a.speed,
                u = a.altitude,
                p = a.angle,
                y = (m = a.speed, a.params);
            switch (e) {
                case "object":
                    if (-1 !== n.indexOf("odometer")) - 1 != (I =
                        getObjectOdometer(t, !1)) && o.push({
                        group_name: la.GENERAL,
                        data: la.ODOMETER,
                        value: I + " " + la.UNIT_DISTANCE
                    });
                    if (-1 !== n.indexOf("engine_hours")) - 1 != (B =
                        getObjectEngineHours(t, !1)) && o.push({
                        group_name: la.GENERAL,
                        data: la.ENGINE_HOURS,
                        value: B
                    });
                    if (-1 !== n.indexOf("status")) {
                        var v = objectsData[t].status_string;
                        "" != v && o.push({
                            group_name: la.GENERAL,
                            data: la.STATUS,
                            value: v
                        })
                    } - 1 !== n.indexOf("time_position") && o.push({
                        group_name: la.LOCATION,
                        data: la.TIME_POSITION,
                        value: _
                    }), -1 !== n.indexOf("time_server") && o.push({
                        group_name: la.LOCATION,
                        data: la.TIME_SERVER,
                        value: r
                    });
                    var b = objectsData[t].service;
                    for (var h in b) "true" == b[h].data_list && o.push({
                        group_name: la.SERVICE,
                        data: b[h].name,
                        value: b[h].status
                    });
                    var E = settingsObjectData[t].custom_fields;
                    for (var h in E) {
                        var f = E[h];
                        "true" == f.data_list && o.push({
                            group_name: la.GENERAL,
                            data: f.name,
                            value: f.value
                        })
                    }
                    break;
                case "event":
                    if (-1 !== n.indexOf("odometer")) - 1 != (I =
                        getObjectOdometer(t, a.params)) && o.push({
                        group_name: la.GENERAL,
                        data: la.ODOMETER,
                        value: I + " " + la.UNIT_DISTANCE
                    });
                    if (-1 !== n.indexOf("engine_hours")) - 1 != (B =
                        getObjectEngineHours(t, a.params)) && o.push({
                        group_name: la.GENERAL,
                        data: la.ENGINE_HOURS,
                        value: B
                    }); - 1 !== n.indexOf("time_position") && o.push({
                        group_name: la.LOCATION,
                        data: la.TIME_POSITION,
                        value: _
                    }), -1 !== n.indexOf("time_server") && o.push({
                        group_name: la.LOCATION,
                        data: la.TIME_SERVER,
                        value: r
                    });
                    break;
                case "route":
                    var I, B;
                    if (-1 !== n.indexOf("odometer")) - 1 != (I =
                        getObjectOdometer(t, a.params)) && o.push({
                        group_name: la.GENERAL,
                        data: la.ODOMETER,
                        value: I + " " + la.UNIT_DISTANCE
                    });
                    if (-1 !== n.indexOf("engine_hours")) - 1 != (B =
                        getObjectEngineHours(t, a.params)) && o.push({
                        group_name: la.GENERAL,
                        data: la.ENGINE_HOURS,
                        value: B
                    })
            }
            if (-1 !== n.indexOf("model")) {
                var D = settingsObjectData[t].model;
                "" != D && o.push({
                    group_name: la.GENERAL,
                    data: la.MODEL,
                    value: D
                })
            }
            if (-1 !== n.indexOf("vin")) {
                var O = settingsObjectData[t].vin;
                "" != O && o.push({
                    group_name: la.GENERAL,
                    data: la.VIN,
                    value: O
                })
            }
            if (-1 !== n.indexOf("plate_number")) {
                var j = settingsObjectData[t].plate_number;
                "" != j && o.push({
                    group_name: la.GENERAL,
                    data: la.PLATE,
                    value: j
                })
            }
            if (-1 !== n.indexOf("sim_number")) {
                var T = settingsObjectData[t].sim_number;
                "" != T && o.push({
                    group_name: la.GENERAL,
                    data: la.SIM_CARD_NUMBER,
                    value: T
                })
            }
            if (-1 !== n.indexOf("driver")) {
                var R = getDriver(t, a.params);
                if (0 != R) {
                    var k = '<a href="#" onclick="utilsShowDriverInfo(\'' + R
                        .driver_id + "');\">" + R.name + "</a>";
                    o.push({
                        group_name: la.GENERAL,
                        data: la.DRIVER,
                        value: k
                    })
                }
            }
            if (-1 !== n.indexOf("trailer")) {
                var S = getTrailer(t, a.params);
                if (0 != S) {
                    var w = '<a href="#" onclick="utilsShowTrailerInfo(\'' + S
                        .trailer_id + "');\">" + S.name + "</a>";
                    o.push({
                        group_name: la.GENERAL,
                        data: la.TRAILER,
                        value: w
                    })
                }
            }
            switch (e) {
                case "object":
                    if (-1 !== n.indexOf("address") && 1 == gsValues
                        .address_display_object_data_list) {
                        geocoderGetAddress(c, g, function(e) {
                            document.getElementById(s + "_address")
                                .innerHTML = e, document.getElementById(
                                    s + "_address").title = e,
                                objectsData[t].address = e
                        });
                        var L = '<span id="' + s + '_address">' + objectsData[t]
                            .address + "</span>";
                        o.push({
                            group_name: la.LOCATION,
                            data: la.ADDRESS,
                            value: L
                        })
                    }
                    break;
                case "event":
                    if (-1 !== n.indexOf("address") && 1 == gsValues
                        .address_display_event_data_list) {
                        geocoderGetAddress(c, g, function(e) {
                            document.getElementById(s + "_address")
                                .innerHTML = e, document.getElementById(
                                    s + "_address").title = e,
                                objectsData[t].address = e
                        });
                        L = '<span id="' + s + '_address">' + objectsData[t]
                            .address + "</span>";
                        o.push({
                            group_name: la.LOCATION,
                            data: la.ADDRESS,
                            value: L
                        })
                    }
                    break;
                case "route":
                    if (-1 !== n.indexOf("address") && 1 == gsValues
                        .address_display_history_route_data_list) {
                        geocoderGetAddress(c, g, function(e) {
                            document.getElementById(s + "_address")
                                .innerHTML = e, document.getElementById(
                                    s + "_address").title = e,
                                objectsData[t].address = e
                        });
                        L = '<span id="' + s + '_address">' + objectsData[t]
                            .address + "</span>";
                        o.push({
                            group_name: la.LOCATION,
                            data: la.ADDRESS,
                            value: L
                        })
                    }
            }
            if (-1 !== n.indexOf("position")) {
                var A = urlPosition(c, g);
                o.push({
                    group_name: la.LOCATION,
                    data: la.POSITION,
                    value: A
                })
            }
            if (-1 !== n.indexOf("speed") && o.push({
                    group_name: la.LOCATION,
                    data: la.SPEED,
                    value: m + " " + la.UNIT_SPEED
                }), -1 !== n.indexOf("altitude") && o.push({
                    group_name: la.LOCATION,
                    data: la.ALTITUDE,
                    value: u + " " + la.UNIT_HEIGHT
                }), -1 !== n.indexOf("angle") && o.push({
                    group_name: la.LOCATION,
                    data: la.ANGLE,
                    value: p + " &deg;"
                }), -1 !== n.indexOf("nearest_zone")) {
                var x = getNearestZone(t, c, g);
                "" != x.name && o.push({
                    group_name: la.LOCATION,
                    data: la.NEAREST_ZONE,
                    value: x.name + " (" + x.distance + ")"
                })
            }
            if (-1 !== n.indexOf("nearest_marker")) {
                var N = getNearestMarker(t, c, g);
                "" != N.name && o.push({
                    group_name: la.LOCATION,
                    data: la.NEAREST_MARKER,
                    value: N.name + " (" + N.distance + ")"
                })
            }
            var M = settingsObjectData[t].sensors;
            for (var h in M) {
                var C = M[h];
                if ("true" == C.data_list)
                    if ("fuelsumup" == C.type) {
                        var P = getSensorValueFuelLevelSumUp(t, y, C);
                        o.push({
                            group_name: la.SENSORS,
                            data: C.name,
                            value: P.value_full
                        })
                    } else {
                        P = getSensorValue(y, C);
                        o.push({
                            group_name: la.SENSORS,
                            data: C.name,
                            value: P.value_full
                        })
                    }
            }
            for (l = 0; l < o.length; l++) i.jqGrid("addRowData", l, o[l]);
            i.setGridParam({
                sortname: "data",
                sortorder: "asc"
            }).trigger("reloadGrid");
            for (l = 0; l < gsValues.datalist_groups_colapsed[e].length; l++)
                null != document.getElementById(s + "ghead_0_" + l) && 1 ==
                gsValues.datalist_groups_colapsed[e][l] && i.jqGrid(
                    "groupingToggle", s + "ghead_0_" + l);
            i.closest(".ui-jqgrid-bdiv").scrollTop(d)
        }
    } else datalistBottomShowData(e, t, a)
}
dashboardData.container_height = 0, $(window).bind("resize", function() {
    datalistBottomResize()
}).trigger("resize");
var billingData = new Array,
    timer_billingLoadData;

function billingOpen() {
    utilsCheckPrivileges("subuser") && $("#dialog_billing").dialog("open")
}

function billingClose() {}

function billingLoadData() {
    clearTimeout(timer_billingLoadData), timer_billingLoadData = setTimeout(
            "billingLoadData();", 1e3 * gsValues.billing_refresh),
        billingUpdateCount(), 1 == $("#dialog_billing").dialog("isOpen") &&
        billingReload()
}

function billingReload() {
    $("#billing_plan_list_grid").trigger("reloadGrid")
}

function billingUpdateCount() {
    $.ajax({
        type: "POST",
        url: "func/fn_billing.php",
        data: {
            cmd: "get_billing_plan_total_objects"
        },
        dataType: "json",
        cache: !1,
        success: function(e) {
            null != document.getElementById("billing_plan_count") &&
                (document.getElementById("billing_plan_count")
                    .innerHTML = e.objects)
        }
    })
}

function billingPlanPurchase() {
    if (utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser")) {
        $.ajax({
            type: "POST",
            url: "func/fn_billing.php",
            data: {
                cmd: "load_billing_plan_purchase_list"
            },
            cache: !1,
            success: function(e) {
                "" == e ? notifyBox("error", la.ERROR, la
                    .NO_BILLING_PLANS_FOUND) : (document
                    .getElementById(
                        "billing_plan_purchase_list")
                    .innerHTML = e, $(
                        "#dialog_billing_plan_purchase").dialog(
                        "open"))
            }
        })
    }
}

function billingPlanUse(e) {
    if (utilsCheckPrivileges("subuser")) {
        billingPlanUseObjectLoadList();
        var t = {
            cmd: "load_billing_plan",
            plan_id: e
        };
        $.ajax({
            type: "POST",
            url: "func/fn_billing.php",
            data: t,
            dataType: "json",
            cache: !1,
            success: function(e) {
                if (billingData.plan = e, document.getElementById(
                        "dialog_billing_plan_use_objects")
                    .innerHTML = billingData.plan.objects, 1 ==
                    billingData.plan.period) var t = la[billingData
                    .plan.period_type.slice(0, -1)
                    .toUpperCase()];
                else t = la[billingData.plan.period_type
                    .toUpperCase()];
                var a = billingData.plan.period + " " + t
                    .toLowerCase();
                document.getElementById(
                        "dialog_billing_plan_use_period")
                    .innerHTML = a, document.getElementById(
                        "dialog_billing_plan_use_selected")
                    .innerHTML = 0, $("#dialog_billing_plan_use")
                    .dialog("option", "title", la.BILLING_PLAN +
                        " - " + billingData.plan.name), $(
                        "#dialog_billing_plan_use").dialog("open")
            }
        })
    }
}

function billingPlanUseObjectLoadList() {
    var e = $("#billing_plan_object_list_grid");
    for (var t in e.clearGridData(!0), settingsObjectData) {
        var a = settingsObjectData[t],
            o = a.name.toLowerCase(),
            i = a.name,
            s = a.active,
            n = a.object_expire,
            l = a.object_expire_dt;
        s = "true" == s ? '<img src="theme/images/tick-green.svg" />' :
            '<img src="theme/images/remove-red.svg" style="width:12px;" />',
            "true" == n && e.jqGrid("addRowData", t, {
                name_sort: o,
                name: i,
                imei: t,
                active: s,
                object_expire_dt: l
            })
    }
    e.setGridParam({
        sortname: "name_sort",
        sortorder: "asc"
    }).trigger("reloadGrid")
}

function billingPlanUseUpdateSelection() {
    var e = $("#billing_plan_object_list_grid").jqGrid("getGridParam",
            "selarrrow"),
        t = e.length;
    t > billingData.plan.objects ? (document.getElementById(
            "dialog_billing_plan_use_objects").innerHTML = 0, document
        .getElementById("dialog_billing_plan_use_selected").innerHTML = e
        .length + ' <font color="red">(' + la.TOO_MANY + ")</font>") : (
        document.getElementById("dialog_billing_plan_use_objects")
        .innerHTML = billingData.plan.objects - t, document.getElementById(
            "dialog_billing_plan_use_selected").innerHTML = e.length)
}

function billingPlanUseActivate() {
    if (utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser")) {
        var e = $("#billing_plan_object_list_grid").jqGrid("getGridParam",
            "selarrrow");
        if ("" != e) {
            var t = e.length;
            if (t > billingData.plan.objects) notifyBox("error", la.ERROR, la
                .TOO_MANY_OBJECTS_SELECTED);
            else {
                var a = !1;
                for (i = 0; i < t; i++) {
                    var o = e[i];
                    if ("true" == settingsObjectData[o].active) {
                        a = !0;
                        break
                    }
                }
                var s = la.ARE_YOU_SURE_YOU_WANT_TO_ACTIVATE_SELECTED_OBJECTS;
                a && (s = la.THERE_ARE_STILL_ACTIVE_OBJECTS + " " + s),
                    confirmDialog(s, function(a) {
                        if (a) {
                            var o = JSON.stringify(e),
                                i = {
                                    cmd: "use_billing_plan",
                                    plan: billingData.plan,
                                    imeis: o
                                };
                            $.ajax({
                                type: "POST",
                                url: "func/fn_billing.php",
                                data: i,
                                cache: !1,
                                success: function(e) {
                                    "OK" == e ? (loadSettings(
                                            "objects",
                                            function() {
                                                objectReloadData
                                                    (),
                                                    billingReload(),
                                                    billingPlanUseObjectLoadList(),
                                                    billingUpdateCount(),
                                                    billingData
                                                    .plan
                                                    .objects -=
                                                    t,
                                                    billingPlanUseUpdateSelection()
                                            }), notifyBox(
                                            "info", la
                                            .INFORMATION, la
                                            .OBJECTS_ACTIVATED_SUCCESSFULLY
                                            )) :
                                        "ERROR_VERIFY" == e ?
                                        notifyBox("error", la
                                            .ERROR, la
                                            .PLAN_VERIFICATION_FAILED
                                            ) :
                                        "ERROR_ACTIVATE" == e &&
                                        notifyBox("error", la
                                            .ERROR, la
                                            .OBJECT_ACTIVATION_FAILED
                                            )
                                }
                            })
                        }
                    })
            }
        } else notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function billingPlanDelete(e) {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE, function(t) {
            if (t) {
                var a = {
                    cmd: "delete_billing_plan",
                    plan_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_billing.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && billingReload()
                    }
                })
            }
        })
}
billingData.plan = new Array;
var chatData = new Array,
    timer_chatLoadData, timer_chatMsgsDTHide;
chatData.imei = !1, chatData.first_msg_id = !1, chatData.last_msg_id = !1,
    chatData.msg_count = new Array;
var chatMsgsScrollHandler = function() {
        0 == $(this).scrollTop() && 0 != chatData.first_msg_id && chatLoadMsgs(
            "old"), $("#chat_msgs div").each(function() {
            if ($(this).position().top > 0) {
                var e = $(this).attr("title");
                if (null != e && e.length > 10) return "none" ==
                    document.getElementById("chat_msgs_dt").style
                    .display && (document.getElementById(
                        "chat_msgs_dt").style.display = "block"),
                    clearTimeout(timer_chatMsgsDTHide),
                    timer_chatMsgsDTHide = setTimeout(function() {
                        $("#chat_msgs_dt").fadeOut("slow")
                    }, 3e3), document.getElementById("chat_msgs_dt")
                    .innerHTML = e.substring(0, 10), !1
            }
        })
    },
    timer_imgLoadData;

function chatOpen() {
    utilsCheckPrivileges("chat") && ($("#dialog_chat").bind("resize",
function() {
        scrollToBottom("chat_msgs")
    }), $("#dialog_chat").bind("resize", function() {
        $("#chat_object_list_grid").setGridHeight($("#dialog_chat")
            .height() - 84)
    }).trigger("resize"), $("#dialog_chat").dialog("open"), $(
        "#chat_msgs").scroll(chatMsgsScrollHandler),
    chatLoadObjectList())
}

function chatClose() {
    chatData.imei = !1, chatData.first_msg_id = !1, chatData.last_msg_id = !1,
        document.getElementById("chat_msg").disabled = !0, chatClear(), $(
            "#dialog_chat").unbind("resize"), $("#chat_msgs").off("scroll",
            chatMsgsScrollHandler)
}

function chatClear() {
    document.getElementById("chat_msgs_dt").style.display = "none", document
        .getElementById("chat_msgs_dt").innerHTML = "", document.getElementById(
            "chat_msgs_text").innerHTML = "", document.getElementById(
            "chat_msg_status").innerHTML = "", document.getElementById(
            "chat_msg").value = ""
}

function chatLoadData() {
    clearTimeout(timer_chatLoadData);
    var e = {
        cmd: "load_chat_data",
        imei: chatData.imei,
        last_msg_id: chatData.last_msg_id
    };
    $.ajax({
        type: "POST",
        url: "func/fn_chat.php",
        data: e,
        dataType: "json",
        error: function(e, t) {
            timer_chatLoadData = setTimeout("chatLoadData();", 1e3 *
                gsValues.chat_refresh)
        },
        success: function(e) {
            chatData.msg_count = e.msg_count, chatData.msg_dt = e
                .msg_dt, chatUpdateMsgCount(), chatUpdateMsgDt(),
                0 != e.last_msg_status &&
                chatUpdateMsgDeliveryStatus(e.last_msg_status);
            var t = chatData.imei;
            null != chatData.msg_count[t] && chatLoadMsgs("new"),
                timer_chatLoadData = setTimeout("chatLoadData();",
                    1e3 * gsValues.chat_refresh)
        }
    })
}

function chatReloadData() {
    chatLoadObjectList(), chatLoadData()
}

function chatIsObjectCompatible(e) {
    return null != objectsData[e] && "" != objectsData[e].data && null !=
        objectsData[e].data[0].params && null != objectsData[e].data[0].params
        .chat
}

function chatLoadObjectList() {
    var e = $("#chat_object_list_grid");
    for (var t in e.clearGridData(!0), settingsObjectData) {
        var a = settingsObjectData[t];
        if ("true" == a.active && chatIsObjectCompatible(t)) {
            var o = '<img src="' + a.icon + '" style="width: 26px;"/>',
                i =
                '<div class="object-list-item"><div class="left"><div class="name">' +
                a.name +
                '</div><div class="status" id="chat_object_msg_status_' + t +
                '">' + la.NO_MESSAGES + "</div></div>";
            i += '<div class="right" id="chat_object_msg_count_' + t +
                '"></div></div>', e.jqGrid("addRowData", t, {
                    search: a.name.toLowerCase(),
                    icon: o,
                    name: i
                })
        }
    }
    e.setGridParam({
        sortname: "search",
        sortorder: "asc"
    }).trigger("reloadGrid")
}

function chatUpdateMsgCount() {
    var e = 0;
    if (null != document.getElementById("chat_msg_count")) {
        for (var t in chatData.msg_count) {
            if (chatIsObjectCompatible(t)) e += chatData.msg_count[t]
        }
        if (e > 0 && "0" == document.getElementById("chat_msg_count").innerHTML)
            if ("" != settingsUserData.chat_notify) new Audio("snd/" +
                settingsUserData.chat_notify).play();
        for (var t in document.getElementById("chat_msg_count").innerHTML = e,
                document.title = e > 0 ? gsValues.title + " (" + e + ")" :
                gsValues.title, settingsObjectData) null != document
            .getElementById("chat_object_msg_count_" + t) && (null != chatData
                .msg_count[t] ? document.getElementById(
                    "chat_object_msg_count_" + t).innerHTML =
                '<div class="messages">' + chatData.msg_count[t] + "</div>" :
                document.getElementById("chat_object_msg_count_" + t)
                .innerHTML = "")
    }
}

function chatUpdateMsgDt() {
    for (var e in chatData.msg_dt)
        if (null != document.getElementById("chat_object_msg_count_" + e)) {
            var t = chatData.msg_dt[e];
            document.getElementById("chat_object_msg_status_" + e).innerHTML =
                "" == t ? la.NO_MESSAGES : t
        }
}

function chatDeleteAllMsgs() {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE_ALL_SELECTED_OBJECT_MESSAGES,
        function(e) {
            if (e) {
                var t = {
                    cmd: "delete_all_msgs",
                    imei: chatData.imei
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_chat.php",
                    data: t,
                    success: function(e) {
                        if ("OK" == e) {
                            chatClear();
                            var t = chatData.imei;
                            chatData.msg_dt[t] = "",
                                chatUpdateMsgDt()
                        }
                    }
                })
            }
        })
}

function chatSend() {
    var e = document.getElementById("chat_msg").value;
    if (0 != chatData.imei && "" != e) {
        e = stripHTML(e), e = strLink(e);
        var t = {
            cmd: "send_msg",
            imei: chatData.imei,
            msg: e
        };
        $.ajax({
            type: "POST",
            url: "func/fn_chat.php",
            data: t,
            cache: !1,
            success: function(e) {
                "OK" == e && (document.getElementById("chat_msg")
                    .value = "", chatLoadMsgs("new"))
            },
            error: function(e, t) {}
        })
    }
}

function chatLoadMsgs(e) {
    if ("old" == e) var t = 10;
    else t = 40;
    var a = {
        cmd: "load_msgs",
        type: e,
        imei: chatData.imei,
        msg_limit: t,
        first_msg_id: chatData.first_msg_id,
        last_msg_id: chatData.last_msg_id
    };
    $.ajax({
        type: "POST",
        url: "func/fn_chat.php",
        data: a,
        dataType: "json",
        cache: !1,
        success: function(t) {
            if ("" != t) {
                "old" == e && (document.getElementById("chat_msgs")
                    .scrollTop = 1);
                var a = "";
                for (var o in t) {
                    var i = t[o = parseInt(o)].dt,
                        s = t[o].s,
                        n = t[o].m,
                        l = t[o].st;
                    a += chatFormatMsg(o, i, s, n), (chatData
                        .first_msg_id > o || 0 == chatData
                        .first_msg_id) && (chatData
                        .first_msg_id = o), (chatData
                        .last_msg_id < o || 0 == chatData
                        .last_msg_id) && (chatData.last_msg_id =
                        o)
                }
                if ("old" != e) {
                    document.getElementById("chat_msgs_text")
                        .innerHTML = document.getElementById(
                            "chat_msgs_text").innerHTML + a,
                        scrollToBottom("chat_msgs");
                    var d = chatData.imei;
                    s = t[o = chatData.last_msg_id].s, l = t[o].st;
                    chatUpdateMsgDeliveryStatus("S" == s ? l : 0),
                        delete chatData.msg_count[d],
                        chatUpdateMsgCount();
                    i = t[o].dt;
                    chatData.msg_dt[d] = i, chatUpdateMsgDt()
                } else document.getElementById("chat_msgs_text")
                    .innerHTML = a + document.getElementById(
                        "chat_msgs_text").innerHTML
            }
        },
        error: function(e, t) {}
    })
}

function chatFormatMsg(e, t, a, o) {
    if ("S" == a) var i = "chat-msg-server",
        s = "chat-msg-dt-server";
    else i = "chat-msg-client", s = "chat-msg-dt-client";
    return t.substring(0, 10) == moment().format("YYYY-MM-DD") && (t = t
            .substring(11, 19)),
        '<div class="chat-msg-container"><div title="' + t + '" class="' + i +
        '">' + o + '<div class="' + s + '">' + t + "</div></div></div>"
}

function chatUpdateMsgDeliveryStatus(e) {
    var t = !1;
    0 == e ? document.getElementById("chat_msg_status").innerHTML = "" : 1 ==
        e ? ("" == document.getElementById("chat_msg_status").innerHTML && (
                t = !0), document.getElementById("chat_msg_status").innerHTML =
            la.DELIVERED) : 2 == e && ("" == document.getElementById(
                "chat_msg_status").innerHTML && (t = !0), document
            .getElementById("chat_msg_status").innerHTML = la.SEEN), t &&
        scrollToBottom("chat_msgs")
}

function chatSelectObject(e) {
    chatData.imei != e && (chatClear(), document.getElementById("chat_msg")
        .disabled = !1, chatData.imei = e, chatData.first_msg_id = !1,
        chatData.last_msg_id = !1, chatLoadMsgs("select"))
}

function imgOpen() {
    utilsCheckPrivileges("image_gallery") && ($("#dialog_image_gallery").dialog(
        "open"), imgLoadData())
}

function imgLoadData() {
    clearTimeout(timer_imgLoadData), timer_imgLoadData = setTimeout(
        "imgLoadData();", 1e3 * gsValues.img_refresh), 1 == $(
        "#dialog_image_gallery").dialog("isOpen") ? $(
        "#image_gallery_list_grid").trigger("reloadGrid") : clearTimeout(
        timer_imgLoadData)
}

function imgFilter() {
    var e = "func/fn_img.php?cmd=load_img_list",
        t = document.getElementById("dialog_image_gallery_object_list").value,
        a = document.getElementById("dialog_image_gallery_date_from").value +
        " " + document.getElementById("dialog_image_gallery_hour_from").value +
        ":" + document.getElementById("dialog_image_gallery_minute_from")
        .value + ":00",
        o = document.getElementById("dialog_image_gallery_date_to").value +
        " " + document.getElementById("dialog_image_gallery_hour_to").value +
        ":" + document.getElementById("dialog_image_gallery_minute_to").value +
        ":00";
    "" != t && (e += "&imei=" + t), a != o && (e += "&dtf=" + a + "&dtt=" + o),
        $("#image_gallery_list_grid").jqGrid("setGridParam", {
            url: e
        }).trigger("reloadGrid")
}

function imgDelete(e) {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE, function(t) {
            if (t) {
                var a = {
                    cmd: "delete_img",
                    img_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_img.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && (document.getElementById(
                                "image_gallery_img")
                            .innerHTML = "", document
                            .getElementById(
                                "image_gallery_img_data")
                            .innerHTML = "", $(
                                "#image_gallery_list_grid")
                            .trigger("reloadGrid"))
                    }
                })
            }
        })
}

function imgDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#image_gallery_list_grid").jqGrid("getGridParam",
            "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_imgs",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_img.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && (document
                                .getElementById(
                                    "image_gallery_img")
                                .innerHTML = "", document
                                .getElementById(
                                    "image_gallery_img_data"
                                    ).innerHTML = "", $(
                                    "#image_gallery_list_grid"
                                    ).trigger("reloadGrid"))
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function imgDeleteAll() {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE_ALL_IMAGES, function(
        e) {
            if (e) {
                $.ajax({
                    type: "POST",
                    url: "func/fn_img.php",
                    data: {
                        cmd: "delete_all_imgs"
                    },
                    success: function(e) {
                        "OK" == e && (document.getElementById(
                                "image_gallery_img")
                            .innerHTML = "", document
                            .getElementById(
                                "image_gallery_img_data")
                            .innerHTML = "", $(
                                "#image_gallery_list_grid")
                            .trigger("reloadGrid"))
                    }
                })
            }
        })
}
var cmdData = new Array,
    timer_cmdLoadData;

function cmdOpen() {
    utilsCheckPrivileges("object_control") && ($("#dialog_cmd").dialog("open"),
        cmdStatusLoadData(), cmdGPRSTemplateList(), cmdSMSTemplateList(),
        cmdScheduleTemplateList())
}

function cmdStatusLoadData() {
    clearTimeout(timer_cmdLoadData), timer_cmdLoadData = setTimeout(
        "cmdStatusLoadData();", 1e3 * gsValues.cmd_status_refresh), 1 == $(
        "#dialog_cmd").dialog("isOpen") ? ($("#cmd_gprs_status_list_grid")
        .trigger("reloadGrid"), $("#cmd_sms_status_list_grid").trigger(
            "reloadGrid")) : clearTimeout(timer_cmdLoadData)
}

function cmdGPRSTemplateList() {
    for (var e = document.getElementById("cmd_gprs_template_list"), t = e
            .getElementsByTagName("optgroup"), a = t.length - 1; a >= 0; a--) e
        .removeChild(t[a]);
    e.options.length = 0;
    var o = document.getElementById("cmd_gprs_object_list");
    if (multiselectIsSelected(o)) {
        var i = "",
            s = (o = multiselectGetValues(o)).split(",");
        for (a = 0; a < s.length; a += 1)
            if (null != settingsObjectData[s[0]] && null != settingsObjectData[
                    s[a]] && (i = settingsObjectData[s[0]].protocol) !=
                settingsObjectData[s[a]].protocol) {
                i = "";
                break
            } if ("" != i) {
            for (var n in gsValues.protocol_list)
                if (gsValues.protocol_list[n].name == i && null != gsValues
                    .protocol_list[n].cmd && "" != gsValues.protocol_list[n].cmd
                    ) {
                    var l = gsValues.protocol_list[n].cmd.split(",");
                    if (l.length > 0)(r = $('<optgroup label="' + la.DEFAULT +
                        '" />')).appendTo(e);
                    for (l.sort(), a = 0; a < l.length; a += 1) e.options.add(
                        new Option(la[l[a].toUpperCase()], l[a]));
                    break
                } var d = new Array,
                r = $('<optgroup label="' + la.CUSTOM + '" />');
            for (var n in r.appendTo(e), e.options.add(new Option(la.CUSTOM,
                    "")), cmdData.cmd_templates) {
                var _ = cmdData.cmd_templates[n];
                "gprs" == _.gateway && (_.protocol.toLowerCase() == i
                    .toLowerCase() ? d.push({
                        name: _.name,
                        key: n
                    }) : "" == _.protocol.toLowerCase() && d.push({
                        name: _.name,
                        key: n
                    }))
            }
            for (d = sortArrayByElement(d, "name"), a = 0; a < d.length; a += 1)
                e.options.add(new Option(d[a].name, d[a].key))
        } else {
            (r = $('<optgroup label="' + la.CUSTOM + '" />')).appendTo(e), e
                .options.add(new Option(la.CUSTOM, ""))
        }
        cmdGPRSReset()
    }
}

function cmdGPRSTemplateSwitch() {
    var e = document.getElementById("cmd_gprs_template_list").value,
        t = "",
        a = "";
    for (var o in gsValues.cmd_default) {
        var i = gsValues.cmd_default[o];
        if (e == i.name) {
            t = i.name, null != i.params && (a = i.params);
            break
        }
    }
    "" != t ? (document.getElementById("cmd_gprs_cmd_type").disabled = !0,
        document.getElementById("cmd_gprs_cmd_type").value = "ascii", "" !=
        a && (t = t + "," + a), document.getElementById("cmd_gprs_cmd")
        .value = t) : "" != e ? (document.getElementById(
            "cmd_gprs_cmd_type").disabled = !1, document.getElementById(
            "cmd_gprs_cmd_type").value = cmdData.cmd_templates[e].type,
        document.getElementById("cmd_gprs_cmd").value = cmdData
        .cmd_templates[e].cmd) : (document.getElementById(
        "cmd_gprs_cmd_type").disabled = !1, document.getElementById(
        "cmd_gprs_cmd_type").value = "ascii", document.getElementById(
        "cmd_gprs_cmd").value = ""), $("#cmd_gprs_cmd_type").multipleSelect(
        "refresh")
}

function cmdGPRSSend() {
    var e = document.getElementById("cmd_gprs_object_list"),
        t = $("#cmd_gprs_template_list :selected").text(),
        a = document.getElementById("cmd_gprs_cmd_type").value,
        o = document.getElementById("cmd_gprs_cmd").value;
    multiselectIsSelected(e) ? (e = multiselectGetValues(e), "" != o ? "hex" !=
        a || (o = o.toUpperCase(), isHexValid(o.replace("%IMEI%", ""))) ? e
        .split(",").length > 1 ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_SEND_COMMAND_SELECTED_OBJECTS,
            function(i) {
                i && cmdGPRSExec(e, t, a, o)
            }) : cmdGPRSExec(e, t, a, o) : notifyBox("error", la.ERROR, la
            .COMMAND_HEX_NOT_VALID, !0) : notifyBox("error", la.ERROR, la
            .COMMAND_CANT_BE_EMPTY, !0)) : notifyBox("error", la.ERROR, la
        .AT_LEAST_ONE_OBJECT_SELECTED)
}

function cmdGPRSExec(e, t, a, o) {
    if (utilsCheckPrivileges("viewer")) {
        loadingData(!0);
        var i = {
            cmd: "exec_cmd_gprs",
            imei: e,
            name: t,
            type: a,
            cmd_: o
        };
        $.ajax({
            type: "POST",
            url: "func/fn_cmd.php",
            data: i,
            success: function(e) {
                loadingData(!1), "OK" == e ? (cmdGPRSReset(), $(
                        "#cmd_gprs_status_list_grid").trigger(
                        "reloadGrid"), notifyBox("info", la
                        .INFORMATION, la
                        .COMMAND_SENT_FOR_EXECUTION, !0)) :
                    "ERROR_NOT_SENT" == e && ($(
                        "#cmd_gprs_status_list_grid").trigger(
                        "reloadGrid"), notifyBox("error", la
                        .ERROR, la.UNABLE_TO_SEND_SMS_MESSAGE, !
                        0))
            },
            error: function(e, t) {
                loadingData(!1)
            }
        })
    }
}

function cmdGPRSReset() {
    document.getElementById("cmd_gprs_cmd_type").disabled = !1, document
        .getElementById("cmd_gprs_template_list").value = "", $(
            "#cmd_gprs_template_list").multipleSelect("refresh"), document
        .getElementById("cmd_gprs_cmd_type").value = "ascii", $(
            "#cmd_gprs_cmd_type").multipleSelect("refresh"), document
        .getElementById("cmd_gprs_cmd").value = ""
}

function cmdGPRSExecDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_cmd_exec",
                    cmd_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_cmd.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && $(
                                "#cmd_gprs_status_list_grid")
                            .trigger("reloadGrid")
                    }
                })
            }
        })
}

function cmdGPRSExecDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#cmd_gprs_status_list_grid").jqGrid("getGridParam",
            "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_cmd_execs",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_cmd.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && $(
                                "#cmd_gprs_status_list_grid"
                                ).trigger("reloadGrid")
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function cmdSMSTemplateList() {
    for (var e = document.getElementById("cmd_sms_template_list"), t = e
            .getElementsByTagName("optgroup"), a = t.length - 1; a >= 0; a--) e
        .removeChild(t[a]);
    e.options.length = 0;
    var o = document.getElementById("cmd_sms_object_list");
    if (multiselectIsSelected(o)) {
        var i = "",
            s = (o = multiselectGetValues(o)).split(",");
        for (a = 0; a < s.length; a += 1)
            if (null != settingsObjectData[s[0]] && null != settingsObjectData[
                    s[a]] && (i = settingsObjectData[s[0]].protocol) !=
                settingsObjectData[s[a]].protocol) {
                i = "";
                break
            } if ("" != i) {
            var n = new Array,
                l = $('<optgroup label="' + la.CUSTOM + '" />');
            for (var d in l.appendTo(e), e.options.add(new Option(la.CUSTOM,
                    "")), cmdData.cmd_templates) {
                var r = cmdData.cmd_templates[d];
                "sms" == r.gateway && (r.protocol.toLowerCase() == i
                    .toLowerCase() ? n.push({
                        name: r.name,
                        key: d
                    }) : "" == r.protocol.toLowerCase() && n.push({
                        name: r.name,
                        key: d
                    }))
            }
            for (n = sortArrayByElement(n, "name"), a = 0; a < n.length; a += 1)
                e.options.add(new Option(n[a].name, n[a].key))
        } else {
            (l = $('<optgroup label="' + la.CUSTOM + '" />')).appendTo(e), e
                .options.add(new Option(la.CUSTOM, ""))
        }
        cmdSMSReset()
    }
}

function cmdSMSTemplateSwitch() {
    var e = document.getElementById("cmd_sms_template_list").value;
    document.getElementById("cmd_sms_cmd").value = "" != e ? cmdData
        .cmd_templates[e].cmd : ""
}

function cmdSMSSend() {
    var e = document.getElementById("cmd_sms_object_list"),
        t = $("#cmd_sms_template_list :selected").text(),
        a = document.getElementById("cmd_sms_cmd").value;
    if (multiselectIsSelected(e))
        if (e = multiselectGetValues(e), "" != a) {
            var o = e.split(",");
            for (i = 0; i < o.length; i += 1) {
                if ("" == settingsObjectData[o[i]].sim_number)
                return void notifyBox("error", la.ERROR, la
                        .OBJECT_SIM_CARD_NUMBER_IS_NOT_SET, !0)
            }
            o.length > 1 ? confirmDialog(la
                .ARE_YOU_SURE_YOU_WANT_TO_SEND_COMMAND_SELECTED_OBJECTS,
                function(o) {
                    o && cmdSMSExec(e, t, a)
                }) : cmdSMSExec(e, t, a)
        } else notifyBox("error", la.ERROR, la.COMMAND_CANT_BE_EMPTY, !0);
    else notifyBox("error", la.ERROR, la.AT_LEAST_ONE_OBJECT_SELECTED)
}

function cmdSMSExec(e, t, a) {
    if (utilsCheckPrivileges("viewer")) {
        loadingData(!0);
        var o = {
            cmd: "exec_cmd_sms",
            imei: e,
            name: t,
            cmd_: a
        };
        $.ajax({
            type: "POST",
            url: "func/fn_cmd.php",
            data: o,
            success: function(e) {
                loadingData(!1), "OK" == e ? (cmdSMSReset(), $(
                        "#cmd_sms_status_list_grid").trigger(
                        "reloadGrid"), notifyBox("info", la
                        .INFORMATION, la
                        .COMMAND_SENT_FOR_EXECUTION, !0)) :
                    "ERROR_NOT_SENT" == e && ($(
                        "#cmd_sms_status_list_grid").trigger(
                        "reloadGrid"), notifyBox("error", la
                        .ERROR, la.UNABLE_TO_SEND_SMS_MESSAGE, !
                        0))
            },
            error: function(e, t) {
                loadingData(!1)
            }
        })
    }
}

function cmdSMSReset() {
    document.getElementById("cmd_sms_template_list").value = "", $(
            "#cmd_sms_template_list").multipleSelect("refresh"), document
        .getElementById("cmd_sms_cmd").value = ""
}

function cmdSMSExecDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_cmd_exec",
                    cmd_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_cmd.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && $(
                                "#cmd_sms_status_list_grid")
                            .trigger("reloadGrid")
                    }
                })
            }
        })
}

function cmdSMSExecDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#cmd_sms_status_list_grid").jqGrid("getGridParam",
            "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_cmd_execs",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_cmd.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && $(
                                    "#cmd_sms_status_list_grid")
                                .trigger("reloadGrid")
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function cmdScheduleProtocolList() {
    var e = document.getElementById("dialog_cmd_schedule_protocol").value,
        t = document.getElementById("dialog_cmd_schedule_protocol");
    t.options.length = 0;
    for (var a = getAllProtocolsArray(), o = 0; o < a.length; o++) "" != a[o] &&
        t.options.add(new Option(a[o], a[o]));
    sortSelectList(t), t.options.add(new Option(la.ALL_PROTOCOLS, ""), 0),
        document.getElementById("dialog_cmd_schedule_protocol").value = e, $(
            "#dialog_cmd_schedule_protocol").multipleSelect("refresh")
}

function cmdScheduleObjectList() {
    var e = document.getElementById("dialog_cmd_schedule_protocol").value,
        t = document.getElementById("dialog_cmd_schedule_object_list");
    multiselectClear(t);
    var a = getGroupsObjectsArray(e);
    multiselectSetGroups(t, a)
}

function cmdScheduleTemplateList() {
    var e = document.getElementById("dialog_cmd_schedule_protocol").value,
        t = document.getElementById("dialog_cmd_schedule_template_list");
    for (var a in t.options.length = 0, cmdData.cmd_templates) {
        var o = cmdData.cmd_templates[a];
        "" == e ? t.options.add(new Option(o.name, a)) : o.protocol
        .toLowerCase() == e.toLowerCase() && t.options.add(new Option(o
            .name, a))
    }
    sortSelectList(t), t.options.add(new Option(la.CUSTOM, ""), 0), document
        .getElementById("dialog_cmd_schedule_template_list").value = "", $(
            "#dialog_cmd_schedule_template_list").multipleSelect("refresh"),
        document.getElementById("dialog_cmd_schedule_cmd_gateway").value =
        "gprs", $("#dialog_cmd_schedule_cmd_gateway").multipleSelect("refresh"),
        document.getElementById("dialog_cmd_schedule_cmd_type").value = "ascii",
        $("#dialog_cmd_schedule_cmd_type").multipleSelect("refresh"), document
        .getElementById("dialog_cmd_schedule_cmd_cmd").value = ""
}

function cmdScheduleExactTimeSwitch() {
    1 == document.getElementById("dialog_cmd_schedule_exact_time").checked ? (
        document.getElementById("dialog_cmd_schedule_exact_time_date")
        .disabled = !1, document.getElementById(
            "dialog_cmd_schedule_exact_time_time").disabled = !1, document
        .getElementById("dialog_cmd_schedule_daily_mon").disabled = !0,
        document.getElementById("dialog_cmd_schedule_daily_mon_time")
        .disabled = !0, document.getElementById(
            "dialog_cmd_schedule_daily_tue").disabled = !0, document
        .getElementById("dialog_cmd_schedule_daily_tue_time").disabled = !0,
        document.getElementById("dialog_cmd_schedule_daily_wed")
        .disabled = !0, document.getElementById(
            "dialog_cmd_schedule_daily_wed_time").disabled = !0, document
        .getElementById("dialog_cmd_schedule_daily_thu").disabled = !0,
        document.getElementById("dialog_cmd_schedule_daily_thu_time")
        .disabled = !0, document.getElementById(
            "dialog_cmd_schedule_daily_fri").disabled = !0, document
        .getElementById("dialog_cmd_schedule_daily_fri_time").disabled = !0,
        document.getElementById("dialog_cmd_schedule_daily_sat")
        .disabled = !0, document.getElementById(
            "dialog_cmd_schedule_daily_sat_time").disabled = !0, document
        .getElementById("dialog_cmd_schedule_daily_sun").disabled = !0,
        document.getElementById("dialog_cmd_schedule_daily_sun_time")
        .disabled = !0) : (document.getElementById(
            "dialog_cmd_schedule_exact_time_date").disabled = !0, document
        .getElementById("dialog_cmd_schedule_exact_time_time").disabled = !
        0, document.getElementById("dialog_cmd_schedule_daily_mon")
        .disabled = !1, document.getElementById(
            "dialog_cmd_schedule_daily_mon_time").disabled = !1, document
        .getElementById("dialog_cmd_schedule_daily_tue").disabled = !1,
        document.getElementById("dialog_cmd_schedule_daily_tue_time")
        .disabled = !1, document.getElementById(
            "dialog_cmd_schedule_daily_wed").disabled = !1, document
        .getElementById("dialog_cmd_schedule_daily_wed_time").disabled = !1,
        document.getElementById("dialog_cmd_schedule_daily_thu")
        .disabled = !1, document.getElementById(
            "dialog_cmd_schedule_daily_thu_time").disabled = !1, document
        .getElementById("dialog_cmd_schedule_daily_fri").disabled = !1,
        document.getElementById("dialog_cmd_schedule_daily_fri_time")
        .disabled = !1, document.getElementById(
            "dialog_cmd_schedule_daily_sat").disabled = !1, document
        .getElementById("dialog_cmd_schedule_daily_sat_time").disabled = !1,
        document.getElementById("dialog_cmd_schedule_daily_sun")
        .disabled = !1, document.getElementById(
            "dialog_cmd_schedule_daily_sun_time").disabled = !1)
}

function cmdScheduleProtocolSwitch() {
    cmdScheduleObjectList(), cmdScheduleTemplateList()
}

function cmdScheduleTemplateSwitch() {
    var e = document.getElementById("dialog_cmd_schedule_template_list").value;
    "" != e ? (document.getElementById("dialog_cmd_schedule_cmd_gateway")
            .value = cmdData.cmd_templates[e].gateway, document.getElementById(
                "dialog_cmd_schedule_cmd_type").value = cmdData.cmd_templates[e]
            .type, document.getElementById("dialog_cmd_schedule_cmd_cmd")
            .value = cmdData.cmd_templates[e].cmd) : (document.getElementById(
                "dialog_cmd_schedule_cmd_gateway").value = "gprs", document
            .getElementById("dialog_cmd_schedule_cmd_type").value = "ascii",
            document.getElementById("dialog_cmd_schedule_cmd_cmd").value = ""),
        $("#dialog_cmd_schedule_cmd_gateway").multipleSelect("refresh"), $(
            "#dialog_cmd_schedule_cmd_type").multipleSelect("refresh")
}

function cmdScheduleResetDailyTime() {
    document.getElementById("dialog_cmd_schedule_daily_mon").checked = !1,
        document.getElementById("dialog_cmd_schedule_daily_mon_time").value =
        "00:00", $("#dialog_cmd_schedule_daily_mon_time").multipleSelect(
            "refresh"), document.getElementById("dialog_cmd_schedule_daily_tue")
        .checked = !1, document.getElementById(
            "dialog_cmd_schedule_daily_tue_time").value = "00:00", $(
            "#dialog_cmd_schedule_daily_tue_time").multipleSelect("refresh"),
        document.getElementById("dialog_cmd_schedule_daily_wed").checked = !1,
        document.getElementById("dialog_cmd_schedule_daily_wed_time").value =
        "00:00", $("#dialog_cmd_schedule_daily_wed_time").multipleSelect(
            "refresh"), document.getElementById("dialog_cmd_schedule_daily_thu")
        .checked = !1, document.getElementById(
            "dialog_cmd_schedule_daily_thu_time").value = "00:00", $(
            "#dialog_cmd_schedule_daily_thu_time").multipleSelect("refresh"),
        document.getElementById("dialog_cmd_schedule_daily_fri").checked = !1,
        document.getElementById("dialog_cmd_schedule_daily_fri_time").value =
        "00:00", $("#dialog_cmd_schedule_daily_fri_time").multipleSelect(
            "refresh"), document.getElementById("dialog_cmd_schedule_daily_sat")
        .checked = !1, document.getElementById(
            "dialog_cmd_schedule_daily_sat_time").value = "00:00", $(
            "#dialog_cmd_schedule_daily_sat_time").multipleSelect("refresh"),
        document.getElementById("dialog_cmd_schedule_daily_sun").checked = !1,
        document.getElementById("dialog_cmd_schedule_daily_sun_time").value =
        "00:00", $("#dialog_cmd_schedule_daily_sun_time").multipleSelect(
            "refresh")
}

function cmdScheduleProperties(e) {
    switch (e) {
        default:
            var t = e;
            cmdData.edit_cmd_schedule_id = t;
            var a = {
                cmd: "load_cmd_schedule",
                cmd_id: cmdData.edit_cmd_schedule_id
            };
            $.ajax({
                type: "POST",
                url: "func/fn_cmd.php",
                data: a,
                dataType: "json",
                cache: !1,
                success: function(e) {
                    document.getElementById(
                            "dialog_cmd_schedule_active").checked =
                        strToBoolean(e.active), document
                        .getElementById("dialog_cmd_schedule_name")
                        .value = e.name;
                    var t = strToBoolean(e.exact_time);
                    document.getElementById(
                            "dialog_cmd_schedule_exact_time")
                        .checked = t, cmdScheduleExactTimeSwitch(),
                        1 == t ? (document.getElementById(
                            "dialog_cmd_schedule_exact_time_date"
                            ).value = e.exact_time_dt.substring(
                            0, 10), document.getElementById(
                            "dialog_cmd_schedule_exact_time_time"
                            ).value = e.exact_time_dt.substring(
                            11, 16)) : (document.getElementById(
                                "dialog_cmd_schedule_exact_time_date"
                                ).value = "", document
                            .getElementById(
                                "dialog_cmd_schedule_exact_time_time"
                                ).value = "00:00"), $(
                            "#dialog_cmd_schedule_exact_time_time")
                        .multipleSelect("refresh");
                    var a = e.day_time;
                    null != a ? (document.getElementById(
                                "dialog_cmd_schedule_daily_mon")
                            .checked = a.mon, document
                            .getElementById(
                                "dialog_cmd_schedule_daily_mon_time"
                                ).value = a.mon_time, $(
                                "#dialog_cmd_schedule_daily_mon_time"
                                ).multipleSelect("refresh"),
                            document.getElementById(
                                "dialog_cmd_schedule_daily_tue")
                            .checked = a.tue, document
                            .getElementById(
                                "dialog_cmd_schedule_daily_tue_time"
                                ).value = a.tue_time, $(
                                "#dialog_cmd_schedule_daily_tue_time"
                                ).multipleSelect("refresh"),
                            document.getElementById(
                                "dialog_cmd_schedule_daily_wed")
                            .checked = a.wed, document
                            .getElementById(
                                "dialog_cmd_schedule_daily_wed_time"
                                ).value = a.wed_time, $(
                                "#dialog_cmd_schedule_daily_wed_time"
                                ).multipleSelect("refresh"),
                            document.getElementById(
                                "dialog_cmd_schedule_daily_thu")
                            .checked = a.thu, document
                            .getElementById(
                                "dialog_cmd_schedule_daily_thu_time"
                                ).value = a.thu_time, $(
                                "#dialog_cmd_schedule_daily_thu_time"
                                ).multipleSelect("refresh"),
                            document.getElementById(
                                "dialog_cmd_schedule_daily_fri")
                            .checked = a.fri, document
                            .getElementById(
                                "dialog_cmd_schedule_daily_fri_time"
                                ).value = a.fri_time, $(
                                "#dialog_cmd_schedule_daily_fri_time"
                                ).multipleSelect("refresh"),
                            document.getElementById(
                                "dialog_cmd_schedule_daily_sat")
                            .checked = a.sat, document
                            .getElementById(
                                "dialog_cmd_schedule_daily_sat_time"
                                ).value = a.sat_time, $(
                                "#dialog_cmd_schedule_daily_sat_time"
                                ).multipleSelect("refresh"),
                            document.getElementById(
                                "dialog_cmd_schedule_daily_sun")
                            .checked = a.sun, document
                            .getElementById(
                                "dialog_cmd_schedule_daily_sun_time"
                                ).value = a.sun_time, $(
                                "#dialog_cmd_schedule_daily_sun_time"
                                ).multipleSelect("refresh")) :
                        cmdScheduleResetDailyTime(),
                        cmdScheduleProtocolList(), document
                        .getElementById(
                            "dialog_cmd_schedule_protocol").value =
                        e.protocol, $(
                            "#dialog_cmd_schedule_protocol")
                        .multipleSelect("refresh"),
                        cmdScheduleProtocolSwitch();
                    var o = document.getElementById(
                            "dialog_cmd_schedule_object_list"),
                        i = e.imei.split(",");
                    multiselectSetValues(o, i), $(
                            "#dialog_cmd_schedule_object_list")
                        .multipleSelect("refresh"), document
                        .getElementById(
                            "dialog_cmd_schedule_template_list")
                        .value = "", $(
                            "#dialog_cmd_schedule_template_list")
                        .multipleSelect("refresh"), document
                        .getElementById(
                            "dialog_cmd_schedule_cmd_gateway")
                        .value = e.gateway, $(
                            "#dialog_cmd_schedule_cmd_gateway")
                        .multipleSelect("refresh"), document
                        .getElementById(
                            "dialog_cmd_schedule_cmd_type").value =
                        e.type, $("#dialog_cmd_schedule_cmd_type")
                        .multipleSelect("refresh"), document
                        .getElementById(
                            "dialog_cmd_schedule_cmd_cmd").value = e
                        .cmd
                }
            }), $("#dialog_cmd_schedule_properties").dialog("open");
            break;
        case "add":
            cmdData.edit_cmd_schedule_id = !1, document.getElementById(
                    "dialog_cmd_schedule_active").checked = !0, document
                .getElementById("dialog_cmd_schedule_name").value = "", document
                .getElementById("dialog_cmd_schedule_exact_time").checked = !1,
                cmdScheduleExactTimeSwitch(), document.getElementById(
                    "dialog_cmd_schedule_exact_time_date").value = "", document
                .getElementById("dialog_cmd_schedule_exact_time_time").value =
                "00:00", $("#dialog_cmd_schedule_exact_time_time")
                .multipleSelect("refresh"), cmdScheduleResetDailyTime(),
                cmdScheduleProtocolList(), document.getElementById(
                    "dialog_cmd_schedule_protocol").value = "", $(
                    "#dialog_cmd_schedule_protocol").multipleSelect("refresh"),
                cmdScheduleProtocolSwitch(), document.getElementById(
                    "dialog_cmd_schedule_template_list").value = "", $(
                    "#dialog_cmd_schedule_template_list").multipleSelect(
                    "refresh"), document.getElementById(
                    "dialog_cmd_schedule_cmd_gateway").value = "gprs", $(
                    "#dialog_cmd_schedule_cmd_gateway").multipleSelect(
                    "refresh"), document.getElementById(
                    "dialog_cmd_schedule_cmd_type").value = "ascii", $(
                    "#dialog_cmd_schedule_cmd_type").multipleSelect("refresh"),
                document.getElementById("dialog_cmd_schedule_cmd_cmd").value =
                "", $("#dialog_cmd_schedule_properties").dialog("open");
            break;
        case "cancel":
            $("#dialog_cmd_schedule_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var o = document.getElementById("dialog_cmd_schedule_name").value;
            if ("" == o) return void notifyBox("error", la.ERROR, la
                .NAME_CANT_BE_EMPTY, !0);
            var i = document.getElementById("dialog_cmd_schedule_active")
                .checked,
                s = document.getElementById("dialog_cmd_schedule_exact_time")
                .checked,
                n = document.getElementById(
                    "dialog_cmd_schedule_exact_time_date").value,
                l = document.getElementById(
                    "dialog_cmd_schedule_exact_time_time").value;
            if (1 == s) {
                if ("" == n) return void notifyBox("error", la.ERROR, la
                    .DATE_CANT_BE_EMPTY, !0);
                var d = n + " " + l + ":00"
            } else d = "";
            var r = {
                mon: document.getElementById(
                    "dialog_cmd_schedule_daily_mon").checked,
                mon_time: document.getElementById(
                    "dialog_cmd_schedule_daily_mon_time").value,
                tue: document.getElementById(
                    "dialog_cmd_schedule_daily_tue").checked,
                tue_time: document.getElementById(
                    "dialog_cmd_schedule_daily_tue_time").value,
                wed: document.getElementById(
                    "dialog_cmd_schedule_daily_wed").checked,
                wed_time: document.getElementById(
                    "dialog_cmd_schedule_daily_wed_time").value,
                thu: document.getElementById(
                    "dialog_cmd_schedule_daily_thu").checked,
                thu_time: document.getElementById(
                    "dialog_cmd_schedule_daily_thu_time").value,
                fri: document.getElementById(
                    "dialog_cmd_schedule_daily_fri").checked,
                fri_time: document.getElementById(
                    "dialog_cmd_schedule_daily_fri_time").value,
                sat: document.getElementById(
                    "dialog_cmd_schedule_daily_sat").checked,
                sat_time: document.getElementById(
                    "dialog_cmd_schedule_daily_sat_time").value,
                sun: document.getElementById(
                    "dialog_cmd_schedule_daily_sun").checked,
                sun_time: document.getElementById(
                    "dialog_cmd_schedule_daily_sun_time").value
            };
            r = JSON.stringify(r);
            var _ = document.getElementById("dialog_cmd_schedule_protocol")
                .value,
                c = document.getElementById("dialog_cmd_schedule_object_list");
            if (!multiselectIsSelected(c)) return void notifyBox("error", la
                .ERROR, la.AT_LEAST_ONE_OBJECT_SELECTED);
            c = multiselectGetValues(c);
            var g = document.getElementById("dialog_cmd_schedule_cmd_gateway")
                .value,
                m = document.getElementById("dialog_cmd_schedule_cmd_type")
                .value,
                u = document.getElementById("dialog_cmd_schedule_cmd_cmd")
                .value;
            if ("" == u) return void notifyBox("error", la.ERROR, la
                .COMMAND_CANT_BE_EMPTY, !0);
            if ("hex" == m && (u = u.toUpperCase(), !isHexValid(u.replace(
                    "%IMEI%", "")))) return void notifyBox("error", la.ERROR, la
                .COMMAND_HEX_NOT_VALID, !0);
            a = {
                cmd: "save_cmd_schedule",
                cmd_id: cmdData.edit_cmd_schedule_id,
                name: o,
                active: i,
                exact_time: s,
                exact_time_dt: d,
                day_time: r,
                protocol: _,
                imei: c,
                gateway: g,
                type: m,
                cmd_: u
            };
            $.ajax({
                type: "POST",
                url: "func/fn_cmd.php",
                data: a,
                cache: !1,
                success: function(e) {
                    "OK" == e && ($("#cmd_schedule_list_grid")
                        .trigger("reloadGrid"), $(
                            "#dialog_cmd_schedule_properties")
                        .dialog("close"), notifyBox("info", la
                            .INFORMATION, la
                            .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}

function cmdScheduleDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_cmd_schedule",
                    cmd_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_cmd.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && $(
                                "#cmd_schedule_list_grid")
                            .trigger("reloadGrid")
                    }
                })
            }
        })
}

function cmdScheduleDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#cmd_schedule_list_grid").jqGrid("getGridParam",
        "selarrrow");
        "" != e ? confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE, function(
        t) {
            if (t) {
                var a = {
                    cmd: "delete_selected_cmd_schedules",
                    items: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_cmd.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && $(
                                "#cmd_schedule_list_grid")
                            .trigger("reloadGrid")
                    }
                })
            }
        }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function cmdTemplateReload() {
    cmdTemplateLoadData(), $("#cmd_template_list_grid").trigger("reloadGrid")
}

function cmdTemplateLoadData() {
    $.ajax({
        type: "POST",
        url: "func/fn_cmd.php",
        data: {
            cmd: "load_cmd_template_data"
        },
        dataType: "json",
        cache: !1,
        success: function(e) {
            cmdData.cmd_templates = e, cmdGPRSTemplateList(),
                cmdSMSTemplateList(), cmdScheduleTemplateList(),
                settingsEventCmdTemplateList()
        }
    })
}

function cmdTemplateImport() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", cmdTemplateImportCTEFile, !1), document
        .getElementById("load_file").click())
}

function cmdTemplateExport() {
    if (utilsCheckPrivileges("viewer")) {
        window.location = "func/fn_export.php?format=cte"
    }
}

function cmdTemplateImportCTEFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        try {
            var t = $.parseJSON(e.target.result);
            if ("0.1v" == t.cte) {
                var a = t.templates.length;
                if (0 == a) return void notifyBox("info", la.INFORMATION, la
                    .NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
                confirmDialog(sprintf(la.TEMPLATES_FOUND, a) + " " + la
                    .ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
                    function(t) {
                        if (t) {
                            loadingData(!0);
                            var a = {
                                format: "cte",
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
                                        cmdTemplateReload()
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
        cmdTemplateImportCTEFile, !1)
}

function cmdTemplateProtocolList() {
    var e = document.getElementById("dialog_cmd_template_protocol").value,
        t = document.getElementById("dialog_cmd_template_hide_unsed_protocols")
        .checked,
        a = document.getElementById("dialog_cmd_template_protocol");
    if (a.options.length = 0, 1 == t)
        for (var o = getAllProtocolsArray(), i = 0; i < o.length; i++) "" != o[
            i] && a.options.add(new Option(o[i], o[i]));
    else
        for (var s in gsValues.protocol_list) {
            var n = gsValues.protocol_list[s];
            a.options.add(new Option(n.name, n.name))
        }
    sortSelectList(a), a.options.add(new Option(la.ALL_PROTOCOLS, ""), 0),
        document.getElementById("dialog_cmd_template_protocol").value = e, $(
            "#dialog_cmd_template_protocol").multipleSelect("refresh")
}

function cmdTemplateProperties(e) {
    switch (e) {
        default:
            var t = e;
            cmdData.edit_cmd_template_id = t, document.getElementById(
                    "dialog_cmd_template_hide_unsed_protocols").checked = !1,
                cmdTemplateProtocolList(), document.getElementById(
                    "dialog_cmd_template_name").value = cmdData.cmd_templates[t]
                .name, document.getElementById("dialog_cmd_template_protocol")
                .value = cmdData.cmd_templates[t].protocol, $(
                    "#dialog_cmd_template_protocol").multipleSelect("refresh"),
                document.getElementById("dialog_cmd_template_gateway").value =
                cmdData.cmd_templates[t].gateway, $(
                    "#dialog_cmd_template_gateway").multipleSelect("refresh"),
                document.getElementById("dialog_cmd_template_type").value =
                cmdData.cmd_templates[t].type, $("#dialog_cmd_template_type")
                .multipleSelect("refresh"), document.getElementById(
                    "dialog_cmd_template_cmd").value = cmdData.cmd_templates[t]
                .cmd, $("#dialog_cmd_template_properties").dialog("open");
            break;
        case "add":
            cmdData.edit_cmd_template_id = !1, document.getElementById(
                    "dialog_cmd_template_hide_unsed_protocols").checked = !1,
                cmdTemplateProtocolList(), document.getElementById(
                    "dialog_cmd_template_name").value = "", document
                .getElementById("dialog_cmd_template_protocol").value = "", $(
                    "#dialog_cmd_template_protocol").multipleSelect("refresh"),
                document.getElementById("dialog_cmd_template_gateway").value =
                "gprs", $("#dialog_cmd_template_gateway").multipleSelect(
                    "refresh"), document.getElementById(
                    "dialog_cmd_template_type").value = "ascii", $(
                    "#dialog_cmd_template_type").multipleSelect("refresh"),
                document.getElementById("dialog_cmd_template_cmd").value = "",
                $("#dialog_cmd_template_properties").dialog("open");
            break;
        case "cancel":
            $("#dialog_cmd_template_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var a = document.getElementById("dialog_cmd_template_name").value,
                o = document.getElementById("dialog_cmd_template_protocol")
                .value,
                i = document.getElementById("dialog_cmd_template_gateway")
                .value,
                s = document.getElementById("dialog_cmd_template_type").value,
                n = document.getElementById("dialog_cmd_template_cmd").value;
            if ("" == a) return void notifyBox("error", la.ERROR, la
                .NAME_CANT_BE_EMPTY, !0);
            if ("" == n) return void notifyBox("error", la.ERROR, la
                .COMMAND_CANT_BE_EMPTY, !0);
            if ("hex" == s && (n = n.toUpperCase(), !isHexValid(n.replace(
                    "%IMEI%", "")))) return void notifyBox("error", la.ERROR, la
                .COMMAND_HEX_NOT_VALID, !0);
            var l = {
                cmd: "save_cmd_template",
                cmd_id: cmdData.edit_cmd_template_id,
                name: a,
                protocol: o,
                gateway: i,
                type: s,
                cmd_: n
            };
            $.ajax({
                type: "POST",
                url: "func/fn_cmd.php",
                data: l,
                cache: !1,
                success: function(e) {
                    "OK" == e && (cmdTemplateReload(), $(
                            "#dialog_cmd_template_properties")
                        .dialog("close"), notifyBox("info", la
                            .INFORMATION, la
                            .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}

function cmdTemplateDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_cmd_template",
                    cmd_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_cmd.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && cmdTemplateReload()
                    }
                })
            }
        })
}

function cmdTemplateDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#cmd_template_list_grid").jqGrid("getGridParam",
        "selarrrow");
        "" != e ? confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE, function(
        t) {
            if (t) {
                var a = {
                    cmd: "delete_selected_cmd_templates",
                    items: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_cmd.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && cmdTemplateReload()
                    }
                })
            }
        }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}
cmdData.cmd_templates = new Array, cmdData.edit_cmd_schedule_id = !1, cmdData
    .edit_cmd_template_id = !1;
var eventsData = new Array,
    timer_eventsLoadData;

function eventsReloadData() {
    eventsCheckForNew()
}

function eventsLoadData() {
    clearTimeout(timer_eventsLoadData), timer_eventsLoadData = setTimeout(
            "eventsLoadData();", 1e3 * gsValues.event_refresh),
        eventsCheckForNew()
}

function eventsCheckForNew() {
    var e = {
        cmd: "load_last_event",
        last_id: eventsData.last_id
    };
    $.ajax({
        type: "POST",
        url: "func/fn_events.php",
        data: e,
        dataType: "json",
        success: function(e) {
            if (0 != e) {
                eventsData.push_notification = !1;
                for (var t = 0; t < e.length; t++) {
                    if (eventsData.last_id < e[t].event_id && 1 ==
                        eventsData.events_loaded && null !=
                        settingsObjectData[e[t].imei] && "true" ==
                        settingsObjectData[e[t].imei].active) {
                        var a = !1,
                            o = !1;
                        "true" == e[t].notify_arrow && (a = e[t]
                                .notify_arrow_color), "true" == e[t]
                            .notify_ohc && (o = e[t]
                                .notify_ohc_color),
                            objectSetStatusEvent(e[t].imei, a, o);
                        var i = e[t].notify_system.split(",");
                        if ("true" == i[0]) {
                            "true" == settingsUserData
                                .push_notify_desktop && "true" == e[
                                    t].notify_push && (eventsData
                                    .push_notification = !0);
                            var s = e[t].lat,
                                n = e[t].lng,
                                l = urlPosition(s, n),
                                d = '<div class="row">';
                            d += '<div class="row2"><div class="width40"><strong>' +
                                la.OBJECT +
                                ':</strong></div><div class="width60">' +
                                e[t].name + "</div></div>", d +=
                                '<div class="row2"><div class="width40"><strong>' +
                                la.EVENT +
                                ':</strong></div><div class="width60">' +
                                e[t].event_desc + "</div></div>",
                                d +=
                                '<div class="row2"><div class="width40"><strong>' +
                                la.POSITION +
                                ':</strong></div><div class="width60">' +
                                l + "</div></div>", d +=
                                '<div class="row2"><div class="width40"><strong>' +
                                la.TIME +
                                ':</strong></div><div class="width60">' +
                                e[t].dt_tracker + "</div></div>",
                                d += "</div>", d +=
                                '<div class="row">', d +=
                                '<center><a href="#" onclick="eventsShowEvent(' +
                                e[t].event_id +
                                ');">Show event</a></center>', d +=
                                "</div>";
                            var r = !1;
                            if ("true" == i[1] && (r = !0),
                                notifyBox("error", la.NEW_EVENT, d,
                                    r), "true" == i[2]) null == i[
                                3] && (i[3] = "alarm1.mp3"),
                                new Audio("snd/" + i[3]).play()
                        }
                    }
                    t == e.length - 1 && (eventsData.last_id = e[t]
                        .event_id, $(
                            "#side_panel_events_event_list_grid"
                            ).trigger("reloadGrid"))
                }
                1 == eventsData.push_notification && Push.create(la
                    .NEW_EVENT, {
                        body: la.NEW_EVENT_WAS_RECEIVED,
                        timeout: 5e3,
                        onClick: function() {
                            window.focus(), this.close()
                        }
                    }), 1 == $("#dialog_dashboard").dialog(
                    "isOpen") && dashboardInitEvents()
            }
            eventsData.events_loaded = !0
        }
    })
}

function eventsExport() {
    window.location = "func/fn_export.php?format=events_csv"
}

function eventsDeleteAll() {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE_ALL_EVENTS, function(
        e) {
            if (e) {
                $.ajax({
                    type: "POST",
                    url: "func/fn_events.php",
                    data: {
                        cmd: "delete_all_events"
                    },
                    success: function(e) {
                        "OK" == e && (datalistClear("event"), $(
                            "#side_panel_events_event_list_grid"
                            ).trigger("reloadGrid"))
                    }
                })
            }
        })
}

function eventsShowEvent(e) {
    var t = {
        cmd: "load_event_data",
        event_id: e
    };
    $.ajax({
        type: "POST",
        url: "func/fn_events.php",
        data: t,
        dataType: "json",
        cache: !1,
        success: function(e) {
            datalistShowData("event", e.imei, e);
            var t = e.lat,
                a = e.lng,
                o = e.angle;
            geocoderGetAddress(t, a, function(i) {
                var s = e.imei,
                    n = i,
                    l = urlPosition(t, a),
                    d = e.params,
                    r = "",
                    _ = new Array;
                for (var c in settingsObjectData[s].sensors)
                    _.push(settingsObjectData[s].sensors[
                    c]);
                var g = sortArrayByElement(_, "name");
                for (var c in g) {
                    var m = g[c];
                    if ("true" == m.popup)
                        if ("fuelsumup" == m.type) {
                            var u =
                                getSensorValueFuelLevelSumUp(
                                    s, d, m);
                            r += "<tr><td><strong>" + m
                                .name +
                                ":</strong></td><td>" + u
                                .value_full + "</td></tr>"
                        } else {
                            u = getSensorValue(d, m);
                            r += "<tr><td><strong>" + m
                                .name +
                                ":</strong></td><td>" + u
                                .value_full + "</td></tr>"
                        }
                }
                var p =
                    "<table>\t\t\t\t\t<tr><td><strong>" + la
                    .OBJECT + ":</strong></td><td>" + e
                    .name +
                    "</td></tr>\t\t\t\t\t<tr><td><strong>" +
                    la.EVENT + ":</strong></td><td>" + e
                    .event_desc +
                    "</td></tr>\t\t\t\t\t<tr><td><strong>" +
                    la.ADDRESS + ":</strong></td><td>" + n +
                    "</td></tr>\t\t\t\t\t<tr><td><strong>" +
                    la.POSITION + ":</strong></td><td>" +
                    l +
                    "</td></tr>\t\t\t\t\t<tr><td><strong>" +
                    la.ALTITUDE + ":</strong></td><td>" + e
                    .altitude + " " + la.UNIT_HEIGHT +
                    "</td></tr>\t\t\t\t\t<tr><td><strong>" +
                    la.ANGLE + ":</strong></td><td>" + e
                    .angle +
                    " &deg;</td></tr>\t\t\t\t\t<tr><td><strong>" +
                    la.SPEED + ":</strong></td><td>" + e
                    .speed + " " + la.UNIT_SPEED +
                    "</td></tr>\t\t\t\t\t<tr><td><strong>" +
                    la.TIME + ":</strong></td><td>" + e
                    .dt_tracker + "</td></tr>",
                    y = getObjectOdometer(s, d); - 1 != y &&
                    (p += "<tr><td><strong>" + la.ODOMETER +
                        ":</strong></td><td>" + y + " " + la
                        .UNIT_DISTANCE + "</td></tr>");
                var v = getObjectEngineHours(s, d); - 1 !=
                    v && (p += "<tr><td><strong>" + la
                        .ENGINE_HOURS +
                        ":</strong></td><td>" + v +
                        "</td></tr>");
                var b = p + r;
                addPopupToMap(t, a, [0, 0], p += "</table>",
                    b += "</table>"), map.panTo({
                    lat: t,
                    lng: a
                }), 1 == gsValues.map_street_view && (
                    objectUnSelectAll(),
                    utilsStreetView(t, a, o))
            })
        }
    })
}

function initMap() {
    map = L.map("map", {
            minZoom: gsValues.map_min_zoom,
            maxZoom: gsValues.map_max_zoom,
            editable: !0,
            zoomControl: !1
        }), initSelectList("map_layer_list"), defineMapLayers(), mapLayers
        .utils = L.layerGroup(), mapLayers.utils.addTo(map), mapLayers
        .realtime = createCluster("objects"), mapLayers.realtime.addTo(map),
        mapLayers.history = L.layerGroup(), mapLayers.history.addTo(map),
        mapLayers.places_markers = createCluster("markers"), mapLayers
        .places_markers.addTo(map), mapLayers.places_zones = L.layerGroup(),
        mapLayers.places_zones.addTo(map), mapLayers.places_routes = L
        .layerGroup(), mapLayers.places_routes.addTo(map), map.addControl(L
            .control.zoom({
                zoomInText: "",
                zoomOutText: "",
                zoomInTitle: la.ZOOM_IN,
                zoomOutTitle: la.ZOOM_OUT
            })), L.MapViewControls = mapViewControls(), map.addControl(new L
            .MapViewControls), L.MapViewControls = mapToolControls(), map
        .addControl(new L.MapViewControls), map.setView([gsValues.map_lat,
            gsValues.map_lng
        ], gsValues.map_zoom), switchMapLayer(gsValues.map_layer), gsValues
        .map_objects || document.getElementById("map_control_objects").click(),
        gsValues.map_object_labels || (iconObjectLabels.className =
            "icon-text disabled"), gsValues.map_markers || document
        .getElementById("map_control_markers").click(), gsValues.map_routes ||
        document.getElementById("map_control_routes").click(), gsValues
        .map_zones || document.getElementById("map_control_zones").click(), map
        .on("zoomend", function() {
            historyRouteDataPoints()
        });
    var e = settingsUserData.map_is,
        t = 28 * e,
        a = 28 * e,
        o = 14 * e,
        i = 14 * e;
    t = 28 * e, a = 28 * e, o = 14 * e, i = 14 * e;
    mapMarkerIcons.arrow_black = L.icon({
            iconUrl: "img/markers/arrow-black.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), mapMarkerIcons.arrow_blue = L.icon({
            iconUrl: "img/markers/arrow-blue.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), mapMarkerIcons.arrow_green = L.icon({
            iconUrl: "img/markers/arrow-green.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), mapMarkerIcons.arrow_grey = L.icon({
            iconUrl: "img/markers/arrow-grey.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), mapMarkerIcons.arrow_orange = L.icon({
            iconUrl: "img/markers/arrow-orange.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), mapMarkerIcons.arrow_purple = L.icon({
            iconUrl: "img/markers/arrow-purple.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), mapMarkerIcons.arrow_red = L.icon({
            iconUrl: "img/markers/arrow-red.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), mapMarkerIcons.arrow_yellow = L.icon({
            iconUrl: "img/markers/arrow-yellow.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), t = 28 * e, a = 28 * e, o = 14 * e, i = 28 * e, mapMarkerIcons
        .route_start = L.icon({
            iconUrl: "img/markers/route-start.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), mapMarkerIcons.route_end = L.icon({
            iconUrl: "img/markers/route-end.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), mapMarkerIcons.route_stop = L.icon({
            iconUrl: "img/markers/route-stop.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), mapMarkerIcons.route_event = L.icon({
            iconUrl: "img/markers/route-event.svg",
            iconSize: [t, a],
            iconAnchor: [o, i],
            popupAnchor: [0, 0]
        }), mapMarkerIcons.route_data_point = L.icon({
            iconUrl: "img/markers/route-data-point.svg",
            iconSize: [8, 8],
            iconAnchor: [4, 4],
            popupAnchor: [0, 0]
        })
}

function initGui() {
    $("#map_action_menu").menu({
            role: "listbox",
            select: function(e, t) {
                var a = menuOnItem,
                    o = t.item.children().attr("tag");
                "street_view_new" == o && utilsStreetViewPoint(a.lat, a
                        .lng, !0), "show_point" == o && utilsPointOnMap(
                        a.lat, a.lng), "route_to_point" == o &&
                    utilsRouteToPoint(a), "route_between_points" == o &&
                    utilsRouteBetweenPoints(a), "add_task" == o &&
                    tasksNew(a), "add_marker" == o && (document
                        .getElementById("side_panel_places_tab")
                    .click(), document.getElementById(
                            "side_panel_places_markers_tab").click(),
                        placesMarkerNew(a)), "add_route" == o && (
                        document.getElementById("side_panel_places_tab")
                        .click(), document.getElementById(
                            "side_panel_places_routes_tab").click(),
                        placesRouteNew(a)), "add_zone" == o && (document
                        .getElementById("side_panel_places_tab")
                    .click(), document.getElementById(
                            "side_panel_places_zones_tab").click(),
                        placesZoneNew(a))
            }
        }), $("#map_action_menu").hide(), $("#side_panel_objects_action_menu")
        .menu({
            role: "listbox",
            select: function(e, t) {
                var a = menuOnItem,
                    o = t.item.children().attr("tag");
                "edit" == o && utilsCheckPrivileges("subuser") &&
                    utilsCheckPrivileges("obj_edit") && loadSettings(
                        "objects",
                        function() {
                            settingsObjectEdit(a)
                        }), "cmd" == o && (document.getElementById(
                        "cmd_gprs_object_list").value = a, $(
                        "#cmd_gprs_object_list").multipleSelect(
                        "refresh"), cmdOpen()), "follow" == o &&
                    utilsFollowObject(a, !1), "follow_new" == o &&
                    utilsFollowObject(a, !0), "street_view" == o &&
                    utilsStreetViewObject(a, !1), "street_view_new" ==
                    o && utilsStreetViewObject(a, !0), "sh" == o
                    .substring(0, 2) && (document.getElementById(
                            "side_panel_history_object_list").value = a,
                        $("#side_panel_history_object_list")
                        .multipleSelect("refresh"), "shlh" == o && (
                            document.getElementById(
                                "side_panel_history_filter").value = 1),
                        "sht" == o && (document.getElementById(
                            "side_panel_history_filter").value = 2),
                        "shy" == o && (document.getElementById(
                            "side_panel_history_filter").value = 3),
                        "shb2" == o && (document.getElementById(
                            "side_panel_history_filter").value = 4),
                        "shb3" == o && (document.getElementById(
                            "side_panel_history_filter").value = 5),
                        "shtw" == o && (document.getElementById(
                            "side_panel_history_filter").value = 6),
                        "shlw" == o && (document.getElementById(
                            "side_panel_history_filter").value = 7),
                        "shtm" == o && (document.getElementById(
                            "side_panel_history_filter").value = 8),
                        "shlm" == o && (document.getElementById(
                            "side_panel_history_filter").value = 9), $(
                            "#side_panel_history_filter")
                        .multipleSelect("refresh"), switchDateFilter(
                            "history"), historyLoadRoute())
            }
        }), $("#side_panel_objects_action_menu").hide(), $(
            "#side_panel_history_import_export_action_menu").menu({
            role: "listbox"
        }), $("#side_panel_history_import_export_action_menu").hide(), $(
            "#side_panel_history_import_export_action_menu_button").click(
            function() {
                return $("#side_panel_history_import_export_action_menu")
                    .toggle().position({
                        my: "left top",
                        at: "left bottom+2",
                        of: this
                    }), $(document).one("click", function() {
                        $("#side_panel_history_import_export_action_menu")
                            .hide()
                    }), !1
            }), $("#report_action_menu").menu({
            role: "listbox",
            select: function(e, t) {
                var a = menuOnItem,
                    o = t.item.children().attr("tag");
                if ("grlh" == o) {
                    var i = moment().format("YYYY-MM-DD"),
                        s = moment().format("YYYY-MM-DD");
                    i += " " + moment().subtract("hour", 1).format(
                        "HH") + ":" + moment().subtract("hour", 1)
                        .format("mm") + ":00", s += " " + moment()
                        .format("HH") + ":" + moment().format("mm") +
                        ":00"
                }
                if ("grt" == o) i = moment().format("YYYY-MM-DD") +
                    " 00:00:00", s = moment().add("days", 1).format(
                        "YYYY-MM-DD") + " 00:00:00";
                if ("gry" == o) i = moment().subtract("days", 1).format(
                        "YYYY-MM-DD") + " 00:00:00", s = moment()
                    .format("YYYY-MM-DD") + " 00:00:00";
                if ("grb2" == o) i = moment().subtract("days", 2)
                    .format("YYYY-MM-DD") + " 00:00:00", s = moment()
                    .subtract("days", 1).format("YYYY-MM-DD") +
                    " 00:00:00";
                if ("grb3" == o) i = moment().subtract("days", 3)
                    .format("YYYY-MM-DD") + " 00:00:00", s = moment()
                    .subtract("days", 2).format("YYYY-MM-DD") +
                    " 00:00:00";
                if ("grtw" == o) i = moment().isoWeekday(1).format(
                    "YYYY-MM-DD") + " 00:00:00", s = moment().add(
                    "days", 1).format("YYYY-MM-DD") + " 00:00:00";
                if ("grlw" == o) i = moment().isoWeekday(1).subtract(
                        "week", 1).format("YYYY-MM-DD") + " 00:00:00",
                    s = moment().isoWeekday(1).format("YYYY-MM-DD") +
                    " 00:00:00";
                if ("grtm" == o) i = moment().startOf("month").format(
                    "YYYY-MM-DD") + " 00:00:00", s = moment().add(
                    "days", 1).format("YYYY-MM-DD") + " 00:00:00";
                if ("grlm" == o) i = moment().startOf("month").subtract(
                        "month", 1).format("YYYY-MM-DD") + " 00:00:00",
                    s = moment().startOf("month").format("YYYY-MM-DD") +
                    " 00:00:00";
                "gr" == o.substring(0, 2) && reportGenerate({
                    cmd: "report",
                    name: reportsData.reports[a].name,
                    type: reportsData.reports[a].type,
                    format: reportsData.reports[a].format,
                    show_coordinates: reportsData.reports[a].show_coordinates,
                    show_addresses: reportsData.reports[a].show_addresses,
                    zones_addresses: reportsData.reports[a].zones_addresses,
                    stop_duration: reportsData.reports[a].stop_duration,
                    speed_limit: reportsData.reports[a].speed_limit,
                    optimal_consumption: reportsData.reports[a].optimal_consumption,
                    imei: reportsData.reports[a].imei,
                    zone_ids: reportsData.reports[a].zone_ids,
                    sensor_names: reportsData.reports[a].sensor_names,
                    data_items: reportsData.reports[a].data_items,
                    other: JSON.stringify(reportsData.reports[a].other),
                    ignore_empty_reports : reportsData.reports[a].ignore_empty_reports,
                    drivers : reportsData.reports[a].drivers,
                    dtf: i,
                    dtt: s
                })
            }
        }), $("#report_action_menu").hide(), $.datepicker
        ._updateDatepicker_original = $.datepicker._updateDatepicker, $
        .datepicker._updateDatepicker = function(e) {
            $.datepicker._updateDatepicker_original(e);
            var t = this._get(e, "afterShow");
            t && t.apply(e.input ? e.input[0] : null)
        }, $(".inputbox-calendar").datepicker({
            afterShow: function() {
                $(".ui-datepicker select").multipleSelect({
                    single: !0
                })
            },
            changeMonth: !0,
            changeYear: !0,
            dateFormat: "yy-mm-dd",
            firstDay: 1,
            dayNamesMin: [la.DAY_SUNDAY_S, la.DAY_MONDAY_S, la
                .DAY_TUESDAY_S, la.DAY_WEDNESDAY_S, la.DAY_THURSDAY_S,
                la.DAY_FRIDAY_S, la.DAY_SATURDAY_S
            ],
            monthNames: [la.MONTH_JANUARY, la.MONTH_FEBRUARY, la
                .MONTH_MARCH, la.MONTH_APRIL, la.MONTH_MAY, la
                .MONTH_JUNE, la.MONTH_JULY, la.MONTH_AUGUST, la
                .MONTH_SEPTEMBER, la.MONTH_OCTOBER, la.MONTH_NOVEMBER,
                la.MONTH_DECEMBER
            ],
            monthNamesShort: [la.MONTH_JANUARY_S, la.MONTH_FEBRUARY_S, la
                .MONTH_MARCH_S, la.MONTH_APRIL_S, la.MONTH_MAY_S, la
                .MONTH_JUNE_S, la.MONTH_JULY_S, la.MONTH_AUGUST_S, la
                .MONTH_SEPTEMBER_S, la.MONTH_OCTOBER_S, la
                .MONTH_NOVEMBER_S, la.MONTH_DECEMBER_S
            ]
        }), $(".inputbox-calendar-mmdd").datepicker({
            afterShow: function() {
                $(".ui-datepicker select").multipleSelect({
                    single: !0
                })
            },
            changeMonth: !0,
            changeYear: !0,
            dateFormat: "mm-dd",
            firstDay: 1,
            dayNamesMin: [la.DAY_SUNDAY_S, la.DAY_MONDAY_S, la
                .DAY_TUESDAY_S, la.DAY_WEDNESDAY_S, la.DAY_THURSDAY_S,
                la.DAY_FRIDAY_S, la.DAY_SATURDAY_S
            ],
            monthNames: [la.MONTH_JANUARY, la.MONTH_FEBRUARY, la
                .MONTH_MARCH, la.MONTH_APRIL, la.MONTH_MAY, la
                .MONTH_JUNE, la.MONTH_JULY, la.MONTH_AUGUST, la
                .MONTH_SEPTEMBER, la.MONTH_OCTOBER, la.MONTH_NOVEMBER,
                la.MONTH_DECEMBER
            ],
            monthNamesShort: [la.MONTH_JANUARY_S, la.MONTH_FEBRUARY_S, la
                .MONTH_MARCH_S, la.MONTH_APRIL_S, la.MONTH_MAY_S, la
                .MONTH_JUNE_S, la.MONTH_JULY_S, la.MONTH_AUGUST_S, la
                .MONTH_SEPTEMBER_S, la.MONTH_OCTOBER_S, la
                .MONTH_NOVEMBER_S, la.MONTH_DECEMBER_S
            ]
        }), $(
            "#side_panel,\t  #side_panel_places,\t  #bottom_panel_tabs,\t  #settings_main,\t  #settings_main_objects_groups_drivers,\t  #settings_object,\t  #settings_object_edit_select_icon_tabs,\t  #settings_event,\t  #reports_tabs,\t  #cmd_tabs,\t  #places_marker_icon_tabs"
            ).tabs({}), $("#dialog_notify").dialog({
            autoOpen: !1,
            width: "auto",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1,
            draggable: !1,
            dialogClass: "dialog-notify-titlebar"
        }), $("#dialog_confirm").dialog({
            autoOpen: !1,
            width: "auto",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1,
            draggable: !1,
            dialogClass: "dialog-notify-titlebar"
        }), $("#dialog_about").dialog({
            autoOpen: !1,
            width: "480",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_show_point").dialog({
            autoOpen: !1,
            width: "250",
            height: "auto",
            minHeight: "auto",
            position: {
                my: "left top",
                at: "left+412 top+47"
            },
            resizable: !1
        }), $("#dialog_address_search").dialog({
            autoOpen: !1,
            width: "250",
            height: "auto",
            minHeight: "auto",
            position: {
                my: "left top",
                at: "left+412 top+47"
            },
            resizable: !1
        }), $("#dialog_cmd").dialog({
            autoOpen: !1,
            width: "880",
            height: "auto",
            minHeight: "auto",
            resizable: !1
        }), $("#dialog_cmd_schedule_properties").dialog({
            autoOpen: !1,
            width: "750",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_cmd_template_properties").dialog({
            autoOpen: !1,
            width: "450",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_image_gallery").dialog({
            autoOpen: !1,
            width: "992",
            height: "auto",
            minHeight: "auto",
            resizable: !1
        }), $("#dialog_chat").dialog({
            autoOpen: !1,
            width: "992",
            height: "520",
            minWidth: 500,
            minHeight: 300,
            resizable: !0,
            close: function(e, t) {
                chatClose()
            }
        }), $("#dialog_dashboard").dialog({
            autoOpen: !1,
            width: "auto",
            height: "auto",
            modal: !0,
            resizable: !1,
            draggable: !1,
            open: function(e, t) {
                dashboardResize()
            }
        }), $("#dialog_reports").dialog({
            autoOpen: !1,
            width: "992",
            height: "auto",
            minHeight: "auto",
            resizable: !1
        }), $("#dialog_report_properties").dialog({
            autoOpen: !1,
            width: "850",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_tasks").dialog({
            autoOpen: !1,
            width: "992",
            height: "520",
            minWidth: 992,
            minHeight: 350,
            resizable: !0,
            close: function(e, t) {
                tasksClose()
            }
        }), $("#dialog_task_properties").dialog({
            autoOpen: !1,
            width: "950",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_rilogbook").dialog({
            autoOpen: !1,
            width: "992",
            height: "520",
            minWidth: 992,
            minHeight: 350,
            resizable: !0,
            close: function(e, t) {
                rilogbookClose()
            }
        }), $("#dialog_dtc").dialog({
            autoOpen: !1,
            width: "992",
            height: "520",
            minWidth: 992,
            minHeight: 350,
            resizable: !0,
            close: function(e, t) {
                dtcClose()
            }
        }), $("#dialog_maintenance").dialog({
            autoOpen: !1,
            width: "992",
            height: "520",
            minWidth: 992,
            minHeight: 350,
            resizable: !0,
            close: function(e, t) {
                maintenanceClose()
            }
        }), $("#dialog_maintenance_service_properties").dialog({
            autoOpen: !1,
            width: "720",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings").dialog({
            autoOpen: !1,
            width: "800",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1,
            close: function(e, t) {
                settingsClose()
            }
        }), $("#dialog_settings_object_add").dialog({
            autoOpen: !1,
            width: "300",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_object_edit").dialog({
            autoOpen: !1,
            width: "720",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_object_duplicate").dialog({
            autoOpen: !1,
            width: "300",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_object_edit_select_icon").dialog({
            autoOpen: !1,
            width: "412",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_object_group_properties").dialog({
            autoOpen: !1,
            width: "350",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_object_driver_properties").dialog({
            autoOpen: !1,
            width: "500",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_object_passenger_properties").dialog({
            autoOpen: !1,
            width: "400",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_object_trailer_properties").dialog({
            autoOpen: !1,
            width: "400",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_object_sensor_properties").dialog({
            autoOpen: !1,
            width: "900",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_object_service_properties").dialog({
            autoOpen: !1,
            width: "720",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_object_custom_field_properties").dialog({
            autoOpen: !1,
            width: "350",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_event_properties").dialog({
            autoOpen: !1,
            width: "720",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1,
            open: function(e, t) {
                $("#settings_event").tabs("option", "active", 0)
            }
        }), $("#dialog_settings_template_properties").dialog({
            autoOpen: !1,
            width: "800",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_settings_subaccount_properties").dialog({
            autoOpen: !1,
            width: "750",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_places_groups").dialog({
            autoOpen: !1,
            width: "750",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1,
            close: function(e, t) {
                placesGroupClose()
            }
        }), $("#dialog_places_group_properties").dialog({
            autoOpen: !1,
            width: "350",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1
        }), $("#dialog_places_marker_properties").dialog({
            autoOpen: !1,
            width: "324",
            height: "auto",
            minHeight: "auto",
            resizable: !1,
            draggable: !1,
            position: {
                my: "left top",
                at: "left+10 top+112"
            },
            closeOnEscape: !1,
            open: function(e, t) {
                $(this).parent().children().children(
                    ".ui-dialog-titlebar-close").remove()
            }
        }), $("#dialog_places_zone_properties").dialog({
            autoOpen: !1,
            width: "265",
            height: "auto",
            minHeight: "auto",
            resizable: !1,
            draggable: !1,
            position: {
                my: "left top",
                at: "left+10 top+112"
            },
            closeOnEscape: !1,
            open: function(e, t) {
                $(this).parent().children().children(
                    ".ui-dialog-titlebar-close").remove()
            }
        }), $("#dialog_places_route_properties").dialog({
            autoOpen: !1,
            width: "265",
            height: "auto",
            minHeight: "auto",
            resizable: !1,
            draggable: !1,
            position: {
                my: "left top",
                at: "left+10 top+112"
            },
            closeOnEscape: !1,
            open: function(e, t) {
                $(this).parent().children().children(
                    ".ui-dialog-titlebar-close").remove()
            }
        }), $("#dialog_billing").dialog({
            autoOpen: !1,
            width: "750",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1,
            dialogClass: "dialog-billing-titlebar",
            close: function(e, t) {
                billingClose()
            }
        }), $("#dialog_billing_plan_use").dialog({
            autoOpen: !1,
            width: "695",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1,
            dialogClass: "dialog-billing-titlebar"
        }), $("#dialog_billing_plan_purchase").dialog({
            autoOpen: !1,
            width: "695",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1,
            dialogClass: "dialog-billing-titlebar"
        }), $("#side_panel_objects_dragbar").mousedown(function(e) {
            e.preventDefault(), $(document).mousemove(
                guiDragbarObjectsHandler)
        }), $("#side_panel_events_dragbar").mousedown(function(e) {
            e.preventDefault(), $(document).mousemove(
                guiDragbarEventsHandler)
        }), $("#side_panel_history_dragbar").mousedown(function(e) {
            e.preventDefault(), $(document).mousemove(
                guiDragbarHistoryHandler)
        }), $("#bottom_panel_dragbar").mousedown(function(e) {
            e.preventDefault(), $(document).mousemove(
                guiDragbarBottomPanelHandler)
        }), $(document).mouseup(function(e) {
            map.invalidateSize(!0), $("#map").css("pointer-events", ""), $(
                    document).unbind("mousemove", guiDragbarObjectsHandler),
                $(document).unbind("mousemove", guiDragbarEventsHandler), $(
                    document).unbind("mousemove", guiDragbarHistoryHandler),
                $(document).unbind("mousemove",
                    guiDragbarBottomPanelHandler)
        }), map.on("contextmenu", function(e) {
            menuOnItem = e.latlng, $("#map_action_menu").toggle().position({
                my: "left top",
                at: "left+" + e.containerPoint.x + " top+" + e
                    .containerPoint.y,
                collision: "fit",
                of: $("#map")
            }), $(document).one("click", function() {
                $("#map_action_menu").hide()
            })
        }), $(".select").multipleSelect({
            single: !0
        }), $(".select-search").multipleSelect({
            width: "100%",
            single: !0,
            filter: !0
        }), $(".select-multiple").multipleSelect({
            width: "100%",
            selectAllText: la.SELECT_ALL,
            allSelected: la.ALL_SELECTED,
            countSelected: "# " + la.SELECTED.toLowerCase(),
            noMatchesFound: la.NO_MATCHES_FOUND,
            noItems: la.NO_ITEMS,
            placeholder: la.NOTHING_SELECTED
        }), $(".select-multiple-search").multipleSelect({
            width: "100%",
            filter: !0,
            selectAllText: la.SELECT_ALL,
            allSelected: la.ALL_SELECTED,
            countSelected: "# " + la.SELECTED.toLowerCase(),
            noMatchesFound: la.NO_MATCHES_FOUND,
            noItems: la.NO_ITEMS,
            placeholder: la.NOTHING_SELECTED
        }), document.getElementById("side_panel_history_filter").value = 2, $(
            "#side_panel_history_filter").multipleSelect("refresh"), document
        .getElementById("dialog_report_filter").value = 2, $(
            "#dialog_report_filter").multipleSelect("refresh"),
        switchDateFilter("history"), switchDateFilter("report"),
        switchDateFilter("tasks"), switchDateFilter("rilogbook"),
        switchDateFilter("dtc"), switchDateFilter("img")
}
eventsData.last_id = -1, eventsData.push_notification = !1, eventsData
    .events_loaded = !1;
var guiDragbarObjectsHandler = function(e) {
        $("#map").css("pointer-events", "none"), resizeGridObjects(e.pageY)
    },
    guiDragbarEventsHandler = function(e) {
        $("#map").css("pointer-events", "none"), resizeGridEvents(e.pageY)
    },
    guiDragbarHistoryHandler = function(e) {
        $("#map").css("pointer-events", "none"), resizeGridHistory(e.pageY)
    },
    guiDragbarBottomPanelHandler = function(e) {
        "block" == document.getElementById("bottom_panel").style.display && ($(
            "#map").css("pointer-events", "none"), resizeBottomPanel(e
            .pageY))
    };

function addPopupToMap(e, t, a, o, i) {
    if ("" != i && o != i) {
        if (1 == gsValues.map_popup_detailed) var s = 'style="display:none;"',
            n = "";
        else s = "", n = 'style="display:none;"';
        o = '<div id="popup_short" ' + s + ">" + o, o +=
            '<div style="width:100%; text-align: right;"><a href="#" class="" onClick="switchPopupDetailed(true);">' +
            la.DETAILED + "</a></div>", o += "</div>", o +=
            '<div id="popup_detailed" ' + n + ">" + i, o +=
            '<div style="width:100%; text-align: right;"><a href="#" class="" onClick="switchPopupDetailed(false);">' +
            la.SHORT + "</a></div>", o += "</div>"
    }
    mapPopup = L.popup({
        offset: a
    }).setLatLng([e, t]).setContent(o).openOn(map)
}

function switchPopupDetailed(e) {
    switch (e) {
        case !1:
            document.getElementById("popup_short").style.display = "", document
                .getElementById("popup_detailed").style.display = "none",
                gsValues.map_popup_detailed = !1;
            break;
        case !0:
            document.getElementById("popup_short").style.display = "none",
                document.getElementById("popup_detailed").style.display = "",
                gsValues.map_popup_detailed = !0
    }
}

function destroyMapPopup() {
    map.closePopup()
}

function loadingData(e) {
    document.getElementById("loading_data_panel").style.display = 1 == e ? "" :
        "none"
}

function notifyBox(e, t, a, o) {
    $.pnotify({
        title: t,
        text: a,
        type: e,
        opacity: .8,
        closer_hover: !1,
        sticker_hover: !1,
        hide: o
    })
}

function notifyDialog(e) {
    document.getElementById("dialog_notify_text").innerHTML = e, $(
        "#dialog_notify").dialog("open")
}
$(window).resize(function() {
    $("#dialog_dashboard").hasClass("ui-dialog-content") && 1 == $(
        "#dialog_dashboard").dialog("isOpen") && dashboardResize()
}), $.pnotify.defaults.history = !1, $.pnotify.defaults.styling = "jqueryui";
var confirmResponseValue = !1;

function confirmDialog(e, t) {
    confirmResponseValue = !1, document.getElementById("dialog_confirm_text")
        .innerHTML = e, $("#dialog_confirm").dialog("destroy"), $(
            "#dialog_confirm").dialog({
            autoOpen: !1,
            width: "auto",
            height: "auto",
            minHeight: "auto",
            modal: !0,
            resizable: !1,
            draggable: !1,
            dialogClass: "dialog-notify-titlebar",
            close: function(e, a) {
                t(confirmResponseValue)
            }
        }), $("#dialog_confirm").dialog("open")
}

function confirmResponse(e) {
    confirmResponseValue = e, $("#dialog_confirm").dialog("close")
}

function loadObjectMapMarkerIcons() {
    var e = new Array;
    for (var t in settingsObjectData) {
        var a = settingsObjectData[t];
        e.push(a.icon)
    }
    for (e = uniqueArray(e), i = 0; i < e.length; i++) {
        var o = e[i],
            s = e[i],
            n = settingsUserData.map_is;
        mapMarkerIcons[o] = L.icon({
            iconUrl: s,
            iconSize: [28 * n, 28 * n],
            iconAnchor: [14 * n, 14 * n],
            popupAnchor: [0, 0]
        })
    }
}

function addPointerOverMarker(e) {
    e.events.register("mouseover", e, function(e) {
        document.getElementById("map").style.cursor = "pointer",
            OpenLayers.Event.stop(e)
    }), e.events.register("mouseout", e, function(e) {
        document.getElementById("map").style.cursor = "auto", OpenLayers
            .Event.stop(e)
    })
}

function rotateMarker(e, t, a) {
    $("#" + e.markers[t].icon.imageDiv.id).css("-moz-transform", "rotate(" + a +
        "deg)"), $("#" + e.markers[t].icon.imageDiv.id).css(
        "-webkit-transform", "rotate(" + a + "deg)"), $("#" + e.markers[t]
        .icon.imageDiv.id).css("-o-transform", "rotate(" + a + "deg)")
}

function createCluster(e) {
    var t = settingsUserData.map_is;
    if ("objects" == e) var a = "img/markers/clusters/objects.svg",
        o = "marker-cluster";
    else {
        if ("markers" != e) return !1;
        a = "img/markers/clusters/markers.svg", o = "marker-cluster"
    }
    if (1 == gsValues.map_clusters) var s = gsValues.map_max_zoom + 1;
    else s = gsValues.map_min_zoom;
    var n = new L.MarkerClusterGroup({
        spiderfyDistanceMultiplier: 2 * t,
        spiderfyOnMaxZoom: !0,
        showCoverageOnHover: !1,
        maxClusterRadius: 60,
        disableClusteringAtZoom: s,
        iconCreateFunction: function(e) {
            var i = e.getChildCount(),
                s = " cluster-";
            return s += i < 10 ? "small" : i < 100 ? "medium" :
                "large", L.divIcon({
                    html: '<div><img src="' + a + '"><span>' +
                        i + "</span></div>",
                    className: o + s,
                    iconSize: L.point(40 * t, 40 * t),
                    iconAnchor: [14 * t, 14 * t],
                    popupAnchor: [40 * t, 0 * t]
                })
        }
    });
    return "objects" == e && "true" == settingsUserData.map_ocp && n.on(
        "clustermouseover",
        function(e) {
            var t = settingsUserData.map_is,
                a = e.layer.getAllChildMarkers(),
                o = "",
                s = !1;
            for (i = 0; i < a.length; i++) {
                var n = a[i].imei,
                    l = settingsObjectData[n].name;
                if ("" != objectsData[n].data) {
                    var d = objectsData[n].data[0].speed,
                        r = getSensorFromType(n, "acc");
                    if (0 == r || 0 == objectsData[n].connection) var _ =
                    "";
                    else if (1 == getSensorValue(objectsData[n].data[0]
                            .params, r[0]).value) _ = getEngineIcon(1);
                    else _ = getEngineIcon(0)
                } else d = 0, _ = "";
                var c = getConnectionIcon(objectsData[n].connection);
                o += '<tr><td style="white-space: nowrap;"><strong>' + l +
                    '</strong></td><td></td><td style="white-space: nowrap;">' +
                    d + " " + la.UNIT_SPEED + "</td><td>" + _ +
                    "</td><td>" + c + "</td></tr>", i > 9 && (s = !0)
            }
            o = "<table>" + o + "</table>", s && (o =
                    '<div class="object-cluster-popup">' + o + "</div>"),
                addPopupToMap(e.latlng.lat, e.latlng.lng, [0, -14 * t], o,
                    "")
        }), n
}

function mapViewControls() {
    return L.Control.extend({
        options: {
            position: "topleft"
        },
        onAdd: function(e) {
            var t = L.DomUtil.create("div",
                "leaflet-control leaflet-bar");
            linkObjects = L.DomUtil.create("a", "", t), linkObjects
                .id = "map_control_objects", linkObjects.href = "#",
                linkObjects.title = la.ENABLE_DISABLE_OBJECTS,
                linkObjects.className = "", iconObjects = L.DomUtil
                .create("span", "", linkObjects), iconObjects
                .className = "icon-objects";
            var a = L.DomEvent.stopPropagation;
            L.DomEvent.on(linkObjects, "dblclick", a), L.DomEvent
                .on(linkObjects, "mousedown", a), L.DomEvent.on(
                    linkObjects, "click",
                    function(t) {
                        1 == e.hasLayer(mapLayers.realtime) ? (e
                            .removeLayer(mapLayers.realtime),
                            iconObjects.className =
                            "icon-objects disabled", gsValues
                            .map_objects = !1) : (e.addLayer(
                                mapLayers.realtime), iconObjects
                            .className = "icon-objects",
                            gsValues.map_objects = !0)
                    }), linkObjectLabels = L.DomUtil.create("a", "",
                    t), linkObjectLabels.id =
                "map_control_object_labels", linkObjectLabels.href =
                "#", linkObjectLabels.title = la
                .ENABLE_DISABLE_OBJECT_LABELS, linkObjectLabels
                .className = "", iconObjectLabels = L.DomUtil
                .create("span", "", linkObjectLabels),
                iconObjectLabels.className = "icon-text";
            a = L.DomEvent.stopPropagation;
            L.DomEvent.on(linkObjectLabels, "dblclick", a), L
                .DomEvent.on(linkObjectLabels, "mousedown", a), L
                .DomEvent.on(linkObjectLabels, "click", function(
                e) {
                    if (1 == gsValues.map_object_labels) {
                        for (var t in objectsData) objectsData[
                            t].layers.marker.closeTooltip();
                        iconObjectLabels.className =
                            "icon-text disabled", gsValues
                            .map_object_labels = !1
                    } else {
                        for (var t in objectsData) objectsData[
                            t].layers.marker.openTooltip();
                        iconObjectLabels.className =
                            "icon-text", gsValues
                            .map_object_labels = !0
                    }
                }), linkMarkers = L.DomUtil.create("a", "", t),
                linkMarkers.id = "map_control_markers", linkMarkers
                .href = "#", linkMarkers.title = la
                .ENABLE_DISABLE_MARKERS, linkMarkers.className = "",
                iconMarkers = L.DomUtil.create("span", "",
                    linkMarkers), iconMarkers.className =
                "icon-markers";
            a = L.DomEvent.stopPropagation;
            L.DomEvent.on(linkMarkers, "dblclick", a), L.DomEvent
                .on(linkMarkers, "mousedown", a), L.DomEvent.on(
                    linkMarkers, "click",
                    function(t) {
                        1 == e.hasLayer(mapLayers.places_markers) ?
                            (e.removeLayer(mapLayers
                                .places_markers), iconMarkers
                                .className =
                                "icon-markers disabled", gsValues
                                .map_markers = !1) : (e.addLayer(
                                    mapLayers.places_markers),
                                iconMarkers.className =
                                "icon-markers", gsValues
                                .map_markers = !0)
                    }), linkRoutes = L.DomUtil.create("a", "", t),
                linkRoutes.id = "map_control_routes", linkRoutes
                .href = "#", linkRoutes.title = la
                .ENABLE_DISABLE_ROUTES, linkRoutes.className = "",
                iconRoutes = L.DomUtil.create("span", "",
                    linkRoutes), iconRoutes.className =
                "icon-routes";
            a = L.DomEvent.stopPropagation;
            L.DomEvent.on(linkRoutes, "dblclick", a), L.DomEvent.on(
                    linkRoutes, "mousedown", a), L.DomEvent.on(
                    linkRoutes, "click",
                    function(t) {
                        1 == e.hasLayer(mapLayers.places_routes) ? (
                            e.removeLayer(mapLayers
                                .places_routes), iconRoutes
                            .className = "icon-routes disabled",
                            gsValues.map_routes = !1) : (e
                            .addLayer(mapLayers.places_routes),
                            iconRoutes.className =
                            "icon-routes", gsValues
                            .map_routes = !0)
                    }), linkZones = L.DomUtil.create("a", "", t),
                linkZones.id = "map_control_zones", linkZones.href =
                "#", linkZones.title = la.ENABLE_DISABLE_ZONES,
                linkZones.className = "", iconZones = L.DomUtil
                .create("span", "", linkZones), iconZones
                .className = "icon-zones";
            a = L.DomEvent.stopPropagation;
            L.DomEvent.on(linkZones, "dblclick", a), L.DomEvent.on(
                    linkZones, "mousedown", a), L.DomEvent.on(
                    linkZones, "click",
                    function(t) {
                        1 == e.hasLayer(mapLayers.places_zones) ? (e
                            .removeLayer(mapLayers
                            .places_zones), iconZones
                            .className = "icon-zones disabled",
                            gsValues.map_zones = !1) : (e
                            .addLayer(mapLayers.places_zones),
                            iconZones.className = "icon-zones",
                            gsValues.map_zones = !0)
                    }), linkClusters = L.DomUtil.create("a", "", t),
                linkClusters.id = "map_control_clusters",
                linkClusters.href = "#", linkClusters.title = la
                .ENABLE_DISABLE_CLUSTERS, linkClusters.className =
                "", iconClusters = L.DomUtil.create("span", "",
                    linkClusters), 1 == gsValues.map_clusters ?
                iconClusters.className = "icon-clusters" :
                iconClusters.className = "icon-clusters disabled";
            a = L.DomEvent.stopPropagation;
            if (L.DomEvent.on(linkClusters, "dblclick", a), L
                .DomEvent.on(linkClusters, "mousedown", a), L
                .DomEvent.on(linkClusters, "click", function(e) {
                    1 == gsValues.map_clusters ? (mapLayers
                            .realtime.options
                            .disableClusteringAtZoom = gsValues
                            .map_min_zoom, mapLayers
                            .places_markers.options
                            .disableClusteringAtZoom = gsValues
                            .map_min_zoom, iconClusters
                            .className =
                            "icon-clusters disabled", gsValues
                            .map_clusters = !1) : (mapLayers
                            .realtime.options
                            .disableClusteringAtZoom = gsValues
                            .map_max_zoom + 1, mapLayers
                            .places_markers.options
                            .disableClusteringAtZoom = gsValues
                            .map_max_zoom + 1, iconClusters
                            .className = "icon-clusters",
                            gsValues.map_clusters = !0),
                        objectAddAllToMap(),
                        placesMarkerAddAllToMap()
                }), gsValues.map_google && gsValues
                .map_google_street_view) {
                linkStreetView = L.DomUtil.create("a", "", t),
                    linkStreetView.id = "map_control_street_view",
                    linkStreetView.href = "#", linkStreetView
                    .title = la.ENABLE_DISABLE_STREET_VIEW,
                    linkStreetView.className = "", iconStreetView =
                    L.DomUtil.create("span", "", linkStreetView),
                    iconStreetView.className =
                    "icon-street disabled";
                a = L.DomEvent.stopPropagation;
                L.DomEvent.on(linkStreetView, "dblclick", a), L
                    .DomEvent.on(linkStreetView, "mousedown", a), L
                    .DomEvent.on(linkStreetView, "click", function(
                        e) {
                        if (1 == gsValues.map_street_view)
                            document.getElementById(
                                "street_view_control").style
                            .display = "", iconStreetView
                            .className = "icon-street disabled",
                            gsValues.map_street_view = !1;
                        else
                            for (var t in document
                                    .getElementById(
                                        "street_view_control")
                                    .style.display = "block",
                                    iconStreetView.className =
                                    "icon-street", gsValues
                                    .map_street_view = !0,
                                    objectsData) {
                                if (1 == objectsData[t]
                                    .selected) utilsStreetView(
                                    objectsData[t].data[0]
                                    .lat, objectsData[t]
                                    .data[0].lng,
                                    objectsData[t].data[0]
                                    .angle)
                            }
                    })
            }
            if (gsValues.map_google && gsValues
                .map_google_traffic) {
                linkTraffic = L.DomUtil.create("a", "", t),
                    linkTraffic.id = "map_control_traffic",
                    linkTraffic.href = "#", linkTraffic.title = la
                    .ENABLE_DISABLE_LIVE_TRAFFIC, linkTraffic
                    .className = "", iconTraffic = L.DomUtil.create(
                        "span", "", linkTraffic), iconTraffic
                    .className = "icon-traffic disabled";
                a = L.DomEvent.stopPropagation;
                L.DomEvent.on(linkTraffic, "dblclick", a), L
                    .DomEvent.on(linkTraffic, "mousedown", a), L
                    .DomEvent.on(linkTraffic, "click", function(e) {
                        1 == gsValues.map_traffic ? (iconTraffic
                            .className =
                            "icon-traffic disabled",
                            gsValues.map_traffic = !1,
                            strMatches("gmap,ghyb,gter",
                                gsValues.map_layer
                                .toString()) &&
                            switchMapLayer(gsValues
                                .map_layer)) : strMatches(
                            "gmap,ghyb,gter", gsValues
                            .map_layer.toString()) ? (
                            iconTraffic.className =
                            "icon-traffic", gsValues
                            .map_traffic = !0,
                            switchMapLayer(gsValues
                                .map_layer)) : notifyBox(
                            "error", la.LIVE_TRAFFIC, la
                            .LIVE_TRAFFIC_FOR_THIS_MAP_IS_NOT_AVAILABLE
                            )
                    })
            }
            return t
        }
    })
}

function mapToolControls() {
    return L.Control.extend({
        options: {
            position: "topleft"
        },
        onAdd: function(e) {
            var t = L.DomUtil.create("div",
                "leaflet-control leaflet-bar");
            linkFitObjects = L.DomUtil.create("a", "", t),
                linkFitObjects.id = "map_fit_objects",
                linkFitObjects.href = "#", linkFitObjects.title = la
                .FIT_OBJECTS_ON_MAP, linkFitObjects.className = "",
                iconFitObjects = L.DomUtil.create("span", "",
                    linkFitObjects), iconFitObjects.className =
                "icon-fit-objects";
            var a = L.DomEvent.stopPropagation;
            L.DomEvent.on(linkFitObjects, "dblclick", a), L.DomEvent
                .on(linkFitObjects, "mousedown", a), L.DomEvent.on(
                    linkFitObjects, "click",
                    function(e) {
                        fitObjectsOnMap()
                    }), linkRuler = L.DomUtil.create("a", "", t),
                linkRuler.id = "map_ruler", linkRuler.href = "#",
                linkRuler.title = la.RULER, linkRuler.className =
                "", iconRuler = L.DomUtil.create("span", "",
                    linkRuler), iconRuler.className =
                "icon-ruler disabled";
            a = L.DomEvent.stopPropagation;
            L.DomEvent.on(linkRuler, "dblclick", a), L.DomEvent.on(
                    linkRuler, "mousedown", a), L.DomEvent.on(
                    linkRuler, "click",
                    function(e) {
                        utilsRuler(), 1 == utilsRulerData.enabled ?
                            iconRuler.className = "icon-ruler" :
                            iconRuler.className =
                            "icon-ruler disabled"
                    }), linkMeasure = L.DomUtil.create("a", "", t),
                linkMeasure.id = "map_measure", linkMeasure.href =
                "#", linkMeasure.title = la.MEASURE_AREA,
                linkMeasure.className = "", iconMeasure = L.DomUtil
                .create("span", "", linkMeasure), iconMeasure
                .className = "icon-measure disabled";
            a = L.DomEvent.stopPropagation;
            return L.DomEvent.on(linkMeasure, "dblclick", a), L
                .DomEvent.on(linkMeasure, "mousedown", a), L
                .DomEvent.on(linkMeasure, "click", function(e) {
                    utilsArea(), 1 == utilsAreaData.enabled ?
                        iconMeasure.className = "icon-measure" :
                        iconMeasure.className =
                        "icon-measure disabled"
                }), t
        }
    })
}

function initGraph(e) {
    if (e) {
        t = e.data, a = e.units;
        if ("logic" == e.result_type) o = !0, i = !1;
        else o = !1, i = !1
    } else var t = [],
        a = "",
        o = !1,
        i = !1;
    var s = {
        xaxis: {
            mode: "time",
            zoomRange: [3e4, 2592e6]
        },
        yaxis: {
            tickFormatter: function(t) {
                var o = "";
                return e && (o = Math.round(100 * t) / 100 + " " + a), o
            },
            zoomRange: [0, 0],
            panRange: !1
        },
        selection: {
            mode: "x"
        },
        crosshair: {
            mode: "x"
        },
        lines: {
            show: !0,
            lineWidth: 1,
            fill: !0,
            fillColor: "rgba(43,130,212,0.3)",
            steps: o
        },
        series: {
            lines: {
                show: !0
            },
            points: {
                show: i,
                radius: 1
            }
        },
        colors: ["#2b82d4"],
        grid: {
            hoverable: !0,
            autoHighlight: !0,
            clickable: !0
        },
        zoom: {
            animate: !0,
            trigger: "dblclick",
            amount: 3
        },
        pan: {
            interactive: !1,
            animate: !0
        }
    };
    historyGraphPlot = $.plot($("#bottom_panel_graph_plot"), [t], s), $(
        "#bottom_panel_graph_plot").unbind("plothover"), $(
        "#bottom_panel_graph_plot").bind("plothover", function(e, o, i) {
        if (i) {
            var s = i.datapoint[0],
                n = historyRouteData.graph.data_index[s],
                l = historyRouteData.route[n].dt_tracker;
            document.getElementById("bottom_panel_graph_label")
                .innerHTML = t[n][1] + " " + a + " - " + l
        }
    }), $("#bottom_panel_graph_plot").unbind("plotselected"), $(
        "#bottom_panel_graph_plot").bind("plotselected", function(e, a) {
        historyGraphPlot = $.plot($("#bottom_panel_graph_plot"), [t], $
            .extend(!0, {}, s, {
                xaxis: {
                    min: a.xaxis.from,
                    max: a.xaxis.to
                }
            }))
    }), $("#bottom_panel_graph_plot").unbind("plotclick"), $(
        "#bottom_panel_graph_plot").bind("plotclick", function(e, o, i) {
        if (i) {
            var s = i.datapoint[0],
                n = historyRouteData.graph.data_index[s],
                l = historyRouteData.route[n].dt_tracker;
            document.getElementById("bottom_panel_graph_label")
                .innerHTML = t[n][1] + " " + a + " - " + l,
                historyRouteData.play.position = n,
                historyRoutePanToPoint(n),
                historyRouteAddPointMarkerToMap(n), 0 ==
                historyRouteData.play.status && historyRouteShowPoint(n,
                    !0)
        }
    })
}

function graphSetCrosshair(e) {
    var t = parseInt(historyGraphPlot.pointOffset({
            x: e,
            y: 0
        }).left, 10) - historyGraphPlot.getPlotOffset().left,
        a = historyGraphPlot.width(),
        o = parseInt(a / 2, 10);
    t > a - o && historyGraphPlot.pan({
        left: t - (a - o),
        top: 0
    }), t < o && historyGraphPlot.pan({
        left: t - o,
        top: 0
    }), historyGraphPlot.setCrosshair({
        x: e,
        y: 0
    })
}

function graphPanLeft() {
    historyGraphPlot.pan({
        left: -100
    })
}

function graphPanRight() {
    historyGraphPlot.pan({
        left: 100
    })
}

function graphZoomIn() {
    historyGraphPlot.zoom()
}

function graphZoomOut() {
    historyGraphPlot.zoomOut()
}

function resizeGrids() {
    resizeGridObjects(), resizeGridEvents(), resizeGridHistory()
}

function resizeGridObjects(e) {
    if ("bottom_panel" == settingsUserData.datalist) {
        var t = window.innerHeight - 146;
        $("#side_panel_objects_object_list_grid").setGridHeight(t)
    } else {
        null == e ? e = window.innerHeight - guiDragbars.objects : guiDragbars
            .objects = window.innerHeight - e, e < 295 && (e = 292), e > window
            .innerHeight - 173 && (e = window.innerHeight - 173);
        var a = window.innerHeight - e - 16;
        t = window.innerHeight - a - 164;
        $("#side_panel_objects_object_datalist_grid").setGridHeight(a - 20), $(
            "#side_panel_objects_object_list_grid").setGridHeight(t), $(
            "#side_panel_objects_dragbar").css("bottom", a + 1)
    }
}

function resizeGridEvents(e) {
    if ("bottom_panel" == settingsUserData.datalist) {
        var t = window.innerHeight - 173;
        $("#side_panel_events_event_list_grid").setGridHeight(t)
    } else {
        null == e ? e = window.innerHeight - guiDragbars.events : guiDragbars
            .events = window.innerHeight - e, e < 292 && (e = 292), e > window
            .innerHeight - 173 && (e = window.innerHeight - 173);
        var a = window.innerHeight - e - 16;
        t = window.innerHeight - a - 195;
        $("#side_panel_events_event_datalist_grid").setGridHeight(a - 20), $(
            "#side_panel_events_event_list_grid").setGridHeight(t), $(
            "#side_panel_events_dragbar").css("bottom", a + 1)
    }
}

function resizeGridHistory(e) {
    if ("bottom_panel" == settingsUserData.datalist) {
        var t = window.innerHeight - 284;
        $("#side_panel_history_route_detail_list_grid").setGridHeight(t)
    } else {
        null == e ? e = window.innerHeight - guiDragbars.history : guiDragbars
            .history = window.innerHeight - e, e < 430 && (e = 430), e > window
            .innerHeight - 173 && (e = window.innerHeight - 173);
        var a = window.innerHeight - e - 16;
        t = window.innerHeight - a - 302;
        $("#side_panel_history_route_datalist_grid").setGridHeight(a - 20), $(
                "#side_panel_history_route_detail_list_grid").setGridHeight(t),
            $("#side_panel_history_dragbar").css("bottom", a + 1)
    }
}

function showHideLeftPanel() {
    "none" == document.getElementById("side_panel").style.display ? (document
        .getElementById("side_panel").style.display = "block", document
        .getElementById("bottom_panel").style.left = "365px", document
        .getElementById("side_panel_dragbar").style.left = "360px", document
        .getElementById("bottom_panel_dragbar").style.left = "365px",
        document.getElementById("map").style.left = "365px", document
        .getElementById("history_view_control").style.left = "413px", $(
            "#bottom_panel_msg_list_grid").setGridWidth($(window).width() -
            384), setTimeout(function() {
            map.invalidateSize(!0)
        }, 200)) : (document.getElementById("side_panel").style.display =
        "none", document.getElementById("bottom_panel").style.left = "5px",
        document.getElementById("side_panel_dragbar").style.left = "0px",
        document.getElementById("bottom_panel_dragbar").style.left = "5px",
        document.getElementById("map").style.left = "5px", document
        .getElementById("history_view_control").style.left = "53px", $(
            "#bottom_panel_msg_list_grid").setGridWidth($(window).width() -
            24), setTimeout(function() {
            map.invalidateSize(!0)
        }, 200)), datalistBottomResize()
}

function showBottomPanel(e) {
    void 0 === e && (e = !0), document.getElementById("bottom_panel").style
        .display = "block", guiDragbars.bottom_panel < 171 && (guiDragbars
            .bottom_panel = 171), guiDragbars.bottom_panel > window
        .innerHeight / 2 && (guiDragbars.bottom_panel = window.innerHeight / 2),
        $("#bottom_panel").css("height", guiDragbars.bottom_panel), document
        .getElementById("map").style.bottom = parseInt(guiDragbars
        .bottom_panel) + 5 + "px", document.getElementById(
            "bottom_panel_dragbar").style.bottom = guiDragbars.bottom_panel +
        "px", $("#bottom_panel_msg_list_grid").setGridHeight(guiDragbars
            .bottom_panel - 99), $("#bottom_panel_graph_plot").css("height",
            guiDragbars.bottom_panel - 75), $("#bottom_panel_dragbar").css(
            "cursor", "row-resize"), document.getElementById(
            "street_view_control").style.bottom = parseInt(guiDragbars
            .bottom_panel) + 16 + "px", datalistBottomResize(), 1 == e && map
        .invalidateSize(!0)
}

function hideBottomPanel(e) {
    void 0 === e && (e = !0), document.getElementById("bottom_panel").style
        .display = "none", document.getElementById("map").style.bottom = "5px",
        document.getElementById("bottom_panel_dragbar").style.bottom = "0px", $(
            "#bottom_panel_dragbar").css("cursor", ""), document.getElementById(
            "street_view_control").style.bottom = "16px", 1 == e && map
        .invalidateSize(!0)
}

function resizeBottomPanel(e) {
    guiDragbars.bottom_panel = window.innerHeight - e, guiDragbars
        .bottom_panel -= 3, guiDragbars.bottom_panel < 150 ? hideBottomPanel() :
        showBottomPanel(!1)
}

function initGrids() {
    $("#settings_main_object_list_grid").jqGrid({
            url: "func/fn_settings.objects.php?cmd=load_object_list",
            datatype: "json",
            colNames: [la.NAME, la.IMEI, la.ACTIVE, la.EXPIRES_ON, ""],
            colModel: [{
                name: "name",
                index: "name",
                width: 268
            }, {
                name: "imei",
                index: "imei",
                width: 160
            }, {
                name: "active",
                index: "active",
                width: 90,
                align: "center"
            }, {
                name: "object_expire_dt",
                index: "object_expire_dt",
                width: 110,
                align: "center"
            }, {
                name: "modify",
                index: "modify",
                width: 75,
                align: "center",
                sortable: !1
            }],
            rowNum: 50,
            rowList: [25, 50, 75, 100, 200],
            pager: "#settings_main_object_list_grid_pager",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            height: "351px",
            width: "770",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#settings_main_object_list_grid").jqGrid("navGrid",
            "#settings_main_object_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    settingsObjectAdd("open")
                }
            }), $("#settings_main_object_list_grid").navButtonAdd(
            "#settings_main_object_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "settings_main_object_list_grid_action_menu_button"
            }), $("#settings_main_object_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#settings_main_object_list_grid_action_menu").hide(), $(
            "#settings_main_object_list_grid_action_menu_button").click(
            function() {
                return $("#settings_main_object_list_grid_action_menu").toggle()
                    .position({
                        my: "left bottom",
                        at: "right-5 top-5",
                        of: this
                    }), $(document).one("click", function() {
                        $("#settings_main_object_list_grid_action_menu")
                            .hide()
                    }), !1
            }), $("#settings_object_sensor_list_grid").jqGrid({
            url: "func/fn_settings.sensors.php",
            datatype: "json",
            colNames: [la.NAME, la.TYPE, la.PARAMETER, ""],
            colModel: [{
                name: "name",
                index: "name",
                width: 220,
                sortable: !0
            }, {
                name: "type",
                index: "type",
                width: 205,
                align: "center",
                sortable: !1
            }, {
                name: "param",
                index: "param",
                width: 158,
                align: "center",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            rowNum: 512,
            pager: "#settings_object_sensor_list_grid_pager",
            pgbuttons: !1,
            pgtext: "",
            recordtext: "",
            emptyrecords: "",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            width: "690",
            height: "347",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#settings_object_sensor_list_grid").jqGrid("navGrid",
            "#settings_object_sensor_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    settingsObjectSensorProperties("add")
                }
            }), $("#settings_object_sensor_list_grid").navButtonAdd(
            "#settings_object_sensor_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "settings_object_sensor_list_grid_action_menu_button"
            }), $("#settings_object_sensor_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#settings_object_sensor_list_grid_action_menu").hide(), $(
            "#settings_object_sensor_list_grid_action_menu_button").click(
            function() {
                return $("#settings_object_sensor_list_grid_action_menu")
                    .toggle().position({
                        my: "left bottom",
                        at: "right-5 top-5",
                        of: this
                    }), $(document).one("click", function() {
                        $("#settings_object_sensor_list_grid_action_menu")
                            .hide()
                    }), !1
            }), $("#settings_object_sensor_calibration_list_grid").jqGrid({
            datatype: "local",
            colNames: ["X", "Y", ""],
            colModel: [{
                name: "x",
                index: "x",
                width: 109,
                sortable: !0,
                sorttype: "int"
            }, {
                name: "y",
                index: "y",
                width: 109,
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 30,
                align: "center",
                sortable: !1
            }],
            width: "280",
            height: "333",
            rowNum: 100,
            shrinkToFit: !1
        }), $("#settings_object_sensor_dictionary_list_grid").jqGrid({
            datatype: "local",
            colNames: [la.VALUE, la.TEXT, ""],
            colModel: [{
                name: "value",
                index: "value",
                width: 70,
                sortable: !0,
                sorttype: "int"
            }, {
                name: "text",
                index: "text",
                width: 163,
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 30,
                align: "center",
                sortable: !1
            }],
            width: "295",
            height: "333",
            rowNum: 100,
            shrinkToFit: !1
        }), $("#settings_object_service_list_grid").jqGrid({
            url: "func/fn_settings.service.php",
            datatype: "json",
            colNames: [la.NAME, la.STATUS, ""],
            colModel: [{
                name: "name",
                index: "name",
                width: 220
            }, {
                name: "status",
                index: "status",
                width: 368,
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            rowNum: 512,
            pager: "#settings_object_service_list_grid_pager",
            pgbuttons: !1,
            pgtext: "",
            recordtext: "",
            emptyrecords: "",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            width: "690",
            height: "347",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#settings_object_service_list_grid").jqGrid("navGrid",
            "#settings_object_service_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    settingsObjectServiceProperties("add")
                }
            }), $("#settings_object_service_list_grid").navButtonAdd(
            "#settings_object_service_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "settings_object_service_list_grid_action_menu_button"
            }), $("#settings_object_service_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#settings_object_service_list_grid_action_menu").hide(), $(
            "#settings_object_service_list_grid_action_menu_button").click(
            function() {
                return $("#settings_object_service_list_grid_action_menu")
                    .toggle().position({
                        my: "left bottom",
                        at: "right-5 top-5",
                        of: this
                    }), $(document).one("click", function() {
                        $("#settings_object_service_list_grid_action_menu")
                            .hide()
                    }), !1
            }), $("#settings_object_custom_fields_list_grid").jqGrid({
            url: "func/fn_settings.customfields.php",
            datatype: "json",
            colNames: [la.NAME, la.VALUE, la.DATA_LIST, la.POPUP, ""],
            colModel: [{
                name: "name",
                index: "name",
                width: 220,
                sortable: !0
            }, {
                name: "value",
                index: "value",
                width: 178,
                align: "center",
                sortable: !0
            }, {
                name: "data_list",
                index: "data_list",
                width: 90,
                align: "center",
                sortable: !1
            }, {
                name: "popup",
                index: "popup",
                width: 90,
                align: "center",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            rowNum: 512,
            pager: "#settings_object_custom_fields_list_grid_pager",
            pgbuttons: !1,
            pgtext: "",
            recordtext: "",
            emptyrecords: "",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            width: "690",
            height: "347",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#settings_object_custom_fields_list_grid").jqGrid("navGrid",
            "#settings_object_custom_fields_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    settingsObjectCustomFieldProperties("add")
                }
            }), $("#settings_object_custom_fields_list_grid").navButtonAdd(
            "#settings_object_custom_fields_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "settings_object_custom_fields_list_grid_action_menu_button"
            }), $("#settings_object_custom_fields_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#settings_object_custom_fields_list_grid_action_menu").hide(), $(
            "#settings_object_custom_fields_list_grid_action_menu_button")
        .click(function() {
            return $("#settings_object_custom_fields_list_grid_action_menu")
                .toggle().position({
                    my: "left bottom",
                    at: "right-5 top-5",
                    of: this
                }), $(document).one("click", function() {
                    $("#settings_object_custom_fields_list_grid_action_menu")
                        .hide()
                }), !1
        }), $("#settings_object_info_list_grid").jqGrid({
            url: "func/fn_settings.objects.php",
            datatype: "json",
            colNames: [la.DATA, la.VALUE],
            colModel: [{
                name: "data",
                index: "data",
                width: 170,
                sortable: !1
            }, {
                name: "value",
                index: "value",
                width: 493,
                sortable: !1
            }],
            rowNum: 512,
            pager: "#settings_object_info_list_grid_pager",
            pgbuttons: !1,
            pgtext: "",
            recordtext: "",
            emptyrecords: "",
            sortname: "data",
            sortorder: "asc",
            viewrecords: !0,
            width: "690",
            height: "347",
            shrinkToFit: !1
        }), $("#settings_object_info_list_grid").jqGrid("navGrid",
            "#settings_object_info_list_grid_pager", {
                add: !1,
                edit: !1,
                del: !1,
                search: !1
            }), $("#settings_main_object_group_list_grid").jqGrid({
            url: "func/fn_settings.groups.php?cmd=load_object_group_list",
            datatype: "json",
            colNames: [la.NAME, la.OBJECTS, la.DESCRIPTION, ""],
            colModel: [{
                name: "group_name",
                index: "group_name",
                width: 268,
                sortable: !0
            }, {
                name: "objects",
                index: "objects",
                width: 90,
                align: "center",
                sortable: !1
            }, {
                name: "description",
                index: "description",
                width: 305,
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            rowNum: 50,
            rowList: [25, 50, 75, 100, 200],
            pager: "#settings_main_object_group_list_grid_pager",
            sortname: "group_name",
            sortorder: "asc",
            viewrecords: !0,
            height: "351px",
            width: "770",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#settings_main_object_group_list_grid").jqGrid("navGrid",
            "#settings_main_object_group_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    settingsObjectGroupProperties("add")
                }
            }), $("#settings_main_object_group_list_grid").navButtonAdd(
            "#settings_main_object_group_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "settings_main_object_group_list_grid_action_menu_button"
            }), $("#settings_main_object_group_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#settings_main_object_group_list_grid_action_menu").hide(), $(
            "#settings_main_object_group_list_grid_action_menu_button").click(
            function() {
                return $("#settings_main_object_group_list_grid_action_menu")
                    .toggle().position({
                        my: "left bottom",
                        at: "right-5 top-5",
                        of: this
                    }), $(document).one("click", function() {
                        $("#settings_main_object_group_list_grid_action_menu")
                            .hide()
                    }), !1
            }), $("#settings_main_object_driver_list_grid").jqGrid({
            url: "func/fn_settings.drivers.php?cmd=load_object_driver_list",
            datatype: "json",
            colNames: [la.NAME, la.ID_NUMBER, la.DESCRIPTION, ""],
            colModel: [{
                name: "driver_name",
                index: "driver_name",
                width: 268,
                sortable: !0
            }, {
                name: "idn",
                index: "idn",
                width: 135,
                sortable: !1
            }, {
                name: "description",
                index: "description",
                width: 260,
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            rowNum: 50,
            rowList: [25, 50, 75, 100, 200],
            pager: "#settings_main_object_driver_list_grid_pager",
            sortname: "driver_name",
            sortorder: "asc",
            viewrecords: !0,
            height: "351px",
            width: "770",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#settings_main_object_driver_list_grid").jqGrid("navGrid",
            "#settings_main_object_driver_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    settingsObjectDriverProperties("add")
                }
            }), $("#settings_main_object_driver_list_grid").navButtonAdd(
            "#settings_main_object_driver_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "settings_main_object_driver_list_grid_action_menu_button"
            }), $("#settings_main_object_driver_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#settings_main_object_driver_list_grid_action_menu").hide(), $(
            "#settings_main_object_driver_list_grid_action_menu_button").click(
            function() {
                return $("#settings_main_object_driver_list_grid_action_menu")
                    .toggle().position({
                        my: "left bottom",
                        at: "right-5 top-5",
                        of: this
                    }), $(document).one("click", function() {
                        $("#settings_main_object_driver_list_grid_action_menu")
                            .hide()
                    }), !1
            }), $("#settings_main_object_passenger_list_grid").jqGrid({
            url: "func/fn_settings.passengers.php?cmd=load_object_passenger_list",
            datatype: "json",
            colNames: [la.NAME, la.ID_NUMBER, la.DESCRIPTION, ""],
            colModel: [{
                name: "passenger_name",
                index: "passenger_name",
                width: 268,
                sortable: !0
            }, {
                name: "idn",
                index: "idn",
                width: 135,
                sortable: !1
            }, {
                name: "description",
                index: "description",
                width: 260,
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            rowNum: 50,
            rowList: [25, 50, 75, 100, 200],
            pager: "#settings_main_object_passenger_list_grid_pager",
            sortname: "passenger_name",
            sortorder: "asc",
            viewrecords: !0,
            height: "351px",
            width: "770",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#settings_main_object_passenger_list_grid").jqGrid("navGrid",
            "#settings_main_object_passenger_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    settingsObjectPassengerProperties("add")
                }
            }), $("#settings_main_object_passenger_list_grid").navButtonAdd(
            "#settings_main_object_passenger_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "settings_main_object_passenger_list_grid_action_menu_button"
            }), $("#settings_main_object_passenger_list_grid_action_menu")
    .menu({
            role: "listbox"
        }), $("#settings_main_object_passenger_list_grid_action_menu").hide(),
        $("#settings_main_object_passenger_list_grid_action_menu_button").click(
            function() {
                return $(
                        "#settings_main_object_passenger_list_grid_action_menu")
                    .toggle().position({
                        my: "left bottom",
                        at: "right-5 top-5",
                        of: this
                    }), $(document).one("click", function() {
                        $("#settings_main_object_passenger_list_grid_action_menu")
                            .hide()
                    }), !1
            }), $("#settings_main_object_trailer_list_grid").jqGrid({
            url: "func/fn_settings.trailers.php?cmd=load_object_trailer_list",
            datatype: "json",
            colNames: [la.NAME, la.DESCRIPTION, ""],
            colModel: [{
                name: "trailer_name",
                index: "trailer_name",
                width: 268,
                sortable: !0
            }, {
                name: "description",
                index: "description",
                width: 400,
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            rowNum: 50,
            rowList: [25, 50, 75, 100, 200],
            pager: "#settings_main_object_trailer_list_grid_pager",
            sortname: "trailer_name",
            sortorder: "asc",
            viewrecords: !0,
            height: "351px",
            width: "770",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#settings_main_object_trailer_list_grid").jqGrid("navGrid",
            "#settings_main_object_trailer_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    settingsObjectTrailerProperties("add")
                }
            }), $("#settings_main_object_trailer_list_grid").navButtonAdd(
            "#settings_main_object_trailer_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "settings_main_object_trailer_list_grid_action_menu_button"
            }), $("#settings_main_object_trailer_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#settings_main_object_trailer_list_grid_action_menu").hide(), $(
            "#settings_main_object_trailer_list_grid_action_menu_button").click(
            function() {
                return $("#settings_main_object_trailer_list_grid_action_menu")
                    .toggle().position({
                        my: "left bottom",
                        at: "right-5 top-5",
                        of: this
                    }), $(document).one("click", function() {
                        $("#settings_main_object_trailer_list_grid_action_menu")
                            .hide()
                    }), !1
            }), $("#settings_main_events_event_list_grid").jqGrid({
            url: "func/fn_settings.events.php?cmd=load_event_list",
            datatype: "json",
            colNames: [la.NAME, la.ACTIVE, la.SYSTEM, la.PUSH_NOTIFICATION,
                la.EMAIL, la.SMS, ""
            ],
            colModel: [{
                name: "name",
                index: "name",
                width: 198,
                sortable: !0
            }, {
                name: "active",
                index: "active",
                width: 90,
                align: "center",
                sortable: !1
            }, {
                name: "system",
                index: "system",
                width: 90,
                align: "center",
                sortable: !1
            }, {
                name: "push",
                index: "push",
                width: 90,
                align: "center",
                sortable: !1
            }, {
                name: "email",
                index: "email",
                width: 90,
                align: "center",
                sortable: !1
            }, {
                name: "sms",
                index: "sms",
                width: 90,
                align: "center",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            rowNum: 50,
            rowList: [25, 50, 75, 100, 200],
            pager: "#settings_main_events_event_list_grid_pager",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            height: "447px",
            width: "770",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#settings_main_events_event_list_grid").jqGrid("navGrid",
            "#settings_main_events_event_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    settingsEventProperties("add")
                }
            }), $("#settings_main_events_event_list_grid").navButtonAdd(
            "#settings_main_events_event_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "settings_main_events_event_list_grid_action_menu_button"
            }), $("#settings_main_events_event_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#settings_main_events_event_list_grid_action_menu").hide(), $(
            "#settings_main_events_event_list_grid_action_menu_button").click(
            function() {
                return $("#settings_main_events_event_list_grid_action_menu")
                    .toggle().position({
                        my: "left bottom",
                        at: "right-5 top-5",
                        of: this
                    }), $(document).one("click", function() {
                        $("#settings_main_events_event_list_grid_action_menu")
                            .hide()
                    }), !1
            }), $("#settings_event_param_sensor_condition_list_grid").jqGrid({
            datatype: "local",
            colNames: [la.SOURCE, "", la.VALUE, ""],
            colModel: [{
                name: "src",
                index: "src",
                width: 94,
                sortable: !0,
                sorttype: "text"
            }, {
                name: "cn",
                index: "cn",
                width: 35,
                align: "center",
                sortable: !1,
                formatter: function(e, t, a) {
                    "eq" == e ? e = "=" : "gr" == e ? e = ">" :
                        "lw" == e ? e = "<" : "grp" == e ? e =
                        "> %" : "lwp" == e && (e = "< %");
                    return e
                }
            }, {
                name: "val",
                index: "val",
                width: 80,
                align: "center",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 30,
                align: "center",
                sortable: !1
            }],
            width: "276",
            height: "209",
            rowNum: 15,
            shrinkToFit: !1
        }), $("#settings_main_templates_template_list_grid").jqGrid({
            url: "func/fn_settings.templates.php?cmd=load_template_list",
            datatype: "json",
            colNames: [la.NAME, la.DESCRIPTION, ""],
            colModel: [{
                name: "name",
                index: "name",
                width: 293,
                sortable: !0
            }, {
                name: "description",
                index: "description",
                width: 375,
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            rowNum: 50,
            rowList: [25, 50, 75, 100, 200],
            pager: "#settings_main_templates_template_list_grid_pager",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            height: "447px",
            width: "770",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#settings_main_templates_template_list_grid").jqGrid("navGrid",
            "#settings_main_templates_template_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    settingsTemplateProperties("add")
                }
            }), $("#settings_main_templates_template_list_grid").navButtonAdd(
            "#settings_main_templates_template_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "settings_main_templates_template_list_grid_action_menu_button"
            }), $("#settings_main_templates_template_list_grid_action_menu")
        .menu({
            role: "listbox"
        }), $("#settings_main_templates_template_list_grid_action_menu").hide(),
        $("#settings_main_templates_template_list_grid_action_menu_button")
        .click(function() {
            return $(
                "#settings_main_templates_template_list_grid_action_menu"
                ).toggle().position({
                my: "left bottom",
                at: "right-5 top-5",
                of: this
            }), $(document).one("click", function() {
                $("#settings_main_templates_template_list_grid_action_menu")
                    .hide()
            }), !1
        }), $("#settings_main_subaccount_list_grid").jqGrid({
            url: "func/fn_settings.subaccounts.php?cmd=load_subaccount_list",
            datatype: "json",
            colNames: [la.EMAIL, la.ACTIVE, la.OBJECTS, la.PLACES, ""],
            colModel: [{
                name: "email",
                index: "email",
                width: 338,
                sortable: !0
            }, {
                name: "active",
                index: "active",
                width: 90,
                align: "center",
                sortable: !1
            }, {
                name: "objects",
                index: "objects",
                width: 90,
                align: "center",
                sortable: !1
            }, {
                name: "places",
                index: "places",
                width: 140,
                align: "center",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            rowNum: 50,
            rowList: [25, 50, 75, 100, 200],
            pager: "#settings_main_subaccount_list_grid_pager",
            sortname: "email",
            sortorder: "asc",
            viewrecords: !0,
            height: "397px",
            width: "770",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#settings_main_subaccount_list_grid").jqGrid("navGrid",
            "#settings_main_subaccount_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    settingsSubaccountProperties("add")
                }
            }), $("#settings_main_subaccount_list_grid").navButtonAdd(
            "#settings_main_subaccount_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "settings_main_subaccount_list_grid_action_menu_button"
            }), $("#settings_main_subaccount_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#settings_main_subaccount_list_grid_action_menu").hide(), $(
            "#settings_main_subaccount_list_grid_action_menu_button").click(
            function() {
                return $("#settings_main_subaccount_list_grid_action_menu")
                    .toggle().position({
                        my: "left bottom",
                        at: "right-5 top-5",
                        of: this
                    }), $(document).one("click", function() {
                        $("#settings_main_subaccount_list_grid_action_menu")
                            .hide()
                    }), !1
            });
    var e = '<div style="float: left; margin-top: 2px; width: 25px;">';
    e += '<center><input id="object_group_visible_{0}" type="checkbox" onClick="objectGroupVisibleToggle({0});"></center>',
        e += "</div>", e +=
        '<div style="float: left; margin-top: 2px; width: 25px;">', e +=
        '<center><input id="object_group_follow_{0}" type="checkbox" onClick="objectGroupFollowToggle({0});"></center>',
        e += "</div>", e +=
        '<div style="float: right;"><span id="object_group_name_{0}"></span> ({1})</div>',
        $("#side_panel_objects_object_list_grid").jqGrid({
            datatype: "local",
            colNames: ["", "", "",
                '<a href="#" onclick="objectVisibleAllToggle();"><img title="' +
                la.SHOW_HIDE_ALL +
                '" src="theme/images/eye.svg" width="14px" /></a>',
                '<a href="#" onclick="objectFollowAllToggle();"><img title="' +
                la.FOLLOW_UNFOLLOW_ALL +
                '" src="theme/images/follow.svg" width="14px" /></a>',
                "", la.OBJECT, ""
            ],
            colModel: [{
                name: "search",
                index: "search",
                hidden: !0
            }, {
                name: "name_sort",
                index: "name_sort",
                hidden: !0
            }, {
                name: "group_id",
                index: "group_id",
                sorttype: function(e) {
                    return 0 == e ? String.fromCharCode(0) :
                        null == settingsObjectGroupData[e] ?
                        String.fromCharCode(0) :
                        settingsObjectGroupData[e].name
                }
            }, {
                name: "show",
                index: "show",
                width: 20,
                sortable: !1,
                align: "center"
            }, {
                name: "follow",
                index: "follow",
                width: 20,
                sortable: !1,
                align: "center"
            }, {
                name: "icon",
                index: "icon",
                width: 28,
                sortable: !1
            }, {
                name: "name",
                index: "name_sort",
                width: 215,
                title: !1
            }, {
                name: "menu",
                index: "menu",
                width: 15,
                sortable: !1,
                align: "center"
            }],
            rowNum: 4096,
            viewrecords: !0,
            grouping: !0,
            groupingView: {
                groupField: ["group_id"],
                groupColumnShow: [!1],
                groupText: [e],
                groupCollapse: settingsUserData.groups_collapsed.objects,
                groupOrder: ["asc"],
                groupDataSorted: [!0]
            },
            width: "340",
            shrinkToFit: !1,
            loadComplete: function(e) {
                for (var t in settingsObjectGroupData) null != document
                    .getElementById("object_group_name_" + t) && (
                        document.getElementById("object_group_name_" +
                            t).innerHTML = settingsObjectGroupData[t]
                        .name);
                "" != objectsData && (objectAddAllToMap(),
                    objectUpdateList());
                for (var a = $(this).getDataIDs(), o = 0; o < a
                    .length; o++) {
                    var i = a[o];
                    $("#object_action_menu_" + i).click(function() {
                        return $(
                                "#side_panel_objects_action_menu"
                                ).toggle().position({
                                my: "left top",
                                at: "right bottom",
                                of: this
                            }), menuOnItem = $(this).attr(
                            "tag"), $(document).one("click",
                                function() {
                                    $("#side_panel_objects_action_menu")
                                        .hide()
                                }), !1
                    })
                }
            },
            onCellSelect: function(e, t, a, o) {
                objectSelect(e), 5 == t ? objectPanToZoom(e) :
                    objectPanTo(e)
            }
        }), $("#side_panel_objects_object_list_grid").setCaption(
            '<div class="row4">\t\t\t\t\t\t\t\t\t<div class="width80">\t\t\t\t\t\t\t\t\t\t<input id="side_panel_objects_object_list_search" class="inputbox-search" type="text" value="" placeholder="' +
            la.SEARCH +
            '" maxlength="25">\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="float-right">\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="objectReloadData();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.RELOAD +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/refresh-color.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="settingsObjectAdd(\'open\');">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.ADD_OBJECT +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/object-add.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>'
            ), $("#side_panel_objects_object_list_search").bind("keyup",
            function(e) {
                var t = $("#side_panel_objects_object_list_grid"),
                    a = t.jqGrid("getGridParam", "postData");
                jQuery.extend(a, {
                    filters: "",
                    searchField: "search",
                    searchOper: "cn",
                    searchString: this.value.toLowerCase()
                }), t.jqGrid("setGridParam", {
                    search: !0,
                    postData: a
                }), t.trigger("reloadGrid")
            });
    e = '<div style="float: right;"><span>{0}</span></div>';
    $("#side_panel_objects_object_datalist_grid").jqGrid({
        datatype: "local",
        colNames: ["", la.DATA, la.VALUE],
        colModel: [{
            name: "group_name",
            index: "group_name"
        }, {
            name: "data",
            index: "data",
            width: 110,
            sortable: !1
        }, {
            name: "value",
            index: "value",
            width: 203,
            sortable: !1
        }],
        width: "340",
        height: "155",
        rowNum: 512,
        grouping: !0,
        groupingView: {
            groupField: ["group_name"],
            groupColumnShow: [!1],
            groupText: [e],
            groupCollapse: !1,
            groupOrder: ["asc"],
            groupDataSorted: [!0]
        },
        shrinkToFit: !1
    }), $("#side_panel_events_event_list_grid").jqGrid({
        url: "func/fn_events.php?cmd=load_event_list",
        datatype: "json",
        colNames: [la.TIME, la.OBJECT, la.EVENT],
        colModel: [{
            name: "dt_tracker",
            index: "dt_tracker",
            width: 50,
            sorttype: "datetime",
            formatter: function(e, t, a) {
                e = e.substring(0, 10) == moment().format(
                        "YYYY-MM-DD") ? e.substring(11,
                    19) : e.substring(2, 10);
                return e
            },
            align: "left"
        }, {
            name: "object",
            index: "object",
            width: 105,
            sortable: !1,
            align: "left"
        }, {
            name: "event",
            index: "event",
            width: 153,
            sortable: !1,
            align: "left"
        }],
        recordtext: "",
        emptyrecords: "",
        rowNum: 25,
        rowList: [25, 50, 75, 100, 200],
        pager: "#side_panel_events_event_list_grid_pager",
        sortname: "dt_tracker",
        sortorder: "desc",
        viewrecords: !0,
        width: "340",
        shrinkToFit: !1,
        onSelectRow: function(e) {
            eventsShowEvent(e)
        }
    }), $("#side_panel_events_event_list_grid").setCaption(
        '<div class="row4">\t\t\t\t\t\t\t\t\t<div class="width71">\t\t\t\t\t\t\t\t\t\t<input id="side_panel_events_event_list_search" class="inputbox-search" type="text" value="" placeholder="' +
        la.SEARCH +
        '" maxlength="25">\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="float-right">\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="eventsReloadData();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
        la.RELOAD +
        '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/refresh-color.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="eventsExport();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
        la.EXPORT +
        '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/export.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="eventsDeleteAll();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
        la.DELETE_ALL_EVENTS +
        '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/remove2.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>'
        ), $("#side_panel_events_event_list_search").bind("keyup", function(
        e) {
        $("#side_panel_events_event_list_grid").setGridParam({
            url: "func/fn_events.php?cmd=load_event_list&s=" +
                this.value
        }), $("#side_panel_events_event_list_grid").trigger(
            "reloadGrid")
    });
    e = '<div style="float: right;"><span>{0}</span></div>';
    $("#side_panel_events_event_datalist_grid").jqGrid({
        datatype: "local",
        colNames: ["", la.DATA, la.VALUE],
        colModel: [{
            name: "group_name",
            index: "group_name"
        }, {
            name: "data",
            index: "data",
            width: 110,
            sortable: !1
        }, {
            name: "value",
            index: "value",
            width: 203,
            sortable: !1
        }],
        width: "340",
        height: "155",
        rowNum: 512,
        grouping: !0,
        groupingView: {
            groupField: ["group_name"],
            groupColumnShow: [!1],
            groupText: [e],
            groupCollapse: !1,
            groupOrder: ["asc"],
            groupDataSorted: [!0]
        },
        shrinkToFit: !1
    }), $("#places_group_list_grid").jqGrid({
        url: "func/fn_places.php?cmd=load_places_group_list",
        datatype: "json",
        colNames: [la.NAME, la.PLACES, la.DESCRIPTION, ""],
        colModel: [{
            name: "group_name",
            index: "group_name",
            width: 228,
            sortable: !0
        }, {
            name: "places",
            index: "places",
            width: 90,
            align: "center",
            sortable: !1
        }, {
            name: "description",
            index: "description",
            width: 295,
            sortable: !1
        }, {
            name: "modify",
            index: "modify",
            width: 45,
            align: "center",
            sortable: !1
        }],
        rowNum: 50,
        rowList: [25, 50, 75, 100, 200],
        pager: "#places_group_list_grid_pager",
        sortname: "group_name",
        sortorder: "asc",
        viewrecords: !0,
        height: "311px",
        width: "720",
        shrinkToFit: !1,
        multiselect: !0,
        beforeSelectRow: function(e, t) {
            return "input" === t.target.tagName.toLowerCase()
        }
    }), $("#places_group_list_grid").jqGrid("navGrid",
        "#places_group_list_grid_pager", {
            add: !0,
            edit: !1,
            del: !1,
            search: !1,
            addfunc: function(e) {
                placesGroupProperties("add")
            }
        }), $("#places_group_list_grid").navButtonAdd(
        "#places_group_list_grid_pager", {
            caption: "",
            title: la.ACTION,
            buttonicon: "ui-icon-action",
            onClickButton: function() {},
            position: "last",
            id: "places_group_list_grid_action_menu_button"
        }), $("#places_group_list_grid_action_menu").menu({
        role: "listbox"
    }), $("#places_group_list_grid_action_menu").hide(), $(
        "#places_group_list_grid_action_menu_button").click(function() {
        return $("#places_group_list_grid_action_menu").toggle()
            .position({
                my: "left bottom",
                at: "right-5 top-5",
                of: this
            }), $(document).one("click", function() {
                $("#places_group_list_grid_action_menu").hide()
            }), !1
    });
    e = '<div style="float: left; margin-top: 2px; width: 25px;">';
    e += '<center><input id="marker_group_visible_{0}" type="checkbox" onClick="markerGroupVisibleToggle({0});"></center>',
        e += "</div>", e +=
        '<div style="float: right;"><span id="marker_group_name_{0}"></span> ({1})</div>',
        $("#side_panel_places_marker_list_grid").jqGrid({
            url: "func/fn_places.php?cmd=load_marker_list",
            datatype: "json",
            colNames: ["", "",
                '<a href="#" onclick="placesMarkerVisibleAllToggle();"><img title="' +
                la.SHOW_HIDE_ALL +
                '" src="theme/images/eye.svg" width="14px"/></a>', "",
                la.NAME, ""
            ],
            colModel: [{
                name: "marker_id",
                index: "marker_id",
                hidden: !0
            }, {
                name: "group_id",
                index: "group_id"
            }, {
                name: "show",
                index: "show",
                width: 20,
                sortable: !1,
                align: "center"
            }, {
                name: "icon",
                index: "icon",
                width: 20,
                sortable: !1,
                align: "center",
                formatter: function(e, t, a) {
                    return e =
                        '<img style="height: 14px;" src="' + e +
                        '"/>'
                }
            }, {
                name: "name",
                index: "name",
                width: 218
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            recordtext: "",
            emptyrecords: "",
            rowNum: 50,
            rowList: [25, 50, 100, 200],
            pager: "#side_panel_places_marker_list_grid_pager",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            width: "340",
            shrinkToFit: !1,
            grouping: !0,
            groupingView: {
                groupField: ["group_id"],
                groupColumnShow: [!1],
                groupText: [e],
                groupCollapse: settingsUserData.groups_collapsed.markers,
                groupOrder: ["asc"],
                groupDataSorted: [!0]
            },
            onSelectRow: function(e) {
                placesMarkerPanTo($(this).jqGrid("getCell", e,
                    "marker_id"))
            },
            loadComplete: function(e) {
                for (var t in placesGroupData.groups) null != document
                    .getElementById("marker_group_name_" + t) && (
                        document.getElementById("marker_group_name_" +
                            t).innerHTML = placesGroupData.groups[t]
                        .name);
                placesMarkerSetListCheckbox()
            }
        }), $("#side_panel_places_marker_list_grid").setCaption(
            '<div class="row4">\t\t\t\t\t\t\t\t\t<div class="width44">\t\t\t\t\t\t\t\t\t\t<input id="side_panel_places_marker_list_search" class="inputbox-search" type="text" value="" placeholder="' +
            la.SEARCH +
            '" maxlength="25">\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="float-right">\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesMarkerReload();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.RELOAD +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/refresh-color.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesMarkerNew();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.ADD_MARKER +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/marker-add.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesGroupOpen();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.GROUPS +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/groups.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesImport();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.IMPORT +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/import.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesExport();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.EXPORT +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/export.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesMarkerDeleteAll();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.DELETE_ALL_MARKERS +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/remove2.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>'
            ), $("#side_panel_places_marker_list_search").bind("keyup",
            function(e) {
                $("#side_panel_places_marker_list_grid").setGridParam({
                    url: "func/fn_places.php?cmd=load_marker_list&s=" +
                        this.value
                }), $("#side_panel_places_marker_list_grid").trigger(
                    "reloadGrid"), placesMarkerSearchMap(this.value)
            }), $(window).bind("resize", function() {
            $("#side_panel_places_marker_list_grid").setGridHeight($(window)
                .height() - 207)
        }).trigger("resize");
    e = '<div style="float: left; margin-top: 2px; width: 25px;">';
    e += '<center><input id="route_group_visible_{0}" type="checkbox" onClick="routeGroupVisibleToggle({0});"></center>',
        e += "</div>", e +=
        '<div style="float: right;"><span id="route_group_name_{0}"></span> ({1})</div>',
        $("#side_panel_places_route_list_grid").jqGrid({
            url: "func/fn_places.php?cmd=load_route_list",
            datatype: "json",
            colNames: ["", "",
                '<a href="#" onclick="placesRouteVisibleAllToggle();"><img title="' +
                la.SHOW_HIDE_ALL +
                '" src="theme/images/eye.svg" width="14px"/></a>', "",
                la.NAME, ""
            ],
            colModel: [{
                name: "route_id",
                index: "route_id",
                hidden: !0
            }, {
                name: "group_id",
                index: "group_id"
            }, {
                name: "show",
                index: "show",
                width: 20,
                sortable: !1,
                align: "center"
            }, {
                name: "icon",
                index: "icon",
                width: 20,
                sortable: !1,
                align: "center",
                formatter: function(e, t, a) {
                    return e =
                        '<div style="margin:auto; width: 12px; height: 12px; background-color:' +
                        e + ';"></div>'
                }
            }, {
                name: "name",
                index: "name",
                width: 218
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            recordtext: "",
            emptyrecords: "",
            rowNum: 50,
            rowList: [25, 50, 100, 200],
            pager: "#side_panel_places_route_list_grid_pager",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            width: "340",
            shrinkToFit: !1,
            grouping: !0,
            groupingView: {
                groupField: ["group_id"],
                groupColumnShow: [!1],
                groupText: [e],
                groupCollapse: settingsUserData.groups_collapsed.routes,
                groupOrder: ["asc"],
                groupDataSorted: [!0]
            },
            onSelectRow: function(e) {
                placesRoutePanTo($(this).jqGrid("getCell", e,
                    "route_id"))
            },
            loadComplete: function(e) {
                for (var t in placesGroupData.groups) null != document
                    .getElementById("route_group_name_" + t) && (
                        document.getElementById("route_group_name_" + t)
                        .innerHTML = placesGroupData.groups[t].name);
                placesRouteSetListCheckbox()
            }
        }), $("#side_panel_places_route_list_grid").setCaption(
            '<div class="row4">\t\t\t\t\t\t\t\t\t<div class="width44">\t\t\t\t\t\t\t\t\t\t<input id="side_panel_places_route_list_search" class="inputbox-search" type="text" value="" placeholder="' +
            la.SEARCH +
            '" maxlength="25">\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="float-right">\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesRouteReload();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.RELOAD +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/refresh-color.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesRouteNew();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.ADD_ROUTE +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/route-add.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesGroupOpen();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.GROUPS +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/groups.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesImport();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.IMPORT +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/import.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesExport();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.EXPORT +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/export.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesRouteDeleteAll();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.DELETE_ALL_ROUTES +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/remove2.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>'
            ), $("#side_panel_places_route_list_search").bind("keyup", function(
            e) {
            $("#side_panel_places_route_list_grid").setGridParam({
                url: "func/fn_places.php?cmd=load_route_list&s=" +
                    this.value
            }), $("#side_panel_places_route_list_grid").trigger(
                "reloadGrid"), placesRouteSearchMap(this.value)
        }), $(window).bind("resize", function() {
            $("#side_panel_places_route_list_grid").setGridHeight($(window)
                .height() - 207)
        }).trigger("resize");
    e = '<div style="float: left; margin-top: 2px; width: 25px;">';
    e += '<center><input id="zone_group_visible_{0}" type="checkbox" onClick="zoneGroupVisibleToggle({0});"></center>',
        e += "</div>", e +=
        '<div style="float: right;"><span id="zone_group_name_{0}"></span> ({1})</div>',
        $("#side_panel_places_zone_list_grid").jqGrid({
            url: "func/fn_places.php?cmd=load_zone_list",
            datatype: "json",
            colNames: ["", "",
                '<a href="#" onclick="placesZoneVisibleAllToggle();"><img title="' +
                la.SHOW_HIDE_ALL +
                '" src="theme/images/eye.svg" width="14px"/></a>', "",
                la.NAME, ""
            ],
            colModel: [{
                name: "zone_id",
                index: "zone_id",
                hidden: !0
            }, {
                name: "group_id",
                index: "group_id"
            }, {
                name: "show",
                index: "show",
                width: 20,
                sortable: !1,
                align: "center"
            }, {
                name: "icon",
                index: "icon",
                width: 20,
                sortable: !1,
                align: "center",
                formatter: function(e, t, a) {
                    return e =
                        '<div style="margin:auto; width: 12px; height: 12px; background-color:' +
                        e + ';"></div>'
                }
            }, {
                name: "name",
                index: "name",
                width: 218
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            recordtext: "",
            emptyrecords: "",
            rowNum: 50,
            rowList: [25, 50, 100, 200],
            pager: "#side_panel_places_zone_list_grid_pager",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            width: "340",
            shrinkToFit: !1,
            grouping: !0,
            groupingView: {
                groupField: ["group_id"],
                groupColumnShow: [!1],
                groupText: [e],
                groupCollapse: settingsUserData.groups_collapsed.zones,
                groupOrder: ["asc"],
                groupDataSorted: [!0]
            },
            onSelectRow: function(e) {
                placesZonePanTo($(this).jqGrid("getCell", e, "zone_id"))
            },
            loadComplete: function(e) {
                for (var t in placesGroupData.groups) null != document
                    .getElementById("zone_group_name_" + t) && (document
                        .getElementById("zone_group_name_" + t)
                        .innerHTML = placesGroupData.groups[t].name);
                placesZoneSetListCheckbox()
            }
        }), $("#side_panel_places_zone_list_grid").setCaption(
            '<div class="row4">\t\t\t\t\t\t\t\t\t<div class="width44">\t\t\t\t\t\t\t\t\t\t<input id="side_panel_places_zone_list_search" class="inputbox-search" type="text" value="" placeholder="' +
            la.SEARCH +
            '" maxlength="25">\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t<div class="float-right">\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesZoneReload();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.RELOAD +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/refresh-color.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesZoneNew();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.ADD_ZONE +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/zone-add.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesGroupOpen();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.GROUPS +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/groups.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesImport();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.IMPORT +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/import.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesExport();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.EXPORT +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/export.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t\t<a href="#" onclick="placesZoneDeleteAll();">\t\t\t\t\t\t\t\t\t\t<div class="panel-button" title="' +
            la.DELETE_ALL_ZONES +
            '">\t\t\t\t\t\t\t\t\t\t\t<img src="theme/images/remove2.svg" width="16px" border="0"/>\t\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t\t\t</a>\t\t\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\t</div>'
            ), $("#side_panel_places_zone_list_search").bind("keyup", function(
            e) {
            $("#side_panel_places_zone_list_grid").setGridParam({
                url: "func/fn_places.php?cmd=load_zone_list&s=" +
                    this.value
            }), $("#side_panel_places_zone_list_grid").trigger(
                "reloadGrid"), placesZoneSearchMap(this.value)
        }), $(window).bind("resize", function() {
            $("#side_panel_places_zone_list_grid").setGridHeight($(window)
                .height() - 207)
        }).trigger("resize"), $("#side_panel_history_route_detail_list_grid")
        .jqGrid({
            datatype: "local",
            colNames: ["", "", "", la.TIME, la.INFORMATION],
            colModel: [{
                name: "el_type",
                index: "el_type",
                hidden: !0
            }, {
                name: "el_id",
                index: "el_id",
                hidden: !0
            }, {
                name: "icon",
                index: "icon",
                width: 20,
                sortable: !1,
                align: "center"
            }, {
                name: "datetime",
                index: "datetime",
                width: 110,
                sortable: !1,
                datefmt: "Y-m-d H:i:s",
                align: "center"
            }, {
                name: "info",
                index: "info",
                width: 178,
                sortable: !1
            }],
            width: "340",
            height: "100%",
            rowNum: 4096,
            shrinkToFit: !1,
            loadComplete: function(e) {
                for (var t = $(this).getDataIDs(), a = historyRouteData
                        .imei, o = 0; o < t.length; o++) {
                    var i = t[o],
                        s = $(this).jqGrid("getCell", i, "el_type"),
                        n = $(this).jqGrid("getCell", i, "el_id");
                    if ("point" == s) {
                        var l = "<table>";
                        if (l += "<tr><td>" + la.ROUTE_LENGTH +
                            ":</td><td>" + historyRouteData
                            .route_length + " " + la.UNIT_DISTANCE +
                            "</td></tr>", l += "<tr><td>" + la
                            .MOVE_DURATION + ":</td><td>" +
                            historyRouteData.drives_duration +
                            "</td></tr>", l += "<tr><td>" + la
                            .STOP_DURATION + ":</td><td>" +
                            historyRouteData.stops_duration +
                            "</td></tr>", l += "<tr><td>" + la
                            .TOP_SPEED + ":</td><td>" + historyRouteData
                            .top_speed + " " + la.UNIT_SPEED +
                            "</td></tr>", l += "<tr><td>" + la
                            .AVG_SPEED + ":</td><td>" + historyRouteData
                            .avg_speed + " " + la.UNIT_SPEED +
                            "</td></tr>", 0 != (_ = historyRouteData
                                .fuel_consumption) && (l += "<tr><td>" +
                                la.FUEL_CONSUMPTION + ":</td><td>" + _ +
                                " " + la.UNIT_CAPACITY + "</td></tr>"),
                            "l" == settingsUserData.unit_capacity) 0 !=
                            (d = historyRouteData
                                .fuel_consumption_per_100km) && (l +=
                                "<tr><td>" + la
                                .AVG_FUEL_CONSUMPTION_100_KM +
                                ":</td><td>" + d + " " + la
                                .UNIT_CAPACITY + "</td></tr>");
                        else 0 != (r = historyRouteData
                            .fuel_consumption_mpg) && (l +=
                            "<tr><td>" + la
                            .AVG_FUEL_CONSUMPTION_MPG +
                            ":</td><td>" + r + " " + la.UNIT_MI +
                            "</td></tr>");
                        0 != (c = historyRouteData.fuel_cost) && (l +=
                                "<tr><td>" + la.FUEL_COST +
                                ":</td><td>" + c + " " +
                                settingsUserData.currency + "</td></tr>"
                                ), 0 != getSensorFromType(a, "acc") && (
                                l += "<tr><td>" + la.ENGINE_WORK +
                                ":</td><td>" + historyRouteData
                                .engine_work + "</td></tr>", l +=
                                "<tr><td>" + la.ENGINE_IDLE +
                                ":</td><td>" + historyRouteData
                                .engine_idle + "</td></tr>"), l +=
                            "</table>"
                    } else if ("drive" == s) {
                        var d, r;
                        l = "<table>";
                        if (l += "<tr><td>" + la.ROUTE_LENGTH +
                            ":</td><td>" + historyRouteData.drives[n]
                            .route_length + " " + la.UNIT_DISTANCE +
                            "</td></tr>", l += "<tr><td>" + la
                            .TOP_SPEED + ":</td><td>" + historyRouteData
                            .drives[n].top_speed + " " + la.UNIT_SPEED +
                            "</td></tr>", l += "<tr><td>" + la
                            .AVG_SPEED + ":</td><td>" + historyRouteData
                            .drives[n].avg_speed + " " + la.UNIT_SPEED +
                            "</td></tr>", 0 != (_ = historyRouteData
                                .drives[n].fuel_consumption) && (l +=
                                "<tr><td>" + la.FUEL_CONSUMPTION +
                                ":</td><td>" + _ + " " + la
                                .UNIT_CAPACITY + "</td></tr>"), "l" ==
                            settingsUserData.unit_capacity) 0 != (d =
                            historyRouteData.drives[n]
                            .fuel_consumption_per_100km) && (l +=
                            "<tr><td>" + la
                            .AVG_FUEL_CONSUMPTION_100_KM +
                            ":</td><td>" + d + " " + la
                            .UNIT_CAPACITY + "</td></tr>");
                        else 0 != (r = historyRouteData.drives[n]
                            .fuel_consumption_mpg) && (l +=
                            "<tr><td>" + la
                            .AVG_FUEL_CONSUMPTION_MPG +
                            ":</td><td>" + r + " " + la.UNIT_MI +
                            "</td></tr>");
                        0 != (c = historyRouteData.drives[n]
                            .fuel_cost) && (l += "<tr><td>" + la
                                .FUEL_COST + ":</td><td>" + c + " " +
                                settingsUserData.currency + "</td></tr>"
                                ), l += "</table>"
                    } else if ("stop" == s) {
                        var _, c;
                        l = "<table>";
                        l += "<tr><td>" + la.ARRIVED + ":</td><td>" +
                            historyRouteData.stops[n].dt_start +
                            "</td></tr>", l += "<tr><td>" + la
                            .DEPARTED + ":</td><td>" + historyRouteData
                            .stops[n].dt_end + "</td></tr>", 0 != (_ =
                                historyRouteData.stops[n]
                                .fuel_consumption) && (l += "<tr><td>" +
                                la.FUEL_CONSUMPTION + ":</td><td>" + _ +
                                " " + la.UNIT_CAPACITY + "</td></tr>"),
                            0 != (c = historyRouteData.stops[n]
                                .fuel_cost) && (l += "<tr><td>" + la
                                .FUEL_COST + ":</td><td>" + c + " " +
                                settingsUserData.currency + "</td></tr>"
                                ), 0 != getSensorFromType(a, "acc") && (
                                l += "<tr><td>" + la.ENGINE_IDLE +
                                ":</td><td>" + historyRouteData.stops[n]
                                .engine_idle + "</td></tr>"), l +=
                            "</table>"
                    }
                    "point" != s && "drive" != s && "stop" != s || $(
                        "#side_panel_history_route_detail_list_grid #" +
                        i).qtip({
                        content: l,
                        position: {
                            my: "left bottom",
                            adjust: {
                                x: 0,
                                y: -9
                            }
                        }
                    })
                }
            },
            onSelectRow: function(e) {
                var t = $(this).jqGrid("getCell", e, "el_type"),
                    a = $(this).jqGrid("getCell", e, "el_id");
                "point" == t ? (0 == historyRouteData.play.status &&
                    historyRoutePanToPoint(a),
                    historyRouteShowPoint(a, !0)) : "stop" == t ? (
                    0 == historyRouteData.play.status &&
                    historyRoutePanToStop(a), historyRouteShowStop(
                        a)) : "event" == t ? (0 == historyRouteData
                    .play.status && historyRoutePanToEvent(a),
                    historyRouteShowEvent(a)) : "drive" == t && (
                    0 == historyRouteData.play.status &&
                    historyRouteRemovePointMarker(),
                    destroyMapPopup(), historyRouteShowDrive(a))
            }
        });
    e = '<div style="float: right;"><span>{0}</span></div>';
    $("#side_panel_history_route_datalist_grid").jqGrid({
            datatype: "local",
            colNames: ["", la.DATA, la.VALUE],
            colModel: [{
                name: "group_name",
                index: "group_name"
            }, {
                name: "data",
                index: "data",
                width: 110,
                sortable: !1
            }, {
                name: "value",
                index: "value",
                width: 203,
                sortable: !1
            }],
            width: "340",
            height: "155",
            rowNum: 512,
            grouping: !0,
            groupingView: {
                groupField: ["group_name"],
                groupColumnShow: [!1],
                groupText: [e],
                groupCollapse: !1,
                groupOrder: ["asc"],
                groupDataSorted: [!0]
            },
            shrinkToFit: !1
        }), $("#bottom_panel_msg_list_grid").jqGrid({
            url: "func/fn_history.php?cmd=load_msg_list_empty",
            datatype: "json",
            colNames: [la.TIME_POSITION, la.TIME_SERVER, la.LATITUDE, la
                .LONGITUDE, la.ALTITUDE, la.ANGLE, la.SPEED, la
                .PARAMETERS
            ],
            colModel: [{
                name: "dt_tracker",
                index: "dt_tracker",
                width: 120,
                fixed: !0,
                align: "center",
                sortable: !0
            }, {
                name: "dt_server",
                index: "dt_server",
                width: 120,
                fixed: !0,
                align: "center",
                sortable: !0
            }, {
                name: "lat",
                index: "lat",
                width: 100,
                fixed: !0,
                align: "center",
                sortable: !0
            }, {
                name: "lng",
                index: "lng",
                width: 100,
                fixed: !0,
                align: "center",
                sortable: !0
            }, {
                name: "altitude",
                index: "altitude",
                width: 90,
                fixed: !0,
                align: "center",
                sortable: !0
            }, {
                name: "angle",
                index: "angle",
                width: 80,
                fixed: !0,
                align: "center",
                sortable: !0
            }, {
                name: "speed",
                index: "speed",
                width: 80,
                fixed: !0,
                align: "center",
                sortable: !0
            }, {
                name: "params",
                index: "params",
                align: "left",
                sortable: !0
            }],
            sortname: "dt_tracker",
            sortorder: "desc",
            rowNum: 50,
            rowList: [25, 50, 100, 200, 300, 400, 500],
            pager: "#bottom_panel_msg_list_grid_pager",
            height: "111",
            beforeSelectRow: function(e, t) {
                if ("input" === t.target.tagName.toLowerCase()) return !
                    0;
                var a = $(this).jqGrid("getCell", e, "lat"),
                    o = $(this).jqGrid("getCell", e, "lng");
                return 0 != a && 0 != o && utilsPointOnMap(a, o), !1
            },
            shrinkToFit: !0,
            multiselect: !0
        }), $("#bottom_panel_msg_list_grid").jqGrid("navGrid",
            "#bottom_panel_msg_list_grid_pager", {
                add: !1,
                edit: !1,
                del: !1,
                search: !1
            }), $("#bottom_panel_msg_list_grid").navButtonAdd(
            "#bottom_panel_msg_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "bottom_panel_msg_list_grid_action_menu_button"
            }), $("#bottom_panel_msg_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#bottom_panel_msg_list_grid_action_menu").hide(), $(
            "#bottom_panel_msg_list_grid_action_menu_button").click(function() {
            return $("#bottom_panel_msg_list_grid_action_menu").toggle()
                .position({
                    my: "left bottom",
                    at: "right-5 top-5",
                    of: this
                }), $(document).one("click", function() {
                    $("#bottom_panel_msg_list_grid_action_menu").hide()
                }), !1
        }), $(window).bind("resize", function() {
            "none" == document.getElementById("side_panel").style.display ?
                $("#bottom_panel_msg_list_grid").setGridWidth($(window)
                    .width() - 23) : $("#bottom_panel_msg_list_grid")
                .setGridWidth($(window).width() - 384)
        }).trigger("resize"), $("#tasks_task_grid").jqGrid({
            url: "func/fn_tasks.php?cmd=load_task_list",
            datatype: "json",
            colNames: [la.TIME, la.NAME, la.OBJECT, la.START, la
                .DESTINATION, la.PRIORITY, la.STATUS, "", ""
            ],
            colModel: [{
                name: "dt_task",
                index: "dt_task",
                width: 60,
                align: "center",
                sortable: !0
            }, {
                name: "name",
                index: "name",
                width: 80,
                align: "left",
                sortable: !0
            }, {
                name: "imei",
                index: "imei",
                width: 80,
                align: "left",
                sortable: !1
            }, {
                name: "from",
                index: "from",
                width: 80,
                align: "left",
                sortable: !1
            }, {
                name: "to",
                index: "to",
                width: 80,
                align: "left",
                sortable: !1
            }, {
                name: "priority",
                index: "priority",
                width: 40,
                align: "center",
                sortable: !0
            }, {
                name: "status",
                index: "status",
                width: 40,
                align: "center",
                sortable: !0
            }, {
                name: "modify",
                index: "modify",
                width: 30,
                align: "center",
                sortable: !1
            }, {
                name: "scroll_fix",
                index: "scroll_fix",
                width: 13,
                sortable: !1,
                fixed: !0
            }],
            sortname: "dt_task",
            sortorder: "desc",
            rowNum: 50,
            rowList: [50, 100, 200, 300, 400, 500],
            pager: "#tasks_task_grid_pager",
            viewrecords: !0,
            height: "150px",
            width: "750",
            shrinkToFit: !0,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#tasks_task_grid").jqGrid("navGrid", "#tasks_task_grid_pager", {
            add: !0,
            edit: !1,
            del: !1,
            search: !1,
            addfunc: function(e) {
                taskProperties("add")
            }
        }), $("#tasks_task_grid").navButtonAdd("#tasks_task_grid_pager", {
            caption: "",
            title: la.ACTION,
            buttonicon: "ui-icon-action",
            onClickButton: function() {},
            position: "last",
            id: "task_list_grid_action_menu_button"
        }), $("#task_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#task_list_grid_action_menu").hide(), $(
            "#task_list_grid_action_menu_button").click(function() {
            return $("#task_list_grid_action_menu").toggle().position({
                my: "left bottom",
                at: "right-5 top-5",
                of: this
            }), $(document).one("click", function() {
                $("#task_list_grid_action_menu").hide()
            }), !1
        }), $("#reports_report_list_grid").jqGrid({
            url: "func/fn_reports.php?cmd=load_report_list",
            datatype: "json",
            colNames: [la.NAME, la.TYPE, la.FORMAT, la.OBJECTS, la.ZONES, la
                .SENSORS, la.DAILY, la.WEEKLY, ""
            ],
            colModel: [{
                name: "name",
                index: "name",
                width: 240,
                sortable: !0
            }, {
                name: "type",
                index: "type",
                width: 215,
                align: "center",
                sortable: !1
            }, {
                name: "format",
                index: "format",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "objects",
                index: "objects",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "zones",
                index: "zones",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "sensors",
                index: "sensors",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "daily",
                index: "daily",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "weekly",
                index: "weekly",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 60,
                align: "center",
                sortable: !1
            }],
            rowNum: 2048,
            pager: "#reports_report_list_grid_pager",
            pgbuttons: !1,
            pgtext: "",
            recordtext: "",
            emptyrecords: "",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            height: "380px",
            width: "962",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            },
            loadComplete: function(e) {
                for (var t = $(this).getDataIDs(), a = 0; a < t
                    .length; a++) {
                    var o = t[a];
                    $("#report_action_menu_" + o).click(function() {
                        return $("#report_action_menu").toggle()
                            .position({
                                my: "left top",
                                at: "right bottom",
                                of: this
                            }), menuOnItem = $(this).attr(
                            "tag"), $(document).one("click",
                                function() {
                                    $("#report_action_menu")
                                        .hide()
                                }), !1
                    })
                }
            }
        }), $("#reports_report_list_grid").jqGrid("navGrid",
            "#reports_report_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    reportProperties("add")
                }
            }), $("#reports_report_list_grid").navButtonAdd(
            "#reports_report_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "reports_report_list_grid_action_menu_button"
            }), $("#reports_report_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#reports_report_list_grid_action_menu").hide(), $(
            "#reports_report_list_grid_action_menu_button").click(function() {
            return $("#reports_report_list_grid_action_menu").toggle()
                .position({
                    my: "left bottom",
                    at: "right-5 top-5",
                    of: this
                }), $(document).one("click", function() {
                    $("#reports_report_list_grid_action_menu").hide()
                }), !1
        }), $("#reports_generated_list_grid").jqGrid({
            url: "func/fn_reports.php?cmd=load_reports_generated_list",
            datatype: "json",
            colNames: [la.TIME, la.NAME, la.TYPE, la.FORMAT, la.OBJECTS, la
                .ZONES, la.SENSORS, la.SCHEDULE, ""
            ],
            colModel: [{
                name: "dt_report",
                index: "dt_report",
                width: 110,
                fixed: !0,
                align: "center"
            }, {
                name: "name",
                index: "name",
                width: 215,
                sortable: !0
            }, {
                name: "type",
                index: "type",
                width: 190,
                align: "center",
                sortable: !1
            }, {
                name: "format",
                index: "format",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "objects",
                index: "objects",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "zones",
                index: "zones",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "sensors",
                index: "sensors",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "schedule",
                index: "schedule",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 60,
                align: "center",
                sortable: !1
            }],
            sortname: "dt_report",
            sortorder: "desc",
            rowNum: 50,
            rowList: [50, 100, 200, 300, 400, 500],
            pager: "#reports_generated_list_grid_pager",
            viewrecords: !0,
            height: "380px",
            width: "962",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#reports_generated_list_grid").jqGrid("navGrid",
            "#reports_generated_list_grid_pager", {
                add: !1,
                edit: !1,
                del: !1,
                search: !1
            }), $("#reports_generated_list_grid").navButtonAdd(
            "#reports_generated_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "reports_generated_list_grid_action_menu_button"
            }), $("#reports_generated_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#reports_generated_list_grid_action_menu").hide(), $(
            "#reports_generated_list_grid_action_menu_button").click(
    function() {
            return $("#reports_generated_list_grid_action_menu").toggle()
                .position({
                    my: "left bottom",
                    at: "right-5 top-5",
                    of: this
                }), $(document).one("click", function() {
                    $("#reports_generated_list_grid_action_menu").hide()
                }), !1
        }), $("#rilogbook_logbook_grid").jqGrid({
            url: "func/fn_rilogbook.php?cmd=load_rilogbook_list&drivers=true&passengers=true&trailers=true",
            datatype: "json",
            colNames: [la.TIME, la.OBJECT, la.GROUP, la.NAME, la.POSITION,
                "", ""
            ],
            colModel: [{
                name: "dt_tracker",
                index: "dt_tracker",
                width: 60,
                sortable: !0
            }, {
                name: "imei",
                index: "imei",
                width: 80,
                align: "left",
                sortable: !1
            }, {
                name: "group",
                index: "group",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "name",
                index: "name",
                width: 80,
                align: "left",
                sortable: !1
            }, {
                name: "position",
                index: "position",
                width: 175,
                align: "left",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 30,
                align: "center",
                sortable: !1
            }, {
                name: "scroll_fix",
                index: "scroll_fix",
                width: 13,
                sortable: !1,
                fixed: !0
            }],
            sortname: "dt_tracker",
            sortorder: "desc",
            rowNum: 50,
            rowList: [50, 100, 200, 300, 400, 500],
            pager: "#rilogbook_logbook_grid_pager",
            viewrecords: !0,
            height: "150px",
            width: "750",
            shrinkToFit: !0,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#rilogbook_logbook_grid").jqGrid("navGrid",
            "#rilogbook_logbook_grid_pager", {
                add: !1,
                edit: !1,
                del: !1,
                search: !1
            }), $("#rilogbook_logbook_grid").navButtonAdd(
            "#rilogbook_logbook_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "rilogbook_logbook_grid_action_menu_button"
            }), $("#rilogbook_logbook_grid_action_menu").menu({
            role: "listbox"
        }), $("#rilogbook_logbook_grid_action_menu").hide(), $(
            "#rilogbook_logbook_grid_action_menu_button").click(function() {
            return $("#rilogbook_logbook_grid_action_menu").toggle()
                .position({
                    my: "left bottom",
                    at: "right-5 top-5",
                    of: this
                }), $(document).one("click", function() {
                    $("#rilogbook_logbook_grid_action_menu").hide()
                }), !1
        }), $("#dtc_list_grid").jqGrid({
            url: "func/fn_dtc.php?cmd=load_dtc_list",
            datatype: "json",
            colNames: [la.TIME, la.OBJECT, la.CODE, la.POSITION, "", ""],
            colModel: [{
                name: "dt_tracker",
                index: "dt_tracker",
                width: 60,
                sortable: !0
            }, {
                name: "imei",
                index: "imei",
                width: 80,
                align: "left",
                sortable: !1
            }, {
                name: "code",
                index: "code",
                width: 60,
                align: "left",
                sortable: !1
            }, {
                name: "position",
                index: "position",
                width: 215,
                align: "left",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 30,
                align: "center",
                sortable: !1
            }, {
                name: "scroll_fix",
                index: "scroll_fix",
                width: 13,
                sortable: !1,
                fixed: !0
            }],
            sortname: "dt_tracker",
            sortorder: "desc",
            rowNum: 50,
            rowList: [50, 100, 200, 300, 400, 500],
            pager: "#dtc_list_grid_pager",
            viewrecords: !0,
            height: "150px",
            width: "750",
            shrinkToFit: !0,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#dtc_list_grid").jqGrid("navGrid", "#dtc_list_grid_pager", {
            add: !1,
            edit: !1,
            del: !1,
            search: !1
        }), $("#dtc_list_grid").navButtonAdd("#dtc_list_grid_pager", {
            caption: "",
            title: la.ACTION,
            buttonicon: "ui-icon-action",
            onClickButton: function() {},
            position: "last",
            id: "dtc_list_grid_action_menu_button"
        }), $("#dtc_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#dtc_list_grid_action_menu").hide(), $(
            "#dtc_list_grid_action_menu_button").click(function() {
            return $("#dtc_list_grid_action_menu").toggle().position({
                my: "left bottom",
                at: "right-5 top-5",
                of: this
            }), $(document).one("click", function() {
                $("#dtc_list_grid_action_menu").hide()
            }), !1
        }), $("#maintenance_list_grid").jqGrid({
            url: "func/fn_maintenance.php?cmd=load_maintenance_list",
            datatype: "json",
            colNames: [la.OBJECT, la.NAME, la.ODOMETER, la.ODOMETER_LEFT, la
                .ENGINE_HOURS, la.ENGINE_HOURS_LEFT, la.DAYS, la
                .DAYS_LEFT, la.EVENT, "", ""
            ],
            colModel: [{
                name: "object",
                index: "gs_objects.name",
                width: 100,
                sortable: !0
            }, {
                name: "name",
                index: "gs_object_services.name",
                width: 100,
                sortable: !0
            }, {
                name: "odometer",
                index: "odometer",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "odometer_left",
                index: "odometer_left",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "engine_hours",
                index: "engine_hours",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "engine_hours_left",
                index: "engine_hours_left",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "days",
                index: "days",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "days_left",
                index: "days_left",
                width: 60,
                align: "center",
                sortable: !1
            }, {
                name: "event",
                index: "event",
                width: 30,
                align: "center",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 30,
                align: "center",
                sortable: !1
            }, {
                name: "scroll_fix",
                index: "scroll_fix",
                width: 13,
                sortable: !1,
                fixed: !0
            }],
            sortname: "gs_objects.name",
            sortorder: "asc",
            rowNum: 50,
            rowList: [50, 100, 200, 300, 400, 500],
            pager: "#maintenance_list_grid_pager",
            viewrecords: !0,
            height: "150px",
            width: "750",
            shrinkToFit: !0,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#maintenance_list_grid").jqGrid("navGrid",
            "#maintenance_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    maintenanceServiceProperties("add")
                }
            }), $("#maintenance_list_grid").navButtonAdd(
            "#maintenance_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "maintenance_list_grid_action_menu_button"
            }), $("#maintenance_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#maintenance_list_grid_action_menu").hide(), $(
            "#maintenance_list_grid_action_menu_button").click(function() {
            return $("#maintenance_list_grid_action_menu").toggle()
                .position({
                    my: "left bottom",
                    at: "right-5 top-5",
                    of: this
                }), $(document).one("click", function() {
                    $("#maintenance_list_grid_action_menu").hide()
                }), !1
        }), $("#cmd_gprs_status_list_grid").jqGrid({
            url: "func/fn_cmd.php?cmd=load_cmd_gprs_exec_list",
            datatype: "json",
            colNames: [la.TIME, la.OBJECT, la.NAME, la.COMMAND, la.STATUS,
                "", ""
            ],
            colModel: [{
                name: "dt_cmd",
                index: "dt_cmd",
                width: 110,
                sortable: !0
            }, {
                name: "object",
                index: "object",
                width: 120,
                sortable: !1
            }, {
                name: "name",
                index: "name",
                width: 120,
                sortable: !1
            }, {
                name: "cmd",
                index: "cmd",
                width: 323,
                sortable: !1
            }, {
                name: "status",
                index: "status",
                width: 50,
                align: "center",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 30,
                align: "center",
                sortable: !1
            }, {
                name: "re_hex",
                index: "re_hex",
                hidden: !0
            }],
            rowNum: 2048,
            pager: "#cmd_gprs_status_list_grid_pager",
            pgbuttons: !1,
            pgtext: "",
            recordtext: "",
            emptyrecords: "",
            sortname: "dt_cmd",
            sortorder: "desc",
            viewrecords: !0,
            height: "316px",
            width: "850",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            },
            subGrid: !0,
            subGridRowExpanded: function(e, t) {
                var a = $("#cmd_gprs_status_list_grid").getRowData(t)
                    .re_hex,
                    o = hexToAscii(a),
                    i = "";
                "" == o && "" == a ? i = la.NO_DATA : (i =
                        '<table style="table-layout: fixed; width: 100%">',
                        i +=
                        '<tr><td style="width: 40px;">ASCII:</td><td style="word-wrap: break-word;">' +
                        o + "</td></tr>", i +=
                        '<tr><td>HEX:</td><td style="word-wrap:break-word;">' +
                        a + "</td></tr>", i += "</table>"), $("#" + e)
                    .html(i)
            }
        }), $("#cmd_gprs_status_list_grid").jqGrid("navGrid",
            "#cmd_gprs_status_list_grid_pager", {
                add: !1,
                edit: !1,
                del: !1,
                search: !1
            }), $("#cmd_gprs_status_list_grid").navButtonAdd(
            "#cmd_gprs_status_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "cmd_gprs_status_list_grid_action_menu_button"
            }), $("#cmd_gprs_status_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#cmd_gprs_status_list_grid_action_menu").hide(), $(
            "#cmd_gprs_status_list_grid_action_menu_button").click(function() {
            return $("#cmd_gprs_status_list_grid_action_menu").toggle()
                .position({
                    my: "left bottom",
                    at: "right-5 top-5",
                    of: this
                }), $(document).one("click", function() {
                    $("#cmd_gprs_status_list_grid_action_menu").hide()
                }), !1
        }), $("#cmd_sms_status_list_grid").jqGrid({
            url: "func/fn_cmd.php?cmd=load_cmd_sms_exec_list",
            datatype: "json",
            colNames: [la.TIME, la.OBJECT, la.NAME, la.COMMAND, la.STATUS,
                "", ""
            ],
            colModel: [{
                name: "dt_cmd",
                index: "dt_cmd",
                width: 110,
                sortable: !0
            }, {
                name: "object",
                index: "object",
                width: 120,
                sortable: !1
            }, {
                name: "name",
                index: "name",
                width: 120,
                sortable: !1
            }, {
                name: "cmd",
                index: "cmd",
                width: 348,
                sortable: !1
            }, {
                name: "status",
                index: "status",
                width: 50,
                align: "center",
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 30,
                align: "center",
                sortable: !1
            }, {
                name: "re_hex",
                index: "re_hex",
                hidden: !0
            }],
            rowNum: 2048,
            pager: "#cmd_sms_status_list_grid_pager",
            pgbuttons: !1,
            pgtext: "",
            recordtext: "",
            emptyrecords: "",
            sortname: "dt_cmd",
            sortorder: "desc",
            viewrecords: !0,
            height: "316px",
            width: "850",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#cmd_sms_status_list_grid").jqGrid("navGrid",
            "#cmd_sms_status_list_grid_pager", {
                add: !1,
                edit: !1,
                del: !1,
                search: !1
            }), $("#cmd_sms_status_list_grid").navButtonAdd(
            "#cmd_sms_status_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "cmd_sms_status_list_grid_action_menu_button"
            }), $("#cmd_sms_status_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#cmd_sms_status_list_grid_action_menu").hide(), $(
            "#cmd_sms_status_list_grid_action_menu_button").click(function() {
            return $("#cmd_sms_status_list_grid_action_menu").toggle()
                .position({
                    my: "left bottom",
                    at: "right-5 top-5",
                    of: this
                }), $(document).one("click", function() {
                    $("#cmd_sms_status_list_grid_action_menu").hide()
                }), !1
        }), $("#cmd_schedule_list_grid").jqGrid({
            url: "func/fn_cmd.php?cmd=load_cmd_schedule_list",
            datatype: "json",
            colNames: [la.NAME, la.ACTIVE, la.SCHEDULE, la.GATEWAY, la.TYPE,
                la.COMMAND, ""
            ],
            colModel: [{
                name: "name",
                index: "name",
                width: 150,
                sortable: !0
            }, {
                name: "active",
                index: "active",
                width: 60,
                align: "center",
                sortable: !0
            }, {
                name: "exact_time",
                index: "exact_time",
                width: 90,
                align: "center",
                sortable: !0
            }, {
                name: "gateway",
                index: "gateway",
                width: 60,
                align: "center",
                sortable: !0
            }, {
                name: "type",
                index: "type",
                width: 60,
                align: "center",
                sortable: !0
            }, {
                name: "cmd",
                index: "cmd",
                width: 308,
                sortable: !0
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            sortname: "name",
            sortorder: "asc",
            rowNum: 50,
            rowList: [25, 50, 100, 200],
            pager: "#cmd_schedule_list_grid_pager",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            height: "380px",
            width: "850",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#cmd_schedule_list_grid").jqGrid("navGrid",
            "#cmd_schedule_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    cmdScheduleProperties("add")
                }
            }), $("#cmd_schedule_list_grid").navButtonAdd(
            "#cmd_schedule_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "cmd_schedule_list_grid_action_menu_button"
            }), $("#cmd_schedule_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#cmd_schedule_list_grid_action_menu").hide(), $(
            "#cmd_schedule_list_grid_action_menu_button").click(function() {
            return $("#cmd_schedule_list_grid_action_menu").toggle()
                .position({
                    my: "left bottom",
                    at: "right-5 top-5",
                    of: this
                }), $(document).one("click", function() {
                    $("#cmd_schedule_list_grid_action_menu").hide()
                }), !1
        }), $("#cmd_template_list_grid").jqGrid({
            url: "func/fn_cmd.php?cmd=load_cmd_template_list",
            datatype: "json",
            colNames: [la.NAME, la.PROTOCOL, la.GATEWAY, la.TYPE, la
                .COMMAND, ""
            ],
            colModel: [{
                name: "name",
                index: "name",
                width: 150,
                sortable: !0
            }, {
                name: "protocol",
                index: "protocol",
                width: 150,
                align: "center",
                sortable: !0
            }, {
                name: "gateway",
                index: "gateway",
                width: 60,
                align: "center",
                sortable: !0
            }, {
                name: "type",
                index: "type",
                width: 60,
                align: "center",
                sortable: !0
            }, {
                name: "cmd",
                index: "cmd",
                width: 313,
                sortable: !0
            }, {
                name: "modify",
                index: "modify",
                width: 45,
                align: "center",
                sortable: !1
            }],
            sortname: "name",
            sortorder: "asc",
            rowNum: 50,
            rowList: [25, 50, 100, 200],
            pager: "#cmd_template_list_grid_pager",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            height: "380px",
            width: "850",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                return "input" === t.target.tagName.toLowerCase()
            }
        }), $("#cmd_template_list_grid").jqGrid("navGrid",
            "#cmd_template_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    cmdTemplateProperties("add")
                }
            }), $("#cmd_template_list_grid").navButtonAdd(
            "#cmd_template_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "cmd_template_list_grid_action_menu_button"
            }), $("#cmd_template_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#cmd_template_list_grid_action_menu").hide(), $(
            "#cmd_template_list_grid_action_menu_button").click(function() {
            return $("#cmd_template_list_grid_action_menu").toggle()
                .position({
                    my: "left bottom",
                    at: "right-5 top-5",
                    of: this
                }), $(document).one("click", function() {
                    $("#cmd_template_list_grid_action_menu").hide()
                }), !1
        }), $("#image_gallery_list_grid").jqGrid({
            url: "func/fn_img.php?cmd=load_img_list",
            datatype: "json",
            colNames: [la.TIME, la.OBJECT, "", "", "", "", ""],
            colModel: [{
                name: "dt_tracker",
                index: "dt_tracker",
                width: 110,
                sortable: !0
            }, {
                name: "object",
                index: "object",
                width: 111,
                sortable: !1
            }, {
                name: "modify",
                index: "modify",
                width: 30,
                align: "center",
                sortable: !1
            }, {
                name: "img_file",
                index: "img_file",
                hidden: !0
            }, {
                name: "lat",
                index: "lat",
                hidden: !0
            }, {
                name: "lng",
                index: "lng",
                hidden: !0
            }, {
                name: "speed",
                index: "speed",
                hidden: !0
            }],
            rowNum: 25,
            recordtext: "",
            emptyrecords: "",
            rowList: [25, 50, 75, 100],
            pager: "#image_gallery_list_grid_pager",
            sortname: "dt_tracker",
            sortorder: "desc",
            viewrecords: !0,
            height: "302px",
            width: "308",
            shrinkToFit: !1,
            multiselect: !0,
            beforeSelectRow: function(e, t) {
                if ("input" === t.target.tagName.toLowerCase()) return !
                    0;
                var a = "data/img/" + $(this).jqGrid("getCell", e,
                        "img_file"),
                    o = $(this).jqGrid("getCell", e, "lat"),
                    i = $(this).jqGrid("getCell", e, "lng");
                $(this).jqGrid("getCell", e, "speed");
                fileExist(a) ? document.getElementById(
                        "image_gallery_img").innerHTML =
                    '<img style="image-orientation: from-image; height: 480px;" src="' +
                    a + '">' : document.getElementById(
                        "image_gallery_img").innerHTML =
                    '<img src="img/no-image.svg">';
                var s =
                    '<table border="0" cellspacing="0" height="100%"><tr><td style="white-space:nowrap;">' +
                    urlPosition(o, i) +
                    '<span id="image_gallery_img_data_address"></span></td></tr></table>';
                return document.getElementById("image_gallery_img_data")
                    .innerHTML = s, geocoderGetAddress(o, i, function(
                    e) {
                        "" != e && (document.getElementById(
                            "image_gallery_img_data_address"
                            ).innerHTML = " - " + e)
                    }), !1
            }
        }), $("#image_gallery_list_grid").jqGrid("navGrid",
            "#image_gallery_list_grid_pager", {
                add: !1,
                edit: !1,
                del: !1,
                search: !1
            }), $("#image_gallery_list_grid").navButtonAdd(
            "#image_gallery_list_grid_pager", {
                caption: "",
                title: la.ACTION,
                buttonicon: "ui-icon-action",
                onClickButton: function() {},
                position: "last",
                id: "image_gallery_list_grid_action_menu_button"
            }), $("#image_gallery_list_grid_action_menu").menu({
            role: "listbox"
        }), $("#image_gallery_list_grid_action_menu").hide(), $(
            "#image_gallery_list_grid_action_menu_button").click(function() {
            return $("#image_gallery_list_grid_action_menu").toggle()
                .position({
                    my: "left bottom",
                    at: "right-5 top-5",
                    of: this
                }), $(document).one("click", function() {
                    $("#image_gallery_list_grid_action_menu").hide()
                }), !1
        }), $("#chat_object_list_grid").jqGrid({
            datatype: "local",
            colNames: ["", "", la.OBJECT],
            colModel: [{
                name: "search",
                index: "search",
                hidden: !0
            }, {
                name: "icon",
                index: "icon",
                width: 28,
                sortable: !1
            }, {
                name: "name",
                index: "search",
                width: 170
            }],
            rowNum: 2048,
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            width: "225",
            shrinkToFit: !1,
            loadComplete: function(e) {
                chatUpdateMsgCount(), chatUpdateMsgDt()
            },
            onSelectRow: function(e) {
                chatSelectObject(e)
            }
        }), $("#chat_object_list_search").bind("keyup", function(e) {
            var t = $("#chat_object_list_grid"),
                a = t.jqGrid("getGridParam", "postData");
            jQuery.extend(a, {
                filters: "",
                searchField: "search",
                searchOper: "cn",
                searchString: this.value.toLowerCase()
            }), t.jqGrid("setGridParam", {
                search: !0,
                postData: a
            }), t.trigger("reloadGrid")
        }), $("#billing_plan_list_grid").jqGrid({
            url: "func/fn_billing.php?cmd=load_billing_plan_list",
            datatype: "json",
            colNames: [la.TIME, la.NAME, la.OBJECTS, la.PERIOD, la.PRICE,
                ""],
            colModel: [{
                name: "dt_purchase",
                index: "dt_purchase",
                width: 110,
                fixed: !0,
                align: "center"
            }, {
                name: "name",
                index: "name",
                width: 248
            }, {
                name: "objects",
                index: "objects",
                width: 95,
                fixed: !0,
                align: "center"
            }, {
                name: "period",
                index: "period",
                width: 95,
                fixed: !0,
                align: "center"
            }, {
                name: "price",
                index: "price",
                width: 95,
                fixed: !0,
                align: "center"
            }, {
                name: "modify",
                index: "modify",
                width: 30,
                align: "center",
                sortable: !1
            }],
            rowNum: 50,
            rowList: [25, 50, 75, 100, 200],
            pager: "#billing_plan_list_grid_pager",
            sortname: "dt_purchase",
            sortorder: "desc",
            viewrecords: !0,
            height: "388px",
            width: "720",
            shrinkToFit: !1
        }), $("#billing_plan_list_grid").jqGrid("navGrid",
            "#billing_plan_list_grid_pager", {
                add: !0,
                edit: !1,
                del: !1,
                search: !1,
                addfunc: function(e) {
                    billingPlanPurchase()
                },
                addtitle: la.PURCHASE_PLAN
            }), $("#billing_plan_object_list_grid").jqGrid({
            datatype: "local",
            colNames: ["", la.NAME, la.IMEI, la.ACTIVE, la.EXPIRES_ON],
            colModel: [{
                name: "name_sort",
                index: "name_sort",
                hidden: !0
            }, {
                name: "name",
                index: "name_sort",
                width: 244
            }, {
                name: "imei",
                index: "imei",
                width: 160
            }, {
                name: "active",
                index: "active",
                width: 90,
                align: "center"
            }, {
                name: "object_expire_dt",
                index: "object_expire_dt",
                width: 110,
                align: "center"
            }],
            rowNum: 2048,
            pager: "#billing_plan_object_list_grid_pager",
            pgbuttons: !1,
            pgtext: "",
            recordtext: "",
            emptyrecords: "",
            sortname: "name",
            sortorder: "asc",
            viewrecords: !0,
            height: "270",
            width: "665",
            shrinkToFit: !1,
            multiselect: !0,
            onSelectRow: function(e) {
                billingPlanUseUpdateSelection()
            },
            onSelectAll: function(e) {
                billingPlanUseUpdateSelection()
            }
        }), $("#billing_plan_object_list_grid").jqGrid("navGrid",
            "#billing_plan_object_list_grid_pager", {
                add: !1,
                edit: !1,
                del: !1,
                search: !1,
                refresh: !1
            }), $(".ui-jqgrid-titlebar-close").hide(), $(".ui-pg-selbox")
        .multipleSelect({
            single: !0,
            width: "50px"
        }), $(window).bind("resize", function() {
            resizeGrids()
        }).trigger("resize")
}

function gridElementTypeToggle(e, t, a) {
    var o = (e = $(e)).getRowData().length;
    for (i = 0; i < o; i++) e.jqGrid("getCell", i, "el_type") == t && $("#" + i,
        e).css({
        display: a
    })
}

function switchDateFilter(e) {
    if ("history" == e) var t = "side_panel_history_";
    else if ("report" == e) t = "dialog_report_";
    else if ("tasks" == e) t = "dialog_tasks_";
    else if ("rilogbook" == e) t = "dialog_rilogbook_";
    else if ("dtc" == e) t = "dialog_dtc_";
    else if ("img" == e) t = "dialog_image_gallery_";
    switch (document.getElementById(t + "hour_from").value = "00", document
        .getElementById(t + "hour_to").value = "00", document.getElementById(t +
            "minute_from").value = "00", document.getElementById(t +
            "minute_to").value = "00", document.getElementById(t + "filter")
        .value) {
        case "0":
            document.getElementById(t + "date_from").value = moment().format(
                    "YYYY-MM-DD"), document.getElementById(t + "date_to")
                .value = moment().format("YYYY-MM-DD");
            break;
        case "1":
            document.getElementById(t + "date_from").value = moment().format(
                    "YYYY-MM-DD"), document.getElementById(t + "date_to")
                .value = moment().format("YYYY-MM-DD"), document.getElementById(
                    t + "hour_from").value = moment().subtract("hour", 1)
                .format("HH"), document.getElementById(t + "hour_to").value =
                moment().format("HH"), document.getElementById(t +
                    "minute_from").value = moment().subtract("hour", 1).format(
                    "mm"), document.getElementById(t + "minute_to").value =
                moment().format("mm");
            break;
        case "2":
            document.getElementById(t + "date_from").value = moment().format(
                    "YYYY-MM-DD"), document.getElementById(t + "date_to")
                .value = moment().add("days", 1).format("YYYY-MM-DD");
            break;
        case "3":
            document.getElementById(t + "date_from").value = moment().subtract(
                "days", 1).format("YYYY-MM-DD"), document.getElementById(t +
                "date_to").value = moment().format("YYYY-MM-DD");
            break;
        case "4":
            document.getElementById(t + "date_from").value = moment().subtract(
                "days", 2).format("YYYY-MM-DD"), document.getElementById(t +
                "date_to").value = moment().subtract("days", 1).format(
                "YYYY-MM-DD");
            break;
        case "5":
            document.getElementById(t + "date_from").value = moment().subtract(
                "days", 3).format("YYYY-MM-DD"), document.getElementById(t +
                "date_to").value = moment().subtract("days", 2).format(
                "YYYY-MM-DD");
            break;
        case "6":
            document.getElementById(t + "date_from").value = moment()
                .isoWeekday(1).format("YYYY-MM-DD"), document.getElementById(t +
                    "date_to").value = moment().add("days", 1).format(
                    "YYYY-MM-DD");
            break;
        case "7":
            document.getElementById(t + "date_from").value = moment()
                .isoWeekday(1).subtract("week", 1).format("YYYY-MM-DD"),
                document.getElementById(t + "date_to").value = moment()
                .isoWeekday(1).format("YYYY-MM-DD");
            break;
        case "8":
            document.getElementById(t + "date_from").value = moment().startOf(
                "month").format("YYYY-MM-DD"), document.getElementById(t +
                "date_to").value = moment().add("days", 1).format(
                "YYYY-MM-DD");
            break;
        case "9":
            document.getElementById(t + "date_from").value = moment().startOf(
                    "month").subtract("month", 1).format("YYYY-MM-DD"), document
                .getElementById(t + "date_to").value = moment().startOf("month")
                .format("YYYY-MM-DD")
    }
    $("#" + t + "hour_from").multipleSelect("refresh"), $("#" + t + "hour_to")
        .multipleSelect("refresh"), $("#" + t + "minute_from").multipleSelect(
            "refresh"), $("#" + t + "minute_to").multipleSelect("refresh")
}

function historyLoadGSR() {
    utilsCheckPrivileges("history") && (document.getElementById("load_file")
        .addEventListener("change", historyLoadGSRFile, !1), document
        .getElementById("load_file").click())
}

function historyLoadGSRFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        loadingData(!0);
        try {
            var t = $.parseJSON(e.target.result);
            "0.2v" == t.gsr ? null != settingsObjectData[t.imei] ?
                historyShowRoute(transformToHistoryRoute(t.route), t.imei, t
                    .name) : notifyBox("error", la.ERROR, la
                    .THERE_IS_NO_SUCH_OBJECT_IN_YOUR_ACCOUNT) : notifyBox(
                    "error", la.ERROR, la.INVALID_FILE_FORMAT)
        } catch (e) {
            notifyBox("error", la.ERROR, la.INVALID_FILE_FORMAT)
        }
        loadingData(!1), document.getElementById("load_file").value = ""
    }, a.readAsText(t[0], "UTF-8"), this.removeEventListener("change",
        historyLoadGSRFile, !1)
}

function historyExportGSR() {
    if (utilsCheckPrivileges("history")) {
        var e = document.getElementById("side_panel_history_object_list").value,
            t = document.getElementById("side_panel_history_object_list")
            .options[document.getElementById("side_panel_history_object_list")
                .selectedIndex].text,
            a = document.getElementById("side_panel_history_date_from").value +
            " " + document.getElementById("side_panel_history_hour_from")
            .value + ":" + document.getElementById(
                "side_panel_history_minute_from").value + ":00",
            o = document.getElementById("side_panel_history_date_to").value +
            " " + document.getElementById("side_panel_history_hour_to").value +
            ":" + document.getElementById("side_panel_history_minute_to")
            .value + ":00",
            i = document.getElementById("side_panel_history_stop_duration")
            .value;
        if ("" != e) {
            var s = "func/fn_export.php?format=gsr&imei=" + e + "&name=" + t +
                "&dtf=" + a + "&dtt=" + o + "&min_stop_duration=" + i;
            window.location = s
        } else notifyBox("info", la.INFORMATION, la
            .NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST)
    }
}

function historyExportKML() {
    if (utilsCheckPrivileges("history")) {
        var e = document.getElementById("side_panel_history_object_list").value,
            t = document.getElementById("side_panel_history_object_list")
            .options[document.getElementById("side_panel_history_object_list")
                .selectedIndex].text,
            a = document.getElementById("side_panel_history_date_from").value +
            " " + document.getElementById("side_panel_history_hour_from")
            .value + ":" + document.getElementById(
                "side_panel_history_minute_from").value + ":00",
            o = document.getElementById("side_panel_history_date_to").value +
            " " + document.getElementById("side_panel_history_hour_to").value +
            ":" + document.getElementById("side_panel_history_minute_to")
            .value + ":00";
        if ("" != e) {
            var i = "func/fn_export.php?format=kml&imei=" + e + "&name=" + t +
                "&dtf=" + a + "&dtt=" + o;
            window.location = i
        } else notifyBox("info", la.INFORMATION, la
            .NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST)
    }
}

function historyExportGPX() {
    if (utilsCheckPrivileges("history")) {
        var e = document.getElementById("side_panel_history_object_list").value,
            t = document.getElementById("side_panel_history_object_list")
            .options[document.getElementById("side_panel_history_object_list")
                .selectedIndex].text,
            a = document.getElementById("side_panel_history_date_from").value +
            " " + document.getElementById("side_panel_history_hour_from")
            .value + ":" + document.getElementById(
                "side_panel_history_minute_from").value + ":00",
            o = document.getElementById("side_panel_history_date_to").value +
            " " + document.getElementById("side_panel_history_hour_to").value +
            ":" + document.getElementById("side_panel_history_minute_to")
            .value + ":00";
        if ("" != e) {
            var i = "func/fn_export.php?format=gpx&imei=" + e + "&name=" + t +
                "&dtf=" + a + "&dtt=" + o;
            window.location = i
        } else notifyBox("info", la.INFORMATION, la
            .NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST)
    }
}

function historyExportCSV() {
    if (utilsCheckPrivileges("history")) {
        var e = document.getElementById("side_panel_history_object_list").value,
            t = document.getElementById("side_panel_history_object_list")
            .options[document.getElementById("side_panel_history_object_list")
                .selectedIndex].text,
            a = document.getElementById("side_panel_history_date_from").value +
            " " + document.getElementById("side_panel_history_hour_from")
            .value + ":" + document.getElementById(
                "side_panel_history_minute_from").value + ":00",
            o = document.getElementById("side_panel_history_date_to").value +
            " " + document.getElementById("side_panel_history_hour_to").value +
            ":" + document.getElementById("side_panel_history_minute_to")
            .value + ":00";
        if ("" != e) {
            var i = "func/fn_export.php?format=history_csv&imei=" + e +
                "&name=" + t + "&dtf=" + a + "&dtt=" + o;
            window.location = i
        } else notifyBox("info", la.INFORMATION, la
            .NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST)
    }
}

function historySaveAsRoute() {
    if (utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        utilsCheckPrivileges("history") && 1 != gsValues.map_bussy) {
        var e = document.getElementById("side_panel_history_object_list").value,
            t = (document.getElementById("side_panel_history_object_list")
                .options[document.getElementById(
                    "side_panel_history_object_list").selectedIndex].text,
                document.getElementById("side_panel_history_date_from").value +
                " " + document.getElementById("side_panel_history_hour_from")
                .value + ":" + document.getElementById(
                    "side_panel_history_minute_from").value + ":00"),
            a = document.getElementById("side_panel_history_date_to").value +
            " " + document.getElementById("side_panel_history_hour_to").value +
            ":" + document.getElementById("side_panel_history_minute_to")
            .value + ":00",
            o = document.getElementById("side_panel_history_stop_duration")
            .value;
        if ("" != e) {
            loadingData(!0);
            var s = {
                cmd: "load_route_data",
                imei: e,
                dtf: t,
                dtt: a,
                min_stop_duration: o
            };
            $.ajax({
                type: "POST",
                url: "func/fn_history.php",
                data: s,
                dataType: "json",
                cache: !1,
                success: function(e) {
                    var t = transformToHistoryRoute(e);
                    if ("" == t.route || t.route.length < 2)
                    return notifyBox("info", la.INFORMATION, la
                            .NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST
                            ), void loadingData(!1);
                    var a = Math.ceil(t.route.length / 200),
                        o = new Array;
                    for (i = 0; i < t.route.length; i += a) {
                        var s = t.route[i].lat,
                            n = t.route[i].lng;
                        o.push(L.latLng(s, n))
                    }
                    loadingData(!1), placesRouteSave(o)
                },
                error: function(e, t) {
                    notifyBox("info", la.INFORMATION, la
                            .NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST
                            ), loadingData(!1)
                }
            })
        } else notifyBox("info", la.INFORMATION, la
            .NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST)
    }
}
var historyRouteData = new Array,
    historyGraphPlot, historyRouteToggle = new Array,
    timer_historyRoutePlay;

function historyLoadRoute() {
    if (utilsCheckPrivileges("history")) {
        var e = document.getElementById("side_panel_history_object_list").value,
            t = document.getElementById("side_panel_history_object_list")
            .options[document.getElementById("side_panel_history_object_list")
                .selectedIndex].text,
            a = document.getElementById("side_panel_history_date_from").value +
            " " + document.getElementById("side_panel_history_hour_from")
            .value + ":" + document.getElementById(
                "side_panel_history_minute_from").value + ":00",
            o = document.getElementById("side_panel_history_date_to").value +
            " " + document.getElementById("side_panel_history_hour_to").value +
            ":" + document.getElementById("side_panel_history_minute_to")
            .value + ":00",
            i = document.getElementById("side_panel_history_stop_duration")
            .value;
        if ("" != e) {
            loadingData(!0);
            var s = {
                cmd: "load_route_data",
                imei: e,
                dtf: a,
                dtt: o,
                min_stop_duration: i
            };
            $.ajax({
                type: "POST",
                url: "func/fn_history.php",
                data: s,
                dataType: "json",
                cache: !1,
                success: function(i) {
                    historyShowRoute(transformToHistoryRoute(i), e,
                            t), $("#bottom_panel_msg_list_grid")
                        .setGridParam({
                            url: "func/fn_history.php?cmd=load_msg_list&imei=" +
                                e + "&dtf=" + a + "&dtt=" + o
                        }), $("#bottom_panel_msg_list_grid")
                        .trigger("reloadGrid")
                },
                error: function(e, t) {
                    notifyBox("info", la.INFORMATION, la
                            .NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST
                            ), loadingData(!1)
                }
            })
        } else notifyBox("info", la.INFORMATION, la
            .NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST)
    }
}

function historyShowRoute(e, t, a) {
    if (historyHideRoute(), objectFollowAll(!1), "" == (historyRouteData = e)
        .route || historyRouteData.route.length < 2) return notifyBox("info", la
            .INFORMATION, la.NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST),
        loadingData(!1), void(historyRouteData = []);
    historyRouteData.name = a, historyRouteData.imei = t, historyRouteData
        .layers = new Array, historyRouteData.layers.route = !1,
        historyRouteData.layers.route_snap = !1, historyRouteData.layers
        .arrows = !1, historyRouteData.layers.arrows_snap = !1, historyRouteData
        .layers.stops = new Array, historyRouteData.layers.events = new Array,
        historyRouteData.layers.data_points = new Array, historyRouteData.play =
        new Array, historyRouteData.play.status = !1, historyRouteData.play
        .position = 0;
    var o = new Array;
    for (n = 0; n < historyRouteData.route.length; n++) {
        var i = historyRouteData.route[n].lat,
            s = historyRouteData.route[n].lng;
        o.push(L.latLng(i, s)), historyRouteAddDataPointMarkerToMap(n)
    }
    for (historyRouteData.layers.route = L.polyline(o, {
            color: settingsUserData.map_rc,
            opacity: .8,
            weight: 3
        }), mapLayers.history.addLayer(historyRouteData.layers.route),
        historyRouteData.layers.arrows = L.polylineDecorator(historyRouteData
            .layers.route, {
                patterns: [{
                    offset: 25,
                    repeat: 250,
                    symbol: L.Symbol.arrowHead({
                        pixelSize: 14,
                        headAngle: 40,
                        pathOptions: {
                            fillOpacity: 1,
                            weight: 0
                        }
                    })
                }]
            }), mapLayers.history.addLayer(historyRouteData.layers.arrows),
        historyRouteAddStartMarkerToMap(), historyRouteAddEndMarkerToMap(), n =
        0; n < historyRouteData.stops.length; n++)
        historyRouteAddStopMarkerToMap(n);
    for (n = 0; n < historyRouteData.events.length; n++)
        historyRouteAddEventMarkerToMap(n);
    for ((e = []).push({
            el_type: "point",
            el_id: 0,
            icon: '<img src="img/markers/route-start.svg"/>',
            datetime: historyRouteData.route[0].dt_tracker,
            info: ""
        }), e.push({
            el_type: "point",
            el_id: historyRouteData.route.length - 1,
            icon: '<img src="img/markers/route-end.svg"/>',
            datetime: historyRouteData.route[historyRouteData.route.length -
                1].dt_tracker,
            info: ""
        }), n = 0; n < historyRouteData.stops.length; n++) e.push({
        el_type: "stop",
        el_id: n,
        icon: '<img src="img/markers/route-stop.svg"/>',
        datetime: historyRouteData.stops[n].dt_start,
        info: historyRouteData.stops[n].duration
    });
    for (n = 0; n < historyRouteData.events.length; n++) e.push({
        el_type: "event",
        el_id: n,
        icon: '<img src="img/markers/route-event.svg"/>',
        datetime: historyRouteData.events[n].dt_tracker,
        info: historyRouteData.events[n].event_desc
    });
    for (n = 0; n < historyRouteData.drives.length; n++) e.push({
        el_type: "drive",
        el_id: n,
        icon: '<img src="img/markers/route-drive.svg"/>',
        datetime: historyRouteData.drives[n].dt_start,
        info: historyRouteData.drives[n].duration
    });
    for (var n = 0; n <= e.length; n++) $(
        "#side_panel_history_route_detail_list_grid").jqGrid("addRowData",
        n, e[n]);
    $("#side_panel_history_route_detail_list_grid").setGridParam({
            sortname: "datetime",
            sortorder: "asc"
        }).trigger("reloadGrid"), historyRouteRoute(), historyRouteSnap(),
        historyRouteDataPoints(), historyRouteStops(), historyRouteEvents();
    var l = historyRouteData.layers.route.getBounds();
    map.fitBounds(l), $("#side_panel").tabs("option", "active", 3),
        showBottomPanel(), $("#bottom_panel_tabs").tabs("option", "active", 1),
        "bottom_panel" == settingsUserData.datalist && datalistBottomSwitch(
            "route"), historyRouteShowPoint(0, !1),
        historyRouteCreateGraphSourceList(), historyRouteCreateGraph("speed"),
        document.getElementById("history_view_control").style.display = "block",
        loadingData(!1)
}

function historyHideRoute() {
    null != historyRouteData.route && (document.getElementById(
            "history_view_control").style.display = "none", document
        .getElementById("bottom_panel_graph_label").innerHTML = "",
        datalistClear("route"), initGraph(), $(
            "#bottom_panel_msg_list_grid").clearGridData(!0), $(
            "#side_panel_history_route_detail_list_grid").clearGridData(!0),
        mapLayers.history.clearLayers(), historyRouteStop(), $(".qtip")
        .each(function() {
            $(this).data("qtip").destroy()
        }), historyRouteData = [])
}

function historyRouteRouteToggle() {
    historyRouteToggle.route ? (historyRouteToggle.route = !1, document
        .getElementById("history_view_control_route").className =
        "icon-route-route disabled") : (historyRouteToggle.route = !0,
        document.getElementById("history_view_control_route").className =
        "icon-route-route"), historyRouteRoute()
}

function historyRouteRoute() {
    null != historyRouteData.layers && (mapLayers.history.removeLayer(
            historyRouteData.layers.route), 0 != historyRouteData.layers
        .route_snap && mapLayers.history.removeLayer(historyRouteData.layers
            .route_snap), historyRouteToggle.route && (0 != historyRouteData
            .layers.route_snap && historyRouteToggle.snap ? mapLayers
            .history.addLayer(historyRouteData.layers.route_snap) :
            mapLayers.history.addLayer(historyRouteData.layers.route)))
}

function historyRouteSnapToggle() {
    historyRouteToggle.snap ? (historyRouteToggle.snap = !1, document
        .getElementById("history_view_control_snap").className =
        "icon-route-snap disabled") : (historyRouteToggle.snap = !0,
        document.getElementById("history_view_control_snap").className =
        "icon-route-snap"), historyRouteSnap()
}

function historyRouteSnap() {
    if (null != historyRouteData.route)
        if (historyRouteToggle.snap)
            if (0 == historyRouteData.layers.route_snap && 0 == historyRouteData
                .layers.arrows_snap) {
                var e = new Array,
                    t = Math.floor(historyRouteData.route.length / 99);
                for (t < 1 && (t = 1), i = 0; i < historyRouteData.route
                    .length; i += t) lat = historyRouteData.route[i].lat, lng =
                    historyRouteData.route[i].lng, e.push(L.latLng(lat, lng));
                if (lat = historyRouteData.route[historyRouteData.route.length -
                        1].lat, lng = historyRouteData.route[historyRouteData
                        .route.length - 1].lng, e.push(L.latLng(lat, lng)),
                    "" == gsValues.routing_osmr_service_url) var a = L.Routing
                    .control({
                        waypoints: e,
                        show: !1,
                        showAlternatives: !1,
                        waypointMode: "snap",
                        createMarker: function() {}
                    }).addTo(map);
                else a = L.Routing.control({
                    waypoints: e,
                    show: !1,
                    showAlternatives: !1,
                    waypointMode: "snap",
                    createMarker: function() {},
                    router: new L.Routing.OSRMv1({
                        serviceUrl: gsValues
                            .routing_osmr_service_url
                    })
                }).addTo(map);
                a.on("routeselected", function(t) {
                    e = t.route.coordinates, mapLayers.history
                        .removeLayer(historyRouteData.layers.route),
                        mapLayers.history.removeLayer(historyRouteData
                            .layers.arrows), historyRouteData.layers
                        .route_snap = L.polyline(e, {
                            color: settingsUserData.map_rc,
                            opacity: .8,
                            weight: 3
                        }), mapLayers.history.addLayer(historyRouteData
                            .layers.route_snap), historyRouteData.layers
                        .arrows_snap = L.polylineDecorator(
                            historyRouteData.layers.route_snap, {
                                patterns: [{
                                    offset: 25,
                                    repeat: 250,
                                    symbol: L.Symbol.arrowHead({
                                        pixelSize: 14,
                                        headAngle: 40,
                                        pathOptions: {
                                            fillOpacity: 1,
                                            weight: 0
                                        }
                                    })
                                }]
                            }), mapLayers.history.addLayer(
                            historyRouteData.layers.arrows_snap), map
                        .removeControl(a), historyRouteArrows()
                })
            } else historyRouteRoute(), historyRouteArrows();
    else historyRouteRoute(), historyRouteArrows()
}

function historyRouteArrowsToggle() {
    historyRouteToggle.arrows ? (historyRouteToggle.arrows = !1, document
        .getElementById("history_view_control_arrows").className =
        "icon-route-arrow disabled") : (historyRouteToggle.arrows = !0,
        document.getElementById("history_view_control_arrows").className =
        "icon-route-arrow"), historyRouteArrows()
}

function historyRouteArrows() {
    null != historyRouteData.layers && (mapLayers.history.removeLayer(
            historyRouteData.layers.arrows), 0 != historyRouteData.layers
        .arrows_snap && mapLayers.history.removeLayer(historyRouteData
            .layers.arrows_snap), historyRouteToggle.arrows && (0 !=
            historyRouteData.layers.arrows_snap && historyRouteToggle.snap ?
            mapLayers.history.addLayer(historyRouteData.layers
            .arrows_snap) : mapLayers.history.addLayer(historyRouteData
                .layers.arrows)))
}

function historyRouteDataPointsToggle() {
    historyRouteToggle.data_points ? (historyRouteToggle.data_points = !1,
        document.getElementById("history_view_control_data_points")
        .className = "icon-route-data-point disabled") : (historyRouteToggle
        .data_points = !0, document.getElementById(
            "history_view_control_data_points").className =
        "icon-route-data-point"), historyRouteDataPoints()
}

function historyRouteDataPoints() {
    if (null != historyRouteData.layers)
        if (map.getZoom() >= 14)
            for (i = 0; i < historyRouteData.layers.data_points.length; i++) {
                var e = historyRouteData.layers.data_points[i];
                historyRouteToggle.data_points ? 0 == mapLayers.history
                    .hasLayer(e) && mapLayers.history.addLayer(e) : mapLayers
                    .history.removeLayer(e)
            } else
                for (i = 0; i < historyRouteData.layers.data_points
                    .length; i++) {
                    e = historyRouteData.layers.data_points[i];
                    mapLayers.history.removeLayer(e)
                }
}

function historyRouteStopsToggle() {
    historyRouteToggle.stops ? (historyRouteToggle.stops = !1, document
        .getElementById("history_view_control_stops").className =
        "icon-route-stop disabled") : (historyRouteToggle.stops = !0,
        document.getElementById("history_view_control_stops").className =
        "icon-route-stop"), historyRouteStops()
}

function historyRouteStops() {
    if (null != historyRouteData.layers) {
        for (i = 0; i < historyRouteData.layers.stops.length; i++) {
            var e = historyRouteData.layers.stops[i];
            historyRouteToggle.stops ? mapLayers.history.addLayer(e) : mapLayers
                .history.removeLayer(e)
        }
        historyRouteToggle.stops ? gridElementTypeToggle(
                "#side_panel_history_route_detail_list_grid", "stop", "") :
            gridElementTypeToggle("#side_panel_history_route_detail_list_grid",
                "stop", "none")
    }
}

function historyRouteEventsToggle() {
    historyRouteToggle.events ? (historyRouteToggle.events = !1, document
        .getElementById("history_view_control_events").className =
        "icon-route-event disabled") : (historyRouteToggle.events = !0,
        document.getElementById("history_view_control_events").className =
        "icon-route-event"), historyRouteEvents()
}

function historyRouteEvents() {
    if (null != historyRouteData.layers) {
        for (i = 0; i < historyRouteData.layers.events.length; i++) {
            var e = historyRouteData.layers.events[i];
            historyRouteToggle.events ? mapLayers.history.addLayer(e) :
                mapLayers.history.removeLayer(e)
        }
        historyRouteToggle.events ? gridElementTypeToggle(
                "#side_panel_history_route_detail_list_grid", "event", "") :
            gridElementTypeToggle("#side_panel_history_route_detail_list_grid",
                "event", "none")
    }
}

function historyRouteCreateGraphSourceList() {
    var e = historyRouteData.imei,
        t = document.getElementById("bottom_panel_graph_data_source");
    t.options.length = 0, t.options.add(new Option(la.SPEED, "speed")), t
        .options.add(new Option(la.ALTITUDE, "altitude"));
    var a = new Array;
    for (var o in settingsObjectData[e].sensors) {
        (s = settingsObjectData[e].sensors[o]).id = o, a.push(s)
    }
    var i = sortArrayByElement(a, "name");
    for (var o in i) {
        var s;
        "string" != (s = i[o]).result_type && "rel" != s.result_type && t
            .options.add(new Option(s.name, s.id))
    }
}

function historyRouteChangeGraphSource() {
    historyRouteCreateGraph(document.getElementById(
        "bottom_panel_graph_data_source").value)
}

function historyRouteCreateGraph(e) {
    document.getElementById("bottom_panel_graph_label").innerHTML = "";
    var t = historyRouteData.imei;
    if (historyRouteData.graph = [], historyRouteData.graph.data = [],
        historyRouteData.graph.data_index = [], "speed" != e && "altitude" != e)
        var a = settingsObjectData[t].sensors[e];
    for (var o = 0; o < historyRouteData.route.length; o++) {
        var i = historyRouteData.route[o].dt_tracker,
            s = getTimestampFromDate(i.replace(/-/g, "/") + " UTC");
        if ("speed" == e) var n = historyRouteData.route[o].speed;
        else if ("altitude" == e) n = historyRouteData.route[o].altitude;
        else {
            if ("fuelsumup" == a.type) n = getSensorValueFuelLevelSumUp(t,
                historyRouteData.route[o].params, a).value;
            else n = getSensorValue(historyRouteData.route[o].params, a).value;
            "engh" == a.type && (n = n / 60 / 60, n = Math.round(100 * n) / 100)
        }
        historyRouteData.graph.data.push([s, n]), historyRouteData.graph
            .data_index[s] = o
    }
    "speed" == e ? (historyRouteData.graph.units = la.UNIT_SPEED,
        historyRouteData.graph.result_type = "") : "altitude" == e ? (
        historyRouteData.graph.units = la.UNIT_HEIGHT, historyRouteData
        .graph.result_type = "") : "odo" == a.type ? (historyRouteData.graph
        .units = la.UNIT_DISTANCE, historyRouteData.graph.result_type = a
        .result_type) : "engh" == a.type ? (historyRouteData.graph.units =
        la.UNIT_H, historyRouteData.graph.result_type = a.result_type) : (
        historyRouteData.graph.units = a.units, historyRouteData.graph
        .result_type = a.result_type), initGraph(historyRouteData.graph)
}

function historyRoutePlay() {
    if (clearTimeout(timer_historyRoutePlay), 0 == historyRouteData.play
        .status && destroyMapPopup(), historyRouteData.route.length > 0 &&
        historyRouteData.play.position < historyRouteData.route.length) {
        var e = historyRouteData.route[historyRouteData.play.position]
            .dt_tracker;
        graphSetCrosshair(getTimestampFromDate(e.replace(/-/g, "/") + " UTC"));
        var t = historyRouteData.graph.data,
            a = historyRouteData.graph.units;
        document.getElementById("bottom_panel_graph_label").innerHTML = t[
            historyRouteData.play.position][1] + " " + a + " - " + e;
        var o = historyRouteData.route[historyRouteData.play.position];
        if (datalistShowData("route", historyRouteData.imei, o),
            historyRoutePanToPoint(historyRouteData.play.position),
            historyRouteAddPointMarkerToMap(historyRouteData.play.position),
            historyRouteData.play.status = !0, historyRouteData.play.position ==
            historyRouteData.route.length - 1) return clearTimeout(
                timer_historyRoutePlay), historyRouteData.play.status = !1,
            void(historyRouteData.play.position = 0);
        1 == document.getElementById("bottom_panel_graph_play_speed").value ?
            timer_historyRoutePlay = setTimeout("historyRoutePlay()", 2e3) :
            2 == document.getElementById("bottom_panel_graph_play_speed")
            .value ? timer_historyRoutePlay = setTimeout("historyRoutePlay()",
                1e3) : 3 == document.getElementById(
                "bottom_panel_graph_play_speed").value ?
            timer_historyRoutePlay = setTimeout("historyRoutePlay()", 500) :
            4 == document.getElementById("bottom_panel_graph_play_speed")
            .value ? timer_historyRoutePlay = setTimeout("historyRoutePlay()",
                250) : 5 == document.getElementById(
                "bottom_panel_graph_play_speed").value ?
            timer_historyRoutePlay = setTimeout("historyRoutePlay()", 125) :
            6 == document.getElementById("bottom_panel_graph_play_speed")
            .value && (timer_historyRoutePlay = setTimeout("historyRoutePlay()",
                65)), historyRouteData.play.position++
    }
}

function historyRoutePause() {
    clearTimeout(timer_historyRoutePlay)
}

function historyRouteStop() {
    clearTimeout(timer_historyRoutePlay), historyRouteData.play.status = !1,
        historyRouteData.play.position = 0
}

function historyRouteAddStartMarkerToMap() {
    var e = historyRouteData.route[0].lng,
        t = historyRouteData.route[0].lat,
        a = L.marker([t, e], {
            icon: mapMarkerIcons.route_start
        });
    a.on("click", function(e) {
        historyRouteShowPoint(0, !0)
    }), mapLayers.history.addLayer(a)
}

function historyRouteAddEndMarkerToMap() {
    var e = historyRouteData.route[historyRouteData.route.length - 1].lng,
        t = historyRouteData.route[historyRouteData.route.length - 1].lat,
        a = L.marker([t, e], {
            icon: mapMarkerIcons.route_end
        });
    a.on("click", function(e) {
        historyRouteShowPoint(historyRouteData.route.length - 1, !0)
    }), mapLayers.history.addLayer(a)
}

function historyRouteAddStopMarkerToMap(e) {
    var t = historyRouteData.stops[e].lng,
        a = historyRouteData.stops[e].lat,
        o = L.marker([a, t], {
            icon: mapMarkerIcons.route_stop
        });
    o.on("click", function(t) {
        historyRouteShowStop(e)
    }), mapLayers.history.addLayer(o), historyRouteData.layers.stops.push(o)
}

function historyRouteAddEventMarkerToMap(e) {
    var t = historyRouteData.events[e].lng,
        a = historyRouteData.events[e].lat,
        o = L.marker([a, t], {
            icon: mapMarkerIcons.route_event
        });
    o.on("click", function(t) {
        historyRouteShowEvent(e)
    }), mapLayers.history.addLayer(o), historyRouteData.layers.events.push(
        o)
}

function historyRouteAddDataPointMarkerToMap(e) {
    historyRouteData.imei;
    var t = historyRouteData.route[e].lng,
        a = historyRouteData.route[e].lat,
        o = L.marker([a, t], {
            icon: mapMarkerIcons.route_data_point,
            iconAngle: 0
        }),
        i = e;
    o.on("click", function(e) {
        historyRouteShowPoint(i, !0)
    }), historyRouteData.layers.data_points.push(o)
}

function historyRouteAddPointMarkerToMap(e) {
    historyRouteRemovePointMarker();
    var t = historyRouteData.imei,
        a = historyRouteData.route[e].lng,
        o = historyRouteData.route[e].lat,
        i = historyRouteData.route[e].angle,
        s = historyRouteData.route[e].speed,
        n = historyRouteData.route[e].dt_tracker,
        l = (historyRouteData.route[e].params, settingsUserData.map_is),
        d = i;
    "arrow" != settingsObjectData[t].map_icon && (d = 0);
    var r = getMarkerIcon(t, s, !1, !1),
        _ = L.marker([o, a], {
            icon: r,
            iconAngle: d
        }),
        c = s + " " + la.UNIT_SPEED + " - " + n;
    _.bindTooltip(c, {
            permanent: !0,
            offset: [20 * l, 0],
            direction: "right"
        }).openTooltip(), _.on("click", function(t) {
            historyRouteShowPoint(e.true)
        }), mapLayers.history.addLayer(_), historyRouteData.layers
        .point_marker = _
}

function historyRouteRemovePointMarker() {
    historyRouteData.layers.point_marker && mapLayers.history.removeLayer(
        historyRouteData.layers.point_marker)
}

function historyRoutePanToPoint(e) {
    var t = historyRouteData.route[e].lng,
        a = historyRouteData.route[e].lat;
    map.panTo({
        lat: a,
        lng: t
    })
}

function historyRouteShowPoint(e, t) {
    historyRouteRemoveDrive();
    var a = historyRouteData.name,
        o = historyRouteData.imei,
        i = historyRouteData.route[e].lng,
        s = historyRouteData.route[e].lat,
        n = historyRouteData.route[e].altitude,
        l = historyRouteData.route[e].angle,
        d = historyRouteData.route[e].speed,
        r = historyRouteData.route[e].dt_tracker,
        _ = historyRouteData.route[e].params,
        c = historyRouteData.route[e];
    if (datalistShowData("route", o, c), t) {
        var g = settingsUserData.map_is;
        geocoderGetAddress(s, i, function(t) {
            var c = t,
                m = urlPosition(s, i),
                u = "",
                p = new Array;
            for (var y in settingsObjectData[o].sensors) p.push(
                settingsObjectData[o].sensors[y]);
            var v = sortArrayByElement(p, "name");
            for (var y in v) {
                var b = v[y];
                if ("true" == b.popup)
                    if ("fuelsumup" == b.type) {
                        var h = getSensorValueFuelLevelSumUp(o, _, b);
                        u += "<tr><td><strong>" + b.name +
                            ":</strong></td><td>" + h.value_full +
                            "</td></tr>"
                    } else {
                        h = getSensorValue(_, b);
                        u += "<tr><td><strong>" + b.name +
                            ":</strong></td><td>" + h.value_full +
                            "</td></tr>"
                    }
            }
            var E = "<table>\t\t\t<tr><td><strong>" + la.OBJECT +
                ":</strong></td><td>" + a +
                "</td></tr>\t\t\t<tr><td><strong>" + la.ADDRESS +
                ":</strong></td><td>" + c +
                "</td></tr>\t\t\t<tr><td><strong>" + la.POSITION +
                ":</strong></td><td>" + m +
                "</td></tr>\t\t\t<tr><td><strong>" + la.ALTITUDE +
                ":</strong></td><td>" + n + " " + la.UNIT_HEIGHT +
                "</td></tr>\t\t\t<tr><td><strong>" + la.ANGLE +
                ":</strong></td><td>" + l +
                " &deg;</td></tr>\t\t\t<tr><td><strong>" + la.SPEED +
                ":</strong></td><td>" + d + " " + la.UNIT_SPEED +
                "</td></tr>\t\t\t<tr><td><strong>" + la.TIME +
                ":</strong></td><td>" + r + "</td></tr>",
                f = getObjectOdometer(o, _); - 1 != f && (E +=
                "<tr><td><strong>" + la.ODOMETER +
                ":</strong></td><td>" + f + " " + la.UNIT_DISTANCE +
                "</td></tr>");
            var I = getObjectEngineHours(o, _); - 1 != I && (E +=
                "<tr><td><strong>" + la.ENGINE_HOURS +
                ":</strong></td><td>" + I + "</td></tr>");
            var B = E + u;
            E += "</table>", B += "</table>", 0 == e || historyRouteData
                .route.length - 1 == e ? addPopupToMap(s, i, [0, -28 *
                    g], E, B) : addPopupToMap(s, i, [0, -14 * g], E, B),
                1 == gsValues.map_street_view && (objectUnSelectAll(),
                    utilsStreetView(s, i, l))
        })
    }
}

function historyRoutePanToStop(e) {
    var t = historyRouteData.stops[e].lng,
        a = historyRouteData.stops[e].lat;
    map.panTo({
        lat: a,
        lng: t
    })
}

function historyRouteShowStop(e) {
    historyRouteRemoveDrive();
    var t = historyRouteData.name,
        a = historyRouteData.imei,
        o = historyRouteData.stops[e].lng,
        i = historyRouteData.stops[e].lat,
        s = historyRouteData.stops[e].altitude,
        n = historyRouteData.stops[e].angle,
        l = historyRouteData.stops[e].dt_start,
        d = historyRouteData.stops[e].dt_end,
        r = historyRouteData.stops[e].duration,
        _ = historyRouteData.stops[e].params,
        c = historyRouteData.stops[e];
    datalistShowData("route", a, c);
    var g = settingsUserData.map_is;
    geocoderGetAddress(i, o, function(e) {
        var c = e,
            m = urlPosition(i, o),
            u = "",
            p = new Array;
        for (var y in settingsObjectData[a].sensors) p.push(
            settingsObjectData[a].sensors[y]);
        var v = sortArrayByElement(p, "name");
        for (var y in v) {
            var b = v[y];
            if ("true" == b.popup)
                if ("fuelsumup" == b.type) {
                    var h = getSensorValueFuelLevelSumUp(a, _, b);
                    u += "<tr><td><strong>" + b.name +
                        ":</strong></td><td>" + h.value_full +
                        "</td></tr>"
                } else {
                    h = getSensorValue(_, b);
                    u += "<tr><td><strong>" + b.name +
                        ":</strong></td><td>" + h.value_full +
                        "</td></tr>"
                }
        }
        var E = "<table>\t\t\t<tr><td><strong>" + la.OBJECT +
            ":</strong></td><td>" + t +
            "</td></tr>\t\t\t<tr><td><strong>" + la.ADDRESS +
            ":</strong></td><td>" + c +
            "</td></tr>\t\t\t<tr><td><strong>" + la.POSITION +
            ":</strong></td><td>" + m +
            "</td></tr>\t\t\t<tr><td><strong>" + la.ALTITUDE +
            ":</strong></td><td>" + s + " " + la.UNIT_HEIGHT +
            "</td></tr>\t\t\t<tr><td><strong>" + la.ANGLE +
            ":</strong></td><td>" + n +
            " &deg;</td></tr>\t\t\t<tr><td><strong>" + la.ARRIVED +
            ":</strong></td><td>" + l +
            "</td></tr>\t\t\t<tr><td><strong>" + la.DEPARTED +
            ":</strong></td><td>" + d +
            "</td></tr>\t\t\t<tr><td><strong>" + la.DURATION +
            ":</strong></td><td>" + r + "</td></tr>",
            f = getObjectOdometer(a, _); - 1 != f && (E +=
            "<tr><td><strong>" + la.ODOMETER +
            ":</strong></td><td>" + f + " " + la.UNIT_DISTANCE +
            "</td></tr>");
        var I = getObjectEngineHours(a, _); - 1 != I && (E +=
            "<tr><td><strong>" + la.ENGINE_HOURS +
            ":</strong></td><td>" + I + "</td></tr>");
        var B = E + u;
        addPopupToMap(i, o, [0, -28 * g], E += "</table>", B +=
            "</table>"), 1 == gsValues.map_street_view && (
            objectUnSelectAll(), utilsStreetView(i, o, n))
    })
}

function historyRoutePanToEvent(e) {
    var t = historyRouteData.events[e].lng,
        a = historyRouteData.events[e].lat;
    map.panTo({
        lat: a,
        lng: t
    })
}

function historyRouteShowEvent(e) {
    historyRouteRemoveDrive();
    var t = historyRouteData.name,
        a = historyRouteData.imei,
        o = historyRouteData.events[e].event_desc,
        i = historyRouteData.events[e].dt_tracker,
        s = historyRouteData.events[e].lng,
        n = historyRouteData.events[e].lat,
        l = historyRouteData.events[e].altitude,
        d = historyRouteData.events[e].angle,
        r = historyRouteData.events[e].speed,
        _ = historyRouteData.events[e].params,
        c = historyRouteData.events[e];
    datalistShowData("route", a, c);
    var g = settingsUserData.map_is;
    geocoderGetAddress(n, s, function(e) {
        var c = e,
            m = urlPosition(n, s),
            u = "",
            p = new Array;
        for (var y in settingsObjectData[a].sensors) p.push(
            settingsObjectData[a].sensors[y]);
        var v = sortArrayByElement(p, "name");
        for (var y in v) {
            var b = v[y];
            if ("true" == b.popup)
                if ("fuelsumup" == b.type) {
                    var h = getSensorValueFuelLevelSumUp(a, _, b);
                    u += "<tr><td><strong>" + b.name +
                        ":</strong></td><td>" + h.value_full +
                        "</td></tr>"
                } else {
                    h = getSensorValue(_, b);
                    u += "<tr><td><strong>" + b.name +
                        ":</strong></td><td>" + h.value_full +
                        "</td></tr>"
                }
        }
        var E = "<table>\t\t\t<tr><td><strong>" + la.OBJECT +
            ":</strong></td><td>" + t +
            "</td></tr>\t\t\t<tr><td><strong>" + la.EVENT +
            ":</strong></td><td>" + o +
            "</td></tr>\t\t\t<tr><td><strong>" + la.ADDRESS +
            ":</strong></td><td>" + c +
            "</td></tr>\t\t\t<tr><td><strong>" + la.POSITION +
            ":</strong></td><td>" + m +
            "</td></tr>\t\t\t<tr><td><strong>" + la.ALTITUDE +
            ":</strong></td><td>" + l + " " + la.UNIT_HEIGHT +
            "</td></tr>\t\t\t<tr><td><strong>" + la.ANGLE +
            ":</strong></td><td>" + d +
            " &deg;</td></tr>\t\t\t<tr><td><strong>" + la.SPEED +
            ":</strong></td><td>" + r + " " + la.UNIT_SPEED +
            "</td></tr>\t\t\t<tr><td><strong>" + la.TIME +
            ":</strong></td><td>" + i + "</td></tr>",
            f = getObjectOdometer(a, _); - 1 != f && (E +=
            "<tr><td><strong>" + la.ODOMETER +
            ":</strong></td><td>" + f + " " + la.UNIT_DISTANCE +
            "</td></tr>");
        var I = getObjectEngineHours(a, _); - 1 != I && (E +=
            "<tr><td><strong>" + la.ENGINE_HOURS +
            ":</strong></td><td>" + I + "</td></tr>");
        var B = E + u;
        addPopupToMap(n, s, [0, -28 * g], E += "</table>", B +=
            "</table>"), 1 == gsValues.map_street_view && (
            objectUnSelectAll(), utilsStreetView(n, s, d))
    })
}

function historyRouteRemoveDrive() {
    historyRouteData.layers.route_drive && mapLayers.history.removeLayer(
        historyRouteData.layers.route_drive)
}

function historyRouteShowDrive(e) {
    historyRouteRemoveDrive();
    var t = historyRouteData.drives[e].id_start_s,
        a = historyRouteData.drives[e].id_end,
        o = new Array;
    for (i = 0; i <= a - t; i++) {
        var s = historyRouteData.route[t + i].lat,
            n = historyRouteData.route[t + i].lng;
        o.push(L.latLng(s, n))
    }
    var l = L.polyline(o, {
        color: settingsUserData.map_rhc,
        opacity: .8,
        weight: 3
    });
    if (mapLayers.history.addLayer(l), 0 == historyRouteData.play.status) {
        var d = l.getBounds();
        map.fitBounds(d)
    }
    historyRouteData.layers.route_drive = l
}

function historyRouteMsgDeleteSelected() {
    if (utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        utilsCheckPrivileges("obj_history_clear")) {
        var e = $("#bottom_panel_msg_list_grid").jqGrid("getGridParam",
            "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_msgs",
                        imei: historyRouteData.imei,
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_history.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && $(
                                "#bottom_panel_msg_list_grid"
                                ).trigger("reloadGrid")
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}
historyRouteToggle.route = !0, historyRouteToggle.snap = !1, historyRouteToggle
    .arrows = !1, historyRouteToggle.data_points = !1, historyRouteToggle
    .stops = !0, historyRouteToggle.events = !0;

var tasksData = new Array,
    timer_sessionCheck;

function tasksOpen() {
    utilsCheckPrivileges("tasks") && ($("#dialog_tasks").bind("resize",
        function() {
            $("#tasks_task_grid").setGridHeight($("#dialog_tasks")
                .height() - 133)
        }).trigger("resize"), $("#dialog_tasks").bind("resize",
        function() {
            $("#tasks_task_grid").setGridWidth($("#dialog_tasks")
            .width())
        }).trigger("resize"), $("#dialog_tasks").dialog("open"))
}

function tasksClose() {
    $("#dialog_tasks").unbind("resize")
}

function tasksShow() {
    var e = "func/fn_tasks.php?cmd=load_task_list",
        t = document.getElementById("dialog_tasks_object_list").value,
        a = document.getElementById("dialog_tasks_date_from").value + " " +
        document.getElementById("dialog_tasks_hour_from").value + ":" + document
        .getElementById("dialog_tasks_minute_from").value + ":00",
        o = document.getElementById("dialog_tasks_date_to").value + " " +
        document.getElementById("dialog_tasks_hour_to").value + ":" + document
        .getElementById("dialog_tasks_minute_to").value + ":00";
    "" != t && (e += "&imei=" + t), a != o && (e += "&dtf=" + a + "&dtt=" + o),
        $("#tasks_task_grid").jqGrid("setGridParam", {
            url: e
        }).trigger("reloadGrid")
}

function tasksDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_task",
                    task_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_tasks.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && tasksShow()
                    }
                })
            }
        })
}

function tasksDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#tasks_task_grid").jqGrid("getGridParam", "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_tasks",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_tasks.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && tasksShow()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function tasksDeleteAll() {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE_ALL_TASKS,
        function(e) {
            if (e) {
                $.ajax({
                    type: "POST",
                    url: "func/fn_tasks.php",
                    data: {
                        cmd: "delete_all_tasks"
                    },
                    success: function(e) {
                        "OK" == e && tasksShow()
                    }
                })
            }
        })
}

function tasksExportCSV() {
    var e = "func/fn_export.php?format=tasks_csv",
        t = document.getElementById("dialog_tasks_object_list").value,
        a = document.getElementById("dialog_tasks_date_from").value + " " +
        document.getElementById("dialog_tasks_hour_from").value + ":" + document
        .getElementById("dialog_tasks_minute_from").value + ":00",
        o = document.getElementById("dialog_tasks_date_to").value + " " +
        document.getElementById("dialog_tasks_hour_to").value + ":" + document
        .getElementById("dialog_tasks_minute_to").value + ":00";
    "" != t && (e += "&imei=" + t), a != o && (e += "&dtf=" + a + "&dtt=" + o),
        window.location = e
}

function tasksNew(e) {
    if (1 != gsValues.map_bussy) {
        gsValues.map_bussy = !0;
        var t = map.editTools.startPolyline(e);
        map.doubleClickZoom.disable(), map.on("editable:drawing:clicked",
            function(e) {
                var a = t.getLatLngs();
                map.editTools.stopDrawing(), 1 == map.hasLayer(t) && map
                    .removeLayer(t), map.doubleClickZoom.enable(), map.off(
                        "editable:drawing:clicked"), taskProperties("add"),
                    geocoderGetAddress(a[0].lat, a[0].lng, function(e) {
                        document.getElementById(
                                "dialog_task_start_address").value = e,
                            document.getElementById(
                                "dialog_task_start_lat").value = a[0]
                            .lat, document.getElementById(
                                "dialog_task_start_lng").value = a[0]
                            .lng
                    }), geocoderGetAddress(a[1].lat, a[1].lng, function(e) {
                        document.getElementById(
                                "dialog_task_end_address").value = e,
                            document.getElementById(
                                "dialog_task_end_lat").value = a[1].lat,
                            document.getElementById(
                                "dialog_task_end_lng").value = a[1].lng
                    }), gsValues.map_bussy = !1
            })
    }
}

function tasksPickAddress(e) {
    1 != gsValues.map_bussy && (map.doubleClickZoom.disable(), gsValues
        .map_bussy = !0, document.getElementById("map").style.cursor =
        "crosshair", $("#dialog_tasks").dialog("close"), $(
            "#dialog_task_properties").dialog("close"), map.on("click",
            function(t) {
                "start" == e ? geocoderGetAddress(t.latlng.lat, t.latlng
                        .lng,
                        function(e) {
                            document.getElementById(
                                    "dialog_task_start_address").value = e,
                                document.getElementById(
                                    "dialog_task_start_lat").value = t
                                .latlng.lat, document.getElementById(
                                    "dialog_task_start_lng").value = t
                                .latlng.lng
                        }) : geocoderGetAddress(t.latlng.lat, t.latlng.lng,
                        function(e) {
                            document.getElementById(
                                    "dialog_task_end_address").value = e,
                                document.getElementById(
                                    "dialog_task_end_lat").value = t.latlng
                                .lat, document.getElementById(
                                    "dialog_task_end_lng").value = t.latlng
                                .lng
                        }), map.off("click"), map.doubleClickZoom.enable(),
                    gsValues.map_bussy = !1, document.getElementById("map")
                    .style.cursor = "", tasksOpen(), $(
                        "#dialog_task_properties").dialog("open")
            }))
}

function taskProperties(e) {
    switch (e) {
        default:
            var t = e;
            tasksData.edit_task_id = t;
            var a = {
                cmd: "load_task",
                task_id: tasksData.edit_task_id
            };
            $.ajax({
                type: "POST",
                url: "func/fn_tasks.php",
                data: a,
                dataType: "json",
                cache: !1,
                success: function(e) {
                    document.getElementById("dialog_task_name")
                        .value = e.name, document.getElementById(
                            "dialog_task_object_list").value = e
                        .imei, $("#dialog_task_object_list")
                        .multipleSelect("refresh"), document
                        .getElementById("dialog_task_priority")
                        .value = e.priority, $(
                            "#dialog_task_priority").multipleSelect(
                            "refresh"), document.getElementById(
                            "dialog_task_status").value = e.status,
                        $("#dialog_task_status").multipleSelect(
                            "refresh"), document.getElementById(
                            "dialog_task_desc").value = e.desc;
                    var t = e.start_from_dt.split(" "),
                        a = e.start_to_dt.split(" "),
                        o = e.end_from_dt.split(" "),
                        i = e.end_to_dt.split(" ");
                    document.getElementById(
                            "dialog_task_start_address").value = e
                        .start_address, document.getElementById(
                            "dialog_task_start_lat").value = e
                        .start_lat, document.getElementById(
                            "dialog_task_start_lng").value = e
                        .start_lng, document.getElementById(
                            "dialog_task_start_from_date").value =
                        t[0], document.getElementById(
                            "dialog_task_start_from_time").value =
                        t[1].substring(0, 5), $(
                            "#dialog_task_start_from_time")
                        .multipleSelect("refresh"), document
                        .getElementById("dialog_task_start_to_date")
                        .value = a[0], document.getElementById(
                            "dialog_task_start_to_time").value = a[
                            1].substring(0, 5), $(
                            "#dialog_task_start_to_time")
                        .multipleSelect("refresh"), document
                        .getElementById("dialog_task_end_address")
                        .value = e.end_address, document
                        .getElementById("dialog_task_end_lat")
                        .value = e.end_lat, document.getElementById(
                            "dialog_task_end_lng").value = e
                        .end_lng, document.getElementById(
                            "dialog_task_end_from_date").value = o[
                            0], document.getElementById(
                            "dialog_task_end_from_time").value = o[
                            1].substring(0, 5), $(
                            "#dialog_task_end_from_time")
                        .multipleSelect("refresh"), document
                        .getElementById("dialog_task_end_to_date")
                        .value = i[0], document.getElementById(
                            "dialog_task_end_to_time").value = i[1]
                        .substring(0, 5), $(
                            "#dialog_task_end_to_time")
                        .multipleSelect("refresh")
                }
            }), $("#dialog_task_properties").dialog("open");
            break;
        case "add":
            tasksData.edit_task_id = !1, document.getElementById(
                    "dialog_task_name").value = "", document.getElementById(
                    "dialog_task_priority").value = "low", $(
                    "#dialog_task_priority").multipleSelect("refresh"), document
                .getElementById("dialog_task_status").value = 0, $(
                    "#dialog_task_status").multipleSelect("refresh"), document
                .getElementById("dialog_task_desc").value = "", document
                .getElementById("dialog_task_start_address").value = "",
                document.getElementById("dialog_task_start_lat").value = 0,
                document.getElementById("dialog_task_start_lng").value = 0,
                document.getElementById("dialog_task_start_from_date").value =
                moment().format("YYYY-MM-DD"), document.getElementById(
                    "dialog_task_start_from_time").value = "00:00", $(
                    "#dialog_task_start_from_time").multipleSelect("refresh"),
                document.getElementById("dialog_task_start_to_date").value =
                moment().format("YYYY-MM-DD"), document.getElementById(
                    "dialog_task_start_to_time").value = "00:00", $(
                    "#dialog_task_start_to_time").multipleSelect("refresh"),
                document.getElementById("dialog_task_end_address").value = "",
                document.getElementById("dialog_task_end_lat").value = 0,
                document.getElementById("dialog_task_end_lng").value = 0,
                document.getElementById("dialog_task_end_from_date").value =
                moment().format("YYYY-MM-DD"), document.getElementById(
                    "dialog_task_end_from_time").value = "00:00", $(
                    "#dialog_task_end_from_time").multipleSelect("refresh"),
                document.getElementById("dialog_task_end_to_date").value =
                moment().format("YYYY-MM-DD"), document.getElementById(
                    "dialog_task_end_to_time").value = "00:00", $(
                    "#dialog_task_end_to_time").multipleSelect("refresh"), $(
                    "#dialog_task_properties").dialog("open");
            break;
        case "cancel":
            $("#dialog_task_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var o = document.getElementById("dialog_task_name").value,
                i = document.getElementById("dialog_task_object_list").value,
                s = document.getElementById("dialog_task_priority").value,
                n = document.getElementById("dialog_task_status").value,
                l = document.getElementById("dialog_task_desc").value,
                d = document.getElementById("dialog_task_start_address").value,
                r = document.getElementById("dialog_task_start_lat").value,
                _ = document.getElementById("dialog_task_start_lng").value,
                c = document.getElementById("dialog_task_start_from_date")
                .value + " " + document.getElementById(
                    "dialog_task_start_from_time").value + ":00",
                g = document.getElementById("dialog_task_start_to_date").value +
                " " + document.getElementById("dialog_task_start_to_time")
                .value + ":00",
                m = document.getElementById("dialog_task_end_address").value,
                u = document.getElementById("dialog_task_end_lat").value,
                p = document.getElementById("dialog_task_end_lng").value,
                y = document.getElementById("dialog_task_end_from_date").value +
                " " + document.getElementById("dialog_task_end_from_time")
                .value + ":00",
                v = document.getElementById("dialog_task_end_to_date").value +
                " " + document.getElementById("dialog_task_end_to_time").value +
                ":00";
            if ("" == o) return void notifyBox("error", la.ERROR, la
                .NAME_CANT_BE_EMPTY);
            if ("" == i) {
                notifyBox("error", la.ERROR, la.NO_OBJECT_SELECTED);
                break
            }
            if ("" == d || "" == m) return void notifyBox("error", la.ERROR, la
                .ADDRESS_CANT_BE_EMPTY);
            a = {
                cmd: "save_task",
                task_id: tasksData.edit_task_id,
                name: o,
                imei: i,
                priority: s,
                status: n,
                desc: l,
                start_address: d,
                start_lat: r,
                start_lng: _,
                start_from_dt: c,
                start_to_dt: g,
                end_address: m,
                end_lat: u,
                end_lng: p,
                end_from_dt: y,
                end_to_dt: v
            };
            $.ajax({
                type: "POST",
                url: "func/fn_tasks.php",
                data: a,
                cache: !1,
                success: function(e) {
                    "OK" == e && (tasksShow(), $(
                        "#dialog_task_properties").dialog(
                        "close"), notifyBox("info", la
                        .INFORMATION, la
                        .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}

function rilogbookOpen() {
    utilsCheckPrivileges("rilogbook") && ($("#dialog_rilogbook").bind("resize",
        function() {
            $("#rilogbook_logbook_grid").setGridHeight($(
                "#dialog_rilogbook").height() - 133)
        }).trigger("resize"), $("#dialog_rilogbook").bind("resize",
        function() {
            $("#rilogbook_logbook_grid").setGridWidth($(
                "#dialog_rilogbook").width())
        }).trigger("resize"), $("#dialog_rilogbook").dialog("open"))
}

function rilogbookClose() {
    $("#dialog_rilogbook").unbind("resize")
}

function rilogbookShow() {
    var e = "func/fn_rilogbook.php?cmd=load_rilogbook_list",
        t = document.getElementById("dialog_rilogbook_object_list").value,
        a = document.getElementById("dialog_rilogbook_drivers").checked,
        o = document.getElementById("dialog_rilogbook_passengers").checked,
        i = document.getElementById("dialog_rilogbook_trailers").checked,
        s = document.getElementById("dialog_rilogbook_date_from").value + " " +
        document.getElementById("dialog_rilogbook_hour_from").value + ":" +
        document.getElementById("dialog_rilogbook_minute_from").value + ":00",
        n = document.getElementById("dialog_rilogbook_date_to").value + " " +
        document.getElementById("dialog_rilogbook_hour_to").value + ":" +
        document.getElementById("dialog_rilogbook_minute_to").value + ":00";
    "" != t && (e += "&imei=" + t), e += "&drivers=" + a, e += "&passengers=" +
        o, e += "&trailers=" + i, s != n && (e += "&dtf=" + s + "&dtt=" + n), $(
            "#rilogbook_logbook_grid").jqGrid("setGridParam", {
            url: e
        }).trigger("reloadGrid")
}

function rilogbookDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_record",
                    rilogbook_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_rilogbook.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && rilogbookShow()
                    }
                })
            }
        })
}

function rilogbookDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#rilogbook_logbook_grid").jqGrid("getGridParam",
        "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_records",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_rilogbook.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && rilogbookShow()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function rilogbookDeleteAll() {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE_ALL_LOGBOOK_RECORDS,
        function(e) {
            if (e) {
                $.ajax({
                    type: "POST",
                    url: "func/fn_rilogbook.php",
                    data: {
                        cmd: "delete_all_records"
                    },
                    success: function(e) {
                        "OK" == e && rilogbookShow()
                    }
                })
            }
        })
}

function rilogbookExportCSV() {
    var e = "func/fn_export.php?format=rilogbook_csv",
        t = document.getElementById("dialog_rilogbook_object_list").value,
        a = document.getElementById("dialog_rilogbook_drivers").checked,
        o = document.getElementById("dialog_rilogbook_passengers").checked,
        i = document.getElementById("dialog_rilogbook_trailers").checked,
        s = document.getElementById("dialog_rilogbook_date_from").value + " " +
        document.getElementById("dialog_rilogbook_hour_from").value + ":" +
        document.getElementById("dialog_rilogbook_minute_from").value + ":00",
        n = document.getElementById("dialog_rilogbook_date_to").value + " " +
        document.getElementById("dialog_rilogbook_hour_to").value + ":" +
        document.getElementById("dialog_rilogbook_minute_to").value + ":00";
    "" != t && (e += "&imei=" + t), e += "&drivers=" + a, e += "&passengers=" +
        o, e += "&trailers=" + i, s != n && (e += "&dtf=" + s + "&dtt=" + n),
        window.location = e
}

function notifyCheck(e) {
    switch (e) {
        case "expiring_objects":
            if (1 == gsValues.notify_obj_expire)
                for (var t in settingsObjectData) {
                    if ("true" == (a = settingsObjectData[t]).active &&
                        "true" == a.object_expire && getDateDifference(new Date(
                            a.object_expire_dt), new Date) <= gsValues
                        .notify_obj_expire_period) {
                        notifyBox("error", la.EXPIRING_OBJECTS, la
                            .SOME_OF_YOUR_OBJECTS_ACTIVATION_WILL_EXPIRE_SOON
                            );
                        break
                    }
                }
            break;
        case "inactive_objects":
            if (1 == gsValues.notify_obj_expire)
                for (var t in settingsObjectData) {
                    var a;
                    if ("false" == (a = settingsObjectData[t]).active) {
                        notifyBox("error", la.INACTIVE_OBJECTS, la
                            .THERE_ARE_INACTIVE_OBJECTS_IN_YOUR_ACCOUNT);
                        break
                    }
                }
            break;
        case "session_check":
            if (0 == gsValues.session_check) break;
            clearTimeout(timer_sessionCheck);
            $.ajax({
                type: "POST",
                url: "func/fn_connect.php",
                data: {
                    cmd: "session_check"
                },
                cache: !1,
                error: function(e, t) {
                    timer_sessionCheck = setTimeout(
                        "notifyCheck('session_check');", 1e3 *
                        gsValues.session_check)
                },
                success: function(e) {
                    "false" == e ? $("#blocking_panel").show() :
                        timer_sessionCheck = setTimeout(
                            "notifyCheck('session_check');", 1e3 *
                            gsValues.session_check)
                }
            })
    }
}
tasksData.edit_task_id = !1;


function placesSetListCheckbox(e, t) {
    null != document.getElementById(e) && (document.getElementById(e).checked =
        t)
}

function placesGroupOpen() {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") && ($(
        "#places_group_list_grid").trigger("reloadGrid"), $(
        "#dialog_places_groups").dialog("open"))
}

function placesGroupClose() {
    placesMarkerReload(), placesRouteReload(), placesZoneReload()
}

function placesGroupReload() {
    placesGroupLoadData(), $("#places_group_list_grid").trigger("reloadGrid")
}

function placesGroupLoadData(e) {
    $.ajax({
        type: "POST",
        url: "func/fn_places.php",
        data: {
            cmd: "load_place_group_data"
        },
        dataType: "json",
        cache: !1,
        success: function(t) {
            for (var a in placesGroupData.groups = t,
                    placesGroupData.edit_group_id = !1,
                    initSelectList("places_group_list"),
                    placesGroupData.groups) null != document
                .getElementById("marker_group_name_" + a) && (
                    document.getElementById("marker_group_name_" +
                        a).innerHTML = placesGroupData.groups[a]
                    .name), null != document.getElementById(
                    "route_group_name_" + a) && (document
                    .getElementById("route_group_name_" + a)
                    .innerHTML = placesGroupData.groups[a].name),
                null != document.getElementById("zone_group_name_" +
                    a) && (document.getElementById(
                        "zone_group_name_" + a).innerHTML =
                    placesGroupData.groups[a].name);
            e(!0)
        }
    })
}

function placesGroupDelete(e) {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(t) {
            if (t) {
                var a = {
                    cmd: "delete_place_group",
                    group_id: e
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_places.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && placesGroupReload()
                    }
                })
            }
        })
}

function placesGroupDeleteSelected() {
    if (utilsCheckPrivileges("viewer")) {
        var e = $("#places_group_list_grid").jqGrid("getGridParam",
        "selarrrow");
        "" != e ? confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_selected_place_groups",
                        items: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_places.php",
                        data: a,
                        success: function(e) {
                            "OK" == e && placesGroupReload()
                        }
                    })
                }
            }) : notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
    }
}

function placesGroupProperties(e) {
    switch (e) {
        default:
            var t = e;
            placesGroupData.edit_group_id = t, document.getElementById(
                    "dialog_places_group_name").value = placesGroupData.groups[
                    t].name, document.getElementById("dialog_places_group_desc")
                .value = placesGroupData.groups[t].desc, $(
                    "#dialog_places_group_properties").dialog("open");
            break;
        case "add":
            placesGroupData.edit_group_id = !1, document.getElementById(
                    "dialog_places_group_name").value = "", document
                .getElementById("dialog_places_group_desc").value = "", $(
                    "#dialog_places_group_properties").dialog("open");
            break;
        case "cancel":
            $("#dialog_places_group_properties").dialog("close");
            break;
        case "save":
            if (!utilsCheckPrivileges("viewer")) return;
            var a = document.getElementById("dialog_places_group_name").value,
                o = document.getElementById("dialog_places_group_desc").value;
            if ("" == a) {
                notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                break
            }
            var i = {
                cmd: "save_place_group",
                group_id: placesGroupData.edit_group_id,
                group_name: a,
                group_desc: o
            };
            $.ajax({
                type: "POST",
                url: "func/fn_places.php",
                data: i,
                cache: !1,
                success: function(e) {
                    "OK" == e && (placesGroupReload(), $(
                            "#dialog_places_group_properties")
                        .dialog("close"), notifyBox("info", la
                            .INFORMATION, la
                            .CHANGES_SAVED_SUCCESSFULLY))
                }
            })
    }
}

function placesGroupImport() {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") && 1 !=
        gsValues.map_bussy && (document.getElementById("load_file")
            .addEventListener("change", placesGroupImportPGRFile, !1), document
            .getElementById("load_file").click())
}

function placesGroupImportPGRFile(e) {
    var t = e.target.files,
        a = new FileReader;
    a.onload = function(e) {
        try {
            var t = $.parseJSON(e.target.result);
            if ("0.1v" == t.pgr) {
                var a = t.groups.length;
                if (0 == a) return void notifyBox("info", la.INFORMATION, la
                    .NOTHING_HAS_BEEN_FOUND_TO_IMPORT);
                confirmDialog(sprintf(la.GROUPS_FOUND, a) + " " + la
                    .ARE_YOU_SURE_YOU_WANT_TO_IMPORT,
                    function(t) {
                        if (t) {
                            loadingData(!0);
                            var a = {
                                format: "pgr",
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
                                        placesGroupReload()
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

function placesGroupExport() {
    if (utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        1 != gsValues.map_bussy) {
        window.location = "func/fn_export.php?format=pgr"
    }
}














function placesMarkerSetListCheckbox() {
    for (var e in placesGroupData.groups) placesSetListCheckbox(
        "marker_group_visible_" + e, placesGroupData.groups[e]
        .marker_visible);
    for (var e in placesMarkerData.markers) placesSetListCheckbox(
        "marker_visible_" + e, placesMarkerData.markers[e].visible)
}

function placesMarkerAddAllToMap() {
    var e = document.getElementById("side_panel_places_marker_list_search")
        .value;
    for (var t in placesMarkerRemoveAllFromMap(), placesMarkerData.markers) {
        var a = placesMarkerData.markers[t];
        if (strMatches(a.data.name, e)) {
            var o = a.data.name,
                i = a.data.desc,
                s = a.data.icon,
                n = a.data.visible,
                l = a.data.lat,
                d = a.data.lng;
            try {
                placesMarkerAddMarkerToMap(t, o, i, s, n, l, d)
            } catch (e) {}
        }
    }
}

function placesMarkerAddMarkerToMap(e, t, a, o, i, s, n) {
    var l = settingsUserData.map_is,
        d = L.icon({
            iconUrl: o,
            iconSize: [28 * l, 28 * l],
            iconAnchor: [14 * l, 28 * l],
            popupAnchor: [0, 0]
        }),
        r = L.marker([s, n], {
            icon: d
        }),
        _ = "<table><tr><td><strong>" + t + "</strong></td></tr>";
    "" != a && (_ += "<tr><td>" + a + "</td></tr>"), _ += "</table>", r.on(
            "click",
            function(e) {
                addPopupToMap(s, n, [0, -28 * l], _, "")
            }), "false" != i && mapLayers.places_markers.addLayer(r),
        placesMarkerData.markers[e].marker_layer = r
}

function placesMarkerRemoveAllFromMap() {
    mapLayers.places_markers.clearLayers()
}

function placesMarkerSearchMap(e) {
    for (var t in placesMarkerData.markers) {
        var a = placesMarkerData.markers[t];
        strMatches(a.data.name, e) ? 1 == a.visible && placesMarkerVisible(t, !
            0) : placesMarkerVisible(t, !1)
    }
}

function placesMarkerDeleteAll() {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") && 1 !=
        gsValues.map_bussy && confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_ALL_MARKERS,
            function(e) {
                if (e) {
                    $.ajax({
                        type: "POST",
                        url: "func/fn_places.php",
                        data: {
                            cmd: "delete_all_markers"
                        },
                        success: function(e) {
                            "OK" == e && (placesMarkerLoadData(), $(
                                "#side_panel_places_marker_list_grid"
                                ).trigger("reloadGrid"))
                        }
                    })
                }
            })
}

function placesMarkerDelete(e) {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") && 1 !=
        gsValues.map_bussy && (placesMarkerPanTo(e), confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_marker",
                        marker_id: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_places.php",
                        data: a,
                        success: function(t) {
                            "OK" == t && (placesMarkerVisible(e,
                                    !1),
                                delete placesMarkerData
                                .markers[e],
                                placesMarkerSetListNumber(),
                                placesMarkerInitLists(), $(
                                    "#side_panel_places_marker_list_grid"
                                    ).trigger("reloadGrid"))
                        }
                    })
                }
            }))
}

function placesMarkerNew(e) {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") && 1 !=
        gsValues.map_bussy && (map.doubleClickZoom.disable(), gsValues
            .map_bussy = !0, document.getElementById("map").style.cursor =
            "crosshair", document.getElementById("dialog_places_marker_name")
            .value = la.NEW_MARKER + " " + placesMarkerData.new_marker_id,
            document.getElementById("dialog_places_marker_desc").value = "",
            document.getElementById("dialog_places_marker_group").value = 0, $(
                "#dialog_places_marker_group").multipleSelect("refresh"),
            document.getElementById("dialog_places_marker_visible").checked = !
            0, $("#dialog_places_marker_properties").dialog("open"),
            placesMarkerLoadDefaultIconList(), placesMarkerLoadCustomIconList(),
            null != e && (map.hasLayer(placesMarkerData.edit_marker_layer) &&
                map.removeLayer(placesMarkerData.edit_marker_layer),
                placesMarkerAddToMap(e.lat, e.lng, placesMarkerData.marker_icon)
                ), map.on("click", placesMarkerAddToMapByClick))
}

function placesMarkerAddToMapByClick(e) {
    map.hasLayer(placesMarkerData.edit_marker_layer) && map.removeLayer(
        placesMarkerData.edit_marker_layer), placesMarkerAddToMap(e.latlng
        .lat, e.latlng.lng, placesMarkerData.marker_icon)
}

function placesMarkerAddToMap(e, t, a) {
    var o = settingsUserData.map_is,
        i = L.icon({
            iconUrl: a,
            iconSize: [28 * o, 28 * o],
            iconAnchor: [14 * o, 28 * o],
            popupAnchor: [0, 0]
        });
    placesMarkerData.edit_marker_layer = L.marker([e, t], {
        icon: i
    }), placesMarkerData.edit_marker_layer.addTo(map)
}

function placesMarkerProperties(e) {
    if (utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser"))
        switch (e) {
            default:
                if (1 == gsValues.map_bussy) return;
                map.doubleClickZoom.disable(), gsValues.map_bussy = !0;
                var t = e;
                placesMarkerData.edit_marker_id = t, document.getElementById(
                        "dialog_places_marker_name").value = placesMarkerData
                    .markers[t].data.name, document.getElementById(
                        "dialog_places_marker_desc").value = placesMarkerData
                    .markers[t].data.desc, document.getElementById(
                        "dialog_places_marker_group").value = placesMarkerData
                    .markers[t].data.group_id, $("#dialog_places_marker_group")
                    .multipleSelect("refresh"), "true" == placesMarkerData
                    .markers[t].data.visible ? document.getElementById(
                        "dialog_places_marker_visible").checked = !0 : document
                    .getElementById("dialog_places_marker_visible").checked = !
                    1, placesMarkerData.marker_icon = placesMarkerData.markers[
                        t].data.icon, $("#dialog_places_marker_properties")
                    .dialog("open"), placesMarkerLoadDefaultIconList(),
                    placesMarkerLoadCustomIconList(), mapLayers.places_markers
                    .removeLayer(placesMarkerData.markers[t].marker_layer),
                    placesMarkerAddToMap((l = placesMarkerData.markers[t]
                            .marker_layer.getLatLng()).lat, l.lng,
                        placesMarkerData.marker_icon), map.on("click",
                        placesMarkerAddToMapByClick);
                break;
            case "cancel":
                if (map.hasLayer(placesMarkerData.edit_marker_layer) && map
                    .removeLayer(placesMarkerData.edit_marker_layer), map.off(
                        "click"), 0 != placesMarkerData.edit_marker_id) {
                    t = placesMarkerData.edit_marker_id;
                    "false" == placesMarkerData.markers[t].data.visible ?
                        mapLayers.places_markers.removeLayer(placesMarkerData
                            .markers[t].marker_layer) : mapLayers.places_markers
                        .addLayer(placesMarkerData.markers[t].marker_layer)
                }
                placesMarkerData.edit_marker_id = !1, placesMarkerData
                    .edit_marker_layer = !1, map.doubleClickZoom.enable(),
                    gsValues.map_bussy = !1, document.getElementById("map")
                    .style.cursor = "", $("#dialog_places_marker_properties")
                    .dialog("close");
                break;
            case "save":
                var a = document.getElementById("dialog_places_marker_name")
                    .value,
                    o = document.getElementById("dialog_places_marker_desc")
                    .value,
                    i = document.getElementById("dialog_places_marker_group")
                    .value,
                    s = document.getElementById("dialog_places_marker_visible")
                    .checked,
                    n = placesMarkerData.marker_icon;
                if ("" == a) {
                    notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                    break
                }
                if (0 == placesMarkerData.edit_marker_layer) {
                    notifyBox("error", la.ERROR, la
                        .PLACE_MARKER_ON_MAP_BEFORE_SAVING);
                    break
                }
                var l = placesMarkerData.edit_marker_layer.getLatLng();
                map.off("click"), map.hasLayer(placesMarkerData
                        .edit_marker_layer) && map.removeLayer(placesMarkerData
                        .edit_marker_layer), 0 == placesMarkerData
                    .edit_marker_id && (placesMarkerData.new_marker_id += 1);
                var d = {
                    cmd: "save_marker",
                    marker_id: placesMarkerData.edit_marker_id,
                    group_id: i,
                    marker_name: a,
                    marker_desc: o,
                    marker_icon: n,
                    marker_visible: s,
                    marker_lat: l.lat.toFixed(6),
                    marker_lng: l.lng.toFixed(6)
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_places.php",
                    data: d,
                    success: function(e) {
                        placesMarkerData.edit_marker_layer = !1,
                            placesMarkerData.edit_marker_id = !1,
                            map.doubleClickZoom.enable(), gsValues
                            .map_bussy = !1, document
                            .getElementById("map").style.cursor =
                            "", $(
                                "#dialog_places_marker_properties")
                            .dialog("close"), "OK" == e ? (
                                placesMarkerLoadData(), $(
                                    "#side_panel_places_marker_list_grid"
                                    ).trigger("reloadGrid")) :
                            "ERROR_MARKER_LIMIT" == e && notifyBox(
                                "error", la.ERROR, la
                                .MARKER_LIMIT_IS_REACHED)
                    }
                })
        }
}

function placesMarkerLoadDefaultIconList() {
    0 == placesMarkerData.default_icons_loaded && $.ajax({
        type: "POST",
        url: "func/fn_files.php",
        data: {
            path: "img/markers/places"
        },
        dataType: "json",
        success: function(e) {
            var t = '<div class="row2">';
            for (document.getElementById(
                    "places_marker_icon_default_list").innerHTML =
                "", i = 0; i < e.length; i++) {
                var a = "img/markers/places/" + e[i];
                t += '<div class="icon-places-marker">', t +=
                    '<a href="#" onclick="placesMarkerSelectIcon(\'' +
                    a + "');\">", t += '<img src="' + a +
                    '" style="padding:5px; width: 32px; height: 32px;"/>',
                    t += "</a>", t += "</div>"
            }
            t += "</div>", document.getElementById(
                    "places_marker_icon_default_list").innerHTML =
                t, placesMarkerData.default_icons_loaded = !0
        }
    })
}

function placesMarkerLoadCustomIconList() {
    0 == placesMarkerData.custom_icons_loaded && $.ajax({
        type: "POST",
        url: "func/fn_files.php",
        data: {
            path: "data/user/places"
        },
        dataType: "json",
        success: function(e) {
            var t = '<div class="row2">';
            for (document.getElementById(
                    "places_marker_icon_custom_list").innerHTML =
                "", i = 0; i < e.length; i++) {
                var a = "data/user/places/" + e[i];
                t += '<div class="icon-places-marker">', t +=
                    '<a href="#" onclick="placesMarkerSelectIcon(\'' +
                    a + "');\">", t += '<img src="' + a +
                    '" style="padding:5px; width: 32px; height: 32px;"/>',
                    t += "</a>", t +=
                    '<div class="icon-custom-delete">', t +=
                    '<a href="#" onclick="placesMarkerDeleteCustomIcon(\'' +
                    a + "');\">", t +=
                    '<img border="0" src="theme/images/remove.svg" width="8px">',
                    t += "</a>", t += "</div>", t += "</div>"
            }
            t += "</div>", document.getElementById(
                    "places_marker_icon_custom_list").innerHTML = t,
                placesMarkerData.custom_icons_loaded = !0
        }
    })
}

function placesMarkerUploadCustomIcon() {
    utilsCheckPrivileges("viewer") && (document.getElementById("load_file")
        .addEventListener("change", placesMarkerUploadCustomIconFile, !1),
        document.getElementById("load_file").click())
}

function placesMarkerUploadCustomIconFile(e) {
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
                    var e = "func/fn_upload.php?file=places_icon_png"
                } else e = "func/fn_upload.php?file=places_icon_svg";
                $.ajax({
                    url: e,
                    type: "POST",
                    data: a,
                    processData: !1,
                    contentType: !1,
                    success: function(e) {
                        placesMarkerData
                            .custom_icons_loaded = !1,
                            placesMarkerLoadCustomIconList()
                    }
                })
            }, document.getElementById("load_file").value = ""
        } else notifyBox("error", la.ERROR, la.FILE_TYPE_MUST_BE_PNG_OR_SVG)
    }, a.readAsDataURL(t[0]), this.removeEventListener("change",
        placesMarkerUploadCustomIconFile, !1)
}

function placesMarkerDeleteCustomIcon(e) {
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
                    url: "func/fn_places.php",
                    data: a,
                    success: function(e) {
                        "OK" == e && (placesMarkerData
                            .custom_icons_loaded = !1,
                            placesMarkerLoadCustomIconList()
                            )
                    }
                })
            }
        })
}

function placesMarkerDeleteAllCustomIcon() {
    utilsCheckPrivileges("viewer") && confirmDialog(la
        .ARE_YOU_SURE_YOU_WANT_TO_DELETE_ALL_CUSTOM_ICONS,
        function(e) {
            if (e) {
                $.ajax({
                    type: "POST",
                    url: "func/fn_places.php",
                    data: {
                        cmd: "delete_all_custom_icons"
                    },
                    success: function(e) {
                        "OK" == e && (placesMarkerData
                            .custom_icons_loaded = !1,
                            placesMarkerLoadCustomIconList()
                            )
                    }
                })
            }
        })
}

function placesMarkerSelectIcon(e) {
    if (placesMarkerData.marker_icon = e, 0 != placesMarkerData
        .edit_marker_layer) {
        map.hasLayer(placesMarkerData.edit_marker_layer) && map.removeLayer(
            placesMarkerData.edit_marker_layer);
        var t = placesMarkerData.edit_marker_layer.getLatLng();
        placesMarkerAddToMap(t.lat, t.lng, placesMarkerData.marker_icon)
    }
}

function placesMarkerPanTo(e) {
    try {
        var t = placesMarkerData.markers[e].data.lng,
            a = placesMarkerData.markers[e].data.lat;
        map.panTo({
            lat: a,
            lng: t
        })
    } catch (e) {}
}

function placesMarkerVisibleToggle(e) {
    var t = document.getElementById("marker_visible_" + e).checked;
    placesMarkerData.markers[e].visible = t, placesMarkerVisible(e, t)
}

function placesMarkerVisible(e, t) {
    var a = placesMarkerData.markers[e].marker_layer;
    1 == t ? "true" == placesMarkerData.markers[e].data.visible && mapLayers
        .places_markers.addLayer(a) : mapLayers.places_markers.removeLayer(a)
}

function markerGroupVisibleToggle(e) {
    var t = document.getElementById("marker_group_visible_" + e).checked;
    for (var a in placesMarkerData.markers) placesMarkerData.markers[a].data
        .group_id == e && (placesGroupData.groups[e].marker_visible = t,
            placesMarkerData.markers[a].visible = t, placesSetListCheckbox(
                "marker_visible_" + a, t), placesMarkerVisible(a, t))
}

function placesMarkerVisibleAllToggle() {
    1 == gsValues.map_markers ? placesMarkerVisibleAll(!1) :
        placesMarkerVisibleAll(!0)
}

function placesMarkerVisibleAll(e) {
    if (gsValues.map_markers = e, 1 == e) {
        for (var t in placesGroupData.groups) placesGroupData.groups[t]
            .marker_visible = !0, placesSetListCheckbox(
                "marker_group_visible_" + t, !0);
        for (var t in placesMarkerData.markers) placesMarkerData.markers[t]
            .visible = !0, placesSetListCheckbox("marker_visible_" + t, !0),
            placesMarkerVisible(t, !0)
    } else {
        for (var t in placesGroupData.groups) placesGroupData.groups[t]
            .marker_visible = !1, placesSetListCheckbox(
                "marker_group_visible_" + t, !1);
        for (var t in placesMarkerData.markers) placesMarkerData.markers[t]
            .visible = !1, placesSetListCheckbox("marker_visible_" + t, !1);
        placesMarkerRemoveAllFromMap()
    }
}
placesMarkerData.markers = new Array, placesMarkerData.default_icons_loaded = !
    1, placesMarkerData.custom_icons_loaded = !1, placesMarkerData.marker_icon =
    "img/markers/places/pin-1.svg", placesMarkerData.new_marker_id = 1,
    placesMarkerData.edit_marker_id = !1, placesMarkerData.edit_marker_layer = !
    1;
var placesZoneData = new Array;

function placesZoneReload() {
    placesGroupLoadData(), placesZoneLoadData(), $(
        "#side_panel_places_zone_list_grid").trigger("reloadGrid")
}

function placesZoneLoadData() {
    $.ajax({
        type: "POST",
        url: "func/fn_places.php",
        data: {
            cmd: "load_zone_data"
        },
        dataType: "json",
        cache: !1,
        success: function(e) {
            placesZoneData.zones = e, placesZoneInitLists(),
                placesZoneSetListCheckbox(),
                placesZoneSetListNumber(), "" != placesZoneData
                .zones ? placesZoneAddAllToMap() :
                placesZoneRemoveAllFromMap()
        }
    })
}














function placesZoneDelete(e) {
    utilsCheckPrivileges("viewer")  && 1 !=
        gsValues.map_bussy && (placesZonePanTo(e), confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_zone",
                        zone_id: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_places.php",
                        data: a,
                        success: function(t) {
                            "OK" == t && (placesZoneVisible(e, !
                                    1),
                                delete placesZoneData.zones[
                                    e],
                                placesZoneSetListNumber(),
                                placesZoneInitLists(), $(
                                    "#side_panel_places_zone_list_grid"
                                    ).trigger("reloadGrid"))
                        }
                    })
                }
            }))
}



function placesZoneLatLngsToVerticesString(e) {
    for (var t = [], a = 0; a < e.length; a++) {
        var o = e[a],
            i = o.lat,
            s = o.lng;
        t.push(parseFloat(i).toFixed(6) + "," + parseFloat(s).toFixed(6))
    }
    return t.push(t[0]), t.toString()
}

function placesZoneVerticesStringToLatLngs(e) {
    var t = e.split(","),
        a = [];
    for (j = 0; j < t.length; j += 2) lat = t[j], lng = t[j + 1], a.push(L
        .latLng(lat, lng));
    return a
}

function placesZoneProperties(e) {
    if (utilsCheckPrivileges("viewer"))
        switch (e) {
            default:
                if (1 == gsValues.map_bussy) return;
                map.doubleClickZoom.disable(), gsValues.map_bussy = !0;
                var t = e;
                placesZoneData.edit_zone_id = t, document.getElementById(
                        "dialog_places_zone_name").value = placesZoneData.zones[
                        t].data.name, document.getElementById(
                        "dialog_places_zone_group").value = placesZoneData
                    .zones[t].data.group_id, $("#dialog_places_zone_group")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_places_zone_color").value = placesZoneData
                    .zones[t].data.color.substr(1), document.getElementById(
                        "dialog_places_zone_color").style.backgroundColor =
                    placesZoneData.zones[t].data.color, document.getElementById(
                        "dialog_places_zone_visible").checked = strToBoolean(
                        placesZoneData.zones[t].data.visible), document
                    .getElementById("dialog_places_zone_name_visible").checked =
                    strToBoolean(placesZoneData.zones[t].data.name_visible),
                    document.getElementById("dialog_places_zone_area").value =
                    placesZoneData.zones[t].data.area, $(
                        "#dialog_places_zone_area").multipleSelect("refresh"),
                    $("#dialog_places_zone_properties").dialog("open"),
                    placesZoneVisible(placesZoneData.edit_zone_id, !1);
                var a = (i = placesZoneData.zones[placesZoneData.edit_zone_id])
                    .data.color,
                    o = placesZoneVerticesStringToLatLngs(i.data.vertices);
                placesZoneData.edit_zone_layer = L.polygon(o, {
                        color: a,
                        fill: !0,
                        fillColor: a,
                        fillOpacity: .4,
                        opacity: .8,
                        weight: 3
                    }), map.addLayer(placesZoneData.edit_zone_layer),
                    placesZoneFitBounds(t), setTimeout(function() {
                        placesZoneData.edit_zone_layer.enableEdit()
                    }, 200);
                break;
            case "cancel":
                map.editTools.stopDrawing(), map.off("editable:drawing:end"),
                    map.hasLayer(placesZoneData.edit_zone_layer) && map
                    .removeLayer(placesZoneData.edit_zone_layer);
                var i = placesZoneData.zones[placesZoneData.edit_zone_id];
                0 != placesZoneData.edit_zone_id && 1 == i.visible &&
                    placesZoneVisible(placesZoneData.edit_zone_id, !0),
                    placesZoneData.edit_zone_layer = !1, placesZoneData
                    .edit_zone_id = !1, gsValues.map_bussy = !1, map
                    .doubleClickZoom.enable(), $(
                        "#dialog_places_zone_properties").dialog("close");
                break;
            case "save":
                var s = document.getElementById("dialog_places_zone_name")
                    .value,
                    n = document.getElementById("dialog_places_zone_group")
                    .value,
                    l = "#" + document.getElementById(
                        "dialog_places_zone_color").value,
                    d = document.getElementById("dialog_places_zone_visible")
                    .checked,
                    r = document.getElementById(
                        "dialog_places_zone_name_visible").checked,
                    _ = document.getElementById("dialog_places_zone_area")
                    .value;
                if ("" == s) {
                    notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                    break
                }
                if (!placesZoneData.edit_zone_layer) {
                    notifyBox("error", la.ERROR, la
                        .DRAW_ZONE_ON_MAP_BEFORE_SAVING);
                    break
                }
                if (placesZoneData.edit_zone_layer.getLatLngs()[0].length < 3) {
                    notifyBox("error", la.ERROR, la
                        .DRAW_ZONE_ON_MAP_BEFORE_SAVING);
                    break
                }
                if (placesZoneData.edit_zone_layer.getLatLngs()[0].length > 80)
                    return void notifyBox("error", la.ERROR, la
                        .ZONE_CANT_HAVE_MORE_THAN_NUM_VERTICES);
                var c = placesZoneLatLngsToVerticesString(placesZoneData
                    .edit_zone_layer.getLatLngs()[0]);
                map.off("editable:drawing:end"), map.editTools.stopDrawing(),
                    map.hasLayer(placesZoneData.edit_zone_layer) && map
                    .removeLayer(placesZoneData.edit_zone_layer), 0 ==
                    placesZoneData.edit_zone_id && (placesZoneData
                        .new_zone_id += 1);
                var g = {
                    cmd: "save_zone",
                    zone_id: placesZoneData.edit_zone_id,
                    group_id: n,
                    zone_name: s,
                    zone_color: l,
                    zone_visible: d,
                    zone_name_visible: r,
                    zone_area: _,
                    zone_vertices: c
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_places.php",
                    data: g,
                    success: function(e) {
                        placesZoneData.edit_zone_layer = !1,
                            placesZoneData.edit_zone_id = !1,
                            gsValues.map_bussy = !1, map
                            .doubleClickZoom.enable(), $(
                                "#dialog_places_zone_properties")
                            .dialog("close"), "OK" == e ? (
                                placesZoneLoadData(), $(
                                    "#side_panel_places_zone_list_grid"
                                    ).trigger("reloadGrid")) :
                            "ERROR_ZONE_LIMIT" == e && notifyBox(
                                "error", la.ERROR, la
                                .ZONE_LIMIT_IS_REACHED)
                    }
                })
        }
}

function placesZonePanTo(e) {
    try {
        var t = placesZoneData.zones[e].zone_layer.getBounds().getCenter();
        map.panTo(t)
    } catch (e) {}
}

function placesZoneFitBounds(e) {
    var t = placesZoneData.zones[e].zone_layer.getBounds();
    map.fitBounds(t)
}

function placesZoneVisibleToggle(e) {
    var t = document.getElementById("zone_visible_" + e).checked;
    placesZoneData.zones[e].visible = t, placesZoneVisible(e, t)
}

function placesZoneVisible(e, t) {
    var a = placesZoneData.zones[e].zone_layer,
        o = placesZoneData.zones[e].label_layer;
    1 == t ? ("true" == placesZoneData.zones[e].data.visible ? mapLayers
        .places_zones.addLayer(a) : mapLayers.places_zones.removeLayer(a),
        "true" == placesZoneData.zones[e].data.name_visible || "0" !=
        placesZoneData.zones[e].data.area ? mapLayers.places_zones.addLayer(
            o) : mapLayers.places_zones.removeLayer(o)) : (mapLayers
        .places_zones.removeLayer(a), mapLayers.places_zones.removeLayer(o))
}

function zoneGroupVisibleToggle(e) {
    var t = document.getElementById("zone_group_visible_" + e).checked;
    for (var a in placesZoneData.zones) placesZoneData.zones[a].data.group_id ==
        e && (placesGroupData.groups[e].zone_visible = t, placesZoneData.zones[
                a].visible = t, placesSetListCheckbox("zone_visible_" + a, t),
            placesZoneVisible(a, t))
}

function placesZoneVisibleAllToggle() {
    1 == gsValues.map_zones ? placesZoneVisibleAll(!1) : placesZoneVisibleAll(!
        0)
}

function placesZoneVisibleAll(e) {
    if (gsValues.map_zones = e, 1 == e) {
        for (var t in placesGroupData.groups) placesGroupData.groups[t]
            .zone_visible = !0, placesSetListCheckbox("zone_group_visible_" + t,
                !0);
        for (var t in placesZoneData.zones) placesZoneData.zones[t].visible = !
            0, placesSetListCheckbox("zone_visible_" + t, !0),
            placesZoneVisible(t, !0)
    } else {
        for (var t in placesGroupData.groups) placesGroupData.groups[t]
            .zone_visible = !1, placesSetListCheckbox("zone_group_visible_" + t,
                !1);
        for (var t in placesZoneData.zones) placesZoneData.zones[t].visible = !
            1, placesSetListCheckbox("zone_visible_" + t, !1);
        placesZoneRemoveAllFromMap()
    }
}
placesZoneData.zones = new Array, placesZoneData.new_zone_id = 1, placesZoneData
    .edit_zone_id = !1, placesZoneData.edit_zone_layer = !1;
var placesRouteData = new Array;

function placesRouteReload() {
    placesGroupLoadData(), placesRouteLoadData(), $(
        "#side_panel_places_route_list_grid").trigger("reloadGrid")
}

function placesRouteLoadData() {
    $.ajax({
        type: "POST",
        url: "func/fn_places.php",
        data: {
            cmd: "load_route_data"
        },
        dataType: "json",
        cache: !1,
        success: function(e) {
            placesRouteData.routes = e, placesRouteInitLists(),
                placesRouteSetListCheckbox(),
                placesRouteSetListNumber(), "" != placesRouteData
                .routes ? placesRouteAddAllToMap() :
                placesRouteRemoveAllFromMap()
        }
    })
}

function placesRouteInitLists() {
    initSelectList("events_route_list"), initSelectList(
        "subaccounts_route_list")
}

function placesRouteSetListNumber() {
    document.getElementById("side_panel_places_routes_num").innerHTML = "(" +
        Object.keys(placesRouteData.routes).length + ")"
}

function placesRouteSetListCheckbox() {
    for (var e in placesGroupData.groups) placesSetListCheckbox(
        "route_group_visible_" + e, placesGroupData.groups[e].route_visible);
    for (var e in placesRouteData.routes) placesSetListCheckbox(
        "route_visible_" + e, placesRouteData.routes[e].visible)
}

function placesRouteAddAllToMap() {
    var e = document.getElementById("side_panel_places_route_list_search")
    .value;
    for (var t in placesRouteRemoveAllFromMap(), placesRouteData.routes) {
        var a = placesRouteData.routes[t];
        if (strMatches(a.data.name, e)) {
            var o = a.data.name,
                i = a.data.color,
                s = a.data.visible,
                n = a.data.name_visible,
                l = a.data.points;
            try {
                placesRouteAddRouteToMap(t, o, i, s, n, l)
            } catch (e) {}
        }
    }
}

function placesRouteAddRouteToMap(e, t, a, o, i, s) {
    var n = placesRoutePointsStringToLatLngs(s),
        l = L.polyline(n, {
            color: a,
            fill: !1,
            opacity: .8,
            weight: 3
        }),
        d = n[0],
        r = L.tooltip({
            permanent: !0,
            direction: "top"
        });
    r.setLatLng(d), r.setContent(t), "false" != o && mapLayers.places_routes
        .addLayer(l), "false" != i && mapLayers.places_routes.addLayer(r),
        placesRouteData.routes[e].route_layer = l, placesRouteData.routes[e]
        .label_layer = r
}

function placesRouteRemoveAllFromMap() {
    mapLayers.places_routes.clearLayers()
}

function placesRouteSearchMap(e) {
    for (var t in placesRouteData.routes) {
        var a = placesRouteData.routes[t];
        strMatches(a.data.name, e) ? 1 == a.visible && placesRouteVisible(t, !
            0) : placesRouteVisible(t, !1)
    }
}

function placesRouteDeleteAll() {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") && 1 !=
        gsValues.map_bussy && confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE_ALL_ROUTES,
            function(e) {
                if (e) {
                    $.ajax({
                        type: "POST",
                        url: "func/fn_places.php",
                        data: {
                            cmd: "delete_all_routes"
                        },
                        success: function(e) {
                            "OK" == e && (placesRouteLoadData(), $(
                                "#side_panel_places_route_list_grid"
                                ).trigger("reloadGrid"))
                        }
                    })
                }
            })
}

function placesRouteDelete(e) {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") && 1 !=
        gsValues.map_bussy && (placesRoutePanTo(e), confirmDialog(la
            .ARE_YOU_SURE_YOU_WANT_TO_DELETE,
            function(t) {
                if (t) {
                    var a = {
                        cmd: "delete_route",
                        route_id: e
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_places.php",
                        data: a,
                        success: function(t) {
                            "OK" == t && (placesRouteVisible(e,
                                    !1),
                                delete placesRouteData
                                .routes[e],
                                placesRouteSetListNumber(),
                                placesRouteInitLists(), $(
                                    "#side_panel_places_route_list_grid"
                                    ).trigger("reloadGrid"))
                        }
                    })
                }
            }))
}

function placesRouteSave(e) {
    if (utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") &&
        1 != gsValues.map_bussy) {
        gsValues.map_bussy = !0, document.getElementById(
                "side_panel_places_tab").click(), document.getElementById(
                "side_panel_places_routes_tab").click(), document
            .getElementById("dialog_places_route_name").value = la.NEW_ROUTE +
            " " + placesRouteData.new_route_id, document.getElementById(
                "dialog_places_route_group").value = 0, $(
                "#dialog_places_route_group").multipleSelect("refresh"),
            document.getElementById("dialog_places_route_color").value =
            "FF0000", document.getElementById("dialog_places_route_color").style
            .backgroundColor = "#FF0000", document.getElementById(
                "dialog_places_route_visible").checked = !0, document
            .getElementById("dialog_places_route_name_visible").checked = !0,
            document.getElementById("dialog_places_route_deviation").value =
            "0.5", $("#dialog_places_route_properties").dialog("open");
        placesRouteData.edit_route_layer = L.polyline(e, {
                color: "#FF0000",
                fill: !1,
                opacity: .8,
                weight: 3
            }), map.addLayer(placesRouteData.edit_route_layer), placesRouteData
            .edit_route_layer.enableEdit();
        var t = placesRouteData.edit_route_layer.getBounds();
        map.fitBounds(t)
    }
}

function placesRouteNew(e) {
    utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser") && 1 !=
        gsValues.map_bussy && (map.doubleClickZoom.disable(), gsValues
            .map_bussy = !0, document.getElementById("dialog_places_route_name")
            .value = la.NEW_ROUTE + " " + placesRouteData.new_route_id, document
            .getElementById("dialog_places_route_group").value = 0, $(
                "#dialog_places_route_group").multipleSelect("refresh"),
            document.getElementById("dialog_places_route_color").value =
            "FF0000", document.getElementById("dialog_places_route_color").style
            .backgroundColor = "#FF0000", document.getElementById(
                "dialog_places_route_visible").checked = !0, document
            .getElementById("dialog_places_route_name_visible").checked = !0,
            document.getElementById("dialog_places_route_deviation").value =
            "0.5", $("#dialog_places_route_properties").dialog("open"), null !=
            e ? (map.editTools.startPolyline(e), placesRouteData
                .edit_start_label_layer = L.tooltip({
                    permanent: !0,
                    offset: [10, 0],
                    direction: "right"
                }), placesRouteData.edit_start_label_layer.setLatLng(e),
                placesRouteData.edit_start_label_layer.setContent(la
                    .ROUTE_START), map.addLayer(placesRouteData
                    .edit_start_label_layer)) : map.editTools.startPolyline(),
            map.on("editable:editing editable:drag", function(e) {
                placesRouteData.edit_route_layer = e.layer;
                var t = placesRouteData.edit_route_layer.getLatLngs(),
                    a = t[0],
                    o = t[t.length - 1];
                map.hasLayer(placesRouteData.edit_start_label_layer) ?
                    placesRouteData.edit_start_label_layer.setLatLng(a) : (
                        placesRouteData.edit_start_label_layer = L.tooltip({
                            permanent: !0,
                            offset: [10, 0],
                            direction: "right"
                        }), placesRouteData.edit_start_label_layer
                        .setLatLng(o), placesRouteData
                        .edit_start_label_layer.setContent(la.ROUTE_START),
                        map.addLayer(placesRouteData.edit_start_label_layer)
                        ), t.length > 1 && (map.hasLayer(placesRouteData
                            .edit_end_label_layer) ? placesRouteData
                        .edit_end_label_layer.setLatLng(o) : (
                            placesRouteData.edit_end_label_layer = L
                            .tooltip({
                                permanent: !0,
                                offset: [10, 0],
                                direction: "right"
                            }), placesRouteData.edit_end_label_layer
                            .setLatLng(o), placesRouteData
                            .edit_end_label_layer.setContent(la.ROUTE_END),
                            map.addLayer(placesRouteData
                                .edit_end_label_layer)))
            }))
}

function placesRouteLatLngsToPointsString(e) {
    for (var t = [], a = 0; a < e.length; a++) {
        var o = e[a],
            i = o.lat,
            s = o.lng;
        t.push(parseFloat(i).toFixed(6) + "," + parseFloat(s).toFixed(6))
    }
    return t.toString()
}

function placesRoutePointsStringToLatLngs(e) {
    var t = e.split(","),
        a = [];
    for (j = 0; j < t.length; j += 2) lat = t[j], lng = t[j + 1], a.push(L
        .latLng(lat, lng));
    return a
}

function placesRouteProperties(e) {
    if (utilsCheckPrivileges("viewer") && utilsCheckPrivileges("subuser"))
        switch (e) {
            default:
                if (1 == gsValues.map_bussy) return;
                map.doubleClickZoom.disable(), gsValues.map_bussy = !0;
                var t = e;
                placesRouteData.edit_route_id = t, document.getElementById(
                        "dialog_places_route_name").value = placesRouteData
                    .routes[t].data.name, document.getElementById(
                        "dialog_places_route_group").value = placesRouteData
                    .routes[t].data.group_id, $("#dialog_places_route_group")
                    .multipleSelect("refresh"), document.getElementById(
                        "dialog_places_route_color").value = placesRouteData
                    .routes[t].data.color.substr(1), document.getElementById(
                        "dialog_places_route_color").style.backgroundColor =
                    placesRouteData.routes[t].data.color, document
                    .getElementById("dialog_places_route_visible").checked =
                    strToBoolean(placesRouteData.routes[t].data.visible),
                    document.getElementById("dialog_places_route_name_visible")
                    .checked = strToBoolean(placesRouteData.routes[t].data
                        .name_visible), document.getElementById(
                        "dialog_places_route_deviation").value = placesRouteData
                    .routes[t].data.deviation, $(
                        "#dialog_places_route_properties").dialog("open"),
                    placesRouteVisible(placesRouteData.edit_route_id, !1);
                var a = (i = placesRouteData.routes[placesRouteData
                        .edit_route_id]).data.color,
                    o = placesRoutePointsStringToLatLngs(i.data.points);
                placesRouteData.edit_route_layer = L.polyline(o, {
                        color: a,
                        fill: !1,
                        opacity: .8,
                        weight: 3
                    }), map.addLayer(placesRouteData.edit_route_layer),
                    placesRouteFitBounds(t), setTimeout(function() {
                        placesRouteData.edit_route_layer.enableEdit()
                    }, 200);
                break;
            case "cancel":
                map.off("editable:editing editable:drag"), map.editTools
                    .stopDrawing(), map.hasLayer(placesRouteData
                        .edit_route_layer) && map.removeLayer(placesRouteData
                        .edit_route_layer), map.hasLayer(placesRouteData
                        .edit_start_label_layer) && map.removeLayer(
                        placesRouteData.edit_start_label_layer), map.hasLayer(
                        placesRouteData.edit_end_label_layer) && map
                    .removeLayer(placesRouteData.edit_end_label_layer);
                var i = placesRouteData.routes[placesRouteData.edit_route_id];
                0 != placesRouteData.edit_route_id && 1 == i.visible &&
                    placesRouteVisible(placesRouteData.edit_route_id, !0),
                    placesRouteData.edit_route_layer = !1, placesRouteData
                    .edit_start_label_layer = !1, placesRouteData
                    .edit_end_label_layer = !1, placesRouteData
                    .edit_route_id = !1, gsValues.map_bussy = !1, map
                    .doubleClickZoom.enable(), $(
                        "#dialog_places_route_properties").dialog("close");
                break;
            case "save":
                var s = document.getElementById("dialog_places_route_name")
                    .value,
                    n = document.getElementById("dialog_places_route_group")
                    .value,
                    l = "#" + document.getElementById(
                        "dialog_places_route_color").value,
                    d = document.getElementById("dialog_places_route_visible")
                    .checked,
                    r = document.getElementById(
                        "dialog_places_route_name_visible").checked,
                    _ = document.getElementById("dialog_places_route_deviation")
                    .value;
                if ("" == s) {
                    notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
                    break
                }
                if (_ < 0 || "" == _) {
                    notifyBox("error", la.ERROR, la
                        .DEVIATION_CANT_BE_LESS_THAN_0);
                    break
                }
                if (!placesRouteData.edit_route_layer) {
                    notifyBox("error", la.ERROR, la
                        .DRAW_ROUTE_ON_MAP_BEFORE_SAVING);
                    break
                }
                if (placesRouteData.edit_route_layer.getLatLngs().length < 2) {
                    notifyBox("error", la.ERROR, la
                        .DRAW_ROUTE_ON_MAP_BEFORE_SAVING);
                    break
                }
                if (placesRouteData.edit_route_layer.getLatLngs().length > 200)
                    return void notifyBox("error", la.ERROR, la
                        .ROUTE_CANT_HAVE_MORE_THAN_NUM_POINTS);
                o = placesRouteLatLngsToPointsString(placesRouteData
                    .edit_route_layer.getLatLngs());
                map.off("editable:editing editable:drag"), map.editTools
                    .stopDrawing(), map.hasLayer(placesRouteData
                        .edit_route_layer) && map.removeLayer(placesRouteData
                        .edit_route_layer), map.hasLayer(placesRouteData
                        .edit_start_label_layer) && map.removeLayer(
                        placesRouteData.edit_start_label_layer), map.hasLayer(
                        placesRouteData.edit_end_label_layer) && map
                    .removeLayer(placesRouteData.edit_end_label_layer), 0 ==
                    placesRouteData.edit_route_id && (placesRouteData
                        .new_route_id += 1);
                var c = {
                    cmd: "save_route",
                    route_id: placesRouteData.edit_route_id,
                    group_id: n,
                    route_name: s,
                    route_color: l,
                    route_visible: d,
                    route_name_visible: r,
                    route_deviation: _,
                    route_points: o
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_places.php",
                    data: c,
                    success: function(e) {
                        placesRouteData.edit_route_layer = !1,
                            placesRouteData
                            .edit_start_label_layer = !1,
                            placesRouteData.edit_end_label_layer = !
                            1, placesRouteData.edit_route_id = !1,
                            gsValues.map_bussy = !1, map
                            .doubleClickZoom.enable(), $(
                                "#dialog_places_route_properties")
                            .dialog("close"), "OK" == e ? (
                                placesRouteLoadData(), $(
                                    "#side_panel_places_route_list_grid"
                                    ).trigger("reloadGrid")) :
                            "ERROR_ROUTE_LIMIT" == e && notifyBox(
                                "error", la.ERROR, la
                                .ROUTE_LIMIT_IS_REACHED)
                    }
                })
        }
}

function placesRoutePanTo(e) {
    try {
        var t = placesRouteData.routes[e].route_layer.getBounds().getCenter();
        map.panTo(t)
    } catch (e) {}
}

function placesRouteFitBounds(e) {
    var t = placesRouteData.routes[e].route_layer.getBounds();
    map.fitBounds(t)
}

function placesRouteVisibleToggle(e) {
    var t = document.getElementById("route_visible_" + e).checked;
    placesRouteData.routes[e].visible = t, placesRouteVisible(e, t)
}

function placesRouteVisible(e, t) {
    var a = placesRouteData.routes[e].route_layer,
        o = placesRouteData.routes[e].label_layer;
    1 == t ? ("true" == placesRouteData.routes[e].data.visible ? mapLayers
            .places_routes.addLayer(a) : mapLayers.places_routes.removeLayer(a),
            "true" == placesRouteData.routes[e].data.name_visible ? mapLayers
            .places_routes.addLayer(o) : mapLayers.places_routes.removeLayer(o)
            ) : (mapLayers.places_routes.removeLayer(a), mapLayers.places_routes
            .removeLayer(o))
}

function routeGroupVisibleToggle(e) {
    var t = document.getElementById("route_group_visible_" + e).checked;
    for (var a in placesRouteData.routes) placesRouteData.routes[a].data
        .group_id == e && (placesGroupData.groups[e].route_visible = t,
            placesRouteData.routes[a].visible = t, placesSetListCheckbox(
                "route_visible_" + a, t), placesRouteVisible(a, t))
}

function placesRouteVisibleAllToggle() {
    1 == gsValues.map_routes ? placesRouteVisibleAll(!1) :
        placesRouteVisibleAll(!0)
}

function placesRouteVisibleAll(e) {
    if (gsValues.map_routes = e, 1 == e) {
        for (var t in placesGroupData.groups) placesGroupData.groups[t]
            .route_visible = !0, placesSetListCheckbox("route_group_visible_" +
                t, !0);
        for (var t in placesRouteData.routes) placesRouteData.routes[t]
            .visible = !0, placesSetListCheckbox("route_visible_" + t, !0),
            placesRouteVisible(t, !0)
    } else {
        for (var t in placesGroupData.groups) placesGroupData.groups[t]
            .route_visible = !1, placesSetListCheckbox("route_group_visible_" +
                t, !1);
        for (var t in placesRouteData.routes) placesRouteData.routes[t]
            .visible = !1, placesSetListCheckbox("route_visible_" + t, !1);
        placesRouteRemoveAllFromMap()
    }
}

placesRouteData.routes = new Array, placesRouteData.new_route_id = 1,
    placesRouteData.edit_route_id = !1, placesRouteData.edit_route_layer = !1,
    placesRouteData.edit_start_label_layer = !1, placesRouteData
    .edit_end_label_layer = !1;



settingsEditData.object_icon = !1, settingsEditData.object_imei = !1,
    settingsEditData.object_duplicate_imei = !1, settingsEditData.sensor_id = !
    1, settingsEditData.sensor_calibration = new Array, settingsEditData
    .sensor_dictionary = new Array, settingsEditData.service_id = !1,
    settingsEditData.custom_field_id = !1, settingsEditData.group_id = !1,
    settingsEditData.driver_id = !1, settingsEditData.driver_img_file = !1,
    settingsEditData.passenger_id = !1, settingsEditData.trailer_id = !1,
    settingsEditData.event_id = !1, settingsEditData.event_condition =
    new Array, settingsEditData.template_id = !1, settingsEditData
    .subaccount_id = !1, settingsEditData.subaccount_au = !1, settingsEditData
    .default_icons_loaded = !1, settingsEditData.custom_icons_loaded = !1,
    gsValues.title = document.title, gsValues.map_fit_objects_finished = !1,
    gsValues.map_objects = !0, gsValues.map_object_labels = !0, gsValues
    .map_markers = !0, gsValues.map_routes = !0, gsValues.map_zones = !0,
    gsValues.map_clusters = !0, gsValues.map_street_view = !1, gsValues
    .map_traffic = !1, gsValues.objects_visible = !0, gsValues
    .objects_follow = !1, gsValues.datalist_groups_colapsed = new Array,
    gsValues.datalist_groups_colapsed.object = new Array, gsValues
    .datalist_groups_colapsed.event = new Array, gsValues
    .datalist_groups_colapsed.route = new Array, gsValues
    .datalist_first_show = !0;
var la = [],
    map, mapPopup, mapMarkerIcons = new Array,
    objectServiceCacheLoaded = !1,
    mapLayers = new Array,
    objectsData = new Array,
    fuelData = new Array,
    guiDragbars = new Array,
    menuOnItem, timer_objectLoadData;
guiDragbars.objects = 180, guiDragbars.events = 180, guiDragbars.history = 180,
    guiDragbars.bottom_panel = 178;
var isIE = eval("/*@cc_on!@*/!1");




function unload() {
    settingsSaveCookies()
}

function objectLoadList() {
    var e = $("#side_panel_objects_object_list_grid");
    for (var t in e.clearGridData(!0), settingsObjectData) {
        var a = settingsObjectData[t];
        if ("true" == a.active) {
            var o = a.name.toLowerCase() + t.toLowerCase(),
                i = a.name.toLowerCase(),
                s = a.group_id,
                n = '<input id="object_visible_' + t +
                '" onClick="objectVisibleToggle(\'' + t +
                '\');" class="checkbox" type="checkbox"/>',
                l = '<input id="object_follow_' + t +
                '" onClick="objectFollowToggle(\'' + t +
                '\');" class="checkbox" type="checkbox"/>',
                d = '<a href="#"><img src="' + a.icon +
                '" style="width: 26px;"/></a>',
                r =
                '<div class="object-list-item"><div class="left"><div class="name">' +
                a.name + '</div><div class="status" id="object_status_' + t +
                '">' + la.NO_DATA + "</div></div>";
            r += '<div class="right"><div class="speed" id="object_speed_' + t +
                '">0 ' + la.UNIT_SPEED + "</div>", r +=
                '<div class="engine" id="object_engine_' + t + '"></div>', r +=
                '<div class="connection" id="object_connection_' + t + '">' +
                getConnectionIcon(0) + "</div></div></div>";
            var _ = '<div class="object-action-menu" id="object_action_menu_' +
                t + '" tag="' + t +
                '"><a href="#"><img src="theme/images/menu.svg" style="width: 4px;" title="' +
                la.ACTION + '"/></a></div>';
            e.jqGrid("addRowData", t, {
                search: o,
                name_sort: i,
                group_id: s,
                show: n,
                follow: l,
                icon: d,
                name: r,
                menu: _
            })
        }
    }
    e.setGridParam({
        sortname: "name_sort",
        sortorder: "asc"
    }).trigger("reloadGrid")
}

function objectReloadData() {
    objectsData = [], objectLoadList(), objectLoadData()
}



function fuelLoadData(){
    $.ajax({
        type: "POST",
        url: "func/fn_fuel.php",
        data: {
            cmd: "load_fuel_data"
        },
        dataType: "json",
        cache: !1,
        error: function(e, t) {
         
        },
        success: function(result) {
        	
    
        fuelData.pumps = result['pumps'];
        fuelData.vehicles = result['vehicles'];
        fuelData.drivers = result['drivers'];
    
        }
    })
	
}



function objectLoadData() {
    clearTimeout(timer_objectLoadData);
    $.ajax({
        type: "POST",
        url: "func/fn_objects.php",
        data: {
            cmd: "load_object_data",
            include_service: objectServiceCacheLoaded ? "0" : "1"
        },
        dataType: "json",
        cache: !1,
        error: function(e, t) {
            timer_objectLoadData = setTimeout("objectLoadData();",
                1e3 * gsValues.map_refresh)
        },
        success: function(e) {
            for (var t in e) e[t] = transformToObjectData(e[t]);
            if (Object.keys(objectsData).length != Object.keys(e)
                .length) objectsData = e;
            else
                for (var t in e) {
                    if (objectsData[t].connection = e[t].connection,
                        objectsData[t].status = e[t].status,
                        objectsData[t].status_string = e[t]
                        .status_string, objectsData[t].odometer = e[
                            t].odometer, objectsData[t]
                        .engine_hours = e[t].engine_hours,
                        e[t].service && e[t].service.length > 0 && (objectsData[t].service = e[t].service), "" ==
                        objectsData[t].data) objectsData[t].data =
                        e[t].data;
                    else if (objectsData[t].data.length >=
                        settingsObjectData[t].tail_points &&
                        objectsData[t].data.pop(), objectsData[t]
                        .data.unshift(e[t].data[0]), 1 ==
                        objectsData[t].selected && 1 == gsValues
                        .map_street_view) utilsStreetView(
                        objectsData[t].data[0].lat, objectsData[
                            t].data[0].lng, objectsData[t].data[
                            0].angle);
                    settingsObjectData[t].protocol = e[t].protocol,
                        settingsObjectData[t].odometer = e[t]
                        .odometer, settingsObjectData[t]
                        .engine_hours = Math.floor(e[t]
                            .engine_hours / 60 / 60)
                }
            objectUpdateList(), objectAddAllToMap(), "fit" ==
                settingsUserData.map_sp && 0 == gsValues
                .map_fit_objects_finished && (fitObjectsOnMap(),
                    gsValues.map_fit_objects_finished = !0),
                objectFollow(), 1 == $("#dialog_dashboard").dialog(
                    "isOpen") && dashboardInitObjects(),
                objectServiceCacheLoaded = !0,
                timer_objectLoadData = setTimeout(
                    "objectLoadData();", 1e3 * gsValues.map_refresh)
        }
    })
}

function objectUpdateList() {
    for (var e in objectsData) {
        if ("" != objectsData[e].data) {
            if (null != document.getElementById("object_status_" + e)) {
                document.getElementById("object_visible_" + e).checked =
                    objectsData[e].visible, document.getElementById(
                        "object_follow_" + e).checked = objectsData[e].follow;
                var t = objectsData[e].status_string;
                "server" == settingsUserData.od ? document.getElementById(
                        "object_status_" + e).innerHTML = objectsData[e].data[0]
                    .dt_server : "status" == settingsUserData.od && "" != t ?
                    document.getElementById("object_status_" + e).innerHTML =
                    t : document.getElementById("object_status_" + e)
                    .innerHTML = objectsData[e].data[0].dt_tracker, document
                    .getElementById("object_speed_" + e).innerHTML =
                    objectsData[e].data[0].speed + " " + la.UNIT_SPEED;
                var a = getSensorFromType(e, "acc");
                if (0 == a || 0 == objectsData[e].connection) document
                    .getElementById("object_engine_" + e).innerHTML = "";
                else 1 == getSensorValue(objectsData[e].data[0].params, a[0])
                    .value ? document.getElementById("object_engine_" + e)
                    .innerHTML = getEngineIcon(1) : document.getElementById(
                        "object_engine_" + e).innerHTML = getEngineIcon(0);
                if (document.getElementById("object_connection_" + e)
                    .innerHTML = getConnectionIcon(objectsData[e].connection),
                    1 == objectsData[e].selected) datalistShowData("object", e,
                    objectsData[e].data[0])
            }
        } else null != document.getElementById("object_status_" + e) && (
            document.getElementById("object_visible_" + e).checked =
            objectsData[e].visible, document.getElementById(
                "object_follow_" + e).checked = objectsData[e].follow,
            document.getElementById("object_status_" + e).innerHTML = la
            .NO_DATA, document.getElementById("object_speed_" + e)
            .innerHTML = "0 " + la.UNIT_SPEED, document.getElementById(
                "object_engine_" + e).innerHTML = "", document
            .getElementById("object_connection_" + e).innerHTML =
            getConnectionIcon(objectsData[e].connection));
        objectSetListStatus(e, objectsData[e].status, objectsData[e]
            .event_ohc_color)
    }
    for (var o in settingsObjectGroupData) null != document.getElementById(
        "object_group_visible_" + o) && (document.getElementById(
        "object_group_visible_" + o).checked = settingsObjectGroupData[
        o].visible), null != document.getElementById(
        "object_group_follow_" + o) && (document.getElementById(
            "object_group_follow_" + o).checked = settingsObjectGroupData[o]
        .follow)
}

function objectSetListStatus(e, t, a) {
    var o = getObjectListColor(t, a),
        i = $("#side_panel_objects_object_list_grid");
    $(i).jqGrid("setRowData", e, !1, {
        background: o
    })
}

function objectAddAllToMap() {
    var e = document.getElementById("side_panel_objects_object_list_search")
        .value;
    for (var t in objectRemoveAllFromMap(), objectsData) "true" ==
        settingsObjectData[t].active && (strMatches(settingsObjectData[t].name,
            e) || strMatches(t, e)) && (objectAddToMap(t), objectVisible(t))
}

function objectRemoveAllFromMap() {
    mapLayers.realtime.clearLayers()
}

function objectSetStatusEvent(e, t, a) {
    if (null != objectsData[e])
        if (0 == t && 0 == a) {
            if (objectsData[e].event = !1, objectsData[e].event_arrow_color = !
                1, objectsData[e].event_ohc_color = !1, "arrow" ==
                settingsObjectData[e].map_icon) {
                var o = objectsData[e].data[0].speed,
                    i = objectsData[e].status,
                    s = getMarkerIcon(e, o, i, !1);
                objectsData[e].layers.marker.setIcon(s)
            }
            objectSetListStatus(e, objectsData[e].status, !1)
        } else {
            if (objectsData[e].event = !0, objectsData[e].event_arrow_color = t,
                objectsData[e].event_ohc_color = a, "arrow" ==
                settingsObjectData[e].map_icon) {
                o = objectsData[e].data[0].speed, i = objectsData[e].status, s =
                    getMarkerIcon(e, o, i, t);
                objectsData[e].layers.marker.setIcon(s)
            }
            objectSetListStatus(e, i, a)
        }
}

function objectAddToMap(e) {
    var t = settingsObjectData[e].name;
    if ("" != objectsData[e].data) var a = objectsData[e].data[0].lat,
        o = objectsData[e].data[0].lng,
        i = objectsData[e].data[0].altitude,
        s = objectsData[e].data[0].angle,
        n = objectsData[e].data[0].speed,
        l = objectsData[e].data[0].dt_tracker,
        d = objectsData[e].data[0].params;
    else a = 0, o = 0, n = 0, d = !1;
    var r = settingsUserData.map_is,
        _ = s;
    "arrow" != settingsObjectData[e].map_icon && (_ = 0);
    var c = objectsData[e].status,
        g = objectsData[e].event_arrow_color,
        m = getMarkerIcon(e, n, c, g),
        u = L.marker([a, o], {
            icon: m,
            iconAngle: _
        }),
        p = t + " (" + n + " " + la.UNIT_SPEED + ")";
    u.bindTooltip(p, {
            permanent: !0,
            offset: [20 * r, 0],
            direction: "right"
        }).openTooltip(), u.on("click", function(_) {
            objectSelect(e), "" != objectsData[e].data &&
                geocoderGetAddress(a, o, function(_) {
                    var c = _,
                        g = urlPosition(a, o),
                        m = "",
                        u = "",
                        p = "",
                        y = new Array;
                    for (var v in settingsObjectData[e].sensors) y.push(
                        settingsObjectData[e].sensors[v]);
                    var b = sortArrayByElement(y, "name");
                    for (var v in b) {
                        var h = b[v];
                        if ("true" == h.popup)
                            if ("fuelsumup" == h.type) {
                                var E = getSensorValueFuelLevelSumUp(e,
                                    d, h);
                                m += "<tr><td><strong>" + h.name +
                                    ":</strong></td><td>" + E
                                    .value_full + "</td></tr>"
                            } else {
                                E = getSensorValue(d, h);
                                m += "<tr><td><strong>" + h.name +
                                    ":</strong></td><td>" + E
                                    .value_full + "</td></tr>"
                            }
                    }
                    var f = new Array;
                    for (var v in settingsObjectData[e].custom_fields) f
                        .push(settingsObjectData[e].custom_fields[v]);
                    var I = sortArrayByElement(f, "name");
                    for (var v in I) {
                        var B = I[v];
                        "true" == B.popup && (u += "<tr><td><strong>" +
                            B.name + ":</strong></td><td>" + B
                            .value + "</td></tr>")
                    }
                    var D = new Array;
                    for (var v in objectsData[e].service) D.push(
                        objectsData[e].service[v]);
                    var O = sortArrayByElement(D, "name");
                    for (var v in O) "true" == O[v].popup && (p +=
                        "<tr><td><strong>" + O[v].name +
                        ":</strong></td><td>" + O[v].status +
                        "</td></tr>");
                    var j = "<table>\t\t\t\t\t<tr><td><strong>" + la
                        .OBJECT + ":</strong></td><td>" + t +
                        "</td></tr>\t\t\t\t\t<tr><td><strong>" + la
                        .ADDRESS + ":</strong></td><td>" + c +
                        "</td></tr>\t\t\t\t\t<tr><td><strong>" + la
                        .POSITION + ":</strong></td><td>" + g +
                        "</td></tr>\t\t\t\t\t<tr><td><strong>" + la
                        .ALTITUDE + ":</strong></td><td>" + i + " " + la
                        .UNIT_HEIGHT +
                        "</td></tr>\t\t\t\t\t<tr><td><strong>" + la
                        .ANGLE + ":</strong></td><td>" + s +
                        " &deg;</td></tr>\t\t\t\t\t<tr><td><strong>" +
                        la.SPEED + ":</strong></td><td>" + n + " " + la
                        .UNIT_SPEED +
                        "</td></tr>\t\t\t\t\t<tr><td><strong>" + la
                        .TIME + ":</strong></td><td>" + l +
                        "</td></tr>",
                        T = getObjectOdometer(e, !1); - 1 != T && (j +=
                        "<tr><td><strong>" + la.ODOMETER +
                        ":</strong></td><td>" + T + " " + la
                        .UNIT_DISTANCE + "</td></tr>");
                    var R = getObjectEngineHours(e, !1); - 1 != R && (
                        j += "<tr><td><strong>" + la.ENGINE_HOURS +
                        ":</strong></td><td>" + R + "</td></tr>");
                    var k = j + u + m + p;
                    addPopupToMap(a, o, [0, -14 * r], j += "</table>",
                        k += "</table>")
                })
        }), u.on("add", function(t) {
            0 == gsValues.map_object_labels && u.closeTooltip(),
                objectAddTailToMap(e)
        }), u.on("remove", function(t) {
            null != objectsData[e] && objectsData[e].layers.tail &&
                mapLayers.realtime.removeLayer(objectsData[e].layers.tail)
        }), u.imei = e, mapLayers.realtime.addLayer(u), objectsData[e].layers
        .marker = u
}

function objectAddTailToMap(e) {
    if (settingsObjectData[e].tail_points > 0) {
        objectsData[e].layers.tail && mapLayers.realtime.removeLayer(
            objectsData[e].layers.tail);
        var t, a = new Array;
        for (t = 0; t < objectsData[e].data.length; t++) {
            var o = objectsData[e].data[t].lat,
                i = objectsData[e].data[t].lng;
            a.push(L.latLng(o, i))
        }
        var s = L.polyline(a, {
            color: settingsObjectData[e].tail_color,
            opacity: .8,
            weight: 3
        });
        mapLayers.realtime.addLayer(s), objectsData[e].layers.tail = s
    }
}

function objectGroupVisibleToggle(e) {
    var t = document.getElementById("object_group_visible_" + e).checked;
    for (var a in settingsObjectData) settingsObjectData[a].group_id == e && (
        settingsObjectGroupData[e].visible = t, null != document
        .getElementById("object_visible_" + a) && (document.getElementById(
                "object_visible_" + a).checked = t, objectsData[a].visible =
            t, objectVisible(a)))
}

function objectVisibleToggle(e) {
    var t = document.getElementById("object_visible_" + e).checked;
    objectsData[e].visible = t, objectVisible(e)
}

function objectVisible(e) {
    1 == objectsData[e].visible ? mapLayers.realtime.addLayer(objectsData[e]
        .layers.marker) : mapLayers.realtime.removeLayer(objectsData[e]
        .layers.marker)
}

function objectVisibleAllToggle() {
    1 == gsValues.objects_visible ? objectVisibleAll(!1) : objectVisibleAll(!0)
}

function objectVisibleAll(e) {
    for (var t in gsValues.objects_visible = e, objectsData) objectsData[t]
        .visible = e, null != document.getElementById("object_visible_" + t) &&
        (document.getElementById("object_visible_" + t).checked = e),
        objectVisible(t);
    for (var a in settingsObjectGroupData) null != document.getElementById(
        "object_group_visible_" + a) && (settingsObjectGroupData[a]
        .visible = e, document.getElementById("object_group_visible_" + a)
        .checked = e)
}

function objectGroupFollowToggle(e) {
    var t = document.getElementById("object_group_follow_" + e).checked;
    for (var a in settingsObjectData) settingsObjectData[a].group_id == e && (
        settingsObjectGroupData[e].follow = t, null != document
        .getElementById("object_follow_" + a) && (document.getElementById(
                "object_follow_" + a).checked = t, objectsData[a].follow =
            t));
    objectFollow()
}

function objectFollowToggle(e) {
    var t = document.getElementById("object_follow_" + e).checked;
    objectsData[e].follow = t, objectFollow()
}

function objectFollow() {
    var e = document.getElementById("side_panel_objects_object_list_search")
        .value,
        t = 0,
        a = new Array;
    for (var o in objectsData)
        if (strMatches(settingsObjectData[o].name, e) && "" != objectsData[o]
            .data && 1 == objectsData[o].follow) {
            var i = objectsData[o].data[0].lat,
                s = objectsData[o].data[0].lng;
            a.push([i, s]), t += 1
        } t > 1 ? map.fitBounds(a) : 1 == t && map.panTo({
        lat: i,
        lng: s
    })
}

function objectFollowAllToggle() {
    1 == gsValues.objects_follow ? objectFollowAll(!1) : objectFollowAll(!0)
}

function objectFollowAll(e) {
    for (var t in gsValues.objects_follow = e, objectsData) objectsData[t]
        .follow = e, null != document.getElementById("object_follow_" + t) && (
            document.getElementById("object_follow_" + t).checked = e);
    for (var a in settingsObjectGroupData) null != document.getElementById(
        "object_group_follow_" + a) && (settingsObjectGroupData[a].follow =
        e, document.getElementById("object_group_follow_" + a).checked = e);
    objectFollow()
}

function objectPanToZoom(e) {
    if ("" != objectsData[e].data) {
        var t = objectsData[e].data[0].lat,
            a = objectsData[e].data[0].lng;
        map.setView([t, a], 15)
    }
}

function objectPanTo(e) {
    if ("" != objectsData[e].data) {
        var t = objectsData[e].data[0].lat,
            a = objectsData[e].data[0].lng;
        map.panTo({
            lat: t,
            lng: a
        })
    }
}

function objectSelect(e) {
    (objectUnSelectAll(), 0 != objectsData[e].event && objectSetStatusEvent(e, !
        1, !1), "" != objectsData[e].data) ? (objectsData[e].selected = !0,
        datalistShowData("object", e, objectsData[e].data[0]), 1 == gsValues
        .map_street_view && utilsStreetView(objectsData[e].data[0].lat,
            objectsData[e].data[0].lng, objectsData[e].data[0].angle)) : (
        notifyBox("info", la.INFORMATION, la.NO_DATA_HAS_BEEN_RECEIVED_YET),
        datalistShowData("object", e, ""))
}

function objectUnSelectAll() {
    for (var e in objectsData) objectsData[e].selected = !1
}
var utilsRulerData = new Array;
utilsRulerData.enabled = !1, utilsRulerData.line_layer, utilsRulerData
    .label_layer;
var utilsAreaData = new Array;
utilsAreaData.enabled = !1, utilsAreaData.area_layer;
var utilsRouteBetweenPointsData = new Array;
utilsRouteBetweenPointsData.route_points = !1;
var utilsFollowObjectData = new Array,
    utilsStreetViewData = new Array;

function utilsCheckPrivileges(e) {
    switch (e) {
        case "viewer":
            if (("" == settingsUserData.privileges || "viewer" ==
                    settingsUserData.privileges) && 0 == settingsUserData
                .cpanel_privileges) return notifyBox("error", la.ERROR, la
                .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "subuser":
            if ("subuser" == settingsUserData.privileges) return notifyBox(
                "error", la.ERROR, la
                .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "obj_add":
            if (0 != settingsUserData.manager_id || "false" == settingsUserData
                .obj_add) return notifyBox("error", la.ERROR, la
                .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "obj_edit":
            if ("true" != settingsUserData.obj_edit) return notifyBox("error",
                    la.ERROR, la.THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT),
                !1;
            break;
        case "obj_delete":
            if ("true" != settingsUserData.obj_delete) return notifyBox("error",
                    la.ERROR, la.THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT),
                !1;
            break;
        case "obj_history_clear":
            if ("true" != settingsUserData.obj_history_clear) return notifyBox(
                "error", la.ERROR, la
                .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "dashboard":
            if (1 != settingsUserData.privileges_dashboard) return notifyBox(
                "error", la.ERROR, la
                .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "history":
            if (1 != settingsUserData.privileges_history) return notifyBox(
                "error", la.ERROR, la
                .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "reports":
            if (1 != settingsUserData.privileges_reports) return notifyBox(
                "error", la.ERROR, la
                .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "tasks":
            if (1 != settingsUserData.privileges_tasks) return notifyBox(
                "error", la.ERROR, la
                .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "rilogbook":
            if (1 != settingsUserData.privileges_rilogbook) return notifyBox(
                "error", la.ERROR, la
                .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "dtc":
            if (1 != settingsUserData.privileges_dtc) return notifyBox("error",
                    la.ERROR, la.THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT),
                !1;
            break;
        case "maintenance":
            if (1 != settingsUserData.privileges_maintenance) return notifyBox(
                "error", la.ERROR, la
                .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "object_control":
            if (1 != settingsUserData.privileges_object_control)
            return notifyBox("error", la.ERROR, la
                    .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "image_gallery":
            if (1 != settingsUserData.privileges_image_gallery)
            return notifyBox("error", la.ERROR, la
                    .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1;
            break;
        case "chat":
            if (1 != settingsUserData.privileges_chat) return notifyBox("error",
                    la.ERROR, la.THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT),
                !1;
            break;
        case "subaccounts":
            if (1 != settingsUserData.privileges_subaccounts) return notifyBox(
                "error", la.ERROR, la
                .THIS_ACCOUNT_HAS_NO_PRIVILEGES_TO_DO_THAT), !1
    }
    return !0
}

function utilsArea() {
    0 == utilsAreaData.enabled ? 1 != gsValues.map_bussy && (utilsAreaData
        .area_layer = map.editTools.startPolygon(), map.on(
            "editable:drawing:end",
            function(e) {
                if (!(utilsAreaData.area_layer.getLatLngs()[0].length <
                    3)) {
                    var t = getAreaFromLatLngs(utilsAreaData.area_layer
                        .getLatLngs()[0]);
                    if ("km" == settingsUserData.unit_distance) {
                        var a = 1e-6 * t;
                        a = (a = Math.round(100 * a) / 100) + " " + la
                            .UNIT_SQ_KM
                    } else {
                        a = 1e-6 * t * .386102;
                        a = (a = Math.round(100 * a) / 100) + " " + la
                            .UNIT_SQ_MI
                    }
                    var o = 1e-4 * t,
                        i = a + "</br>" + (o = (o = Math.round(100 * o) /
                            100) + " " + la.UNIT_HECTARES);
                    utilsAreaData.area_layer.bindTooltip(i, {
                        permanent: !0,
                        direction: "center"
                    }).openTooltip(), map.on(
                        "editable:editing editable:drag",
                        function(e) {
                            var t = getAreaFromLatLngs(utilsAreaData
                                .area_layer.getLatLngs()[0]);
                            if ("km" == settingsUserData
                                .unit_distance) {
                                var a = 1e-6 * t;
                                a = (a = Math.round(100 * a) / 100) +
                                    " " + la.UNIT_SQ_KM
                            } else {
                                a = 1e-6 * t * .386102;
                                a = (a = Math.round(100 * a) / 100) +
                                    " " + la.UNIT_SQ_MI
                            }
                            var o = 1e-4 * t,
                                i = a + "</br>" + (o = (o = Math.round(
                                        100 * o) / 100) + " " + la
                                    .UNIT_HECTARES);
                            utilsAreaData.area_layer.setTooltipContent(
                                    i), utilsAreaData.area_layer
                                .openTooltip()
                        }), map.off("editable:drawing:end")
                }
            }), utilsAreaData.enabled = !0, gsValues.map_bussy = !0, map
        .doubleClickZoom.disable()) : (map.editTools.stopDrawing(), 1 == map
        .hasLayer(utilsAreaData.area_layer) && map.removeLayer(utilsAreaData
            .area_layer), map.off("editable:editing editable:drag"),
        utilsAreaData.enabled = !1, gsValues.map_bussy = !1, map
        .doubleClickZoom.enable())
}

function utilsRuler() {
    0 == utilsRulerData.enabled ? 1 != gsValues.map_bussy && (utilsRulerData
        .line_layer = map.editTools.startPolyline(), map.on(
            "editable:editing editable:drag",
            function(e) {
                var t = utilsRulerData.line_layer.getLatLngs(),
                    a = t[t.length - 1];
                if (map.hasLayer(utilsRulerData.label_layer)) {
                    var o = getLengthFromLatLngs(t);
                    o = (o = convDistanceUnits(o, "km", settingsUserData
                            .unit_distance)).toFixed(2), o += " " + la
                        .UNIT_DISTANCE, utilsRulerData.label_layer
                        .setLatLng(a), utilsRulerData.label_layer
                        .setContent(o)
                } else utilsRulerData.label_layer = L.tooltip({
                        permanent: !0,
                        offset: [10, 0],
                        direction: "right"
                    }), utilsRulerData.label_layer.setLatLng(a),
                    utilsRulerData.label_layer.setContent("0 " + la
                        .UNIT_DISTANCE), map.addLayer(utilsRulerData
                        .label_layer)
            }), utilsRulerData.enabled = !0, gsValues.map_bussy = !0, map
        .doubleClickZoom.disable()) : (map.editTools.stopDrawing(), 1 == map
        .hasLayer(utilsRulerData.line_layer) && map.removeLayer(
            utilsRulerData.line_layer), 1 == map.hasLayer(utilsRulerData
            .label_layer) && map.removeLayer(utilsRulerData.label_layer),
        map.off("editable:editing editable:drag"), utilsRulerData
        .enabled = !1, gsValues.map_bussy = !1, map.doubleClickZoom.enable()
        )
}

function utilsShowDriverInfo(e) {
    var t = settingsObjectDriverData[e].name,
        a = settingsObjectDriverData[e].idn,
        o = settingsObjectDriverData[e].address,
        i = settingsObjectDriverData[e].phone,
        s = settingsObjectDriverData[e].email,
        n = settingsObjectDriverData[e].desc,
        l = settingsObjectDriverData[e].img;
    l = '<center><img style="border:0px; width: 80px;" src="' + (l = "" == l ?
            "img/user-blank.svg" : "data/user/drivers/" + l) + '" /></center>',
        text = '<div class="row">', text +=
        '<div class="row2"><div class="width40">' + l +
        '</div><div class="width60">' + t + "</div></div>", "" != a && (text +=
            '<div class="row2"><div class="width40"><strong>' + la.ID_NUMBER +
            ':</strong></div><div class="width60">' + a + "</div></div>"), "" !=
        o && (text += '<div class="row2"><div class="width40"><strong>' + la
            .ADDRESS + ':</strong></div><div class="width60">' + o +
            "</div></div>"), "" != i && (text +=
            '<div class="row2"><div class="width40"><strong>' + la.PHONE +
            ':</strong></div><div class="width60">' + i + "</div></div>"), "" !=
        s && (s = '<a href="mailto:' + s + '">' + s + "</a>", text +=
            '<div class="row2"><div class="width40"><strong>' + la.EMAIL +
            ':</strong></div><div class="width60">' + s + "</div></div>"), "" !=
        n && (text += '<div class="row2"><div class="width40"><strong>' + la
            .DESCRIPTION + ':</strong></div><div class="width60">' + n +
            "</div></div>"), text += "</div>", notifyBox("info", la.DRIVER_INFO,
            text)
}

function utilsShowTrailerInfo(e) {
    var t = settingsObjectTrailerData[e].name,
        a = settingsObjectTrailerData[e].model,
        o = settingsObjectTrailerData[e].vin,
        i = settingsObjectTrailerData[e].plate_number,
        s = settingsObjectTrailerData[e].desc;
    text = '<div class="row">', text +=
        '<div class="row2"><div class="width40"><strong>' + la.NAME +
        ':</strong></div><div class="width60">' + t + "</div></div>", "" != a &&
        (text += '<div class="row2"><div class="width40"><strong>' + la.MODEL +
            ':</strong></div><div class="width60">' + a + "</div></div>"), "" !=
        o && (text += '<div class="row2"><div class="width40"><strong>' + la
            .VIN + ':</strong></div><div class="width60">' + o + "</div></div>"
            ), "" != i && (text +=
            '<div class="row2"><div class="width40"><strong>' + la
            .PLATE_NUMBER + ':</strong></div><div class="width60">' + i +
            "</div></div>"), "" != s && (text +=
            '<div class="row2"><div class="width40"><strong>' + la.DESCRIPTION +
            ':</strong></div><div class="width60">' + s + "</div></div>"),
        text += "</div>", notifyBox("info", la.TRAILER_INFO, text)
}

function utilsShowPassengerInfo(e) {
    var t = {
        cmd: "load_object_passenger_data",
        passenger_id: e
    };
    $.ajax({
        type: "POST",
        url: "func/fn_settings.passengers.php",
        data: t,
        dataType: "json",
        cache: !1,
        success: function(e) {
            var t = e.name,
                a = e.idn,
                o = e.address,
                i = e.phone,
                s = e.email,
                n = e.desc;
            text = '<div class="row">', text +=
                '<div class="row2"><div class="width40"><strong>' +
                la.NAME + ':</strong></div><div class="width60">' +
                t + "</div></div>", "" != a && (text +=
                    '<div class="row2"><div class="width40"><strong>' +
                    la.ID_NUMBER +
                    ':</strong></div><div class="width60">' + a +
                    "</div></div>"), "" != o && (text +=
                    '<div class="row2"><div class="width40"><strong>' +
                    la.ADDRESS +
                    ':</strong></div><div class="width60">' + o +
                    "</div></div>"), "" != i && (text +=
                    '<div class="row2"><div class="width40"><strong>' +
                    la.PHONE +
                    ':</strong></div><div class="width60">' + i +
                    "</div></div>"), "" != s && (s =
                    '<a href="mailto:' + s + '">' + s + "</a>",
                    text +=
                    '<div class="row2"><div class="width40"><strong>' +
                    la.EMAIL +
                    ':</strong></div><div class="width60">' + s +
                    "</div></div>"), "" != n && (text +=
                    '<div class="row2"><div class="width40"><strong>' +
                    la.DESCRIPTION +
                    ':</strong></div><div class="width60">' + n +
                    "</div></div>"), text += "</div>", notifyBox(
                    "info", la.PASSENGER_INFO, text)
        }
    })
}

function utilsShowPoint() {
    utilsPointOnMap(document.getElementById("dialog_show_point_lat").value,
        document.getElementById("dialog_show_point_lng").value)
}

function utilsPointOnMap(e, t) {
    "" == e && (e = 0), "" == t && (t = 0), geocoderGetAddress(e, t, function(
    a) {
        var o = a,
            i = urlPosition(e, t),
            s = "<table>\t\t\t\t\t<tr><td><strong>" + la.ADDRESS +
            ":</strong></td><td>" + o +
            "&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>\t\t\t\t\t<tr><td><strong>" +
            la.POSITION + ":</strong></td><td>" + i +
            "</td></tr>\t\t\t\t\t</table>";
        addPopupToMap(e, t, [0, 0], s, ""), map.panTo({
            lat: e,
            lng: t
        }), 1 == gsValues.map_street_view && (objectUnSelectAll(),
            utilsStreetView(e, t, 0))
    })
}

function utilsSearchAddress() {
    var e = document.getElementById("dialog_address_search_addr").value;
    geocoderGetLocation(e, function(t) {
        if (null != t[0]) {
            e = t[0].address;
            var a = t[0].lat,
                o = t[0].lng,
                i = urlPosition(a, o);
            addPopupToMap(a, o, [0, 0],
                "<table>\t\t\t\t\t<tr><td><strong>" + la.ADDRESS +
                ":</strong></td><td>" + e +
                "&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>\t\t\t\t\t<tr><td><strong>" +
                la.POSITION + ":</strong></td><td>" + i +
                "</td></tr>\t\t\t\t\t</table>", ""), map.panTo({
                lat: a,
                lng: o
            }), 1 == gsValues.map_street_view && (
            objectUnSelectAll(), utilsStreetView(a, o, 0))
        } else notifyBox("info", la.INFORMATION, la
            .NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST)
    })
}

function utilsFollowObject(e, t) {
    if ("" != objectsData[e].data) {
        var a = document.getElementById("map_layer").value,
            o = "func/fn_object.follow.php?imei=" + e + "&map_layer=" + a;
        if (1 == t) window.open(o, "_blank");
        else if (null == utilsFollowObjectData[e]) {
            var i =
                '<div style="position:absolute; top: 0px; bottom: 0px; left: 0px; right: 0px;">';
            i += '<iframe src="' + o +
                '" style="border: 0px; width: 100%; height: 100%;"></iframe>',
                i += "</div>";
            var s = settingsObjectData[e].name,
                n = $(document.createElement("div"));
            n.attr("title", la.FOLLOW + " (" + s + ")"), n.html(i), $(n)
            .dialog({
                    autoOpen: !1,
                    width: 500,
                    height: 400,
                    minWidth: 350,
                    minHeight: 250,
                    resizable: !0,
                    close: function(t, a) {
                        utilsFollowObjectData[e] = void 0
                    }
                }), $(n).dialog("open"), utilsFollowObjectData[e] = new Array,
                utilsFollowObjectData[e].dialog = n
        } else utilsFollowObjectData[e].dialog.dialog("moveToTop")
    } else notifyBox("info", la.INFORMATION, la.NO_DATA_HAS_BEEN_RECEIVED_YET)
}

function utilsRouteToPoint(e) {
    if (1 != gsValues.map_bussy) {
        utilsRouteBetweenPointsHide();
        var t = !1;
        for (var a in objectsData)
            if (1 == objectsData[a].selected) {
                t = a;
                break
            } if (0 == t) notifyBox("info", la.INFORMATION, la
            .NO_OBJECT_SELECTED);
        else {
            new Array;
            if ("" != objectsData[t].data) {
                var o = objectsData[t].data[0].lat,
                    i = objectsData[t].data[0].lng;
                utilsRouteBetweenPointsGet(e, L.latLng(o, i))
            }
        }
    }
}

function utilsRouteBetweenPoints(e) {
    if (1 != gsValues.map_bussy) {
        gsValues.map_bussy = !0, utilsRouteBetweenPointsHide();
        var t = map.editTools.startPolyline(e);
        map.doubleClickZoom.disable(), map.on("editable:drawing:clicked",
            function(a) {
                var o = t.getLatLngs(),
                    i = o[o.length - 1];
                map.editTools.stopDrawing(), 1 == map.hasLayer(t) && map
                    .removeLayer(t), map.doubleClickZoom.enable(), map.off(
                        "editable:drawing:clicked"),
                    utilsRouteBetweenPointsGet(e, i), gsValues.map_bussy = !
                    1
            })
    }
}

function utilsRouteBetweenPointsGet(e, t) {
    var a = settingsUserData.map_is,
        o = new Array;
    o.push(e), o.push(t);
    var i = L.Routing.control({
        waypoints: o,
        show: !1,
        showAlternatives: !1,
        waypointMode: "snap",
        createMarker: function() {}
    }).addTo(map);
    i.on("routeselected", function(e) {
        utilsRouteBetweenPointsData.route_points = e.route.coordinates;
        var t = L.polyline(utilsRouteBetweenPointsData.route_points, {
            color: settingsUserData.map_rc,
            opacity: .8,
            weight: 3
        });
        mapLayers.utils.addLayer(t), map.removeControl(i);
        var o = getLengthFromLatLngs(utilsRouteBetweenPointsData
            .route_points);
        o = (o = convDistanceUnits(o, "km", settingsUserData
            .unit_distance)).toFixed(2), o += " " + la.UNIT_DISTANCE;
        var s = getTimeDetails(Math.floor(e.route.summary.totalTime), !
                0),
            n = utilsRouteBetweenPointsData.route_points[0].lat,
            l = utilsRouteBetweenPointsData.route_points[0].lng,
            d = L.marker([n, l], {
                icon: mapMarkerIcons.route_start
            });
        d.on("click", function(e) {
            geocoderGetAddress(n, l, function(e) {
                var t = e,
                    i = urlPosition(n, l),
                    d =
                    "<table>\t\t\t\t\t\t<tr><td><strong>" +
                    la.ADDRESS + ":</strong></td><td>" +
                    t +
                    "&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>\t\t\t\t\t\t<tr><td><strong>" +
                    la.POSITION +
                    ":</strong></td><td>" + i +
                    "</td></tr>\t\t\t\t\t\t<tr><td><strong>" +
                    la.LENGTH + ":</strong></td><td>" +
                    o +
                    "</td></tr>\t\t\t\t\t\t<tr><td><strong>" +
                    la.DURATION +
                    ":</strong></td><td>" + s +
                    "</td></tr>\t\t\t\t\t\t</table>";
                d += '<div style="width:100%; text-align: right;"><a href="#" class="" onClick="utilsRouteBetweenPointsSave();">' +
                    la.SAVE_AS_ROUTE + "</a> " + la.OR,
                    d +=
                    ' <a href="#" class="" onClick="utilsRouteBetweenPointsHide();">' +
                    la.HIDE.toLowerCase() +
                    "</a></div>", addPopupToMap(n, l, [
                        0, -28 * a
                    ], d, "")
            })
        }), mapLayers.utils.addLayer(d);
        var r = utilsRouteBetweenPointsData.route_points[
                utilsRouteBetweenPointsData.route_points.length - 1]
            .lat,
            _ = utilsRouteBetweenPointsData.route_points[
                utilsRouteBetweenPointsData.route_points.length - 1]
            .lng;
        (d = L.marker([r, _], {
            icon: mapMarkerIcons.route_end
        })).on("click", function(e) {
            geocoderGetAddress(r, _, function(e) {
                var t = e,
                    i = urlPosition(r, _),
                    n =
                    "<table>\t\t\t\t\t\t<tr><td><strong>" +
                    la.ADDRESS + ":</strong></td><td>" +
                    t +
                    "&nbsp;&nbsp;&nbsp;&nbsp;</td></tr>\t\t\t\t\t\t<tr><td><strong>" +
                    la.POSITION +
                    ":</strong></td><td>" + i +
                    "</td></tr>\t\t\t\t\t\t<tr><td><strong>" +
                    la.LENGTH + ":</strong></td><td>" +
                    o +
                    "</td></tr>\t\t\t\t\t\t<tr><td><strong>" +
                    la.DURATION +
                    ":</strong></td><td>" + s +
                    "</td></tr>\t\t\t\t\t\t</table>";
                n += '<div style="width:100%; text-align: right;"><a href="#" class="" onClick="utilsRouteBetweenPointsSave();">' +
                    la.SAVE_AS_ROUTE + "</a> " + la.OR,
                    n +=
                    ' <a href="#" class="" onClick="utilsRouteBetweenPointsHide();">' +
                    la.HIDE.toLowerCase() +
                    "</a></div>", addPopupToMap(r, _, [
                        0, -28 * a
                    ], n, "")
            })
        });
        var c = t.getBounds();
        map.fitBounds(c), mapLayers.utils.addLayer(d)
    })
}

function utilsRouteBetweenPointsSave() {
    if (1 != gsValues.map_bussy) {
        var e = Math.ceil(utilsRouteBetweenPointsData.route_points.length /
            200),
            t = new Array;
        for (i = 0; i < utilsRouteBetweenPointsData.route_points.length; i +=
            e) {
            var a = utilsRouteBetweenPointsData.route_points[i].lat,
                o = utilsRouteBetweenPointsData.route_points[i].lng;
            t.push(L.latLng(a, o))
        }
        placesRouteSave(t), utilsRouteBetweenPointsHide()
    }
}

function utilsRouteBetweenPointsHide() {
    utilsRouteBetweenPointsData.route_points = !1, mapLayers.utils
    .clearLayers(), destroyMapPopup()
}

function utilsStreetView(e, t, a) {
    if (e != utilsStreetViewData.prev_lat && t != utilsStreetViewData
        .prev_lng) {
        var o = {
            lat: e,
            lng: t,
            angle: a
        };
        $.ajax({
                type: "POST",
                url: "func/fn_streetview.php",
                data: o,
                cache: !1,
                success: function(a) {
                    if ("" == a) document.getElementById(
                            "street_view_control").innerHTML = la
                        .STREET_VIEW;
                    else {
                        var o = "data:image/jpg;base64," + a;
                        document.getElementById("street_view_control")
                            .innerHTML =
                            '<a href="#" onClick="utilsStreetViewPoint(' +
                            e + ", " + t + ', true);"><img src="' + o +
                            '"/></a>'
                    }
                }
            }), utilsStreetViewData.prev_lat = e, utilsStreetViewData.prev_lng =
            t
    }
}

function utilsStreetViewObject(e, t) {
    if ("" != objectsData[e].data) {
        var a = "https://maps.google.com/maps?q=&layer=c&cbll=" + objectsData[e]
            .data[0].lat + "," + objectsData[e].data[0].lng;
        1 == t && window.open(a, "_blank")
    } else notifyBox("info", la.INFORMATION, la.NO_DATA_HAS_BEEN_RECEIVED_YET)
}

function utilsStreetViewPoint(e, t, a) {
    var o = "https://maps.google.com/maps?q=&layer=c&cbll=" + e + "," + t;
    1 == a && window.open(o, "_blank")
}
utilsStreetViewData.prev_lat = !1, utilsStreetViewData.prev_lng = !1;