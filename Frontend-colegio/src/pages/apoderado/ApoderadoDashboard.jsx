import RoleLayout from '../../components/layout/RoleLayout'
import TopMenuBar from '../../components/common/TopMenuBar'

function ApoderadoDashboard() {
  const requests = [
    {
      type: 'Justificación de Falta - 15/Oct',
      date: '15/Oct/2023',
      status: 'Pendiente',
    },
    {
      type: 'Certificado de Alumno Regular - 10/Oct',
      date: '10/Oct/2023',
      status: 'Entregado',
    },
  ]

  return (
    <RoleLayout background="linear-gradient(135deg, #a50022 0%, #d9153b 100%)">
      <TopMenuBar showSearch showUser />

      <section style={styles.section}>
        <h1 style={styles.mainTitle}>asistencia</h1>

        <div style={styles.statsBox}>
          <div style={styles.statItem}>📉 Faltas Totales: 2</div>
          <div style={styles.statItem}>📝 Inasistencias Justificadas: 1</div>
          <div style={styles.statItem}>📅 Última Asistencia: 15 de Oct</div>
          <div style={styles.statItem}>👨‍🎓 Última Asistencia: 15 de Oct</div>
        </div>
      </section>

      <section style={styles.section}>
        <h2 style={styles.secondaryTitle}>solicitudes</h2>

        <div style={styles.tableCard}>
          <div style={styles.tableHeader}>
            <span>Tipo</span>
            <span>Fecha</span>
            <span>Estado</span>
          </div>

          {requests.map((request) => (
            <div key={request.type} style={styles.tableRow}>
              <span>{request.type}</span>
              <span>{request.date}</span>
              <span>{request.status}</span>
            </div>
          ))}
        </div>
      </section>
    </RoleLayout>
  )
}

const styles = {
  section: {
    marginBottom: '34px',
  },
  mainTitle: {
    fontSize: '76px',
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'lowercase',
    marginBottom: '22px',
    textShadow: '0 4px 10px rgba(0,0,0,0.2)',
  },
  secondaryTitle: {
    fontSize: '76px',
    fontWeight: '800',
    color: '#ffffff',
    textTransform: 'lowercase',
    marginBottom: '22px',
    textShadow: '0 4px 10px rgba(0,0,0,0.2)',
  },
  statsBox: {
    background: 'rgba(95, 0, 20, 0.28)',
    borderRadius: '28px',
    padding: '30px 36px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '24px',
    color: '#fef2f2',
    fontSize: '22px',
    boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
  },
  statItem: {
    fontWeight: '500',
  },
  tableCard: {
    background: 'rgba(95, 0, 20, 0.28)',
    borderRadius: '28px',
    padding: '26px 36px',
    boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
    color: '#fff7f7',
  },
  tableHeader: {
    display: 'grid',
    gridTemplateColumns: '2.2fr 1fr 1fr',
    gap: '20px',
    fontSize: '22px',
    fontWeight: '800',
    paddingBottom: '14px',
    borderBottom: '1px solid rgba(255,255,255,0.35)',
    marginBottom: '10px',
  },
  tableRow: {
    display: 'grid',
    gridTemplateColumns: '2.2fr 1fr 1fr',
    gap: '20px',
    fontSize: '20px',
    padding: '16px 0',
    borderBottom: '1px solid rgba(255,255,255,0.22)',
  },
}

export default ApoderadoDashboard