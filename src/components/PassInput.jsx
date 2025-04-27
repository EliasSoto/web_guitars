import { useState } from "react";
import "../styles/PassInput.css"; // Asegúrate de que la ruta sea correcta

export function PasswordInput({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
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
          onChange={onChange}
          placeholder="•••••••••••"
          style={{ outline: 'none' }}
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
