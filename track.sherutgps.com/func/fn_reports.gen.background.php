<?

use func\objects\Vehicle;
use func\objects\ZoneInOutDataSum;
include (__ROOT__.'/init.php');
include ('fn_common.php');
include ('fn_route.php');
include('objects/ZoneInOut.php');
include (__ROOT__.'/tools/gc_func.php');
include (__ROOT__.'/tools/email.php');
include (__ROOT__.'/tools/html2pdf.php');
include ('report-test/generateTest.php');
include ('report-ragbyobject/reportRegByObject.php');
include ('fn_reports.gen.common.php');

function perform($request){

    $_SESSION = getUserData($request['user_id']);
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

   $companyId= getCompanyIdByUserId($user_id);
    $GLOBALS['user_id']= $user_id;
    $GLOBALS['company_id'] = $companyId;

    return reportsGenerate($request );

}





function reportsGenerate($request)
{
    global  $ms, $gsValues, $user_id,$company_id;

    $name = $request['name'];
    $type = $request['type'];
    $ignore_empty_reports = $request['ignore_empty_reports'];
    $format = $request['format'];
    $show_coordinates = $request['show_coordinates'];
    $show_addresses = $request['show_addresses'];
    $zones_addresses = $request['zones_addresses'];
    $stop_duration = $request['stop_duration'];
    $speed_limit = $request['speed_limit'];
    $imei = $request['imei'];
    $drivers = $request['drivers'];
    $zone_ids = $request['zone_ids'];
    $sensor_names = $request['sensor_names'];
    $event_ids = $request['event_ids'];
    $withFilter = $request['with_filter'];
    $data_items = $request['data_items'];
    $other = $request['other'];
    $dtf = $request['dtf'];
    $dtt = $request['dtt'];
    $optimal_consumption = $request['optimal_consumption'];
    $min_duration_zone = $request['min_duration_zone'];

       $imeis =   extractImsis($user_id,$imei);

     if(! validateRequest($imeis,$type)){
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

    $report = base64_encode($report);
    // store generated report
    $sensors = 0;
    $zones = 0;
    if ($zone_ids != '')
    {
        $zones = count(explode(",", $zone_ids));
    }

    if ($sensor_names != '')
    {
        $sensors = count(explode(",", $sensor_names));
    }

    $schedule = 'false';

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

    return $report_file;
}

?>