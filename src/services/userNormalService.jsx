// URL de la API
const urlBase = import.meta.env.VITE_URL_BASE;

// Función para registrar un nuevo usuario
export const registerNormalUser = async (first_name, last_name, email, phone, birth_date, rut, password) => {
  // Validar campos obligatorios
  if (!first_name || !last_name || !phone || !rut || !password) {
    return [null, "Faltan campos obligatorios"];
  }

  try {
    const response = await fetch(`${urlBase}/usuarios`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
        birth_date,
        rut,
        hashed_password: password,
      }),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al registrar el usuario";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};