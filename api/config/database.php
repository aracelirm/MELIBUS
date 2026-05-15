<?php

// Configuración de conexión a MariaDB usando PDO.
// Aquí se cambian usuario, contraseña, host o base de datos si el entorno cambia.

class Database
{
    public static function getConnection(): PDO
    {
        // Datos de conexión. En local usa estos valores, pero se pueden cambiar con variables de entorno.
        $database = getenv('DB_NAME') ?: 'melibus';
        $user = getenv('DB_USER') ?: 'root';
        $password = getenv('DB_PASSWORD') ?: 'Mabel';
        $charset = 'utf8mb4';

        $connectionOptions = [
            [
                'dsn' => sprintf(
                    'mysql:host=%s;port=%s;dbname=%s;charset=%s',
                    getenv('DB_HOST') ?: '127.0.0.1',
                    getenv('DB_PORT') ?: '3306',
                    $database,
                    $charset
                ),
                'user' => $user,
                'password' => $password,
            ],
        ];

        // En macOS/MAMP/Homebrew a veces MariaDB escucha solo por socket.
        $socketCandidates = array_filter([
            getenv('DB_SOCKET') ?: null,
            '/tmp/mysql.sock',
            '/opt/homebrew/var/mysql/mysql.sock',
            '/usr/local/var/mysql/mysql.sock',
            '/Applications/MAMP/tmp/mysql/mysql.sock',
        ]);

        foreach ($socketCandidates as $socket) {
            if (file_exists($socket)) {
                $connectionOptions[] = [
                    'dsn' => sprintf(
                        'mysql:unix_socket=%s;dbname=%s;charset=%s',
                        $socket,
                        $database,
                        $charset
                    ),
                    'user' => $user,
                    'password' => $password,
                ];
            }
        }

        $lastError = null;

        foreach ($connectionOptions as $option) {
            try {
                return new PDO($option['dsn'], $option['user'], $option['password'], [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                    PDO::ATTR_EMULATE_PREPARES => false,
                ]);
            } catch (PDOException $error) {
                $lastError = $error;
            }
        }

        throw new PDOException(
            'No se ha podido conectar con MariaDB. ' . ($lastError ? $lastError->getMessage() : '')
        );
    }
}
