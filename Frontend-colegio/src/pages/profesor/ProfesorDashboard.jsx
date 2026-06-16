import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoleLayout from '../../components/layout/RoleLayout'
import TopNavbar from '../../components/layout/TopNavbar'
import HeroBanner from '../../components/common/HeroBanner'
import InfoCard from '../../components/common/InfoCard'
const AUTH_API_URL = 'http://localhost:8081/api'

function ProfesorDashboard() {
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState('5° Básico')
  const [isClassActive, setIsClassActive] = useState(false)
  const [classStartedAt, setClassStartedAt] = useState(null)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [lastSession, setLastSession] = useState(null)
  const [statusMessage, setStatusMessage] = useState('')

  const [gestionMessage, setGestionMessage] = useState('')
  const [gestionError, setGestionError] = useState('')
  const [alumnosGestion, setAlumnosGestion] = useState([])
  const [apoderadosGestion, setApoderadosGestion] = useState([])

  const [alumnoForm, setAlumnoForm] = useState({
    nombre: '',
    apellido: '',
    grado: selectedCourse,
  })

  const [apoderadoForm, setApoderadoForm] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '123456',
  })

  const [asociacionForm, setAsociacionForm] = useState({
    apoderadoId: '',
    alumnoId: '',
  })


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

    const cargarGestionAcademica = async () => {
    try {
      setGestionError('')

      const [alumnosResponse, apoderadosResponse] = await Promise.all([
        fetch(`${AUTH_API_URL}/profesor/alumnos`),
        fetch(`${AUTH_API_URL}/profesor/apoderados`),
      ])

      if (!alumnosResponse.ok || !apoderadosResponse.ok) {
        throw new Error('No se pudo cargar alumnos o apoderados desde auth-servise.')
      }

      const alumnosData = await alumnosResponse.json()
      const apoderadosData = await apoderadosResponse.json()

      setAlumnosGestion(alumnosData)
      setApoderadosGestion(apoderadosData)
    } catch (error) {
      setGestionError(error.message)
    }
  }

  useEffect(() => {
    cargarGestionAcademica()
  }, [])

  const crearAlumnoDesdeFrontend = async (event) => {
    event.preventDefault()

    try {
      setGestionMessage('')
      setGestionError('')

      const response = await fetch(`${AUTH_API_URL}/profesor/alumnos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(alumnoForm),
      })

      if (!response.ok) {
        throw new Error('No se pudo crear el alumno.')
      }

      const alumnoCreado = await response.json()

      setGestionMessage(
        `Alumno creado correctamente: ${alumnoCreado.nombre} ${alumnoCreado.apellido}`
      )

      setAlumnoForm({
        nombre: '',
        apellido: '',
        grado: selectedCourse,
      })

      await cargarGestionAcademica()
    } catch (error) {
      setGestionError(error.message)
    }
  }

  const crearApoderadoDesdeFrontend = async (event) => {
    event.preventDefault()

    try {
      setGestionMessage('')
      setGestionError('')

      const response = await fetch(`${AUTH_API_URL}/profesor/apoderados`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apoderadoForm),
      })

      if (!response.ok) {
        throw new Error('No se pudo crear el apoderado.')
      }

      const apoderadoCreado = await response.json()

      setGestionMessage(
        `Apoderado creado correctamente: ${apoderadoCreado.nombre} ${apoderadoCreado.apellido}`
      )

      setApoderadoForm({
        nombre: '',
        apellido: '',
        email: '',
        password: '123456',
      })

      await cargarGestionAcademica()
    } catch (error) {
      setGestionError(error.message)
    }
  }

  const asociarApoderadoConAlumnoDesdeFrontend = async (event) => {
    event.preventDefault()

    try {
      setGestionMessage('')
      setGestionError('')

      if (!asociacionForm.apoderadoId || !asociacionForm.alumnoId) {
        throw new Error('Debes seleccionar un apoderado y un alumno.')
      }

      const response = await fetch(
        `${AUTH_API_URL}/profesor/apoderados/${asociacionForm.apoderadoId}/alumnos/${asociacionForm.alumnoId}`,
        {
          method: 'POST',
        }
      )

      if (!response.ok) {
        throw new Error('No se pudo asociar el apoderado con el alumno.')
      }

      setGestionMessage('Apoderado asociado correctamente con el alumno.')

      setAsociacionForm({
        apoderadoId: '',
        alumnoId: '',
      })

      await cargarGestionAcademica()
    } catch (error) {
      setGestionError(error.message)
    }
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


            <section style={styles.managementSection}>
        <InfoCard title="Gestión de alumnos y apoderados" minHeight="auto">
          {gestionMessage && (
            <div style={styles.successBanner}>{gestionMessage}</div>
          )}

          {gestionError && (
            <div style={styles.errorBanner}>{gestionError}</div>
          )}

          <div style={styles.managementGrid}>
            <form style={styles.formCard} onSubmit={crearAlumnoDesdeFrontend}>
              <h3 style={styles.formTitle}>Crear alumno</h3>

              <input
                style={styles.formInput}
                placeholder="Nombre del alumno"
                value={alumnoForm.nombre}
                onChange={(event) =>
                  setAlumnoForm({ ...alumnoForm, nombre: event.target.value })
                }
                required
              />

              <input
                style={styles.formInput}
                placeholder="Apellido del alumno"
                value={alumnoForm.apellido}
                onChange={(event) =>
                  setAlumnoForm({ ...alumnoForm, apellido: event.target.value })
                }
                required
              />

              <input
                style={styles.formInput}
                placeholder="Grado o curso"
                value={alumnoForm.grado}
                onChange={(event) =>
                  setAlumnoForm({ ...alumnoForm, grado: event.target.value })
                }
                required
              />

              <button style={styles.primaryButton} type="submit">
                Crear alumno
              </button>
            </form>

            <form style={styles.formCard} onSubmit={crearApoderadoDesdeFrontend}>
              <h3 style={styles.formTitle}>Crear apoderado</h3>

              <input
                style={styles.formInput}
                placeholder="Nombre del apoderado"
                value={apoderadoForm.nombre}
                onChange={(event) =>
                  setApoderadoForm({ ...apoderadoForm, nombre: event.target.value })
                }
                required
              />

              <input
                style={styles.formInput}
                placeholder="Apellido del apoderado"
                value={apoderadoForm.apellido}
                onChange={(event) =>
                  setApoderadoForm({ ...apoderadoForm, apellido: event.target.value })
                }
                required
              />

              <input
                style={styles.formInput}
                type="email"
                placeholder="Email del apoderado"
                value={apoderadoForm.email}
                onChange={(event) =>
                  setApoderadoForm({ ...apoderadoForm, email: event.target.value })
                }
                required
              />

              <input
                style={styles.formInput}
                placeholder="Contraseña"
                value={apoderadoForm.password}
                onChange={(event) =>
                  setApoderadoForm({ ...apoderadoForm, password: event.target.value })
                }
                required
              />

              <button style={styles.primaryButton} type="submit">
                Crear apoderado
              </button>
            </form>

            <form
              style={styles.formCard}
              onSubmit={asociarApoderadoConAlumnoDesdeFrontend}
            >
              <h3 style={styles.formTitle}>Asociar apoderado con alumno</h3>

              <select
                style={styles.formInput}
                value={asociacionForm.apoderadoId}
                onChange={(event) =>
                  setAsociacionForm({
                    ...asociacionForm,
                    apoderadoId: event.target.value,
                  })
                }
                required
              >
                <option value="">Seleccionar apoderado</option>
                {apoderadosGestion.map((apoderado) => (
                  <option key={apoderado.id} value={apoderado.id}>
                    {apoderado.nombre} {apoderado.apellido} - {apoderado.email}
                  </option>
                ))}
              </select>

              <select
                style={styles.formInput}
                value={asociacionForm.alumnoId}
                onChange={(event) =>
                  setAsociacionForm({
                    ...asociacionForm,
                    alumnoId: event.target.value,
                  })
                }
                required
              >
                <option value="">Seleccionar alumno</option>
                {alumnosGestion.map((alumno) => (
                  <option key={alumno.id} value={alumno.id}>
                    {alumno.nombre} {alumno.apellido} - {alumno.grado}
                  </option>
                ))}
              </select>

              <button style={styles.primaryButton} type="submit">
                Asociar
              </button>
            </form>
          </div>
        </InfoCard>
      </section>




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

    managementSection: {
    marginBottom: '20px',
  },
  managementGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '18px',
  },
  formCard: {
    background: '#f8fafc',
    borderRadius: '18px',
    padding: '18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '4px',
  },
  formInput: {
    width: '100%',
    padding: '12px 14px',
    borderRadius: '12px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
    color: '#111827',
    background: '#ffffff',
  },
  primaryButton: {
    padding: '12px 16px',
    border: 'none',
    borderRadius: '12px',
    background: '#2563eb',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
  },
  successBanner: {
    background: '#dcfce7',
    color: '#166534',
    padding: '12px 16px',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '14px',
  },
  errorBanner: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '12px 16px',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '14px',
  },

}

export default ProfesorDashboard