<?php

$_POST = json_decode(file_get_contents('php://input'), true);

require_once '../../db.php';

session_start();

$con = new pdo_db();

$user = $con->getData("SELECT * FROM users WHERE id = $_POST[id]");

$group = $con->getData("SELECT id, group_name FROM groups WHERE id = ".$user[0]['groups']);
$user[0]['groups'] = $group[0];	

header("Content-Type: application/json");
echo json_encode($user[0]);

?>