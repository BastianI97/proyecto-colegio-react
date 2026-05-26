# Microservicio de Notas

## Descripción
Microservicio backend encargado de la gestión de calificaciones del sistema Libro de Clases Digital del Colegio Bernardo O'Higgins.

Este componente permite registrar, consultar, actualizar y eliminar notas de estudiantes. También permite consultar notas por alumno y calcular el promedio general de un alumno.

## Tecnología utilizada
- Java 17
- Spring Boot 3.5.3
- Maven
- Spring Web
- Spring Data JPA
- Spring Validation
- Spring Security
- MySQL
- JUnit 5
- Mockito

## Patrón arquitectónico
Este microservicio utiliza una arquitectura en capas:

- Controller: expone los endpoints REST.
- Service: contiene la lógica de negocio.
- Repository: gestiona el acceso a datos mediante Spring Data JPA.
- Entity: representa las tablas de la base de datos.

## Puerto de ejecución
```txt
8082
