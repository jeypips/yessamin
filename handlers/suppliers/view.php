<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

$con = new pdo_db();

$supplier = $con->getData("SELECT * FROM suppliers WHERE id = $_POST[id]");

$main_categories = $con->getData("SELECT * FROM suppliers_main_categories WHERE suppliers_id = ".$supplier[0]['id']);
foreach ($main_categories as $i => $mc) {
	
	$main_categories[$i]['disabled'] = true;
	
};
$supplier[0]['main_categories'] = $main_categories;
$supplier[0]['main_categories_dels'] = [];

$categories = $con->getData("SELECT * FROM suppliers_categories WHERE suppliers_id = ".$supplier[0]['id']);
foreach ($categories as $i => $mc) {
	
	$categories[$i]['disabled'] = true;
	
};
$supplier[0]['categories'] = $categories;
$supplier[0]['categories_dels'] = [];

/* $suppliers_discounts = $con->getData("SELECT * FROM suppliers_discounts WHERE suppliers_id = ".$supplier[0]['id']);
$supplier[0]['suppliers_discounts'] = $suppliers_discounts; */

header("Content-Type: application/json");
echo json_encode($supplier[0]);

?>