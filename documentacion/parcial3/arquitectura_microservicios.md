# Arquitectura de Microservicios - Parcial 3

## Proyecto

Libro de Clases Digital - Colegio Bernardo O'Higgins.

## Objetivo de la arquitectura

La solución utiliza una arquitectura de microservicios para separar responsabilidades del sistema académico, permitiendo que cada componente cumpla una función específica y pueda mantenerse de forma independiente.

## Componentes principales

### Frontend

- Nombre: Frontend-colegio
- Tecnología: React + Vite
- Puerto: 5173
- Responsabilidad: Interfaz de usuario para alumnos, profesores y apoderados.

### Backend For Frontend

- Nombre: bff-colegio
- Tecnología: Spring Boot + Maven
- Puerto: 8080
- Responsabilidad: Centralizar las solicitudes del frontend y consultar los microservicios necesarios.

### Microservicio de Notas

- Nombre: ms-notas
- Tecnología: Spring Boot + Maven + JPA + MySQL
- Puerto: 8082
- Responsabilidad: Gestionar notas, calificaciones y promedio del alumno.

### Microservicio de Asistencia

- Nombre: ms-asistencia
- Tecnología: Spring Boot + Maven + JPA + MySQL
- Puerto: 8083
- Responsabilidad: Gestionar registros de asistencia y calcular porcentaje de asistencia del alumno.

### Base de datos

- Motor: MySQL
- Persistencia: JPA / Spring Data JPA
- Cada microservicio gestiona sus propias entidades y repositorios.

## Flujo de comunicación

Frontend React
    ↓
BFF - bff-colegio
    ↓
ms-notas / ms-asistencia
    ↓
MySQL

## Endpoint principal de integración

GET http://localhost:8080/api/bff/alumnos/1/resumen

Este endpoint consolida información proveniente de los microservicios de notas y asistencia.

## Justificación

La arquitectura permite separar responsabilidades, mejorar la mantenibilidad del sistema y facilitar la escalabilidad futura. El frontend no consume directamente todos los microservicios, sino que se comunica con el BFF, lo que simplifica la integración y reduce el acoplamiento.
