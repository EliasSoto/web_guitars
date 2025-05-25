// URL de la API
const API_URL = import.meta.env.VITE_URL_BASE;

export const getAdminPaginatedGuitars = async (page = 1, limit = 10) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        return [null, "Acceso no autorizado. Token no encontrado"];
    }

    try {
        const response = await fetch(`${API_URL}/guitarras?page=${page}&limit=${limit}`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const errorMessage = data?.detail || "Error al obtener las guitarras";
            return [null, errorMessage];
        }

        return [data, null];

    } catch (error) {
        return [null, "Error al conectar con el servidor"];
    }
}

export const deleteGuitarById = async (guitarId) => {

    const token = localStorage.getItem("access_token");
    if (!token) {
        return [null, "Acceso no autorizado. Token no encontrado"];
      }

    try {
        const response = await fetch(`${API_URL}/admin/guitarras/${guitarId}`, {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });

        const text = await response.text();
        const data = text ? JSON.parse(text) : {};

        if (!response.ok) {
            const errorMessage = data?.detail || "Error al eliminar la guitarra";
            return [null, errorMessage];
        }

        return [data, null];
    } catch (error) {
        return [null, "Error al conectar con el servidor"];
    }

}

export const updateAdminGuitarById = async (
  guitarId,
  model,
  brand,
  description,
  purchase_price,
  sale_price,
  net_price,
  iva,
  liquidation_price,
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
    const response = await fetch(`${API_URL}/admin/guitarras/${guitarId}`, {
      method: "PUT",
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
        net_price,
        iva,
        liquidation_price,
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
      return [null, data.detail || "Error al actualizar la guitarra"];
    }

    return [data, null];
  } catch (error) {
    return [null, "Error al conectar con el servidor"];
  }
};

export const getGuitarById = async (guitarId) => {
    const token = localStorage.getItem("access_token");
    if (!token) {
        return [null, "Acceso no autorizado. Token no encontrado"];
      }
  
    try {
      const response = await fetch(`${API_URL}/admin/guitarras/${guitarId}`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`
        }
      });
  
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};
  
      if (!response.ok) {
        const errorMessage = data?.detail || "Error al obtener la guitarra";
        return [null, errorMessage];
      }
  
      return [data, null];
    } catch (error) {
      return [null, "Error al conectar con el servidor"];
    }
  }

export const registerAdminGuitar = async (
  model,
  brand,
  description,
  purchase_price,
  sale_price,
  net_price,
  iva,
  liquidation_price,
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
          net_price,
          iva,
          liquidation_price,
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