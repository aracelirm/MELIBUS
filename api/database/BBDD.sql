CREATE DATABASE IF NOT EXISTS melibus
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_spanish_ci;

USE melibus;

CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  rol ENUM('usuario', 'admin') NOT NULL DEFAULT 'usuario',
  fecha_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  activo TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE lineas (
  id_linea INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  recorrido VARCHAR(255) NOT NULL,
  activa TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE paradas (
  id_parada INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  latitud DECIMAL(10, 7) NULL,
  longitud DECIMAL(10, 7) NULL,
  activa TINYINT(1) NOT NULL DEFAULT 1
);

CREATE TABLE lineas_paradas (
  id_linea INT NOT NULL,
  id_parada INT NOT NULL,
  orden INT NULL,
  PRIMARY KEY (id_linea, id_parada),
  FOREIGN KEY (id_linea) REFERENCES lineas(id_linea)
    ON DELETE CASCADE,
  FOREIGN KEY (id_parada) REFERENCES paradas(id_parada)
    ON DELETE CASCADE
);

CREATE TABLE horarios (
  id_horario INT AUTO_INCREMENT PRIMARY KEY,
  id_linea INT NOT NULL,
  id_parada INT NOT NULL,
  tipo_dia ENUM('Laborable', 'Sabado', 'Domingo/Festivo') NOT NULL DEFAULT 'Laborable',
  hora TIME NOT NULL,
  FOREIGN KEY (id_linea) REFERENCES lineas(id_linea)
    ON DELETE CASCADE,
  FOREIGN KEY (id_parada) REFERENCES paradas(id_parada)
    ON DELETE CASCADE
);

CREATE TABLE paradas_favoritas (
  id_usuario INT NOT NULL,
  id_parada INT NOT NULL,
  fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario, id_parada),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON DELETE CASCADE,
  FOREIGN KEY (id_parada) REFERENCES paradas(id_parada)
    ON DELETE CASCADE
);

CREATE TABLE avisos_incidencias (
  id_aviso INT AUTO_INCREMENT PRIMARY KEY,
  id_usuario INT NULL,
  id_parada INT NULL,
  id_linea INT NULL,
  tipo ENUM('aviso', 'incidencia') NOT NULL DEFAULT 'incidencia',
  titulo VARCHAR(150) NOT NULL,
  descripcion TEXT NOT NULL,
  estado ENUM('pendiente', 'en_revision', 'resuelta') NOT NULL DEFAULT 'pendiente',
  fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
    ON DELETE SET NULL,
  FOREIGN KEY (id_parada) REFERENCES paradas(id_parada)
    ON DELETE SET NULL,
  FOREIGN KEY (id_linea) REFERENCES lineas(id_linea)
    ON DELETE SET NULL
);

CREATE TABLE puntos_recarga (
  id_recarga INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  horario VARCHAR(150) NULL,
  latitud DECIMAL(10, 7) NULL,
  longitud DECIMAL(10, 7) NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1
);
