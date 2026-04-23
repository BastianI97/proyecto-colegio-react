import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RoleLayout from '../../components/layout/RoleLayout'
import TopNavbar from '../../components/layout/TopNavbar'
import HeroBanner from '../../components/common/HeroBanner'
import InfoCard from '../../components/common/InfoCard'

function ProfesorAsistenciaPage() {
  const navigate = useNavigate()
  const [selectedCourse, setSelectedCourse] = useState('5° Básico')

  useEffect(() => {
    const savedCourse = localStorage.getItem('selectedCourse')
    if (savedCourse) {
      setSelectedCourse(savedCourse)
    }
  }, [])

  const students = [
    { id: 1, name: 'Héctor González', present: true },
    { id: 2, name: 'Sofía Rojas', present: true },
    { id: 3, name: 'Martín Pérez', present: false },
    { id: 4, name: 'Valentina Díaz', present: true },
    { id: 5, name: 'Benjamín Soto', present: false },
    { id: 6, name: 'Amanda Torres', present: true },
  ]

  const tabs = [
    { label: 'Notas', value: 'notas', path: '/profesor/dashboard' },
    { label: selectedCourse, value: 'curso', path: '/profesor/seleccion-curso' },
    { label: 'Asistencia', value: 'asistencia', path: '/profesor/asistencia' },
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
        activeTab="asistencia"
        actions={[{ label: 'Pasar Asistencia ✓', background: '#f8f4e8', color: '#111827' }]}
        onTabClick={handleTabClick}
      />

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
      </section>

      <InfoCard title="Listado de Asistencia" minHeight="auto">
        <div style={styles.tableHeader}>
          <span>Alumno</span>
          <span>Estado</span>
        </div>

        {students.map((student) => (
          <div key={student.id} style={styles.tableRow}>
            <span>{student.name}</span>
            <span style={student.present ? styles.presentBadge : styles.absentBadge}>
              {student.present ? 'Presente' : 'Ausente'}
            </span>
          </div>
        ))}
      </InfoCard>
    </RoleLayout>
  )
}

const styles = {
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
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
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
    gridTemplateColumns: '2fr 1fr',
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
}

export default ProfesorAsistenciaPage