<?php

class FavoritasController
{
    public static function index(PDO $db, int $idUsuario): void
    {
        self::ensureUserExists($db, $idUsuario);

        $statement = $db->prepare(
            'SELECT p.id_parada, p.nombre, p.direccion, p.latitud, p.longitud, p.activa,
                    GROUP_CONCAT(lp.id_linea ORDER BY lp.orden, lp.id_linea) AS lineas
             FROM paradas_favoritas pf
             INNER JOIN paradas p ON p.id_parada = pf.id_parada
             LEFT JOIN lineas_paradas lp ON lp.id_parada = p.id_parada
             WHERE pf.id_usuario = :idUsuario AND p.activa = 1
             GROUP BY p.id_parada, p.nombre, p.direccion, p.latitud, p.longitud, p.activa, pf.fecha_creacion
             ORDER BY pf.fecha_creacion DESC'
        );
        $statement->execute(['idUsuario' => $idUsuario]);

        sendJson(array_map([ParadasController::class, 'formatParada'], $statement->fetchAll()));
    }

    public static function store(PDO $db, int $idUsuario): void
    {
        self::ensureUserExists($db, $idUsuario);

        $data = readJsonBody();
        $idParada = (int) ($data['idParada'] ?? 0);

        if ($idParada <= 0) {
            sendError('Debes indicar la parada que quieres añadir a favoritos.', 422);
        }

        self::ensureParadaExists($db, $idParada);

        $statement = $db->prepare(
            'INSERT IGNORE INTO paradas_favoritas (id_usuario, id_parada)
             VALUES (:idUsuario, :idParada)'
        );
        $statement->execute([
            'idUsuario' => $idUsuario,
            'idParada' => $idParada,
        ]);

        sendJson([
            'success' => true,
            'message' => 'Parada añadida a favoritos.',
        ], 201);
    }

    public static function destroy(PDO $db, int $idUsuario, int $idParada): void
    {
        self::ensureUserExists($db, $idUsuario);

        $statement = $db->prepare(
            'DELETE FROM paradas_favoritas
             WHERE id_usuario = :idUsuario AND id_parada = :idParada'
        );
        $statement->execute([
            'idUsuario' => $idUsuario,
            'idParada' => $idParada,
        ]);

        sendJson([
            'success' => true,
            'message' => 'Parada eliminada de favoritos.',
        ]);
    }

    private static function ensureUserExists(PDO $db, int $idUsuario): void
    {
        $statement = $db->prepare(
            'SELECT id_usuario FROM usuarios
             WHERE id_usuario = :idUsuario AND activo = 1'
        );
        $statement->execute(['idUsuario' => $idUsuario]);

        if (!$statement->fetch()) {
            sendError('Usuario no encontrado.', 404);
        }
    }

    private static function ensureParadaExists(PDO $db, int $idParada): void
    {
        $statement = $db->prepare(
            'SELECT id_parada FROM paradas
             WHERE id_parada = :idParada AND activa = 1'
        );
        $statement->execute(['idParada' => $idParada]);

        if (!$statement->fetch()) {
            sendError('Parada no encontrada.', 404);
        }
    }
}
