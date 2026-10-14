
import { Navbar as BootstrapNavbar, Nav, Container, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function BarraNavegacion() {
  const { totalUnidades } = useCarrito();

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          <img
            src="/img/ondaSonido.png"
            alt="Sonido Vivo"
            width="75"
          />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="menu-principal" />

        <BootstrapNavbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/carrito">
              🛒Carrito
              <Badge bg="danger" className="ms-1">
                {totalUnidades}
              </Badge>
            </Nav.Link>

            <Nav.Link as={Link} to="/login">
              Iniciar sesión
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default BarraNavegacion;
