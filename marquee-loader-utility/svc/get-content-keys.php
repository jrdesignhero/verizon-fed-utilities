<?php
include_once('connect.php');

if($_SERVER['REQUEST_METHOD'] == "POST"){
	// Get data
	$ck_id = isset($_POST['ckid']) ? mysql_real_escape_string($_POST['ckid']) : "";

	// Insert data into data base
	$sql = "SELECT 'desktop_html' FROM 'content_keys' WHERE content_key_id = '" . $ck_id . "'";
	$qur = mysql_query($sql);
	if($qur){
		$json = array("result" => "success", "content_key" => $qur);
	}else{
		$json = array("result" => "failed", "content_key" => "content key not found");
	}
}else{
	$json = array("result" => 0, "content_key" => "Request method not accepted");
}

/* Output header */
	header('Access-Control-Allow-Origin: *');  
	header('Content-type: application/json');
	echo json_encode($json);