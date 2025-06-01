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

// ### ENVÍOS ADMIN ###

export const getAdminPaginatedShipments = async (page = 1, limit = 10) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/envios?page=${page}&limit=${limit}`, {
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

export const getShipmentByIdAdmin = async (shipmentId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/envios/${shipmentId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message || "Error al conectar con el servidor"];
  }
};

export const updateShipmentByIdAdmin = async (shipmentId, shipmentData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/envios/${shipmentId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(shipmentData)
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message || "Error al conectar con el servidor"];
  }
};

export const deleteShipmentByIdAdmin = async (shipmentId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/envios/${shipmentId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message || "Error al conectar con el servidor"];
  }
};


export const createUserShipment = async (shipmentData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuarios/envios`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(shipmentData),
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message || "Error al conectar con el servidor"];
  }
};

export const updateShipmentsByOrderId = async (orderId, shipmentData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/envios/pedidos/${orderId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(shipmentData),
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message || "Error al conectar con el servidor"];
  }
};

export const getShipmentStatusByOrderIdAdmin = async (orderId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/envios/estado/${orderId}`, {
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