
import { Link } from 'react-router-dom'
import { Container, Card, Button } from 'react-bootstrap'

function CompraFallida() {
  return (
    <section className="resultado-fondo">
      <Container className="resultado-contenedor py-5">
        <Card className="resultado-panel text-center mx-auto">
          <Card.Body>
            <div className="resultado-icono resultado-icono-error">
              <span aria-hidden="true">!</span>
            </div>

            <p className="subtitulo-seccion">SONIDO VIVO</p>
            <h1>No se pudo completar la compra</h1>

            <p>
              El pedido no pudo ser confirmado. Tus productos siguen
              disponibles en el carrito para que puedas intentarlo otra vez.
            </p>

            <div className="d-flex flex-wrap justify-content-center gap-2 mt-4">
              <Button
                as={Link}
                to="/checkout"
                className="boton-confirmar-compra"
              >
                Intentar nuevamente
              </Button>

              <Button
                as={Link}
                to="/carrito"
                variant="outline-secondary"
              >
                Volver al carrito
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </section>
  )
}

export default CompraFallida
