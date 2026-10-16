import { useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { obtenerUsuarios } from '../data/usuariosService'
import { useAuth } from '../context/AuthContext'

function FormularioLogin() {

  const [formulario, setFormulario] = useState({
    correo: '',
    contrasena: ''
  })

    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')
    const { iniciarSesion } = useAuth()
    const navigate = useNavigate()

function manejarCambio(evento) {
    const { name, value } = evento.target

    setFormulario({...formulario, [name]: value})
  }

function manejarEnvio(evento) {
    evento.preventDefault()

    setError('')
    setMensaje('')

    const correo = formulario.correo.trim().toLowerCase()
    const contrasena = formulario.contrasena

    if (!correo || !contrasena) {
        setError('Debes completar ambos campos.')
        return
    }

    const usuarioEncontrado = obtenerUsuarios().find(
        usuario => usuario.correo.toLowerCase() === correo
    )

    if (!usuarioEncontrado || usuarioEncontrado.contrasena !== contrasena) {
        setError('Correo o contraseña incorrectos.')
        return
    }

    iniciarSesion(usuarioEncontrado)
    navigate('/', { replace: true })

    }

  return (
    <Form noValidate onSubmit={manejarEnvio}>

        {error && <Alert variant="danger">{error}</Alert>}
        {mensaje && <Alert variant="success">{mensaje}</Alert>}

      <Form.Group controlId="login-correo" className="mb-3">
        <Form.Label>Correo electrónico</Form.Label>
        <Form.Control type="email" name="correo" value={formulario.correo} onChange={manejarCambio} placeholder="correo@gmail.com"/>
      </Form.Group>

      <Form.Group controlId="login-contrasena" className="mb-3">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control type="password" name="contrasena" value={formulario.contrasena} onChange={manejarCambio} placeholder="Ingresa tu contraseña"/>
      </Form.Group>

      <div className="d-grid mt-4">
        <Button type="submit" variant="primary" size="lg">Iniciar sesión</Button>
      </div>

      <p className="text-center mt-4 mb-0">
        ¿No tienes una cuenta?{' '}
        <Link to="/registro">Regístrate</Link>
      </p>

    </Form>
  )
}

export default FormularioLogin