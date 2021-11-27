CREATE DATABASE cartoon_pizza_frutas;
USE cartoon_pizza_frutas;
CREATE TABLE admin(
  id INT AUTO_INCREMENT NOT NULL,
  usuario VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE reserva(
  id INT AUTO_INCREMENT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  correo VARCHAR(200) NOT NULL,
  telefono VARCHAR(70) NOT NULL,
  numero_personas TINYINT NOT NULL,
  servicio VARCHAR(100) NOT NULL,
  fecha VARCHAR(70) NOT NULL,
  hora VARCHAR(60) NOT NULL,
  indicacion_especial VARCHAR(200),
  PRIMARY KEY (id)
);
CREATE TABLE comentarios(
  id INT AUTO_INCREMENT NOT NULL,
  asunto VARCHAR(100) NOT NULL,
  nombre_completo VARCHAR(150) NOT NULL,
  correo VARCHAR(100) NOT NULL,
  mensaje VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE personal(
  id INT AUTO_INCREMENT NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  cargo VARCHAR(50) NOT NULL,
  imagen_url TEXT NOT NULL,
  PRIMARY KEY (id)
);