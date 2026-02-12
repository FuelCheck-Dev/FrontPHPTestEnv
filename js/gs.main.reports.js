
function reportsOpen() {
    if(!utilsCheckPrivileges("reports")){
    	return;
    }
    $("#dialog_reports").dialog("open");
    reportBackgroundStatusLoadData();
    
}

function reportBackgroundStatusLoadData(){
clearTimeout(timer_reportsBackgroundLoadData);
timer_reportsBackgroundLoadData = setTimeout("reportBackgroundStatusLoadData();",1000* gsValues.report_background_status_refresh);
if($("#dialog_reports").dialog("isOpen") == 1){
    $("#reports_generated_background_list_grid").trigger("reloadGrid");
}else {
    clearTimeout(timer_reportsBackgroundLoadData);
}
}

function reportsReload() {
    reportsLoadData(); 
    $("#reports_report_list_grid").trigger("reloadGrid");
}



function reportsLoadData() {
    $.ajax({
        type: "POST",
        url: "func/fn_reports.php",
        data: {
            cmd: "load_report_data"
        },
        dataType: "json",
        cache: false,
        success: function(data) {
            reportsData.reports = data;
        }
    })
}


function reportsDelete(id) {
    if(!utilsCheckPrivileges("viewer")){
    	return;
    }
    confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(confirm) {
            if (confirm) {
                var data = {
                    cmd: "delete_report",
                    report_id: id
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_reports.php",
                    data: data,
                    success: function(e) {
                        if("OK" == e){
                        	reportsReload();
                        }
                    }
                })
            }
        })
}

function reportsDeleteSelected() {
    if (!utilsCheckPrivileges("viewer")) {
    	return;
    }
 var selected = $("#reports_report_list_grid").jqGrid("getGridParam","selarrrow");
 if(selected != ""){
confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
	            function(confirm) {
	                if (confirm) {
	                    var data = {
	                        cmd: "delete_selected_reports",
	                        items: selected
	                    };
	                    $.ajax({
	                        type: "POST",
	                        url: "func/fn_reports.php",
	                        data: data,
	                        success: function(e) {
	                            if("OK" == e){
	                            	reportsReload()
	                            }
	                        }
	                    })
	                }
	 })
	 
	 
 }else{
	 notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED)
 }       
}

function validateReportData(data){
	if("overspeed" == data.type || "overspeed_all" == data.type ||  "underspeed" == data.type ||  "rag" == data.type || "rag_driver" == data.type || "travel_sheet_summary" == data.type ){
		if("" == data.speed_limit){
			notifyBox("error", la.ERROR, la.SPEED_LIMIT_CANT_BE_EMPTY);
			return false;
		}
    }
    if("travel_sheet_summary" == data.type ){
        if("" == data.drivers){
            notifyBox("error", la.ERROR, la.AT_LEAST_ONE_DRIVER_SELECTED);
            return false;
        }
    }

	if("" == data.imei && "fuelout" != data.type){
		notifyBox("error", la.ERROR, la.AT_LEAST_ONE_OBJECT_SELECTED);
		return false;
	}
	if("zone_in_out" == data.type || "zone_in_out_events" == data.type || "zone_in_out_events_summary" == data.type){
	if("" == data.zone_ids){
		notifyBox("error", la.ERROR, la.AT_LEAST_ONE_ZONE_SELECTED);
		return false;
    }
   }
	
	if(("drives_stops_logic" == data.type || "logic_sensors" == data.type || "sensor_graph" == data.type )   && "" == data.sensor_names){
		notifyBox("error", la.ERROR, la.AT_LEAST_ONE_SENSOR_SELECTED);
		return false;
    }
    
    if(("event_by_type" == data.type ||"event_and_costs" == data.type ) && "" == data.event_ids ){
        notifyBox("error", la.ERROR, la.AT_LEAST_ONE_EVENT_SELECTED);
		return false;
    }

return true;
}



function reportGenerate(data) {
    if(!validateReportData(data)){
        return
    }
	
	loadingData(true);
    $.ajax({
          type: "POST",
            url: "func/fn_reports.gen.php",
            data: data,
            cache: false,
            success: function(t) {
                loadingData(false); 
                $.generateFile({
                    filename: data.name.toLowerCase() + "_" + data.dtf + "_" + data.dtt,
                    content: t,
                    script: "func/fn_saveas.php?format=" + data.format
               }); 
               reportsGeneratedReload();
            },
            error: function(e, t) {
                loadingData(false)
            }
	
	});
}

function reportGenerateBackground(data) {
    if(!validateReportData(data)){
        return
    }

    loadingData(true);
    $.ajax({
        type: "POST",
        url: "func/fn_reports.background.php",
        data: data,
        cache: false,
        success: function(t) {
            loadingData(false);
            $("#dialog_report_properties").dialog("close");
            $("#reports_tabs").tabs({
                active: 2
            })
           reportGeneratedBackgroundReload();
            notifyBox("info", la.INFORMATION, la.CHANGES_SAVED_SUCCESSFULLY);


        },
        error: function(e, t) {
            loadingData(false)
        }

    });
}
function  reportsBackgroundDownload(id){
    loadingData(true);
    var data = {
        cmd: "download_background_report",
        report_id: id
    };

    $.ajax({
        type: "POST",
        url: "func/fn_reports.php",
        data: data,
        cache: false,
        success: function(t) {
            var result = JSON.parse(t);
            loadingData(false);
            $.generateFile({
                filename: result.filename,
                content: result.content,
                script: "func/fn_saveas.php?format=" + result.format
            });
        },
        error: function(e, t) {
            loadingData(false)
        }

    });
}



	
function reportsSelectObject() {
    reportsListSensors();
}   



function reportsListDataItems() {
    var type = document.getElementById("dialog_report_type").value;
    if (null != reportsData.data_items[type]) {
        var items = reportsData.data_items[type];
   var   dialog_report_data_item_list = document.getElementById("dialog_report_data_item_list");
   dialog_report_data_item_list.options.length = 0;
        for (var i = 0; i < items.length; i++) {
            var itemName = items[i].toUpperCase();
            itemName = la[itemName];
            var item = items[i];
            dialog_report_data_item_list.options.add(new Option(itemName, item));
        }
    }
    $("#dialog_report_data_item_list option").prop("selected", true); 
    $("#dialog_report_data_item_list").multipleSelect("refresh");
}

function reportsListPumps(){
	   var dialog_report_pumps_list = document.getElementById("dialog_report_pumps_list");
	   dialog_report_pumps_list.options.length = 0;
	for(i =0; i< fuelData.pumps.length;i++){
		
		dialog_report_pumps_list.options.add(new Option(fuelData.pumps[i].id, fuelData.pumps[i].id));
	}
	 $("#dialog_report_pumps_list").multipleSelect("refresh")
}

function reportsListVehicles(){
	   var dialog_report_vehicles_list = document.getElementById("dialog_report_vehicles_list");
	   dialog_report_vehicles_list.options.length = 0;
	for(i =0; i< fuelData.vehicles.length;i++){
		
		dialog_report_vehicles_list.options.add(new Option(fuelData.vehicles[i].id, fuelData.vehicles[i].id));
	}
	 $("#dialog_report_vehicles_list").multipleSelect("refresh")
}

