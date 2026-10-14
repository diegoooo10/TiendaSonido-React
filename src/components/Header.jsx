
import { Container } from "react-bootstrap";

function Header() {
  return (
    <header className="header-sonido-vivo">
      <Container className="text-center">
        <img
          src="/img/logo_sonido_vivo_recortado.png"
          alt="Sonido Vivo - Instrumentos musicales y equipos de sonido"
          className="logo-header"
        />
      </Container>
    </header>
  );
}

export default Header;
