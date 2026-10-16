
const CLAVE_USUARIOS = 'usuariosSonidoVivo'

function cargarUsuarios() {
  try {
    const guardados = localStorage.getItem(CLAVE_USUARIOS)

    if (guardados !== null) {
      return JSON.parse(guardados)
    }
  } catch {
    console.error('No se pudieron cargar los usuarios.')
  }

  return []
}

let usuarios = cargarUsuarios()

function guardarUsuarios() {
  try {
    localStorage.setItem(CLAVE_USUARIOS, JSON.stringify(usuarios))
    return true
  } catch {
    return false
  }
}

// Leer todos los usuarios
export function obtenerUsuarios() {
  return usuarios.map((usuario) => ({ ...usuario }))
}

// Buscar un usuario por RUN
export function obtenerUsuarioPorRun(run) {
  return usuarios.find(
    (usuario) => usuario.run === run
  ) ?? null
}

// Crear un usuario
export function crearUsuario(nuevoUsuario) {
  const existe = usuarios.some(
    (usuario) => usuario.run === nuevoUsuario.run
  )

  if (existe) {
    return {
      exito: false,
      mensaje: 'Ya existe un usuario con ese RUN.'
    }
  }

  usuarios.push({ ...nuevoUsuario })

  if (!guardarUsuarios()) {
    usuarios.pop()

    return {
      exito: false,
      mensaje: 'No se pudo guardar el usuario.'
    }
  }

  return {
    exito: true,
    mensaje: 'Usuario creado correctamente.'
  }
}

// Actualizar un usuario
export function actualizarUsuario(run, datosActualizados) {
  const indice = usuarios.findIndex(
    (usuario) => usuario.run === run
  )

  if (indice === -1) {
    return {
      exito: false,
      mensaje: 'No se encontro el usuario.'
    }
  }

  const usuarioAnterior = usuarios[indice]

  usuarios[indice] = {
    ...usuarioAnterior,
    ...datosActualizados,
    run
  }

  if (!guardarUsuarios()) {
    usuarios[indice] = usuarioAnterior

    return {
      exito: false,
      mensaje: 'No se pudo guardar la actualizacion.'
    }
  }

  return {
    exito: true,
    mensaje: 'Usuario actualizado correctamente.'
  }
}

// Eliminar un usuario
export function eliminarUsuario(run) {
  const indice = usuarios.findIndex(
    (usuario) => usuario.run === run
  )

  if (indice === -1) {
    return {
      exito: false,
      mensaje: 'No se encontro el usuario.'
    }
  }

  const [usuarioEliminado] = usuarios.splice(indice, 1)

  if (!guardarUsuarios()) {
    usuarios.splice(indice, 0, usuarioEliminado)

    return {
      exito: false,
      mensaje: 'No se pudo guardar la eliminacion.'
    }
  }

  return {
    exito: true,
    mensaje: 'Usuario eliminado correctamente.'
  }
  
}

export function crearAdministradorPrueba() {
  const existe = usuarios.some(usuario => usuario.correo === 'admin')

  if (existe) return

  crearUsuario({
    run: 'ADMIN-DEMO',
    nombre: 'Administrador',
    apellidos: 'Sonido Vivo',
    correo: 'admin',
    fechaNacimiento: '2000-01-01',
    direccion: 'Sonido Vivo',
    tipoUsuario: 'Administrador',
    contrasena: 'admin'
  })
}

crearAdministradorPrueba()