function reportsListFuelDrivers(){
	   var dialog_report_fuel_driver_list = document.getElementById("dialog_report_fuel_driver_list");
	   dialog_report_fuel_driver_list.options.length = 0;
	for(i =0; i< fuelData.drivers.length;i++){
		
		dialog_report_fuel_driver_list.options.add(new Option(fuelData.drivers[i].id, fuelData.drivers[i].id));
	}
	 $("#dialog_report_fuel_driver_list").multipleSelect("refresh")
}


function reportsListSensors2() {
    var dialog_report_sensor_list = document.getElementById("dialog_report_sensor_list");
    dialog_report_sensor_list.options.length = 0;
    var type = document.getElementById("dialog_report_type").value;
    if ("drives_stops_logic" == type || "logic_sensors" == type || "sensor_graph" == type) {
    	var dialogObjectList = document.getElementById("dialog_report_object_list");
    	var sensorArray = new Array;
    	for(var i =0; i< dialogObjectList.options.length; i++){
    		if(dialogObjectList.options[i].selected){
    			var selectedObject = dialogObjectList.options[i].value;
    			var sensorsObject  = settingsObjectData[selectedObject].sensors;
    			for( var sensorKey in sensorsObject){
    				
    				  var sensor = sensorsObject[sensorKey];
    				  if("string" != sensor.result_type){
    					  if("drives_stops_logic" == type || "logic_sensors" == type){
    						  if("logic" == sensor.result_type){
    							  sensorArray.push(sensor.name); 
    						  }
    					  }
    					  if("sensor_graph" == type){
    						  sensorArray.push(sensor.name); 
    					  }					  
    				  }
    			}
    			
    		}
    		
    	}
    	
    	sensorArray = uniqueArray(sensorArray);
    	 for (var i = 0; i < sensorArray.length; i++){ 
    		 dialog_report_sensor_list.options.add(new Option(sensorArray[i], sensorArray[i]));
    	 }
         sortSelectList(dialog_report_sensor_list);
    }
    $("#dialog_report_sensor_list").multipleSelect("refresh");
}


    	
    	
       





function reportPropertiesReportId(id) {

    reportsData.edit_report_id = id;
    document.getElementById("dialog_report_name").value = reportsData.reports[id].name;
    document.getElementById("dialog_report_type").value = reportsData.reports[id].type
    $("#dialog_report_type").multipleSelect("refresh");
    reportsSwitchType();
    document.getElementById("dialog_report_ignore_empty_reports").checked = strToBoolean(reportsData.reports[id].ignore_empty_reports);
    document.getElementById("dialog_report_filter_reports").checked = strToBoolean(reportsData.reports[id].filter_reports);
    document.getElementById("dialog_report_format").value = reportsData.reports[id].format;
    $("#dialog_report_format").multipleSelect("refresh");
    document.getElementById("dialog_report_show_coordinates").checked = strToBoolean(reportsData.reports[id].show_coordinates);
    document.getElementById("dialog_report_show_addresses").checked = strToBoolean(reportsData.reports[id].show_addresses);
    document.getElementById("dialog_report_zones_addresses").checked = strToBoolean(reportsData.reports[id].zones_addresses);
    document.getElementById("dialog_report_stop_duration").value = reportsData.reports[id].stop_duration;
    $("#dialog_report_stop_duration").multipleSelect("refresh");
    document.getElementById("dialog_report_speed_limit").value = reportsData.reports[id].speed_limit;
    document.getElementById("dialog_report_optimal_consumption").value = reportsData.reports[id].optimal_consumption;
    document.getElementById("dialog_report_min_duration_zone").value = reportsData.reports[id].min_duration_zone;
    var dialog_report_object_list = document.getElementById("dialog_report_object_list");
    var imeis = reportsData.reports[id].imei.split(",");
    multiselectSetValues(dialog_report_object_list, imeis);
    $("#dialog_report_object_list").multipleSelect("refresh");
    
    var dialog_report_driver_list = document.getElementById("dialog_report_driver_list");
    var drivers = reportsData.reports[id].drivers.split(",");
    multiselectSetValues(dialog_report_driver_list, drivers);
    $("#dialog_report_driver_list").multipleSelect("refresh");
    
    var dialog_report_zone_list = document.getElementById("dialog_report_zone_list");
    var zone_ids = reportsData.reports[id].zone_ids.split(",");
    multiselectSetValues(dialog_report_zone_list, zone_ids);
    $("#dialog_report_zone_list").multipleSelect("refresh");
    reportsListSensors();
    var dialog_report_sensor_list = document.getElementById("dialog_report_sensor_list");
    var sensor_names = reportsData.reports[id].sensor_names.split(",");
    multiselectSetValues(dialog_report_sensor_list, sensor_names);
    $("#dialog_report_sensor_list").multipleSelect("refresh");

    var dialog_report_event_list = document.getElementById("dialog_report_event_list");
    if(reportsData.reports[id].event_ids == null){
        initSelectListReportEventList();
    }else{
    var event_ids = reportsData.reports[id].event_ids.split(",");
    multiselectSetValues(dialog_report_event_list, event_ids);
    $("#dialog_report_event_list").multipleSelect("refresh");
    }
    reportsListDataItems();
    var dialog_report_data_item_list = document.getElementById("dialog_report_data_item_list");
    var data_items = reportsData.reports[id].data_items.split(",");
    multiselectSetValues(dialog_report_data_item_list, data_items);
    $("#dialog_report_data_item_list").multipleSelect("refresh");

    if ("rag" == reportsData.reports[id].type || "rag_driver" == reportsData.reports[id].type) {
        document.getElementById("dialog_report_other_rag_low_score").value = reportsData.reports[id].other.low_score;
        document.getElementById("dialog_report_other_rag_high_score").value = reportsData.reports[id].other.high_score;
    } else {
        document.getElementById("dialog_report_other_rag_low_score").value = "";
        document.getElementById("dialog_report_other_rag_high_score").value = "";
    }
    var schedule_period = reportsData.reports[id].schedule_period;
    document.getElementById("dialog_report_schedule_period_daily").checked = false;
    document.getElementById("dialog_report_schedule_period_weekly").checked = false;
    if (schedule_period == "d") {
        document.getElementById("dialog_report_schedule_period_daily").checked = true;
        document.getElementById("dialog_report_schedule_period_weekly").checked = false;
    }
    if (schedule_period == "w") {
        document.getElementById("dialog_report_schedule_period_daily").checked = false;
        document.getElementById("dialog_report_schedule_period_weekly").checked = true;
    }
    if (schedule_period == "dw") {
        document.getElementById("dialog_report_schedule_period_daily").checked = true;
        document.getElementById("dialog_report_schedule_period_weekly").checked = true;
    }

    document.getElementById("dialog_report_schedule_email_address").value = reportsData.reports[id].schedule_email_address;
    document.getElementById("dialog_report_filter").value = 2;
    $("#dialog_report_filter").multipleSelect("refresh");
    switchDateFilter("report");
    $("#dialog_report_properties").dialog("open");

}


