// URL de la API
const urlBase = import.meta.env.VITE_URL_BASE;

// Función para registrar un usuario público (sin token)
export const userRegister = async (nombres, apellidos, correo, telefono, fecha_nacimiento, rut, password) => {
  try {
    const respuesta = await fetch(`${urlBase}/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        nombres,
        apellidos,
        correo,
        telefono,
        fecha_nacimiento,
        rut,
        hashed_password: password,
      }),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, "Error al registrar usuario"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

// Función para obtener la lista de usuarios (requiere token)
export const getUsers = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return [null, "No se encontró el token de autenticación"];
  }

  try {
    const respuesta = await fetch(`${urlBase}/admin/usuarios`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      return [null, errorData.message || "Error al obtener los usuarios"];
    }

    const data = await respuesta.json();
    return [data, null];

  } catch (error) {
    return [null, error.message];
  }
};

// Función para registrar un usuario desde el panel admin (requiere token)
export const createUsers = async (nombres, apellidos, correo, telefono, fecha_nacimiento, rut, password, es_administrador) => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    return [null, "No se encontró el token de autenticación"];
  }

  try {
    console.log("Datos enviados al backend:", {
      nombres,
      apellidos,
      correo,
      telefono,
      fecha_nacimiento,
      rut,
      hashed_password: password,
      es_administrador,
    });

    const respuesta = await fetch(`${urlBase}/admin/usuarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        nombres,
        apellidos,
        correo,
        telefono,
        fecha_nacimiento,
        rut,
        hashed_password: password,
        es_administrador,
      }),
    });

    const data = await respuesta.json();

    if (!respuesta.ok) {
      return [null, data.message || "Error al registrar usuario"];
    }

    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};
