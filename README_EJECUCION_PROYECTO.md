# README de Ejecución del Proyecto

## Proyecto

**Libro de Clases Digital - Colegio Bernardo O'Higgins**

Este proyecto corresponde a una aplicación desarrollada con arquitectura de microservicios, orientada a la gestión académica de alumnos, notas, asistencia, usuarios, roles y control de acceso para apoderados.

La solución considera backend con Spring Boot, frontend web y persistencia en base de datos MySQL.

---

## Estructura general del proyecto

```txt
Proyecto Colegio-react
├── Backend-colegio
│   ├── auth-servise
│   ├── bff-colegio
│   ├── ms-notas
│   └── ms-asistencia
├── Frontend-colegio
├── documentacion
│   └── parcial3
└── repositorios.txt



Microservicios implementados
auth-servise

Microservicio encargado de la gestión de usuarios, autenticación básica, roles y relación entre apoderado y alumno.

Responsabilidades principales:

Registrar profesor.
Registrar apoderado.
Iniciar sesión.
Crear alumnos.
Crear apoderados.
Asociar apoderado con alumno.
Validar si un apoderado puede consultar la información de un alumno.

Puerto utilizado:

8081









ms-notas

Microservicio encargado de la gestión de calificaciones.

Responsabilidades principales:

Registrar notas.
Consultar notas por alumno.
Calcular promedio de notas por alumno.

Puerto utilizado:

8082







ms-asistencia

Microservicio encargado de la gestión de asistencia.

Responsabilidades principales:

Registrar asistencia.
Consultar asistencia por alumno.
Calcular resumen de asistencia.
Obtener porcentaje de asistencia.

Puerto utilizado:

8083








bff-colegio

Microservicio BFF, Backend For Frontend, encargado de centralizar la comunicación entre el frontend y los microservicios internos.

Responsabilidades principales:

Consultar notas desde ms-notas.
Consultar asistencia desde ms-asistencia.
Consolidar resumen académico.
Validar acceso del apoderado mediante auth-servise.
Bloquear consultas no autorizadas con HTTP 403 Forbidden.

Puerto utilizado:

8080


//----------------------------------------------------------------------------------------------------------------------------------------------------------------------


Base de datos

El proyecto utiliza MySQL como motor de base de datos.

Base de datos utilizada:

colegio_db

Tablas principales:

usuario
alumno_perfil
apoderado_alumno
nota
asistencia
curso
alumno



## La persistencia se realiza mediante Spring Data JPA.