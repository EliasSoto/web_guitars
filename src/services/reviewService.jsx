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
    const errorMsg = data.detail || data.message || "Error en la petición";
    return [null, errorMsg];
  }
  return [data, null];
};

// Crear una reseña
export const createReview = async (reviewData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuarios/resenas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message];
  }
};

// Obtener reseñas del usuario actual
export const getMyReviews = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuarios/resenas`, {
      method: "GET", // Asegúrate que sea GET explícitamente
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      // Verifica si el error es 405 para dar un mensaje más específico
      if (response.status === 405) {
        throw new Error(`Método no permitido. El endpoint puede requerir otro método HTTP.`);
      }
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    return await parseResponse(response);
  } catch (error) {
    console.error("Error en getMyReviews:", error);
    return [null, error.message];
  }
};

// Obtener reseñas de una guitarra con info de ownership
export const getReviewsByGuitar = async (guitarId) => {
  try {
    const token = localStorage.getItem("access_token");
    const userId = localStorage.getItem("user_id");
    
    const headers = { Accept: "application/json" };
    if (token) headers.Authorization = `Bearer ${token}`;
    
    const response = await fetch(`${API_URL}/guitarras/${guitarId}/resenas`, { headers });
    const [data, error] = await parseResponse(response);
    
    if (error) return [null, error];
    
    // Añadir flag can_edit basado en el userId
    const processedData = data.map(review => ({
      ...review,
      can_edit: userId && review.user_id && (review.user_id.toString() === userId.toString())
    }));
    
    return [processedData, null];
  } catch (error) {
    return [null, error.message];
  }
};

// Actualizar una reseña
export const updateMyReview = async (reviewId, { rating, comment }) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuarios/resenas/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ rating, comment }),
    });
    
    const [data, error] = await parseResponse(response);
    
    // Si el backend devuelve la reseña actualizada, añadir can_edit
    if (data && !error) {
      const userId = localStorage.getItem("user_id");
      return [{
        ...data,
        can_edit: userId && data.user_id && (data.user_id.toString() === userId.toString())
      }, null];
    }
    
    return [data, error];
  } catch (error) {
    return [null, error.message];
  }
};

// Eliminar una reseña
export const deleteMyReview = async (reviewId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuarios/resenas/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    // Asumimos que el backend devuelve { success: true } al eliminar
    const [data, error] = await parseResponse(response);
    return [data?.success, error];
  } catch (error) {
    return [null, error.message];
  }
};

// Obtener promedio de valoraciones de una guitarra
export const getAverageRatingByGuitar = async (guitarId) => {
  try {
    const response = await fetch(`${API_URL}/guitarras/${guitarId}/resenas/promedio`, {
      headers: {
        Accept: "application/json",
      },
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message];
  }
};

// Verificar si el usuario puede reseñar una guitarra
export const canUserReviewGuitar = async (guitarId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuarios/puede-resenar/${guitarId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message];
  }
};