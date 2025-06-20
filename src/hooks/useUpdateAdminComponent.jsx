import { useState, useEffect } from "react";
import { getComponentById, updateComponentByIdAdmin } from "../services/componentService";

export const useEditAdminComponent = (componentId, navigate, onSuccess) => {
  const [form, setForm] = useState({
    name: "",
    type: "",
    subtype: "",
    purchase_price: 0,
    sale_price: 0,
    net_price: 0,
    stock: 0,
    description: "",
    purchase_date: "",
    brand: "",
    material: "",
    position: "",
    is_active: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchComponent = async () => {
      setLoading(true);
      const [data, err] = await getComponentById(componentId);
      if (err) {
        setError(err);
      } else {
        setForm({
          ...data,
          purchase_price: data.purchase_price ?? 0,
          sale_price: data.sale_price ?? 0,
          net_price: data.net_price ?? 0,
          stock: data.stock ?? 0,
          is_active: data.is_active ?? true,
          purchase_date: data.purchase_date ?? "",
        });
      }
      setLoading(false);
    };
    fetchComponent();
  }, [componentId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Manejo para checkbox
    const val = type === "checkbox" ? checked : value;

    // Evita actualizar si valor es solo espacios
    if (typeof val === "string" && val.trim() === "" && val.length > 0) return;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: val,
    }));

    setError(null);
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const componentData = {
      name: form.name,
      type: form.type,
      subtype: form.subtype,
      purchase_price: Number(form.purchase_price),
      sale_price: Number(form.sale_price),
      net_price: Number(form.net_price),
      stock: Number(form.stock),
      description: form.description,
      purchase_date: form.purchase_date,
      brand: form.brand,
      material: form.material,
      position: form.position,
      is_active: form.is_active,
    };

    try {
      const [res, err] = await updateComponentByIdAdmin(componentId, componentData);

      if (err) {
        setError(err);
        setSuccessMessage("");
      } else {
        setSuccessMessage("Componente actualizado correctamente");
        setError(null);
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setError("Error inesperado al actualizar el componente");
      setSuccessMessage("");
    }
  };

  const resetStatus = () => {
    setError("");
    setSuccessMessage("");
  };

  return {
    form,
    loading,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetStatus,
  };
};
