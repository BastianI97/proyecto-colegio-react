import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = (payload) => {
    if (typeof payload === 'string') {
      const usersByRole = {
        PROFESOR: {
          id: 1,
          name: 'Profesor Demo',
          nombre: 'Profesor',
          apellido: 'Demo',
          email: 'profesor@colegio.cl',
          role: 'PROFESOR',
        },
        ALUMNO: {
          id: 1,
          name: 'Alumno Demo',
          nombre: 'Alumno',
          apellido: 'Demo',
          email: 'alumno@colegio.cl',
          role: 'ALUMNO',
        },
        APODERADO: {
          id: 2,
          name: 'Apoderado Demo',
          nombre: 'Maria',
          apellido: 'Gonzalez',
          email: 'maria.apoderado@colegio.cl',
          role: 'APODERADO',
        },
      }

      setUser(usersByRole[payload] || null)
      return
    }

    const normalizedUser = {
      id: payload.id,
      name: `${payload.nombre || ''} ${payload.apellido || ''}`.trim(),
      nombre: payload.nombre,
      apellido: payload.apellido,
      email: payload.email,
      role: payload.rol || payload.role,
    }

    setUser(normalizedUser)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}