function reportPropertiesReportAdd() {
    reportsData.edit_report_id = false;
    document.getElementById("dialog_report_name").value = "";
    document.getElementById("dialog_report_type").value = "general";
    $("#dialog_report_type").multipleSelect("refresh");
    reportsSwitchType();
    document.getElementById("dialog_report_ignore_empty_reports").checked = false;
    document.getElementById("dialog_report_filter_reports").checked = false;
    document.getElementById("dialog_report_format").value = "html";
    $("#dialog_report_format").multipleSelect("refresh");
    document.getElementById("dialog_report_show_coordinates").checked = true;
    document.getElementById("dialog_report_show_addresses").checked = false;
    document.getElementById("dialog_report_zones_addresses").checked = false;
    document.getElementById("dialog_report_stop_duration").value = 1;
    $("#dialog_report_stop_duration").multipleSelect("refresh");
    document.getElementById("dialog_report_speed_limit").value = "";
    document.getElementById("dialog_report_optimal_consumption").value = 0.00;
    document.getElementById("dialog_report_min_duration_zone").value = 0.00;
    $("#dialog_report_object_list option:selected").removeAttr("selected");
    $("#dialog_report_object_list").multipleSelect("refresh");
    
    $("#dialog_report_driver_list option:selected").removeAttr("selected");
    $("#dialog_report_driver_list").multipleSelect("refresh");
    
    reportsListPumps();
    $("#dialog_report_pumps_list option:selected").removeAttr("selected");
    $("#dialog_report_pumps_list").multipleSelect("refresh");
    reportsListVehicles();
    $("#dialog_report_vehicles_list option:selected").removeAttr("selected");
    $("#dialog_report_vehicles_list").multipleSelect("refresh");
    reportsListFuelDrivers();
    $("#dialog_report_fuel_driver_list option:selected").removeAttr("selected");
    $("#dialog_report_fuel_driver_list").multipleSelect("refresh");
    $("#dialog_report_zone_list option:selected").removeAttr("selected");
    $("#dialog_report_zone_list").multipleSelect("refresh");
    reportsListSensors();
    $("#dialog_report_sensor_list option:selected").removeAttr("selected");
    $("#dialog_report_sensor_list").multipleSelect("refresh");
    
    $("#dialog_report_event_list option:selected").removeAttr("selected");
    $("#dialog_report_event_list").multipleSelect("refresh");
    
    reportsListDataItems();
    $("#dialog_report_data_items_list option:selected").removeAttr("selected");
    $("#dialog_report_data_items_list").multipleSelect("refresh");
    document.getElementById("dialog_report_schedule_period_daily").checked = false;
    document.getElementById("dialog_report_schedule_period_weekly").checked = false;
    document.getElementById("dialog_report_schedule_email_address").value = "";
    document.getElementById("dialog_report_filter").value = 2;
    $("#dialog_report_filter").multipleSelect("refresh");
    switchDateFilter("report");
    $("#dialog_report_properties").dialog("open");

}
function reportPropertiesReportCancel() {
    $("#dialog_report_properties").dialog("close");
}
function reportPropertiesReportSave() {
    if (!utilsCheckPrivileges("viewer")) {
        return;
    }
    var name = document.getElementById("dialog_report_name").value;
    var type = document.getElementById("dialog_report_type").value;
    var ignoreEmpty = document.getElementById("dialog_report_ignore_empty_reports").checked;
    var filterReports = document.getElementById("dialog_report_filter_reports").checked;
    var format = document.getElementById("dialog_report_format").value;
    var showCoordinates = document.getElementById("dialog_report_show_coordinates").checked;
    var showAddresses = document.getElementById("dialog_report_show_addresses").checked;
    var zonesAddresses = document.getElementById("dialog_report_zones_addresses").checked;
    var stopDuration = document.getElementById("dialog_report_stop_duration").value;
    var speedLimit = document.getElementById("dialog_report_speed_limit").value;
    var optimal_consumption = document.getElementById("dialog_report_optimal_consumption").value;
    var min_duration_zone = document.getElementById("dialog_report_min_duration_zone").value;
    var selectedObjects = multiselectGetValues(document.getElementById("dialog_report_object_list"));
    var selectedDrivers = multiselectGetValues(document.getElementById("dialog_report_driver_list"));
    var selectedZones = multiselectGetValues(document.getElementById("dialog_report_zone_list"));
    var selectedSensors = multiselectGetValues(document.getElementById("dialog_report_sensor_list"));
    var selectedEvents = multiselectGetValues(document.getElementById("dialog_report_event_list"));
    var selectedItems = multiselectGetValues(document.getElementById("dialog_report_data_item_list"));

    if (name == "") {
        notifyBox("error", la.ERROR, la.NAME_CANT_BE_EMPTY);
        return;
    }
var validatData ={
    type: type,
    speed_limit:speedLimit,
    imei: selectedObjects,
    zone_ids: selectedZones,
    sensor_names: selectedSensors,
    event_ids :selectedEvents
}
    if(!validateReportData(validatData)){
        return ;
    }

    var other = "";

    if ("event_and_costs" == type) {
        other = {
            costPerHour:  document.getElementById("dialog_report_event_cost_per_hour").value,
            cosStandard:  document.getElementById("dialog_report_event_cost_standard").value,
            cosNightTime:  document.getElementById("dialog_report_event_cost_night_time").value
        }
        other = JSON.stringify(other);
    }

    if ("rag" == type || "rag_driver" == type) {
        other = {
            low_score: document.getElementById("dialog_report_other_rag_low_score").value,
            high_score: document.getElementById("dialog_report_other_rag_high_score").value
        };
        other = JSON.stringify(other);
    }
    if ("fuelout" == type) {
        other = {
            pumps: multiselectGetValues(document.getElementById("dialog_report_pumps_list")),
            vehicles: multiselectGetValues(document.getElementById("dialog_report_vehicles_list")),
            drivers: multiselectGetValues(document.getElementById("dialog_report_fuel_driver_list"))
        };

        other = JSON.stringify(other)
    }

    var periodDaily = document.getElementById("dialog_report_schedule_period_daily").checked;
    var periodweekly = document.getElementById("dialog_report_schedule_period_weekly").checked;
    var emailAddress = document.getElementById("dialog_report_schedule_email_address").value;
    var schedulePeriod = "";
    if (periodDaily == true && periodweekly == true) {
        schedulePeriod = "dw";
    }
    if (periodDaily == true && periodweekly == false) {
        schedulePeriod = "d";
    }
    if (periodDaily == false && periodweekly == true) {
        schedulePeriod = "w";
    }
    var emails = ""
    if (schedulePeriod != "") {
        emails = emailAddress.split(",");
        for (var i = 0; i < emails.length; i++) {
            emails[i] = emails[i].trim();
            if (!isEmailValid(emails[i])) {
                notifyBox("error", la.ERROR, la.THIS_EMAIL_IS_NOT_VALID);
                return;
            }
        }

    }

        var saveReportData = {
            cmd: "save_report",
            report_id: reportsData.edit_report_id,
            name: name,
            type: type,
            ignore_empty_reports: ignoreEmpty,
            filter_reports:filterReports,
            format: format,
            show_coordinates: showCoordinates,
            show_addresses: showAddresses,
            zones_addresses: zonesAddresses,
            stop_duration: stopDuration,
            speed_limit: speedLimit,
            optimal_consumption: optimal_consumption,
            min_duration_zone: min_duration_zone,
            imei: selectedObjects,
            drivers: selectedDrivers,
            zone_ids: selectedZones,
            sensor_names: selectedSensors,
            event_ids :selectedEvents,
            data_items: selectedItems,
            other: other,
            schedule_period: schedulePeriod,
            schedule_email_address: emailAddress

        };
        $.ajax({
            type: "POST",
            url: "func/fn_reports.php",
            data: saveReportData,
            cache: false,
            success: function (e) {
                if ("OK" == e) {
                    reportsReload();
                    $("#dialog_report_properties").dialog("close");
                    notifyBox("info", la.INFORMATION, la.CHANGES_SAVED_SUCCESSFULLY);
                }

            }
        });
    }

    function reportPropertiesReportGenerate() {

        var name = document.getElementById("dialog_report_name").value;
        var type = document.getElementById("dialog_report_type").value;
        var ignoreEmpty = document.getElementById("dialog_report_ignore_empty_reports").checked;
        var filterReports = document.getElementById("dialog_report_filter_reports").checked;
        var format = document.getElementById("dialog_report_format").value;
        var showCoordinates = document.getElementById("dialog_report_show_coordinates").checked;
        var showAddresses = document.getElementById("dialog_report_show_addresses").checked;
        var zonesAddresses = document.getElementById("dialog_report_zones_addresses").checked;
        var stopDuration = document.getElementById("dialog_report_stop_duration").value;
        var speedLimit = document.getElementById("dialog_report_speed_limit").value;
        var optimal_consumption = document.getElementById("dialog_report_optimal_consumption").value;
        var min_duration_zone = document.getElementById("dialog_report_min_duration_zone").value;
        var selectedObjects = multiselectGetValues(document.getElementById("dialog_report_object_list"));
        var selectedDrivers = multiselectGetValues(document.getElementById("dialog_report_driver_list"));
        var selectedZones = multiselectGetValues(document.getElementById("dialog_report_zone_list"));
        var selectedSensors = multiselectGetValues(document.getElementById("dialog_report_sensor_list"));
        var selectedEvents = multiselectGetValues(document.getElementById("dialog_report_event_list"));
        var selectedItems = multiselectGetValues(document.getElementById("dialog_report_data_item_list"));


        var other = {
            low_score: document.getElementById("dialog_report_other_rag_low_score").value,
            high_score: document.getElementById("dialog_report_other_rag_high_score").value,
            pumps: multiselectGetValues(document.getElementById("dialog_report_pumps_list")),
            vehicles: multiselectGetValues(document.getElementById("dialog_report_vehicles_list")),
            drivers: multiselectGetValues(document.getElementById("dialog_report_fuel_driver_list")),
            costPerHour:  document.getElementById("dialog_report_event_cost_per_hour").value,
            cosStandard:  document.getElementById("dialog_report_event_cost_standard").value,
            cosNightTime:  document.getElementById("dialog_report_event_cost_night_time").value

        };
        other = JSON.stringify(other);

        var dateFrom = $("#dialog_report_date_from").val() + " " + $("#dialog_report_hour_from").val() + ":" + $("#dialog_report_minute_from").val() + ":00";
        var dateTo = $("#dialog_report_date_to").val() + " " + $("#dialog_report_hour_to").val() + ":" + $("#dialog_report_minute_to").val() + ":00";
        if (name == "") {
            name = document.getElementById("dialog_report_type").options[document.getElementById("dialog_report_type").selectedIndex].text;
        }

        var reportGenerateData = {
            cmd: "report",
            name: name,
            type: type,
            ignore_empty_reports: ignoreEmpty,
            filter_reports:filterReports,
            format: format,
            show_coordinates: showCoordinates,
            show_addresses: showAddresses,
            zones_addresses: zonesAddresses,
            stop_duration: stopDuration,
            speed_limit: speedLimit,
            optimal_consumption: optimal_consumption,
            min_duration_zone : min_duration_zone,
            imei: selectedObjects,
            drivers : selectedDrivers,
            zone_ids: selectedZones,
            sensor_names: selectedSensors,
            event_ids: selectedEvents,
            data_items: selectedItems,
            other: other,
            dtf: dateFrom,
            dtt: dateTo

        }

        reportGenerate(reportGenerateData);




    }

