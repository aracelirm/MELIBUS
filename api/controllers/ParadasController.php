<?php

// Controlador de paradas de autobús.
// Devuelve listados, detalle de parada y horarios asociados a esa parada.

class ParadasController
{
    public static function index(PDO $db): void
    {
        $statement = $db->query(
            'SELECT p.id_parada, p.nombre, p.direccion, p.latitud, p.longitud, p.activa,
                    GROUP_CONCAT(lp.id_linea ORDER BY lp.orden, lp.id_linea) AS lineas
             FROM paradas p
             LEFT JOIN lineas_paradas lp ON lp.id_parada = p.id_parada
             WHERE p.activa = 1
             GROUP BY p.id_parada, p.nombre, p.direccion, p.latitud, p.longitud, p.activa
             ORDER BY p.nombre'
        );

        sendJson(array_map([self::class, 'formatParada'], $statement->fetchAll()));
    }

    public static function show(PDO $db, int $id): void
    {
        $statement = $db->prepare(
            'SELECT p.id_parada, p.nombre, p.direccion, p.latitud, p.longitud, p.activa,
                    GROUP_CONCAT(lp.id_linea ORDER BY lp.orden, lp.id_linea) AS lineas
             FROM paradas p
             LEFT JOIN lineas_paradas lp ON lp.id_parada = p.id_parada
             WHERE p.id_parada = :id AND p.activa = 1
             GROUP BY p.id_parada, p.nombre, p.direccion, p.latitud, p.longitud, p.activa'
        );
        $statement->execute(['id' => $id]);
        $parada = $statement->fetch();

        if (!$parada) {
            sendError('Parada no encontrada.', 404);
        }

        sendJson(self::formatParada($parada));
    }

    public static function horarios(PDO $db, int $id): void
    {
        HorariosController::byParada($db, $id);
    }

    public static function formatParada(array $parada): array
    {
        $lineas = [];

        if (!empty($parada['lineas'])) {
            $lineas = array_map('intval', explode(',', $parada['lineas']));
            sort($lineas);
        }

        return [
            'id' => (int) $parada['id_parada'],
            'nombre' => $parada['nombre'],
            'direccion' => $parada['direccion'],
            'lineas' => $lineas,
            'latitud' => $parada['latitud'] !== null ? (float) $parada['latitud'] : null,
            'longitud' => $parada['longitud'] !== null ? (float) $parada['longitud'] : null,
            'activa' => (bool) $parada['activa'],
        ];
    }
}
