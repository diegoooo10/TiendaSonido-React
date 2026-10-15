
import { productos as productosIniciales } from './productos'

const CLAVE_PRODUCTOS = 'productosSonidoVivo'

// Cargar los productos guardados o usar los iniciales
function cargarProductos() {
  try {
    const guardados = localStorage.getItem(CLAVE_PRODUCTOS)

    if (guardados !== null) {
      return JSON.parse(guardados)
    }
  } catch {
    console.error('No se pudieron cargar los productos guardados.')
  }

  return productosIniciales.map((producto) => ({ ...producto }))
}

// Mantener los productos en memoria
let productos = cargarProductos()

// Guardar los cambios en localStorage
function guardarProductos() {
  try {
    localStorage.setItem(CLAVE_PRODUCTOS, JSON.stringify(productos))
    return true
  } catch {
    return false
  }
}

// Leer todos los productos
export function obtenerProductos() {
  return productos.map((producto) => ({ ...producto }))
}

// Buscar un producto por codigo
export function obtenerProductoPorCodigo(codigo) {
  return productos.find(
    (producto) => producto.codigo === codigo
  ) ?? null
}

// Crear un producto
export function crearProducto(nuevoProducto) {
  const existe = productos.some(
    (producto) => producto.codigo === nuevoProducto.codigo
  )

  if (existe) {
    return {
      exito: false,
      mensaje: 'Ya existe un producto con ese codigo.'
    }
  }

  productos.push({ ...nuevoProducto })

  if (!guardarProductos()) {
    productos.pop()

    return {
      exito: false,
      mensaje: 'No se pudo guardar el producto.'
    }
  }

  return {
    exito: true,
    mensaje: 'Producto creado correctamente.'
  }
}

// Actualizar un producto
export function actualizarProducto(codigo, datosActualizados) {
  const indice = productos.findIndex(
    (producto) => producto.codigo === codigo
  )

  if (indice === -1) {
    return {
      exito: false,
      mensaje: 'No se encontro el producto.'
    }
  }

  const productoAnterior = productos[indice]

  productos[indice] = {
    ...productoAnterior,
    ...datosActualizados,
    codigo
  }

  if (!guardarProductos()) {
    productos[indice] = productoAnterior

    return {
      exito: false,
      mensaje: 'No se pudo guardar la actualizacion.'
    }
  }

  return {
    exito: true,
    mensaje: 'Producto actualizado correctamente.'
  }
}

// Eliminar un producto
export function eliminarProducto(codigo) {
  const indice = productos.findIndex(
    (producto) => producto.codigo === codigo
  )

  if (indice === -1) {
    return {
      exito: false,
      mensaje: 'No se encontro el producto.'
    }
  }

  const [productoEliminado] = productos.splice(indice, 1)

  if (!guardarProductos()) {
    productos.splice(indice, 0, productoEliminado)

    return {
      exito: false,
      mensaje: 'No se pudo guardar la eliminacion.'
    }
  }

  return {
    exito: true,
    mensaje: 'Producto eliminado correctamente.'
  }
}
