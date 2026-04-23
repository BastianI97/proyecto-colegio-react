import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoleLayout from '../../components/layout/RoleLayout'
import TopNavbar from '../../components/layout/TopNavbar'
import HeroBanner from '../../components/common/HeroBanner'
import InfoCard from '../../components/common/InfoCard'

function ProfesorDashboard() {
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState('5° Básico')
  const [isClassActive, setIsClassActive] = useState(false)
  const [classStartedAt, setClassStartedAt] = useState(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [lastSession, setLastSession] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  useEffect(() => {
    const savedCourse = localStorage.getItem('selectedCourse')

    if (savedCourse) {
      setSelectedCourse(savedCourse)
    } else {
      navigate('/profesor/seleccion-curso')
    }
  }, [navigate])

  const sessionStorageKey = useMemo(
    () => `classSession_${selectedCourse}`,
    [selectedCourse]
  )

  const attendanceStorageKey = useMemo(
    () => `attendance_${selectedCourse}`,
    [selectedCourse]
  )

  useEffect(() => {
    if (!selectedCourse) return

    const savedSession = localStorage.getItem(sessionStorageKey)

    if (!savedSession) {
      setIsClassActive(false)
      setClassStartedAt(null)
      setElapsedSeconds(0)
      setLastSession(null)
      return
    }

    const parsed = JSON.parse(savedSession)

    if (parsed.isActive && parsed.startedAt) {
      setIsClassActive(true)
      setClassStartedAt(parsed.startedAt)

      const now = Date.now()
      const started = new Date(parsed.startedAt).getTime()
      setElapsedSeconds(Math.max(0, Math.floor((now - started) / 1000)))
      setLastSession(null)
    } else {
      setIsClassActive(false)
      setClassStartedAt(null)
      setElapsedSeconds(0)
      setLastSession(parsed)
    }
  }, [sessionStorageKey, selectedCourse])

  useEffect(() => {
    if (!isClassActive || !classStartedAt) return

    const interval = setInterval(() => {
      const now = Date.now()
      const started = new Date(classStartedAt).getTime()
      setElapsedSeconds(Math.max(0, Math.floor((now - started) / 1000)))
    }, 1000)

    return () => clearInterval(interval)
  }, [isClassActive, classStartedAt])

  const formatDateTime = (isoDate) => {
    if (!isoDate) return '--'
    return new Date(isoDate).toLocaleString('es-CL')
  }

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    const pad = (value) => String(value).padStart(2, '0')
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
  }

  const tabs = [
  { label: 'Resumen', value: 'resumen', path: '/profesor/dashboard' },
  { label: 'Notas', value: 'notas', path: '/profesor/notas' },
  { label: selectedCourse, value: 'curso', path: '/profesor/seleccion-curso' },
  { label: 'Asistencia', value: 'asistencia', path: '/profesor/asistencia' },
]

  const actions = [
    { label: 'Iniciar Clase', background: '#22c55e', color: '#ffffff' },
    { label: 'Finalizar Clase', background: '#ef4444', color: '#ffffff' },
  ]

  const handleTabClick = (tab) => {
    if (tab.path) navigate(tab.path)
  }

  const handleActionClick = (action) => {
    if (action.label === 'Iniciar Clase') {
      if (isClassActive) {
        setStatusMessage('Ya hay una clase en curso.')
        return
      }

      const startedAt = new Date().toISOString()

      const sessionData = {
        course: selectedCourse,
        startedAt,
        endedAt: null,
        durationSeconds: 0,
        isActive: true,
        presentCount: 0,
        absentCount: 0,
        absentStudents: [],
      }

      localStorage.setItem(sessionStorageKey, JSON.stringify(sessionData))
      setClassStartedAt(startedAt)
      setElapsedSeconds(0)
      setIsClassActive(true)
      setLastSession(null)
      setStatusMessage(`Clase iniciada para ${selectedCourse}.`)
    }

    if (action.label === 'Finalizar Clase') {
      if (!isClassActive || !classStartedAt) {
        setStatusMessage('No hay una clase activa para finalizar.')
        return
      }

      const endedAt = new Date().toISOString()
      const started = new Date(classStartedAt).getTime()
      const ended = new Date(endedAt).getTime()
      const durationSeconds = Math.max(0, Math.floor((ended - started) / 1000))

      const savedAttendanceRaw = localStorage.getItem(attendanceStorageKey)
      const savedAttendance = savedAttendanceRaw ? JSON.parse(savedAttendanceRaw) : []

      const presentCount = savedAttendance.filter((student) => student.present).length
      const absentStudents = savedAttendance
        .filter((student) => !student.present)
        .map((student) => student.name)
      const absentCount = absentStudents.length

      const sessionData = {
        course: selectedCourse,
        startedAt: classStartedAt,
        endedAt,
        durationSeconds,
        isActive: false,
        presentCount,
        absentCount,
        absentStudents,
      }

      localStorage.setItem(sessionStorageKey, JSON.stringify(sessionData))
      setIsClassActive(false)
      setClassStartedAt(null)
      setElapsedSeconds(0)
      setLastSession(sessionData)

      if (savedAttendance.length === 0) {
        setStatusMessage(
          `Clase finalizada. Duración: ${formatDuration(durationSeconds)}. No había asistencia guardada para este curso.`
        )
      } else {
        setStatusMessage(
          `Clase finalizada. Duración: ${formatDuration(durationSeconds)}. Presentes: ${presentCount}, Ausentes: ${absentCount}.`
        )
      }
    }
  }

  return (
    <RoleLayout background="linear-gradient(135deg, #eab308 0%, #facc15 100%)">
      <TopNavbar
        subtitle="Resumen General"
        title={`LIBRO DE CLASES - ${selectedCourse}`}
        tabs={tabs}
        activeTab="resumen"  
        actions={actions}
        onTabClick={handleTabClick}
        onActionClick={handleActionClick}
      />

      {statusMessage && <div style={styles.statusBanner}>{statusMessage}</div>}

      <div style={styles.searchRow}>
        <input placeholder="Ingresar Nombre Alumno/RUT" style={styles.searchInput} />
      </div>

      <HeroBanner
        title="Nuestra Clase"
        subtitle="Compañeros del curso seleccionado"
        height="220px"
      />

      <section style={styles.grid}>
        <div style={styles.fullWidth}>
          <InfoCard title="Sesión de Clase" minHeight="auto">
            <div style={styles.sessionGrid}>
              <div>
                <p style={styles.sessionLabel}>Estado</p>
                <p style={isClassActive ? styles.activeState : styles.inactiveState}>
                  {isClassActive ? 'Clase en curso' : 'Sin clase activa'}
                </p>
              </div>

              <div>
                <p style={styles.sessionLabel}>Hora de inicio</p>
                <p style={styles.sessionValue}>
                  {isClassActive
                    ? formatDateTime(classStartedAt)
                    : formatDateTime(lastSession?.startedAt)}
                </p>
              </div>

              <div>
                <p style={styles.sessionLabel}>Hora de término</p>
                <p style={styles.sessionValue}>
                  {isClassActive ? '--' : formatDateTime(lastSession?.endedAt)}
                </p>
              </div>

              <div>
                <p style={styles.sessionLabel}>
                  {isClassActive ? 'Tiempo transcurrido' : 'Duración última clase'}
                </p>
                <p style={styles.timerValue}>
                  {isClassActive
                    ? formatDuration(elapsedSeconds)
                    : formatDuration(lastSession?.durationSeconds || 0)}
                </p>
              </div>
            </div>

            {!isClassActive && lastSession && (
              <div style={styles.attendanceSummary}>
                <div style={styles.summaryPill}>
                  Presentes: <strong>{lastSession.presentCount ?? 0}</strong>
                </div>
                <div style={styles.summaryPill}>
                  Ausentes: <strong>{lastSession.absentCount ?? 0}</strong>
                </div>
              </div>
            )}

            {!isClassActive && lastSession?.absentStudents?.length > 0 && (
              <div style={styles.absentBox}>
                <p style={styles.absentTitle}>Alumnos ausentes en la última clase:</p>
                <ul style={styles.absentList}>
                  {lastSession.absentStudents.map((student) => (
                    <li key={student}>{student}</li>
                  ))}
                </ul>
              </div>
            )}
          </InfoCard>
        </div>

        <InfoCard title="Asistencia del Mes">
          <div style={styles.cardContent}>
            <div style={styles.circle}>94%</div>
            <div style={styles.fakeChart}>
              <div style={styles.chartBar}></div>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Promedio General">
          <div style={styles.cardContent}>
            <div style={styles.bigNumber}>6.5</div>
            <div style={styles.fakeBars}>
              <div style={{ ...styles.bar, height: '70px' }}></div>
              <div style={{ ...styles.bar, height: '82px', background: '#facc15' }}></div>
              <div style={{ ...styles.bar, height: '55px', background: '#06b6d4' }}></div>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Tareas y Tareas Pendientes">
          <ul style={styles.list}>
            <li>□ Entregar Proyecto de Ciencias</li>
            <li>□ Leer Capítulo 4 de Historia</li>
            <li>□ Preparar exposición de Lenguaje</li>
          </ul>
        </InfoCard>

        <InfoCard title="Notificaciones de Clase">
          <div style={styles.notificationBox}>
            Recordatorio: Cambio de sala para Matemáticas mañana.
          </div>
          <div style={styles.notificationBox}>
            Aviso: La evaluación de Historia será el viernes.
          </div>
        </InfoCard>
      </section>
    </RoleLayout>
  )
}

