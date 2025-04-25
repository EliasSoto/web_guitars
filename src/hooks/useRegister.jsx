import { useState } from "react";
import { userRegister } from "../services/userAdminService.jsx"; // Ajusta la ruta según sea necesario

const useRegister = () => {

  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fecha_nacimiento, setFechaNacimiento] = useState("");
  const [rut, setRut] = useState("");
  const [password, setContraseña] = useState("");  // Contraseña para generar el hash
  const [error, setError] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí generas el hash de la contraseña antes de enviarla
    

    const [data, error] = await userRegister(nombres, apellidos, correo, telefono, fecha_nacimiento, rut, password);
    
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


export default useRegister;
