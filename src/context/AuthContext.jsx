import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {

  const [usuario, setUsuario] = useState(() => {
    const usuarioGuardado = localStorage.getItem('sesionSonidoVivo')
    return usuarioGuardado ? JSON.parse(usuarioGuardado) : null
  })

  function iniciarSesion(datosUsuario) {
    const usuarioSesion = {
      nombre: datosUsuario.nombre,
      correo: datosUsuario.correo,
      tipoUsuario: datosUsuario.tipoUsuario
    }

    setUsuario(usuarioSesion)
    localStorage.setItem('sesionSonidoVivo', JSON.stringify(usuarioSesion))
  }

  function cerrarSesion() {
    setUsuario(null)
    localStorage.removeItem('sesionSonidoVivo')
  }

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, cerrarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}