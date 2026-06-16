# Diagrama de Arquitectura de Microservicios

## Proyecto

Libro de Clases Digital - Colegio Bernardo O'Higgins.

## Descripción

El diagrama representa la arquitectura de microservicios utilizada en el proyecto. La solución se compone de un frontend desarrollado con React y Vite, un Backend For Frontend desarrollado con Spring Boot y dos microservicios backend independientes: ms-notas y ms-asistencia.

## Componentes

### Frontend

El componente Frontend-colegio se ejecuta en el puerto 5173 y entrega la interfaz visual para los usuarios del sistema.

### Backend For Frontend

El componente bff-colegio se ejecuta en el puerto 8080. Su función es recibir solicitudes desde el frontend y coordinar la comunicación con los microservicios necesarios.

### Microservicio de Notas

El componente ms-notas se ejecuta en el puerto 8082. Gestiona la información de calificaciones y promedio del alumno. Utiliza Spring Boot, Spring Data JPA y MySQL para persistencia.

### Microservicio de Asistencia

El componente ms-asistencia se ejecuta en el puerto 8083. Gestiona los registros de asistencia y el cálculo del porcentaje de asistencia del alumno. Utiliza Spring Boot, Spring Data JPA y MySQL para persistencia.

## Flujo de comunicación

El frontend no consume directamente los microservicios. Primero se comunica con el BFF mediante API REST. Luego el BFF consulta los microservicios de notas y asistencia, consolida la información y devuelve una respuesta única al frontend.

## Endpoint principal de integración

GET http://localhost:8080/api/bff/alumnos/1/resumen

## Persistencia

La persistencia se implementa mediante MySQL y Spring Data JPA. Cada microservicio mantiene su propia responsabilidad de datos, evitando que el frontend acceda directamente a la base de datos.
