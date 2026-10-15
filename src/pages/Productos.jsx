import { useEffect, useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import ProductoCard from '../components/ProductoCard'
import { obtenerProductos } from '../data/productosService'

function Productos() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    setProductos(obtenerProductos())
  }, [])

  return (
    <section className="catalogo-productos">
      <Container className="py-4">
        <div className="encabezado-catalogo text-center">
          <p className="subtitulo-seccion">NUESTRO CATÁLOGO</p>
          <h1>Productos</h1>
          <p>
            Encuentra instrumentos musicales y equipos de sonido
            para todos los estilos.
          </p>
          <div className="linea-decorativa" />
        </div>

        <Row className="g-3">
          {productos.map((producto) => (
            <Col key={producto.codigo} xs={12} sm={6} lg={4}>
              <ProductoCard producto={producto} />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default Productos
