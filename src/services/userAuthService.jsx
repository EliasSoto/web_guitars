// URL de la API
const urlBase = import.meta.env.VITE_URL_BASE;

// Función para iniciar sesión
export const userLogin = async (username, password) => {
  try {
    const respuesta = await fetch(`${urlBase}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        accept: "application/json",
      },
      body: new URLSearchParams({
        username,
        password,
      }),
    });

    const text = await respuesta.text();
    const data = text ? JSON.parse(text) : {};

    if (!respuesta.ok) {
      const errorMessage = data?.detail || "Credenciales inválidas";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

// Función para cerrar sesión
export const userLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_info");
};

// Función para verificar autenticación
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

// Función para obtener información del usuario
export const getCurrentUser = () => {
  try {
    const userInfo = localStorage.getItem("user_info");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    return null;
  }
};

// Función para obtener el token de acceso
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};
