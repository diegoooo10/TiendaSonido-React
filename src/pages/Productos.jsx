
import { Container, Row, Col } from 'react-bootstrap'
import ProductoCard from '../components/ProductoCard'
import { productos } from '../data/productos'

function Productos() {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Nuestros productos</h1>

      <Row className="g-4">
        {productos.map((producto) => (
          <Col key={producto.codigo} xs={12} md={6} lg={4}>
            <ProductoCard producto={producto} />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Productos
