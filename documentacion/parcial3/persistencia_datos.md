# Persistencia de Datos - Parcial 3

## Proyecto

Libro de Clases Digital - Colegio Bernardo O'Higgins.

## Objetivo

Este documento explica cómo se implementa la persistencia de datos en la arquitectura de microservicios del proyecto, utilizando Spring Boot, Spring Data JPA y MySQL.

## Enfoque de persistencia

La persistencia de datos se implementa mediante JPA, utilizando Spring Data JPA como capa de acceso a datos y MySQL como motor de base de datos relacional.

Cada microservicio mantiene sus propias entidades, repositorios y lógica de negocio, evitando que el frontend acceda directamente a la base de datos.

## Componentes con persistencia

### Microservicio de Notas

Nombre del componente:

ms-notas

Ruta:

Backend-colegio/ms-notas

Responsabilidad:

Gestionar las calificaciones de los alumnos y calcular el promedio general por alumno.

Tecnologías utilizadas:

- Spring Boot
- Spring Data JPA
- MySQL
- Maven

Capas principales:

- Controller: expone los endpoints REST de notas.
- Service: contiene la lógica de negocio para registrar notas y calcular promedios.
- Repository: comunica el microservicio con la base de datos mediante Spring Data JPA.
- Entity: representa la tabla de notas.

Entidad principal:

Nota

Campos principales:

- id
- alumnoId
- asignatura
- calificacion
- fechaRegistro

Endpoints principales:

- POST /api/notas
- GET /api/notas/alumno/{alumnoId}
- GET /api/notas/alumno/{alumnoId}/promedio

### Microservicio de Asistencia

Nombre del componente:

ms-asistencia

Ruta:

Backend-colegio/ms-asistencia

Responsabilidad:

Gestionar los registros de asistencia de los alumnos y calcular el porcentaje de asistencia.

Tecnologías utilizadas:

- Spring Boot
- Spring Data JPA
- MySQL
- Maven

Capas principales:

- Controller: expone los endpoints REST de asistencia.
- Service: contiene la lógica de negocio para registrar asistencia y calcular porcentajes.
- Repository: comunica el microservicio con la base de datos mediante Spring Data JPA.
- Entity: representa la tabla de asistencia.

Entidad principal:

Asistencia

Campos principales:

- id
- alumnoId
- fecha
- estado
- observacion

Endpoints principales:

- POST /api/asistencias
- GET /api/asistencias/alumno/{alumnoId}
- GET /api/asistencias/alumno/{alumnoId}/resumen

## Configuración de base de datos

Cada microservicio contiene su configuración en el archivo:

src/main/resources/application.properties

Ejemplo general:

spring.datasource.url=jdbc:mysql://localhost:3306/colegio_db
spring.datasource.username=root
spring.datasource.password=CAMBIAR_SEGUN_MYSQL_LOCAL
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

## Uso de ddl-auto=update

La propiedad:

spring.jpa.hibernate.ddl-auto=update

permite que Hibernate cree o actualice automáticamente las tablas necesarias según las entidades definidas en el código Java.

Esto facilita la ejecución local del proyecto, ya que las tablas de notas y asistencia pueden generarse a partir de las clases Entity.

## Flujo de persistencia

El flujo general de persistencia es el siguiente:

1. El usuario interactúa con el frontend.
2. El frontend envía una solicitud REST al BFF.
3. El BFF consulta los microservicios correspondientes.
4. Cada microservicio ejecuta su lógica de negocio.
5. El Repository accede a la base de datos mediante JPA.
6. MySQL almacena o recupera la información.
7. La respuesta vuelve al frontend en formato JSON.

## Relación con el BFF

El BFF no administra directamente la persistencia de datos. Su responsabilidad es coordinar las solicitudes del frontend y consultar los microservicios.

Ejemplo:

GET http://localhost:8080/api/bff/alumnos/1/resumen

Este endpoint consolida información proveniente de:

- ms-notas
- ms-asistencia

## Ventajas del enfoque aplicado

- Separación de responsabilidades.
- Acceso a datos centralizado dentro de cada microservicio.
- Reducción del acoplamiento entre frontend y base de datos.
- Mayor mantenibilidad del código.
- Facilidad para probar cada microservicio de forma independiente.
- Posibilidad de escalar los microservicios por separado en futuras versiones.

## Consideración sobre procedimientos almacenados

En esta implementación la persistencia se realiza principalmente mediante JPA y Spring Data JPA. No se implementaron procedimientos almacenados como mecanismo principal, ya que la lógica de cálculo de promedio y porcentaje de asistencia se encuentra implementada en la capa Service de cada microservicio.

## Conclusión

La persistencia de datos del proyecto se garantiza mediante el uso de entidades JPA, repositorios Spring Data JPA y una base de datos MySQL. Esta estructura permite que los microservicios de notas y asistencia gestionen su propia información de manera independiente, manteniendo una arquitectura ordenada, modular y alineada con el enfoque de microservicios.
