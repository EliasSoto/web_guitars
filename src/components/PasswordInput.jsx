import { useState } from "react";
import "../styles/PasswordInput.css"; // Asegúrate de que la ruta sea correcta

export function PasswordInput({ value, onChange, showPassword, togglePasswordVisibility }) {
  const handleChange = (e) => {
    onChange(e.target.value);  // Propaga el cambio hacia el componente padre
  };

  return (
    <div className="password-container">
      <label className="label-usuario-contraseña" htmlFor="password">Contraseña</label>
      <div className="input-contraseña-container">
        <input
          className="input-contraseña"
          type={showPassword ? "text" : "password"}
          name="password"
          value={value}
          onChange={handleChange}
          placeholder="•••••••••••"
          style={{ outline: 'none' }}
          minLength={8}
        />
        <button
          type="button"
          className="eye-icon"
          onClick={togglePasswordVisibility}
        />
      </div>
    </div>
  );
}
