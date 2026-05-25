import { useEffect, useState } from 'react'
import { obtenerResumenAlumno } from '../api/alumnoService'

function BackendAlumnoTest({ alumnoId = 1 }) {
  const [resumen, setResumen] = useState(null)
  const [error, setError] = useState(null)
  const [cargando, setCargando] = useState(true)

  useEffect(() => {
    obtenerResumenAlumno(alumnoId)
      .then((data) => {
        setResumen(data)
        console.log('Resumen desde BFF:', data)
      })
      .catch((error) => {
        console.error('Error al conectar con BFF:', error)
        setError('No se pudo conectar con el backend')
      })
      .finally(() => {
        setCargando(false)
      })
  }, [alumnoId])

  if (cargando) {
    return (
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', marginTop: '16px' }}>
        Cargando datos desde backend...
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ background: '#ffe5e5', padding: '16px', borderRadius: '12px', marginTop: '16px', color: '#900' }}>
        {error}
      </div>
    )
  }

  return (
    <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', marginTop: '16px' }}>
      <h3>Datos conectados desde backend</h3>
      <p><strong>Alumno ID:</strong> {resumen?.alumnoId}</p>
      <p><strong>Promedio:</strong> {resumen?.promedio}</p>
      <p><strong>Porcentaje asistencia:</strong> {resumen?.asistencia?.porcentajeAsistencia}%</p>
    </div>
  )
}

export default BackendAlumnoTest
