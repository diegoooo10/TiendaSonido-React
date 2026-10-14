
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { productos } from "../data/productos";
import { useCarrito } from "../context/CarritoContext";

function DetalleProducto() {
  const { codigo } = useParams();
  const { agregarAlCarrito } = useCarrito();

  const producto = productos.find(
    (item) => String(item.codigo) === codigo
  );

  if (!producto) {
    return (
      <Container className="py-4">
        <Alert variant="warning">
          El producto que buscas no existe.
        </Alert>
        <Link to="/productos">Volver al catalogo</Link>
      </Container>
    );
  }

  function manejarAgregarAlCarrito() {
    agregarAlCarrito(producto);
  }

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={producto.imagen}
              alt={producto.nombre}
              style={{ height: "350px", objectFit: "contain" }}
            />
          </Card>
        </Col>

        <Col md={6}>
          <h1>{producto.nombre}</h1>

          <p>
            <strong>Codigo:</strong> {producto.codigo}
          </p>

          <p>
            <strong>Categoria:</strong> {producto.categoria}
          </p>

          <p>
            <strong>Marca:</strong> {producto.marca}
          </p>

          <p>
            <strong>Modelo:</strong> {producto.modelo}
          </p>

          <p>{producto.descripcion}</p>

          <h2 className="text-primary">
            ${producto.precio.toLocaleString("es-CL")}
          </h2>

          <p>
            <strong>Stock disponible:</strong> {producto.stock}
          </p>

          <Button
            variant="primary"
            onClick={manejarAgregarAlCarrito}
            disabled={producto.stock <= 0}
          >
            {producto.stock > 0
              ? "Agregar al carrito"
              : "Sin stock"}
          </Button>

          <div className="mt-3">
            <Link to="/productos">Volver al catalogo</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProducto;
