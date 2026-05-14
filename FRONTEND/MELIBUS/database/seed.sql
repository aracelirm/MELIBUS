USE melibus;

INSERT INTO usuarios (id_usuario, nombre, email, password_hash, rol, activo)
VALUES
  (1, 'Usuario MELIBUS', 'usuario@melibus.local', '$2y$12$KK3mF48.693RDH33salaMemYhP2h0VnqCMbtKXkhD/DGRN8nBQ.6K', 'usuario', 1),
  (2, 'Administracion MELIBUS', 'admin@melibus.local', '$2y$12$KK3mF48.693RDH33salaMemYhP2h0VnqCMbtKXkhD/DGRN8nBQ.6K', 'admin', 1)
ON DUPLICATE KEY UPDATE
  nombre = VALUES(nombre),
  password_hash = VALUES(password_hash),
  rol = VALUES(rol),
  activo = VALUES(activo);

INSERT INTO lineas (id_linea, nombre, recorrido, activa)
VALUES
  (1, 'Linea 1', 'Lope de Vega - Frontera Beni Enzar', 1),
  (2, 'Linea 2', 'Lope de Vega - Centro Comercial', 1),
  (3, 'Linea 3', 'Barrio Victoria - Real', 1),
  (4, 'Linea 4', 'Monte Maria Cristina - Melilla la Vieja', 1)
ON DUPLICATE KEY UPDATE
  nombre = VALUES(nombre),
  recorrido = VALUES(recorrido),
  activa = VALUES(activa);

INSERT INTO paradas (id_parada, nombre, direccion, latitud, longitud, activa)
VALUES
  (1, 'Plaza Espana', 'Plaza de Espana', 35.2917610, -2.9385360, 1),
  (2, 'Avenida Juan Carlos I', 'Avenida Juan Carlos I', 35.2926400, -2.9394300, 1),
  (3, 'Barrio Real', 'Barrio del Real', 35.2796500, -2.9480800, 1),
  (4, 'Frontera Beni Enzar', 'Zona Frontera Beni Enzar', 35.2749000, -2.9292000, 1),
  (5, 'Lope de Vega', 'Calle Lope de Vega', 35.2879200, -2.9461800, 1),
  (6, 'Centro Comercial', 'Zona Centro Comercial', 35.2903600, -2.9567500, 1),
  (7, 'Hospital Comarcal', 'Avenida de la Democracia', 35.2861500, -2.9556200, 1),
  (8, 'Barrio Victoria', 'Barrio de la Victoria', 35.2964200, -2.9445100, 1),
  (9, 'Monte Maria Cristina', 'Monte Maria Cristina', 35.2989800, -2.9387100, 1),
  (10, 'Melilla la Vieja', 'Melilla la Vieja', 35.2947800, -2.9328600, 1)
ON DUPLICATE KEY UPDATE
  nombre = VALUES(nombre),
  direccion = VALUES(direccion),
  latitud = VALUES(latitud),
  longitud = VALUES(longitud),
  activa = VALUES(activa);

INSERT INTO lineas_paradas (id_linea, id_parada, orden)
VALUES
  (1, 5, 1),
  (1, 1, 2),
  (1, 2, 3),
  (1, 4, 4),
  (2, 5, 1),
  (2, 1, 2),
  (2, 2, 3),
  (2, 7, 4),
  (2, 6, 5),
  (3, 8, 1),
  (3, 2, 2),
  (3, 3, 3),
  (4, 9, 1),
  (4, 1, 2),
  (4, 10, 3)
ON DUPLICATE KEY UPDATE
  orden = VALUES(orden);

