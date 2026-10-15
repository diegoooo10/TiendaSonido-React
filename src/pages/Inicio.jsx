import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { productos } from '../data/productos'

const destacados = [
  {
    codigo: 'GA001',
    etiqueta: '★ Más vendido',
    color: 'dark'
  },
  {
    codigo: 'BT001',
    etiqueta: '✓ Alta calidad',
    color: 'success'
  },
  {
    codigo: 'MI001',
    etiqueta: 'Oferta',
    color: 'danger',
    precioOferta: 129990
  }
]

function Inicio() {
  const productosDestacados = destacados
    .map((destacado) => {
      const producto = productos.find(
        (item) => item.codigo === destacado.codigo
      )

      return producto ? { ...producto, ...destacado } : null
    })
    .filter(Boolean)

  const formatoPrecio = (precio) =>
    precio.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    })

  return (
    <>
      {/* PRESENTACION PRINCIPAL */}
      <section className="hero">
        <Container className="py-5">
          <Row className="justify-content-center text-center">
            <Col xs={12}>
              <h1>Bienvenido a Sonido Vivo</h1>

              <p>
                Somos una tienda especializada en instrumentos
                musicales, equipos de sonido y accesorios para músicos.
              </p>

              <img
                src="/img/tienda.png"
                alt="Interior de la tienda Sonido Vivo"
                className="img-fluid hero-imagen"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* PRODUCTOS DESTACADOS */}
      <section className="productos-destacados">
        <Container className="py-5">
          <div className="text-center mb-5">
            <p className="subtitulo-seccion">
              NUESTRA SELECCIÓN
            </p>

            <h2>Productos destacados</h2>

            <p className="descripcion-seccion">
              Calidad, sonido y pasión en un solo lugar.
              Descubre nuestros productos más populares.
            </p>

            <div className="linea-decorativa" />
          </div>

          <Row className="g-4">
            {productosDestacados.map((producto) => (
              <Col
                key={producto.codigo}
                xs={12}
                md={6}
                lg={4}
              >
                <Card className="tarjeta-destacada h-100">
                  {/* IMAGEN DEL PRODUCTO */}
                  <Link
                    to={`/productos/${producto.codigo}`}
                    aria-label={`Ver ${producto.nombre}`}
                  >
                    <div className="imagen-destacada">
                      <Card.Img
                        variant="top"
                        src={`/${producto.imagen.replace(/^\/+/, '')}`}
                        alt={producto.nombre}
                        className="imagen-producto-destacado"
                      />
                    </div>
                  </Link>

                  {/* INFORMACION */}
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-3">
                      <Badge bg={producto.color}>
                        {producto.etiqueta}
                      </Badge>
                    </div>

                    <Card.Title>
                      {producto.nombre}
                    </Card.Title>

                    <Card.Text>
                      {producto.descripcion}
                    </Card.Text>

                    <div className="mt-auto">
                      {producto.precioOferta ? (
                        <>
                          <p className="mb-1 text-secondary text-decoration-line-through">
                            Antes: {formatoPrecio(producto.precio)}
                          </p>

                          <p className="fs-5 fw-bold text-danger mb-3">
                            {formatoPrecio(producto.precioOferta)}
                          </p>
                        </>
                      ) : (
                        <p className="fs-5 fw-bold mb-3">
                          {formatoPrecio(producto.precio)}
                        </p>
                      )}

                      <div className="producto-info mb-3">
                        <span>Envío a todo Chile</span>
                        <span>Garantía de 1 año</span>
                      </div>

                      <Button
                        as={Link}
                        to={`/productos/${producto.codigo}`}
                        variant="primary"
                        className="w-100"
                      >
                        Ver producto
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  )
}

export default Inicio
