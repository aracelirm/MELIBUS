<?php

class HorariosController
{
    public static function index(PDO $db): void
    {
        $statement = $db->query(self::baseQuery() . ' ORDER BY h.id_linea, h.id_parada, h.tipo_dia');

        sendJson(array_map([self::class, 'formatHorario'], $statement->fetchAll()));
    }

    public static function byParada(PDO $db, int $idParada): void
    {
        $statement = $db->prepare(
            self::baseQuery('h.id_parada = :idParada') .
            ' ORDER BY h.id_linea, h.tipo_dia'
        );
        $statement->execute(['idParada' => $idParada]);

        sendJson(array_map([self::class, 'formatHorario'], $statement->fetchAll()));
    }

    private static function baseQuery(?string $where = null): string
    {
        $conditions = ['l.activa = 1', 'p.activa = 1'];

        if ($where) {
            $conditions[] = $where;
        }

        return sprintf(
            'SELECT MIN(h.id_horario) AS id_grupo,
                    h.id_linea,
                    h.id_parada,
                    h.tipo_dia,
                    l.nombre AS linea_nombre,
                    p.nombre AS parada_nombre,
                    GROUP_CONCAT(TIME_FORMAT(h.hora, "%%H:%%i") ORDER BY h.hora SEPARATOR ",") AS horas
             FROM horarios h
             INNER JOIN lineas l ON l.id_linea = h.id_linea
             INNER JOIN paradas p ON p.id_parada = h.id_parada
             WHERE %s
             GROUP BY h.id_linea, h.id_parada, h.tipo_dia, l.nombre, p.nombre',
            implode(' AND ', $conditions)
        );
    }

    private static function formatHorario(array $horario): array
    {
        $horas = [];

        if (!empty($horario['horas'])) {
            $horas = explode(',', $horario['horas']);
        }

        return [
            'id' => (int) $horario['id_grupo'],
            'idLinea' => (int) $horario['id_linea'],
            'idParada' => (int) $horario['id_parada'],
            'tipoDia' => $horario['tipo_dia'],
            'lineaNombre' => $horario['linea_nombre'],
            'paradaNombre' => $horario['parada_nombre'],
            'horas' => $horas,
        ];
    }
}
