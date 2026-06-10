# API REST - Parcial 3

## Proyecto

Libro de Clases Digital - Colegio Bernardo O'Higgins.

## Objetivo

Este documento describe los endpoints principales utilizados para probar la integración entre el frontend, el BFF, los microservicios y la persistencia de datos.

## Herramienta utilizada

Se incluye una colección Postman en la siguiente ruta:

documentacion/parcial3/postman/LibroClasesDigital_Parcial3.postman_collection.json

## Servicios requeridos

Antes de probar la colección, deben estar levantados los siguientes servicios:

- ms-notas: http://localhost:8082
- ms-asistencia: http://localhost:8083
- bff-colegio: http://localhost:8080

## Endpoints del BFF

### Obtener resumen del alumno

Método:

GET

URL:

http://localhost:8080/api/bff/alumnos/1/resumen

Descripción:

Obtiene un resumen consolidado del alumno, integrando información desde los microservicios de notas y asistencia.

Ejemplo de respuesta esperada:

{
  "alumnoId": 1,
  "promedio": 6.5,
  "porcentajeAsistencia": 100.0
}

## Endpoints del microservicio de notas

### Crear nota

Método:

POST

URL:

http://localhost:8082/api/notas

Body:

{
  "alumnoId": 1,
  "asignatura": "Matemáticas",
  "calificacion": 6.5
}

Descripción:

Registra una calificación para el alumno indicado.

### Listar notas por alumno

Método:

GET

URL:

http://localhost:8082/api/notas/alumno/1

Descripción:

Lista las notas registradas para el alumno 1.

### Obtener promedio por alumno

Método:

GET

URL:

http://localhost:8082/api/notas/alumno/1/promedio

Descripción:

Calcula el promedio de notas del alumno 1.

Ejemplo de respuesta esperada:

6.5

## Endpoints del microservicio de asistencia

### Crear asistencia

Método:

POST

URL:

http://localhost:8083/api/asistencias

Body:

{
  "alumnoId": 1,
  "fecha": "2026-05-25",
  "estado": "PRESENTE",
  "observacion": "Asiste a clases"
}

Descripción:

Registra una asistencia para el alumno indicado.

### Obtener resumen de asistencia por alumno

Método:

GET

URL:

http://localhost:8083/api/asistencias/alumno/1/resumen

Descripción:

Consulta el total de presentes, ausentes y el porcentaje de asistencia del alumno.

Ejemplo de respuesta esperada:

{
  "alumnoId": 1,
  "presentes": 1,
  "ausentes": 0,
  "porcentajeAsistencia": 100.0
}

## Flujo de prueba recomendado

1. Levantar ms-notas.
2. Levantar ms-asistencia.
3. Levantar bff-colegio.
4. Crear una nota mediante POST /api/notas.
5. Crear una asistencia mediante POST /api/asistencias.
6. Consultar el resumen del alumno desde el BFF.
7. Verificar que el frontend muestre los datos obtenidos desde el backend.

## Conclusión

La colección Postman permite validar la comunicación REST entre los componentes backend del sistema y comprobar que los datos persistidos por los microservicios pueden ser consultados desde el BFF.
