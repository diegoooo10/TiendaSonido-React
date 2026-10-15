import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { obtenerProductos } from '../data/productosService'

function Categorias() {
  const productos = obtenerProductos()

  const categorias = [
    ...new Set(productos.map((producto) => producto.categoria))
  ].filter(Boolean).sort()

  return (
    <section className="pagina-categorias">
      <Container className="contenedor-categorias">
        <div className="encabezado-categorias">
          <p className="subtitulo-seccion">
            EXPLORA NUESTROS PRODUCTOS
          </p>

          <h1>Categorías</h1>

          <p className="descripcion-categorias">
            Encuentra los instrumentos y equipos ideales para tu sonido.
          </p>

          <div className="linea-decorativa" />
        </div>

        <Row className="g-3">
          {categorias.map((categoria) => {
            const cantidad = productos.filter(
              (producto) => producto.categoria === categoria
            ).length

            return (
              <Col key={categoria} xs={12} sm={6} lg={4}>
                <Card className="tarjeta-categoria h-100">
                  <Card.Body>
                    <div className="categoria-indicador" />

                    <Card.Title>{categoria}</Card.Title>

                    <Card.Text>
                      Productos disponibles: {cantidad}
                    </Card.Text>

                    <Button
                      as={Link}
                      to={`/categorias/${encodeURIComponent(categoria)}`}
                      variant="primary"
                    >
                      Ver productos
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </section>
  )
}

export default Categorias
