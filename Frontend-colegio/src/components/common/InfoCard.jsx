function InfoCard({ title, children, minHeight = '220px' }) {
  return (
    <div style={{ ...styles.card, minHeight }}>
      {title && <h3 style={styles.cardTitle}>{title}</h3>}
      {children}
    </div>
  )
}

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: '24px',
    padding: '24px',
    boxShadow: '0 10px 24px rgba(0,0,0,0.10)',
  },
  cardTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '18px',
    color: '#111827',
  },
}

export default InfoCard