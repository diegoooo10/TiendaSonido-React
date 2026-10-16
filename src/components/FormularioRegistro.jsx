
import { useState } from 'react'
import { Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import { validarFormularioUsuario } from '../validaciones/validacionesUsuarios'
import { obtenerUsuarios, crearUsuario } from '../data/usuariosService'

function FormularioRegistro() {

  const [formulario, setFormulario] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    direccion: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: '',
    tipoUsuario: 'Cliente'
  })

  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('success')

  function manejarCambio(evento) {
    const { name, value } = evento.target

    setFormulario({...formulario, [name]: name === 'run' ? value.toUpperCase() : value})

    setErrores(erroresAnteriores => ({...erroresAnteriores, [name]: ''}))
    }

    function manejarEnvio(evento) {
    evento.preventDefault()
    setMensaje('')

    const erroresValidacion = validarFormularioUsuario(formulario)

    if (!formulario.contrasena) {
        erroresValidacion.contrasena = 'Debe ingresar una contraseña.'
    }

    if (!formulario.confirmarContrasena) {
        erroresValidacion.confirmarContrasena = 'Debe confirmar su contraseña.'
    } else if (formulario.confirmarContrasena !== formulario.contrasena) {
        erroresValidacion.confirmarContrasena = 'Las contraseñas no coinciden.'
    }
    
    const correoExiste = obtenerUsuarios().some(
    usuario => usuario.correo.toLowerCase() === formulario.correo.trim().toLowerCase()
    )

    if (correoExiste) {
    erroresValidacion.correo = 'Este correo ya está registrado.'
    }

    setErrores(erroresValidacion)

    if (Object.keys(erroresValidacion).length > 0) {
        return
    }

    const nuevoUsuario = {
    run: formulario.run.trim().toUpperCase(),
    nombre: formulario.nombre.trim(),
    apellidos: formulario.apellidos.trim(),
    correo: formulario.correo.trim(),
    fechaNacimiento: formulario.fechaNacimiento,
    direccion: formulario.direccion.trim(),
    tipoUsuario: 'Cliente',
    contrasena: formulario.contrasena
    }

    const resultado = crearUsuario(nuevoUsuario)

    setTipoMensaje(resultado.exito ? 'success' : 'danger')
    setMensaje(resultado.mensaje)

    if (resultado.exito) {
    setFormulario({
        run: '',
        nombre: '',
        apellidos: '',
        fechaNacimiento: '',
        direccion: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: '',
        tipoUsuario: 'Cliente'
    })
    }
    }

  return (
    <Form noValidate onSubmit={manejarEnvio}>
      {mensaje && <Alert variant={tipoMensaje}>{mensaje}</Alert>}

      <h2 className="h5 mb-3">Datos personales</h2>

      <Row className="g-3">

        <Col xs={12} md={6}>
          <Form.Group controlId="registro-nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" name="nombre" value={formulario.nombre} onChange={manejarCambio} placeholder="Tu nombre" maxLength={50} isInvalid={Boolean(errores.nombre)}/>
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="registro-apellidos">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control type="text" name="apellidos" value={formulario.apellidos} onChange={manejarCambio} placeholder="Tus apellidos" maxLength={100} isInvalid={Boolean(errores.apellidos)}/>
            <Form.Control.Feedback type="invalid">{errores.apellidos}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="registro-run">
            <Form.Label>RUN</Form.Label>
            <Form.Control type="text" name="run" value={formulario.run} onChange={manejarCambio} placeholder="Ej: 19011022K" maxLength={9} isInvalid={Boolean(errores.run)}/>
            <Form.Control.Feedback type="invalid">{errores.run}</Form.Control.Feedback>
            <Form.Text className="text-muted">
              Sin puntos ni guion.
            </Form.Text>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="registro-fecha">
            <Form.Label>Fecha de nacimiento</Form.Label>
            <Form.Control type="date" name="fechaNacimiento" value={formulario.fechaNacimiento} onChange={manejarCambio} max={new Date().toISOString().split('T')[0]} isInvalid={Boolean(errores.fechaNacimiento)}/>
            <Form.Control.Feedback type="invalid">{errores.fechaNacimiento}</Form.Control.Feedback>
          </Form.Group>
        </Col>

        <Col xs={12}>
          <Form.Group controlId="registro-direccion">
            <Form.Label>Dirección</Form.Label>
            <Form.Control type="text" name="direccion" value={formulario.direccion} onChange={manejarCambio} placeholder="Ingresa tu dirección" maxLength={300} isInvalid={Boolean(errores.direccion)}/>
            <Form.Control.Feedback type="invalid">{errores.direccion}</Form.Control.Feedback>          
          </Form.Group>
        </Col>

      </Row>

      <hr className="my-4" />

      <h2 className="h5 mb-3">Datos de acceso</h2>

      <Row className="g-3">

        <Col xs={12}>
          <Form.Group controlId="registro-correo">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" name="correo" value={formulario.correo} onChange={manejarCambio} placeholder="correo@gmail.com" maxLength={100} isInvalid={Boolean(errores.correo)}/>
            <Form.Control.Feedback type="invalid">{errores.correo}</Form.Control.Feedback>
            <Form.Text className="text-muted">
              Correos permitidos: duoc.cl, profesor.duoc.cl y gmail.com.
            </Form.Text>
          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="registro-contrasena">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" name="contrasena" value={formulario.contrasena} onChange={manejarCambio} placeholder="Contraseña" isInvalid={Boolean(errores.contrasena)}/>
            <Form.Control.Feedback type="invalid">{errores.contrasena}</Form.Control.Feedback>

          </Form.Group>
        </Col>

        <Col xs={12} md={6}>
          <Form.Group controlId="registro-confirmar">
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control type="password" name="confirmarContrasena" value={formulario.confirmarContrasena} onChange={manejarCambio} placeholder="Repite tu contraseña" isInvalid={Boolean(errores.confirmarContrasena)}/>
            <Form.Control.Feedback type="invalid">{errores.confirmarContrasena}</Form.Control.Feedback>

          </Form.Group>
        </Col>

      </Row>

      <div className="d-grid mt-4">
        <Button type="submit" variant="primary" size="lg">
          Crear cuenta
        </Button>
      </div>

      <p className="text-center mt-4 mb-0">
        ¿Ya tienes una cuenta?{' '}
        <Link to="/login">Iniciar sesión</Link>
      </p>

    </Form>
  )
}

export default FormularioRegistro
