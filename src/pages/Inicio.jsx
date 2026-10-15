
import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap'
import { productos } from '../data/productos'

const destacados = [
  { codigo: 'GA001', etiqueta: 'Mas vendido' },
  { codigo: 'BT001', etiqueta: 'Alta calidad' },
  { codigo: 'MI001', etiqueta: 'Oferta', precioOferta: 129990 }
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
      <section className="hero">
        <Container className="py-5">
          <Row className="align-items-center g-4">
            <Col md={7}>
              <h1>Bienvenido a Sonido Vivo</h1>
              <p>
                Somos una tienda especializada en instrumentos
                musicales, equipos de sonido y accesorios para músicos.
              </p>
            </Col>

            <Col md={5}>
              <img
                src="/img/tienda.png"
                alt="Interior de la tienda Sonido Vivo"
                className="img-fluid hero-imagen"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="productos-destacados">
        <Container className="py-5">
          <div className="text-center mb-5">
            <p className="subtitulo-seccion">NUESTRA SELECCIÓN</p>
            <h2>Productos destacados</h2>
            <p className="descripcion-seccion">
              Calidad, sonido y pasión en un solo lugar.
              Descubre nuestros productos más populares.
            </p>
            <div className="linea-decorativa" />
          </div>

          <Row className="g-4">
            {productosDestacados.map((producto) => (
              <Col key={producto.codigo} xs={12} md={6} lg={4}>
                <Card className="h-100 tarjeta-destacada">
                  <Link to={`/productos/${producto.codigo}`}>
                    <Card.Img
                      variant="top"
                      src={`/${producto.imagen.replace(/^\/+/, '')}`}
                      alt={producto.nombre}
                      className="imagen-producto-destacado"
                    />
                  </Link>

                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                      <Badge bg={producto.precioOferta ? 'danger' : 'dark'}>
                        {producto.etiqueta}
                      </Badge>
                    </div>

                    <Card.Title>{producto.nombre}</Card.Title>
                    <Card.Text>{producto.descripcion}</Card.Text>

                    <div className="mt-auto">
                      {producto.precioOferta ? (
                        <>
                          <p className="mb-0 text-secondary text-decoration-line-through">
                            {formatoPrecio(producto.precio)}
                          </p>
                          <p className="fs-5 fw-bold text-danger">
                            {formatoPrecio(producto.precioOferta)}
                          </p>
                        </>
                      ) : (
                        <p className="fs-5 fw-bold">
                          {formatoPrecio(producto.precio)}
                        </p>
                      )}

                      <Button
                        as={Link}
                        to={`/productos/${producto.codigo}`}
                        variant="dark"
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
