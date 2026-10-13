
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function ProductoCard({ producto }) {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={producto.imagen}
        alt={producto.nombre}
        style={{ height: '220px', objectFit: 'contain' }}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title>{producto.nombre}</Card.Title>

        <Card.Text>{producto.descripcion}</Card.Text>

        <h5 className="text-primary">
          ${producto.precio.toLocaleString('es-CL')}
        </h5>

        <p>Stock disponible: {producto.stock}</p>

        <Button
          as={Link}
          to={`/productos/${producto.codigo}`}
          variant="outline-primary"
          className="mt-auto"
        >
          Ver detalle
        </Button>
      </Card.Body>
    </Card>
  )
}

export default ProductoCard