function reportPropertiesReportGenerateBackground() {

    var name = document.getElementById("dialog_report_name").value;
    var type = document.getElementById("dialog_report_type").value;
    var ignoreEmpty = document.getElementById("dialog_report_ignore_empty_reports").checked;
    var filterReports = document.getElementById("dialog_report_filter_reports").checked;
    var format = document.getElementById("dialog_report_format").value;
    var showCoordinates = document.getElementById("dialog_report_show_coordinates").checked;
    var showAddresses = document.getElementById("dialog_report_show_addresses").checked;
    var zonesAddresses = document.getElementById("dialog_report_zones_addresses").checked;
    var stopDuration = document.getElementById("dialog_report_stop_duration").value;
    var speedLimit = document.getElementById("dialog_report_speed_limit").value;
    var optimal_consumption = document.getElementById("dialog_report_optimal_consumption").value;
    var min_duration_zone = document.getElementById("dialog_report_min_duration_zone").value;
    var selectedObjects = multiselectGetValues(document.getElementById("dialog_report_object_list"));
    var selectedDrivers = multiselectGetValues(document.getElementById("dialog_report_driver_list"));
    var selectedZones = multiselectGetValues(document.getElementById("dialog_report_zone_list"));
    var selectedSensors = multiselectGetValues(document.getElementById("dialog_report_sensor_list"));
    var selectedEvents = multiselectGetValues(document.getElementById("dialog_report_event_list"));
    var selectedItems = multiselectGetValues(document.getElementById("dialog_report_data_item_list"));

    var other = {
        low_score: document.getElementById("dialog_report_other_rag_low_score").value,
        high_score: document.getElementById("dialog_report_other_rag_high_score").value,
        pumps: multiselectGetValues(document.getElementById("dialog_report_pumps_list")),
        vehicles: multiselectGetValues(document.getElementById("dialog_report_vehicles_list")),
        drivers: multiselectGetValues(document.getElementById("dialog_report_fuel_driver_list"))
    };
    other = JSON.stringify(other);

    var dateFrom = $("#dialog_report_date_from").val() + " " + $("#dialog_report_hour_from").val() + ":" + $("#dialog_report_minute_from").val() + ":00";
    var dateTo = $("#dialog_report_date_to").val() + " " + $("#dialog_report_hour_to").val() + ":" + $("#dialog_report_minute_to").val() + ":00";
    if (name == "") {
        name = document.getElementById("dialog_report_type").options[document.getElementById("dialog_report_type").selectedIndex].text;
    }

    var reportGenerateData = {
        cmd: "report",
        name: name,
        type: type,
        ignore_empty_reports: ignoreEmpty,
        filter_reports: filterReports,
        format: format,
        show_coordinates: showCoordinates,
        show_addresses: showAddresses,
        zones_addresses: zonesAddresses,
        stop_duration: stopDuration,
        speed_limit: speedLimit,
        optimal_consumption: optimal_consumption,
        min_duration_zone : min_duration_zone,
        imei: selectedObjects,
        drivers : selectedDrivers,
        zone_ids: selectedZones,
        sensor_names: selectedSensors,
        event_ids: selectedEvents,
        data_items: selectedItems,
        other: other,
        dtf: dateFrom,
        dtt: dateTo

    }

    reportGenerateBackground(reportGenerateData);




}



    function reportProperties(action) {



        switch (action) {
            default:
                reportPropertiesReportId(action);
                break;
            case "add":
                reportPropertiesReportAdd();
                break;
            case "cancel":
                reportPropertiesReportCancel();
                break;
            case "save":
                reportPropertiesReportSave();
                break;
            case "generate":
                reportPropertiesReportGenerate();
                break;
            case "generate-background":
                reportPropertiesReportGenerateBackground();
                break;

        }
    }
    
    
    
    function reportsListSensors() {
        var e = document.getElementById("dialog_report_sensor_list");
        e.options.length = 0;
        var t = document.getElementById("dialog_report_type").value;
        if ("drives_stops_logic" == t || "logic_sensors" == t || "sensor_graph" ==
            t) {
            for (var a = document.getElementById("dialog_report_object_list"), o =
                    new Array, i = 0; i < a.options.length; i++)
                if (a.options[i].selected) {
                    var s = a.options[i].value,
                        n = settingsObjectData[s].sensors;
                    for (var l in n) {
                        var d = n[l];
                        "string" != d.result_type && ("drives_stops_logic" == t ||"logic_sensors" == t ? 
                        		"logic" == d.result_type && o.push(d.name) : 
                        		"sensor_graph" == t && o.push(d.name))
                    }
                } o = uniqueArray(o);
            for (i = 0; i < o.length; i++) e.options.add(new Option(o[i], o[i]));
            sortSelectList(e)
        }
        $("#dialog_report_sensor_list").multipleSelect("refresh");
    }

    function reportsSwitchType() {
        var type = document.getElementById("dialog_report_type").value;
        var dialogReportFormat = document.getElementById("dialog_report_format");
        dialogReportFormat.options.length = 0;
        if ("speed_graph" != type &&
            "altitude_graph" != type &&
            "acc_graph" != type &&
            "fuellevel_graph" != type &&
            "temperature_graph" != type &&
            "sensor_graph" != type &&
            "routes" != type &&
            "routes_stops" != type &&
            "image_gallery" != type) {
            dialogReportFormat.options.add(new Option("HTML", "html"));
            dialogReportFormat.options.add(new Option("PDF", "pdf"));
            dialogReportFormat.options.add(new Option("XLS", "xls"));

        } else {
            dialogReportFormat.options.add(new Option("HTML", "html"));

        }
        $("#dialog_report_format").multipleSelect("refresh");
        document.getElementById("dialog_report_object_list").disabled = false;
        document.getElementById("dialog_report_driver_list").disabled = true;
        $('#dialog_report_driver_list option:selected').removeAttr('selected');
        document.getElementById("dialog_report_optimal_consumption").disabled = true;
        document.getElementById("dialog_report_optimal_consumption").value = 0.00;
        document.getElementById("dialog_report_min_duration_zone").disabled = true;
        document.getElementById("dialog_report_min_duration_zone").value = 0.00;
        switch (type) {
            case "general":
            case "general_merged":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = false;
                document.getElementById("dialog_report_stop_duration").disabled = false;
                document.getElementById("dialog_report_show_coordinates").disabled = true;
                document.getElementById("dialog_report_show_addresses").disabled = true;
                document.getElementById("dialog_report_zones_addresses").disabled = true;
                break;
            case "object_info_admin_co":    
            case "object_info_admin":
            case "object_info":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = true;
                document.getElementById("dialog_report_stop_duration").disabled = true;
                document.getElementById("dialog_report_show_coordinates").disabled = true;
                document.getElementById("dialog_report_show_addresses").disabled = true;
                document.getElementById("dialog_report_zones_addresses").disabled = true;
                break;
            case "current_position":
            case "current_position_off":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = true;
                document.getElementById("dialog_report_stop_duration").disabled = true;
                document.getElementById("dialog_report_show_coordinates").disabled = false;
                document.getElementById("dialog_report_show_addresses").disabled = false;
                document.getElementById("dialog_report_zones_addresses").disabled = false;

                break;
            case "drives_stops":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = true;
                document.getElementById("dialog_report_stop_duration").disabled = false;
                document.getElementById("dialog_report_show_coordinates").disabled = false;
                document.getElementById("dialog_report_show_addresses").disabled = false;
                document.getElementById("dialog_report_zones_addresses").disabled = false;
                break;
            case "drives_stops_logic":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = false;
                document.getElementById("dialog_report_speed_limit").disabled = true;
                document.getElementById("dialog_report_speed_limit").value = "";
                document.getElementById("dialog_report_stop_duration").disabled = false;
                document.getElementById("dialog_report_show_coordinates").disabled = false;
                document.getElementById("dialog_report_show_addresses").disabled = false;
                document.getElementById("dialog_report_zones_addresses").disabled = false;
                break;
            case "travel_sheet":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = true;
                document.getElementById("dialog_report_speed_limit").value = "";
                document.getElementById("dialog_report_stop_duration").disabled = false;
                document.getElementById("dialog_report_show_coordinates").disabled = false;
                document.getElementById("dialog_report_show_addresses").disabled = false;
                document.getElementById("dialog_report_zones_addresses").disabled = false;
                break;
            case "travel_sheet_summary":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = false;
                document.getElementById("dialog_report_stop_duration").disabled = false;
                document.getElementById("dialog_report_show_coordinates").disabled = false;
                document.getElementById("dialog_report_show_addresses").disabled = false;
                document.getElementById("dialog_report_zones_addresses").disabled = false;
                document.getElementById("dialog_report_driver_list").disabled = false;
                break;
            case "travel_sheet_driver":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = true;
                document.getElementById("dialog_report_stop_duration").disabled = false;
                document.getElementById("dialog_report_show_coordinates").disabled = false;
                document.getElementById("dialog_report_show_addresses").disabled = false;
                document.getElementById("dialog_report_zones_addresses").disabled = false;
                document.getElementById("dialog_report_driver_list").disabled = false;
                break;
            case "mileage_daily":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = false;
                document.getElementById("dialog_report_stop_duration").disabled = false;
                document.getElementById("dialog_report_show_coordinates").disabled = true;
                document.getElementById("dialog_report_show_addresses").disabled = true;
                document.getElementById("dialog_report_zones_addresses").disabled = true;

                break;
            case "overspeed":
            case "overspeed_all":
            case "underspeed":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = false;
                document.getElementById("dialog_report_stop_duration").disabled = true;
                document.getElementById("dialog_report_show_coordinates").disabled = false;
                document.getElementById("dialog_report_show_addresses").disabled = false;
                document.getElementById("dialog_report_zones_addresses").disabled = false;

                break;
            case "zone_in_out":
            case "zone_in_out_events":
            case "zone_in_out_events_summary":      
                document.getElementById("dialog_report_zone_list").disabled = false;
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = true;
                document.getElementById("dialog_report_speed_limit").value = "";
                document.getElementById("dialog_report_stop_duration").disabled = true;
                document.getElementById("dialog_report_show_coordinates").disabled = false;
                document.getElementById("dialog_report_show_addresses").disabled = false;
                document.getElementById("dialog_report_zones_addresses").disabled = true;
                document.getElementById("dialog_report_min_duration_zone").disabled = false;
                document.getElementById("dialog_report_min_duration_zone").value = 0.00;

                break;
            case "events":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = true;
                document.getElementById("dialog_report_speed_limit").value = "";
                document.getElementById("dialog_report_stop_duration").disabled = true;
                document.getElementById("dialog_report_show_coordinates").disabled = false;
                document.getElementById("dialog_report_show_addresses").disabled = false;
                document.getElementById("dialog_report_zones_addresses").disabled = false;
                document.getElementById("dialog_report_event_list").disabled = true;
                break;
            case "event_by_type":
            case "event_and_costs":
                document.getElementById("dialog_report_zone_list").disabled = true;
                $("#dialog_report_zone_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_sensor_list").disabled = true;
                $("#dialog_report_sensor_list option:selected").removeAttr("selected");
                document.getElementById("dialog_report_speed_limit").disabled = true;
                document.getElementById("dialog_report_speed_limit").value = "";
                document.getElementById("dialog_report_stop_duration").disabled = true;
                document.getElementById("dialog_report_show_coordinates").disabled = false;
                document.getElementById("dialog_report_show_addresses").disabled = false;
                document.getElementById("dialog_report_zones_addresses").disabled = false;
                document.getElementById("dialog_report_event_list").disabled = false;
                $("#dialog_report_event_list option").prop("selected", true);     
                break;
            case "service":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = true;
                $('#dialog_report_sensor_list option:selected').removeAttr('selected');
                document.getElementById('dialog_report_speed_limit').disabled = true;
                document.getElementById('dialog_report_speed_limit').value = "";
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = true;
                document.getElementById('dialog_report_show_addresses').disabled = true;
                document.getElementById('dialog_report_zones_addresses').disabled = true;
                break;
            case "rag":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = true;
                $('#dialog_report_sensor_list option:selected').removeAttr('selected');
                document.getElementById('dialog_report_speed_limit').disabled = false;
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = false;
                document.getElementById('dialog_report_show_addresses').disabled = false;
                document.getElementById('dialog_report_zones_addresses').disabled = true;
                document.getElementById("dialog_report_optimal_consumption").disabled = false;
              
                break;
            case "rag_driver":
                 document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = true;
                $('#dialog_report_sensor_list option:selected').removeAttr('selected');
                document.getElementById('dialog_report_speed_limit').disabled = false;
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = false;
                document.getElementById('dialog_report_show_addresses').disabled = false;
                document.getElementById('dialog_report_zones_addresses').disabled = true;
                document.getElementById("dialog_report_driver_list").disabled = false;
                document.getElementById("dialog_report_optimal_consumption").disabled = false;

                break;
            case "tasks":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = true;
                $('#dialog_report_sensor_list option:selected').removeAttr('selected');
                document.getElementById('dialog_report_speed_limit').disabled = true;
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = true;
                document.getElementById('dialog_report_show_addresses').disabled = true;
                document.getElementById('dialog_report_zones_addresses').disabled = true;

                break;
            case "tasks_tracker":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = true;
                $('#dialog_report_sensor_list option:selected').removeAttr('selected');
                document.getElementById('dialog_report_speed_limit').disabled = true;
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = true;
                document.getElementById('dialog_report_show_addresses').disabled = true;
                document.getElementById('dialog_report_zones_addresses').disabled = true;

                break;
            case "rilogbook":
            case "dtc":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = true;
                $('#dialog_report_sensor_list option:selected').removeAttr('selected');
                document.getElementById('dialog_report_speed_limit').disabled = true;
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = false;
                document.getElementById('dialog_report_show_addresses').disabled = false;
                document.getElementById('dialog_report_zones_addresses').disabled = false;


                break;
            case "fuelout":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = true;
                $('#dialog_report_sensor_list option:selected').removeAttr('selected');
                document.getElementById('dialog_report_speed_limit').disabled = true;
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = true;
                document.getElementById('dialog_report_show_addresses').disabled = true;
                document.getElementById('dialog_report_zones_addresses').disabled = true;
                document.getElementById('dialog_report_object_list').disabled = true;

                break;
            case "fuel_tank":
            case "fuelfillings":
            case "fuelthefts":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = true;
                $('#dialog_report_sensor_list option:selected').removeAttr('selected');
                document.getElementById('dialog_report_speed_limit').disabled = true;
                document.getElementById('dialog_report_speed_limit').value = '';
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = false;
                document.getElementById('dialog_report_show_addresses').disabled = false;
                document.getElementById('dialog_report_zones_addresses').disabled = false;

                break;
            case "logic_sensors":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = false;
                document.getElementById('dialog_report_speed_limit').disabled = true;
                document.getElementById('dialog_report_speed_limit').value = '';
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = false;
                document.getElementById('dialog_report_show_addresses').disabled = false;
                document.getElementById('dialog_report_zones_addresses').disabled = false;

                break;
            case "speed_graph":
            case "altitude_graph":
            case "acc_graph":
            case "fuellevel_graph":
            case "temperature_graph":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = true;
                $('#dialog_report_sensor_list option:selected').removeAttr('selected');
                document.getElementById('dialog_report_speed_limit').disabled = true;
                document.getElementById('dialog_report_speed_limit').value = '';
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = true;
                document.getElementById('dialog_report_show_addresses').disabled = true;
                document.getElementById('dialog_report_zones_addresses').disabled = true;

                break;
            case "sensor_graph":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = false;
                document.getElementById('dialog_report_speed_limit').disabled = true;
                document.getElementById('dialog_report_speed_limit').value = '';
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = true;
                document.getElementById('dialog_report_show_addresses').disabled = true;
                document.getElementById('dialog_report_zones_addresses').disabled = true;

                break;
            case "routes":
            case "routes_stops":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = true;
                $('#dialog_report_sensor_list option:selected').removeAttr('selected');
                document.getElementById('dialog_report_speed_limit').disabled = false;
                document.getElementById('dialog_report_stop_duration').disabled = false;
                document.getElementById('dialog_report_show_coordinates').disabled = true;
                document.getElementById('dialog_report_show_addresses').disabled = true;
                document.getElementById('dialog_report_zones_addresses').disabled = true;

                break;
            case "image_gallery":
                document.getElementById('dialog_report_zone_list').disabled = true;
                $('#dialog_report_zone_list option:selected').removeAttr('selected');
                document.getElementById("dialog_report_event_list").disabled = true;
                $("#dialog_report_event_list option:selected").removeAttr("selected");
                document.getElementById('dialog_report_sensor_list').disabled = true;
                $('#dialog_report_sensor_list option:selected').removeAttr('selected');
                document.getElementById('dialog_report_speed_limit').disabled = true;
                document.getElementById('dialog_report_stop_duration').disabled = true;
                document.getElementById('dialog_report_show_coordinates').disabled = false;
                document.getElementById('dialog_report_show_addresses').disabled = false;
                document.getElementById('dialog_report_zones_addresses').disabled = false;

        }
        $('#dialog_report_zone_list').multipleSelect('refresh');
        $('#dialog_report_sensor_list').multipleSelect('refresh');
        $('#dialog_report_driver_list').multipleSelect('refresh');
        $('#dialog_report_event_list').multipleSelect('refresh');
        if ('rag' == type || 'rag_driver' == type) {
            document.getElementById('dialog_report_other_rag_low_score').value = 0;
            document.getElementById('dialog_report_other_rag_high_score').value = 100;
            document.getElementById('dialog_report_other_rag').style.display = 'none';
        } else {
            document.getElementById('dialog_report_other_rag_low_score').value = '';
            document.getElementById('dialog_report_other_rag_high_score').value = '';
            document.getElementById('dialog_report_other_rag').style.display = 'none';
        }
        if ('fuelout' == type) {
            document.getElementById('dialog_report_fuel').style.display = '';
        } else {
            document.getElementById('dialog_report_fuel').style.display = 'none';
        }

        if('event_and_costs'== type){
            document.getElementById('dialog_report_costs').style.display = '';
        } else {
            document.getElementById('dialog_report_costs').style.display = 'none';
        }

    }    
     
    function reportsGeneratedReload() {
        $("#reports_generated_list_grid").trigger("reloadGrid")
    }

    function  reportGeneratedBackgroundReload(){
    $("#reports_generated_background_list_grid").trigger("reloadGrid");
    }
    
    function reportsGeneratedOpen(id) {reportBackgroundStatusLoadData
        loadingData(true);
        var data = {
            cmd: "open_generated",
            report_id: id
        };
        $.ajax({
            type: "POST",
            url: "func/fn_reports.php",
            data: data,
            dataType: "json",
            cache: false,
            success: function(e) {
                loadingData(false); 
                $.generateFile({
                    filename: e.filename,
                    content: e.content,
                    script: "func/fn_saveas.php?format=" + e.format
                })
            },
            error: function(e, t) {
                loadingData(false);
            }
        })
    } 
    
    function reportsGeneratedDelete(id) {
       if(!utilsCheckPrivileges("viewer")){
    	   return;
       } 
       confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE,
            function(confirm) {
                if (confirm) {
                    var data = {
                        cmd: "delete_report_generated",
                        report_id: id
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_reports.php",
                        data: data,
                        success: function(e) {
                        	if("OK" == e){
                        		reportsGeneratedReload();
                        	}
                        }
                    })
                }
            })
    }

