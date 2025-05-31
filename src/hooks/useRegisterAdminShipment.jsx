import { useState } from "react";
import { registerAdminShipment } from "../services/shipmentAdminService";

const useRegisterAdminShipment = (onSuccess) => {
  const [formData, setFormData] = useState({
    tracking_status: "procesando",
    delivery_date: "",
    price: "",
    shipping_provider: "",
    is_immediate_delivery: false,
    order_ids: [""],
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetForm = () => {
    setFormData({
      tracking_status: "procesando",
      delivery_date: "",
      price: "",
      shipping_provider: "",
      is_immediate_delivery: false,
      order_ids: [""],
    });
  };

  const clearSuccessMessage = () => {
    setSuccessMessage("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "order_ids") {
      const ids = value.split(",").map((id) => parseInt(id.trim()));
      setFormData((prev) => ({
        ...prev,
        order_ids: ids,
      }));
    } else if (name === "is_immediate_delivery") {
      const today = new Date().toISOString().split("T")[0];
      setFormData((prev) => ({
        ...prev,
        is_immediate_delivery: checked,
        delivery_date: checked ? today : "",
        price: checked ? "0" : "",
        tracking_status: checked ? "entregado" : "procesando",
        shipping_provider: checked ? "Inmediato" : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }

    setError("");
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedOrderIds = formData.order_ids.map(id => parseInt(id));

    try {
      const [data, registerError] = await registerAdminShipment({
        tracking_status: formData.tracking_status,
        delivery_date: formData.delivery_date,
        price: formData.price,
        shipping_provider: formData.shipping_provider,
        is_immediate_delivery: formData.is_immediate_delivery,
        order_ids: parsedOrderIds,
      });
      console.log("Data received:", formData);

      if (registerError) {
        setError(registerError);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Envío registrado correctamente.");
      setError("");

      if (onSuccess) onSuccess(data);
    } catch (err) {
      setError("Error inesperado al registrar el envío.");
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
    clearSuccessMessage,
  };
};

export default useRegisterAdminShipment;
