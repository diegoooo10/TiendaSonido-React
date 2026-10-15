import { Container, Row, Col } from 'react-bootstrap'
import ArticuloCard from '../components/ArticuloCard'
const articulos = [
    {
        id: 1,
        titulo: "¿Cómo elegir tu primera guitarra?",
        categoria: "GUÍAS",
        descripcion: "Conoce los principales aspectos que debes considerar antes de comprar una guitarra.",
        imagen: "/img/guitarra.jpg",
        enlace: "/blog/primera-guitarra"
    },
    {
        id: 2,
        titulo: "Cómo cuidar tu batería",
        categoria: "CONSEJOS",
        descripcion: "Aprende algunos consejos básicos para mantener tu batería en buenas condiciones.",
        imagen: "/img/bateria.jpg",
        enlace: "/blog/cuidar-bateria"
    },
    {
        id: 3,
        titulo: "Consejos para grabar voces",
        categoria: "GRABACIÓN",
        descripcion: "Descubre recomendaciones para conseguir una mejor calidad de audio en tus grabaciones.",
        imagen: "/img/microfono.jpg",
        enlace: "/blog/grabar-voces"
    },
    {
        id: 4,
        titulo: "Tipos de guitarras eléctricas",
        categoria: "INSTRUMENTOS",
        descripcion: "Conoce algunas de las principales diferencias entre los modelos de guitarras eléctricas.",
        imagen: "/img/guitarra.jpg",
        enlace: "/blog/tipos-guitarras"
    },
    {
        id: 5,
        titulo: "¿Qué micrófono elegir?",
        categoria: "EQUIPOS",
        descripcion: "Aprende las diferencias básicas entre distintos tipos de micrófonos.",
        imagen: "/img/microfono.jpg",
        enlace: "/blog/elegir-microfono"
    },
    {
        id: 6,
        titulo: "Primeros pasos en la batería",
        categoria: "APRENDIZAJE",
        descripcion: "Algunos consejos para quienes comienzan a aprender batería.",
        imagen: "/img/bateria.jpg",
        enlace: "/blog/primeros-pasos-bateria"
    }
];

function Blog(){
    return (
        <section className="productos-destacados">
            <Container className="py-5">

                <div className="text-center mb-5">
                    <p className="subtitulo-seccion">
                        SONIDO VIVO
                    </p>

                    <h1>Nuestro Blog</h1>

                    <p className="descripcion-seccion">
                        Consejos, noticias y contenido para músicos
                        y amantes de la música.
                    </p>

                    <div className="linea-decorativa" />
                </div>

                <Row className="g-4">
                    {articulos.map((articulo) => (
                    <Col xs={12} md={6} lg={4} key={articulo.id}>
                        <ArticuloCard titulo={articulo.titulo} categoria={articulo.categoria} descripcion={articulo.descripcion} imagen={articulo.imagen} enlace={articulo.enlace}/>
                    </Col>))}
                </Row>

            </Container>
        </section>
    )
}

export default Blog