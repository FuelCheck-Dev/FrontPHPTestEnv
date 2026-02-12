<? 
	session_start();
	include ('../init.php');
	include ('fn_common.php');
        checkUserSession();

        function getObjectNamesMap($ms, $user_id, $imeis)
        {
                $names = array();

                if (!$imeis)
                {
                        return $names;
                }

                $imei_sql = array();

                foreach ($imeis as $imei)
                {
                        $imei_sql[] = "'".mysqli_real_escape_string($ms, $imei)."'";
                }

                $q = "SELECT `imei`, `name` FROM `gs_objects` WHERE `user_id`='".$user_id."' AND `imei` IN (".implode(',', $imei_sql).")";
                $r = mysqli_query($ms, $q);

                if ($r)
                {
                        while ($row = mysqli_fetch_assoc($r))
                        {
                                $names[$row['imei']] = $row['name'];
                        }
                }

                return $names;
        }
	
	// check privileges
	if ($_SESSION["privileges"] == 'subuser')
	{
		$user_id = $_SESSION["manager_id"];
	}
	else
	{
		$user_id = $_SESSION["user_id"];
	}
	
	if(@$_POST['cmd'] == 'load_last_event')
	{		
		$last_id = $_POST['last_id'];
		
		$result = array();
		
		// check privileges		
		if ($_SESSION["privileges"] == 'subuser')
		{
			$q = "SELECT * FROM `gs_user_last_events_data` WHERE `user_id`='".$user_id."' AND `imei` IN (".$_SESSION["privileges_imei"].")";
		}
		else
		{
			$q = "SELECT * FROM `gs_user_last_events_data` WHERE `user_id`='".$user_id."'";
		}
		
		if ($last_id == -1)
		{
			$q .= " ORDER BY event_id DESC LIMIT 1";
		}
		else
		{
			$q .= " AND `event_id`>'".$last_id."' ORDER BY event_id ASC";
		}
		
                $r = mysqli_query($ms, $q);

                $rows = array();
                $imeis = array();

                if ($r)
                {
                        while($row = mysqli_fetch_array($r))
                        {
                                $rows[] = $row;
                                $imeis[$row['imei']] = true;
                        }
                }

                $object_names = getObjectNamesMap($ms, $user_id, array_keys($imeis));

                foreach ($rows as $row)
                {
                        if ($row['name'] == "")
                        {
                                if (isset($object_names[$row['imei']]) && ($object_names[$row['imei']] != ""))
                                {
                                        $row['name'] = $object_names[$row['imei']];
                                }
                                else
                                {
                                        $row['name'] = getObjectName($row['imei']);
                                }
                        }

                        $row['dt_server'] = convUserTimezone($row['dt_server']);
                        $row['dt_tracker'] = convUserTimezone($row['dt_tracker']);

                        $result [] = $row;
                }
		
		header('Content-type: application/json');
		echo json_encode($result);
		die;	
	}
	
	if(@$_POST['cmd'] == 'delete_all_events')
	{
		$q = "DELETE FROM `gs_user_last_events_data` WHERE `user_id`='".$user_id."'";
		$r = mysqli_query($ms, $q);
		
		$q = "DELETE FROM `gs_user_events_data` WHERE `user_id`='".$user_id."'";
		$r = mysqli_query($ms, $q);
		
		echo 'OK';
		die;
	}

	if(@$_POST['cmd'] == 'load_event_data')
	{
		$result = array();
		
		$event_id = $_POST['event_id'];
		
		// check privileges		
		if ($_SESSION["privileges"] == 'subuser')
		{
			$q = "SELECT * FROM `gs_user_last_events_data`
			WHERE `user_id`='".$user_id."' AND `event_id`='".$event_id."' AND `imei` IN (".$_SESSION["privileges_imei"].") LIMIT 1";
		}
		else
		{
			$q = "SELECT * FROM `gs_user_last_events_data`
			WHERE `user_id`='".$user_id."' AND `event_id`='".$event_id."' LIMIT 1";
		}
		
		$r = mysqli_query($ms, $q);
		$row = mysqli_fetch_array($r);
		
		if($row)
		{
			if ($row['name'] == "")
			{
				$row['name'] = getObjectName($row['imei']);
			}
			
			$row['speed'] = convSpeedUnits($row['speed'], 'km', $_SESSION["unit_distance"]);
			$row['altitude'] = convAltitudeUnits($row['altitude'], 'km', $_SESSION["unit_distance"]);
			
			$params = json_decode($row['params'],true);
			
			$result = array('name' => $row['name'],
					'imei' => $row['imei'],
					'event_desc' => $row['event_desc'],
					'dt_server' => convUserTimezone($row['dt_server']),
					'dt_tracker' => convUserTimezone($row['dt_tracker']),
					'lat' => $row['lat'],
					'lng' => $row['lng'],
					'altitude' => $row['altitude'],
					'angle' => $row['angle'],
					'speed' => $row['speed'],
					'params' => $params);	
		}
		
		header('Content-type: application/json');
		echo json_encode($result);
		die;	
	}

	if(@$_GET['cmd'] == 'load_event_list')
	{		
		$page = $_GET['page']; // get the requested page
		$limit = $_GET['rows']; // get how many rows we want to have into the grid
		$sidx = $_GET['sidx']; // get index row - i.e. user click to sort
		$sord = $_GET['sord']; // get the direction
		$search = caseToUpper(@$_GET['s']); // get search
		
		if(!$sidx) $sidx =1;
			
		// check privileges
		if ($_SESSION["privileges"] == 'subuser')
		{
			$q_base = "FROM `gs_user_last_events_data` WHERE `user_id`='".$user_id."' AND `imei` IN (".$_SESSION["privileges_imei"].")";
		}
		else
		{
			$q_base = "FROM `gs_user_last_events_data` WHERE `user_id`='".$user_id."'";
		}

		if ($search != '')
		{
			$q_base .= " AND (UPPER(`event_desc`) LIKE '%$search%' OR UPPER(`name`) LIKE '%$search%')";
		}

		// NOTE: Indexes on user_id, imei, event_id and searchable columns are required for optimal performance
		$count_q = "SELECT COUNT(*) AS cnt " . $q_base;
		$r = mysqli_query($ms, $count_q);
		$count_data = mysqli_fetch_assoc($r);
		$count = (int)$count_data['cnt'];
		
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
		
		$q = "SELECT * " . $q_base . " ORDER BY $sidx $sord LIMIT $start, $limit";
		$r = mysqli_query($ms, $q);
			
		$response = new stdClass();
		$response->page = $page;
		$response->total = $total_pages;
		$response->records = $count;
		
                $rows = array();
                $imeis = array();

                if ($r)
                {
                        while($row = mysqli_fetch_array($r))
                        {
                                $rows[] = $row;
                                $imeis[$row['imei']] = true;
                        }
                }

                $object_names = getObjectNamesMap($ms, $user_id, array_keys($imeis));

                $i=0;
                foreach ($rows as $row)
                {
                        if (checkObjectActive($row['imei']) == true)
                        {
                                $dt_tracker = convUserTimezone($row['dt_tracker']);

                                if ($row['name'] == "")
                                {
                                        if (isset($object_names[$row['imei']]) && ($object_names[$row['imei']] != ""))
                                        {
                                                $row['name'] = $object_names[$row['imei']];
                                        }
                                        else
                                        {
                                                $row['name'] = getObjectName($row['imei']);
                                        }
                                }

                                $response->rows[$i]['id'] = $row['event_id'];
                                $response->rows[$i]['cell']=array($dt_tracker, $row['name'], $row['event_desc']);
                                $i++;
                        }
                }
		
		header('Content-type: application/json');
		echo json_encode($response);
		die;
	}
?>