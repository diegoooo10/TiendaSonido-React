
export function validarRUN(run) {
  const valor = run.trim().toUpperCase()

  // Validar formato sin puntos ni guion
  if (!/^[0-9]{6,8}[0-9K]$/.test(valor)) {
    return false
  }

  const cuerpo = valor.slice(0, -1)
  const digitoIngresado = valor.slice(-1)

  let suma = 0
  let multiplicador = 2

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1
  }

  const resultado = 11 - (suma % 11)

  let digitoEsperado

  if (resultado === 11) {
    digitoEsperado = '0'
  } else if (resultado === 10) {
    digitoEsperado = 'K'
  } else {
    digitoEsperado = String(resultado)
  }

  return digitoIngresado === digitoEsperado
}

const tiposUsuario = ['Administrador', 'Empleado', 'Cliente']

export function validarFormularioUsuario(formulario) {
  const errores = {}

  const run = formulario.run.trim().toUpperCase()
  const nombre = formulario.nombre.trim()
  const apellidos = formulario.apellidos.trim()
  const correo = formulario.correo.trim()
  const direccion = formulario.direccion.trim()

  // Validar RUN
  if (!run) {
    errores.run = 'El RUN es obligatorio.'
  } else if (/[.-]/.test(run)) {
    errores.run = 'Ingresa el RUN sin puntos ni guion.'
  } else if (!validarRUN(run)) {
    errores.run = 'Ingresa un RUN valido con su digito verificador.'
  }

  // Validar nombre
  if (!nombre) {
    errores.nombre = 'El nombre es obligatorio.'
  } else if (nombre.length > 50) {
    errores.nombre = 'El nombre no puede superar los 50 caracteres.'
  }

  // Validar apellidos
  if (!apellidos) {
    errores.apellidos = 'Los apellidos son obligatorios.'
  } else if (apellidos.length > 100) {
    errores.apellidos = 'Los apellidos no pueden superar los 100 caracteres.'
  }

  // Validar correo
  const correoValido =
    /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(correo)

  if (!correo) {
    errores.correo = 'El correo es obligatorio.'
  } else if (correo.length > 100) {
    errores.correo = 'El correo no puede superar los 100 caracteres.'
  } else if (!correoValido) {
    errores.correo =
      'Usa un correo terminado en duoc.cl, profesor.duoc.cl o gmail.com.'
  }

  // Validar fecha de nacimiento
  if (!formulario.fechaNacimiento) {
    errores.fechaNacimiento = 'La fecha de nacimiento es obligatoria.'
  } else {
    const fecha = new Date(`${formulario.fechaNacimiento}T00:00:00`)
    const hoy = new Date()
    hoy.setHours(0, 0, 0, 0)

    if (Number.isNaN(fecha.getTime())) {
      errores.fechaNacimiento = 'Ingresa una fecha valida.'
    } else if (fecha > hoy) {
      errores.fechaNacimiento = 'La fecha no puede ser futura.'
    }
  }

  // Validar tipo de usuario
  if (!formulario.tipoUsuario) {
    errores.tipoUsuario = 'Selecciona un tipo de usuario.'
  } else if (!tiposUsuario.includes(formulario.tipoUsuario)) {
    errores.tipoUsuario = 'Selecciona un tipo de usuario valido.'
  }

  // Validar direccion
  if (!direccion) {
    errores.direccion = 'La direccion es obligatoria.'
  } else if (direccion.length > 300) {
    errores.direccion = 'La direccion no puede superar los 300 caracteres.'
  }

  return errores
}
