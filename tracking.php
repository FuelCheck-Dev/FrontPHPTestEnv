<?
	session_start();
	include ('init.php');
	include ('func/fn_common.php');	
	checkUserSession();
	
	setUserSessionSettings($_SESSION["user_id"]);
	loadLanguage($_SESSION['language'], $_SESSION["units"]);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="robots" content="noindex">
		<meta name="googlebot" content="noindex">
        <title><? echo $gsValues['NAME'].' '.$gsValues['VERSION']; ?></title>
	
		<?
			if (file_exists('favicon.png'))
			{
				echo '<link rel="shortcut icon" href="'.$gsValues['URL_ROOT'].'/favicon.png" type="image/x-icon">';
			}
			else
			{
				echo '<link rel="shortcut icon" href="'.$gsValues['URL_ROOT'].'/favicon.ico" type="image/x-icon">';
			}	
		?>
		
		<link type="text/css" href="theme/jquery-ui.css?v=<? echo $gsValues['VERSION_ID']; ?>" rel="Stylesheet" />
        <link type="text/css" href="theme/jquery.qtip.css?v=<? echo $gsValues['VERSION_ID']; ?>" rel="Stylesheet" />
        <link type="text/css" href="theme/ui.jqgrid.css?v=<? echo $gsValues['VERSION_ID']; ?>" rel="Stylesheet" />
        <link type="text/css" href="theme/jquery.pnotify.default.css?v=<? echo $gsValues['VERSION_ID']; ?>" rel="Stylesheet" />
		<link type="text/css" href="theme/jquery.multiple.css?v=<? echo $gsValues['VERSION_ID']; ?>" rel="Stylesheet" />
		
		<link type="text/css" href="theme/style.css?v=<? echo $gsValues['VERSION_ID']; ?>" rel="Stylesheet" />
		<link type="text/css" href="theme/style.custom.php?v=<? echo $gsValues['VERSION_ID']; ?>" rel="Stylesheet" />
		
		<link type="text/css" href="theme/leaflet/leaflet.css?v=<? echo $gsValues['VERSION_ID']; ?>" rel="Stylesheet" />
		<link type="text/css" href="theme/leaflet/markercluster.css?v=<? echo $gsValues['VERSION_ID']; ?>" rel="Stylesheet" />
		<link type="text/css" href="theme/leaflet/leaflet-routing-machine.css?v=<? echo $gsValues['VERSION_ID']; ?>" rel="Stylesheet" />
	
                <?
                if ($gsValues['MAP_GOOGLE'] == 'true')
                {
                        if ($gsValues['MAP_GOOGLE_KEY'] == '')
                        {
                                echo '<script src="'.$gsValues['HTTP_MODE'].'://maps.google.com/maps/api/js" defer></script>';
                        }
                        else
                        {
                                echo '<script src="'.$gsValues['HTTP_MODE'].'://maps.google.com/maps/api/js?key='.$gsValues['MAP_GOOGLE_KEY'].'" defer></script>';
                        }
                }
                ?>

                <?
                if ($gsValues['MAP_YANDEX'] == 'true')
                {
                        if ($gsValues['MAP_YANDEX_KEY'] == '')
                        {
                                echo '<script src="'.$gsValues['HTTP_MODE'].'://api-maps.yandex.ru/2.1/?lang=ru-RU" defer></script>';
                        }
                        else
                        {
                                echo '<script src="'.$gsValues['HTTP_MODE'].'://api-maps.yandex.ru/2.1/?apikey='.$gsValues['MAP_YANDEX_KEY'].'&lang=ru-RU" defer></script>';
                        }
                }
                ?>

                <script type="text/javascript" src="js/bundles/vendor.bundle.js?v=<? echo $gsValues['VERSION_ID']; ?>" defer></script>
                <script type="text/javascript" src="js/bundles/app.core.js?v=<? echo $gsValues['VERSION_ID']; ?>" defer></script>
        
        <?
	// check if spare parts files exist, if not, use joined file
        if(file_exists('js/src/gs.tracking.js'))
        {
        ?>
                <script type="text/javascript" src="js/src/gs.dashboard.js" defer></script>
                <script type="text/javascript" src="js/src/gs.datalist.js" defer></script>
                <script type="text/javascript" src="js/src/gs.billing.js" defer></script>
                <script type="text/javascript" src="js/src/gs.chat.js" defer></script>
                <script type="text/javascript" src="js/src/gs.cmd.js" defer></script>
                <script type="text/javascript" src="js/src/gs.dtc.js" defer></script>
                <script type="text/javascript" src="js/src/gs.maintenance.js" defer></script>
                <script type="text/javascript" src="js/src/gs.events.js" defer></script>
                <script type="text/javascript" src="js/src/gs.gui.js" defer></script>
                <script type="text/javascript" src="js/src/gs.history.inpexp.js" defer></script>
                <script type="text/javascript" src="js/src/gs.history.js" defer></script>
                <script type="text/javascript" src="js/src/gs.img.js" defer></script>
                <script type="text/javascript" src="js/src/gs.misc.js" defer></script>
                <script type="text/javascript" src="js/src/gs.notify.js" defer></script>
                <script type="text/javascript" src="js/src/gs.places.inpexp.js" defer></script>
                <script type="text/javascript" src="js/src/gs.places.js" defer></script>
                <script type="text/javascript" src="js/src/gs.places.markers.js" defer></script>
                <script type="text/javascript" src="js/src/gs.places.routes.js" defer></script>
                <script type="text/javascript" src="js/src/gs.places.zones.js" defer></script>
                <script type="text/javascript" src="js/src/gs.reports.js" defer></script>
                <script type="text/javascript" src="js/src/gs.tasks.js" defer></script>
                <script type="text/javascript" src="js/src/gs.rilogbook.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.customfields.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.drivers.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.events.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.groups.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.objects.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.passengers.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.sensors.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.service.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.subaccounts.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.templates.js" defer></script>
                <script type="text/javascript" src="js/src/gs.settings.trailers.js" defer></script>
                <script type="text/javascript" src="js/src/gs.tracking.js" defer></script>
        <?
        }
        else
        {
        ?>
                <script type="text/javascript" src="js/bundles/app.bundle.js?v=<? echo $gsValues['VERSION_ID']; ?>" defer></script>

        <?
        }
        ?>
    </head>
    
    <body onload="load()" onUnload="unload()">
	<input id="load_file" type="file" style="display: none;" onchange=""/>
	
	<div id="loading_panel">
		<div class="table">
			<div class="table-cell center-middle">
				<div id="loading_panel_text">
					<div class="row">
						<img class="logo" src="<? echo $gsValues['URL_ROOT'].'/img/'.$gsValues['LOGO']; ?>" />	
					</div>
					<div class="row">
						<div class="loader">
							<span></span><span></span><span></span><span></span><span></span><span></span><span></span>
						</div>
					</div>
				</div>
			</div>    
		</div>
	</div>
	
	<div id="loading_data_panel" style="display: none;">
		<div class="table">
			<div class="table-cell center-middle">
				<div class="loader">
					<span></span><span></span><span></span><span></span><span></span><span></span><span></span>
				</div>
			</div>
		</div>
	</div>
	
	<div id="blocking_panel">
		<div class="table">
			<div class="table-cell center-middle">
				<div id="blocking_panel_text">
					<div class="row">
						<img class="logo" src="<? echo $gsValues['URL_ROOT'].'/img/'.$gsValues['LOGO']; ?>" />
					</div>
					<? echo '<a href="'.$gsValues['URL_LOGIN'].'">'.$la['SESSION_HAS_EXPIRED'].'</a>'; ?>
				</div>
			</div>
		</div>
	</div>
	
	<div id="content" style="visibility: hidden;">
		<? include ("inc/inc_panels.php"); ?>
		<? include ("inc/inc_menus.php"); ?>
		<? include ("inc/inc_dialogs.dashboard.php"); ?>
		<? include ("inc/inc_dialogs.main.php"); ?>
		<? include ("inc/inc_dialogs.places.php"); ?>
		<? include ("inc/inc_dialogs.reports.php"); ?>
		<? include ("inc/inc_dialogs.tasks.php"); ?>
		<? include ("inc/inc_dialogs.rilogbook.php"); ?>
		<? include ("inc/inc_dialogs.dtc.php"); ?>
		<? include ("inc/inc_dialogs.maintenance.php"); ?>
		<? include ("inc/inc_dialogs.cmd.php"); ?>
		<? include ("inc/inc_dialogs.img.php"); ?>
		<? include ("inc/inc_dialogs.chat.php"); ?>
		<? include ("inc/inc_dialogs.settings.php"); ?>	
	</div>        
    </body>
</html>