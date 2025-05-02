// src/components/LoginForm.jsx

import React from 'react';
import HeaderLogin from './HeaderLogin';
import PasswordInput from './PasswordInput';
import { PasswordInput } from "../components/PasswordInput";

const LoginForm = ({
  handleLogin,
  handleChange,
  handleRegisterClick,
  formData,
  showPassword,
  togglePasswordVisibility,
  error,
  mensajeExito
}) => {
  return (
    <div>
      <HeaderLogin />

      <main className="login-main">
        <section>
          <div className="text-inicia">Inicia sesión</div>
          <div className="text-registrate">
            ¿No tienes una cuenta?,{' '}
            <a className="a" href="/register" onClick={handleRegisterClick}>
              Regístrate
            </a>
          </div>

          <form onSubmit={handleLogin}>
            <label className="label-usuario-contraseña" htmlFor="Usuario">
              Correo
            </label>
            <input
              className="input-usuario"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="usuario@ejemplo.cl"
              style={{ outline: 'none' }}
            />

            <PasswordInput
              value={formData.password}
              onChange={(value) =>
                handleChange({ target: { name: 'password', value } })
              }
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
            />

            <button className="button-login" type="submit">
              Iniciar sesión
            </button>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {mensajeExito && <p style={{ color: 'green' }}>{mensajeExito}</p>}
        </section>
      </main>
    </div>
  );
};

export default LoginForm;
