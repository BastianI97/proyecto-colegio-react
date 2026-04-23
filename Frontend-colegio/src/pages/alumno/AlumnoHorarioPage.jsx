import { useNavigate } from 'react-router-dom'
import RoleLayout from '../../components/layout/RoleLayout'
import ProfileHeader from '../../components/common/ProfileHeader'

function AlumnoHorarioPage() {
  const navigate = useNavigate()

  const tabs = [
    { label: 'Mi Grado: 5° Grado B', value: 'grado', path: '/alumno/dashboard' },
    { label: 'mis asignaturas', value: 'asignaturas', path: '/alumno/dashboard' },
    { label: 'horarios', value: 'horarios', path: '/alumno/horario' },
    { label: 'mis calificaciones', value: 'calificaciones', path: '/alumno/calificaciones' },
  ]

  const handleTabClick = (tab) => {
    if (tab.path) navigate(tab.path)
  }

  const schedule = [
    {
      time: '08:00 A 08:45',
      lunes: 'CS. NATURALES',
      martes: 'HABILIDADES TECNOLÓGICAS',
      miercoles: 'ED. FÍSICA',
      jueves: 'VISUALES',
      viernes: 'MÚSICA',
    },
    {
      time: '08:45 A 9:30',
      lunes: 'CS. NATURALES',
      martes: 'HABILIDADES TECNOLÓGICAS',
      miercoles: 'ED. FÍSICA',
      jueves: 'VISUALES',
      viernes: 'MÚSICA',
    },
    {
      time: '09:45 A 10:30',
      lunes: 'ORIENTACIÓN',
      martes: 'HABILIDADES EMOCIONALES',
      miercoles: 'LENGUAJE',
      jueves: 'MATEMÁTICAS',
      viernes: 'INGLÉS',
    },
    {
      time: '10:30 A 11:15',
      lunes: 'INGLÉS',
      martes: 'HABILIDADES EMOCIONALES',
      miercoles: 'LENGUAJE',
      jueves: 'MATEMÁTICAS',
      viernes: 'INGLÉS',
    },
    {
      time: '11:30 A 12:15',
      lunes: 'Polideportivo',
      martes: 'TECNOLOGÍA',
      miercoles: 'CS. SOCIALES',
      jueves: 'CS. SOCIALES',
      viernes: 'MATEMÁTICAS',
    },
    {
      time: '12:15 A 13:00',
      lunes: 'Polideportivo',
      martes: 'TECNOLOGÍA',
      miercoles: 'CS. SOCIALES',
      jueves: 'CS. SOCIALES',
      viernes: 'MATEMÁTICAS',
    },
    {
      time: '14:00 A 14:45',
      lunes: 'LENGUAJE',
      martes: 'CS. NATURALES',
      miercoles: 'MATEMÁTICAS',
      jueves: 'LENGUAJE',
      viernes: '',
    },
    {
      time: '14:45 A 15:30',
      lunes: 'LENGUAJE',
      martes: 'CS. NATURALES',
      miercoles: 'MATEMÁTICAS',
      jueves: 'LENGUAJE',
      viernes: '',
    },
  ]

  const getClassStyle = (subject) => {
    const colors = {
      'CS. NATURALES': '#7ed957',
      'HABILIDADES TECNOLÓGICAS': '#5dd9e6',
      'ED. FÍSICA': '#bfc3c8',
      VISUALES: '#f3ff00',
      'MÚSICA': '#f28aa6',
      ORIENTACIÓN: '#ff9d4d',
      INGLÉS: '#f3c4e8',
      'HABILIDADES EMOCIONALES': '#ff9d4d',
      LENGUAJE: '#ff5c5c',
      MATEMÁTICAS: '#5b73ff',
      Polideportivo: '#c9a4f5',
      TECNOLOGÍA: '#62dbe4',
      'CS. SOCIALES': '#f5de59',
      '': '#f3e9f5',
    }

    return {
      ...styles.subjectBlock,
      background: colors[subject] || '#e5e7eb',
    }
  }

  return (
    <RoleLayout background="#ffffff">
      <ProfileHeader
        name="HÉCTOR GONZÁLEZ"
        title="5° GRADO B"
        subtitle="🟢 Nivel 5° B - Cohorte 2024"
        tabs={tabs}
        activeTab="horarios"
        onTabClick={handleTabClick}
      />

      <h2 style={styles.pageTitle}>MI HORARIO SEMANAL</h2>

      <section style={styles.tableWrapper}>
        <div style={styles.tableHeader}>
          <div style={styles.timeHeader}>Time</div>
          <div style={styles.dayHeader}>Lunes</div>
          <div style={styles.dayHeader}>Martes</div>
          <div style={{ ...styles.dayHeader, ...styles.activeDay }}>Miércoles</div>
          <div style={styles.dayHeader}>Jueves</div>
          <div style={styles.dayHeader}>Viernes</div>
        </div>

        <div style={styles.tableBody}>
          {schedule.slice(0, 2).map((row, index) => (
            <div key={index} style={styles.row}>
              <div style={styles.timeCell}>{row.time}</div>
              <div style={getClassStyle(row.lunes)}>{row.lunes}</div>
              <div style={getClassStyle(row.martes)}>{row.martes}</div>
              <div style={{ ...getClassStyle(row.miercoles), ...styles.activeColumn }}>{row.miercoles}</div>
              <div style={getClassStyle(row.jueves)}>{row.jueves}</div>
              <div style={getClassStyle(row.viernes)}>{row.viernes}</div>
            </div>
          ))}

          <div style={styles.breakRow}>RECREO</div>

          {schedule.slice(2, 4).map((row, index) => (
            <div key={index + 10} style={styles.row}>
              <div style={styles.timeCell}>{row.time}</div>
              <div style={getClassStyle(row.lunes)}>{row.lunes}</div>
              <div style={getClassStyle(row.martes)}>{row.martes}</div>
              <div style={{ ...getClassStyle(row.miercoles), ...styles.activeColumn }}>{row.miercoles}</div>
              <div style={getClassStyle(row.jueves)}>{row.jueves}</div>
              <div style={getClassStyle(row.viernes)}>{row.viernes}</div>
            </div>
          ))}

          <div style={styles.breakRow}>RECREO</div>

          {schedule.slice(4, 6).map((row, index) => (
            <div key={index + 20} style={styles.row}>
              <div style={styles.timeCell}>{row.time}</div>
              <div style={getClassStyle(row.lunes)}>{row.lunes}</div>
              <div style={getClassStyle(row.martes)}>{row.martes}</div>
              <div style={{ ...getClassStyle(row.miercoles), ...styles.activeColumn }}>{row.miercoles}</div>
              <div style={getClassStyle(row.jueves)}>{row.jueves}</div>
              <div style={getClassStyle(row.viernes)}>{row.viernes}</div>
            </div>
          ))}

          <div style={styles.breakRow}>ALMUERZO</div>

          {schedule.slice(6, 8).map((row, index) => (
            <div key={index + 30} style={styles.row}>
              <div style={styles.timeCell}>{row.time}</div>
              <div style={getClassStyle(row.lunes)}>{row.lunes}</div>
              <div style={getClassStyle(row.martes)}>{row.martes}</div>
              <div style={{ ...getClassStyle(row.miercoles), ...styles.activeColumn }}>{row.miercoles}</div>
              <div style={getClassStyle(row.jueves)}>{row.jueves}</div>
              <div style={getClassStyle(row.viernes)}>{row.viernes}</div>
            </div>
          ))}
        </div>
      </section>
    </RoleLayout>
  )
}

