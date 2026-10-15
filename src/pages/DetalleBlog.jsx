
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function DetalleBlog() {
    return (
        <section className="detalle-blog">
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col xs={12} lg={9}>

                        <Card as="article" className="producto-card">

                            <Card.Img variant="top" src="/img/guitarra.jpg" alt="Guía para elegir una guitarra" className='imagen-detalle-blog'/>

                            <Card.Body className="p-4 p-md-5">

                                <p className="subtitulo-seccion">
                                    GUÍAS
                                </p>

                                <h1 className="mb-3">
                                    ¿Cómo elegir tu primera guitarra?
                                </h1>

                                <p className="text-muted">
                                    Publicado el 8 de septiembre de 2026
                                </p>

                                <hr />

                                <p>
                                    Elegir una primera guitarra puede ser
                                    una experiencia emocionante, pero existen
                                    varios aspectos que debemos considerar
                                    antes de tomar una decisión.
                                </p>

                                <h2 className="mt-4">
                                    Define el tipo de guitarra
                                </h2>

                                <p>
                                    Lo primero es decidir qué tipo de guitarra
                                    se adapta mejor a tus necesidades.
                                    Las guitarras acústicas son una excelente
                                    alternativa para comenzar, mientras que
                                    las guitarras eléctricas son ideales si
                                    buscas tocar estilos como rock, blues
                                    o metal.
                                </p>

                                <h2 className="mt-4">
                                    Considera tu presupuesto
                                </h2>

                                <p>
                                    No es necesario comprar el instrumento
                                    más costoso para comenzar. Lo importante
                                    es encontrar una guitarra cómoda,
                                    resistente y adecuada para tu nivel.
                                </p>

                                <h2 className="mt-4">
                                    Prueba el instrumento
                                </h2>

                                <p>
                                    Si tienes la posibilidad, prueba la
                                    guitarra antes de comprarla. Revisa
                                    que sea cómoda de sostener y que las
                                    cuerdas sean fáciles de presionar.
                                </p>

                                <h2 className="mt-4">
                                    Busca asesoría
                                </h2>

                                <p>
                                    Si tienes dudas, siempre puedes consultar
                                    con alguien que tenga experiencia.
                                    En Sonido Vivo estaremos disponibles para
                                    ayudarte a encontrar el instrumento que
                                    mejor se adapte a tus necesidades.
                                </p>

                                <div className="mt-4">
                                    <Button as={Link} to="/blog" variant="primary">
                                        ← Volver al blog
                                    </Button>
                                </div>

                            </Card.Body>

                        </Card>

                    </Col>
                </Row>
            </Container>
        </section>
    )
}

export default DetalleBlog
