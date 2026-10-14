
import { Container, Table, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function Carrito() {
  const {
    carrito,
    actualizarCantidad,
    eliminarDelCarrito,
    vaciarCarrito,
    totalPrecio
  } = useCarrito();

  function formatoPrecio(precio) {
    return `$${precio.toLocaleString("es-CL")}`;
  }

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Carrito de compras</h1>

      {carrito.length === 0 ? (
        <Alert variant="info" className="text-center">
          Tu carrito esta vacio.
          <div className="mt-3">
            <Button as={Link} to="/productos">
              Ir al catalogo
            </Button>
          </div>
        </Alert>
      ) : (
        <>
          <Table responsive bordered hover>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {carrito.map((producto) => (
                <tr key={producto.codigo}>
                  <td>{producto.nombre}</td>

                  <td>{formatoPrecio(producto.precio)}</td>

                  <td>
                    <Button
                      size="sm"
                      variant="outline-secondary"
                      onClick={() =>
                        actualizarCantidad(
                          producto.codigo,
                          producto.cantidad - 1
                        )
                      }
                    >
                      -
                    </Button>

                    <span className="mx-3">
                      {producto.cantidad}
                    </span>

                    <Button
                      size="sm"
                      variant="outline-secondary"
                      disabled={
                        producto.cantidad >= producto.stock
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
                  </td>

                  <td>
                    {formatoPrecio(
                      producto.precio * producto.cantidad
                    )}
                  </td>

                  <td>
                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() =>
                        eliminarDelCarrito(producto.codigo)
                      }
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="text-end">
            <h3>Total: {formatoPrecio(totalPrecio)}</h3>

            <Button
              variant="outline-danger"
              className="me-2 mt-2"
              onClick={vaciarCarrito}
            >
              Vaciar carrito
            </Button>

            <Button
              as={Link}
              to="/productos"
              variant="primary"
              className="mt-2"
            >
              Seguir comprando
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Carrito;
