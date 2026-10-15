import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function ProductoCard({ producto }) {
  const { agregarAlCarrito } = useCarrito()

  const precioOferta =
    producto.codigo === 'MI001' ? 129990 : null

  const precioMostrar = precioOferta ?? producto.precio

  function manejarAgregarAlCarrito() {
    agregarAlCarrito(producto)
  }

  return (
    <Card className="h-100 shadow-sm tarjeta-catalogo">
      <Link
        to={`/productos/${producto.codigo}`}
        className="enlace-imagen-producto"
        aria-label={`Ver detalle de ${producto.nombre}`}
      >
        <Card.Img
          variant="top"
          src={`/${producto.imagen.replace(/^\/+/, '')}`}
          alt={producto.nombre}
          className="imagen-producto-catalogo"
        />
      </Link>

      <Card.Body className="d-flex flex-column">
        <Card.Title>
          {producto.nombre}
        </Card.Title>

        <Card.Text>
          {producto.descripcion}
        </Card.Text>

        {precioOferta !== null ? (
          <div className="precio-oferta-catalogo">
            <del>
              ${producto.precio.toLocaleString('es-CL')}
            </del>

            <h5>
              ${precioMostrar.toLocaleString('es-CL')}
            </h5>

            <span className="badge bg-danger">
              Oferta especial
            </span>
          </div>
        ) : (
          <h5 className="precio-catalogo">
            ${producto.precio.toLocaleString('es-CL')}
          </h5>
        )}

        <p className="stock-catalogo">
          Stock disponible: {producto.stock}
        </p>

        <Button
          type="button"
          variant="primary"
          className="mt-auto boton-agregar-catalogo"
          onClick={manejarAgregarAlCarrito}
          disabled={producto.stock <= 0}
        >
          {producto.stock <= 0
            ? 'Sin stock'
            : 'Agregar al carrito'}
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductoCard
