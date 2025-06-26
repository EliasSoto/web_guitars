import { useEffect, useState, useCallback } from 'react'; //ocupar este igual
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

  // ESTADOS DE BÚSQUEDA
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('first_name'); // nuevo

  const fetchUsers = async (page = 0, limit = usersPerPage, search = '', searchBy = 'first_name') => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedUsers(page + 1, limit, search, searchBy);

    if (err) {
      setError(err);
    } else {
      setUsers(data.users);
      setTotalUsers(data.total);
      sessionStorage.setItem("cachedUsers", JSON.stringify(data));
      sessionStorage.setItem("cachedPage", page);
      sessionStorage.setItem("cachedSearch", search);
      sessionStorage.setItem("cachedSearchBy", searchBy);
      setError(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    const cachedData = sessionStorage.getItem("cachedUsers");
    const cachedPage = sessionStorage.getItem("cachedPage");
    const cachedSearch = sessionStorage.getItem("cachedSearch") || '';
    const cachedSearchBy = sessionStorage.getItem("cachedSearchBy") || 'first_name';

    if (
      cachedData &&
      Number(cachedPage) === page &&
      cachedSearch === search &&
      cachedSearchBy === searchBy
    ) {
      const parsed = JSON.parse(cachedData);
      setUsers(parsed.users);
      setTotalUsers(parsed.total);
      setLoading(false);
    } else {
      fetchUsers(page, usersPerPage, search, searchBy);
    }
  }, [page, search, searchBy]);

  const handleDelete = async (userId) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      const [, err] = await deleteAdminUserById(userId);
      if (err) {
        setError(err);
      } else {
        sessionStorage.clear();
        fetchUsers(page, usersPerPage, search, searchBy);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    sessionStorage.clear();
    fetchUsers(page, usersPerPage, search, searchBy);
  };

  const handleFormSuccess = useCallback(async () => {
    sessionStorage.clear();
    await fetchUsers(page, usersPerPage, search, searchBy);
  }, [page, search, searchBy]);

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
    search,
    setSearch,
    searchBy,
    setSearchBy, 
  };
}
