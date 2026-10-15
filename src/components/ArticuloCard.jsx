
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ArticuloCard({ titulo, categoria, descripcion, imagen, enlace }) {
    return (
        <Card as="article" className="producto-card h-100">

            <Link to={enlace}>
                <div className="producto-imagen">
                    <Card.Img
                        variant="top" src={imagen} alt={titulo}/>
                </div>
            </Link>

            <Card.Body>
                <p className="subtitulo-seccion">
                    {categoria}
                </p>

                <Card.Title as="h3">
                    {titulo}
                </Card.Title>

                <Card.Text>
                    {descripcion}
                </Card.Text>

                <Button as={Link} to={enlace} variant="primary" className="boton-carrito">
                    Leer artículo
                </Button>
            </Card.Body>

        </Card>
    )
}

export default ArticuloCard
