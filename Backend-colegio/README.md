# Backend Colegio Bernardo O'Higgins

## Descripción
Backend del sistema Libro de Clases Digital del Colegio Bernardo O'Higgins.

El backend está organizado en componentes independientes desarrollados con Java 17, Spring Boot y Maven.

## Componentes backend

### auth-servise
Servicio base existente del proyecto. Contiene la estructura inicial de backend, conexión a MySQL y gestión académica básica como cursos y alumnos.

Puerto:
8081

### bff-colegio
Backend For Frontend. Centraliza la comunicación entre el frontend y los microservicios.

Puerto:
8080

### ms-notas
Microservicio encargado de la gestión de calificaciones y cálculo de promedios.

Puerto:
8082

### ms-asistencia
Microservicio encargado de la gestión de asistencia y cálculo de resumen de asistencia.

Puerto:
8083

## Arquitectura
La solución backend utiliza:

- Arquitectura de microservicios.
- Patrón Backend For Frontend.
- Arquitectura en capas: controller, service, repository, entity y config.
- Persistencia con Spring Data JPA.
- Base de datos MySQL.
- Pruebas unitarias con JUnit y Mockito.

## Ejecución de pruebas

Desde cada componente:

./mvnw.cmd clean test

## Ejecución de servicios

BFF:
cd bff-colegio
./mvnw.cmd spring-boot:run

Microservicio de notas:
cd ms-notas
./mvnw.cmd spring-boot:run

Microservicio de asistencia:
cd ms-asistencia
./mvnw.cmd spring-boot:run

Servicio base:
cd auth-servise
./mvnw.cmd spring-boot:run
