
const API_URL = import.meta.env.VITE_URL_BASE;

const getToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("Acceso no autorizado. Token no encontrado");
  return token;
};

const parseResponse = async (response) => {
  const text = await response.text();
  const data = text ? JSON.parse(text) : {};

  if (!response.ok) {
    if (response.status === 422) {
      const errorMsg = Array.isArray(data.detail)
        ? data.detail.map(e => e.msg).join(", ")
        : data.detail || "Datos inválidos";
      return [null, errorMsg];
    }
    return [null, data.detail || "Error en la petición"];
  }
  return [data, null];
};

export const getAdminPaginatedGuitars = async (page = 1, limit = 10) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/guitarras?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message || "Error al conectar con el servidor"];
  }
};

export const deleteGuitarById = async (guitarId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/guitarras/${guitarId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message || "Error al conectar con el servidor"];
  }
};

export const updateAdminGuitarById = async (guitarId, guitarData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/guitarras/${guitarId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(guitarData),
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message || "Error al conectar con el servidor"];
  }
};

export const getAdminGuitarById = async (guitarId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/guitarras/${guitarId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message || "Error al conectar con el servidor"];
  }
};

export const registerAdminGuitar = async (
  model,
  brand,
  description,
  purchase_price,
  sale_price,
  purchase_date,
  wood_type,
  image_link,
  color,
  stock,
  is_custom,
  fret_count
) => {
    // Obtener token
    const token = localStorage.getItem("access_token");
    if (!token) {
        return [null, "Acceso no autorizado. Token no encontrado"];
      }
  
    try {
      const response = await fetch(`${API_URL}/admin/guitarras`, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          model,
          brand,
          description,
          purchase_price,
          sale_price,
          purchase_date,
          wood_type,
          image_link,
          color,
          stock,
          is_custom,
          fret_count
        }),
      });
  
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
  
      if (!response.ok) {
        if (response.status === 422) {
            const errorMsg = data.detail || 
                (Array.isArray(data.detail) ? data.detail.map(e => e.msg).join(', ') : "Datos inválidos");
            return [null, errorMsg];
        }
        return [null, data.detail || "Error al crear la guitarra"];
      }
  
      return [data, null];
    } catch (error) {
      return [null, "Error al conectar con el servidor"];
    }
};