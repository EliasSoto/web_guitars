const API_URL = import.meta.env.VITE_API_URL;

const getToken = () => {
    const token = localStorage.getItem("access_token");
    if (!token) throw new Error("Acceso no autorizado. Token no encontrado");
    return token;
};

const parseResponse = async (response) => {
    const text = await response.text();
    const data = text ? JSON.parse(text) : {};

    if (!response.ok) {
        if (response.status === 422) {
            const errorMsg = Array.isArray(data.detail)
                ? data.detail.map(e => e.msg).join(", ")
                : data.detail || "Datos inválidos";
            return [null, errorMsg];
        }
        return [null, data.detail || "Error en la petición"];
    }
    return [data, null];
};

export const getAdminPaginatedAddresses = async (page = 1, limit = 10) => {
    try {
        const token = getToken();
        const response = await fetch(`${API_URL}/admin/direcciones?page=${page}&limit=${limit}`, {
            method: "GET",
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