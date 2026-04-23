import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const handleLogin = (role) => {
    login(role)

    if (role === 'PROFESOR') navigate('/profesor/seleccion-curso')
    if (role === 'ALUMNO') navigate('/alumno/dashboard')
    if (role === 'APODERADO') navigate('/apoderado/dashboard')
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Libro de Clases Digital</h1>
        <p style={styles.subtitle}>Colegio Bernardo O&apos;Higgins</p>
        <p style={styles.branchTag}>Versión de prueba - rama dev-bastian</p> //agregado

        <div style={styles.buttonContainer}>
          <button style={styles.profesorButton} onClick={() => handleLogin('PROFESOR')}>
            Entrar como Profesor
          </button>

          <button style={styles.alumnoButton} onClick={() => handleLogin('ALUMNO')}>
            Entrar como Alumno
          </button>

          <button style={styles.apoderadoButton} onClick={() => handleLogin('APODERADO')}>
            Entrar como Apoderado
          </button>
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f3f4f6',
    padding: '20px',
  },

  branchTag: {
  marginBottom: '20px',
  color: '#2563eb',
  fontSize: '14px', //agregado
  fontWeight: '600',
},

  card: {
    background: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '420px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '8px',
    fontSize: '28px',
  },
  subtitle: {
    marginBottom: '24px',
    color: '#6b7280',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  profesorButton: {
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    background: '#facc15',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  alumnoButton: {
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    background: '#4ade80',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  apoderadoButton: {
    padding: '12px',
    border: 'none',
    borderRadius: '10px',
    background: '#f87171',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
}

export default LoginPage