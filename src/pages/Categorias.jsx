
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { productos } from "../data/productos";

function Categorias() {
  const categorias = [
    ...new Set(productos.map((producto) => producto.categoria))
  ].sort();

  return (
    <Container className="py-4">
      <h1 className="mb-4">Categorias</h1>

      <Row className="g-3">
        {categorias.map((categoria) => {
          const cantidad = productos.filter(
            (producto) => producto.categoria === categoria
          ).length;

          return (
            <Col key={categoria} xs={12} md={6} lg={4}>
              <Card className="h-100">
                <Card.Body>
                  <Card.Title>{categoria}</Card.Title>

                  <Card.Text>
                    Productos disponibles: {cantidad}
                  </Card.Text>

                  <Button
                    as={Link}
                    to={`/categorias/${encodeURIComponent(categoria)}`}
                    variant="outline-primary"
                  >
                    Ver productos
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Categorias;