const styles = {
  pageTitle: {
    fontSize: '54px',
    fontWeight: '800',
    textAlign: 'center',
    color: '#111827',
    marginBottom: '24px',
  },
  tableWrapper: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '8px 8px 20px 8px',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '160px repeat(5, 1fr)',
    gap: '12px',
    marginBottom: '12px',
    alignItems: 'end',
  },
  timeHeader: {
    fontSize: '24px',
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
  },
  dayHeader: {
    fontSize: '24px',
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
  },
  activeDay: {
    background: '#d9ffd5',
    borderRadius: '18px',
    padding: '12px',
    boxShadow: '0 0 0 3px rgba(74, 222, 128, 0.35)',
  },
  tableBody: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '160px repeat(5, 1fr)',
    gap: '12px',
    alignItems: 'center',
  },
  timeCell: {
    fontSize: '18px',
    color: '#111827',
    textAlign: 'center',
  },
  subjectBlock: {
    minHeight: '52px',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '8px 12px',
    fontSize: '16px',
    fontWeight: '700',
    textAlign: 'center',
    color: '#111827',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  },
  activeColumn: {
    boxShadow: '0 0 0 3px rgba(74, 222, 128, 0.28)',
  },
  breakRow: {
    background: '#d9f8fb',
    borderRadius: '18px',
    minHeight: '54px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: '700',
    color: '#111827',
    margin: '4px 0',
  },
}

export default AlumnoHorarioPage