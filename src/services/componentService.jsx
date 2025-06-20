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

// ### ADMIN COMPONENTS ###
export const getAdminPaginatedComponents = async (page = 1, limit = 10) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/componentes?page=${page}&limit=${limit}`, {
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

export const createComponentAdmin = async (componentData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/componentes`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(componentData),
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message];
  }
};

export const updateComponentByIdAdmin = async (componentId, componentData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/componentes/${componentId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(componentData),
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message];
  }
};

export const deleteComponentByIdAdmin = async (componentId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/admin/componentes/${componentId}`, {
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

// ### USER COMPONENTS ###
export const getUserPaginatedComponents = async (page = 1, limit = 10) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuario/componentes?page=${page}&limit=${limit}`, {
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

export const getUserFilteredComponents = async ({
  type = "",
  subtype = "",
  is_active = "",
  stock_only = true,
  page = 1,
  limit = 10
}) => {
  try {
    const token = getToken();

    const params = new URLSearchParams({
      ...(type && { type }),
      ...(subtype && { subtype }),
      ...(is_active !== "" && { is_active }),
      stock_only: stock_only.toString(),
      page: page.toString(),
      limit: limit.toString(),
    });

    const response = await fetch(`${API_URL}/usuario/componentes/filtrar?${params.toString()}`, {
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

export const getComponentById = async (componentId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuario/componentes/${componentId}`, {
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