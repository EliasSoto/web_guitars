import "../styles/PasswordInput.css"; // Asegúrate de que la ruta sea correcta
import { Icon } from '@iconify/react';

export function PasswordInput({ value, onChange, showPassword, togglePasswordVisibility }) {
  const handleChange = (e) => {
    onChange(e.target.value);  // Propaga el cambio hacia el componente padre
  };

  return (
    <div className="password-container">
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

        <Icon 
          icon={showPassword ? "octicon:eye-16" : "mdi:eye-off-outline"}
          width="24"
          height="24"
          className="eye-icon"
          onClick={togglePasswordVisibility}
        />
        
      </div>
    </div>
  );
}
