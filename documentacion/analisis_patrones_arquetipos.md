# Análisis de Patrones, Arquetipos y Arquitectura

## Proyecto
Libro de Clases Digital - Colegio Bernardo O'Higgins.

## Objetivo general
El proyecto busca implementar una plataforma web de libro de clases digital, permitiendo la consulta y gestión de información académica como cursos, alumnos, notas, asistencia, horarios y paneles personalizados según el rol del usuario.

## Arquitectura general
La solución se organiza en componentes frontend y backend.

### Frontend
El frontend está desarrollado con React/Vite y se encuentra en la carpeta Frontend-colegio. Incluye vistas diferenciadas para profesor, alumno y apoderado.

### Backend
El backend se organiza mediante componentes independientes desarrollados con Spring Boot y Maven:

- auth-servise: backend base existente para gestión académica inicial.
- ms-notas: microservicio encargado de la gestión de calificaciones.
- ms-asistencia: microservicio encargado de la gestión de asistencia.
- bff-colegio: Backend For Frontend encargado de integrar las respuestas de los microservicios para el frontend.

## Patrón arquitectónico: Microservicios
Se utiliza una arquitectura basada en microservicios para separar responsabilidades funcionales.

### Microservicio de Notas
El microservicio ms-notas administra las calificaciones de los estudiantes. Permite crear, listar, consultar, actualizar y eliminar notas. También calcula el promedio de un alumno.

### Microservicio de Asistencia
El microservicio ms-asistencia administra los registros de asistencia. Permite crear, listar, consultar, actualizar y eliminar asistencias. También entrega un resumen con presentes, ausentes y porcentaje de asistencia.

### Justificación
La separación en microservicios permite mantener cada módulo de forma independiente, facilita las pruebas unitarias y permite escalar componentes específicos según la demanda. Por ejemplo, en periodos de cierre académico el módulo de notas puede recibir mayor carga, mientras que asistencia puede operar de forma independiente.

## Patrón arquitectónico: Backend For Frontend
El componente bff-colegio implementa el patrón Backend For Frontend.

### Rol del BFF
El BFF actúa como intermediario entre el frontend y los microservicios. Su función es simplificar las llamadas desde la interfaz de usuario y centralizar la integración de información académica.

### Ejemplo
El frontend puede solicitar el resumen académico de un alumno a un solo endpoint del BFF. Luego, el BFF consulta internamente el microservicio de notas y el microservicio de asistencia para construir una respuesta consolidada.

## Arquetipo o base Maven utilizada
Los componentes backend fueron creados usando una base Maven con Spring Boot 3.5.3 y Java 17.

Cada componente mantiene una estructura estándar de proyecto Maven:

- pom.xml
- src/main/java
- src/main/resources
- src/test/java
- mvnw
- mvnw.cmd

## Estructura en capas
Los microservicios se organizan bajo una arquitectura en capas:

### Controller
Expone los endpoints REST que serán consumidos por el BFF o por herramientas de prueba como Postman.

### Service
Contiene la lógica de negocio del componente.

### Repository
Gestiona el acceso a datos usando Spring Data JPA.

### Entity
Representa las tablas de la base de datos mediante entidades JPA.

### Config
Centraliza configuraciones específicas del componente, por ejemplo seguridad o beans necesarios para el funcionamiento.

## Patrones de diseño aplicados

### 1. Patrón MVC
Se aplica mediante la separación entre controladores, servicios, entidades y repositorios. Esto mejora la organización del código y facilita su mantenimiento.

### 2. Patrón Repository
Se utiliza Spring Data JPA para encapsular el acceso a datos. Esto evita que la lógica de negocio dependa directamente de consultas SQL o detalles de persistencia.

### 3. Patrón Service Layer
La lógica de negocio se concentra en clases de servicio, evitando que los controladores contengan reglas del dominio. Esto permite probar la lógica de forma más simple mediante pruebas unitarias.

### 4. Patrón BFF
El BFF centraliza la comunicación entre el frontend y los microservicios, reduciendo el acoplamiento entre la interfaz y los servicios internos.

## Buenas prácticas implementadas
- Separación de responsabilidades por capas.
- Uso de Maven para gestión de dependencias.
- Uso de Spring Boot para estructura backend.
- Uso de Spring Data JPA para persistencia.
- Uso de validaciones con Jakarta Validation.
- Pruebas unitarias con JUnit y Mockito.
- Puertos separados por componente.
- README individual para BFF y microservicios.

## Puertos utilizados
- bff-colegio: 8080
- auth-servise: 8081
- ms-notas: 8082
- ms-asistencia: 8083

## Conclusión
La arquitectura implementada permite cumplir con una solución modular y mantenible, separando el frontend, el BFF y los microservicios principales. Esta organización facilita la escalabilidad, el mantenimiento, la ejecución de pruebas y la defensa técnica del proyecto.
