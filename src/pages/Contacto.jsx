import { Container, Row, Col } from "react-bootstrap";
import FormularioContacto from "../components/FormularioContacto";

function Contacto(){
    return(
        <section className = "contacto">
            <Container className = "py-5">
                <div className="text-center mb-5">
                    <p className="subtitulo-seccion">
                        ESTAMOS PARA AYUDARTE
                    </p>

                    <h1>Contáctanos</h1>

                    <p className="descripcion-seccion">
                        ¿ Tienes alguna consulta sobre nuestros productos ?
                        Escríbenos y estaremos encantados de ayudarte
                    </p>

                    <div className="linea-decorativa"/>
                </div>

                <Row className="g-5">
                    <Col xs={12} lg={5}>
                        <div className="contacto-info">
                            <h2>Información de contacto</h2>

                            <p>
                                Puedes visitarnos en nuestra tienda física
                                o comunicarte con nosotros a través de
                                nuestros canales de atención.
                            </p>

                            <div className="dato-contacto">
                                <h3>Dirección</h3>
                                <p>
                                    Av. Libertad 1234
                                    <br />
                                    Viña del Mar, Región de Valparaíso
                                </p>
                            </div>

                            <div className="dato-contacto">
                                <h3>Teléfono</h3>
                                <p>+56 9 1234 5678</p>
                            </div>

                            <div className="dato-contacto">
                                <h3>Correo electrónico</h3>
                                <p>contacto@sonidovivo.cl</p>
                            </div>

                            <div className="dato-contacto">
                                <h3>Horario de atención</h3>
                                <p>
                                    Lunes a viernes
                                    <br />
                                    09:00 - 18:00 hrs.
                                </p>
                            </div>
                        </div>
                    </Col>

                    <Col xs={12} lg={7}>
                        <FormularioContacto />
                    </Col>
                </Row>
            </Container>
        </section>
    )

}

export default Contacto