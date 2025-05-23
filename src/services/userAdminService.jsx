// URL de la API
const urlBase = import.meta.env.VITE_URL_BASE;

// Función para registrar un nuevo usuario
export const registerAdminUser = async (first_name, last_name, email, phone, birth_date, rut, password, is_admin) => {
    // Validar campos obligatorios
    if (!first_name || !last_name || !phone || !rut || !password) {
        return [null, "Faltan campos obligatorios"];
      }

    // Obtener el token de acceso del almacenamiento local
    const token = localStorage.getItem("access_token");
    if (!token) {
        return [null, "Acceso no autorizado. Token no encontrado"];
      }

  try {
    const response = await fetch(`${urlBase}/admin/usuarios`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
        birth_date,
        rut,
        hashed_password: password,
        is_admin,
      }),
    });
    
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      // Manejo mejorado de errores de validación
      if (response.status === 422) {
          const errorMsg = data.detail || 
              (Array.isArray(data.detail) ? data.detail.map(e => e.msg).join(', ') : "Datos inválidos");
          return [null, errorMsg];
      }
      return [null, data.detail || "Error al crear el usuario"];
  }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};


// Función para obtener todos los usuarios (Cambiado por Alvaro)
export const getAdminPaginatedUsers = async (page = 0, limit = 10) => {
    // Obtener el token de acceso del almacenamiento local
    const token = localStorage.getItem("access_token");
    if (!token) {
        return [null, "Acceso no autorizado. Token no encontrado"];
      }

  try {
    const response = await fetch(`${urlBase}/admin/usuarios?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al crear el usuario";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};


// Función para obtener usuario por id
export const getAdminUserById = async (userId) => {
    // Obtener el token de acceso del almacenamiento local
    const token = localStorage.getItem("access_token");
    if (!token) {
        return [null, "Acceso no autorizado. Token no encontrado"];
      }

  try {
    const response = await fetch(`${urlBase}/admin/usuarios/${userId}`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al crear el usuario";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

// Función para eliminar usuario por id
export const deleteAdminUserById = async (userId) => {
    // Obtener el token de acceso del almacenamiento local
    const token = localStorage.getItem("access_token");
    if (!token) {
        return [null, "Acceso no autorizado. Token no encontrado"];
      }

  try {
    const response = await fetch(`${urlBase}/admin/usuarios/${userId}`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      const errorMessage = data?.detail || "Error al crear el usuario";
      return [null, errorMessage];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

// Función para actualizar usuario por id
export const updateAdminUserById = async (userId, first_name, last_name, email, phone, birth_date, rut, is_admin) => {
    // Validar campos obligatorios
    if (!first_name || !last_name ) {
        return [null, "Faltan campos obligatorios"];
      }

    // Obtener el token de acceso del almacenamiento local
    const token = localStorage.getItem("access_token");
    if (!token) {
        return [null, "Acceso no autorizado. Token no encontrado"];
      }

  try {
    const response = await fetch(`${urlBase}/admin/usuarios/${userId}`, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        first_name,
        last_name,
        email,
        phone,
        birth_date,
        rut,
        is_admin,
      }),
    });
    
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
      // Manejo mejorado de errores de validación
      if (response.status === 422) {
          const errorMsg = data.detail || 
              (Array.isArray(data.detail) ? data.detail.map(e => e.msg).join(', ') : "Datos inválidos");
          return [null, errorMsg];
      }
      return [null, data.detail || "Error al crear el usuario"];
  }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};