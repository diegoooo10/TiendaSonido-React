import { Container, Row, Col, Card } from 'react-bootstrap'
import FormularioLogin from '../components/FormularioLogin'

function Login() {
  return (
    <section className="login">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={8} lg={5}>

            <Card className="shadow-sm border-0">
              <Card.Body className="p-4 p-md-5">

                <div className="text-center mb-4">
                  <p className="subtitulo-seccion">SONIDO VIVO</p>
                  <h1>Iniciar sesión</h1>
                  <p className="descripcion-seccion">Ingresa a tu cuenta para continuar disfrutando de nuestra comunidad musical.</p>
                  <div className="linea-decorativa" />
                </div>

                <FormularioLogin />

              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Login