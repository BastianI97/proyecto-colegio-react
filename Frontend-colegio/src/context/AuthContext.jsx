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

  const login = (role) => {
    const usersByRole = {
      PROFESOR: { name: 'Profesor Demo', role: 'PROFESOR' },
      ALUMNO: { name: 'Alumno Demo', role: 'ALUMNO' },
      APODERADO: { name: 'Apoderado Demo', role: 'APODERADO' },
    }

    setUser(usersByRole[role] || null)
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