import React, { useState, useEffect } from "react";
import HeaderLogin from "../components/HeaderLogin";
import { Icon } from '@iconify/react';
import "../styles/RegisterUser.css";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser, updateCurrentUser } from "../services/userNormalService";

const EditUserProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    birth_date: "",
    rut: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const [data, err] = await getCurrentUser();
      if (err) {
        setError(err);
        setLoading(false);
        return;
      }
  
      // Convertir la fecha de nacimiento a formato YYYY-MM-DD para el input de tipo date
      let formattedDate = "";
      if (data.birth_date) {
        // Suponiendo que la fecha viene en DD/MM/YYYY, la convertimos a YYYY-MM-DD
        const [day, month, year] = data.birth_date.split('/');
        formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      }
  
      setFormData(prev => ({
        ...prev,
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        phone: data.phone || "",
        birth_date: formattedDate, // Guardamos la fecha en el formato adecuado para el input
        rut: data.rut || ""
      }));
      setLoading(false);
    };
  
    fetchUserData();
  }, []);
  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan si se están cambiando
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    // Preparar los datos para enviar (excluyendo confirmPassword)
    const { confirmPassword, ...userUpdate } = formData;

    try {
      const [data, updateError] = await updateCurrentUser(userUpdate);

      if (updateError) {
        setError(updateError);
        setSuccessMessage("");
        return;
      }

      setSuccessMessage("Perfil actualizado correctamente");
      setError("");
      // Limpiar campos de contraseña después de actualizar
      setFormData(prev => ({
        ...prev,
        password: "",
        confirmPassword: ""
      }));
      setTimeout(() => navigate("/perfil"), 1500);

    } catch (err) {
      setError("Error inesperado al actualizar el perfil");
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
            <Link to="/perfil" className="link-atras">
              <Icon className="atras-icon" icon="ic:round-arrow-back" width="24" height="24" />
            </Link>
            <div className="text-inicia">Editar perfil</div>
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
              required
            />
            
            <label className="label-register" style={{ display: 'none' }}>Rut</label>
            <input
              className="input-normal"
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              placeholder="RUT"
              style={{ outline: 'none', display: 'none' }} // Oculta el campo
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

            <label className="label-register">Nueva contraseña (opcional)</label>
            <input
              className="input-normal"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nueva contraseña"
              style={{ outline: 'none'}}
            />

            <label className="label-register">Confirmar nueva contraseña</label>
            <input
              className="input-normal"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirmar nueva contraseña"
              style={{ outline: 'none'}}
            />

            <button className="button-register" type="submit">Actualizar perfil</button>
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

export default EditUserProfile;