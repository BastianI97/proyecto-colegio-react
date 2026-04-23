function TopMenuBar({ showSearch = false, showUser = false }) {
  const menuItems = [
    'Nuestra Escuela',
    'Reglamento',
    'Postular',
    'Pago de Matrícula',
    'Horarios',
    'Biblioteca',
    'Profesores',
    'Alumnos',
    'Apoderados',
  ]

  return (
    <header style={styles.topMenu}>
      <div style={styles.logo}>🏫</div>

      <nav style={styles.menuNav}>
        {menuItems.map((item) => (
          <span key={item} style={styles.menuItem}>
            {item}
          </span>
        ))}
      </nav>

      <div style={styles.rightIcons}>
        {showSearch && <span>🔍</span>}
        {showUser && <span>👤</span>}
      </div>
    </header>
  )
}

const styles = {
  topMenu: {
    background: '#ffffff',
    borderRadius: '24px',
    minHeight: '82px',
    padding: '0 24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '20px',
    marginBottom: '28px',
    boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
    flexWrap: 'wrap',
  },
  logo: {
    fontSize: '42px',
    lineHeight: 1,
  },
  menuNav: {
    display: 'flex',
    gap: '24px',
    flexWrap: 'wrap',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    color: '#111827',
    fontSize: '18px',
  },
  menuItem: {
    cursor: 'pointer',
  },
  rightIcons: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    fontSize: '24px',
    whiteSpace: 'nowrap',
  },
}

export default TopMenuBar