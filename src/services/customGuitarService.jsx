const API_URL = import.meta.env.VITE_URL_BASE;

const getToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Acceso no autorizado. Token no encontrado");
  return token;
};

const parseResponse = async (response) => {
  const text = await response.text();
  let data = {};
  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    return [null, "Respuesta del servidor no válida"];
  }

  if (!response.ok) {
    const errorMsg = data.detail || "Error en la petición";
    return [null, errorMsg];
  }
  return [data, null];
};

// ### USUARIO - Crear guitarra personalizada ###
export const createUserCustomGuitar = async (customGuitarData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuarios/guitarras-personalizadas`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customGuitarData),
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message];
  }
};

// ### USUARIO - Obtener guitarras personalizadas paginadas ###
export const getUserCustomGuitars = async (page = 1, limit = 10) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/guitarras-personalizadas?page=${page}&limit=${limit}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message];
  }
};

// ### ADMIN - Obtener todas las guitarras personalizadas paginadas ###
export const getAdminCustomGuitars = async (page = 1, limit = 10) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/guitarras-personalizadas?page=${page}&limit=${limit}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message];
  }
};
