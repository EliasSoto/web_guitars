import React, { useState, useEffect } from "react";
import HeaderLogin from "../components/HeaderLogin";
import { Icon } from '@iconify/react';
import "../styles/RegisterUser.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getAdminUserById, updateAdminUserById } from "../services/userAdminService";

const EditAdminUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    rut: "",
    is_admin: false,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const [data, err] = await getAdminUserById(userId);
      if (err) {
        setError(err);
        setLoading(false);
        return;
      }

      // Formatear la fecha si existe
      let formattedDate = "";
      if (data.birth_date) {
        const [day, month, year] = data.birth_date.split('/');
        formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }

      setFormData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        birth_date: formattedDate,
        rut: data.rut || "",
        is_admin: data.is_admin || false,
      });
      setLoading(false);
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formatDate = (date) => {
      if (!date) return "";
      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    };
    
    const formattedBirthDate = formatDate(formData.birth_date);

    try {
      const [data, updateError] = await updateAdminUserById(
        userId,
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.phone,
        formattedBirthDate,
        formData.rut,
        formData.is_admin
      );

      if (updateError) {
        setError(updateError);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Usuario actualizado correctamente");
      setError("");
      setTimeout(() => navigate("/admin"), 1500);

    } catch (err) {
      setError("Error inesperado al actualizar el usuario");
      setSuccessMessage("");
    }
  };

  if (loading) {
    return <div className="register-container">Cargando...</div>;
  }

  return (
    <div className="register-container">
      <HeaderLogin />

      <main className="register-main">
        <section className="register-section">
          <div className="title-register">
            <Link to="/admin" className="link-atras">
              <Icon className="atras-icon" icon="ic:round-arrow-back" width="24" height="24" />
            </Link>
            <div className="text-inicia">Editar usuario</div>
          </div>

          <form onSubmit={handleSubmit}>
            <label className="label-register">Nombre</label>
            <input
              className="input-normal"
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="Nombres"
              style={{ outline: 'none' }}
              minLength={2}
              required
            />

            <label className="label-register">Apellido</label>
            <input
              className="input-normal"
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Apellidos"
              style={{ outline: 'none' }}
              minLength={2}
              required
            />

            <label className="label-register">Rut</label>
            <input
              className="input-normal"
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              placeholder="RUT"
              style={{ outline: 'none' }}
              required
            />

            <label className="label-register">Correo</label>
            <input
              className="input-normal"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              style={{ outline: 'none' }}
              required
            />

            <label className="label-register">Teléfono</label>
            <input
              className="input-normal"
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Teléfono"
              style={{ outline: 'none' }}
              required
              minLength={9}
              maxLength={9}
            />

            <label className="label-register">Fecha nacimiento</label>
            <input
              className="input-normal"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              style={{ outline: 'none' }}
            />

            <div style={{ marginTop: "1rem" }}>
              <label className="label-register">
                <input
                  type="checkbox"
                  name="is_admin"
                  checked={formData.is_admin}
                  onChange={handleChange}
                  style={{ marginRight: "8px" }}
                />
                ¿Es administrador?
              </label>
            </div>

            <button className="button-register" type="submit">Actualizar</button>
          </form>

          {error && (
            <p style={{ color: "red" }}>
              {Array.isArray(error) ? error.map((err, index) => (
                <span key={index}>{err.msg}<br /></span>
              )) : error}
            </p>
          )}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </section>
      </main>
    </div>
  );
};

export default EditAdminUser;
