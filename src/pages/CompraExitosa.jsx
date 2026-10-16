
import { Link } from 'react-router-dom'
import { Container, Card, Button, Alert } from 'react-bootstrap'

function CompraExitosa() {
  let pedido = null

  try {
    pedido = JSON.parse(
      localStorage.getItem('ultimaCompraSonidoVivo')
    )
  } catch {
    pedido = null
  }

  function formatoPrecio(precio) {
    return `$${Number(precio).toLocaleString('es-CL')}`
  }

  if (!pedido) {
    return (
      <Container className="resultado-contenedor py-5">
        <Alert variant="info">
          No hay una compra reciente para mostrar.
        </Alert>
        <Button as={Link} to="/productos">
          Volver a productos
        </Button>
      </Container>
    )
  }

  return (
    <section className="resultado-fondo">
      <Container className="resultado-contenedor py-5">
        <Card className="resultado-panel text-center mx-auto">
          <Card.Body>
            <div className="resultado-icono resultado-icono-exito">
              <span aria-hidden="true">&#10003;</span>
            </div>

            <p className="subtitulo-seccion">SONIDO VIVO</p>
            <h1>Compra exitosa</h1>

            <p>
              Gracias por tu compra, {pedido.cliente.nombre}.
            </p>

            <Alert variant="success">
              Tu pedido fue registrado correctamente.
            </Alert>

            <div className="resultado-detalle text-start">
              <p>
                <strong>Numero de pedido:</strong> {pedido.numero}
              </p>
              <p>
                <strong>Fecha:</strong> {pedido.fecha}
              </p>
              <p>
                <strong>Estado:</strong> {pedido.estado}
              </p>
              <p>
                <strong>Entrega:</strong>{' '}
                {pedido.cliente.entrega === 'retiro'
                  ? 'Retiro en tienda - Viña del Mar'
                  : 'Despacho a domicilio'}
              </p>
              <p>
                <strong>Direccion:</strong>{' '}
                {pedido.cliente.direccion}, {pedido.cliente.comuna},{' '}
                {pedido.cliente.region}
              </p>
            </div>

            <h2 className="checkout-titulo mt-4">Resumen de productos</h2>

            {pedido.productos.map((producto) => (
              <div className="checkout-producto" key={producto.codigo}>
                <span>
                  {producto.nombre} x {producto.cantidad}
                </span>
                <strong>
                  {formatoPrecio(producto.precio * producto.cantidad)}
                </strong>
              </div>
            ))}

            <div className="checkout-total">
              <span>Total del pedido</span>
              <strong>{formatoPrecio(pedido.totalPrecio)}</strong>
            </div>

            <Button
              as={Link}
              to="/productos"
              className="boton-confirmar-compra mt-4"
            >
              Seguir comprando
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}

export default CompraExitosa
