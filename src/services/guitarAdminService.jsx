// URL de la API
const API_URL = "https://api-guitarras.onrender.com/api/guitarras";

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

}