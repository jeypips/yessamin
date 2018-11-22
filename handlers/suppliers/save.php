<?php

header("Content-Type: application/json");

$_POST = json_decode(file_get_contents('php://input'), true);

include_once '../../db.php';

$con = new pdo_db("suppliers");

$main_categories = $_POST['supplier']['main_categories'];
unset($_POST['supplier']['main_categories']);

$main_categories_dels = $_POST['supplier']['main_categories_dels'];
unset($_POST['supplier']['main_categories_dels']);

$categories = $_POST['supplier']['categories'];
unset($_POST['supplier']['categories']);

$categories_dels = $_POST['supplier']['categories_dels'];
unset($_POST['supplier']['categories_dels']);

if ($_POST['supplier']['id']) {
	
	$supplier = $con->updateObj($_POST['supplier'],'id');
	$suppliers_id = $_POST['supplier']['id'];
	
} else {
	
	$supplier = $con->insertObj($_POST['supplier']);
	$suppliers_id = $con->insertId;
	echo $con->insertId;

};

//main categories
if (count($main_categories_dels)) {

	$con->table = "suppliers_main_categories";
	$delete = $con->deleteData(array("id"=>implode(",",$main_categories_dels)));		
	
};
                                    
if (count($main_categories)) {

	$con->table = "suppliers_main_categories";
	
	foreach ($main_categories as $index => $value) {
		
		$main_categories[$index]['suppliers_id'] = $suppliers_id;
		unset($main_categories[$index]['disabled']);			
		
	}
	
	foreach ($main_categories as $index => $value) {

		if ($value['id']) {
			
			$main_category_row = $con->updateData($main_categories[$index],'id');
			
		} else {
			
			unset($main_categories[$index]['id']);
			$main_category_row = $con->insertData($main_categories[$index]);
			
		}
	
	}
	
}; 

//categories
if (count($categories_dels)) {

	$con->table = "suppliers_categories";
	$delete = $con->deleteData(array("id"=>implode(",",$categories_dels)));		
	
};
                                    
if (count($categories)) {

	$con->table = "suppliers_categories";
	
	foreach ($categories as $index => $value) {
		
		$categories[$index]['suppliers_id'] = $suppliers_id;
		unset($categories[$index]['disabled']);		
		
	}
	
	foreach ($categories as $index => $value) {

		if ($value['id']) {
			
			$category_row = $con->updateData($categories[$index],'id');
			
		} else {
			
			unset($categories[$index]['id']);
			$category_row = $con->insertData($categories[$index]);
			
		}
	
	}
	
}; 

?>