function reportsGeneratedBackgroundDelete(id) {
    if(!utilsCheckPrivileges("viewer")){
        return;
    }
    confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE,
        function(confirm) {
            if (confirm) {
                var data = {
                    cmd: "delete_report_background_generated",
                    report_id: id
                };
                $.ajax({
                    type: "POST",
                    url: "func/fn_reports.php",
                    data: data,
                    success: function(e) {
                        if("OK" == e){
                            reportGeneratedBackgroundReload();
                        }
                    }
                })
            }
        })
}

function reportsGeneratedDeleteSelected() {
        if (!utilsCheckPrivileges("viewer")) {
        return;
        }
            var selectedList = $("#reports_generated_list_grid").jqGrid("getGridParam","selarrrow");
            if(selectedList != ""){
            confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
                function(confirm) {
                    if (confirm) {
                        var data = {
                            cmd: "delete_selected_reports_generated",
                            items: selectedList
                        };
                        $.ajax({
                            type: "POST",
                            url: "func/fn_reports.php",
                            data: data,
                            success: function(e) {
                               if( "OK" == e){
                                reportsGeneratedReload();
                               }
                            }
                        })
                    }
                }); 
        }else{
        	 notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED);
        }
    }

function reportsGeneratedBackgroundDeleteSelected() {
    if (!utilsCheckPrivileges("viewer")) {
        return;
    }
    var selectedList = $("#reports_generated_background_list_grid").jqGrid("getGridParam","selarrrow");
    if(selectedList != ""){
        confirmDialog(la.ARE_YOU_SURE_YOU_WANT_TO_DELETE_SELECTED_ITEMS,
            function(confirm) {
                if (confirm) {
                    var data = {
                        cmd: "delete_selected_reports_background_generated",
                        items: selectedList
                    };
                    $.ajax({
                        type: "POST",
                        url: "func/fn_reports.php",
                        data: data,
                        success: function(e) {
                            if( "OK" == e){
                                reportGeneratedBackgroundReload();
                            }
                        }
                    })
                }
            });
    }else{
        notifyBox("error", la.ERROR, la.NO_ITEMS_SELECTED);
    }
}

    
    
