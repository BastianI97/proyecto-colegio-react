function HeroBanner({
  title,
  subtitle,
  height = '220px',
  overlay = 'linear-gradient(90deg, rgba(0,0,0,0.28), rgba(0,0,0,0.05))',
  background = 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(0,0,0,0.05))',
}) {
  return (
    <section style={{ ...styles.heroBanner, height, background }}>
      <div style={{ ...styles.heroOverlay, background: overlay }}>
        <h2 style={styles.heroTitle}>{title}</h2>
        {subtitle && <p style={styles.heroText}>{subtitle}</p>}
      </div>
    </section>
  )
}

const styles = {
  heroBanner: {
    borderRadius: '28px',
    marginBottom: '20px',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: '0 10px 25px rgba(0,0,0,0.12)',
  },
  heroOverlay: {
    position: 'absolute',
    inset: 0,
    padding: '28px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: '32px',
    fontWeight: '800',
  },
  heroText: {
    color: '#ffffff',
    fontSize: '18px',
  },
}

export default HeroBanner