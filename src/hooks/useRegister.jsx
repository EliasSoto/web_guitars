import { useState } from "react";
import { createUsers, userRegister } from "../services/userAdminService.jsx";

// Hook para registro de usuario público
export const useRegister = () => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [rut, setRut] = useState("");
  const [password, setContraseña] = useState("");  
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [data, error] = await userRegister(
      nombres,
      apellidos,
      correo,
      telefono,
      fecha_nacimiento,
      rut,
      password
    );

    if (error) {
      setError(error);
      setMensajeExito("");
    } else {
      setMensajeExito("Usuario registrado con éxito");
      setError("");
    }
  };

  return {
    nombres,
    apellidos,
    correo,
    telefono,
    fecha_nacimiento,
    rut,
    password,
    error,
    mensajeExito,
    setNombres,
    setApellidos,
    setCorreo,
    setTelefono,
    setFechaNacimiento,
    setRut,
    setContraseña,
    handleSubmit,
  };
};

// Hook para creación de usuarios desde el panel admin
const useCreate = () => {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [rut, setRut] = useState("");
  const [password, setContraseña] = useState(""); 
  const [es_administrador, setes_administrador] = useState(false);
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const [data, error] = await createUsers(
      nombres,
      apellidos,
      correo,
      telefono,
      fecha_nacimiento,
      rut,
      password,
      es_administrador
    );

    if (error) {
      setError(error);
      setMensajeExito("");
    } else {
      setMensajeExito("Usuario registrado con éxito");
      setError("");
    }
  };

  return {
    nombres,
    apellidos,
    correo,
    telefono,
    fecha_nacimiento,
    rut,
    password,
    es_administrador,
    error,
    mensajeExito,
    setNombres,
    setApellidos,
    setCorreo,
    setTelefono,
    setFechaNacimiento,
    setRut,
    setContraseña,
    setes_administrador,
    handleSubmit,
  };
};

export default useCreate;
