
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Container,
    Row,
    Col,
    Card,
    Form,
    Button,
    Alert
} from 'react-bootstrap'
import { useCarrito } from '../context/CarritoContext'
import { validarFormularioCompra } from '../validaciones/validacionesCompra'

function Checkout() {
    const navigate = useNavigate()

    const {
        carrito,
        totalUnidades,
        totalPrecio,
        vaciarCarrito
    } = useCarrito()

    const [datos, setDatos] = useState({
        nombre: '',
        correo: '',
        telefono: '',
        direccion: '',
        comuna: '',
        region: '',
        entrega: 'domicilio'
    })

    const [error, setError] = useState('')
    const [errores, setErrores] = useState({})

    function manejarCambio(evento) {
        const { name, value } = evento.target

        setDatos((anterior) => ({
            ...anterior,
            [name]: value
        }))

        setErrores((anteriores) => ({
            ...anteriores,
            [name]: ''
        }))

        setError('')
    }

    function formatoPrecio(precio) {
        return `$${precio.toLocaleString('es-CL')}`
    }

    function confirmarCompra(evento) {
        evento.preventDefault()
        setError('')

        if (carrito.length === 0) {
            setError(
                'Tu carrito esta vacio. Agrega productos antes de continuar.'
            )
            return
        }

        const nuevosErrores = validarFormularioCompra(datos)
        setErrores(nuevosErrores)

        if (Object.keys(nuevosErrores).length > 0) {
            setError('Revisa los campos marcados antes de continuar.')
            return
        }

        const pedido = {
            numero: `SV-${Date.now()}`,
            fecha: new Date().toLocaleString('es-CL'),
            cliente: { ...datos },
            productos: carrito.map((producto) => ({ ...producto })),
            totalUnidades,
            totalPrecio,
            estado: 'Confirmado'
        }

        try {
            localStorage.setItem(
                'ultimaCompraSonidoVivo',
                JSON.stringify(pedido)
            )

            vaciarCarrito()
            navigate('/compra/exitosa')
        } catch (errorGuardado) {
            console.error('No se pudo guardar la compra:', errorGuardado)
            setError('No se pudo guardar el pedido. Intenta nuevamente.')
        }
    }

    if (carrito.length === 0) {
        return (
            <Container className="checkout-contenedor py-5">
                <Alert variant="info" className="text-center">
                    No tienes productos para comprar.

                    <div className="mt-3">
                        <Button as={Link} to="/productos">
                            Ver productos
                        </Button>
                    </div>
                </Alert>
            </Container>
        )
    }

    return (
        <section className="checkout-fondo">
            <Container className="checkout-contenedor py-5">
                <div className="text-center checkout-encabezado">
                    <p className="subtitulo-seccion">SONIDO VIVO</p>
                    <h1>Finalizar compra</h1>

                    <p className="descripcion-seccion">
                        Ingresa tus datos y selecciona como quieres recibir tu pedido.
                    </p>

                    <div className="linea-decorativa" />
                </div>

                <Row className="g-4 justify-content-center">
                    <Col lg={7}>
                        <Card className="checkout-panel h-100">
                            <Card.Body>
                                <h2 className="checkout-titulo">Datos de entrega</h2>

                                {error && (
                                    <Alert variant="danger" role="alert">
                                        {error}
                                    </Alert>
                                )}

                                <Form onSubmit={confirmarCompra} noValidate>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Nombre completo</Form.Label>

                                        <Form.Control
                                            name="nombre"
                                            value={datos.nombre}
                                            onChange={manejarCambio}
                                            maxLength={100}
                                            required
                                            isInvalid={Boolean(errores.nombre)}
                                            autoComplete="name"
                                            placeholder="Ingresa tu nombre"
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errores.nombre}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Correo electronico</Form.Label>

                                                <Form.Control
                                                    type="email"
                                                    name="correo"
                                                    value={datos.correo}
                                                    onChange={manejarCambio}
                                                    maxLength={100}
                                                    required
                                                    isInvalid={Boolean(errores.correo)}
                                                    autoComplete="email"
                                                    placeholder="correo@ejemplo.com"
                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    {errores.correo}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Telefono</Form.Label>

                                                <Form.Control
                                                    type="tel"
                                                    name="telefono"
                                                    value={datos.telefono}
                                                    onChange={manejarCambio}
                                                    maxLength={20}
                                                    required
                                                    isInvalid={Boolean(errores.telefono)}
                                                    autoComplete="tel"
                                                    placeholder="+56 9 1234 5678"
                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    {errores.telefono}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Direccion</Form.Label>

                                        <Form.Control
                                            name="direccion"
                                            value={datos.direccion}
                                            onChange={manejarCambio}
                                            maxLength={200}
                                            required
                                            isInvalid={Boolean(errores.direccion)}
                                            autoComplete="street-address"
                                            placeholder="Calle, numero y departamento"
                                        />

                                        <Form.Control.Feedback type="invalid">
                                            {errores.direccion}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Row>
                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Comuna</Form.Label>

                                                <Form.Control
                                                    name="comuna"
                                                    value={datos.comuna}
                                                    onChange={manejarCambio}
                                                    maxLength={80}
                                                    required
                                                    isInvalid={Boolean(errores.comuna)}
                                                    autoComplete="address-level2"
                                                    placeholder="Ej. Quilpue"
                                                />

                                                <Form.Control.Feedback type="invalid">
                                                    {errores.comuna}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>

                                        <Col md={6}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Region</Form.Label>

                                                <Form.Select
                                                    name="region"
                                                    value={datos.region}
                                                    onChange={manejarCambio}
                                                    required
                                                    isInvalid={Boolean(errores.region)}
                                                    autoComplete="address-level1"
                                                >
                                                    <option value="">Selecciona una region</option>
                                                    <option value="Arica y Parinacota">Arica y Parinacota</option>
                                                    <option value="Tarapaca">Tarapaca</option>
                                                    <option value="Antofagasta">Antofagasta</option>
                                                    <option value="Atacama">Atacama</option>
                                                    <option value="Coquimbo">Coquimbo</option>
                                                    <option value="Valparaiso">Valparaiso</option>
                                                    <option value="Metropolitana de Santiago">Metropolitana de Santiago</option>
                                                    <option value="O'Higgins">O'Higgins</option>
                                                    <option value="Maule">Maule</option>
                                                    <option value="Ñuble">Ñuble</option>
                                                    <option value="Biobio">Biobio</option>
                                                    <option value="La Araucania">La Araucania</option>
                                                    <option value="Los Rios">Los Rios</option>
                                                    <option value="Los Lagos">Los Lagos</option>
                                                    <option value="Aysen">Aysen</option>
                                                    <option value="Magallanes y Antartica Chilena">
                                                        Magallanes y Antartica Chilena
                                                    </option>
                                                </Form.Select>

                                                <Form.Control.Feedback type="invalid">
                                                    {errores.region}
                                                </Form.Control.Feedback>
                                            </Form.Group>
                                        </Col>
                                    </Row>

                                    <hr />

                                    <h3 className="checkout-subtitulo">
                                        Metodo de entrega
                                    </h3>

                                    <Form.Check
                                        type="radio"
                                        name="entrega"
                                        id="entrega-domicilio"
                                        value="domicilio"
                                        checked={datos.entrega === 'domicilio'}
                                        onChange={manejarCambio}
                                        label="Despacho a domicilio"
                                        className="mb-2"
                                    />

                                    <Form.Check
                                        type="radio"
                                        name="entrega"
                                        id="retiro-tienda"
                                        value="retiro"
                                        checked={datos.entrega === 'retiro'}
                                        onChange={manejarCambio}
                                        label="Retiro en tienda - Viña del Mar"
                                        className="mb-2"
                                    />

                                    {errores.entrega && (
                                        <div className="text-danger small mb-3" role="alert">
                                            {errores.entrega}
                                        </div>
                                    )}

                                    <div className="d-flex flex-wrap gap-2 mt-4">
                                        <Button
                                            type="submit"
                                            className="boton-confirmar-compra"
                                        >
                                            Confirmar compra
                                        </Button>

                                        <Button
                                            as={Link}
                                            to="/carrito"
                                            variant="outline-secondary"
                                        >
                                            Volver al carrito
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="checkout-panel checkout-resumen">
                            <Card.Body>
                                <h2 className="checkout-titulo">Resumen del pedido</h2>

                                {carrito.map((producto) => (
                                    <div
                                        className="checkout-producto"
                                        key={producto.codigo}
                                    >
                                        <div>
                                            <strong>{producto.nombre}</strong>
                                            <p className="mb-0 text-secondary">
                                                Cantidad: {producto.cantidad}
                                            </p>
                                        </div>

                                        <span>
                                            {formatoPrecio(
                                                producto.precio * producto.cantidad
                                            )}
                                        </span>
                                    </div>
                                ))}

                                <hr />

                                <div className="resumen-linea">
                                    <span>Unidades</span>
                                    <span>{totalUnidades}</span>
                                </div>

                                <div className="checkout-total">
                                    <span>Total</span>
                                    <strong>{formatoPrecio(totalPrecio)}</strong>
                                </div>

                                <p className="checkout-nota">
                                    Esta compra es una simulacion del proceso de pedido.
                                    No se realizara ningun cobro real.
                                </p>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default Checkout
