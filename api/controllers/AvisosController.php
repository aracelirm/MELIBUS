<?php

// Controlador de avisos e incidencias visibles para el usuario.
// Devuelve los registros activos que se muestran en la página de avisos.

class AvisosController
{
    public static function index(PDO $db): void
    {
        $statement = $db->query(
            'SELECT id_aviso, id_usuario, id_parada, id_linea, tipo, titulo, descripcion,
                    estado, fecha_creacion, activo
             FROM avisos_incidencias
             WHERE activo = 1
             ORDER BY fecha_creacion DESC, id_aviso DESC'
        );

        $avisos = array_map(function (array $aviso): array {
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
        }, $statement->fetchAll());

        sendJson($avisos);
    }
}
