import UserList from "../components/UserList"; // Ajusta la ruta si es diferente
import UserCreate from "../components/UserCreate"; // Ajusta la ruta si es diferente

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user_info")); // Obtenemos el usuario logueado

  if (!user.es_administrador == "admin") {
    console.log("USariio", user.es_administrador);
    return <p>No tienes permisos para ver esta página.</p>;
  }

  return (
    <div>
      <h1>Panel de Administración</h1>
      <UserList />
      <UserCreate />
    </div>
  );
};

export default AdminDashboard;
