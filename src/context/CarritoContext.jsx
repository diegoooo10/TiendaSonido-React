
import {
  createContext,useContext,useEffect,useRef,useState} from "react";

const CarritoContext = createContext(null);

const CLAVE_CARRITO = "carritoSonidoVivo";
const MAXIMO_CARRITO = 20;

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = localStorage.getItem(CLAVE_CARRITO);
      return guardado ? JSON.parse(guardado) : [];
    } catch {
      return [];
    }
  });

  const [notificacion, setNotificacion] = useState(null);
  const temporizador = useRef(null);

  function mostrarNotificacion(mensaje, esError = false) {
    if (temporizador.current) {
      clearTimeout(temporizador.current);
    }

    setNotificacion({
      mensaje,
      esError
    });

    temporizador.current = setTimeout(() => {
      setNotificacion(null);
      temporizador.current = null;
    }, 3000);
  }

  useEffect(() => {
    return () => {
      if (temporizador.current) {
        clearTimeout(temporizador.current);
      }
    };
  }, []);

  function guardarCarrito(nuevoCarrito) {
    setCarrito(nuevoCarrito);

    try {
      localStorage.setItem(
        CLAVE_CARRITO,
        JSON.stringify(nuevoCarrito)
      );
    } catch (error) {
      console.error("No se pudo guardar el carrito:", error);
      mostrarNotificacion(
        "No se pudo guardar el carrito.",
        true
      );
    }
  }

  const totalUnidades = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  );

  const totalPrecio = carrito.reduce(
    (total, item) => total + item.precio * item.cantidad,
    0
  );

  function agregarAlCarrito(producto) {
    if (!producto || producto.stock <= 0) {
      mostrarNotificacion(
        "Este producto no tiene stock disponible.",
        true
      );
      return false;
    }

    if (totalUnidades >= MAXIMO_CARRITO) {
      mostrarNotificacion(
        "Has alcanzado el máximo de 20 productos en el carrito.",
        true
      );
      return false;
    }

    const existente = carrito.find(
      item => item.codigo === producto.codigo
    );

    const cantidadActual = existente
      ? existente.cantidad
      : 0;

    if (cantidadActual >= producto.stock) {
      mostrarNotificacion(
        "Has alcanzado el stock disponible de este producto.",
        true
      );
      return false;
    }

    let nuevoCarrito;

    if (existente) {
      nuevoCarrito = carrito.map(item =>
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
    mostrarNotificacion("Producto agregado al carrito.");

    return true;
  }

  function actualizarCantidad(codigo, nuevaCantidad) {
    const producto = carrito.find(
      item => item.codigo === codigo
    );

    if (!producto) {
      return false;
    }

    if (nuevaCantidad <= 0) {
      eliminarDelCarrito(codigo);
      return true;
    }

    if (nuevaCantidad > producto.stock) {
      mostrarNotificacion(
        "Has alcanzado el stock disponible de este producto.",
        true
      );
      return false;
    }

    const otrasUnidades = totalUnidades - producto.cantidad;

    if (otrasUnidades + nuevaCantidad > MAXIMO_CARRITO) {
      mostrarNotificacion(
        "Has alcanzado el máximo de 20 productos en el carrito.",
        true
      );
      return false;
    }

    const nuevoCarrito = carrito.map(item =>
      item.codigo === codigo
        ? { ...item, cantidad: nuevaCantidad }
        : item
    );

    guardarCarrito(nuevoCarrito);
    return true;
  }

  function eliminarDelCarrito(codigo) {
    const nuevoCarrito = carrito.filter(
      item => item.codigo !== codigo
    );

    guardarCarrito(nuevoCarrito);
    mostrarNotificacion("Producto eliminado del carrito.");
  }

  function vaciarCarrito() {
    guardarCarrito([]);
    mostrarNotificacion("El carrito se ha vaciado.");
  }

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        actualizarCantidad,
        eliminarDelCarrito,
        vaciarCarrito,
        totalUnidades,
        totalPrecio,
        mostrarNotificacion
      }}
    >
      {children}

      {notificacion && (
        <div
          className={`notificacion-carrito ${
            notificacion.esError ? "error" : ""
          }`}
          role={notificacion.esError ? "alert" : "status"}
          aria-live="polite"
        >
          {notificacion.mensaje}
        </div>
      )}
    </CarritoContext.Provider>
  );
}

export function useCarrito() {
  return useContext(CarritoContext);
}
