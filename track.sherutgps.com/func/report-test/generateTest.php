<?php

function getRagFuel($fuel_kpg) {
    $total = 0;
    if($fuel_kpg >= 0 && $fuel_kpg <= 7.50){
        return  10;
    }
    if($fuel_kpg >= 7.51 && $fuel_kpg <= 8.00){
        return 25;
    }
    if($fuel_kpg >= 8.01 && $fuel_kpg <= 8.50){
        return 35;
    }
    if($fuel_kpg >= 8.51){
        return 45;
    }
    return $total;
    
}
function getRagOverSpeed($overspeed) {
    $total = 0;
    if($overspeed > 120 ){
        return  0;
    }
    if($overspeed >= 91 && $overspeed <= 120){
        return 15;
    }
    if($overspeed >= 61 && $overspeed <= 90){
        return 20;
    }
    if($overspeed >= 0 && $overspeed <= 60){
        return 25;
    }
    return $total;
    
}

function getRagHarshBraking($harshBreak) {
    $total = 0;
    if($harshBreak >= 13 ){
        return  0;
    }
    if($harshBreak >= 9 && $harshBreak <= 12){
        return 3;
    }
    if($harshBreak >= 5 && $harshBreak <= 8){
        return 7;
    }
    if($harshBreak >= 0 && $harshBreak <= 4){
        return 10;
    }
    return $total;
    
}
function getRagIdleTime($idleTime) {
    $time = getTimeDetailsObj($idleTime,true);  
    if($time['days'] > 0 || $time['hours'] >0){
        return 0;
    }
    if($time['minutes'] >=46){
        return 0;
    }
    if($time['minutes'] >=31 && $time['minutes'] <=45){
        return 8;
    }
    if($time['minutes'] >=16 && $time['minutes'] <=30){
        return 12;
    }
    if($time['minutes'] <=15 ){
        return 15;
    }
}


function    getRag($data,$fuel_kpg) {
    $total = 0;
    $total += getRagFuel($fuel_kpg);
    $total += getRagIdleTime($data['engine_idle']);
    $total +=  getRagOverSpeed($data['overspeed_count']);
    $total += getRagHarshBraking($data['hbrake_count']);
    
    return $total;
}

function addColumn($result) {
    global $la;
    $result .= '<tr align="center">';
    $result .= '<th>'.$la['DRIVER'].'</th>';
    $result .= '<th>'.$la['OBJECT'].'</th>';
    $result .= '<th>'.$la['ROUTE_LENGTH'].'</th>';
    $result .= '<th>'.$la['ENGINE_IDLE'].'</th>';
    $result .= '<th>'.$la['OVERSPEED_DURATION'].'</th>';
    $result .= '<th>'.$la['OVERSPEED_EVENTS'].'</th>';
    $result .= '<th>'.$la['MAXIMUM_SPEED'].'</th>';
    $result .= '<th>'.$la['EXTREME_BRAKING_EVENTS'].'</th>';
    $result .= '<th>'.$la['EXTREME_BRAKING_EVENTS_100KM'].'</th>';
    $result .= '<th>'.$la['HARSH_BRAKING_EVENTS'].'</th>';
    $result .= '<th>'.$la['HARSH_BRAKING_EVENTS_100KM'].'</th>';
    $result .= '<th>'.$la['NORMAL_BRAKING_EVENTS'].'</th>';
    $result .= '<th>'.$la['NORMAL_BRAKING_EVENTS_100KM'].'</th>';
    $result .= '<th>'.$la['HARSH_ACCELERATION_EVENTS'].'</th>'; 
    $result .= '<th>'.$la['HARSH_ACCELERATION_EVENTS_100KM'].'</th>';
    $result .= '<th>'.$la['FUEL_CONSUMPTION'].'</th>';
    $result .= '<th>'.$la['EFFICIENCY_KPG'].'</th>';
    $result .= '<th>'.$la['EFFICIENCY_GPK'].'</th>';
    $result .= '<th>'.$la['RAG'].'</th>';
    $result .= '</tr>';
    return  $result;
}

