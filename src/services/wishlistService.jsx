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

// Obtener wishlist del usuario logueado
export const getMyWishlist = async (page = 1, limit = 10) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/wishlist?page=${page}&limit=${limit}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message];
  }
};

// Agregar guitarra a wishlist
export const addToWishlist = async (guitarId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/wishlist/${guitarId}`, {
      method: "POST",
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

// Eliminar guitarra de wishlist
export const deleteFromWishlist = async (guitarId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/wishlist/${guitarId}`, {
      method: "DELETE",
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

// Chequear si guitarra está en wishlist
export const isInWishlist = async (guitarId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/wishlist/check/${guitarId}`, {
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
