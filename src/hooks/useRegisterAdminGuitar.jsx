import { useState } from "react";
import { registerAdminGuitar } from "../services/guitarAdminService";

const useRegisterAdminGuitar = () => {
  const [formData, setFormData] = useState({
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
    fret_count: 21, // valor por defecto dentro del rango válido
  });

  const resetForm = () => {
    setFormData({
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
      fret_count: 21,
    });
  };

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

    const handleChange = (e) => {
    const { name, type, checked, value, valueAsNumber } = e.target;

    let parsedValue;

    if (type === "checkbox") {
      parsedValue = checked;
    } else if (type === "number") {
      // Si el usuario borra el input, valueAsNumber será NaN,
      // entonces asignamos 0 o un valor por defecto
      parsedValue = isNaN(valueAsNumber) ? 0 : valueAsNumber;
    } else {
      parsedValue = value;
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };




  const handleSubmit = async (e) => {
    console.log("handleSubmit called with formData:", formData);
    e.preventDefault();


    try {
      console.log("Sending data to backend:", JSON.stringify(formData, null, 2));

      const [data, registerError] = await registerAdminGuitar(
        formData.model,
        formData.brand,
        formData.description,
        formData.purchase_price,
        formData.sale_price,
        formData.purchase_date,
        formData.wood_type,
        formData.image_link,
        formData.color,
        formData.stock,
        formData.is_custom,
        formData.fret_count
      );


      if (registerError) {
        setError(registerError);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Guitarra registrada correctamente");
      setError("");
      resetForm();
    } catch (err) {
      setError("Error inesperado al registrar la guitarra");
      setSuccessMessage("");
    }
  };

  return {
    formData,
    error,
    successMessage,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useRegisterAdminGuitar;
