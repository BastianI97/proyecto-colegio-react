# Roles y Control de Acceso del Apoderado

**Parcial 3 - Libro de Clases Digital**  
**Colegio Bernardo O'Higgins**

## Estado

Implementación funcional validada: registro/login, roles PROFESOR y APODERADO, asociación apoderado-alumno, consulta filtrada por BFF y bloqueo 403 para alumnos no asociados.

## 1. Objetivo

El objetivo de esta funcionalidad es incorporar control de acceso por roles dentro de la arquitectura de microservicios del proyecto. El profesor puede gestionar alumnos y apoderados, mientras que el apoderado solo puede visualizar la información académica del alumno que tiene asociado.

## 2. Componentes involucrados

- **auth-servise:** registra usuarios, roles, alumnos y relaciones apoderado-alumno.
- **bff-colegio:** centraliza las solicitudes del frontend y valida autorización antes de entregar información académica.
- **ms-notas:** administra notas y cálculo de promedio por alumno.
- **ms-asistencia:** administra asistencia y cálculo de porcentaje de asistencia.
- **MySQL:** almacena usuarios, alumnos, relaciones, notas y asistencia.

## 3. Roles implementados

| Rol | Permisos principales | Restricciones |
|---|---|---|
| PROFESOR | Registrar profesor, crear alumnos, crear apoderados, asociar apoderado con alumno y consultar información académica. | Puede consultar información académica de todos los alumnos. |
| APODERADO | Iniciar sesión, ver alumnos asociados, consultar notas, promedio y asistencia del alumno asociado. | No puede consultar alumnos no asociados; el BFF responde HTTP 403. |

## 4. Persistencia en MySQL

La persistencia se implementó mediante Spring Data JPA y MySQL. Las tablas relevantes son:

- `usuario`: almacena profesores y apoderados mediante el campo `rol`.
- `alumno_perfil`: almacena nombre, apellido y grado del alumno.
- `apoderado_alumno`: almacena la relación entre un apoderado y su alumno asociado.
- `nota`: almacena calificaciones por alumno.
- `asistencia`: almacena registros de asistencia por alumno.

## 5. Flujo funcional implementado

1. Se registra un profesor en `auth-servise`.
2. El profesor crea un alumno con nombre, apellido y grado.
3. El profesor crea un apoderado con rol `APODERADO`.
4. El profesor asocia el apoderado con el alumno.
5. El apoderado consulta sus alumnos desde el BFF.
6. El BFF valida en `auth-servise` si el apoderado puede ver al alumno solicitado.
7. Si la validación es correcta, el BFF consulta `ms-notas` y `ms-asistencia`.
8. El BFF devuelve notas, promedio y asistencia en una respuesta consolidada.
9. Si el apoderado intenta consultar otro alumno, el sistema responde HTTP 403 Forbidden.

## 6. Endpoints principales

| Componente | Método | Endpoint | Propósito |
|---|---|---|---|
| auth-servise | POST | `/api/auth/registro/profesor` | Registrar usuario profesor. |
| auth-servise | POST | `/api/auth/login` | Iniciar sesión y devolver datos del usuario. |
| auth-servise | POST | `/api/profesor/alumnos` | Crear alumno. |
| auth-servise | POST | `/api/profesor/apoderados` | Crear apoderado. |
| auth-servise | POST | `/api/profesor/apoderados/{apoderadoId}/alumnos/{alumnoId}` | Asociar apoderado con alumno. |
| auth-servise | GET | `/api/apoderados/{apoderadoId}/alumnos` | Listar alumnos asociados al apoderado. |
| auth-servise | GET | `/api/apoderados/{apoderadoId}/alumnos/{alumnoId}/validar` | Validar autorización del apoderado. |
| bff-colegio | GET | `/api/bff/apoderados/{apoderadoId}/alumnos` | Mostrar alumnos del apoderado desde el BFF. |
| bff-colegio | GET | `/api/bff/apoderados/{apoderadoId}/alumnos/{alumnoId}/resumen` | Entregar resumen académico solo si está autorizado. |

## 7. Regla de control de acceso

El BFF no entrega notas ni asistencia directamente. Primero consulta a `auth-servise` para validar si el apoderado está asociado al alumno solicitado.

| Caso | Resultado | Código HTTP |
|---|---|---|
| Apoderado asociado al alumno | Se entrega resumen con notas, promedio y asistencia. | 200 OK |
| Apoderado no asociado al alumno | Se bloquea la consulta. | 403 Forbidden |

## 8. Evidencias revisadas

Se consideraron las evidencias disponibles del proyecto, incluyendo:

- Reportes HTML de cobertura JaCoCo para `ms-notas`, `ms-asistencia` y `bff-colegio`.
- Ejecución de pruebas unitarias mediante Maven con `BUILD SUCCESS`.
- Consulta en MySQL que muestra registros de usuario, alumno, apoderado y relación apoderado-alumno.
- Prueba funcional con HTTP 200 al consultar el resumen del alumno asociado.
- Prueba funcional con HTTP 403 al intentar consultar un alumno no asociado.

## 9. Estado validado

| Validación | Estado |
|---|---|
| Registro de profesor y apoderado | Correcto |
| Creación de alumno | Correcto |
| Asociación apoderado-alumno | Correcto |
| Consulta de alumnos del apoderado | Correcto |
| Resumen académico del alumno asociado | Correcto |
| Bloqueo de alumno no asociado | Correcto |
| Persistencia en MySQL | Correcto |

## 10. Conclusión

La funcionalidad implementada fortalece la arquitectura de microservicios porque incorpora control de acceso por rol, persistencia real en MySQL y validación centralizada mediante el BFF. El profesor puede gestionar alumnos y apoderados, mientras que el apoderado solo puede visualizar la información académica del alumno asociado a su cuenta. La prueba con HTTP 403 confirma que el sistema bloquea correctamente el acceso a alumnos no autorizados.
