<?php

class AuthController
{
    public static function register(PDO $db): void
    {
        $data = readJsonBody();

        $nombre = trim($data['nombre'] ?? '');
        $email = trim($data['email'] ?? '');
        $password = (string) ($data['password'] ?? '');

        if ($nombre === '' || $email === '' || $password === '') {
            sendError('Nombre, email y contraseña son obligatorios.', 422);
        }

        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            sendError('El email no tiene un formato válido.', 422);
        }

        if (strlen($password) < 6) {
            sendError('La contraseña debe tener al menos 6 caracteres.', 422);
        }

        $statement = $db->prepare(
            'INSERT INTO usuarios (nombre, email, password_hash)
             VALUES (:nombre, :email, :password_hash)'
        );

        try {
            $statement->execute([
                'nombre' => $nombre,
                'email' => $email,
                'password_hash' => password_hash($password, PASSWORD_DEFAULT),
            ]);
        } catch (PDOException $error) {
            if ($error->getCode() === '23000') {
                sendError('Ya existe una cuenta registrada con ese email.', 409);
            }

            throw $error;
        }

        sendJson([
            'success' => true,
            'user' => [
                'id' => (int) $db->lastInsertId(),
                'nombre' => $nombre,
                'email' => $email,
                'rol' => 'usuario',
            ],
        ], 201);
    }

    public static function login(PDO $db): void
    {
        $data = readJsonBody();

        $email = trim($data['email'] ?? '');
        $password = (string) ($data['password'] ?? '');

        if ($email === '' || $password === '') {
            sendError('Introduce el correo y la contraseña.', 422);
        }

        $statement = $db->prepare(
            'SELECT id_usuario, nombre, email, password_hash, rol, activo
             FROM usuarios
             WHERE email = :email
             LIMIT 1'
        );
        $statement->execute(['email' => $email]);
        $usuario = $statement->fetch();

        if (!$usuario || !password_verify($password, $usuario['password_hash'])) {
            sendError('Email o contraseña incorrectos.', 401);
        }

        if (!(bool) $usuario['activo']) {
            sendError('La cuenta está desactivada.', 403);
        }

        sendJson([
            'success' => true,
            'user' => [
                'id' => (int) $usuario['id_usuario'],
                'nombre' => $usuario['nombre'],
                'email' => $usuario['email'],
                'rol' => $usuario['rol'],
            ],
        ]);
    }
}
