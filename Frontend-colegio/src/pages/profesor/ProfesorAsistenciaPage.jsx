import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoleLayout from '../../components/layout/RoleLayout'
import TopNavbar from '../../components/layout/TopNavbar'
import HeroBanner from '../../components/common/HeroBanner'
import InfoCard from '../../components/common/InfoCard'
const ASISTENCIA_API_URL = 'http://localhost:8083/api/asistencias'


const BASE_STUDENTS = [
  { id: 1, name: 'Héctor González', present: true },
  { id: 2, name: 'Sofía Rojas', present: true },
  { id: 3, name: 'Martín Pérez', present: false },
  { id: 4, name: 'Valentina Díaz', present: true },
  { id: 5, name: 'Benjamín Soto', present: false },
  { id: 6, name: 'Amanda Torres', present: true },
]

function ProfesorAsistenciaPage() {
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState('5° Básico')
  const [students, setStudents] = useState(BASE_STUDENTS)
  const [saveMessage, setSaveMessage] = useState('')

  useEffect(() => {
    const savedCourse = localStorage.getItem('selectedCourse')

    if (savedCourse) {
      setSelectedCourse(savedCourse)
    } else {
      navigate('/profesor/seleccion-curso')
    }
  }, [navigate])

  useEffect(() => {
    const savedAttendance = localStorage.getItem(`attendance_${selectedCourse}`)

    if (savedAttendance) {
      setStudents(JSON.parse(savedAttendance))
    } else {
      setStudents(BASE_STUDENTS)
    }
  }, [selectedCourse])

  const tabs = [
  { label: 'Resumen', value: 'resumen', path: '/profesor/dashboard' },
  { label: 'Notas', value: 'notas', path: '/profesor/notas' },
  { label: selectedCourse, value: 'curso', path: '/profesor/seleccion-curso' },
  { label: 'Asistencia', value: 'asistencia', path: '/profesor/asistencia' },
]

  const handleTabClick = (tab) => {
    if (tab.path) navigate(tab.path)
  }

  const handleAttendanceChange = (id, value) => {
    setStudents((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: value } : student
      )
    )
    setSaveMessage('')
  }

  const handleSaveAttendance = async () => {
  try {
    const fechaHoy = new Date().toISOString().split('T')[0]

    const registros = students.map((student) => ({
      alumnoId: student.id,
      fecha: fechaHoy,
      estado: student.present ? 'PRESENTE' : 'AUSENTE',
      observacion: `Registro desde frontend profesor - ${selectedCourse}`,
    }))

    await Promise.all(
      registros.map((registro) =>
        fetch(ASISTENCIA_API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registro),
        })
      )
    )

    localStorage.setItem(`attendance_${selectedCourse}`, JSON.stringify(students))
    setSaveMessage(`Asistencia guardada en MySQL para ${selectedCourse}`)
  } catch (error) {
    setSaveMessage('No se pudo guardar la asistencia en el backend.')
  }
}

  const presentCount = students.filter((student) => student.present).length
  const absentCount = students.length - presentCount
  const attendancePercent =
    students.length > 0 ? Math.round((presentCount / students.length) * 100) : 0

  return (
    <RoleLayout background="linear-gradient(135deg, #eab308 0%, #facc15 100%)">
      <TopNavbar
        subtitle="Resumen General"
        title={`LIBRO DE CLASES - ${selectedCourse}`}
        tabs={tabs}
        activeTab="asistencia"
        actions={[{ label: 'Pasar Asistencia ✓', background: '#f8f4e8', color: '#111827' }]}
        onTabClick={handleTabClick}
        onActionClick={handleSaveAttendance}
      />

      {saveMessage && <div style={styles.saveBanner}>{saveMessage}</div>}

      <div style={styles.filtersRow}>
        <div style={styles.selectBox}>📅 06 de jun 2021</div>
        <div style={styles.selectBox}>Clase B ▾</div>
      </div>

      <HeroBanner
        title="Nuestra Clase"
        subtitle={`Compañeros del ${selectedCourse}`}
        height="220px"
      />

      <section style={styles.summaryGrid}>
        <InfoCard title="Asistencia del Día">
          <div style={styles.cardContent}>
            <div style={styles.circle}>{attendancePercent}%</div>
            <div style={styles.statsColumn}>
              <p style={styles.statLine}>Presentes: {presentCount}</p>
              <p style={styles.statLine}>Ausentes: {absentCount}</p>
              <p style={styles.statLine}>Total alumnos: {students.length}</p>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Resumen">
          <div style={styles.cardContent}>
            <div style={styles.fakeChart}>
              <div style={styles.chartBar}></div>
            </div>
          </div>
        </InfoCard>
      </section>

      <InfoCard title="Listado de Asistencia" minHeight="auto">
        <div style={styles.tableHeader}>
          <span>Alumno</span>
          <span>Estado actual</span>
          <span>Acción</span>
        </div>

        {students.map((student) => (
          <div key={student.id} style={styles.tableRow}>
            <span>{student.name}</span>

            <span style={student.present ? styles.presentBadge : styles.absentBadge}>
              {student.present ? 'Presente' : 'Ausente'}
            </span>

            <div style={styles.actionsCell}>
              <button
                style={{
                  ...styles.choiceButton,
                  ...(student.present ? styles.choiceButtonActivePresent : {}),
                }}
                onClick={() => handleAttendanceChange(student.id, true)}
              >
                Presente
              </button>

              <button
                style={{
                  ...styles.choiceButton,
                  ...styles.choiceButtonAbsent,
                  ...(!student.present ? styles.choiceButtonActiveAbsent : {}),
                }}
                onClick={() => handleAttendanceChange(student.id, false)}
              >
                Ausente
              </button>
            </div>
          </div>
        ))}
      </InfoCard>
    </RoleLayout>
  )
}

