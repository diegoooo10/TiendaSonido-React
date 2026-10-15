import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Alert, Button } from 'react-bootstrap'
import { obtenerProductos } from '../data/productosService'
import ProductoCard from '../components/ProductoCard'

function DetalleCategoria() {
  const { categoria } = useParams()

  const nombreCategoria = decodeURIComponent(categoria)
  const productos = obtenerProductos()

  const productosFiltrados = productos.filter(
    (producto) => producto.categoria === nombreCategoria
  )

  return (
    <section className="detalle-categoria">
      <Container className="contenedor-detalle-categoria">
        <div className="encabezado-catalogo">
          <p className="subtitulo-seccion">
            EXPLORA NUESTRA SELECCIÓN
          </p>

          <h1>{nombreCategoria}</h1>

          <p className="descripcion-seccion">
            Descubre nuestros productos de {nombreCategoria.toLowerCase()}.
          </p>

          <div className="linea-decorativa" />
        </div>

        {productosFiltrados.length === 0 ? (
          <Alert variant="warning">
            No encontramos productos en esta categoría.
          </Alert>
        ) : (
          <Row className="g-3">
            {productosFiltrados.map((producto) => (
              <Col
                key={producto.codigo}
                xs={12}
                sm={6}
                lg={4}
              >
                <ProductoCard producto={producto} />
              </Col>
            ))}
          </Row>
        )}

        <div className="volver-categorias">
          <Button
            as={Link}
            to="/categorias"
            variant="outline-secondary"
          >
            ← Volver a categorías
          </Button>
        </div>
      </Container>
    </section>
  )
}

export default DetalleCategoria
