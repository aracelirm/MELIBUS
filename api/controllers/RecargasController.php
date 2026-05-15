<?php

// Controlador de puntos de recarga.
// Devuelve los sitios donde se puede recargar el bonobús.

class RecargasController
{
    public static function index(PDO $db): void
    {
        $statement = $db->query(
            'SELECT id_recarga, nombre, direccion, horario, latitud, longitud, activo
             FROM puntos_recarga
             WHERE activo = 1
             ORDER BY nombre'
        );

        $recargas = array_map(function (array $punto): array {
            return [
                'id' => (int) $punto['id_recarga'],
                'nombre' => $punto['nombre'],
                'direccion' => $punto['direccion'],
                'horario' => $punto['horario'],
                'latitud' => $punto['latitud'] !== null ? (float) $punto['latitud'] : null,
                'longitud' => $punto['longitud'] !== null ? (float) $punto['longitud'] : null,
                'activo' => (bool) $punto['activo'],
            ];
        }, $statement->fetchAll());

        sendJson($recargas);
    }
}
