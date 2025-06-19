// URL de la API
const urlBase = import.meta.env.VITE_URL_BASE;

// ### USUARIOS ###

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

// ### GUITARRAS ###

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

export const getGuitarsUsers = async (page = 1, limit = 20) => {
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
    const response = await fetch(`${urlBase}/guitarras/${guitarId}`, {
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

// Obtener guitarra base por tipo de madera y color
export const getBaseGuitarByWoodAndColor = async (woodType, color) => {
  try {
    const response = await fetch(`${urlBase}/guitarras/base?wood_type=${encodeURIComponent(woodType)}&color=${encodeURIComponent(color)}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al obtener la guitarra base";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};


// ### DIRECCIONES ###

// Obtener todas las direcciones del usuario autenticado
export const getAllUserAddresses = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return [null, "Token no encontrado"];

  try {
    const response = await fetch(`${urlBase}/direcciones`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al obtener direcciones";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

// Obtener dirección activa del usuario
export const getActiveAddress = async () => {
  const token = localStorage.getItem("access_token");
  if (!token) return [null, "Token no encontrado"];

  try {
    const response = await fetch(`${urlBase}/direcciones/activa`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al obtener la dirección activa";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

// Crear nueva dirección
export const createAddress = async (address) => {
  const token = localStorage.getItem("access_token");
  if (!token) return [null, "Token no encontrado"];

  try {
    const response = await fetch(`${urlBase}/direcciones`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al crear la dirección";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

// Actualizar dirección por ID
export const updateAddress = async (addressId, addressData) => {
  const token = localStorage.getItem("access_token");
  if (!token) return [null, "Token no encontrado"];

  try {
    const response = await fetch(`${urlBase}/direcciones/${addressId}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(addressData),
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al actualizar la dirección";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

// Eliminar dirección por ID
export const deleteAddress = async (addressId) => {
  const token = localStorage.getItem("access_token");
  if (!token) return [null, "Token no encontrado"];

  try {
    const response = await fetch(`${urlBase}/direcciones/${addressId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al eliminar la dirección";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

// Activar dirección por ID
export const activateAddress = async (addressId) => {
  const token = localStorage.getItem("access_token");
  if (!token) return [null, "Token no encontrado"];

  try {
    const response = await fetch(`${urlBase}/direcciones/${addressId}/activar`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al activar la dirección";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

// Obtener dirección específica por ID del usuario autenticado
export const getUserAddressById = async (addressId) => {
  const token = localStorage.getItem("access_token");
  if (!token) return [null, "Token no encontrado"];

  try {
    const response = await fetch(`${urlBase}/direcciones/${addressId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al obtener la dirección";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};