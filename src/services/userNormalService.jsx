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

// Función para obtener un usuario logueado
export const getCurrentUser = async () => {
  // Obtener el token de acceso del almacenamiento local
  const token = localStorage.getItem("access_token");
  if (!token) {
      return [null, "Acceso no autorizado. Token no encontrado"];
    }

    try {
      const response = await fetch(`${urlBase}/usuarios`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
  
      if (!response.ok) {
        const errorMessage = data?.detail || "Error al obtener el usuario";
        return [null, errorMessage];
      }
  
      return [data, null];
    } catch (error) {
      return [null, "Error al conectar con el servidor"];
    }
  };

// Función para actualizar un usuario logueado
export const updateCurrentUser = async (userUpdate) => {
  // Obtener el token de acceso del almacenamiento local
  const token = localStorage.getItem("access_token");
  if (!token) {
      return [null, "Acceso no autorizado. Token no encontrado"];
    }

    try {
      const response = await fetch(`${urlBase}/usuarios`, {
        method: "PUT",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userUpdate)
      });

      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
  
      if (!response.ok) {
        const errorMessage = data?.detail || "Error al obtener el usuario";
        return [null, errorMessage];
      }
  
      return [data, null];
    } catch (error) {
      console.error("Error en updateCurrentUser:", error);
      return [null, "Error al conectar con el servidor"];
    }
  };

// Función para obtener guitarras paginadas
export const getGuitars = async (page = 1, limit = 20) => {
  try {
    const response = await fetch(`${urlBase}/guitarras?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al obtener las guitarras";
      return [null, errorMessage];
    }

    return [data, null]; // Devuelve { guitars: [], total: X }
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

export const getGuitarById = async (guitarId) => {
  try {
    const response = await fetch(`${API_URL}/guitarras/${guitarId}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message || "Error al conectar con el servidor"];
  }
};