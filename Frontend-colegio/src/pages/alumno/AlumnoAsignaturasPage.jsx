import { useNavigate } from 'react-router-dom'
import RoleLayout from '../../components/layout/RoleLayout'
import ProfileHeader from '../../components/common/ProfileHeader'
import InfoCard from '../../components/common/InfoCard'

function AlumnoAsignaturasPage() {
  const navigate = useNavigate()

  const tabs = [
    { label: 'Mi Grado: 5° Grado B', value: 'grado', path: '/alumno/dashboard' },
    { label: 'mis asignaturas', value: 'asignaturas', path: '/alumno/asignaturas' },
    { label: 'horarios', value: 'horarios', path: '/alumno/horario' },
    { label: 'mis calificaciones', value: 'calificaciones', path: '/alumno/calificaciones' },
  ]

  const subjects = [
    {
      name: 'Matemáticas',
      teacher: 'Profesora Andrea Soto',
      color: '#4f8df7',
      description: 'Álgebra, geometría y resolución de problemas.',
    },
    {
      name: 'Historia',
      teacher: 'Profesor Luis Herrera',
      color: '#e7b53b',
      description: 'Procesos históricos, ciudadanía y patrimonio.',
    },
    {
      name: 'Ciencias Naturales',
      teacher: 'Profesora Camila Rojas',
      color: '#2eb67d',
      description: 'Seres vivos, energía, materia y experimentación.',
    },
    {
      name: 'Lengua y Literatura',
      teacher: 'Profesora Daniela Muñoz',
      color: '#b04ac9',
      description: 'Lectura, escritura, comprensión y expresión oral.',
    },
    {
      name: 'Inglés',
      teacher: 'Profesora Fernanda Vega',
      color: '#f28aa6',
      description: 'Vocabulario, gramática y comunicación básica.',
    },
    {
      name: 'Educación Física',
      teacher: 'Profesor Marco Díaz',
      color: '#9ca3af',
      description: 'Actividad física, coordinación y trabajo en equipo.',
    },
  ]

  const handleTabClick = (tab) => {
    if (tab.path) navigate(tab.path)
  }

  return (
    <RoleLayout background="linear-gradient(135deg, #059669 0%, #22c55e 100%)">
      <ProfileHeader
        name="HÉCTOR GONZÁLEZ"
        title="5° GRADO B"
        subtitle="Nivel 5° B - Cohorte 2024"
        avatar="👦"
        tabs={tabs}
        activeTab="asignaturas"
        onTabClick={handleTabClick}
        nameColor="rgba(255,255,255,0.9)"
        titleColor="#ffffff"
        subtitleColor="rgba(255,255,255,0.9)"
      />

      <section style={styles.headerBox}>
        <h2 style={styles.pageTitle}>Mis Asignaturas</h2>
        <p style={styles.pageSubtitle}>
          Revisión general de ramos, docentes y enfoque de aprendizaje.
        </p>
      </section>

      <section style={styles.grid}>
        {subjects.map((subject) => (
          <InfoCard key={subject.name} minHeight="auto">
            <div
              style={{
                ...styles.subjectCard,
                background: `linear-gradient(135deg, ${subject.color}, #ffffff)`,
              }}
            >
              <h3 style={styles.subjectTitle}>{subject.name}</h3>
              <p style={styles.teacher}>{subject.teacher}</p>
              <p style={styles.description}>{subject.description}</p>
              <button style={styles.button}>Ver detalle</button>
            </div>
          </InfoCard>
        ))}
      </section>
    </RoleLayout>
  )
}

const styles = {
  headerBox: {
    background: 'rgba(255,255,255,0.16)',
    borderRadius: '24px',
    padding: '24px',
    marginBottom: '20px',
    backdropFilter: 'blur(4px)',
  },
  pageTitle: {
    fontSize: '34px',
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: '8px',
  },
  pageSubtitle: {
    fontSize: '18px',
    color: 'rgba(255,255,255,0.92)',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '18px',
  },
  subjectCard: {
    borderRadius: '18px',
    padding: '22px',
  },
  subjectTitle: {
    fontSize: '28px',
    fontWeight: '800',
    color: '#111827',
    marginBottom: '10px',
  },
  teacher: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: '12px',
  },
  description: {
    fontSize: '17px',
    color: '#374151',
    lineHeight: 1.5,
    marginBottom: '18px',
  },
  button: {
    border: 'none',
    background: '#ffffff',
    color: '#111827',
    padding: '12px 18px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '700',
    boxShadow: '0 6px 14px rgba(0,0,0,0.08)',
  },
}

export default AlumnoAsignaturasPage