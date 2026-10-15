
import { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Alert
} from 'react-bootstrap'

import {
  obtenerUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../data/usuariosService'

import {
  validarFormularioUsuario
} from '../validaciones/validacionesUsuarios'

const formularioInicial = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  fechaNacimiento: '',
  tipoUsuario: '',
  direccion: ''
}

function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios())
  const [formulario, setFormulario] = useState({ ...formularioInicial })
  const [runOriginal, setRunOriginal] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('success')
  const [errores, setErrores] = useState({})

  function manejarCambio(evento) {
    const { name, value } = evento.target

    const nuevoFormulario = {
      ...formulario,
      [name]: name === 'run' ? value.toUpperCase() : value
    }

    setFormulario(nuevoFormulario)

    if (Object.keys(errores).length > 0) {
      setErrores(validarFormularioUsuario(nuevoFormulario))
    }
  }

  function limpiarFormulario() {
    setFormulario({ ...formularioInicial })
    setRunOriginal(null)
    setErrores({})
    setMensaje('')
  }

  function manejarEnvio(evento) {
    evento.preventDefault()

    const erroresValidacion = validarFormularioUsuario(formulario)
    setErrores(erroresValidacion)

    if (Object.keys(erroresValidacion).length > 0) {
      setTipoMensaje('danger')
      setMensaje(
        'Revisa los siguientes campos: ' +
        Object.values(erroresValidacion).join(' ')
      )
      return
    }

    const datosUsuario = {
      run: formulario.run.trim().toUpperCase(),
      nombre: formulario.nombre.trim(),
      apellidos: formulario.apellidos.trim(),
      correo: formulario.correo.trim(),
      fechaNacimiento: formulario.fechaNacimiento,
      tipoUsuario: formulario.tipoUsuario,
      direccion: formulario.direccion.trim()
    }

    const resultado = runOriginal
      ? actualizarUsuario(runOriginal, datosUsuario)
      : crearUsuario(datosUsuario)

    setTipoMensaje(resultado.exito ? 'success' : 'danger')
    setMensaje(resultado.mensaje)

    if (resultado.exito) {
      setUsuarios(obtenerUsuarios())
      setFormulario({ ...formularioInicial })
      setRunOriginal(null)
      setErrores({})
    }
  }

  function prepararEdicion(usuario) {
    setRunOriginal(usuario.run)

    setFormulario({
      ...formularioInicial,
      ...usuario
    })

    setErrores({})
    setMensaje('')

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function manejarEliminacion(run) {
    if (!window.confirm(`¿Eliminar al usuario ${run}?`)) {
      return
    }

    const resultado = eliminarUsuario(run)

    setTipoMensaje(resultado.exito ? 'success' : 'danger')
    setMensaje(resultado.mensaje)

    if (resultado.exito) {
      setUsuarios(obtenerUsuarios())

      if (runOriginal === run) {
        setFormulario({ ...formularioInicial })
        setRunOriginal(null)
        setErrores({})
      }
    }
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <p className="text-primary fw-bold mb-2">
          ADMINISTRACIÓN
        </p>

        <h1>Administración de usuarios</h1>

        <p className="text-secondary">
          Registro y gestión de usuarios de Sonido Vivo.
        </p>

        <div
          className="bg-primary mx-auto my-4"
          style={{ width: 44, height: 2 }}
        />

        <div className="d-flex justify-content-center gap-2">
          <Button
            variant="outline-primary"
            onClick={() => {
              window.location.href = '/admin-productos'
            }}
          >
            Productos
          </Button>

          <Button variant="primary" type="button">
            Usuarios
          </Button>
        </div>
      </div>

      {mensaje && (
        <Alert
          variant={tipoMensaje}
          dismissible
          onClose={() => setMensaje('')}
        >
          {mensaje}
        </Alert>
      )}

      <Card className="shadow-sm mb-5">
        <Card.Body className="p-4">
          <h2 className="h4 mb-4">
            {runOriginal ? 'Editar usuario' : 'Nuevo usuario'}
          </h2>

          <Form noValidate onSubmit={manejarEnvio}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>RUN</Form.Label>

                  <Form.Control
                    name="run"
                    value={formulario.run}
                    onChange={manejarCambio}
                    placeholder="Ej: 19011022K"
                    disabled={runOriginal !== null}
                    maxLength={9}
                    isInvalid={Boolean(errores.run)}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    {errores.run}
                  </Form.Control.Feedback>

                  <Form.Text className="text-muted">
                    Ingresa el RUN sin puntos ni guion.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>

                  <Form.Control
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    maxLength={50}
                    isInvalid={Boolean(errores.nombre)}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    {errores.nombre}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Apellidos</Form.Label>

                  <Form.Control
                    name="apellidos"
                    value={formulario.apellidos}
                    onChange={manejarCambio}
                    maxLength={100}
                    isInvalid={Boolean(errores.apellidos)}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    {errores.apellidos}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Correo</Form.Label>

                  <Form.Control
                    type="email"
                    name="correo"
                    value={formulario.correo}
                    onChange={manejarCambio}
                    placeholder="correo@gmail.com"
                    maxLength={100}
                    isInvalid={Boolean(errores.correo)}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    {errores.correo}
                  </Form.Control.Feedback>

                  <Form.Text className="text-muted">
                    Dominios permitidos: duoc.cl, profesor.duoc.cl y gmail.com.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Fecha de nacimiento</Form.Label>

                  <Form.Control
                    type="date"
                    name="fechaNacimiento"
                    value={formulario.fechaNacimiento}
                    onChange={manejarCambio}
                    max={new Date().toISOString().split('T')[0]}
                    isInvalid={Boolean(errores.fechaNacimiento)}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    {errores.fechaNacimiento}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Tipo de usuario</Form.Label>

                  <Form.Select
                    name="tipoUsuario"
                    value={formulario.tipoUsuario}
                    onChange={manejarCambio}
                    isInvalid={Boolean(errores.tipoUsuario)}
                    required
                  >
                    <option value="">
                      Seleccionar tipo de usuario
                    </option>

                    <option value="Administrador">Administrador</option>
                    <option value="Empleado">Empleado</option>
                    <option value="Cliente">Cliente</option>
                  </Form.Select>

                  <Form.Control.Feedback type="invalid">
                    {errores.tipoUsuario}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Dirección</Form.Label>

                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="direccion"
                    value={formulario.direccion}
                    onChange={manejarCambio}
                    placeholder="Ingresa la dirección"
                    maxLength={300}
                    isInvalid={Boolean(errores.direccion)}
                    required
                  />

                  <Form.Control.Feedback type="invalid">
                    {errores.direccion}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <Button type="submit" variant="primary">
                {runOriginal ? 'Guardar cambios' : 'Guardar usuario'}
              </Button>

              <Button
                type="button"
                variant="outline-secondary"
                onClick={limpiarFormulario}
              >
                {runOriginal ? 'Cancelar edición' : 'Limpiar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <h2 className="h4 mb-3">
        Usuarios registrados ({usuarios.length})
      </h2>

      <div className="table-responsive">
        <Table striped bordered hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>RUN</th>
              <th>Nombre completo</th>
              <th>Correo</th>
              <th>Tipo</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.run}>
                <td>{usuario.run}</td>
                <td>
                  {usuario.nombre} {usuario.apellidos}
                </td>
                <td>{usuario.correo}</td>
                <td>{usuario.tipoUsuario}</td>

                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => prepararEdicion(usuario)}
                    >
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => manejarEliminacion(usuario.run)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {usuarios.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  No hay usuarios registrados.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  )
}

export default AdminUsuarios
