
export function validarFormularioCompra(datos) {
  const errores = {}

  const nombre = datos.nombre.trim()
  const correo = datos.correo.trim()
  const telefono = datos.telefono.trim()
  const direccion = datos.direccion.trim()
  const comuna = datos.comuna.trim()
  const region = datos.region.trim()

  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio.'
  } else if (nombre.length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres.'
  } else if (nombre.length > 100) {
    errores.nombre = 'El nombre no puede superar los 100 caracteres.'
  } else if (!/^[\p{L}\s'-]+$/u.test(nombre)) {
    errores.nombre = 'El nombre contiene caracteres no validos.'
  }

  if (!correo) {
    errores.correo = 'El correo electronico es obligatorio.'
  } else if (
    correo.length > 100 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo)
  ) {
    errores.correo = 'Ingresa un correo electronico valido.'
  }

  if (!telefono) {
    errores.telefono = 'El telefono es obligatorio.'
  } else if (!/^\+?[0-9\s()-]{8,20}$/.test(telefono)) {
    errores.telefono = 'Ingresa un telefono valido.'
  } else if (telefono.replace(/\D/g, '').length < 8) {
    errores.telefono = 'El telefono debe tener al menos 8 digitos.'
  }

  if (!direccion) {
    errores.direccion = 'La direccion es obligatoria.'
  } else if (direccion.length < 5) {
    errores.direccion = 'Ingresa una direccion mas completa.'
  } else if (direccion.length > 200) {
    errores.direccion = 'La direccion no puede superar los 200 caracteres.'
  }

  if (!comuna) {
    errores.comuna = 'La comuna es obligatoria.'
  } else if (comuna.length < 2 || comuna.length > 80) {
    errores.comuna = 'La comuna debe tener entre 2 y 80 caracteres.'
  }

  if (!region) {
    errores.region = 'Selecciona una region.'
  }

  if (!['domicilio', 'retiro'].includes(datos.entrega)) {
    errores.entrega = 'Selecciona un metodo de entrega valido.'
  }

  return errores
}
