import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function Carrito() {
  const {
    carrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    totalPrecio,
    totalUnidades
  } = useCarrito()

  function formatoPrecio(precio) {
    return `$${precio.toLocaleString('es-CL')}`
  }

  function obtenerImagen(imagen) {
    if (!imagen) return ''

    return imagen.startsWith('img/')
      ? `/${imagen}`
      : imagen
  }

  return (
    <section className="pagina-carrito">
      <Container className="contenedor-carrito">
        <div className="encabezado-carrito text-center">
          <p className="subtitulo-seccion">SONIDO VIVO</p>

          <h1>Mi carrito</h1>

          <p>
            Revisa los productos que has agregado antes de continuar con tu compra.
          </p>

          <div className="linea-decorativa" />
        </div>

        <Row className="g-4 align-items-start">
          <Col xs={12} lg={8}>
            <Card className="panel-carrito">
              <Card.Body>
                <div className="encabezado-panel-carrito">
                  <h2>Productos seleccionados</h2>

                  {carrito.length > 0 && (
                    <span className="cantidad-carrito">
                      {totalUnidades} productos
                    </span>
                  )}
                </div>

                {carrito.length === 0 ? (
                  <div className="carrito-vacio">
                    <h3>Tu carrito está vacío</h3>

                    <p>Agrega algunos productos para comenzar.</p>

                    <Button
                      as={Link}
                      to="/productos"
                      variant="primary"
                      className="boton-carrito-principal"
                    >
                      Ver productos
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="lista-productos-carrito">
                      {carrito.map((producto) => (
                        <article
                          className="item-carrito"
                          key={producto.codigo}
                        >
                          <Link
                            to={`/productos/${producto.codigo}`}
                            className="imagen-item-carrito"
                            aria-label={`Ver ${producto.nombre}`}
                          >
                            <img
                              src={obtenerImagen(producto.imagen)}
                              alt={producto.nombre}
                            />
                          </Link>

                          <div className="informacion-item-carrito">
                            <Link
                              to={`/productos/${producto.codigo}`}
                              className="nombre-item-carrito"
                            >
                              {producto.nombre}
                            </Link>

                            {(producto.marca || producto.modelo) && (
                              <p className="modelo-item-carrito">
                                {[producto.marca, producto.modelo]
                                  .filter(Boolean)
                                  .join(' ')}
                              </p>
                            )}

                            <p className="codigo-item-carrito">
                              Código: {producto.codigo}
                            </p>
                          </div>

                          <div className="precio-unitario-carrito">
                            {formatoPrecio(producto.precio)}
                          </div>

                          <div className="cantidad-item-carrito">
                            <Button
                              variant="outline-secondary"
                              aria-label={`Disminuir cantidad de ${producto.nombre}`}
                              disabled={producto.cantidad <= 1}
                              onClick={() =>
                                actualizarCantidad(
                                  producto.codigo,
                                  producto.cantidad - 1
                                )
                              }
                            >
                              -
                            </Button>

                            <span>{producto.cantidad}</span>

                            <Button
                              variant="outline-secondary"
                              aria-label={`Aumentar cantidad de ${producto.nombre}`}
                              disabled={
                                producto.cantidad >= producto.stock ||
                                totalUnidades >= 20
                              }
                              onClick={() =>
                                actualizarCantidad(
                                  producto.codigo,
                                  producto.cantidad + 1
                                )
                              }
                            >
                              +
                            </Button>
                          </div>

                          <div className="subtotal-item-carrito">
                            <strong>
                              {formatoPrecio(
                                producto.precio * producto.cantidad
                              )}
                            </strong>

                            <Button
                              variant="outline-danger"
                              className="boton-eliminar-item"
                              onClick={() =>
                                eliminarDelCarrito(producto.codigo)
                              }
                            >
                              Eliminar
                            </Button>
                          </div>
                        </article>
                      ))}
                    </div>

                    <div className="acciones-carrito">
                      <Button
                        variant="outline-danger"
                        onClick={vaciarCarrito}
                      >
                        Vaciar carrito
                      </Button>

                      <Button
                        as={Link}
                        to="/productos"
                        variant="outline-secondary"
                      >
                        Seguir comprando
                      </Button>
                    </div>
                  </>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} lg={4}>
            <Card className="panel-resumen">
              <Card.Body>
                <h2>Resumen de compra</h2>

                <div className="resumen-linea">
                  <span>Productos</span>
                  <span>{totalUnidades}</span>
                </div>

                <hr />

                <div className="resumen-total">
                  <strong>Total</strong>
                  <span>{formatoPrecio(totalPrecio)}</span>
                </div>
                  <Button
                    as={Link}
                    to="/checkout"
                    className="boton-continuar-compra mt-2"
                    disabled={carrito.length === 0}
                  >
                    Continuar compra
                  </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Carrito
