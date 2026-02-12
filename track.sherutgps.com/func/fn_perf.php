<?
	// lightweight performance beacon collector
	session_start();
	include ('../init.php');

	$request_body = file_get_contents('php://input');
	if ($request_body == '')
	{
		$request_body = json_encode($_POST);
	}

	if ($request_body != '')
	{
		$log = array(
			'ts' => gmdate('c'),
			'user_id' => isset($_SESSION['user_id']) ? $_SESSION['user_id'] : '',
			'payload' => json_decode($request_body, true)
		);
		@file_put_contents(dirname(__FILE__).'/../logs/perf_frontend.log', json_encode($log)."\n", FILE_APPEND | LOCK_EX);
	}

	header('Content-type: application/json');
	echo json_encode(array('status' => 'ok'));
	die;
?>
