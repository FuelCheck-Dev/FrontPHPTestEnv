<?php


function getRagFuelByObject($fuel_kpg) {
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
function getRagOverSpeedByObject($overspeed) {
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

function getRagHarshBrakingByObject($harshBreak) {
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
function getRagIdleTimeByObject($idleTime) {
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


function    getRagByObject($data,$fuel_kpg) {
    $total = 0;
    $total += getRagFuelByObject($fuel_kpg);
    $total += getRagIdleTimeByObject($data['engine_idle']);
    $total +=  getRagOverSpeedByObject($data['overspeed_count']);
    $total += getRagHarshBrakingByObject($data['hbrake_count']);
    
    return $total;
}


function  addColumnsRagByObject($result){
    global  $la;
    $result .= '<tr align="center">';
    $result .= '<th>'.$la['OBJECT'].'</th>';
    $result .= '<th>'.$la['DRIVER'].'</th>';
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
    return $result;
}
function  addColumnsDetailsTable($details_table){
    global  $la;
    $details_table .=  '<tr align="center">';
    $details_table .= '<th style="position: sticky;  top: 0;">'.$la['DRIVER'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0;">'.$la['TIME'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0;">'.$la['EVENT'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0;">'.$la['ADDRESS'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0; display:none;">'.$la['LATITUDE'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0; display:none;">'.$la['LONGITUDE'].'</th>';
    $details_table .= '<th style="position: sticky;  top: 0; display:none;">id</th>';
    
    return  $details_table;
}

function reportsGenerateRagByObject2($imeis, $dtf, $dtt, $speed_limit, $data_items, $other,$show_coordinates, $show_addresses,$optimal_consumption)
{
    global $ms, $la, $user_id;
 
    
    $result = '<table class="reportRagByDriver" width="100%" ><tr align="center">';
    $result = addColumnsRagByObject($result);
    $details_table =  '<table id="modalTable" class="report" width="100%">';
    $details_table = addColumnsDetailsTable($details_table);
    $details_table.='</table>';
    $map_data = array();
    $driver_routes = array();
    
    $rag = array();
    $map_data = array();
    for ($i=0; $i<count($imeis); ++$i)
    {
        
        $imei = $imeis[$i];
        $accuracy = getObjectAccuracy($imei);
        $min_idle_speed =  $accuracy['min_idle_speed'];
        
        $object_name = getObjectName($imei);
        $sensor = getSensorFromType($imei, 'da');
        
        if ($sensor)
        {
            $map_data[$imei] = array();
         
            $route = getRoute($user_id,$imei, $dtf, $dtt,1,true);

            
            if (count($route['route']) == 0)
            {
                continue;
            }
            
            $driver_routes[$imei] = array();
            $driver_routes[$imei]['drivers'] = array();
            $driver_routes[$imei]['route_length'] = 0;
            $driver_routes[$imei]['engine_idle'] = 0;
            $driver_routes[$imei]['overspeed_duration'] = 0;
            $driver_routes[$imei]['overspeed_count'] = 0;
            $driver_routes[$imei]['fuel_consumption'] = 0;
            $driver_routes[$imei]['max_speed'] = 0;
            $driver_routes[$imei]['object_name'] = $object_name;
            $driver_routes[$imei]['haccel_count'] = 0;
            $driver_routes[$imei]['hbrake_count'] = 0;
            $driver_routes[$imei]['nbrake_count'] = 0;
            $driver_routes[$imei]['ebrake_count'] = 0;
            $driver_routes[$imei]['events'] = array();
            
            $driver_routes[$imei]['route'] = array();
            
            
            $driver_assign_id = false;
            
            $overspeed = 0;
            $idleTime  =0;
            $route_num= count($route['route'])-2;
            for ($j=0; $j<count($route['route'])-1; ++$j)
            {
                $sensor_data = getSensorValue($route['route'][$j][6], $sensor[0]);
                $driver_assign_id = $sensor_data['value'];
                
                if($driver_assign_id == 0){
                    continue;
                }
                
                if (!isset($driver_routes[$imei]['drivers'][$driver_assign_id]))
                {
                    
                    
                    $driver_routes[$imei]['drivers'][$driver_assign_id] = array();
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['route'] = array();
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['route_length'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['engine_idle'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['overspeed_duration'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['overspeed_count'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['fuel_consumption'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['imei'] = $imei;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['max_speed'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['haccel_count'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['hbrake_count'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['nbrake_count'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['ebrake_count'] = 0;
                    
                    $q = "SELECT * FROM `gs_user_object_drivers` WHERE UPPER(`driver_assign_id`)='".strtoupper($driver_assign_id)."' AND `user_id`='".$user_id."'";
                    $r = mysqli_query($ms, $q);
                    $driver = mysqli_fetch_array($r);
                    
                    if ($driver)
                    {
                        $driver_routes[$imei]['drivers'][$driver_assign_id]['driver_name'] = $driver['driver_name'];
                    }
                    else
                    {
                        $driver_routes[$imei]['drivers'][$driver_assign_id]['driver_name'] = strtoupper($driver_assign_id);
                    }
                    
                    
                }
                
                
                $driver_routes[$imei]['drivers'][$driver_assign_id]['route'][] = $route['route'][$j];
                $driver_routes[$imei]['route'][] = $route['route'][$j];
                
                if($route_num == $j){
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['route'][] = $route['route'][$j+1];
                    $driver_routes[$imei]['route'][] = $route['route'][$j+1];
                }
                
                
           
                $route_length = getLengthBetweenCoordinates($route['route'][$j][1], $route['route'][$j][2], $route['route'][$j+1][1], $route['route'][$j+1][2]);
                $route_length = convDistanceUnits($route_length, 'km', $_SESSION["unit_distance"]);
                
                $driver_routes[$imei]['route_length'] += $route_length;
                $driver_routes[$imei]['drivers'][$driver_assign_id]['route_length'] += $route_length;
                
                $speed =  $route['route'][$j][5];
                
                if($speed >  $driver_routes[$imei]['drivers'][$driver_assign_id]['max_speed']){
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['max_speed'] = $speed;
                }
                
                if($speed >    $driver_routes[$imei]['max_speed']){
                    $driver_routes[$imei]['max_speed'] = $speed;
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
                            $driver_routes[$imei]['engine_idle'] += $diff_time_idleTime;
                            $driver_routes[$imei]['drivers'][$driver_assign_id]['engine_idle'] += $diff_time_idleTime;
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
                        if($diff_time_overspeed >= 120){
                            $driver_name =   $driver_routes[$imei]['drivers'][$driver_assign_id]['driver_name'];
                            
                            $address =     reportsGetPossition($overspeed_lat, $overspeed_lng, $show_coordinates, $show_addresses, false);
                            
                                          
                            $driver_routes[$imei]['overspeed_count'] += 1;
                            $driver_routes[$imei]['drivers'][$driver_assign_id]['overspeed_count'] +=1;
                            $map_data[$imei][] = array('Overspeed',$overspeed_value,$driver_name,$overspeed_lat,$overspeed_lng,$route['route'][$j][0],$address);
                    
                        }
                        
                        $driver_routes[$imei]['overspeed_duration'] += $diff_time_overspeed;
                        $driver_routes[$imei]['drivers'][$driver_assign_id]['overspeed_duration'] += $diff_time_overspeed;
                        $overspeed = 0;
                    }
                }
            }
            
         
            
            
            
            
            
            
            
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
                
                if (!isset($driver_routes[$imei]['drivers'][$driver_assign_id])){
                    $driver_routes[$imei]['drivers'][$driver_assign_id] = array();
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['route'] = array();
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['haccel_count'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['hbrake_count'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['nbrake_count'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['imei'] = $imei;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['ebrake_count'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['max_speed'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['route_length'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['engine_idle'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['overspeed_duration'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['overspeed_count'] = 0;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['fuel_consumption'] = 0;
                    
                    $q = "SELECT * FROM `gs_user_object_drivers` WHERE UPPER(`driver_assign_id`)='".strtoupper($driver_assign_id)."' AND `user_id`='".$user_id."'";
                    $r = mysqli_query($ms, $q);
                    $driver = mysqli_fetch_array($r);
                    
                    if ($driver)
                    {
                        $driver_routes[$imei]['drivers'][$driver_assign_id]['driver_name'] = $driver['driver_name'];
                    }
                    else
                    {
                        $driver_routes[$imei]['drivers'][$driver_assign_id]['driver_name'] = strtoupper($driver_assign_id);
                    }
                }
                $driver_name2 = $driver_routes[$imei]['drivers'][$driver_assign_id]['driver_name'];
                
                if ($event['type'] == 'econbrake')
                {
                    $param_value = getParamValue($params, 'io134');
                    $driver_routes[$imei]['nbrake_count'] += $param_value;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['nbrake_count'] += $param_value;
                    $time = convUserTimezone($event['dt_tracker']);
                    
                    $address =     reportsGetPossition($event['lat'], $event['lng'], $show_coordinates, $show_addresses, false);
                    
                    
                  
                    
                    $map_data[$imei][] = array($event['event_desc'],$event['speed'],$driver_name2,$event['lat'],$event['lng'],$time,$address);
                  
                    
                }
                
                if ($event['type'] == 'ecohaccel')
                {
                    $param_value = getParamValue($params, 'io136');
                    $driver_routes[$imei]['haccel_count'] += $param_value;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['haccel_count'] += $param_value;
                    $time = convUserTimezone($event['dt_tracker']);
                    $address =     reportsGetPossition($event['lat'], $event['lng'], $show_coordinates, $show_addresses, false);
     
                    $map_data[$imei][] = array($event['event_desc'],$event['speed'],$driver_name2,$event['lat'],$event['lng'],$time,$address);
                 
                }
                
                if ($event['type'] == 'ecoexthbra')
                {
                    $param_value = getParamValue($params, 'io135');
                    $ext_brake =     getNumFromByte($param_value,4,8);
                    $harsh_brake =     getNumFromByte($param_value,0,4);
                    
                    $driver_routes[$imei]['hbrake_count'] += $harsh_brake;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['hbrake_count'] += $harsh_brake;
                    
                    $driver_routes[$imei]['ebrake_count'] += $ext_brake;
                    $driver_routes[$imei]['drivers'][$driver_assign_id]['ebrake_count'] += $ext_brake;
                    $time = convUserTimezone($event['dt_tracker']);
                    $address =     reportsGetPossition($event['lat'], $event['lng'], $show_coordinates, $show_addresses, false);

                    $map_data[$imei][] = array($event['event_desc'],$event['speed'],$driver_name2,$event['lat'],$event['lng'],$time,$address);
                
                }
                
                
            }
            
            
  
        }
        
    }
    $rag = $driver_routes;
    
    
    
    // rag
    foreach ($rag as $key => $value)
    {
        
        $drivers = $rag[$key]['drivers'];
        $rag[$key]['imei'] = $key;
        foreach($drivers as $key_driver => $value_driver){
            
            $rag[$key]['drivers'][$key_driver]['route_length'] = sprintf('%0.2f', $rag[$key]['drivers'][$key_driver]['route_length']);
            $rag[$key]['drivers'][$key_driver]['fuel_consumption'] = getRouteFuelConsumption2($rag[$key]['drivers'][$key_driver]['route'],$rag[$key]['drivers'][$key_driver]['imei']);
            $rag[$key]['fuel_consumption'] += $rag[$key]['drivers'][$key_driver]['fuel_consumption'];
          
            
            
            if ($rag[$key]['drivers'][$key_driver]['route_length']  > 0 )
            {
                
                
                $rag[$key]['drivers'][$key_driver]['overspeed_score'] = $rag[$key]['drivers'][$key_driver]['overspeed_count'];
                $rag[$key]['drivers'][$key_driver]['haccel_score'] = $rag[$key]['drivers'][$key_driver]['haccel_count'];
                $rag[$key]['drivers'][$key_driver]['hbrake_score'] = $rag[$key]['drivers'][$key_driver]['hbrake_count'];
                $rag[$key]['drivers'][$key_driver]['nbrake_score'] = $rag[$key]['drivers'][$key_driver]['nbrake_count'];
                $rag[$key]['drivers'][$key_driver]['ebrake_score'] = $rag[$key]['drivers'][$key_driver]['ebrake_count'];
                
                
            }
            else
            {
                $rag[$key]['drivers'][$key_driver]['overspeed_score'] = 0;
                $rag[$key]['drivers'][$key_driver]['haccel_score'] = 0;
                $rag[$key]['drivers'][$key_driver]['hbrake_score'] = 0;
                $rag[$key]['drivers'][$key_driver]['nbrake_score'] = 0;
                $rag[$key]['drivers'][$key_driver]['ebrake_score'] = 0;
                
            }
            
            
            $rag_score = 0;
            
            
            $rag_score +=  $rag[$key]['drivers'][$key_driver]['overspeed_score'];
            $rag_score +=  $rag[$key]['drivers'][$key_driver]['haccel_score'];
            $rag_score +=  $rag[$key]['drivers'][$key_driver]['hbrake_score'];
            //  $rag_score +=  $rag[$key]['drivers'][$key_driver]['nbrake_score'];
            $rag_score +=  $rag[$key]['drivers'][$key_driver]['ebrake_score'];
            
            $rag[$key]['drivers'][$key_driver]['rag_score'] = 100 -  $rag_score;
        }
        
        
        $rag[$key]['route_length'] = sprintf('%0.2f', $rag[$key]['route_length']);
        
        if ($rag[$key]['route_length'] > 0 )
        {
            $rag[$key]['overspeed_score'] = $rag[$key]['overspeed_count'];
            $rag[$key]['haccel_score'] = $rag[$key]['haccel_count'];
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
        //  $rag_score += $rag[$key]['nbrake_score'];
        $rag_score += $rag[$key]['ebrake_score'];
        
        
        $rag[$key]['rag_score'] = 100 - $rag_score;
    }
    
    usort($rag, function($a, $b) {
        return strcmp($a["object_name"], $b["object_name"]);
    });
        
        if (count($rag) == 0)
        {
            $result .= '<tr><td align="center" colspan="11">'.$la['NOTHING_HAS_BEEN_FOUND_ON_YOUR_REQUEST'].'</td></tr>';
        }
        
        // list all drivers
        for ($i=0; $i<count($rag); ++$i)
        {
              // if($rag[$i]['driver_name'] == '0'){
            //        continue;
             //    }
            
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
            $result .= '<td id="'.$rag[$i]['imei'].'" class="clickable td-border-bottom-2" style="color: blue;">'.$rag[$i]['object_name'].'</td>';
            
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
            
            
            
         
            
            $rag_score_total = getRagByObject($rag[$i],$fuel_KPG);
            
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
            
            
            $drivers = $rag[$i]['drivers'];
            foreach($drivers as $key_driver => $value_driver){
              
                $fuel_KPG =0;
                $fuel_GPK =0;
                
                if($value_driver['route_length'] > 0 && $value_driver['fuel_consumption'] > 0){
                    $fuel_consumption =  $value_driver['fuel_consumption'];
                    $route_length = $value_driver['route_length'];
                    $fuel_GPK = ($fuel_consumption / $route_length);
                    $fuel_KPG = ($route_length / $fuel_consumption);
                    $fuel_GPK = round($fuel_GPK * 100) / 100;
                    $fuel_KPG = round($fuel_KPG * 100) / 100;
                }
                
                
                $result .= '<tr align="center">';
                $result .= '<td></td>';
                $result .= '<td class="td-border-1">'.$value_driver['driver_name'].'</td>';
                $result .= '<td class="td-border-1">'.$value_driver['route_length'].' '.$la['UNIT_DISTANCE'].'</td>';
                $result .= '<td class="td-border-1">'.getTimeDetails($value_driver['engine_idle'], true).'</td>';
                if (in_array("overspeed_score", $data_items))
                {
                    $result .= '<td class="td-border-1">'.getTimeDetails($value_driver['overspeed_duration'], true).'</td>';
                    
                }
                $result .= '<td class="td-border-1">'.$value_driver['overspeed_count'].'</td>';
                $ebrake_count_100k =0;
                $hbrake_count_100k =0;
                $nbrake_count_100k =0;
                $haccel_count_100k =0;
                if($value_driver['route_length'] > 0){
                    $ebrake_count_100k = ($value_driver['ebrake_count'] / $value_driver['route_length'])*100;
                    $ebrake_count_100k = round($ebrake_count_100k * 100) / 100;
                    
                    $hbrake_count_100k = ($value_driver['hbrake_count'] / $value_driver['route_length'])*100;
                    $hbrake_count_100k = round($hbrake_count_100k * 100) / 100;
                    
                    $nbrake_count_100k = ($value_driver['nbrake_count'] / $value_driver['route_length'])*100;
                    $nbrake_count_100k = round($nbrake_count_100k * 100) / 100;
                    
                    $haccel_count_100k = ($value_driver['haccel_count'] / $value_driver['route_length'])*100;
                    $haccel_count_100k = round($haccel_count_100k * 100) / 100;
                }
                
                
                $result .= '<td class="td-border-1">'.$value_driver['max_speed'].'</td>';
                $result .= '<td class="td-border-1">'.$value_driver['ebrake_count'].'</td>';
                $result .= '<td class="td-border-bottom-2">'.$ebrake_count_100k.'</td>';
                $result .= '<td class="td-border-1">'.$value_driver['hbrake_count'].'</td>';
                $result .= '<td class="td-border-bottom-2">'.$hbrake_count_100k.'</td>';
                $result .= '<td class="td-border-1">'.$value_driver['nbrake_count'].'</td>';
                $result .= '<td class="td-border-bottom-2">'.$nbrake_count_100k.'</td>';
                $result .= '<td class="td-border-1">'.$value_driver['haccel_count'].'</td>';
                $result .= '<td class="td-border-bottom-2">'.$haccel_count_100k.'</td>';
              
                $rag_score_total = getRagByObject($value_driver,$fuel_KPG);
                $result .= '<td class="td-border-1">'.$value_driver['fuel_consumption'].' '.$la["UNIT_CAPACITY"].'</td>';
                
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

    $result .= ' <div id="myModal" class="modal">
   <!-- Modal content -->
	        <div class="modal-content">
	        <span id="close" class="close">&times;</span>
 <div class="container" style="display: flex; ">
        <div style="overflow: hidden;width: 50%; margin-right: 10px;">
          <div id="map" class="map"></div>
        </div>
        <div style="flex-grow: 1; max-height: 500px; overflow-y: scroll;overflow-x: auto;">
         ' . $details_table . '
        </div>
</div>
             
             
        </div></div>';

    $result .= '<script type="text/javascript">
	var data = transformToEventData(' . json_encode($map_data) . ');
	    
					initData(data);
	    
	    
            $(".clickable").click(function(){
      openModal(this.id);
        });
	    
	    
            </script>';
        
        return $result;
        
}
?>
