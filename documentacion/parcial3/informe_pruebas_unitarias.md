# Informe de Pruebas Unitarias - Parcial 3

## Proyecto

Libro de Clases Digital - Colegio Bernardo O'Higgins.

## Objetivo

El objetivo de las pruebas unitarias es validar el correcto funcionamiento de los componentes backend del sistema, asegurando que la lógica principal de los microservicios y del BFF responda correctamente antes de integrarse con el frontend.

## Herramientas utilizadas

- JUnit 5
- Mockito
- MockMvc
- Maven
- JaCoCo

## Componentes evaluados

Se ejecutaron pruebas unitarias sobre los siguientes componentes:

- ms-notas
- ms-asistencia
- bff-colegio

## Microservicio de Notas

Ruta:

Backend-colegio/ms-notas

Comando utilizado:

./mvnw.cmd clean test

Pruebas implementadas:

- NotaServiceTest
- NotaControllerTest

Cobertura obtenida:

- Cobertura total: 98%
- Service: 97%
- Controller: 100%
- Cobertura de ramas: 66%

Descripción:

Las pruebas del microservicio de notas validan la creación, listado, búsqueda, actualización y eliminación de notas. También verifican el cálculo del promedio por alumno y el caso en que no existen notas registradas.

## Microservicio de Asistencia

Ruta:

Backend-colegio/ms-asistencia

Comando utilizado:

./mvnw.cmd clean test

Pruebas implementadas:

- AsistenciaServiceTest
- AsistenciaControllerTest

Cobertura obtenida:

- Cobertura total: 98%
- Service: 97%
- Controller: 100%
- Cobertura de ramas: 75%

Descripción:

Las pruebas del microservicio de asistencia validan la creación, listado, búsqueda, actualización y eliminación de registros de asistencia. También verifican el cálculo de presentes, ausentes y porcentaje de asistencia por alumno.

## Backend For Frontend

Ruta:

Backend-colegio/bff-colegio

Comando utilizado:

./mvnw.cmd clean test

Pruebas implementadas:

- AlumnoResumenServiceTest
- AlumnoResumenControllerTest

Cobertura obtenida:

- Cobertura total: 88%
- Service: 82%
- Controller: 100%

Descripción:

Las pruebas del BFF validan que el componente pueda exponer endpoints REST para consultar notas, promedio, asistencia, resumen de asistencia y resumen académico consolidado. El BFF cumple el rol de intermediario entre el frontend y los microservicios.

## Reportes de cobertura

Los reportes JaCoCo se generan en las siguientes rutas:

Backend-colegio/ms-notas/target/site/jacoco/index.html

Backend-colegio/ms-asistencia/target/site/jacoco/index.html

Backend-colegio/bff-colegio/target/site/jacoco/index.html

## Resultado general

Los tres componentes principales superan la cobertura mínima solicitada:

- ms-notas: 98%
- ms-asistencia: 98%
- bff-colegio: 88%

## Conclusión

Las pruebas unitarias permiten validar la lógica principal del sistema y respaldan la calidad de la integración entre microservicios. Los resultados obtenidos demuestran que los componentes backend principales cumplen con la cobertura mínima requerida y mantienen una estructura de pruebas organizada por componente.



//Agregado

---

## Pruebas unitarias auth-servise

Se incorporaron pruebas unitarias al microservicio `auth-servise`, encargado de la gestión de usuarios, roles, login y asociación entre apoderado y alumno.

### Clases probadas

- `AuthServiceTest`
- `GestionAcademicaServiceTest`
- `AuthControllerTest`

### Funcionalidades validadas

- Registro de profesor.
- Registro de apoderado.
- Inicio de sesión.
- Validación de credenciales incorrectas.
- Creación de alumnos.
- Listado de alumnos.
- Búsqueda de alumno por id.
- Listado de apoderados.
- Asociación entre apoderado y alumno.
- Validación de acceso del apoderado a un alumno.
- Pruebas de endpoints principales del controlador de autenticación.

### Resultado de ejecución

Las pruebas fueron ejecutadas mediante Maven con el siguiente comando:

```bash
./mvnw.cmd clean test---

## Pruebas unitarias auth-servise

Se incorporaron pruebas unitarias al microservicio `auth-servise`, encargado de la gestión de usuarios, roles, login y asociación entre apoderado y alumno.

### Clases probadas

- `AuthServiceTest`
- `GestionAcademicaServiceTest`
- `AuthControllerTest`

### Funcionalidades validadas

- Registro de profesor.
- Registro de apoderado.
- Inicio de sesión.
- Validación de credenciales incorrectas.
- Creación de alumnos.
- Listado de alumnos.
- Búsqueda de alumno por id.
- Listado de apoderados.
- Asociación entre apoderado y alumno.
- Validación de acceso del apoderado a un alumno.
- Pruebas de endpoints principales del controlador de autenticación.

### Resultado de ejecución

Las pruebas fueron ejecutadas mediante Maven con el siguiente comando:

```bash
./mvnw.cmd clean test



El resultado obtenido fue:
BUILD SUCCESS

El reporte JaCoCo del microservicio auth-servise entregó los siguientes resultados:

Cobertura total: 65%
Cobertura service: 82%
Cobertura controller: 31%
Cobertura branches: 100%
Conclusión

Con esta incorporación, el microservicio auth-servise cumple con la cobertura mínima esperada para la evaluación, superando el 60% de cobertura total. Además, se valida automáticamente la lógica crítica de autenticación, roles, creación de alumnos, creación de apoderados y control de acceso.