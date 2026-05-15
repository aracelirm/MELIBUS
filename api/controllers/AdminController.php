<?php

class AdminController
{
    public static function usuarios(PDO $db): void
    {
        self::requireAdmin($db);

        $statement = $db->query(
            'SELECT id_usuario, nombre, email, rol, fecha_registro, activo
             FROM usuarios
             ORDER BY fecha_registro DESC, id_usuario DESC'
        );

        sendJson(array_map([self::class, 'formatUsuario'], $statement->fetchAll()));
    }

    public static function updateUsuario(PDO $db, int $idUsuario): void
    {
        self::requireAdmin($db);
        $data = readJsonBody();

        $rol = $data['rol'] ?? null;
        $activo = array_key_exists('activo', $data) ? (int) (bool) $data['activo'] : null;

        if ($rol !== null && !in_array($rol, ['usuario', 'admin'], true)) {
            sendError('Rol no válido.', 422);
        }

        if ($rol === null && $activo === null) {
            sendError('No hay datos para actualizar.', 422);
        }

        $fields = [];
        $params = ['idUsuario' => $idUsuario];

        if ($rol !== null) {
            $fields[] = 'rol = :rol';
            $params['rol'] = $rol;
        }

        if ($activo !== null) {
            $fields[] = 'activo = :activo';
            $params['activo'] = $activo;
        }

        $statement = $db->prepare(
            'UPDATE usuarios SET ' . implode(', ', $fields) . '
             WHERE id_usuario = :idUsuario'
        );
        $statement->execute($params);

        sendJson(['success' => true]);
    }

    public static function paradas(PDO $db): void
    {
        self::requireAdmin($db);

        $statement = $db->query(
            'SELECT p.id_parada, p.nombre, p.direccion, p.latitud, p.longitud, p.activa,
                    GROUP_CONCAT(lp.id_linea ORDER BY lp.orden, lp.id_linea) AS lineas
             FROM paradas p
             LEFT JOIN lineas_paradas lp ON lp.id_parada = p.id_parada
             GROUP BY p.id_parada, p.nombre, p.direccion, p.latitud, p.longitud, p.activa
             ORDER BY p.id_parada'
        );

        sendJson(array_map([ParadasController::class, 'formatParada'], $statement->fetchAll()));
    }

    public static function storeParada(PDO $db): void
    {
        self::requireAdmin($db);
        $data = readJsonBody();
        $parada = self::validateParada($data);

        $statement = $db->prepare(
            'INSERT INTO paradas (nombre, direccion, latitud, longitud, activa)
             VALUES (:nombre, :direccion, :latitud, :longitud, :activa)'
        );
        $statement->execute($parada);

        sendJson([
            'success' => true,
            'id' => (int) $db->lastInsertId(),
        ], 201);
    }

    public static function updateParada(PDO $db, int $idParada): void
    {
        self::requireAdmin($db);
        $parada = self::validateParada(readJsonBody());
        $parada['idParada'] = $idParada;

        $statement = $db->prepare(
            'UPDATE paradas
             SET nombre = :nombre,
                 direccion = :direccion,
                 latitud = :latitud,
                 longitud = :longitud,
                 activa = :activa
             WHERE id_parada = :idParada'
        );
        $statement->execute($parada);

        sendJson(['success' => true]);
    }

    public static function destroyParada(PDO $db, int $idParada): void
    {
        self::requireAdmin($db);

        $statement = $db->prepare(
            'UPDATE paradas SET activa = 0 WHERE id_parada = :idParada'
        );
        $statement->execute(['idParada' => $idParada]);

        sendJson(['success' => true]);
    }

    public static function avisos(PDO $db): void
    {
        self::requireAdmin($db);

        $statement = $db->query(
            'SELECT id_aviso, id_usuario, id_parada, id_linea, tipo, titulo, descripcion,
                    estado, fecha_creacion, activo
             FROM avisos_incidencias
             ORDER BY fecha_creacion DESC, id_aviso DESC'
        );

        sendJson(array_map([self::class, 'formatAviso'], $statement->fetchAll()));
    }

    public static function storeAviso(PDO $db): void
    {
        self::requireAdmin($db);
        $aviso = self::validateAviso(readJsonBody());

        $statement = $db->prepare(
            'INSERT INTO avisos_incidencias
                (id_parada, id_linea, tipo, titulo, descripcion, estado, activo)
             VALUES
                (:idParada, :idLinea, :tipo, :titulo, :descripcion, :estado, :activo)'
        );
        $statement->execute($aviso);

        sendJson([
            'success' => true,
            'id' => (int) $db->lastInsertId(),
        ], 201);
    }

