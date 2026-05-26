# BFF Colegio

## Descripción
Backend For Frontend del sistema Libro de Clases Digital del Colegio Bernardo O'Higgins.

Este componente actúa como intermediario entre el frontend y los microservicios de backend. Su objetivo es simplificar la comunicación del cliente, centralizando las llamadas hacia los servicios de notas y asistencia.

## Tecnología utilizada
- Java 17
- Spring Boot 3.5.3
- Maven
- Spring Web
- Spring Validation
- JUnit 5
- Mockito
- RestTemplate

## Patrón arquitectónico
Este componente implementa el patrón Backend For Frontend.

El BFF permite que el frontend consuma una API más simple, sin tener que comunicarse directamente con cada microservicio. Así se reduce el acoplamiento entre la interfaz de usuario y los servicios internos.

## Puerto de ejecución
8080

## Microservicios integrados
- ms-notas: http://localhost:8082/api/notas
- ms-asistencia: http://localhost:8083/api/asistencias

## Endpoints principales
- GET /api/bff/alumnos/{alumnoId}/notas
- GET /api/bff/alumnos/{alumnoId}/promedio
- GET /api/bff/alumnos/{alumnoId}/asistencia
- GET /api/bff/alumnos/{alumnoId}/resumen-asistencia
- GET /api/bff/alumnos/{alumnoId}/resumen

## Ejecución
Desde la carpeta del BFF:

./mvnw.cmd spring-boot:run

## Pruebas
./mvnw.cmd clean test

## Rol dentro de la arquitectura
El BFF centraliza la comunicación entre el frontend y los microservicios. Por ejemplo, el frontend puede consultar el resumen académico de un alumno desde un solo endpoint, y el BFF se encarga de consultar internamente las notas, el promedio y la asistencia.
