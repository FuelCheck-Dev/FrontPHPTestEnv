<?
	set_time_limit(300);
	
	session_start();	
	include ('../init.php');
	include ('fn_common.php');
	include ('fn_route.php');
	checkUserSession();
	
	loadLanguage($_SESSION["language"], $_SESSION["units"]);
	
	// check privileges
	if ($_SESSION["privileges"] == 'subuser')
	{
		$user_id = $_SESSION["manager_id"];
	}
	else
	{
		$user_id = $_SESSION["user_id"];
	}
	
	if(@$_POST['cmd'] == 'load_route_data')
	{		
		$perf = gsPerfStart('fn_history.php', 'load_route_data');
		$imei = $_POST['imei'];
		$dtf = $_POST['dtf'];
		$dtt = $_POST['dtt'];
		$min_stop_duration = $_POST['min_stop_duration'];
		
		if (!checkUserToObjectPrivileges($user_id, $imei))
		{
			die;
		}
		
		$result = getRoute($user_id, $imei, convUserUTCTimezone($dtf), convUserUTCTimezone($dtt), $min_stop_duration, true);		
		gsPerfFinish($perf, $result, array('imei' => $imei));
		
		header('Content-type: application/json');
		echo json_encode($result);
		die;
	}
	
	if(@$_POST['cmd'] == 'delete_selected_msgs')
	{
		if($_SESSION["obj_history_clear"] == 'true')
		{
			$imei = $_POST["imei"];
			$items = $_POST["items"];
					
			for ($i = 0; $i < count($items); ++$i)
			{
				$item = $items[$i];
				
				$q = "DELETE FROM `gs_object_data_".$imei."` WHERE `dt_tracker`='".$item."'";
				$r = mysqli_query($ms, $q);
			}
			
			echo 'OK';
		}
		
		die;
	}
	
	if(@$_GET['cmd'] == 'load_msg_list_empty')
	{
		$response = new stdClass();
		$response->page = 1;
		$response->total = 1;
		$response->records = 0;
		
		header('Content-type: application/json');
		echo json_encode($response);
		die;
	}
	
	if(@$_GET['cmd'] == 'load_msg_list')
	{
		$perf = gsPerfStart('fn_history.php', 'load_msg_list');
		$imei = $_GET['imei'];
		$dtf = convUserUTCTimezone($_GET['dtf']);
		$dtt = convUserUTCTimezone($_GET['dtt']);
		
		if (!checkUserToObjectPrivileges($user_id, $imei))
		{
			die;
		}
		
		$page = (int)$_GET['page']; // get the requested page
		$limit = (int)$_GET['rows']; // get how many rows we want to have into the grid
		if ($page < 1) { $page = 1; }
		if ($limit < 1) { $limit = 50; }
		if ($limit > 1000) { $limit = 1000; }
		$sidx = $_GET['sidx']; // get index row - i.e. user click to sort
		$sord = $_GET['sord']; // get the direction
		$allowed_sidx = array('dt_server', 'dt_tracker', 'lat', 'lng', 'altitude', 'angle', 'speed');
		if (!in_array($sidx, $allowed_sidx)) { $sidx = 'dt_tracker'; }
		$sord = strtoupper($sord) == 'ASC' ? 'ASC' : 'DESC';
		
		if(!$sidx) $sidx =1;
		
		// get records number
		$q_count = "SELECT COUNT(*) as cnt FROM `gs_object_data_".$imei."` WHERE dt_tracker BETWEEN '".$dtf."' AND '".$dtt."'";
		$q_count_start = microtime(true);
		$r_count = mysqli_query($ms, $q_count);
		gsPerfTrackDb($perf, $q_count_start, $r_count ? 1 : 0);
		$row_count = mysqli_fetch_assoc($r_count);
		$count = (int)$row_count['cnt'];
		
		if ($count > 0)
		{
			$total_pages = ceil($count/$limit);
		}
		else
		{
			$total_pages = 1;
		}
		
		if ($page > $total_pages) $page=$total_pages;
		$start = $limit*$page - $limit; // do not put $limit*($page - 1)
		
		$q = "SELECT dt_server, dt_tracker, lat, lng, altitude, angle, speed, params
			FROM `gs_object_data_".$imei."`
			WHERE dt_tracker BETWEEN '".$dtf."' AND '".$dtt."'
			ORDER BY $sidx $sord LIMIT $start, $limit";
		$q_start = microtime(true);
		$r = mysqli_query($ms, $q);
		gsPerfTrackDb($perf, $q_start, $r ? mysqli_num_rows($r) : 0);
		
		$response = new stdClass();
		$response->page = $page;
		$response->total = $total_pages;
		$response->records = $count;
		
		if ($r)
		{
			$i=0;
			while($row = mysqli_fetch_array($r))
			{
				$dt_server = convUserTimezone($row['dt_server']);
				$dt_tracker = convUserTimezone($row['dt_tracker']);
				
				$row['lat'] = sprintf('%0.6f', $row['lat']);
				$row['lng'] = sprintf('%0.6f', $row['lng']);
				
				$row['altitude'] = convAltitudeUnits($row['altitude'], 'km', $_SESSION["unit_distance"]).' '.$la["UNIT_HEIGHT"];
				$row['speed'] = convSpeedUnits($row['speed'], 'km', $_SESSION["unit_distance"]).' '.$la["UNIT_SPEED"];
				
				if ($row['params'] == '')
				{
					$row['params'] = '';
				}
				else
				{
					$row['params'] = json_decode($row['params'],true);
					
					$arr_params = array();
					
					foreach ($row['params'] as $key => $value)
					{
						array_push($arr_params, $key.'='.$value);
					}
					
					$row['params'] = implode(', ', $arr_params);
				}
				
				//$response->rows[$i]['id'] = $i;
				$response->rows[$i]['id']=$row['dt_tracker'];
				$response->rows[$i]['cell']=array($dt_tracker, $dt_server, $row['lat'], $row['lng'], $row['altitude'], $row['angle'], $row['speed'], $row['params']);
				$i++;
			}
		}
		
		$json = json_encode($response);
		gsPerfFinish($perf, $json, array('imei' => $imei, 'limit' => $limit, 'page' => $page));
		header('Content-type: application/json');
		echo $json;
		die;
	}
?>
