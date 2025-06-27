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

// Crear una reseña
export const createReview = async (reviewData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuarios/resenas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
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
    const response = await fetch(`${API_URL}/usuarios/reseñas`, {
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

// Obtener reseñas de una guitarra propía por id
export const getMyReviewById = async (reviewId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuarios/resenas/${reviewId}`, {
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

// Obtener mi reseña para una guitarra específica (por guitar_id)
export const getMyReviewByGuitarId = async (guitarId) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuarios/guitarras/${guitarId}/resenas`, {
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


// Actualizar una reseña
export const updateMyReview = async (reviewId, updatedData) => {
  try {
    const token = getToken();
    const response = await fetch(`${API_URL}/usuarios/resenas/${reviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });
    return await parseResponse(response);
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
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message];
  }
};

// Obtener promedio de valoraciones de una guitarra
export const getReviewsByGuitar = async (guitarId) => {
  try {
    const response = await fetch(`${API_URL}/guitarras/${guitarId}/resenas`, {
      headers: {
        Accept: "application/json",
      },
    });
    return await parseResponse(response);
  } catch (error) {
    return [null, error.message];
  }
};

// Obtener promedio de valoraciones de una guitarra por id
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