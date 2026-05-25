import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoleLayout from '../../components/layout/RoleLayout'
import TopNavbar from '../../components/layout/TopNavbar'
import InfoCard from '../../components/common/InfoCard'

const BASE_STUDENTS = [
  'Héctor González',
  'Sofía Rojas',
  'Martín Pérez',
  'Valentina Díaz',
  'Benjamín Soto',
  'Amanda Torres',
]

const SUBJECTS = [
  'Matemáticas',
  'Historia',
  'Ciencias Naturales',
  'Lengua y Literatura',
  'Inglés',
  'Educación Física',
]

function ProfesorNotasPage() {
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState('5° Básico')
  const [gradeBook, setGradeBook] = useState({})
  const [selectedStudent, setSelectedStudent] = useState(BASE_STUDENTS[0])
  const [selectedSubject, setSelectedSubject] = useState(SUBJECTS[0])
  const [evaluationDate, setEvaluationDate] = useState('')
  const [evaluationName, setEvaluationName] = useState('')
  const [evaluationScore, setEvaluationScore] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const savedCourse = localStorage.getItem('selectedCourse')

    if (savedCourse) {
      setSelectedCourse(savedCourse)
    } else {
      navigate('/profesor/seleccion-curso')
    }
  }, [navigate])

  const gradesStorageKey = useMemo(
    () => `grades_${selectedCourse}`,
    [selectedCourse]
  )

  useEffect(() => {
    const savedGrades = localStorage.getItem(gradesStorageKey)
    if (savedGrades) {
      setGradeBook(JSON.parse(savedGrades))
    } else {
      setGradeBook({})
    }
  }, [gradesStorageKey])

  const tabs = [
  { label: 'Resumen', value: 'resumen', path: '/profesor/dashboard' },
  { label: 'Notas', value: 'notas', path: '/profesor/notas' },
  { label: selectedCourse, value: 'curso', path: '/profesor/seleccion-curso' },
  { label: 'Asistencia', value: 'asistencia', path: '/profesor/asistencia' },
]

  const handleTabClick = (tab) => {
    if (tab.path) navigate(tab.path)
  }

  const entryKey = `${selectedStudent}__${selectedSubject}`
  const currentEntries = (gradeBook[entryKey] || []).sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  )

  const average =
    currentEntries.length > 0
      ? (
          currentEntries.reduce((acc, item) => acc + Number(item.score), 0) /
          currentEntries.length
        ).toFixed(1)
      : '--'

  const handleAddGrade = () => {
    if (!evaluationDate || !evaluationName.trim() || !evaluationScore) {
      setMessage('Completa fecha, nombre de evaluación y calificación.')
      return
    }

    const numericScore = Number(evaluationScore)

    if (Number.isNaN(numericScore) || numericScore < 1 || numericScore > 7) {
      setMessage('La calificación debe estar entre 1.0 y 7.0.')
      return
    }

    const newEntry = {
      id: crypto.randomUUID(),
      date: evaluationDate,
      title: evaluationName.trim(),
      score: numericScore.toFixed(1),
    }

    const updatedEntries = [...currentEntries, newEntry].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    )

    const updatedGradeBook = {
      ...gradeBook,
      [entryKey]: updatedEntries,
    }

    setGradeBook(updatedGradeBook)
    localStorage.setItem(gradesStorageKey, JSON.stringify(updatedGradeBook))

    setEvaluationDate('')
    setEvaluationName('')
    setEvaluationScore('')
    setMessage(`Calificación agregada para ${selectedStudent} en ${selectedSubject}.`)
  }

  const handleDeleteGrade = (id) => {
    const updatedEntries = currentEntries.filter((entry) => entry.id !== id)

    const updatedGradeBook = {
      ...gradeBook,
      [entryKey]: updatedEntries,
    }

    setGradeBook(updatedGradeBook)
    localStorage.setItem(gradesStorageKey, JSON.stringify(updatedGradeBook))
    setMessage('Calificación eliminada.')
  }

  return (
    <RoleLayout background="linear-gradient(135deg, #eab308 0%, #facc15 100%)">
      <TopNavbar
        subtitle="Gestión Académica"
        title={`NOTAS - ${selectedCourse}`}
        tabs={tabs}
        activeTab="notas"
        onTabClick={handleTabClick}
      />

      {message && <div style={styles.messageBanner}>{message}</div>}

      <section style={styles.grid}>
        <InfoCard title="Ingreso de Calificaciones" minHeight="auto">
          <div style={styles.formGrid}>
            <div style={styles.field}>
              <label style={styles.label}>Alumno</label>
              <select
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                style={styles.select}
              >
                {BASE_STUDENTS.map((student) => (
                  <option key={student} value={student}>
                    {student}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Ramo</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                style={styles.select}
              >
                {SUBJECTS.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Fecha</label>
              <input
                type="date"
                value={evaluationDate}
                onChange={(e) => setEvaluationDate(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Evaluación</label>
              <input
                type="text"
                placeholder="Ej: Prueba 1"
                value={evaluationName}
                onChange={(e) => setEvaluationName(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>Calificación</label>
              <input
                type="number"
                min="1"
                max="7"
                step="0.1"
                placeholder="Ej: 6.3"
                value={evaluationScore}
                onChange={(e) => setEvaluationScore(e.target.value)}
                style={styles.input}
              />
            </div>

            <div style={styles.buttonBox}>
              <button style={styles.addButton} onClick={handleAddGrade}>
                Agregar Nota
              </button>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Resumen del Alumno" minHeight="auto">
          <div style={styles.summaryBox}>
            <p style={styles.summaryLine}>
              <strong>Alumno:</strong> {selectedStudent}
            </p>
            <p style={styles.summaryLine}>
              <strong>Ramo:</strong> {selectedSubject}
            </p>
            <p style={styles.summaryLine}>
              <strong>Evaluaciones registradas:</strong> {currentEntries.length}
            </p>
            <p style={styles.summaryLine}>
              <strong>Promedio actual:</strong> {average}
            </p>
          </div>
        </InfoCard>

        <div style={styles.fullWidth}>
          <InfoCard title="Historial de Calificaciones" minHeight="auto">
            <div style={styles.tableHeader}>
              <span>Fecha</span>
              <span>Evaluación</span>
              <span>Calificación</span>
              <span>Acción</span>
            </div>

            {currentEntries.length === 0 ? (
              <p style={styles.emptyState}>
                Aún no hay calificaciones registradas para este alumno y ramo.
              </p>
            ) : (
              currentEntries.map((entry) => (
                <div key={entry.id} style={styles.tableRow}>
                  <span>{entry.date}</span>
                  <span>{entry.title}</span>
                  <span style={styles.scoreBadge}>{entry.score}</span>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteGrade(entry.id)}
                  >
                    Eliminar
                  </button>
                </div>
              ))
            )}
          </InfoCard>
        </div>
      </section>
    </RoleLayout>
  )
}

const styles = {
  messageBanner: {
    background: '#f8fafc',
    color: '#111827',
    padding: '14px 18px',
    borderRadius: '14px',
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '18px',
    boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '1.3fr 0.9fr',
    gap: '18px',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  formGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '16px',
    fontWeight: '700',
    color: '#374151',
  },
  input: {
    border: 'none',
    background: '#f9fafb',
    padding: '14px 16px',
    borderRadius: '12px',
    fontSize: '16px',
    boxShadow: 'inset 0 0 0 1px #e5e7eb',
  },
  select: {
    border: 'none',
    background: '#f9fafb',
    padding: '14px 16px',
    borderRadius: '12px',
    fontSize: '16px',
    boxShadow: 'inset 0 0 0 1px #e5e7eb',
  },
  buttonBox: {
    display: 'flex',
    alignItems: 'end',
  },
  addButton: {
    border: 'none',
    background: '#2563eb',
    color: '#ffffff',
    padding: '14px 18px',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    width: '100%',
  },
  summaryBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  summaryLine: {
    fontSize: '18px',
    color: '#111827',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr 1fr',
    gap: '16px',
    fontSize: '18px',
    fontWeight: '700',
    color: '#111827',
    paddingBottom: '12px',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '6px',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 2fr 1fr 1fr',
    gap: '16px',
    alignItems: 'center',
    padding: '14px 0',
    fontSize: '17px',
    color: '#111827',
    borderBottom: '1px solid #f3f4f6',
  },
  scoreBadge: {
    display: 'inline-block',
    background: '#dbeafe',
    color: '#1d4ed8',
    padding: '8px 12px',
    borderRadius: '999px',
    fontWeight: '800',
    width: 'fit-content',
  },
  deleteButton: {
    border: 'none',
    background: '#fee2e2',
    color: '#991b1b',
    padding: '10px 14px',
    borderRadius: '10px',
    fontWeight: '700',
    cursor: 'pointer',
    width: 'fit-content',
  },
  emptyState: {
    padding: '18px 0',
    color: '#6b7280',
    fontSize: '17px',
  },
}

export default ProfesorNotasPage