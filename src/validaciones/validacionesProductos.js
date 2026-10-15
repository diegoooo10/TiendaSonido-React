
const categoriasValidas = [
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

export function validarFormularioProducto(formulario) {
  const errores = {}

  const codigo = formulario.codigo.trim()
  const nombre = formulario.nombre.trim()
  const descripcion = formulario.descripcion.trim()
  const precio = Number(formulario.precio)
  const stock = Number(formulario.stock)
  const stockCritico = Number(formulario.stockCritico)

  // Codigo
  if (!codigo) {
    errores.codigo = 'El codigo es obligatorio.'
  } else if (codigo.length < 3) {
    errores.codigo = 'El codigo debe tener al menos 3 caracteres.'
  }

  // Nombre
  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio.'
  } else if (nombre.length > 100) {
    errores.nombre = 'El nombre no puede superar los 100 caracteres.'
  }

  // Descripcion: opcional, con limite de 500 caracteres
  if (descripcion.length > 500) {
    errores.descripcion =
      'La descripcion no puede superar los 500 caracteres.'
  }

  // Precio: obligatorio y mayor que cero
  if (formulario.precio.trim() === '') {
    errores.precio = 'El precio es obligatorio.'
  } else if (!Number.isFinite(precio) || precio <= 0) {
    errores.precio = 'El precio debe ser mayor que cero.'
  }

  // Stock: obligatorio, entero y no negativo
  if (formulario.stock.trim() === '') {
    errores.stock = 'El stock es obligatorio.'
  } else if (!Number.isInteger(stock) || stock < 0) {
    errores.stock = 'El stock debe ser un numero entero no negativo.'
  }

  // Stock critico: opcional, pero si se ingresa debe ser entero
  if (formulario.stockCritico.trim() !== '') {
    if (!Number.isInteger(stockCritico) || stockCritico < 0) {
      errores.stockCritico =
        'El stock critico debe ser un entero no negativo.'
    }
  }

  // Categoria
  if (!formulario.categoria) {
    errores.categoria = 'Selecciona una categoria.'
  } else if (!categoriasValidas.includes(formulario.categoria)) {
    errores.categoria = 'Selecciona una categoria valida.'
  }

  return errores
}
