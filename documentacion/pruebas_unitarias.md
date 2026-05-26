# Pruebas Unitarias del Proyecto

## Proyecto
Libro de Clases Digital - Colegio Bernardo O'Higgins.

## Objetivo

El objetivo de las pruebas unitarias es validar que los componentes principales del backend funcionen correctamente de forma aislada, especialmente la lógica de negocio y los endpoints REST de los microservicios de notas y asistencia.

## Microservicio de Notas

Ruta del componente:

Backend-colegio/ms-notas

### NotaServiceTest

Esta prueba valida la lógica interna del microservicio de notas.

Comprueba que el sistema calcule correctamente el promedio de notas de un alumno y que retorne 0.0 cuando el alumno no tiene notas registradas.

Clase evaluada:

com.colegio.notas.service.NotaService

### NotaControllerTest

Esta prueba valida los endpoints REST del microservicio de notas.

Comprueba que el endpoint de creación de notas responda correctamente y que el endpoint de promedio por alumno retorne una respuesta exitosa.

Clase evaluada:

com.colegio.notas.controller.NotaController

### Resultado obtenido

Se ejecutaron 4 pruebas en el microservicio de notas:

- 2 pruebas de servicio.
- 2 pruebas de controlador.

Resultado:

Tests run: 4, Failures: 0, Errors: 0, Skipped: 0

BUILD SUCCESS

## Microservicio de Asistencia

Ruta del componente:

Backend-colegio/ms-asistencia

### AsistenciaServiceTest

Esta prueba valida la lógica interna del microservicio de asistencia.

Comprueba que el porcentaje de asistencia se calcule correctamente según los registros presentes y ausentes de un alumno.

Clase evaluada:

com.colegio.asistencia.service.AsistenciaService

### AsistenciaControllerTest

Esta prueba valida los endpoints REST del microservicio de asistencia.

Comprueba que el endpoint de creación de asistencia responda correctamente y que el endpoint de resumen por alumno entregue presentes, ausentes y porcentaje de asistencia.

Clase evaluada:

com.colegio.asistencia.controller.AsistenciaController

### Resultado obtenido

Se ejecutaron 4 pruebas en el microservicio de asistencia:

- 2 pruebas de servicio.
- 2 pruebas de controlador.

Resultado:

Tests run: 4, Failures: 0, Errors: 0, Skipped: 0

BUILD SUCCESS

## Backend For Frontend

Ruta del componente:

Backend-colegio/bff-colegio

### AlumnoResumenServiceTest

Esta prueba valida que el BFF pueda integrar respuestas simuladas de los microservicios de notas y asistencia.

Comprueba que el resumen académico del alumno incluya:

- alumnoId.
- notas.
- promedio.
- asistencia.

Clase evaluada:

com.colegio.bff.service.AlumnoResumenService

## Comandos utilizados

Para ejecutar pruebas del microservicio de notas:

cd Backend-colegio/ms-notas
./mvnw.cmd clean test

Para ejecutar pruebas del microservicio de asistencia:

cd Backend-colegio/ms-asistencia
./mvnw.cmd clean test

Para ejecutar pruebas del BFF:

cd Backend-colegio/bff-colegio
./mvnw.cmd clean test

## Conclusión

Las pruebas unitarias permiten respaldar que los microservicios principales del proyecto funcionan correctamente. Se validó tanto la lógica de negocio como los endpoints REST principales de notas y asistencia, obteniendo resultados exitosos sin errores ni fallas.
