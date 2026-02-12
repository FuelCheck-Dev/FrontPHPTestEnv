<?
	set_time_limit(900);

	// check if reports are called by user or service
	if (!isset($_POST['schedule']))
	{
		session_start();
	}
	

	use func\objects\Vehicle;
	use func\objects\ZoneInOutDataSum;
	include ('../init.php');
	include ('fn_common.php');
	include ('fn_route.php');
	include('objects/ZoneInOut.php');
	include ('../tools/gc_func.php');
	include ('../tools/email.php'); 
	include ('../tools/html2pdf.php');
	include ('report-test/generateTest.php');
	include ('report-ragbyobject/reportRegByObject.php');
	include ('fn_reports.gen.common.php');

	// check if reports are called by user or service
	if (isset($_POST['schedule']))
	{
		$_SESSION = getUserData($_POST['user_id']);
		loadLanguage($_SESSION["language"], $_SESSION["units"]);
	}
	else
	{
		checkUserSession();
		loadLanguage($_SESSION["language"], $_SESSION["units"]);
	}
	
	if(@$_POST['cmd'] == 'report')
	{
		// check privileges
		if ($_SESSION["privileges"] == 'subuser')
		{
			$user_id = $_SESSION["manager_id"];
		}
		else
		{
			$user_id = $_SESSION["user_id"];
		}
        $companyId= getCompanyIdByUserId($user_id);
        $GLOBALS['company_id'] = $companyId;
		// generate or send report to e-mail
		if (isset($_POST['schedule']))
		{	
			//check user usage
			if (!checkUserUsage($user_id, 'email')) die;
		
			reportsSend();
		}
		else
		{
		  
			$report = reportsGenerate();
			
			if ($report != false)
			{
				echo $report;
			}
		}
		
		die;
	}

	function reportsSend()
	{
		global $_POST, $la, $user_id;
		
	
		$template = getDefaultTemplate('schedule_reports', $_SESSION["language"]);
		
		$subject = $la['REPORT'].' - '.$_POST['name'];
		$message = $template['message'];
		
		$filename = strtolower($_POST['name']).'_'.$_POST['dtf'].'_'.$_POST['dtt'].'.'.$_POST['format'];
		$report = reportsGenerate();
		
		if ($report != false)
		{
			$result = sendEmail($_POST['email'], $subject, $message, true, $filename, $report);
			
			if ($result)
			{
				//update user usage
				updateUserUsage($user_id, false, $result, false, false);
			}
		}
		
		die;
	}
	
	function reportsGenerate()
	{
		global $_POST, $ms, $gsValues, $user_id,$company_id;
		
		$name = $_POST['name'];
		$type = $_POST['type'];
		$ignore_empty_reports = $_POST['ignore_empty_reports'];		
		$format = $_POST['format'];
		$show_coordinates = $_POST['show_coordinates'];
		$show_addresses = $_POST['show_addresses'];
		$zones_addresses = $_POST['zones_addresses'];
		$stop_duration = $_POST['stop_duration'];
		$speed_limit = $_POST['speed_limit'];
		$imei = $_POST['imei'];
		$drivers = $_POST['drivers'];
		$zone_ids = $_POST['zone_ids'];
		$sensor_names = $_POST['sensor_names'];
		$event_ids = $_POST['event_ids'];
        $withFilter= $_POST['filter_reports'];
		$data_items = $_POST['data_items'];
		$other = $_POST['other'];
		$dtf = $_POST['dtf'];
		$dtt = $_POST['dtt'];
		$optimal_consumption = $_POST['optimal_consumption'];
		$min_duration_zone = $_POST['min_duration_zone'];
		
		
	   $imeis=  extractImsis($user_id,$imei);

	   if(!validateRequest($imeis,$type)){
	       return false;
       }
		
		$data_items = explode(',', $data_items);
        $other =    extractOther($type,$other);

        $report_html = initCommonReportHtml($gsValues,$format,$type,$company_id);

	
		$report_html .= reportsGenerateLoop($type, $imeis, $dtf, $dtt, $ignore_empty_reports, $speed_limit, $stop_duration, $show_coordinates, $show_addresses, $zones_addresses, $zone_ids, $sensor_names, $data_items, $other,$drivers,$optimal_consumption,$min_duration_zone,$event_ids,$withFilter);
		$report_html .= '</body></html>';
		
		$report = $report_html;
		
		if ($format == 'pdf')
		{
			$report = html2pdf($report);
		}
		
		if (!isset($_POST['schedule']))
		{
			$report = base64_encode($report);	
		}
		
		// store generated report
		if ($zone_ids != '')
		{
			$zones = count(explode(",", $zone_ids));
		}
		else
		{
			$zones = 0;
		}
		
		if ($sensor_names != '')
		{
			$sensors = count(explode(",", $sensor_names));
		}
		else
		{
			$sensors = 0;
		}
		
		
		if (isset($_POST['schedule']))
		{
			$schedule = 'true';
		}
		else
		{
			$schedule = 'false';
		}
		$filename = strtolower($name).'_'.$dtf.'_'.$dtt;
		
		$report_file = $user_id.'_'.md5($type.$dtf.$dtt.gmdate("Y-m-d H:i:s").rand());
		$file_path = $gsValues['PATH_ROOT'].'data/user/reports/'.$report_file;
		
		$report_html = base64_encode($report_html);
		
		$fp = fopen($file_path, 'wb');
		fwrite($fp, $report_html);
		fclose($fp);
		
		if(is_file($file_path))
		{
			$q = "INSERT INTO `gs_user_reports_generated`(	`user_id`,
									`dt_report`,
									`name`,
									`type`,
									`format`,
									`objects`,
									`zones`,
									`sensors`,
									`schedule`,
									`filename`,
									`report_file`)
									VALUES
									('".$user_id."',
									'".gmdate("Y-m-d H:i:s")."',
									'".$name."',
									'".$type."',
									'".$format."',
									'".count($imeis)."',
									'".$zones."',
									'".$sensors."',
									'".$schedule."',
									'".$filename."',
									'".$report_file."')";
			$r = mysqli_query($ms, $q);	
		}
		
		return $report;
	}
	

?>