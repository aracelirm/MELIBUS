<?php

class LineasController
{
    public static function index(PDO $db): void
    {
        $statement = $db->query(
            'SELECT id_linea, nombre, recorrido, activa
             FROM lineas
             WHERE activa = 1
             ORDER BY id_linea'
        );

        sendJson(array_map([self::class, 'formatLinea'], $statement->fetchAll()));
    }

    public static function show(PDO $db, int $id): void
    {
        $statement = $db->prepare(
            'SELECT id_linea, nombre, recorrido, activa
             FROM lineas
             WHERE id_linea = :id AND activa = 1'
        );
        $statement->execute(['id' => $id]);
        $linea = $statement->fetch();

        if (!$linea) {
            sendError('Línea no encontrada.', 404);
        }

        sendJson(self::formatLinea($linea));
    }

    public static function paradas(PDO $db, int $id): void
    {
        $statement = $db->prepare(
            'SELECT p.id_parada, p.nombre, p.direccion, p.latitud, p.longitud, p.activa,
                    GROUP_CONCAT(lp2.id_linea ORDER BY lp2.orden, lp2.id_linea) AS lineas
             FROM paradas p
             INNER JOIN lineas_paradas lp ON lp.id_parada = p.id_parada
             LEFT JOIN lineas_paradas lp2 ON lp2.id_parada = p.id_parada
             WHERE lp.id_linea = :id AND p.activa = 1
             GROUP BY p.id_parada, p.nombre, p.direccion, p.latitud, p.longitud, p.activa, lp.orden
             ORDER BY lp.orden, p.nombre'
        );
        $statement->execute(['id' => $id]);

        sendJson(array_map([ParadasController::class, 'formatParada'], $statement->fetchAll()));
    }

    private static function formatLinea(array $linea): array
    {
        return [
            'id' => (int) $linea['id_linea'],
            'nombre' => $linea['nombre'],
            'recorrido' => $linea['recorrido'],
            'activa' => (bool) $linea['activa'],
        ];
    }
}
