
import { productos } from "./productos";

// Leer todos los productos
export function obtenerProductos() {
  return [...productos];
}

// Buscar un producto por codigo
export function obtenerProductoPorCodigo(codigo) {
  return productos.find(
    (producto) => producto.codigo === codigo
  ) ?? null;
}

// Crear un producto
export function crearProducto(nuevoProducto) {
  const existe = productos.some(
    (producto) => producto.codigo === nuevoProducto.codigo
  );

  if (existe) {
    return {
      exito: false,
      mensaje: "Ya existe un producto con ese codigo."
    };
  }

  productos.push({ ...nuevoProducto });

  return {
    exito: true,
    mensaje: "Producto creado correctamente."
  };
}

// Actualizar un producto
export function actualizarProducto(codigo, datosActualizados) {
  const indice = productos.findIndex(
    (producto) => producto.codigo === codigo
  );

  if (indice === -1) {
    return {
      exito: false,
      mensaje: "No se encontro el producto."
    };
  }

  productos[indice] = {
    ...productos[indice],
    ...datosActualizados,
    codigo
  };

  return {
    exito: true,
    mensaje: "Producto actualizado correctamente."
  };
}

// Eliminar un producto
export function eliminarProducto(codigo) {
  const indice = productos.findIndex(
    (producto) => producto.codigo === codigo
  );

  if (indice === -1) {
    return {
      exito: false,
      mensaje: "No se encontro el producto."
    };
  }

  productos.splice(indice, 1);

  return {
    exito: true,
    mensaje: "Producto eliminado correctamente."
  };
}
