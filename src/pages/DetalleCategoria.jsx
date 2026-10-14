
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Alert, Button } from "react-bootstrap";
import { productos } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

function DetalleCategoria() {
  const { categoria } = useParams();

  const nombreCategoria = decodeURIComponent(categoria);

  const productosFiltrados = productos.filter(
    (producto) => producto.categoria === nombreCategoria
  );

  return (
    <Container className="py-4">
      <h1 className="mb-4">{nombreCategoria}</h1>

      {productosFiltrados.length === 0 ? (
        <Alert variant="warning">
          No encontramos productos en esta categoria.
        </Alert>
      ) : (
        <Row className="g-4">
          {productosFiltrados.map((producto) => (
            <Col key={producto.codigo} xs={12} md={6} lg={4}>
              <ProductoCard producto={producto} />
            </Col>
          ))}
        </Row>
      )}

      <Button
        as={Link}
        to="/categorias"
        variant="outline-secondary"
        className="mt-4"
      >
        Volver a categorias
      </Button>
    </Container>
  );
}

export default DetalleCategoria;