const styles = {
  statusBanner: {
    background: '#f8fafc',
    color: '#111827',
    padding: '14px 18px',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '18px',
    boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
  },
  searchRow: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '380px',
    maxWidth: '100%',
    padding: '14px 18px',
    borderRadius: '16px',
    border: 'none',
    fontSize: '18px',
    boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '18px',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  sessionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
    gap: '18px',
  },
  sessionLabel: {
    fontSize: '16px',
    color: '#6b7280',
    marginBottom: '8px',
    fontWeight: '600',
  },
  sessionValue: {
    fontSize: '18px',
    color: '#111827',
    fontWeight: '700',
  },
  timerValue: {
    fontSize: '28px',
    color: '#111827',
    fontWeight: '800',
  },
  activeState: {
    fontSize: '18px',
    color: '#166534',
    fontWeight: '800',
  },
  inactiveState: {
    fontSize: '18px',
    color: '#991b1b',
    fontWeight: '800',
  },
  attendanceSummary: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '18px',
  },
  summaryPill: {
    background: '#eef2ff',
    color: '#111827',
    padding: '10px 14px',
    borderRadius: '999px',
    fontSize: '16px',
    fontWeight: '600',
  },
  absentBox: {
    marginTop: '18px',
    background: '#fff7ed',
    borderRadius: '16px',
    padding: '16px',
  },
  absentTitle: {
    fontSize: '16px',
    fontWeight: '800',
    color: '#9a3412',
    marginBottom: '10px',
  },
  absentList: {
    paddingLeft: '20px',
    color: '#7c2d12',
    fontSize: '16px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '24px',
    flexWrap: 'wrap',
  },
  circle: {
    width: '130px',
    height: '130px',
    borderRadius: '50%',
    border: '12px solid #22c55e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '34px',
    fontWeight: '800',
    color: '#111827',
  },
  fakeChart: {
    flex: 1,
    minWidth: '220px',
    height: '130px',
    borderRadius: '16px',
    background: 'linear-gradient(180deg, #eff6ff, #ffffff)',
    position: 'relative',
    overflow: 'hidden',
  },
  chartBar: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    bottom: '20%',
    height: '3px',
    background: '#2563eb',
    transform: 'skewY(-12deg)',
    boxShadow:
      '40px -20px 0 #2563eb, 80px -5px 0 #2563eb, 120px -28px 0 #2563eb, 160px -10px 0 #2563eb',
  },
  bigNumber: {
    fontSize: '88px',
    fontWeight: '800',
    color: '#111827',
    lineHeight: 1,
  },
  fakeBars: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '18px',
    height: '120px',
  },
  bar: {
    width: '48px',
    background: '#3b82f6',
    borderRadius: '12px 12px 0 0',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    fontSize: '22px',
    color: '#111827',
    paddingLeft: '0',
    listStyle: 'none',
  },
  notificationBox: {
    background: '#f3f4f6',
    borderRadius: '14px',
    padding: '16px',
    fontSize: '20px',
    color: '#1f2937',
    marginBottom: '12px',
  },
}

export default ProfesorDashboard