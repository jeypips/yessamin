<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$supplier = $con->getData("SELECT * FROM suppliers WHERE id = $_POST[id]");

$main_categories = $con->getData("SELECT * FROM suppliers_main_categories WHERE supplier_id = ".$supplier[0]['id']);
$supplier[0]['main_categories'] = $main_categories;
$supplier[0]['dels'] = [];

header("Content-Type: application/json");
echo json_encode($supplier[0]);

?>