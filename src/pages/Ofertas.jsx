
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { productos } from "../data/productos";

function Ofertas() {
  const ofertas = productos.slice(0, 6).map((producto) => ({
    ...producto,
    descuento: 10
  }));

  return (
    <Container className="py-4">
      <h1 className="mb-4">Ofertas especiales</h1>

      <Row className="g-4">
        {ofertas.map((producto) => {
          const precioOferta = Math.round(
            producto.precio * (1 - producto.descuento / 100)
          );

          return (
            <Col key={producto.codigo} xs={12} md={6} lg={4}>
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={producto.imagen}
                  alt={producto.nombre}
                  style={{ height: "200px", objectFit: "contain" }}
                />

                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <Badge bg="danger">
                      {producto.descuento}% de descuento
                    </Badge>
                  </div>

                  <Card.Title>{producto.nombre}</Card.Title>

                  <p>
                    <del>
                      ${producto.precio.toLocaleString("es-CL")}
                    </del>
                  </p>

                  <h4 className="text-primary">
                    ${precioOferta.toLocaleString("es-CL")}
                  </h4>

                  <p>Stock disponible: {producto.stock}</p>

                  <Button
                    as={Link}
                    to={`/productos/${producto.codigo}`}
                    className="mt-auto"
                  >
                    Ver producto
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

export default Ofertas;
