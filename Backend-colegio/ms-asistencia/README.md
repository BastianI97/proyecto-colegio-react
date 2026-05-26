# Microservicio de Asistencia

## Descripción
Microservicio backend encargado de la gestión de asistencia del sistema Libro de Clases Digital del Colegio Bernardo O'Higgins.

Este componente permite registrar, consultar, actualizar y eliminar registros de asistencia de estudiantes. También permite obtener un resumen de asistencia por alumno, incluyendo presentes, ausentes y porcentaje de asistencia.

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
Este microservicio utiliza arquitectura en capas:

- Controller: expone los endpoints REST.
- Service: contiene la lógica de negocio.
- Repository: gestiona el acceso a datos mediante Spring Data JPA.
- Entity: representa la tabla de asistencia en la base de datos.

## Puerto de ejecución

8083

## Endpoints principales
- POST /api/asistencias
- GET /api/asistencias
- GET /api/asistencias/{id}
- GET /api/asistencias/alumno/{alumnoId}
- GET /api/asistencias/alumno/{alumnoId}/fecha/{fecha}
- GET /api/asistencias/alumno/{alumnoId}/resumen
- PUT /api/asistencias/{id}
- DELETE /api/asistencias/{id}

## Ejemplo de JSON
{
  "alumnoId": 1,
  "fecha": "2026-05-25",
  "estado": "PRESENTE",
  "observacion": "Asiste a clases"
}

## Ejecución
Desde la carpeta del microservicio:

./mvnw.cmd spring-boot:run

## Pruebas
./mvnw.cmd clean test

## Rol dentro de la arquitectura
Este microservicio separa la gestión de asistencia del resto del sistema, permitiendo mantener, probar y escalar esta funcionalidad de forma independiente.
