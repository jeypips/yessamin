<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("suppliers_discounts");

if ($_POST['discount']['id']) {
	
	$discount = $con->updateObj($_POST['discount'],'id');
	
} else {
	
	$discount = $con->insertObj($_POST['discount']);
	echo $con->insertId;

}

?>