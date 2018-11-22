<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("suppliers");

if ($_POST['supplier']['id']) {
	
	$supplier = $con->updateObj($_POST['supplier'],'id');
	
} else {
	
	$supplier = $con->insertObj($_POST['supplier']);
	echo $con->insertId;

}

?>