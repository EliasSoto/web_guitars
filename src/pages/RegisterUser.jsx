import React, { useState } from "react";
import HeaderLogin from "../components/HeaderLogin";
import { Icon } from '@iconify/react';
import "../styles/RegisterUser.css";
import { PasswordInput } from "../components/PasswordInput"; // Asegúrate de que la ruta sea correcta

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    birth_date: '',
    rut: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Función para formatear la fecha en DD/MM/YYYY
  const formatDate = (date) => {
    const [year, month, day] = date.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Formatear la fecha de nacimiento
    const formattedBirthDate = formatDate(formData.birth_date);

    const [data, err] = await registerAdminUser(
      formData.first_name,
      formData.last_name,
      formData.email,
      formData.phone,
      formattedBirthDate, // Pasar la fecha formateada
      formData.rut,
      formData.password,
      formData.is_admin
    );

    if (err) {
      setError(err);
    } else {
      setSuccess(user ? 'Usuario actualizado correctamente' : 'Usuario creado correctamente');
      setTimeout(onClose, 1500);
    }
  };

  return (
    <div className="register-container">
      
      <HeaderLogin />

      <main className="register-main">

        <section className="register-section">

          <div className="title-register">
            <Icon className="atras-icon" icon="ic:round-arrow-back" width="24" height="24" />
            <div className="text-inicia">Crea una cuenta</div>
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
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
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
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
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
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
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
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
              required
            />

            <label className="label-register">Teléfono</label>
            <input
              className="input-normal"
              type="text"
              name="phone"
              value={phone}
              onChange={handleChange}
              placeholder="Teléfono"
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
              required
            />

            <label className="label-register">Fecha nacimiento</label>
            <input
            className="input-normal"
              type="date"
              name="birth_date"
              value={formData.birth_date}
              onChange={handleChange}
              style={{ outline: 'none'}} // Elimina el contorno al hacer foco 
            />

            <PasswordInput
              value={formData.password}
              onChange={(value) => setFormData({ ...formData, password: value })}
            />

            <button className="button-register" type="submit">Registrar</button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {mensajeExito && <p style={{ color: "green" }}>{mensajeExito}</p>}
        </section>
      </main>
    </div>
  );
};

export default RegisterUser;
