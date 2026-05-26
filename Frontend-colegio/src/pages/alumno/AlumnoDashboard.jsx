import { useNavigate } from 'react-router-dom'
import RoleLayout from '../../components/layout/RoleLayout'
import ProfileHeader from '../../components/common/ProfileHeader'
import HeroBanner from '../../components/common/HeroBanner'
import InfoCard from '../../components/common/InfoCard'

import { useEffect, useState } from 'react'              //ambos agragados
import { obtenerResumenAlumno } from '../../api/alumnoService'


function AlumnoDashboard() {
  const navigate = useNavigate()


  const [resumenBackend, setResumenBackend] = useState(null)

useEffect(() => {
  obtenerResumenAlumno(1)
    .then((data) => {
      setResumenBackend(data)
    })
    .catch((error) => {
      console.error('Error al obtener datos del backend:', error)
    })
}, [])

const promedioBackend = resumenBackend?.promedio ?? 6.8
const asistenciaBackend = resumenBackend?.asistencia?.porcentajeAsistencia ?? 96

  const tabs = [
    { label: 'Mi Grado: 5° Grado B', value: 'grado', path: '/alumno/dashboard' },
    { label: 'mis asignaturas', value: 'asignaturas', path: '/alumno/asignaturas' },
    { label: 'horarios', value: 'horarios', path: '/alumno/horario' },
    { label: 'mis calificaciones', value: 'calificaciones', path: '/alumno/calificaciones' },
  ]

  const handleTabClick = (tab) => {
    if (tab.path) navigate(tab.path)
  }

  return (
    <RoleLayout background="linear-gradient(135deg, #059669 0%, #22c55e 100%)">
      <ProfileHeader
        name="HÉCTOR GONZÁLEZ"
        title="5° GRADO B"
        avatar="👦"
        tabs={tabs}
        activeTab="asignaturas"
        onTabClick={handleTabClick}
        nameColor="rgba(255,255,255,0.9)"
        titleColor="#ffffff"
      />


      <HeroBanner
        title="Mis Compañeros"
        subtitle="(Estudiante Héctor González)"
        height="200px"
        background="linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,193,7,0.35))"
        overlay="linear-gradient(90deg, rgba(0,0,0,0.22), rgba(0,0,0,0.05))"
      />

      <section style={styles.grid}>
        <InfoCard title="Mi Asistencia Individual">
          <div style={styles.cardContent}>
            <div style={styles.circle}>{Math.round(asistenciaBackend)}%</div>

            <div style={styles.fakeChart}>
              <div style={styles.chartLineGreen}></div>
              <div style={styles.chartLineBlue}></div>
            </div>
          </div>

          <p style={styles.cardFooter}>● Presentes / Ausentes</p>
        </InfoCard>

        <InfoCard title="Mi Promedio General">
          <div style={styles.cardContent}>
            <div>
              <div style={styles.bigNumber}>{Number(promedioBackend).toFixed(1)}</div>
              <p style={styles.scaleText}>1.0 - 7.0</p>
            </div>

            <div style={styles.fakeBars}>
              <div style={{ ...styles.bar, height: '78px' }}></div>
              <div style={{ ...styles.bar, height: '72px', background: '#facc15' }}></div>
              <div style={{ ...styles.bar, height: '76px', background: '#06b6d4' }}></div>
            </div>
          </div>
        </InfoCard>

        <InfoCard title="Mis Tareas y Tareas Pendientes">
          <ul style={styles.list}>
            <li>□ Entregar Ensayo de Historia Individual</li>
            <li>□ Leer Capítulo 4 de Historia Individual</li>
            <li>□ Terminar actividad de Ciencias</li>
          </ul>
        </InfoCard>

     

        <InfoCard title="Mis Notificaciones Individuales">
          <div style={styles.notificationBox}>
            Recordatorio: Tu proyecto de Ciencias debe entregarse mañana.
          </div>

          <div style={styles.notificationBox}>
            Aviso: Se actualizó tu promedio de Matemáticas.
          </div>
        </InfoCard>
      </section>
    </RoleLayout>
  )
}

const styles = {
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
  chartLineGreen: {
    position: 'absolute',
    left: '10%',
    right: '12%',
    bottom: '26%',
    height: '3px',
    background: '#22c55e',
    transform: 'skewY(-10deg)',
    boxShadow:
      '36px -18px 0 #22c55e, 74px -8px 0 #22c55e, 112px -26px 0 #22c55e, 150px -6px 0 #22c55e',
  },
  chartLineBlue: {
    position: 'absolute',
    left: '8%',
    right: '14%',
    bottom: '20%',
    height: '3px',
    background: '#2563eb',
    transform: 'skewY(-12deg)',
    boxShadow:
      '34px -25px 0 #2563eb, 72px -12px 0 #2563eb, 110px -28px 0 #2563eb, 148px -10px 0 #2563eb',
  },
  cardFooter: {
    marginTop: '14px',
    color: '#4b5563',
    fontSize: '18px',
  },
  bigNumber: {
    fontSize: '88px',
    fontWeight: '800',
    color: '#111827',
    lineHeight: 1,
  },
  scaleText: {
    fontSize: '20px',
    color: '#4b5563',
    marginTop: '6px',
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

export default AlumnoDashboard