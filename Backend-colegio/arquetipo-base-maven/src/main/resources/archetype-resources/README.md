# ${artifactId}

## Descripción

Microservicio generado desde el arquetipo Maven base del sistema Libro de Clases Digital.

## Tecnología utilizada

- Java 17
- Spring Boot 3.5.3
- Maven
- Spring Web
- Spring Validation
- Spring Security
- JUnit 5

## Estructura

- controller: expone endpoints REST.
- service: contiene lógica de negocio.
- config: contiene configuraciones del microservicio.
- resources: contiene configuración de aplicación.
- test: contiene pruebas unitarias.

## Endpoint de prueba

GET /api/health

## Ejecución

mvn spring-boot:run

## Pruebas

mvn clean test
