import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/auth/LoginPage'
import ProfesorDashboard from '../pages/profesor/ProfesorDashboard'
import AlumnoDashboard from '../pages/alumno/AlumnoDashboard'
import ApoderadoDashboard from '../pages/apoderado/ApoderadoDashboard'
import ProtectedRoute from './ProtectedRoute'
import AlumnoCalificacionesPage from '../pages/alumno/AlumnoCalificacionesPage'
import AlumnoHorarioPage from '../pages/alumno/AlumnoHorarioPage'
import ProfesorSeleccionCursoPage from '../pages/profesor/ProfesorSeleccionCursoPage'
import ProfesorAsistenciaPage from '../pages/profesor/ProfesorAsistenciaPage'
import AlumnoAsignaturasPage from '../pages/alumno/AlumnoAsignaturasPage' //Agregado
import HomePage from '../pages/public/HomePage' //agregado
import ProfesorNotasPage from '../pages/profesor/ProfesorNotasPage' // agregado 



function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} /> // agregado

      <Route
        path="/profesor/dashboard"
        element={
          <ProtectedRoute allowedRoles={['PROFESOR']}>
            <ProfesorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
  path="/profesor/seleccion-curso"
  element={
    <ProtectedRoute allowedRoles={['PROFESOR']}>
      <ProfesorSeleccionCursoPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/profesor/asistencia"
  element={
    <ProtectedRoute allowedRoles={['PROFESOR']}>
      <ProfesorAsistenciaPage />
    </ProtectedRoute>
  }
/>

<Route
  path="/profesor/notas"
  element={
    <ProtectedRoute allowedRoles={['PROFESOR']}> // agregado
      <ProfesorNotasPage />
    </ProtectedRoute>
  }
/>

      <Route
        path="/alumno/dashboard"
        element={
          <ProtectedRoute allowedRoles={['ALUMNO']}>
            <AlumnoDashboard />
          </ProtectedRoute>
        }
      />

        <Route
  path="/alumno/asignaturas"
  element={
    <ProtectedRoute allowedRoles={['ALUMNO']}>
      <AlumnoAsignaturasPage />
    </ProtectedRoute>
  }
/>
     
     <Route
        path="/alumno/calificaciones"
        element={
          <ProtectedRoute allowedRoles={['ALUMNO']}>
            <AlumnoCalificacionesPage />
          </ProtectedRoute>
        }
        />

    <Route
        path="/alumno/horario"
        element={
          <ProtectedRoute allowedRoles={['ALUMNO']}>
            <AlumnoHorarioPage />
         </ProtectedRoute>
        }
    />


      <Route
        path="/apoderado/dashboard"
        element={
          <ProtectedRoute allowedRoles={['APODERADO']}>
            <ApoderadoDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default AppRouter