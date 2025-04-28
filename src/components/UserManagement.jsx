// components/admin/users/UserManagement.jsx
import { useState } from 'react';
import UserList from './UserList';
import UpdateModal from './UpdateModal';
import UserDetails from './UserDetails';
import { useUsers } from '@/hooks/useUsers'; // Asegúrate de que la ruta sea correcta

const UserManagement = () => {
  const { users, loading, error, createUser, updateUser, deleteUser } = useUsers();
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleCreate = () => {
    setSelectedUser(null);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
    setShowForm(true);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setIsEditing(false);
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
    setSelectedUser(null);
  };

  const handleSubmit = async (userData) => {
    if (selectedUser && isEditing) {
      await updateUser(selectedUser._id, userData);
    } else {
      await createUser(userData);
    }
    handleClose();
  };

  if (loading) return <div>Cargando usuarios...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="user-management">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Usuarios</h1>
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Nuevo Usuario
        </button>
      </div>

      <UserList 
        users={users} 
        onEdit={handleEdit} 
        onView={handleView} 
        onDelete={deleteUser} 
      />

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            {isEditing ? (
              <UpdateModal
                user={selectedUser} 
                onSubmit={handleSubmit} 
                onCancel={handleClose} 
              />
            ) : (
              <UserDetails 
                user={selectedUser} 
                onClose={handleClose} 
                onEdit={() => handleEdit(selectedUser)} 
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;