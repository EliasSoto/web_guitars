import { useState, useEffect } from "react";
import { getUserAddressById, updateAddress } from "../services/userNormalService";

export const useEditUserAddress = (addressId, handleUpdateGlobal) => {
  const [formData, setFormData] = useState({
    street_name: "",
    region: "",
    commune: "",
    directions: "",
    address_type: "",
    is_active: false,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const regiones = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana de Santiago",
    "Libertador General Bernardo O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén del General Carlos Ibáñez del Campo",
    "Magallanes y de la Antártica Chilena"
  ];

  const comunasPorRegiones = {
    "Arica y Parinacota": ["Arica", "Camarones", "Putre", "General Lagos"],
    "Tarapacá": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica", "Huara", "Camiña", "Colchane"],
    "Antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "María Elena"],
    "Atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Vallenar", "Huasco", "Freirina", "Alto del Carmen", "Chañaral", "Diego de Almagro"],
    "Coquimbo": ["La Serena", "Coquimbo", "Ovalle", "Illapel", "Los Vilos", "Salamanca", "Andacollo", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado", "Vicuña", "Paihuano"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Quillota", "La Calera", "San Antonio", "Cartagena", "El Quisco", "Concón", "Casablanca", "Limache", "Olmué", "Los Andes", "San Felipe", "Putaendo", "Catemu", "Santa María"],
    "Metropolitana de Santiago": ["Santiago", "Providencia", "Las Condes", "La Florida", "Puente Alto", "Maipú", "Ñuñoa", "La Reina", "Peñalolén", "Lo Barnechea", "Pudahuel", "Estación Central", "San Miguel", "El Bosque", "San Bernardo", "Melipilla", "Talagante", "Colina"],
    "Libertador General Bernardo O'Higgins": ["Rancagua", "Machalí", "San Fernando", "Santa Cruz", "Pichilemu", "San Vicente", "Rengo", "Requínoa", "Graneros", "Peumo"],
    "Maule": ["Talca", "Curicó", "Linares", "Cauquenes", "Parral", "San Javier", "Constitución", "Molina", "San Clemente", "Longaví"],
    "Ñuble": ["Chillán", "Chillán Viejo", "San Carlos", "Bulnes", "Quirihue", "Yungay", "Coihueco", "San Nicolás"],
    "Biobío": ["Concepción", "Talcahuano", "Chiguayante", "Hualpén", "Los Ángeles", "Coronel", "San Pedro de la Paz", "Lota", "Tome", "Penco", "Nacimiento", "Mulchén"],
    "La Araucanía": ["Temuco", "Padre Las Casas", "Villarrica", "Angol", "Nueva Imperial", "Pucón", "Lautaro", "Victoria", "Freire", "Gorbea"],
    "Los Ríos": ["Valdivia", "La Unión", "Río Bueno", "Panguipulli", "Paillaco", "Lanco", "Futrono", "Corral"],
    "Los Lagos": ["Puerto Montt", "Puerto Varas", "Castro", "Osorno", "Ancud", "Frutillar", "Llanquihue", "Quellón", "Calbuco", "Chaitén"],
    "Aysén del General Carlos Ibáñez del Campo": ["Coyhaique", "Puerto Aysén", "Chile Chico", "Cochrane", "Río Ibáñez", "Guaitecas"],
    "Magallanes y de la Antártica Chilena": ["Punta Arenas", "Puerto Natales", "Porvenir", "Cabo de Hornos", "Laguna Blanca"]
  };

  const tiposDireccion = ["Casa", "Departamento", "Trabajo", "Otro"];

  useEffect(() => {
    if (!addressId) return;

    const fetchAddressData = async () => {
      setLoading(true);
      const [data, err] = await getUserAddressById(addressId);

      if (err) {
        setError(err);
      } else {
        setFormData({
          street_name: data.street_name || "",
          region: data.region || "",
          commune: data.commune || "",
          directions: data.directions || "",
          address_type: data.address_type || "",
          is_active: !!data.is_active,
        });
      }

      setLoading(false);
    };

    fetchAddressData();
  }, [addressId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Evita actualizar el campo si el valor es solo espacios
    if (value.trim() === "" && value.length > 0) return;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const [data, updateError] = await updateAddress(addressId, formData);

    if (updateError) {
      setError(updateError);
      setSuccessMessage("");
      setLoading(false);
      return;
    }

    // Aquí uso la función global para refrescar la lista completa
    if (handleUpdateGlobal) {
      const errorGlobal = await handleUpdateGlobal(addressId, formData);
      if (errorGlobal) {
        setError(errorGlobal);
        setSuccessMessage("");
        setLoading(false);
        return;
      }
    }

    setSuccessMessage("Dirección actualizada correctamente");
    setError("");
    setLoading(false);
  };

  const resetStatus = () => {
    setError("");
    setSuccessMessage("");
  };

  return {
    formData,
    error,
    successMessage,
    loading,
    handleChange,
    handleSubmit,
    resetStatus,
    regiones,
    tiposDireccion,
    comunasPorRegiones
  };
};
