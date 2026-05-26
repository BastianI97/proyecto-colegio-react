# Arquetipo Base Maven Colegio

## Descripción

Arquetipo Maven formal utilizado para generar microservicios Spring Boot base del sistema Libro de Clases Digital del Colegio Bernardo O'Higgins.

Este arquetipo permite crear un proyecto backend con estructura inicial, dependencias Maven, clase principal, controller, service, configuración de seguridad, archivo application.properties y prueba unitaria base.

## Tecnología base

- Java 17
- Maven
- Spring Boot 3.5.3
- Spring Web
- Spring Validation
- Spring Security
- JUnit 5

## Estructura del arquetipo

arquetipo-base-maven/
- pom.xml
- src/main/resources/META-INF/maven/archetype-metadata.xml
- src/main/resources/archetype-resources/
  - pom.xml
  - README.md
  - src/main/java/
  - src/main/resources/application.properties
  - src/test/java/

## Estructura generada

El arquetipo genera un microservicio con la siguiente estructura:

- controller
- service
- config
- resources
- test

## Instalación local del arquetipo

Desde la carpeta del arquetipo:

mvn clean install

## Generación de un microservicio de ejemplo

Desde la carpeta del arquetipo, se puede generar un proyecto de ejemplo con:

mvn archetype:generate \
  -DarchetypeGroupId=com.colegio \
  -DarchetypeArtifactId=arquetipo-base-maven \
  -DarchetypeVersion=1.0.0 \
  -DgroupId=com.colegio \
  -DartifactId=ms-ejemplo \
  -Dversion=0.0.1-SNAPSHOT \
  -Dpackage=com.colegio.ejemplo \
  -DinteractiveMode=false

## Endpoint generado

El microservicio generado incluye el endpoint:

GET /api/health

## Prueba unitaria generada

El arquetipo genera una prueba unitaria base para validar la clase de servicio inicial.

## Justificación

Este arquetipo permite estandarizar la creación de nuevos microservicios del proyecto, manteniendo una estructura común, dependencias coherentes y una base mínima de prueba.
