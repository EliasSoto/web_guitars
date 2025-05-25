import { useState, useEffect } from "react";
import { getAdminGuitarById, updateAdminGuitarById } from "../services/guitarAdminService";

export const useEditAdminGuitar = (guitarId, navigate, onSuccess) => {
  const [form, setForm] = useState({
    model: "",
    brand: "",
    description: "",
    purchase_price: 0,
    sale_price: 0,
    net_price: 0,
    iva: 0,
    liquidation_price: 0,
    purchase_date: "",
    wood_type: "",
    image_link: "",
    color: "",
    stock: 0,
    is_custom: false,
    fret_count: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar datos iniciales
  useEffect(() => {
    const fetchGuitar = async () => {
      const [data, err] = await getAdminGuitarById(guitarId);
      if (err) {
        setError(err);
      } else {
        setForm(data);
      }
      setLoading(false);
    };
    fetchGuitar();
  }, [guitarId]);

  // Manejador de cambio de inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Manejador de envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const [res, err] = await updateAdminGuitarById(
      guitarId,
      form.model,
      form.brand,
      form.description,
      Number(form.purchase_price),
      Number(form.sale_price),
      Number(form.net_price),
      Number(form.iva),
      Number(form.liquidation_price),
      form.purchase_date,
      form.wood_type,
      form.image_link,
      form.color,
      Number(form.stock),
      form.is_custom,
      Number(form.fret_count)
    );

    if (err) {
      setError(err);
    } else {
      onSuccess?.();
      navigate?.("/admin/guitarras"); // Si usas React Router
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    loading,
    error,
  };
};
