// src/services/userAuthService.jsx
const urlBase = import.meta.env.VITE_URL_BASE;

// Función para iniciar sesión (modificada)
export const userLogin = async (username, password) => {
  try {
    const respuesta = await fetch(`${urlBase}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json",
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

    // Decodificar el token para obtener el user_id
    const tokenPayload = JSON.parse(atob(data.access_token.split('.')[1]));
    const userInfo = {
      id: tokenPayload.user_id, // Asegúrate que tu backend incluya esto
      username: tokenPayload.sub,
      // otros campos que necesites
    };

    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("user_info", JSON.stringify(userInfo));

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

// Función para cerrar sesión (modificada)
export const userLogout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("user_info");
};

// Función para verificar autenticación (modificada)
export const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return {
      id: payload.user_id, // Asegúrate que coincida con lo que devuelve tu backend
      username: payload.sub,
      // otros campos
    };
  } catch (error) {
    return false;
  }
};

// Función para obtener información del usuario (actualizada)
export const getCurrentUser = () => {
  try {
    const userInfo = localStorage.getItem("user_info");
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    return null;
  }
};

// Función para obtener el token de acceso (sin cambios)
export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};