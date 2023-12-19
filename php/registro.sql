CREATE DATABASE IF NOT EXISTS records;
USE records;

CREATE TABLE IF NOT EXISTS registro (
  nombre varchar(255) NOT NULL,
  apellidos varchar(255) NOT NULL,
  nivel varchar(255) NOT NULL,
  tiempo time NOT NULL
);