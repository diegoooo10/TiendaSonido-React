
import { createContext, useContext, useState } from "react";

const CarritoContext = createContext();

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem("carritoSonidoVivo");
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  function guardarCarrito(nuevoCarrito) {
    setCarrito(nuevoCarrito);

    try {
      localStorage.setItem(
        "carritoSonidoVivo",
        JSON.stringify(nuevoCarrito)
      );
    } catch (error) {
      console.error("No se pudo guardar el carrito:", error);
    }
  }

  function agregarAlCarrito(producto) {
    const existente = carrito.find(
      (item) => item.codigo === producto.codigo
    );

    const cantidadActual = existente ? existente.cantidad : 0;

    if (
      producto.stock <= 0 ||
      cantidadActual >= producto.stock
    ) {
      return false;
    }

    let nuevoCarrito;

    if (existente) {
      nuevoCarrito = carrito.map((item) =>
        item.codigo === producto.codigo
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );
    } else {
      nuevoCarrito = [
        ...carrito,
        { ...producto, cantidad: 1 }
      ];
    }

    guardarCarrito(nuevoCarrito);
    return true;
  }

  function actualizarCantidad(codigo, nuevaCantidad) {
    const producto = carrito.find(
      (item) => item.codigo === codigo
    );

    if (!producto) return false;

    if (nuevaCantidad < 1) {
      eliminarDelCarrito(codigo);
      return true;
    }

    if (nuevaCantidad > producto.stock) {
      return false;
    }

    const nuevoCarrito = carrito.map((item) =>
      item.codigo === codigo
        ? { ...item, cantidad: nuevaCantidad }
        : item
    );

    guardarCarrito(nuevoCarrito);
    return true;
  }

  function eliminarDelCarrito(codigo) {
    const nuevoCarrito = carrito.filter(
      (item) => item.codigo !== codigo
    );

    guardarCarrito(nuevoCarrito);
  }

  function vaciarCarrito() {
    guardarCarrito([]);
  }

  const totalUnidades = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const totalPrecio = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        totalUnidades,
        totalPrecio
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