var reportsData = new Array()
reportsData.reports = new Array();
reportsData.edit_report_id = false;
reportsData.data_items = new Array();
reportsData.data_items.general = [
    'route_start',
    'route_end',
    'route_length',
    'move_duration',
    'stop_duration',
    'stop_count',
    'top_speed',
    'avg_speed',
    'overspeed_count',
    'fuel_consumption',
    'avg_fuel_consumption',
    'fuel_cost',
    'engine_work',
    'engine_idle',
    'odometer',
    'engine_hours',
    'driver',
    'trailer'
  ];
  reportsData.data_items.general_merged = [
    'route_start',
    'route_end',
    'route_length',
    'move_duration',
    'stop_duration',
    'stop_count',
    'top_speed',
    'avg_speed',
    'overspeed_count',
    'fuel_consumption',
    'avg_fuel_consumption',
    'fuel_cost',
    'engine_work',
    'engine_idle',
    'odometer',
    'engine_hours',
    'driver',
    'trailer',
    'total'
  ];
  reportsData.data_items.object_info = [
    'imei',
    'transport_model',
    'vin',
    'plate_number',
    'odometer',
    'engine_hours',
    'driver',
    'trailer',
    'gps_device',
    'sim_card_number',
    'group'
  ];
  reportsData.data_items.object_info_admin = [
    'imei',
    'transport_model',
    'vin',
    'plate_number',
    'odometer',
    'engine_hours',
    'driver',
    'trailer',
    'gps_device',
    'sim_card_number'
  ];
  reportsData.data_items.object_info_admin_co = [];
  reportsData.data_items.current_position = [
    'time',
    'position',
    'speed',
    'altitude',
    'angle',
    'status',
    'odometer',
    'engine_hours',
    'object_group',
    'driver'
  ];
  reportsData.data_items.current_position_off = [
    'time',
    'position',
    'speed',
    'altitude',
    'angle',
    'status',
    'odometer',
    'engine_hours'
  ];
  reportsData.data_items.drives_stops = [
    'status',
    'start',
    'end',
    'duration',
    'move_duration',
    'stop_duration',
    'route_length',
    'top_speed',
    'avg_speed',
    'fuel_consumption',
    'avg_fuel_consumption',
    'fuel_cost',
    'engine_work',
    'engine_idle',
    'driver',
    'trailer'
  ];
  reportsData.data_items.drives_stops_logic = [
    'status',
    'start',
    'end',
    'duration',
    'move_duration',
    'stop_duration',
    'route_length',
    'top_speed',
    'avg_speed',
    'fuel_consumption',
    'avg_fuel_consumption',
    'fuel_cost',
    'engine_work',
    'engine_idle',
    'driver',
    'trailer'
  ];
  reportsData.data_items.travel_sheet = [
    'time_a',
    'position_a',
    'time_b',
    'position_b',
    'duration',
    'route_length',
    'fuel_consumption',
    'avg_fuel_consumption',
    'fuel_cost',
    'total',
    'driver',
    'trailer'
  ];
  reportsData.data_items.travel_sheet_summary = [
    'time_a',
    'position_a',
    'time_b',
    'position_b',
    'duration',
    'route_length',
    'fuel_consumption',
    'avg_fuel_consumption',
    'fuel_cost',
    'total',
    'driver',
    'trailer'
  ];

