import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ArticuloCard({ titulo, categoria, descripcion, imagen, enlace }) {
    return (
        <Card as="article" className="tarjeta-blog h-100">
            <Link
                to={enlace}
                className="imagen-enlace-blog"
                aria-label={`Leer artículo: ${titulo}`}
            >
                <Card.Img
                    variant="top"
                    src={imagen}
                    alt={titulo}
                    className="imagen-tarjeta-blog"
                />
            </Link>

            <Card.Body className="d-flex flex-column">
                <p className="categoria-blog">{categoria}</p>

                <Card.Title as="h3">
                    {titulo}
                </Card.Title>

                <Card.Text>
                    {descripcion}
                </Card.Text>

                <Button
                    as={Link}
                    to={enlace}
                    variant="primary"
                    className="boton-leer-blog mt-auto align-self-start"
                >
                    Leer artículo
                </Button>
            </Card.Body>
        </Card>
    )
}

export default ArticuloCard