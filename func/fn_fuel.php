<?
session_start();
include ('../init.php');
include ('fn_common.php');
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

//only for madretierra
if($user_id != 29 && $_SESSION["privileges"] != 'super_admin'){
    
    ob_start();
    header('Content-type: application/json');
    $result = array();
    $result['pumps'] =[];
    $result['vehicles'] =[];
	$result['drivers'] = [];
    echo json_encode($result);
    header("Connection: close");
    header("Content-length: " . (string)ob_get_length());
    ob_end_flush();
    die;
}


if(@$_POST['cmd'] == 'load_fuel_data')
{
        
 $q = "SELECT  * FROM `sh_fuel_data` where company_Id = 513";
       
    
    
    $r = mysqli_query($ms, $q);
    
    $result = array();
    
    while($row = mysqli_fetch_array($r))
    {
        $att = json_decode($row['attributes'],true);
        $result['pumps'] =$att['pumps'];
        $result['vehicles'] =$att['vehicles'];
        $result['drivers'] = $att['drivers'];
    }
    
    mysqli_close($ms);
    
    ob_start();
    header('Content-type: application/json');
    echo json_encode($result);
    header("Connection: close");
    header("Content-length: " . (string)ob_get_length());
    ob_end_flush();
    die;
}
?>