reportsData.data_items.travel_sheet_driver = [
    'time_a',
    'position_a',
    'time_b',
    'position_b',
    'duration',
    'route_length',
    'fuel_consumption',
    'avg_fuel_consumption',
    'fuel_cost',
    'total',
    'driver',
    'trailer'
];

  reportsData.data_items.mileage_daily = [
    'time',
    'start',
    'end',
    'route_length',
    'fuel_consumption',
    'avg_fuel_consumption',
    'fuel_cost',
    'engine_hours',
    'total',
    'driver',
    'trailer'
  ];
  reportsData.data_items.overspeed = [
    'start',
    'end',
    'duration',
    'top_speed',
    'avg_speed',
    'overspeed_position'
  ];
reportsData.data_items.overspeed_all = [
    'start',
    'end',
    'duration',
    'top_speed',
    'avg_speed',
    'overspeed_position'
];
  reportsData.data_items.underspeed = [
    'start',
    'end',
    'duration',
    'top_speed',
    'avg_speed',
    'underspeed_position'
  ];
  reportsData.data_items.zone_in_out = [
    'zone_in',
    'zone_out',
    'duration',
    'route_length',
    'zone_name',
    'zone_position',
    'driver',
    'total'
  ];
  reportsData.data_items.zone_in_out_events = [
    'zone_in',
    'zone_out',
    'duration',
    'zone_name',
    'zone_position',
    'driver'
  ];
  reportsData.data_items.zone_in_out_events_summary = [
    'zone_in',
    'zone_out',
    'duration',
    'zone_name',
    'zone_position',
    'driver'
  ];
  reportsData.data_items.events = [
    'time',
    'event',
    'driver',
    'event_position',
    'total'
  ];
  reportsData.data_items.event_by_type = [
    'time',
    'event',
    'driver',
    'event_position',
    'total'
  ];
  reportsData.data_items.service = ['service', 'last_service', 'status'];
  reportsData.data_items.rag = [
    'overspeed_score',
    'harsh_acceleration_score',
    'harsh_braking_score',
    'harsh_cornering_score'
  ];
  reportsData.data_items.rag_driver = [
    'overspeed_score',
    'harsh_acceleration_score',
    'harsh_braking_score',
    'harsh_cornering_score'
  ];
  reportsData.data_items.tasks = [
    'name',
    'description',
    'from',
    'start_time',
    'to',
    'end_time',
    'priority',
    'status'
  ];
