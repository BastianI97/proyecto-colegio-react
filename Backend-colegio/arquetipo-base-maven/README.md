# Arquetipo Base Maven - Spring Boot

## Descripción
Base Maven utilizada como referencia para construir los componentes backend del sistema Libro de Clases Digital.

Esta base fue utilizada para generar componentes backend independientes con Spring Boot, Maven y Java 17, manteniendo una estructura común y coherente entre BFF y microservicios.

## Componentes generados a partir de esta base
- bff-colegio
- ms-notas
- ms-asistencia

## Tecnología base
- Java 17
- Maven
- Spring Boot 3.5.3
- Spring Web
- Spring Data JPA
- Spring Validation
- Spring Security, en microservicios que exponen endpoints protegibles
- MySQL
- JUnit 5
- Mockito

## Estructura estándar

nombre-componente/
- pom.xml
- mvnw
- mvnw.cmd
- src/main/java
- src/main/resources/application.properties
- src/test/java
- README.md

## Estructura de paquetes sugerida para microservicios

com.colegio.nombrecomponente/
- controller
- service
- repository
- entity
- config

## Estructura de paquetes sugerida para BFF

com.colegio.bff/
- controller
- service
- config

## Pasos para crear un nuevo componente backend

1. Copiar la base Maven existente.
2. Cambiar el artifactId en pom.xml.
3. Cambiar el name y description del proyecto.
4. Definir el puerto en application.properties.
5. Crear la clase principal con @SpringBootApplication.
6. Crear paquetes controller, service, repository, entity y config, si corresponde.
7. Crear endpoints REST según el módulo.
8. Crear pruebas unitarias.
9. Ejecutar ./mvnw.cmd clean test.
10. Documentar el componente en README.md.

## Justificación
El uso de una base Maven común permite mantener coherencia entre los componentes backend, facilita la creación de nuevos servicios y ayuda a sostener una estructura mantenible y escalable.
