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

export const delelteGuitarById = async (guitarId) => {

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