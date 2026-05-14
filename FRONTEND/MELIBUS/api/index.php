<?php

require_once __DIR__ . '/helpers/response.php';
require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/controllers/ParadasController.php';
require_once __DIR__ . '/controllers/HorariosController.php';
require_once __DIR__ . '/controllers/LineasController.php';
require_once __DIR__ . '/controllers/AvisosController.php';
require_once __DIR__ . '/controllers/RecargasController.php';
require_once __DIR__ . '/controllers/AuthController.php';

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

try {
    $db = Database::getConnection();
    $method = $_SERVER['REQUEST_METHOD'];
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH) ?: '/';
    $segments = array_values(array_filter(explode('/', trim($path, '/'))));

    // Permite usar tanto /api/lineas como /lineas al levantar el servidor PHP.
    if (($segments[0] ?? '') === 'api') {
        array_shift($segments);
    }

    if (($segments[0] ?? '') === 'index.php') {
        array_shift($segments);
    }

    $resource = $segments[0] ?? '';
    $id = isset($segments[1]) && ctype_digit($segments[1]) ? (int) $segments[1] : null;
    $action = $segments[2] ?? null;

    if ($method === 'GET' && $resource === '') {
        sendJson([
            'name' => 'MELIBUS API',
            'status' => 'ok',
        ]);
    }

    if ($method === 'GET' && $resource === 'lineas' && $id === null) {
        LineasController::index($db);
    }

    if ($method === 'GET' && $resource === 'lineas' && $id !== null && $action === null) {
        LineasController::show($db, $id);
    }

    if ($method === 'GET' && $resource === 'lineas' && $id !== null && $action === 'paradas') {
        LineasController::paradas($db, $id);
    }

    if ($method === 'GET' && $resource === 'paradas' && $id === null) {
        ParadasController::index($db);
    }

    if ($method === 'GET' && $resource === 'paradas' && $id !== null && $action === null) {
        ParadasController::show($db, $id);
    }

    if ($method === 'GET' && $resource === 'paradas' && $id !== null && $action === 'horarios') {
        ParadasController::horarios($db, $id);
    }

    if ($method === 'GET' && $resource === 'horarios') {
        HorariosController::index($db);
    }

    if ($method === 'GET' && $resource === 'avisos') {
        AvisosController::index($db);
    }

    if ($method === 'GET' && $resource === 'recargas') {
        RecargasController::index($db);
    }

    if ($method === 'POST' && $resource === 'auth' && ($segments[1] ?? '') === 'register') {
        AuthController::register($db);
    }

    if ($method === 'POST' && $resource === 'auth' && ($segments[1] ?? '') === 'login') {
        AuthController::login($db);
    }

    sendError('Endpoint no encontrado.', 404);
} catch (PDOException $error) {
    sendError('Error de base de datos: ' . $error->getMessage(), 500);
} catch (Throwable $error) {
    sendError('Error interno del servidor: ' . $error->getMessage(), 500);
}