INSERT INTO horarios (id_horario, id_linea, id_parada, tipo_dia, hora)
VALUES
  (1, 1, 5, 'Laborable', '08:00:00'),
  (2, 1, 5, 'Laborable', '08:30:00'),
  (3, 1, 5, 'Laborable', '09:00:00'),
  (4, 1, 5, 'Laborable', '09:30:00'),
  (5, 1, 5, 'Laborable', '10:00:00'),
  (6, 1, 1, 'Laborable', '08:05:00'),
  (7, 1, 1, 'Laborable', '08:35:00'),
  (8, 1, 1, 'Laborable', '09:05:00'),
  (9, 1, 1, 'Laborable', '09:35:00'),
  (10, 1, 1, 'Laborable', '10:05:00'),
  (11, 1, 4, 'Laborable', '08:20:00'),
  (12, 1, 4, 'Laborable', '08:50:00'),
  (13, 1, 4, 'Laborable', '09:20:00'),
  (14, 1, 4, 'Laborable', '09:50:00'),
  (15, 1, 4, 'Laborable', '10:20:00'),
  (16, 2, 1, 'Laborable', '08:10:00'),
  (17, 2, 1, 'Laborable', '08:40:00'),
  (18, 2, 1, 'Laborable', '09:10:00'),
  (19, 2, 1, 'Laborable', '09:40:00'),
  (20, 2, 1, 'Laborable', '10:10:00'),
  (21, 2, 6, 'Laborable', '08:25:00'),
  (22, 2, 6, 'Laborable', '08:55:00'),
  (23, 2, 6, 'Laborable', '09:25:00'),
  (24, 2, 6, 'Laborable', '09:55:00'),
  (25, 2, 6, 'Laborable', '10:25:00'),
  (26, 3, 8, 'Laborable', '08:20:00'),
  (27, 3, 8, 'Laborable', '08:50:00'),
  (28, 3, 8, 'Laborable', '09:20:00'),
  (29, 3, 8, 'Laborable', '09:50:00'),
  (30, 3, 8, 'Laborable', '10:20:00'),
  (31, 3, 3, 'Laborable', '08:35:00'),
  (32, 3, 3, 'Laborable', '09:05:00'),
  (33, 3, 3, 'Laborable', '09:35:00'),
  (34, 3, 3, 'Laborable', '10:05:00'),
  (35, 3, 3, 'Laborable', '10:35:00'),
  (36, 4, 9, 'Laborable', '08:15:00'),
  (37, 4, 9, 'Laborable', '08:45:00'),
  (38, 4, 9, 'Laborable', '09:15:00'),
  (39, 4, 9, 'Laborable', '09:45:00'),
  (40, 4, 9, 'Laborable', '10:15:00'),
  (41, 4, 10, 'Laborable', '08:30:00'),
  (42, 4, 10, 'Laborable', '09:00:00'),
  (43, 4, 10, 'Laborable', '09:30:00'),
  (44, 4, 10, 'Laborable', '10:00:00'),
  (45, 4, 10, 'Laborable', '10:30:00'),
  (46, 1, 1, 'Sabado', '09:00:00'),
  (47, 1, 1, 'Sabado', '10:00:00'),
  (48, 1, 1, 'Sabado', '11:00:00'),
  (49, 2, 1, 'Sabado', '09:15:00'),
  (50, 2, 1, 'Sabado', '10:15:00'),
  (51, 2, 1, 'Sabado', '11:15:00')
ON DUPLICATE KEY UPDATE
  id_linea = VALUES(id_linea),
  id_parada = VALUES(id_parada),
  tipo_dia = VALUES(tipo_dia),
  hora = VALUES(hora);

INSERT INTO avisos_incidencias (id_aviso, id_usuario, id_parada, id_linea, tipo, titulo, descripcion, estado, fecha_creacion, activo)
VALUES
  (1, NULL, NULL, NULL, 'aviso', 'Servicio funcionando con normalidad', 'Actualmente no hay incidencias graves registradas en el servicio urbano.', 'resuelta', '2026-05-12 09:00:00', 1),
  (2, NULL, 4, 1, 'incidencia', 'Posibles demoras en Beni Enzar', 'La linea 1 puede registrar pequenas demoras por trafico en la zona de frontera.', 'en_revision', '2026-05-13 08:30:00', 1)
ON DUPLICATE KEY UPDATE
  id_usuario = VALUES(id_usuario),
  id_parada = VALUES(id_parada),
  id_linea = VALUES(id_linea),
  tipo = VALUES(tipo),
  titulo = VALUES(titulo),
  descripcion = VALUES(descripcion),
  estado = VALUES(estado),
  fecha_creacion = VALUES(fecha_creacion),
  activo = VALUES(activo);

INSERT INTO puntos_recarga (id_recarga, nombre, direccion, horario, latitud, longitud, activo)
VALUES
  (1, 'Estanco Plaza Espana', 'Plaza de Espana', 'Lunes a viernes de 09:00 a 14:00 y 17:00 a 20:00', 35.2917610, -2.9385360, 1),
  (2, 'Quiosco Avenida Juan Carlos I', 'Avenida Juan Carlos I', 'Lunes a sabado de 08:30 a 14:30', 35.2926400, -2.9394300, 1),
  (3, 'Punto de recarga Centro Comercial', 'Zona Centro Comercial', 'Horario comercial', 35.2903600, -2.9567500, 1)
ON DUPLICATE KEY UPDATE
  nombre = VALUES(nombre),
  direccion = VALUES(direccion),
  horario = VALUES(horario),
  latitud = VALUES(latitud),
  longitud = VALUES(longitud),
  activo = VALUES(activo);
