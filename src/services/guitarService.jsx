// src/services/guitarService.js
const API_URL = import.meta.env.VITE_URL_BASE;

export const getGuitarById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/guitarras/${id}`);
    const data = await response.json();
    
    if (!response.ok) {
      return [null, data.message || 'Error al obtener la guitarra'];
    }
    
    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};

export const getGuitarReviewsWithUsers = async (guitarId) => {
  try {
    const response = await fetch(`${API_URL}/guitarras/${guitarId}/reviews-with-users`);
    const data = await response.json();
    
    if (!response.ok) {
      return [null, data.message || 'Error al obtener las reseñas'];
    }
    
    return [data, null];
  } catch (error) {
    return [null, error.message];
  }
};