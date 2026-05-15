<?php

// Funciones comunes para responder desde la API.
// Centraliza JSON, errores y lectura del cuerpo de las peticiones.

function sendJson($data, int $statusCode = 200): void
{
    // Todas las respuestas de la API salen como JSON desde aquí.
    http_response_code($statusCode);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function sendError(string $message, int $statusCode = 400): void
{
    sendJson([
        'success' => false,
        'error' => $message,
    ], $statusCode);
}

function readJsonBody(): array
{
    $rawBody = file_get_contents('php://input');

    if ($rawBody === false || trim($rawBody) === '') {
        return [];
    }

    $data = json_decode($rawBody, true);

    if (!is_array($data)) {
        sendError('El cuerpo de la petición no es un JSON válido.', 400);
    }

    return $data;
}
