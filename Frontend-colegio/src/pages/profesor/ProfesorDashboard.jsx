import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoleLayout from '../../components/layout/RoleLayout'
import TopNavbar from '../../components/layout/TopNavbar'
import HeroBanner from '../../components/common/HeroBanner'
import InfoCard from '../../components/common/InfoCard'

function ProfesorDashboard() {
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState('5° Básico')

  useEffect(() => {
    const savedCourse = localStorage.getItem('selectedCourse')
    if (savedCourse) {
      setSelectedCourse(savedCourse)
    }
  }, [])

  const tabs = [
    { label: 'Notas', value: 'notas', path: '/profesor/dashboard' },
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

  return (
    <RoleLayout background="linear-gradient(135deg, #eab308 0%, #facc15 100%)">
      <TopNavbar
        subtitle="Resumen General"
        title={`LIBRO DE CLASES - ${selectedCourse}`}
        tabs={tabs}
        activeTab="notas"
        actions={actions}
        onTabClick={handleTabClick}
      />

      <div style={styles.searchRow}>
        <input placeholder="Ingresar Nombre Alumno/RUT" style={styles.searchInput} />
      </div>

      <HeroBanner
        title="Nuestra Clase"
        subtitle="Compañeros del curso seleccionado"
        height="220px"
      />

      <section style={styles.grid}>
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