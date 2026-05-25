# Frontend Colegio Bernardo O'Higgins

## Descripción

Frontend del sistema Libro de Clases Digital del Colegio Bernardo O'Higgins.

Este componente fue desarrollado con React y Vite. Permite visualizar interfaces diferenciadas según el rol del usuario: profesor, alumno y apoderado.

El frontend se conecta con el Backend For Frontend del proyecto para consultar información académica del alumno, específicamente promedio general y porcentaje de asistencia.

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- CSS
- Axios
- React Router DOM

## Roles disponibles

El sistema contempla vistas para los siguientes roles:

- Profesor
- Alumno
- Apoderado

## Funcionalidades principales

- Login por rol.
- Navegación protegida según tipo de usuario.
- Dashboard de alumno.
- Dashboard de profesor.
- Dashboard de apoderado.
- Vista de asignaturas del alumno.
- Vista de horario del alumno.
- Vista de calificaciones del alumno.
- Consulta de datos académicos desde el BFF.
- Visualización de promedio general desde backend.
- Visualización de porcentaje de asistencia desde backend.

## Conexión con backend

El frontend consume el Backend For Frontend disponible en:

http://localhost:8080

El BFF se comunica internamente con los siguientes microservicios:

- ms-notas: http://localhost:8082
- ms-asistencia: http://localhost:8083

## Integración implementada

La integración real con backend se encuentra implementada en:

src/pages/alumno/AlumnoDashboard.jsx

El dashboard del alumno consume el endpoint:

GET http://localhost:8080/api/bff/alumnos/1/resumen

Este endpoint entrega información consolidada desde los microservicios de notas y asistencia.

## Alcance de la integración

Actualmente, el dashboard del alumno está conectado al BFF para mostrar:

- Promedio general del alumno.
- Porcentaje de asistencia del alumno.

Otras vistas del frontend mantienen datos estáticos o simulados para fines de navegación, presentación visual y prototipado.

## Variables de entorno

Crear un archivo .env en la raíz de Frontend-colegio con el siguiente contenido:

VITE_API_URL=http://localhost:8080

El archivo .env no se sube al repositorio. Para referencia se incluye el archivo .env.example.

## Instalación

Desde la carpeta Frontend-colegio ejecutar:

npm install

## Ejecución

Desde la carpeta Frontend-colegio ejecutar:

npm run dev

El frontend se ejecuta en:

http://localhost:5173

## Servicios requeridos para prueba completa

Para probar la integración con backend, deben estar levantados los siguientes servicios:

- ms-notas: puerto 8082
- ms-asistencia: puerto 8083
- bff-colegio: puerto 8080
- frontend: puerto 5173

## Orden recomendado de ejecución

1. Levantar ms-notas.
2. Levantar ms-asistencia.
3. Levantar bff-colegio.
4. Levantar Frontend-colegio.

## Estructura principal

Frontend-colegio/
- src/
  - api/
  - assets/
  - components/
  - context/
  - data/
  - pages/
    - alumno/
    - apoderado/
    - auth/
    - profesor/
    - public/
  - routes/
  - utils/
- public/
- package.json
- .env.example
- README.md

## Archivos relevantes

- src/api/axiosClient.js
- src/api/alumnoService.js
- src/context/AuthContext.jsx
- src/routes/AppRouter.jsx
- src/routes/ProtectedRoute.jsx
- src/pages/alumno/AlumnoDashboard.jsx

## Estado del componente

El frontend se encuentra operativo y conectado parcialmente al backend. La integración funcional se evidencia en el dashboard del alumno, que consume información real desde el BFF y los microservicios de notas y asistencia.
