import React, { useState } from "react";
import HeaderLogin from "../components/HeaderLogin";
import { Icon } from '@iconify/react';
import "../styles/RegisterUser.css";
import { PasswordInput } from "../components/PasswordInput";
import { registerAdminUser } from "../services/userAdminService";
import { Link, useNavigate } from "react-router-dom";

const RegisterAdminUser = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    rut: "",
    password: "",
    is_admin: false,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const formatDate = (date) => {
    if (!date) return "";
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedBirthDate = formatDate(formData.birth_date);

      const [data, registerError] = await registerAdminUser(
        formData.first_name,
        formData.last_name,
        formData.email,
        formData.phone,
        formattedBirthDate,
        formData.rut,
        formData.password,
        formData.is_admin
      );

      if (registerError) {
        setError(registerError);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Usuario administrador registrado correctamente");
      setError("");
      navigate("/admin"); // O donde quieras redirigir después de crear

    } catch (err) {
      setError("Error inesperado al registrar el usuario");
      setSuccessMessage("");
    }
  };

  return (
    <div className="register-container">
      <HeaderLogin />

      <main className="register-main">
        <section className="register-section">
          <div className="title-register">
            <Link to="/admin" className="link-atras">
              <Icon className="atras-icon" icon="ic:round-arrow-back" width="24" height="24" />
            </Link>
            <div className="text-inicia">Registrar nuevo usuario</div>
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
              style={{ outline: 'none'}}
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
              style={{ outline: 'none'}}
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
              style={{ outline: 'none'}}
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
              style={{ outline: 'none'}}
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
              style={{ outline: 'none'}}
              minLength={9}
              maxLength={9}
              required
            />

            <label className="label-register">Fecha nacimiento</label>
            <input
              className="input-normal"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              style={{ outline: 'none'}}
            />

            <PasswordInput
              value={formData.password}
              onChange={(value) => handleChange({ target: { name: 'password', value } })}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
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

            <button className="button-register" type="submit">Registrar</button>
          </form>

          {error && (
              <p style={{ color: "red" }}>
                {Array.isArray(error) ? error.map((err, index) => (
                  <span key={index}>{err.msg}<br /></span>  // ahora sí muestras el texto del error
                )) : error}
              </p>
            )}
          {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        </section>
      </main>
    </div>
  );
};

export default RegisterAdminUser;
