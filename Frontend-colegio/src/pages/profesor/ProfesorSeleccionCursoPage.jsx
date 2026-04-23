import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoleLayout from '../../components/layout/RoleLayout'
import TopMenuBar from '../../components/common/TopMenuBar'
import PageTabs from '../../components/common/PageTabs'

function ProfesorSeleccionCursoPage() {
  const navigate = useNavigate()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState('ingrese curso')

  const cursos = [
    '1° Básico',
    '2° Básico',
    '3° Básico',
    '4° Básico',
    '5° Básico',
    '6° Básico',
    '7° Básico',
    '8° Básico',
    'I° Medio',
    'II° Medio',
    'III° Medio',
    'IV° Medio',
  ]

  useEffect(() => {
    const savedCourse = localStorage.getItem('selectedCourse')
    if (savedCourse) {
      setSelectedCourse(savedCourse)
    }
  }, [])

  const tabs = [
  { label: 'Seleccionar curso', value: 'seleccion', path: '/profesor/seleccion-curso' },
  { label: 'Resumen', value: 'resumen', path: '/profesor/dashboard' },
  { label: 'Notas', value: 'notas', path: '/profesor/notas' },
  { label: 'Asistencia', value: 'asistencia', path: '/profesor/asistencia' },
]

  const handleTabClick = (tab) => {
    if ((tab.value === 'notas' || tab.value === 'asistencia') && selectedCourse === 'ingrese curso') {
      return
    }

    if (tab.path) navigate(tab.path)
  }

  const handleSelectCourse = (curso) => {
    setSelectedCourse(curso)
    localStorage.setItem('selectedCourse', curso)
    setIsOpen(false)
    navigate('/profesor/dashboard')
  }

  return (
    <RoleLayout background="linear-gradient(135deg, #dcae1d 0%, #f4c739 100%)">
      <TopMenuBar />

      <section style={styles.content}>
        <p style={styles.subtitle}>Resumen General</p>
        <h1 style={styles.title}>LIBRO DE CLASES</h1>

        <div style={styles.tabsWrapper}>
          <PageTabs tabs={tabs} activeTab="seleccion" onTabClick={handleTabClick} />
        </div>

        <div
          style={styles.dropdownBlock}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div style={styles.fakeSelect}>
            <span>{selectedCourse}</span>
            <span style={styles.arrow}>▾</span>
          </div>

          {isOpen && (
            <div style={styles.dropdownMenu}>
              {cursos.map((curso) => (
                <div
                  key={curso}
                  style={styles.option}
                  onClick={() => handleSelectCourse(curso)}
                >
                  {curso}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </RoleLayout>
  )
}

const styles = {
  content: {
    paddingTop: '10px',
  },
  subtitle: {
    fontSize: '28px',
    color: 'rgba(255,255,255,0.78)',
    marginBottom: '8px',
  },
  title: {
    fontSize: '72px',
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 1,
    marginBottom: '24px',
    textShadow: '0 4px 10px rgba(0,0,0,0.16)',
  },
  tabsWrapper: {
    marginBottom: '24px',
  },
  dropdownBlock: {
    position: 'relative',
    width: '280px',
  },
  fakeSelect: {
    background: '#f8f4e8',
    borderRadius: '18px',
    padding: '18px 26px',
    fontSize: '24px',
    color: '#111827',
    boxShadow: '0 8px 18px rgba(0,0,0,0.10)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arrow: {
    fontSize: '18px',
  },
  dropdownMenu: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    marginTop: '10px',
    background: '#f3f4f6',
    borderRadius: '18px',
    boxShadow: '0 14px 24px rgba(0,0,0,0.16)',
    zIndex: 20,
    maxHeight: '420px',
    overflowY: 'auto',
  },
  option: {
    padding: '14px 24px',
    fontSize: '22px',
    color: '#111827',
    borderBottom: '1px solid rgba(0,0,0,0.08)',
    background: '#f3f4f6',
    cursor: 'pointer',
  },
}

export default ProfesorSeleccionCursoPage