    public static function updateAviso(PDO $db, int $idAviso): void
    {
        self::requireAdmin($db);
        $aviso = self::validateAviso(readJsonBody());
        $aviso['idAviso'] = $idAviso;

        $statement = $db->prepare(
            'UPDATE avisos_incidencias
             SET id_parada = :idParada,
                 id_linea = :idLinea,
                 tipo = :tipo,
                 titulo = :titulo,
                 descripcion = :descripcion,
                 estado = :estado,
                 activo = :activo
             WHERE id_aviso = :idAviso'
        );
        $statement->execute($aviso);

        sendJson(['success' => true]);
    }

    public static function destroyAviso(PDO $db, int $idAviso): void
    {
        self::requireAdmin($db);

        $statement = $db->prepare(
            'UPDATE avisos_incidencias SET activo = 0 WHERE id_aviso = :idAviso'
        );
        $statement->execute(['idAviso' => $idAviso]);

        sendJson(['success' => true]);
    }

    private static function requireAdmin(PDO $db): void
    {
        $idUsuario = (int) ($_SERVER['HTTP_X_USER_ID'] ?? 0);

        if ($idUsuario <= 0) {
            sendError('Debes iniciar sesión como administrador.', 401);
        }

        $statement = $db->prepare(
            'SELECT rol, activo FROM usuarios
             WHERE id_usuario = :idUsuario
             LIMIT 1'
        );
        $statement->execute(['idUsuario' => $idUsuario]);
        $usuario = $statement->fetch();

        if (!$usuario || $usuario['rol'] !== 'admin' || !(bool) $usuario['activo']) {
            sendError('No tienes permisos de administrador.', 403);
        }
    }

    private static function validateParada(array $data): array
    {
        $nombre = trim($data['nombre'] ?? '');
        $direccion = trim($data['direccion'] ?? '');

        if ($nombre === '' || $direccion === '') {
            sendError('Nombre y dirección son obligatorios.', 422);
        }

        return [
            'nombre' => $nombre,
            'direccion' => $direccion,
            'latitud' => self::nullableNumber($data['latitud'] ?? null),
            'longitud' => self::nullableNumber($data['longitud'] ?? null),
            'activa' => (int) (bool) ($data['activa'] ?? true),
        ];
    }

    private static function validateAviso(array $data): array
    {
        $tipo = $data['tipo'] ?? 'incidencia';
        $estado = $data['estado'] ?? 'pendiente';
        $titulo = trim($data['titulo'] ?? '');
        $descripcion = trim($data['descripcion'] ?? '');

        if (!in_array($tipo, ['aviso', 'incidencia'], true)) {
            sendError('Tipo de aviso no válido.', 422);
        }

        if (!in_array($estado, ['pendiente', 'en_revision', 'resuelta'], true)) {
            sendError('Estado de aviso no válido.', 422);
        }

        if ($titulo === '' || $descripcion === '') {
            sendError('Título y descripción son obligatorios.', 422);
        }

        return [
            'idParada' => self::nullableInt($data['idParada'] ?? null),
            'idLinea' => self::nullableInt($data['idLinea'] ?? null),
            'tipo' => $tipo,
            'titulo' => $titulo,
            'descripcion' => $descripcion,
            'estado' => $estado,
            'activo' => (int) (bool) ($data['activo'] ?? true),
        ];
    }

    private static function nullableInt($value): ?int
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (int) $value;
    }

    private static function nullableNumber($value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        return (float) $value;
    }

    private static function formatUsuario(array $usuario): array
    {
        return [
            'id' => (int) $usuario['id_usuario'],
            'nombre' => $usuario['nombre'],
            'email' => $usuario['email'],
            'rol' => $usuario['rol'],
            'fechaRegistro' => $usuario['fecha_registro'],
            'activo' => (bool) $usuario['activo'],
        ];
    }

    private static function formatAviso(array $aviso): array
    {
        return [
            'id' => (int) $aviso['id_aviso'],
            'idUsuario' => $aviso['id_usuario'] !== null ? (int) $aviso['id_usuario'] : null,
            'idParada' => $aviso['id_parada'] !== null ? (int) $aviso['id_parada'] : null,
            'idLinea' => $aviso['id_linea'] !== null ? (int) $aviso['id_linea'] : null,
            'tipo' => $aviso['tipo'],
            'titulo' => $aviso['titulo'],
            'descripcion' => $aviso['descripcion'],
            'estado' => $aviso['estado'],
            'fecha' => substr($aviso['fecha_creacion'], 0, 10),
            'activo' => (bool) $aviso['activo'],
        ];
    }
}
