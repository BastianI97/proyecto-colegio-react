CREATE DATABASE colegio_db;
USE colegio_db;
SHOW DATABASES;
SHOW TABLES;

USE colegio_db;
INSERT INTO curso (nombre, nivel, seccion, anio_escolar)
VALUES ('5° Basico B', 'Basica', 'B', '2026');

SELECT *
FROM curso;


-- No actualizar bdd hasta obtener resultados de conecciones de microsevicios en dashboard 