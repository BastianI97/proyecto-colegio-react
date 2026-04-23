import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const menuItems = [
  { label: 'Panel', icon: '🖼️' },
  { label: 'Documentos', icon: '📄' },
  { label: 'Configuración', icon: '⚙️' },
  { label: 'Notificaciones', icon: '🔔' },
  { label: 'Mensajes', icon: '✉️' },
]

function Sidebar() {
  const navigate = useNavigate()
  const { logout } = useAuth()

  const handleGoToLogin = () => {
    logout()
    localStorage.removeItem('selectedCourse')
    navigate('/login')
  }

  return (
    <aside style={styles.sidebar}>
      <button
        style={styles.logoButton}
        onClick={handleGoToLogin}
        title="Cerrar sesión e ir al login"
      >
        🎓
      </button>

      <nav style={styles.nav}>
        {menuItems.map((item, index) => (
          <div key={index} style={styles.navItem} title={item.label}>
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
  logoButton: {
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
    border: 'none',
    cursor: 'pointer',
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