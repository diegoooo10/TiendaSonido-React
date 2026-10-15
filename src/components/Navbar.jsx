import { Navbar as BootstrapNavbar, Nav, Container, Badge } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useCarrito } from "../context/CarritoContext";

function BarraNavegacion() {
  const { totalUnidades } = useCarrito();

  const enlaceActivo = ({ isActive }) =>
    `enlace-navbar${isActive ? " active" : ""}`;

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={NavLink} to="/">
          <img
            src="/img/ondaSonido.png"
            alt="Sonido Vivo"
            width="75"
            className="logo-nav"
          />
        </BootstrapNavbar.Brand>

        <BootstrapNavbar.Toggle aria-controls="menu-principal" />

        <BootstrapNavbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end className={enlaceActivo}>
              Inicio
            </Nav.Link>

            <Nav.Link as={NavLink} to="/productos" className={enlaceActivo}>
              Productos
            </Nav.Link>

            <Nav.Link as={NavLink} to="/categorias" className={enlaceActivo}>
              Categorías
            </Nav.Link>

            <Nav.Link as={NavLink} to="/blog" className={enlaceActivo}>
              Blog
            </Nav.Link>

            <Nav.Link as={NavLink} to="/nosotros" className={enlaceActivo}>
              Nosotros
            </Nav.Link>

            <Nav.Link as={NavLink} to="/contacto" className={enlaceActivo}>
              Contacto
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link
              as={NavLink}
              to="/carrito"
              className={enlaceActivo}
            >
              🛒 Carrito
              <Badge bg="primary" className="ms-1">
                {totalUnidades}
              </Badge>
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/login"
              className={enlaceActivo}
            >
              Iniciar sesión
            </Nav.Link>

            <Nav.Link
              as={NavLink}
              to="/admin-productos"
              className={enlaceActivo}
            >
              Administración
            </Nav.Link>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default BarraNavegacion;
