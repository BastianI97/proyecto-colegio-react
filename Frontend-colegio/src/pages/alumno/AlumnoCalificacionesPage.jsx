import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoleLayout from '../../components/layout/RoleLayout'
import ProfileHeader from '../../components/common/ProfileHeader'
import InfoCard from '../../components/common/InfoCard'

const STUDENT_NAME = 'Héctor González'
const DEFAULT_COURSE = '5° Básico'

function AlumnoCalificacionesPage() {
  const navigate = useNavigate()
  const [grades, setGrades] = useState({})

  const tabs = [
    { label: 'Mi Grado: 5° Grado B', value: 'grado', path: '/alumno/dashboard' },
    { label: 'mis asignaturas', value: 'asignaturas', path: '/alumno/asignaturas' },
    { label: 'horarios', value: 'horarios', path: '/alumno/horario' },
    { label: 'mis calificaciones', value: 'calificaciones', path: '/alumno/calificaciones' },
  ]

  useEffect(() => {
    const selectedCourse = localStorage.getItem('selectedCourse') || DEFAULT_COURSE
    const savedGrades = localStorage.getItem(`grades_${selectedCourse}`)

    if (savedGrades) {
      setGrades(JSON.parse(savedGrades))
    } else {
      setGrades({})
    }
  }, [])

  const handleTabClick = (tab) => {
    if (tab.path) navigate(tab.path)
  }

  const getStudentGrades = () => {
    const result = {}

    Object.keys(grades).forEach((key) => {
      const [student, subject] = key.split('__')

      if (student === STUDENT_NAME) {
        result[subject] = [...grades[key]].sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        )
      }
    })

    return result
  }

  const studentGrades = getStudentGrades()

  return (
    <RoleLayout background="linear-gradient(135deg, #9be570 0%, #b8f58a 100%)">
      <ProfileHeader
        name="HÉCTOR GONZÁLEZ"
        title="5° GRADO B"
        subtitle="Nivel 5° B - Cohorte 2024"
        avatar="👦"
        tabs={tabs}
        activeTab="calificaciones"
        onTabClick={handleTabClick}
      />

      <section style={styles.titleRow}>
        <div>
          <h2 style={styles.pageTitle}>Mi Boletín de Calificaciones - Ciclo 2024</h2>
          <div style={styles.infoBadge}>
            ℹ️ Calificaciones parciales y acumuladas hasta Junio (S2)
          </div>
        </div>

        <div style={styles.periodBadge}>🗓️ Junio (Semana 2)</div>
      </section>

      <section style={styles.grid}>
        {Object.keys(studentGrades).length === 0 ? (
          <InfoCard minHeight="auto">
            <p style={styles.emptyState}>
              Aún no hay calificaciones registradas para este alumno.
            </p>
          </InfoCard>
        ) : (
          Object.entries(studentGrades).map(([subject, entries]) => {
            const average =
              entries.length > 0
                ? (
                    entries.reduce((acc, item) => acc + Number(item.score), 0) /
                    entries.length
                  ).toFixed(1)
                : '--'

            return (
              <InfoCard key={subject} minHeight="auto">
                <div
                  style={{
                    ...styles.subjectHeader,
                    background: 'linear-gradient(135deg, #dbeafe, #ffffff)',
                  }}
                >
                  <div style={styles.subjectTitleRow}>
                    <h3 style={styles.subjectTitle}>{subject}</h3>
                  </div>

                  <div style={styles.subjectContent}>
                    <div style={styles.tableSection}>
                      <div style={styles.tableHeader}>
                        <span>Fecha</span>
                        <span>Evaluación</span>
                        <span>Nota</span>
                      </div>

                      {entries.map((item) => (
                        <div key={item.id} style={styles.tableRow}>
                          <span>{item.date}</span>
                          <span>{item.title}</span>
                          <span style={styles.scorePill}>{item.score}</span>
                        </div>
                      ))}
                    </div>

                    <div style={styles.chartBox}>
                      <div style={styles.fakeChartArea}>
                        <div style={styles.fakeLine}></div>
                      </div>
                      <p style={styles.accumulated}>
                        Promedio Acumulado: <strong>{average}</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </InfoCard>
            )
          })
        )}
      </section>
    </RoleLayout>
  )
}

const styles = {
  titleRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  pageTitle: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '10px',
  },
  infoBadge: {
    display: 'inline-block',
    background: '#dbeafe',
    color: '#1e3a8a',
    padding: '8px 14px',
    borderRadius: '999px',
    fontSize: '16px',
  },
  periodBadge: {
    background: '#f9fafb',
    color: '#111827',
    padding: '12px 18px',
    borderRadius: '14px',
    fontSize: '18px',
    boxShadow: '0 6px 16px rgba(0,0,0,0.08)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '20px',
  },
  subjectHeader: {
    borderRadius: '18px',
    padding: '22px',
  },
  subjectTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '18px',
  },
  subjectTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#111827',
  },
  subjectContent: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 1fr',
    gap: '18px',
    alignItems: 'start',
  },
  tableSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr 0.8fr',
    gap: '12px',
    fontWeight: '700',
    color: '#111827',
    fontSize: '18px',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr 0.8fr',
    gap: '12px',
    alignItems: 'center',
    fontSize: '18px',
    color: '#111827',
  },
  scorePill: {
    background: 'rgba(255,255,255,0.75)',
    padding: '8px 14px',
    borderRadius: '10px',
    textAlign: 'center',
    fontWeight: '700',
  },
  chartBox: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '180px',
  },
  fakeChartArea: {
    height: '130px',
    borderRadius: '14px',
    background: 'linear-gradient(180deg, #eff6ff, #ffffff)',
    position: 'relative',
    overflow: 'hidden',
  },
  fakeLine: {
    position: 'absolute',
    left: '10%',
    right: '12%',
    bottom: '26%',
    height: '3px',
    background: '#2563eb',
    transform: 'skewY(-10deg)',
    boxShadow:
      '34px -18px 0 #2563eb, 72px -10px 0 #2563eb, 110px -26px 0 #2563eb, 148px -14px 0 #2563eb',
  },
  accumulated: {
    marginTop: '14px',
    fontSize: '20px',
    color: '#111827',
  },
  emptyState: {
    padding: '20px',
    fontSize: '18px',
    color: '#6b7280',
  },
}

export default AlumnoCalificacionesPage