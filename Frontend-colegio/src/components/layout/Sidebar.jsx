import { NavLink } from 'react-router-dom'

const menuItems = [
  { label: 'Inicio', path: '#', icon: '🎓' },
  { label: 'Panel', path: '#', icon: '🖼️' },
  { label: 'Documentos', path: '#', icon: '📄' },
  { label: 'Configuración', path: '#', icon: '⚙️' },
  { label: 'Notificaciones', path: '#', icon: '🔔' },
  { label: 'Mensajes', path: '#', icon: '✉️' },
]

function Sidebar() {
  return (
    <aside style={styles.sidebar}>
      <div style={styles.logo}>🎓</div>

      <nav style={styles.nav}>
        {menuItems.map((item, index) => (
          <div key={index} style={styles.navItem}>
            <span style={styles.icon}>{item.icon}</span>
          </div>
        ))}
      </nav>
    </aside>
  )
}

const styles = {
  sidebar: {
    width: '88px',
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #2f3136 0%, #1f2024 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
    flexShrink: 0,
    boxShadow: '4px 0 14px rgba(0,0,0,0.12)',
  },
  logo: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    background: '#dc2626',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '26px',
    color: '#fff',
    marginBottom: '24px',
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    width: '100%',
    alignItems: 'center',
  },
  navItem: {
    width: '58px',
    height: '58px',
    borderRadius: '16px',
    background: 'rgba(255,255,255,0.06)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  icon: {
    fontSize: '22px',
  },
}

export default Sidebar