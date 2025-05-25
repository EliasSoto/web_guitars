// src/hooks/useAdminUsers.js
import { useEffect, useState, useCallback } from 'react';
import { getAdminPaginatedUsers, deleteAdminUserById } from '../services/userAdminService.jsx';

const usersPerPage = 10;

export default function useAdminUsers() {
  const [users, setUsers] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const fetchUsers = async (page = 0, limit = usersPerPage) => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedUsers(page + 1, limit);
    if (err) {
      setError(err);
    } else {
      setUsers(data.users);
      setTotalUsers(data.total);
      sessionStorage.setItem("cachedUsers", JSON.stringify(data));
      sessionStorage.setItem("cachedPage", page);
    }
    setLoading(false);
  };

  useEffect(() => {
    const cachedData = sessionStorage.getItem("cachedUsers");
    const cachedPage = sessionStorage.getItem("cachedPage");

    if (cachedData && Number(cachedPage) === page) {
      const parsed = JSON.parse(cachedData);
      setUsers(parsed.users);
      setTotalUsers(parsed.total);
      setLoading(false);
    } else {
      fetchUsers(page, usersPerPage);
    }
  }, [page]);

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      const [, err] = await deleteAdminUserById(userId);
      if (err) {
        setError(err);
      } else {
        sessionStorage.removeItem("cachedUsers");
        sessionStorage.removeItem("cachedPage");
        fetchUsers(page, usersPerPage);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    sessionStorage.removeItem("cachedUsers");
    sessionStorage.removeItem("cachedPage");
    fetchUsers(page, usersPerPage);
  };

  const handleFormSuccess = useCallback(async () => {
    sessionStorage.removeItem("cachedUsers");
    sessionStorage.removeItem("cachedPage");
    await fetchUsers(page, usersPerPage);
  }, [page]);

  const handleUpdate = (userId) => {
    setSelectedUser(userId);
    setShowForm(true);
    setIsEditing(true);
  };

  return {
    users,
    totalUsers,
    page,
    setPage,
    loading,
    error,
    selectedUser,
    showForm,
    isEditing,
    setShowForm,
    setIsEditing,
    setSelectedUser,
    handleDelete,
    handleCloseForm,
    handleFormSuccess,
    handleUpdate,
  };
}
