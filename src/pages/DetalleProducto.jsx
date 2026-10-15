import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Alert } from 'react-bootstrap'
import { obtenerProductoPorCodigo } from '../data/productosService'
import { useCarrito } from '../context/CarritoContext'

function DetalleProducto() {
  const { codigo } = useParams()
  const { agregarAlCarrito } = useCarrito()

  const producto = obtenerProductoPorCodigo(codigo)

  if (!producto) {
    return (
      <Container className="py-4">
        <Alert variant="warning">
          El producto que buscas no existe.
        </Alert>
        <Link to="/productos">Volver a productos</Link>
      </Container>
    )
  }

  const esOferta = producto.codigo === 'MI001'
  const precioMostrar = esOferta ? 129990 : producto.precio

  function manejarAgregarAlCarrito() {
    agregarAlCarrito(producto)
  }

  return (
    <section className="detalle-producto">
      <Container className="contenedor-detalle">
        <Row className="align-items-center g-4 g-lg-5">
          <Col xs={12} md={5}>
            <div className="detalle-imagen-contenedor">
              <img
                src={`/${producto.imagen.replace(/^\/+/, '')}`}
                alt={producto.nombre}
                className="detalle-imagen"
              />
            </div>
          </Col>

          <Col xs={12} md={7}>
            <div className="detalle-informacion">
              <p className="detalle-categoria">
                {producto.categoria}
              </p>

              <h1 className="detalle-titulo">
                {producto.nombre}
              </h1>

              <p className="detalle-descripcion">
                {producto.descripcion}
              </p>

              <hr className="detalle-separador" />

              {producto.marca && (
                <p className="detalle-dato">
                  <strong>Marca:</strong> {producto.marca}
                </p>
              )}

              {producto.modelo && (
                <p className="detalle-dato">
                  <strong>Modelo:</strong> {producto.modelo}
                </p>
              )}

              <p className="detalle-dato">
                <strong>Stock disponible:</strong> {producto.stock}
              </p>

              <div className="detalle-precio-contenedor">
                {esOferta && (
                  <p className="detalle-precio-anterior">
                    Antes: ${producto.precio.toLocaleString('es-CL')}
                  </p>
                )}

                <h2 className="detalle-precio">
                  ${precioMostrar.toLocaleString('es-CL')}
                </h2>

                {esOferta && (
                  <span className="badge bg-danger">
                    Oferta especial
                  </span>
                )}
              </div>

              <div className="detalle-botones">
                <Button
                  variant="primary"
                  onClick={manejarAgregarAlCarrito}
                  disabled={producto.stock <= 0}
                >
                  {producto.stock > 0
                    ? '🛒 Agregar al carrito'
                    : 'Sin stock'}
                </Button>

                <Button
                  as={Link}
                  to="/productos"
                  variant="outline-secondary"
                >
                  ← Volver a productos
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default DetalleProducto
