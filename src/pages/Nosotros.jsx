import { Container } from "react-bootstrap";

function Nosotros(){
    return (
        <Container>
            <section className = "nosotros">
                <h2 className = "mt-5 mb-5 text-center">
                    ¿ Quienes somos ?
                </h2>

                <p>
                    Sonido Vivo es una tienda especializada en instrumentos musicales,
                    equipos de sonido y accesorios para músicos, ubicada en Viña del Mar,
                    Región de Valparaíso.
                </p>

                <p>
                    Tiene 11 años de funcionamiento y es atendida por el dueño
                    y dos vendedores.
                </p>

                <p>
                    El catálogo incluye guitarras, bajos, baterías, teclados,
                    amplificadores, micrófonos, pedales de efectos y accesorios.
                    También ofrece reparación de instrumentos de cuerda.
                    El catálogo actual tiene 340 referencias distintas.
                </p>

                <p>
                    La tienda vende principalmente de forma presencial. Sin embargo,
                    en los últimos tres años ha comenzado a recibir pedidos por
                    WhatsApp e Instagram de clientes de otras ciudades, lo que genera
                    una carga que el equipo no puede manejar con los métodos actuales.
                </p>

                <img src = "/img/logo.png" alt = "logo-sonido-vivo" className = "w-50 rounded d-block mx-auto my-5"/>
            </section>
        </Container>
    )
}

export default Nosotros