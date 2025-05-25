// import { useState, useEffect } from "react";
// import { getAdminGuitarById, updateAdminGuitarById } from "../services/guitarAdminService";

// export const useEditAdminGuitar = (guitarId, navigate, onSuccess) => {
//   const [form, setForm] = useState({
//     model: "",
//     brand: "",
//     description: "",
//     purchase_price: 0,
//     sale_price: 0,
//     purchase_date: "",
//     wood_type: "",
//     image_link: "",
//     color: "",
//     stock: 0,
//     is_custom: false,
//     fret_count: 0,
//   });

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState("");

//   // Cargar datos iniciales
//   useEffect(() => {
//     const fetchGuitar = async () => {
//       setLoading(true);
//       const [data, err] = await getAdminGuitarById(guitarId);
//       if (err) {
//         setError(err);
//       } else {
//         setForm(data);
//       }
//       setLoading(false);
//     };
//     fetchGuitar();
//   }, [guitarId]);

//   // Manejador de cambio de inputs
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setForm((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Manejador de envío del formulario
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Preparar objeto para enviar (convertir números)
//     const guitarData = {
//       model: form.model,
//       brand: form.brand,
//       description: form.description,
//       purchase_price: Number(form.purchase_price),
//       sale_price: Number(form.sale_price),
//       purchase_date: form.purchase_date,
//       wood_type: form.wood_type,
//       image_link: form.image_link,
//       color: form.color,
//       stock: Number(form.stock),
//       is_custom: form.is_custom,
//       fret_count: Number(form.fret_count),
//     };

//     const [res, err] = await updateAdminGuitarById(guitarId, guitarData);

//     if (err) {
//       setError(err);
//       setSuccessMessage("");
//     } else {
//       setSuccessMessage("Guitarra actualizada correctamente");
//       setError(null);
//       onSuccess?.();
//       navigate?.("/admin/guitarras");
//     }
//   };

//   const resetStatus = () => {
//     setError(null);
//     setSuccessMessage("");
//   };

//   return {
//     form,
//     loading,
//     error,
//     successMessage,
//     handleChange,
//     handleSubmit,
//     resetStatus,
//   };
// };
import { useState, useEffect } from "react";
import { getAdminGuitarById, updateAdminGuitarById } from "../services/guitarAdminService";

export const useEditAdminGuitar = (guitarId, navigate, onSuccess) => {
  const [form, setForm] = useState({
    model: "",
    brand: "",
    description: "",
    purchase_price: 0,
    sale_price: 0,
    purchase_date: "",
    wood_type: "",
    image_link: "",
    color: "",
    stock: 0,
    is_custom: false,
    fret_count: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchGuitar = async () => {
      setLoading(true);
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

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prevForm) => ({
    ...prevForm,
    [name]: value,
  }));

  // Limpiar errores al escribir
  setError(null);
  setSuccessMessage(""); // Opcional si quieres limpiar el mensaje de éxito también
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    const guitarData = {
      model: form.model,
      brand: form.brand,
      description: form.description,
      purchase_price: Number(form.purchase_price),
      sale_price: Number(form.sale_price),
      purchase_date: form.purchase_date,
      wood_type: form.wood_type,
      image_link: form.image_link,
      color: form.color,
      stock: Number(form.stock),
      is_custom: form.is_custom,
      fret_count: Number(form.fret_count),
    };

    try {
      const [res, err] = await updateAdminGuitarById(guitarId, guitarData);

      if (err) {
        setError(err);
        setSuccessMessage("");
      } else {
        setSuccessMessage("Guitarra actualizada correctamente");
        setError(null);
      }
    } catch (err) {
      setError("Error inesperado al actualizar la guitarra");
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