function  addColumnsDetailsTable2($details_table){
    global  $la;
    $details_table .=  '<tr align="center">';
    $details_table .= '<th style="position: sticky;  top: 0;">'.$la['OBJECT'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0;">'.$la['TIME'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0;">'.$la['EVENT'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0;">'.$la['ADDRESS'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0; display:none;">'.$la['LATITUDE'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0; display:none;">'.$la['LONGITUDE'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0; display:none;">id</th>';
    
    return  $details_table;
}

function   assignData($driver_routes,$route,$route_num,$object_name,$imei,$sensor,$speed_limit,$overspeed,$drivers,&$map_data,$show_coordinates, $show_addresses,$optimal_consumption){
    
    $accuracy = getObjectAccuracy($imei);
    $min_idle_speed =  $accuracy['min_idle_speed'];
    $idleTime  =0;
    for ($j=0; $j<count($route['route'])-1; ++$j)
    {
        $sensor_data = getSensorValue($route['route'][$j][6], $sensor[0]);
        $driver_assign_id = $sensor_data['value'];
        
        if($driver_assign_id == 0){
            continue;
        }
        
        if(array_search($driver_assign_id, array_column($drivers, 'driver_assign_id')) == false){
           continue;
       }
       
        
        
        if (!isset($driver_routes[$driver_assign_id]))
        {
            $driver_routes[$driver_assign_id] = array();
            $driver_routes[$driver_assign_id]['objects'] = array();
            $driver_routes[$driver_assign_id]['objects'][$object_name] = array();
            $driver_routes[$driver_assign_id]['objects'][$object_name]['route'] = array();
            $driver_routes[$driver_assign_id]['objects'][$object_name]['route_length'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['engine_idle'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['overspeed_duration'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['fuel_consumption'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['imei'] = $imei;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['max_speed'] = 0;
            $driver_routes[$driver_assign_id]['route_length'] = 0;
            $driver_routes[$driver_assign_id]['engine_idle'] = 0;
            $driver_routes[$driver_assign_id]['overspeed_duration'] = 0;
            $driver_routes[$driver_assign_id]['fuel_consumption'] = 0;
            $driver_routes[$driver_assign_id]['max_speed'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['haccel_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['hbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['nbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['ebrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['overspeed_count'] = 0;
            
            $driver_routes[$driver_assign_id]['haccel_count'] = 0;
            $driver_routes[$driver_assign_id]['hbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['nbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['ebrake_count'] = 0;
            $driver_routes[$driver_assign_id]['overspeed_count'] = 0;
            
            $driver_routes[$driver_assign_id]['route'] = array();
        }
        if (!isset($driver_routes[$driver_assign_id]['objects'][$object_name])){
            $driver_routes[$driver_assign_id]['objects'][$object_name] = array();
            $driver_routes[$driver_assign_id]['objects'][$object_name]['route'] = array();
            $driver_routes[$driver_assign_id]['objects'][$object_name]['route_length'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['engine_idle'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['imei'] = $imei;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['overspeed_duration'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['max_speed'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['fuel_consumption'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['haccel_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['hbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['nbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['ebrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['overspeed_count'] = 0;
            
        }
        
        $driver_routes[$driver_assign_id]['objects'][$object_name]['route'][] = $route['route'][$j];
        $driver_routes[$driver_assign_id]['route'][] = $route['route'][$j];
        
        if($route_num == $j){
            $driver_routes[$driver_assign_id]['objects'][$object_name]['route'][] = $route['route'][$j+1];
            $driver_routes[$driver_assign_id]['route'][] = $route['route'][$j+1];
        }
        
        
        
        $route_length = getLengthBetweenCoordinates($route['route'][$j][1], $route['route'][$j][2], $route['route'][$j+1][1], $route['route'][$j+1][2]);
        $route_length = convDistanceUnits($route_length, 'km', $_SESSION["unit_distance"]);
        
        $driver_routes[$driver_assign_id]['route_length'] += $route_length;
        $driver_routes[$driver_assign_id]['objects'][$object_name]['route_length'] += $route_length;
        
        $speed =  $route['route'][$j][5];
        
        if($speed >  $driver_routes[$driver_assign_id]['objects'][$object_name]['max_speed']){
            $driver_routes[$driver_assign_id]['objects'][$object_name]['max_speed'] = $speed;
        }
        
        if($speed >    $driver_routes[$driver_assign_id]['max_speed']){
            $driver_routes[$driver_assign_id]['max_speed'] = $speed;
        }
        
        if($route['route'][$j][5] <= $min_idle_speed){
            if($idleTime == 0){
                $idleTime_start = $route['route'][$j][0];
                $idleTime = 1;
            }
            
            
        }else{
            
            if($idleTime == 1){
                $idleTime_end = $route['route'][$j][0];
                $diff_time_idleTime = strtotime($idleTime_end) - strtotime($idleTime_start);
                if($diff_time_idleTime > 120){
                    $driver_routes[$driver_assign_id]['engine_idle'] += $diff_time_idleTime;
                    $driver_routes[$driver_assign_id]['objects'][$object_name]['engine_idle'] +=$diff_time_idleTime;
             
                    $idleTime = 0;
                }
            }
            
        }
        
        // overspeeds
        if ($route['route'][$j][5] > $speed_limit)
        {
            if($overspeed == 0)
            {
                $overspeed_start = $route['route'][$j][0];
                $overspeed = 1;
                $overspeed_value= $route['route'][$j][5];
                $overspeed_lat = $route['route'][$j][1];
                $overspeed_lng =  $route['route'][$j][2];
            }
        }
        else
        {
            if ($overspeed == 1)
            {
                $overspeed_end = $route['route'][$j][0];
                $diff_time_overspeed = strtotime($overspeed_end) - strtotime($overspeed_start);
                if($diff_time_overspeed > 120){
                    
                    $address =     reportsGetPossition($overspeed_lat, $overspeed_lng, $show_coordinates, $show_addresses, false);
                    
                    $driver_routes[$driver_assign_id]['overspeed_count'] += 1;
                    $driver_routes[$driver_assign_id]['objects'][$object_name]['overspeed_count'] +=1;
               
                    $map_data[$driver_assign_id][] = array('Overspeed',$overspeed_value,$object_name,$overspeed_lat,$overspeed_lng,$route['route'][$j][0],$address);
                }
                $driver_routes[$driver_assign_id]['overspeed_duration'] +=  $diff_time_overspeed;
                $driver_routes[$driver_assign_id]['objects'][$object_name]['overspeed_duration'] +=  $diff_time_overspeed;
                $overspeed = 0;
            }
        }
    }
    return $driver_routes;
}

function assignEvent($driver_routes,$imei,$dtf,$dtt,$sensor,$object_name,$drivers,&$map_data,$show_coordinates, $show_addresses,$optimal_consumption){
    global $ms, $user_id;
    // events
    $q = "SELECT * FROM `gs_user_events_data` WHERE `user_id`='".$user_id."' AND `imei`='".$imei."' AND dt_tracker BETWEEN '".$dtf."' AND '".$dtt."' ORDER BY dt_tracker ASC";
    $r = mysqli_query($ms, $q);
    
    while($event = mysqli_fetch_array($r))
    {
        $params = json_decode($event['params'], true);
        
        $sensor_data = getSensorValue($params, $sensor[0]);
        $driver_assign_id = $sensor_data['value'];
        
        if($driver_assign_id == 0){
            continue;
        }
        if(array_search($driver_assign_id, array_column($drivers, 'driver_assign_id')) == false){
            continue;
        }
        
        if (!isset($driver_routes[$driver_assign_id]))
        {
            $driver_routes[$driver_assign_id] = array();
            $driver_routes[$driver_assign_id]['objects'] = array();
            $driver_routes[$driver_assign_id]['objects'][$object_name] = array();
            $driver_routes[$driver_assign_id]['objects'][$object_name]['route'] = array();
            $driver_routes[$driver_assign_id]['objects'][$object_name]['haccel_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['hbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['nbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['ebrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['overspeed_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['max_speed'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['route_length'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['engine_idle'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['overspeed_duration'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['fuel_consumption'] = 0;
            
            $driver_routes[$driver_assign_id]['haccel_count'] = 0;
            $driver_routes[$driver_assign_id]['hbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['nbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['ebrake_count'] = 0;
            $driver_routes[$driver_assign_id]['overspeed_count'] =0;
            $driver_routes[$driver_assign_id]['max_speed'] = 0;
            $driver_routes[$driver_assign_id]['route_length'] = 0;
            $driver_routes[$driver_assign_id]['engine_idle'] = 0;
            $driver_routes[$driver_assign_id]['overspeed_duration'] = 0;
            $driver_routes[$driver_assign_id]['fuel_consumption'] = 0;
            
        }
        
        if (!isset($driver_routes[$driver_assign_id]['objects'][$object_name])){
            $driver_routes[$driver_assign_id]['objects'][$object_name] = array();
            $driver_routes[$driver_assign_id]['objects'][$object_name]['route'] = array();
            $driver_routes[$driver_assign_id]['objects'][$object_name]['haccel_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['hbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['nbrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['ebrake_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['overspeed_count'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['max_speed'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['route_length'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['engine_idle'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['overspeed_duration'] = 0;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['fuel_consumption'] = 0;
        }
        
        if ($event['type'] == 'econbrake')
        {
            $param_value = getParamValue($params, 'io134');
            $driver_routes[$driver_assign_id]['nbrake_count'] += $param_value;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['nbrake_count'] += $param_value;
            $time = convUserTimezone($event['dt_tracker']);
            
            $address =     reportsGetPossition($event['lat'], $event['lng'], $show_coordinates, $show_addresses, false);
            
         
            $map_data[$driver_assign_id][] = array($event['event_desc'],$event['speed'],$object_name,$event['lat'],$event['lng'],$time,$address);
            
            
            
        }
        
        if ($event['type'] == 'ecohaccel')
        {
            $param_value = getParamValue($params, 'io136');
            $driver_routes[$driver_assign_id]['haccel_count'] += $param_value;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['haccel_count'] += $param_value;
            $time = convUserTimezone($event['dt_tracker']);
            
            $address =   reportsGetPossition($event['lat'], $event['lng'], $show_coordinates, $show_addresses, false);
            
            
            $map_data[$driver_assign_id][] = array($event['event_desc'],$event['speed'],$object_name,$event['lat'],$event['lng'],$time,$address);
            
        }
        
        if ($event['type'] == 'ecoexthbra')
        {
            $param_value = getParamValue($params, 'io135');
            $ext_brake =     getNumFromByte($param_value,4,8);
            $harsh_brake =     getNumFromByte($param_value,0,4);
            
            $driver_routes[$driver_assign_id]['hbrake_count'] += $harsh_brake;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['hbrake_count'] += $harsh_brake;
            
            $driver_routes[$driver_assign_id]['ebrake_count'] += $ext_brake;
            $driver_routes[$driver_assign_id]['objects'][$object_name]['ebrake_count'] += $ext_brake;
            $address =     reportsGetPossition($event['lat'], $event['lng'], $show_coordinates, $show_addresses, false);
            
            
            $map_data[$driver_assign_id][] = array($event['event_desc'],$event['speed'],$object_name,$event['lat'],$event['lng'],$time,$address);
            
        }
        
        
    }
    return $driver_routes;
}


function getDriverRoutes($imeis,$dtf, $dtt,$speed_limit,$drivers,&$map_data,$show_coordinates, $show_addresses,$optimal_consumption ) {
    global  $user_id;
    $driver_routes = array();

    
    for ($i=0; $i<count($imeis); ++$i)
    {
        $imei = $imeis[$i];
        $object_name = getObjectName($imei);
        $sensor = getSensorFromType($imei, 'da');
        
        if ($sensor)
        {
               
            $route = getRoute($user_id,$imei, $dtf, $dtt,1,true);
            
            if (count($route['route']) == 0)
            {
                continue;
            }
            
            
            $overspeed = 0;
            $route_num= count($route['route'])-2;
            $driver_routes =   assignData($driver_routes,$route,$route_num,$object_name,$imei,$sensor,$speed_limit,$overspeed,$drivers,$map_data,$show_coordinates, $show_addresses,$optimal_consumption);
            $driver_routes =  assignEvent($driver_routes,$imei,$dtf,$dtt,$sensor,$object_name,$drivers,$map_data,$show_coordinates, $show_addresses,$optimal_consumption);

        }
    }
    return  $driver_routes;
}



function reportsGenerateRagByDriver2($imeis, $dtf, $dtt, $speed_limit, $data_items, $other,$driversIds,$show_coordinates, $show_addresses,$optimal_consumption){
    
    global $ms, $_SESSION, $la, $user_id; 
    $other['high_score'] = 100;
    $driversIds = array_map('intval', explode(',', $driversIds));
    $map_data = array();
    $result = '<table class="reportRagByDriver" width="100%" >';
    $result =  addColumn($result);
    $detailsTable =  '<table id="modalTable" class="report" width="100%">';
    $detailsTable =  addColumnsDetailsTable2($detailsTable);
    $detailsTable.='</table>';
    $drivers = array();
    $q = "SELECT * FROM `gs_user_object_drivers` WHERE  `user_id`='".$user_id."'";
    $r = mysqli_query($ms, $q);
    while($driver = mysqli_fetch_array($r))
    {
        if(in_array($driver['driver_id'], $driversIds) ){
            $driver_id =   $driver['driver_id'];
            $driver_name =   $driver['driver_name'];
            $driver_assign_id =   $driver['driver_assign_id'];
            $map_data[$driver_assign_id] = array();
            
            $drivers[$driver_assign_id] = array('driver_id' =>	$driver_id,
               'driver_name' => $driver_name,
               'driver_assign_id' => $driver_assign_id,
               );
           
        }
        
    }
   
    
    $driver_routes = getDriverRoutes($imeis, $dtf, $dtt, $speed_limit,$drivers,$map_data,$show_coordinates, $show_addresses,$optimal_consumption);
    
   
    
    
    $rag = $driver_routes;
    
    
    
    // rag
    foreach ($rag as $key => $value)
    {
        $rag[$key]['driver_assign_id'] = $key;
        $rag[$key]['driver_name'] = strtoupper($key);
        if(isset($drivers[$key]['driver_name'])){
            $rag[$key]['driver_name'] = $drivers[$key]['driver_name'];
        }
 
     
        $objects = $rag[$key]['objects'];
        
        foreach($objects as $key_ob => $value_ob){
            $rag[$key]['objects'][$key_ob]['object_name'] = $key_ob;
            $rag[$key]['objects'][$key_ob]['route_length'] = sprintf('%0.2f', $rag[$key]['objects'][$key_ob]['route_length']);
            $rag[$key]['objects'][$key_ob]['fuel_consumption'] = getRouteFuelConsumption2($rag[$key]['objects'][$key_ob]['route'],$rag[$key]['objects'][$key_ob]['imei']);
            $rag[$key]['fuel_consumption'] += $rag[$key]['objects'][$key_ob]['fuel_consumption'];
            
            
            
            if ($rag[$key]['objects'][$key_ob]['route_length']  > 0 )
            {
                
                $rag[$key]['objects'][$key_ob]['overspeed_score'] = $rag[$key]['objects'][$key_ob]['overspeed_count'];
                $rag[$key]['objects'][$key_ob]['haccel_score'] = $rag[$key]['objects'][$key_ob]['haccel_count'];
                $rag[$key]['objects'][$key_ob]['hbrake_score'] = $rag[$key]['objects'][$key_ob]['hbrake_count'];
                $rag[$key]['objects'][$key_ob]['nbrake_score'] = $rag[$key]['objects'][$key_ob]['nbrake_count'];
                $rag[$key]['objects'][$key_ob]['ebrake_score'] = $rag[$key]['objects'][$key_ob]['ebrake_count'];
                
                
            }
            else
            {
                $rag[$key]['objects'][$key_ob]['overspeed_score'] = 0;
                $rag[$key]['objects'][$key_ob]['haccel_score'] = 0;
                $rag[$key]['objects'][$key_ob]['hbrake_score'] = 0;
                $rag[$key]['objects'][$key_ob]['nbrake_score'] = 0;
                $rag[$key]['objects'][$key_ob]['ebrake_score'] = 0;
                
            }
            
            
            $rag_score = 0;
            
            
            $rag_score +=  $rag[$key]['objects'][$key_ob]['overspeed_score'];
            $rag_score +=  $rag[$key]['objects'][$key_ob]['haccel_score'];
            $rag_score +=  $rag[$key]['objects'][$key_ob]['hbrake_score'];
            //    $rag_score +=  $rag[$key]['objects'][$key_ob]['nbrake_score'];
            $rag_score +=  $rag[$key]['objects'][$key_ob]['ebrake_score'];
            
            $rag[$key]['objects'][$key_ob]['rag_score'] = 100 - $rag_score;
        }
        
        
        $rag[$key]['route_length'] = sprintf('%0.2f', $rag[$key]['route_length']);
        
        if ($rag[$key]['route_length'] > 0 )
        {
            
            $rag[$key]['overspeed_score'] = $rag[$key]['overspeed_count'];
            $rag[$key]['haccel_score'] =$rag[$key]['haccel_count'];
            $rag[$key]['hbrake_score'] = $rag[$key]['hbrake_count'];
            $rag[$key]['nbrake_score'] = $rag[$key]['nbrake_count'];
            $rag[$key]['ebrake_score'] = $rag[$key]['ebrake_count'];
            
            
            
        }
        else
        {
            $rag[$key]['overspeed_score'] = 0;
            $rag[$key]['haccel_score'] = 0;
            $rag[$key]['hbrake_score'] = 0;
            $rag[$key]['nbrake_score'] = 0;
            $rag[$key]['ebrake_score'] = 0;
            
        }
        
        
        
        
        $rag_score = 0;
        
      
        
        $rag_score += $rag[$key]['overspeed_score'];
        $rag_score += $rag[$key]['haccel_score'];
        $rag_score += $rag[$key]['hbrake_score'];
        //         $rag_score += $rag[$key]['nbrake_score'];
        $rag_score += $rag[$key]['ebrake_score'];
        
        
        $rag[$key]['rag_score'] = 100 - $rag_score;
    }
    
    usort($rag, function($a, $b) {
        return strcmp($a["driver_name"], $b["driver_name"]);
    });
        
        if (count($rag) == 0)
        {
            $result .= '<tr><td align="center" colspan="11">'.$la['NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST'].'</td></tr>';
        }
        
        // list all drivers
        for ($i=0; $i<count($rag); ++$i)
        {
            
            $fuel_KPG =0;
            $fuel_GPK =0;
            
            if($rag[$i]['route_length'] > 0 && $rag[$i]['fuel_consumption'] > 0){
                $fuel_consumption =  $rag[$i]['fuel_consumption'];
                $route_length = $rag[$i]['route_length'];
                $fuel_GPK = ($fuel_consumption / $route_length);
                $fuel_KPG = ($route_length / $fuel_consumption);
                $fuel_GPK = round($fuel_GPK * 100) / 100;
                $fuel_KPG = round($fuel_KPG * 100) / 100;
            }
            if($fuel_KPG < $optimal_consumption){
                continue;
            }
            
            $ebrake_count_100k =0;
            $hbrake_count_100k =0;
            $nbrake_count_100k =0;
            $haccel_count_100k =0;
            if($rag[$i]['route_length'] > 0){
                $ebrake_count_100k = ($rag[$i]['ebrake_count'] / $rag[$i]['route_length'])*100;
                $ebrake_count_100k = round($ebrake_count_100k * 100) / 100;
                
                $hbrake_count_100k = ($rag[$i]['hbrake_count'] / $rag[$i]['route_length'])*100;
                $hbrake_count_100k = round($hbrake_count_100k * 100) / 100;
                
                $nbrake_count_100k = ($rag[$i]['nbrake_count'] / $rag[$i]['route_length'])*100;
                $nbrake_count_100k = round($nbrake_count_100k * 100) / 100;
                
                $haccel_count_100k = ($rag[$i]['haccel_count'] / $rag[$i]['route_length'])*100;
                $haccel_count_100k = round($haccel_count_100k * 100) / 100;
            }
            
            $result .= '<tr class="tr-rag" align="center">';
            
            $result .= '<td id="'.$rag[$i]['driver_assign_id'].'" class="clickable td-border-bottom-2" style="color: blue;">'.$rag[$i]['driver_name'].'</td>';
            $result .= '<td class="td-border-bottom-2"> </td>';
            $result .= '<td class="td-border-bottom-2">'.$rag[$i]['route_length'].' '.$la['UNIT_DISTANCE'].'</td>';
            $result .= '<td class="td-border-bottom-2">'.getTimeDetails($rag[$i]['engine_idle'], true).'</td>';
            $result .= '<td class="td-border-bottom-2">'.getTimeDetails($rag[$i]['overspeed_duration'], true).'</td>';
            $result .= '<td class="td-border-bottom-2">'.$rag[$i]['overspeed_count'].'</td>';
            $result .= '<td class="td-border-bottom-2">'.$rag[$i]['max_speed'].'</td>';
            $result .= '<td class="td-border-bottom-2">'.$rag[$i]['ebrake_count'].'</td>';
            $result .= '<td class="td-border-bottom-2">'.$ebrake_count_100k.'</td>';
            $result .= '<td class="td-border-bottom-2">'.$rag[$i]['hbrake_count'].'</td>';
            $result .= '<td class="td-border-bottom-2">'.$hbrake_count_100k.'</td>';
            $result .= '<td class="td-border-bottom-2">'.$rag[$i]['nbrake_count'].'</td>';
            $result .= '<td class="td-border-bottom-2">'.$nbrake_count_100k.'</td>';
            $result .= '<td class="td-border-bottom-2">'.$rag[$i]['haccel_count'].'</td>';
            $result .= '<td class="td-border-bottom-2">'.$haccel_count_100k.'</td>';
            
            
            
         
            
            $rag_score_total = getRag($rag[$i],$fuel_KPG);
            
            $result .= '<td class="td-border-bottom-2">'.$rag[$i]['fuel_consumption'].' '.$la["UNIT_CAPACITY"].'</td>';
            
            $result .= '<td class="td-border-bottom-2">'.$fuel_KPG.' '.$la['UNIT_DISTANCE'].'</td>';
            
            $result .= '<td class="td-border-bottom-2">'.$fuel_GPK.' '.$la["UNIT_CAPACITY"].'</td>';
            
          
            
            if ($rag_score_total <= 40)
            {
                $rag_color = '#FF0000';
            }
            else if (($rag_score_total > 40) && ($rag_score_total <= 80))
            {
                $rag_color = '#FFFF00';
            }
            else if ($rag_score_total > 80)
            {
                
                $rag_color = '#00FF00';
            }
            
            
            
            $result .= '<td class="td-border-bottom-2" style="font-weight: bold;
                color:'.$rag_color.';">'.$rag_score_total.'</td>';
            
            $result .= '</tr>';
            
            
            $objects = $rag[$i]['objects'];
            foreach($objects as $key_ob => $value_ob){
                
                $result .= '<tr align="center">';
                $result .= '<td></td>';
                $result .= '<td class="td-border-1">'.$value_ob['object_name'].'</td>';
                $result .= '<td class="td-border-1">'.$value_ob['route_length'].' '.$la['UNIT_DISTANCE'].'</td>';
                $result .= '<td class="td-border-1">'.getTimeDetails($value_ob['engine_idle'], true).'</td>';
                
                if (in_array("overspeed_score", $data_items))
                {
                    $result .= '<td class="td-border-1">'.getTimeDetails($value_ob['overspeed_duration'], true).'</td>';
                    
                }
                
                $ebrake_count_100k =0;
                $hbrake_count_100k =0;
                $nbrake_count_100k =0;
                $haccel_count_100k =0;
                if($value_ob['route_length'] > 0){
                    $ebrake_count_100k = ($value_ob['ebrake_count'] / $value_ob['route_length'])*100;
                    $ebrake_count_100k = round($ebrake_count_100k * 100) / 100;
                    
                    $hbrake_count_100k = ($value_ob['hbrake_count'] / $value_ob['route_length'])*100;
                    $hbrake_count_100k = round($hbrake_count_100k * 100) / 100;
                    
                    $nbrake_count_100k = ($value_ob['nbrake_count'] / $value_ob['route_length'])*100;
                    $nbrake_count_100k = round($nbrake_count_100k * 100) / 100;
                    
                    $haccel_count_100k = ($value_ob['haccel_count'] / $value_ob['route_length'])*100;
                    $haccel_count_100k = round($haccel_count_100k * 100) / 100;
                }
                
                $result .= '<td class="td-border-1">'.$value_ob['overspeed_count'].'</td>';
                $result .= '<td class="td-border-1">'.$value_ob['max_speed'].'</td>';
                $result .= '<td class="td-border-1">'.$value_ob['ebrake_count'].'</td>';
                $result .= '<td class="td-border-bottom-2">'.$ebrake_count_100k.'</td>';
                $result .= '<td class="td-border-1">'.$value_ob['hbrake_count'].'</td>';
                $result .= '<td class="td-border-bottom-2">'.$hbrake_count_100k.'</td>';
                $result .= '<td class="td-border-1">'.$value_ob['nbrake_count'].'</td>';
                $result .= '<td class="td-border-bottom-2">'.$nbrake_count_100k.'</td>';
                $result .= '<td class="td-border-1">'.$value_ob['haccel_count'].'</td>';
                $result .= '<td class="td-border-bottom-2">'.$haccel_count_100k.'</td>';
                $fuel_KPG =0;
                $fuel_GPK =0;
                
                if($value_ob['route_length'] > 0 && $value_ob['fuel_consumption'] > 0){
                    $fuel_consumption =  $value_ob['fuel_consumption'];
                    $route_length = $value_ob['route_length'];
                    $fuel_GPK = ($fuel_consumption / $route_length);
                    $fuel_KPG = ($route_length / $fuel_consumption);
                    $fuel_GPK = round($fuel_GPK * 100) / 100;
                    $fuel_KPG = round($fuel_KPG * 100) / 100;
                }
                $rag_score_total = getRag($value_ob,$fuel_KPG);
                $result .= '<td class="td-border-1">'.$value_ob['fuel_consumption'].' '.$la["UNIT_CAPACITY"].'</td>';
                
                $result .= '<td class="td-border-1">'.$fuel_KPG.' '.$la['UNIT_DISTANCE'].'</td>';
                
                $result .= '<td class="td-border-1">'.$fuel_GPK.' '.$la["UNIT_CAPACITY"].'</td>';
                
                
                
                if ($rag_score_total <= 40)
                {
                    $rag_color = '#FF0000';
                }
                else if (($rag_score_total > 40) && ($rag_score_total <= 80))
                {
                    $rag_color = '#FFFF00';
                }
                else if ($rag_score_total > 80)
                {
                    
                    $rag_color = '#00FF00';
                }
                
                
                $result .= '<td class="td-border-1" style="font-weight: bold;
                      color:'.$rag_color.';">'.$rag_score_total.'</td>';
                
                
                $result .= '</tr>';
                
                
            }
            
            
            
            
            
            
        }
        

        
        $result .= '</table>';
        
        $result .=' <div id="myModal" class="modal">
   <!-- Modal content -->
	        <div class="modal-content"> 
	        <span id="close" class="close">&times;</span>
 <div class="container" style="display: flex; ">
        <div style="overflow: hidden;width: 50%; margin-right: 10px;">
          <div id="map" class="map"></div>
        </div>
        <div style="flex-grow: 1; max-height: 500px; overflow-y: scroll;overflow-x: auto;">
         '.$detailsTable.'
        </div>
</div>
              
              
        </div></div>';
        
        $result .='<script type="text/javascript">
	var data = transformToEventData2('.json_encode( $map_data).');
					    
					initData(data);


            $(".clickable").click(function(){
      openModal(this.id);
        });
            
     
            </script>';
        return $result;
}
?>