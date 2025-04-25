// URL de la API

const urlBase = import.meta.env.urlBase;


// Función para registrar un usuario
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

    // Procesar la respuesta de la API
    const data = await respuesta.json();

    // Si la respuesta no es exitosa, retornamos un mensaje de error
    if (!respuesta.ok) {
      return [null, "Error al registrar usuario"];
    }

    // Si la respuesta es exitosa, retornamos los datos
    return [data, null];
  } catch (error) {
    // Manejo de errores, retornando el mensaje del error
    return [null, error.message];
  }
};
