import { useEffect, useState, useCallback } from 'react';
import { getAdminPaginatedGuitars, deleteGuitarById } from '../services/guitarAdminService';

const guitarsPerPage = 10;

export default function useAdminGuitar() {
  const [guitars, setGuitars] = useState([]);
  const [totalGuitars, setTotalGuitars] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedGuitar, setSelectedGuitar] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Estados de búsqueda
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('model');

  const fetchGuitars = async (page = 0, limit = guitarsPerPage, search = '', searchBy = 'model') => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedGuitars(page + 1, limit, search, searchBy);

    if (err) {
      setError(err);
    } else {
      setGuitars(data.guitars);
      setTotalGuitars(data.total);

      sessionStorage.setItem("cachedGuitars", JSON.stringify(data));
      sessionStorage.setItem("cachedGuitarPage", page);
      sessionStorage.setItem("cachedGuitarSearch", search);
      sessionStorage.setItem("cachedGuitarSearchBy", searchBy);
      setError(null);
    }

    setLoading(false);
  };

  useEffect(() => {
    const cachedData = sessionStorage.getItem("cachedGuitars");
    const cachedPage = sessionStorage.getItem("cachedGuitarPage");
    const cachedSearch = sessionStorage.getItem("cachedGuitarSearch") || '';
    const cachedSearchBy = sessionStorage.getItem("cachedGuitarSearchBy") || 'model';

    if (
      cachedData &&
      Number(cachedPage) === page &&
      cachedSearch === search &&
      cachedSearchBy === searchBy
    ) {
      const parsed = JSON.parse(cachedData);
      setGuitars(parsed.guitars);
      setTotalGuitars(parsed.total);
      setLoading(false);
    } else {
      fetchGuitars(page, guitarsPerPage, search, searchBy);
    }
  }, [page, search, searchBy]);

  const handleDelete = async (guitarId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta guitarra?")) {
      const [, err] = await deleteGuitarById(guitarId);
      if (err) {
        setError(err);
      } else {
        sessionStorage.clear();
        fetchGuitars(page, guitarsPerPage, search, searchBy);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    sessionStorage.clear();
    fetchGuitars(page, guitarsPerPage, search, searchBy);
  };

  const handleFormSuccess = useCallback(async () => {
    sessionStorage.clear();
    await fetchGuitars(page, guitarsPerPage, search, searchBy);
  }, [page, search, searchBy]);

  const handleUpdate = (guitarId) => {
    setSelectedGuitar(guitarId);
    setShowForm(true);
    setIsEditing(true);
  };

  return {
    guitars,
    totalGuitars,
    page,
    setPage,
    loading,
    error,
    selectedGuitar,
    showForm,
    isEditing,
    setShowForm,
    setIsEditing,
    setSelectedGuitar,
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
