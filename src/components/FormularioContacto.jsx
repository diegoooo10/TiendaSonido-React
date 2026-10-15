
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'

import {
  validarFormularioContacto
} from '../validaciones/validacionesContacto'

function FormularioContacto() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [comentario, setComentario] = useState('')

  const [errores, setErrores] = useState({})
  const [mensajeEnviado, setMensajeEnviado] = useState('')

  function validarFormulario(evento) {
    evento.preventDefault()

    setMensajeEnviado('')

    const formulario = {
      nombre,
      email,
      comentario
    }

    const erroresValidacion = validarFormularioContacto(formulario)

    setErrores(erroresValidacion)

    if (Object.keys(erroresValidacion).length > 0) {
      return
    }

    setMensajeEnviado('Mensaje validado correctamente')

    setNombre('')
    setEmail('')
    setComentario('')
    setErrores({})
  }

  return (
    <div className="formulario-contacto">
      <h2>Envíanos un mensaje</h2>

      <p>
        Completa el siguiente formulario y nos
        pondremos en contacto contigo
      </p>

      <Form noValidate onSubmit={validarFormulario}>
        <Form.Group className="mb-3" controlId="nombre">
          <Form.Label>Nombre</Form.Label>

          <Form.Control
            type="text"
            name="nombre"
            maxLength={100}
            placeholder="Ingresa tu nombre"
            value={nombre}
            onChange={(evento) => setNombre(evento.target.value)}
            isInvalid={Boolean(errores.nombre)}
          />

          <Form.Control.Feedback type="invalid">
            {errores.nombre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Correo electrónico</Form.Label>

          <Form.Control
            type="email"
            name="email"
            maxLength={100}
            placeholder="ejemplo@gmail.com"
            value={email}
            onChange={(evento) => setEmail(evento.target.value)}
            isInvalid={Boolean(errores.email)}
          />

          <Form.Control.Feedback type="invalid">
            {errores.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="comentario">
          <Form.Label>Comentario</Form.Label>

          <Form.Control
            as="textarea"
            name="comentario"
            rows={6}
            maxLength={500}
            placeholder="Escribe tu consulta..."
            value={comentario}
            onChange={(evento) => setComentario(evento.target.value)}
            isInvalid={Boolean(errores.comentario)}
          />

          <Form.Control.Feedback type="invalid">
            {errores.comentario}
          </Form.Control.Feedback>

          <Form.Text muted>
            Máximo 500 caracteres.
          </Form.Text>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          className="boton-enviar"
        >
          Enviar mensaje
        </Button>

        {mensajeEnviado && (
          <p className="text-success mt-3">
            {mensajeEnviado}
          </p>
        )}
      </Form>
    </div>
  )
}

export default FormularioContacto