reportsData.data_items.tasks_tracker = [
    'name',
    'description',
    'from',
    'start_time',
    'to',
    'end_time',
    'priority',
    'status',
    'signature'
];
  reportsData.data_items.rilogbook = ['group', 'name', 'position','assign_id'];
  reportsData.data_items.dtc = ['code', 'position'];
  reportsData.data_items.logic_sensors = [
    'sensor',
    'activation_time',
    'deactivation_time',
    'duration',
    'activation_position',
    'deactivation_position'
  ];
  reportsData.data_items.acc_graph = [];
  reportsData.data_items.apeed_graph = [];
  reportsData.data_items.altitude_graph = [];
  reportsData.data_items.fuellevel_graph = [];
  reportsData.data_items.fuel_tank = [
    'time',
    'position',
    'before',
    'after',
    'filled',
    'sensor',
    'driver',
    'total'
  ];
  reportsData.data_items.fuelfillings = [
    'time',
    'position',
    'before',
    'after',
    'filled',
    'sensor',
    'driver',
    'total'
  ];
  reportsData.data_items.fuelthefts = [
    'time',
    'position',
    'before',
    'after',
    'stolen',
    'sensor',
    'driver',
    'total'
  ];
  reportsData.data_items.fuelout = [
    'vehicle_id',
    'placa',
    'vehicle_name',
    'driver_id',
    'driver_name',
    'pump_id',
    'pump_description',
    'transaction_date',
    'transaction_time',
    'odometer',
    'odometer_delta',
    'engine_hours',
    'engine_hours_delta',
    'transaction_description',
    'unit_cost',
    'amount',
    'total_cost',
    'project',
    'marchamo_final_id',
    'marchamo_start_id',
    'bitacora_id',
    'efficiency_GPH',
    'efficiency_KPG'
  ];
  reportsData.data_items.temperature_graph = [];
  reportsData.data_items.sensor_graph = [];
  reportsData.data_items.routes = [
    'route_start',
    'route_end',
    'route_length',
    'move_duration',
    'stop_duration',
    'stop_count',
    'top_speed',
    'avg_speed',
    'overspeed_count',
    'fuel_consumption',
    'avg_fuel_consumption',
    'fuel_cost',
    'engine_work',
    'engine_idle',
    'odometer',
    'engine_hours',
    'driver',
    'trailer'
  ];
  reportsData.data_items.routes_stops = [
    'route_start',
    'route_end',
    'route_length',
    'move_duration',
    'stop_duration',
    'stop_count',
    'top_speed',
    'avg_speed',
    'overspeed_count',
    'fuel_consumption',
    'avg_fuel_consumption',
    'fuel_cost',
    'engine_work',
    'engine_idle',
    'odometer',
    'engine_hours',
    'driver',
    'trailer'
  ];
  reportsData.data_items.image_gallery = ['time', 'position'];
   
    
    
    
    
    