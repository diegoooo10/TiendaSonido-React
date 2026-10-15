import { Form, Button } from "react-bootstrap"
import { useState } from "react"

function FormularioContacto(){

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [comentario, setComentario] = useState('');

    const [errorNombre, setErrorNombre] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorComentario, setErrorComentario] = useState('');
    const [mensajeEnviado, setMensajeEnviado] = useState('');

    function validarFormulario(event) {
        event.preventDefault();

        let todoEsValido = true;

        setErrorNombre('');
        setErrorEmail('');
        setErrorComentario('');
        setMensajeEnviado('');

        const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (nombre.trim() === '') {
            setErrorNombre('Debe ingresar un nombre');
            todoEsValido = false;
        }

        if (email.trim() === '') {
            setErrorEmail('Debe ingresar un correo');
            todoEsValido = false;
        } else if (!formatoCorreo.test(email.trim())) {
            setErrorEmail('Debe ingresar un correo válido');
            todoEsValido = false;
        }

        if (comentario.trim() === '') {
            setErrorComentario('Debe ingresar un comentario');
            todoEsValido = false;
        }

        if (todoEsValido) {
            setMensajeEnviado('Mensaje validado correctamente');

            setNombre('');
            setEmail('');
            setComentario('');
        }
    }

    return(
        <div className="formulario-contacto">
            <h2>Envíanos un mensaje</h2>

            <p>Completa el siguiente formulario y nos
                pondremos en contacto contigo
            </p>

            <Form noValidate onSubmit={validarFormulario}>
                <Form.Group className="mb-3" controlId="nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" name="nombre" maxLength={100} placeholder="Ingresa tu nombre" value={nombre} onChange={(event) => setNombre(event.target.value)}/>
                    <p className="text-danger">{errorNombre}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Correo electrónico</Form.Label>
                    <Form.Control type="email" name="email" maxLength={100} placeholder="ejemplo@gmail.com" value={email} onChange={(event) => setEmail(event.target.value)}/>
                    <p className="text-danger">{errorEmail}</p>
                </Form.Group>

                <Form.Group className="mb-3" controlId="comentario">
                    <Form.Label>Comentario</Form.Label>
                    <Form.Control as="textarea" name="comentario" rows={6} maxLength={500} placeholder="Escribe tu consulta..." value={comentario} onChange={(event) => setComentario(event.target.value)}/>
                    <p className="text-danger">{errorComentario}</p>
                    <Form.Text muted>Máximo 500 caracteres.</Form.Text>

                </Form.Group>
                    <Button variant="primary" type="submit" className="boton-enviar">
                    Enviar mensaje
                    </Button>
                    <p className="text-success">{mensajeEnviado}</p>
                    
                </Form>

        </div>
    )
}

export default FormularioContacto