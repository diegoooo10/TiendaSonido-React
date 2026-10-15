
import { useState } from 'react'
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Table,
  Alert
} from 'react-bootstrap'

import { Link } from 'react-router-dom'

import {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto
} from '../data/productosService'

import {
  validarFormularioProducto
} from '../validaciones/validacionesProductos'

const categorias = [
  'Guitarras Acústicas',
  'Guitarras Eléctricas',
  'Bajos Eléctricos',
  'Baterías',
  'Micrófonos',
  'Teclados y Pianos',
  'Amplificadores',
  'Pedales de Efectos',
  'Accesorios',
  'Estudio y Grabación'
]

const formularioInicial = {
  codigo: '',
  nombre: '',
  descripcion: '',
  precio: '',
  stock: '',
  stockCritico: '',
  categoria: '',
  imagen: ''
}

function AdminProductos() {
  const [productos, setProductos] = useState(() => obtenerProductos())
  const [formulario, setFormulario] = useState({ ...formularioInicial })
  const [codigoOriginal, setCodigoOriginal] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('success')
  const [errores, setErrores] = useState({})

  function manejarCambio(evento) {
    const { name, value } = evento.target

    const nuevoFormulario = {
      ...formulario,
      [name]: value
    }

    setFormulario(nuevoFormulario)

    if (Object.keys(errores).length > 0) {
      setErrores(validarFormularioProducto(nuevoFormulario))
    }
  }

  function limpiarFormulario() {
    setFormulario({ ...formularioInicial })
    setCodigoOriginal(null)
    setErrores({})
    setMensaje('')
  }

  function manejarEnvio(evento) {
    evento.preventDefault()

    const erroresValidacion = validarFormularioProducto(formulario)
    setErrores(erroresValidacion)

    if (Object.keys(erroresValidacion).length > 0) {
      setTipoMensaje('danger')
      setMensaje(
        'Revisa los campos del formulario. ' +
        Object.values(erroresValidacion).join(' ')
      )
      return
    }

    const stockCritico =
      formulario.stockCritico.trim() === ''
        ? 0
        : Number(formulario.stockCritico)

    const datosProducto = {
      codigo: formulario.codigo.trim(),
      nombre: formulario.nombre.trim(),
      descripcion: formulario.descripcion.trim(),
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      stockCritico,
      categoria: formulario.categoria,
      imagen: formulario.imagen.trim() || 'img/tienda.png'
    }

    const resultado = codigoOriginal
      ? actualizarProducto(codigoOriginal, datosProducto)
      : crearProducto(datosProducto)

    setTipoMensaje(resultado.exito ? 'success' : 'danger')

    let mensajeFinal = resultado.mensaje

    if (resultado.exito && datosProducto.stock <= stockCritico) {
      mensajeFinal +=
        ' Advertencia: el stock esta en el nivel critico o por debajo.'
    }

    setMensaje(mensajeFinal)

    if (resultado.exito) {
      setProductos(obtenerProductos())
      setFormulario({ ...formularioInicial })
      setCodigoOriginal(null)
      setErrores({})
    }
  }

  function prepararEdicion(producto) {
    setCodigoOriginal(producto.codigo)

    setFormulario({
      codigo: producto.codigo,
      nombre: producto.nombre || '',
      descripcion: producto.descripcion || '',
      precio: String(producto.precio ?? ''),
      stock: String(producto.stock ?? ''),
      stockCritico: String(producto.stockCritico ?? ''),
      categoria: producto.categoria || '',
      imagen: producto.imagen || ''
    })

    setErrores({})
    setMensaje('')

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function manejarEliminacion(codigo) {
    const confirmado = window.confirm(
      `¿Estas seguro de eliminar el producto ${codigo}?`
    )

    if (!confirmado) return

    const resultado = eliminarProducto(codigo)

    setTipoMensaje(resultado.exito ? 'success' : 'danger')
    setMensaje(resultado.mensaje)

    if (resultado.exito) {
      setProductos(obtenerProductos())

      if (codigoOriginal === codigo) {
        setFormulario({ ...formularioInicial })
        setCodigoOriginal(null)
        setErrores({})
      }
    }
  }

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <p className="text-primary fw-bold mb-2">
          ADMINISTRACIÓN
        </p>

        <h1>Administración de productos</h1>

        <p className="text-secondary">
          Agrega nuevos productos a Sonido Vivo.
        </p>

        <div
          className="bg-primary mx-auto my-4"
          style={{ width: 44, height: 2 }}
        />

        <div className="d-flex justify-content-center gap-2">
          <Button variant="primary" type="button">
            Productos
          </Button>

          <Button
            as={Link}
            to="/admin-usuarios"
            variant="outline-primary"
          >
            Usuarios
          </Button>
        </div>
      </div>

      {mensaje && (
        <Alert
          variant={tipoMensaje}
          dismissible
          onClose={() => setMensaje('')}
        >
          {mensaje}
        </Alert>
      )}

      <Card className="shadow-sm mb-5">
        <Card.Body className="p-4">
          <h2 className="h4 mb-4">
            {codigoOriginal ? 'Editar producto' : 'Nuevo producto'}
          </h2>

          <Form noValidate onSubmit={manejarEnvio}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Codigo del producto</Form.Label>
                  <Form.Control
                    name="codigo"
                    value={formulario.codigo}
                    onChange={manejarCambio}
                    disabled={codigoOriginal !== null}
                    maxLength={50}
                    isInvalid={Boolean(errores.codigo)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.codigo}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    name="nombre"
                    value={formulario.nombre}
                    onChange={manejarCambio}
                    maxLength={100}
                    isInvalid={Boolean(errores.nombre)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.nombre}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col xs={12}>
                <Form.Group>
                  <Form.Label>Descripcion</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="descripcion"
                    value={formulario.descripcion}
                    onChange={manejarCambio}
                    maxLength={500}
                    isInvalid={Boolean(errores.descripcion)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.descripcion}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Campo opcional. Maximo 500 caracteres.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    step="1"
                    name="precio"
                    value={formulario.precio}
                    onChange={manejarCambio}
                    isInvalid={Boolean(errores.precio)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.precio}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    name="stock"
                    value={formulario.stock}
                    onChange={manejarCambio}
                    isInvalid={Boolean(errores.stock)}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.stock}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Stock critico</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    step="1"
                    name="stockCritico"
                    value={formulario.stockCritico}
                    onChange={manejarCambio}
                    isInvalid={Boolean(errores.stockCritico)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errores.stockCritico}
                  </Form.Control.Feedback>
                  <Form.Text className="text-muted">
                    Opcional. Si lo dejas vacio, se usara 0.
                  </Form.Text>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Categoria</Form.Label>
                  <Form.Select
                    name="categoria"
                    value={formulario.categoria}
                    onChange={manejarCambio}
                    isInvalid={Boolean(errores.categoria)}
                    required
                  >
                    <option value="">Seleccionar categoria</option>

                    {categorias.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {errores.categoria}
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Ruta de imagen</Form.Label>
                  <Form.Control
                    name="imagen"
                    value={formulario.imagen}
                    onChange={manejarCambio}
                    placeholder="img/tienda.png"
                  />
                  <Form.Text className="text-muted">
                    Ingresa una ruta de imagen existente en public.
                  </Form.Text>
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <Button type="submit" variant="primary">
                {codigoOriginal ? 'Guardar cambios' : 'Guardar producto'}
              </Button>

              <Button
                type="button"
                variant="outline-secondary"
                onClick={limpiarFormulario}
              >
                {codigoOriginal ? 'Cancelar edicion' : 'Limpiar'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <h2 className="h4 mb-3">
        Productos registrados ({productos.length})
      </h2>

      <div className="table-responsive">
        <Table striped bordered hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Categoria</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((producto) => (
              <tr key={producto.codigo}>
                <td>{producto.codigo}</td>
                <td>{producto.nombre}</td>
                <td>{producto.categoria}</td>
                <td>
                  ${Number(producto.precio).toLocaleString('es-CL')}
                </td>
                <td>{producto.stock}</td>
                <td>
                  <div className="d-flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => prepararEdicion(producto)}
                    >
                      Editar
                    </Button>

                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => manejarEliminacion(producto.codigo)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {productos.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center">
                  No hay productos registrados.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </Container>
  )
}

export default AdminProductos
