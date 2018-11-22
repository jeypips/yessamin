<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("users");

if ($_POST['user']['id']) {
	
	$user = $con->updateObj($_POST['user'],'id');
	
} else {
	
	$user = $con->insertObj($_POST['user']);
	echo $con->insertId;

}

?>