const styles = {
  saveBanner: {
    background: '#dcfce7',
    color: '#166534',
    padding: '14px 18px',
    borderRadius: '14px',
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '18px',
    boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
  },
  filtersRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  selectBox: {
    background: '#ffffff',
    borderRadius: '14px',
    padding: '14px 18px',
    fontSize: '20px',
    color: '#111827',
    boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
    minWidth: '220px',
  },
  summaryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '18px',
    marginBottom: '20px',
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
  statsColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    minWidth: '220px',
  },
  statLine: {
    fontSize: '20px',
    color: '#111827',
    fontWeight: '600',
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
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1.5fr',
    gap: '16px',
    fontSize: '20px',
    fontWeight: '700',
    color: '#111827',
    paddingBottom: '12px',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '6px',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr 1.5fr',
    gap: '16px',
    alignItems: 'center',
    padding: '14px 0',
    fontSize: '18px',
    color: '#111827',
    borderBottom: '1px solid #f3f4f6',
  },
  presentBadge: {
    display: 'inline-block',
    background: '#dcfce7',
    color: '#166534',
    padding: '8px 14px',
    borderRadius: '999px',
    fontWeight: '700',
    width: 'fit-content',
  },
  absentBadge: {
    display: 'inline-block',
    background: '#fee2e2',
    color: '#991b1b',
    padding: '8px 14px',
    borderRadius: '999px',
    fontWeight: '700',
    width: 'fit-content',
  },
  actionsCell: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  choiceButton: {
    border: 'none',
    background: '#e5e7eb',
    color: '#111827',
    padding: '10px 14px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
  },
  choiceButtonAbsent: {
    background: '#f3f4f6',
  },
  choiceButtonActivePresent: {
    background: '#22c55e',
    color: '#ffffff',
  },
  choiceButtonActiveAbsent: {
    background: '#ef4444',
    color: '#ffffff',
  },
}

export default ProfesorAsistenciaPage