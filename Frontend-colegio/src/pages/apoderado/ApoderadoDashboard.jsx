import { useEffect, useState } from 'react'
import RoleLayout from '../../components/layout/RoleLayout'
import TopMenuBar from '../../components/common/TopMenuBar'

const APODERADO_ID = 2
const ALUMNO_ID = 1
const BFF_URL = 'http://localhost:8080/api/bff'

function ApoderadoDashboard() {
  const [alumno, setAlumno] = useState(null)
  const [resumen, setResumen] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  const requests = [
    {
      type: 'Justificación de Falta - 15/Oct',
      date: '15/Oct/2023',
      status: 'Pendiente',
    },
    {
      type: 'Certificado de Alumno Regular - 10/Oct',
      date: '10/Oct/2023',
      status: 'Entregado',
    },
  ]

  useEffect(() => {
    const cargarDatosApoderado = async () => {
      try {
        setCargando(true)
        setError('')

        const alumnosResponse = await fetch(`${BFF_URL}/apoderados/${APODERADO_ID}/alumnos`)
        if (!alumnosResponse.ok) {
          throw new Error('No se pudieron obtener los alumnos asociados al apoderado')
        }

        const alumnos = await alumnosResponse.json()
        const alumnoAsociado = alumnos[0] || null
        setAlumno(alumnoAsociado)

        const resumenResponse = await fetch(
          `${BFF_URL}/apoderados/${APODERADO_ID}/alumnos/${ALUMNO_ID}/resumen`
        )

        if (!resumenResponse.ok) {
          throw new Error('No se pudo obtener el resumen académico del alumno')
        }

        const resumenAcademico = await resumenResponse.json()
        setResumen(resumenAcademico)
      } catch (error) {
        setError(error.message)
      } finally {
        setCargando(false)
      }
    }

    cargarDatosApoderado()
  }, [])

  const asistencia = resumen?.asistencia
  const notas = resumen?.notas || []

  const promedio =
    resumen?.promedio !== undefined && resumen?.promedio !== null
      ? Number(resumen.promedio).toFixed(1)
      : '-'

  return (
    <RoleLayout background="linear-gradient(135deg, #a50022 0%, #d9153b 100%)">
      <TopMenuBar showSearch showUser />

      <section style={styles.section}>
        <h1 style={styles.mainTitle}>asistencia</h1>

        {cargando && (
          <div style={styles.infoBox}>
            Cargando información académica desde BFF...
          </div>
        )}

        {error && (
          <div style={styles.errorBox}>
            Error al cargar datos: {error}
          </div>
        )}

        {!cargando && !error && (
          <>
            <div style={styles.studentCard}>
              <h2 style={styles.cardTitle}>Resumen académico del apoderado</h2>

              <div style={styles.studentGrid}>
                <div>
                  <strong>Alumno asociado:</strong>{' '}
                  {alumno
                    ? `${alumno.nombre} ${alumno.apellido}`
                    : `Alumno ID ${ALUMNO_ID}`}
                </div>

                <div>
                  <strong>Curso / grado:</strong>{' '}
                  {alumno?.grado || 'No informado'}
                </div>

                <div>
                  <strong>Promedio:</strong> {promedio}
                </div>

                <div>
                  <strong>Alumno ID:</strong> {resumen?.alumnoId || ALUMNO_ID}
                </div>
              </div>
            </div>

            <div style={styles.statsBox}>
              <div style={styles.statItem}>
                ✅ Presentes: {asistencia?.presentes ?? '-'}
              </div>
              <div style={styles.statItem}>
                ❌ Ausentes: {asistencia?.ausentes ?? '-'}
              </div>
              <div style={styles.statItem}>
                📊 Porcentaje asistencia: {asistencia?.porcentajeAsistencia ?? '-'}%
              </div>
              <div style={styles.statItem}>
                🧾 Notas registradas: {notas.length}
              </div>
            </div>

            <div style={styles.tableCard}>
              <h2 style={styles.cardTitle}>Notas del alumno</h2>

              <div style={styles.tableHeaderNotas}>
                <span>Asignatura</span>
                <span>Calificación</span>
                <span>Fecha</span>
              </div>

              {notas.length === 0 ? (
                <div style={styles.tableRowNotas}>
                  <span>No existen notas registradas.</span>
                  <span>-</span>
                  <span>-</span>
                </div>
              ) : (
                notas.map((nota) => (
                  <div key={nota.id} style={styles.tableRowNotas}>
                    <span>{nota.asignatura}</span>
                    <span>{nota.calificacion}</span>
                    <span>{nota.fechaRegistro}</span>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </section>

      <section style={styles.section}>
        <h2 style={styles.secondaryTitle}>solicitudes</h2>

        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <span>Tipo</span>
            <span>Fecha</span>
            <span>Estado</span>
          </div>

          {requests.map((request) => (
            <div key={request.type} style={styles.tableRow}>
              <span>{request.type}</span>
              <span>{request.date}</span>
              <span>{request.status}</span>
            </div>
          ))}
        </div>
      </section>
    </RoleLayout>
  )
}

const styles = {
  section: {
    marginBottom: '34px',
  },
  mainTitle: {
    fontSize: '76px',
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'lowercase',
    marginBottom: '22px',
    textShadow: '0 4px 10px rgba(0,0,0,0.2)',
  },
  secondaryTitle: {
    fontSize: '76px',
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'lowercase',
    marginBottom: '22px',
    textShadow: '0 4px 10px rgba(0,0,0,0.2)',
  },
  infoBox: {
    background: '#ffffff',
    borderRadius: '18px',
    padding: '20px 24px',
    color: '#111827',
    fontSize: '20px',
    marginBottom: '22px',
  },
  errorBox: {
    background: '#fee2e2',
    borderRadius: '18px',
    padding: '20px 24px',
    color: '#991b1b',
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '22px',
  },
  studentCard: {
    background: '#ffffff',
    borderRadius: '28px',
    padding: '28px 36px',
    color: '#111827',
    marginBottom: '22px',
    boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
  },
  cardTitle: {
    fontSize: '26px',
    fontWeight: '800',
    marginBottom: '20px',
    color: '#111827',
  },
  studentGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '18px',
    fontSize: '20px',
  },
  statsBox: {
    background: 'rgba(95, 0, 20, 0.28)',
    borderRadius: '28px',
    padding: '30px 36px',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '24px',
    color: '#fef2f2',
    fontSize: '22px',
    boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
    marginBottom: '22px',
  },
  statItem: {
    fontWeight: '500',
  },
  tableCard: {
    background: '#ffffff',
    borderRadius: '28px',
    padding: '26px 36px',
    boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
    color: '#111827',
    marginBottom: '24px',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2.2fr 1fr 1fr',
    gap: '20px',
    fontSize: '22px',
    fontWeight: '800',
    paddingBottom: '14px',
    borderBottom: '1px solid rgba(17,24,39,0.25)',
    marginBottom: '10px',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2.2fr 1fr 1fr',
    gap: '20px',
    fontSize: '20px',
    padding: '16px 0',
    borderBottom: '1px solid rgba(17,24,39,0.18)',
  },
  tableHeaderNotas: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '20px',
    fontSize: '20px',
    fontWeight: '800',
    paddingBottom: '14px',
    borderBottom: '1px solid rgba(17,24,39,0.25)',
    marginBottom: '10px',
  },
  tableRowNotas: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1fr',
    gap: '20px',
    fontSize: '18px',
    padding: '14px 0',
    borderBottom: '1px solid rgba(17,24,39,0.18)',
  },
}

export default ApoderadoDashboard