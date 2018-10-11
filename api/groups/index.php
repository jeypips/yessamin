<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require_once '../vendor/autoload.php';
require_once '../../db.php';

$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;

$container = new \Slim\Container;
$app = new \Slim\App($container);

$container = $app->getContainer();
$container['con'] = function ($container) {
	$con = new pdo_db();
	return $con;
};

# list groups
$app->get('/list', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	
	$groups = $con->getData("SELECT * FROM groups");	

    return $response->withJson($groups);

});

# add group
$app->post('/add', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "groups";

	$data = $request->getParsedBody();
	
	unset($data['id']);
	$con->insertData($data);

});

# view group
$app->get('/view/{id}', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "groups";

	$group = $con->get(array("id"=>$args['id']));
	
    return $response->withJson($group[0]);

});

# update group
$app->put('/update', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "groups";

	$data = $request->getParsedBody();

	$con->updateData($data,'id');

});

# delete group
$app->delete('/delete/{id}', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "groups";
	
	$group = array("id"=>$args['id']);

	$con->deleteData($group);

});

$app->run();

?>