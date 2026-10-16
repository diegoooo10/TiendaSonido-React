import { Container, Row, Col, Card } from 'react-bootstrap'
import FormularioRegistro from '../components/FormularioRegistro'

function Registro() {
  return (
    <section className="registro">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8}>

            <Card className="shadow-sm border-0">
              <Card.Body className="p-4 p-md-5">

                <div className="text-center mb-4">
                  <p className="subtitulo-seccion">SONIDO VIVO</p>
                  <h1>Crear una cuenta</h1>
                  <p className="descripcion-seccion">
                    Regístrate para formar parte de nuestra comunidad musical.
                  </p>
                  <div className="linea-decorativa" />
                </div>

                <FormularioRegistro />

              </Card.Body>
            </Card>

          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Registro