import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const AUTH_API_URL = 'http://localhost:8081/api/auth/login'

function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState('maria.apoderado@colegio.cl')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const redirectByRole = (role) => {
    if (role === 'PROFESOR') navigate('/profesor/seleccion-curso')
    if (role === 'ALUMNO') navigate('/alumno/dashboard')
    if (role === 'APODERADO') navigate('/apoderado/dashboard')
  }

  const handleLoginReal = async (event) => {
    event.preventDefault()

    try {
      setLoading(true)
      setError('')

      const response = await fetch(AUTH_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })

      if (!response.ok) {
        throw new Error('Correo o contraseña incorrectos.')
      }

      const data = await response.json()
      const role = data.rol || data.role

      login(data)
      redirectByRole(role)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLoginDemo = (role) => {
    login(role)
    redirectByRole(role)
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Libro de Clases Digital</h1>
        <p style={styles.subtitle}>Colegio Bernardo O&apos;Higgins</p>

        <form style={styles.form} onSubmit={handleLoginReal}>
          <input
            style={styles.input}
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && <div style={styles.errorBox}>{error}</div>}

          <button style={styles.loginButton} type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>
        </form>

        <div style={styles.demoBox}>
          <p style={styles.demoText}>Accesos rápidos para demostración</p>

          <div style={styles.buttonContainer}>
            <button style={styles.profesorButton} onClick={() => handleLoginDemo('PROFESOR')}>
              Entrar como Profesor
            </button>

            <button style={styles.alumnoButton} onClick={() => handleLoginDemo('ALUMNO')}>
              Entrar como Alumno
            </button>

            <button style={styles.apoderadoButton} onClick={() => handleLoginDemo('APODERADO')}>
              Entrar como Apoderado Demo
            </button>
          </div>
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
  card: {
    background: '#ffffff',
    padding: '40px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
    width: '100%',
    maxWidth: '440px',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '22px',
  },
  input: {
    padding: '13px 14px',
    borderRadius: '10px',
    border: '1px solid #d1d5db',
    fontSize: '15px',
  },
  loginButton: {
    padding: '13px',
    border: 'none',
    borderRadius: '10px',
    background: '#2563eb',
    color: '#ffffff',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '15px',
  },
  errorBox: {
    background: '#fee2e2',
    color: '#991b1b',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '14px',
    fontWeight: '700',
  },
  demoBox: {
    borderTop: '1px solid #e5e7eb',
    paddingTop: '18px',
  },
  demoText: {
    fontSize: '13px',
    color: '#6b7280',
    marginBottom: '12px',
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