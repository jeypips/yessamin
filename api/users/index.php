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

# list users
$app->get('/list', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	
	$users = $con->getData("SELECT id, groups, CONCAT(firstname,' ',lastname) fullname FROM users");	

    return $response->withJson($users);

});

# add user
$app->post('/add', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "users";

	$data = $request->getParsedBody();
	
	unset($data['id']);
	$con->insertData($data);

});

# view user
$app->get('/view/{id}', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "users";

	$user = $con->get(array("id"=>$args['id']));
	
    return $response->withJson($user[0]);

});

# update user
$app->put('/update', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "users";

	$data = $request->getParsedBody();

	$con->updateData($data,'id');

});

# delete user
$app->delete('/delete/{id}', function (Request $request, Response $response, array $args) {

	$con = $this->con;
	$con->table = "users";
	
	$user = array("id"=>$args['id']);

	$con->deleteData($user);

});

$app->run();

?>