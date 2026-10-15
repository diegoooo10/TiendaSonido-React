
export function validarFormularioContacto(formulario) {
  const errores = {}

  const nombre = formulario.nombre.trim()
  const email = formulario.email.trim()
  const comentario = formulario.comentario.trim()

  const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  // Validar nombre
  if (!nombre) {
    errores.nombre = 'Debe ingresar un nombre.'
  }

  // Validar correo
  if (!email) {
    errores.email = 'Debe ingresar un correo.'
  } else if (!formatoCorreo.test(email)) {
    errores.email = 'Debe ingresar un correo valido.'
  }

  // Validar comentario
  if (!comentario) {
    errores.comentario = 'Debe ingresar un comentario.'
  }

  return errores
}
