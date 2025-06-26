import { useEffect, useState } from 'react';
import { getAdminPaginatedGuitars, deleteGuitarById } from '../../services/guitarAdminService';

export const useAdminGuitar = (guitarsPerPage = 10) => {
  const [guitars, setGuitars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGuitar, setSelectedGuitar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalGuitars, setTotalGuitars] = useState(0);

  const fetchGuitars = async (page = 0, limit = guitarsPerPage) => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedGuitars(page + 1, limit);

    if (err) {
      setError(err);
    } else {
      setGuitars(data.guitars);
      setTotalGuitars(data.total);

      sessionStorage.setItem("cachedGuitars", JSON.stringify(data));
      sessionStorage.setItem("cachedGuitarPage", page);
    }
    setLoading(false);
  };

  useEffect(() => {
    const cachedData = sessionStorage.getItem("cachedGuitars");
    const cachedPage = sessionStorage.getItem("cachedGuitarPage");

    if (cachedData && Number(cachedPage) === page) {
      const parsed = JSON.parse(cachedData);
      setGuitars(parsed.guitars);
      setTotalGuitars(parsed.total);
      setLoading(false);
    } else {
      fetchGuitars(page, guitarsPerPage);
    }
  }, [page]);

  const handleDelete = async (guitarId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta guitarra?")) {
      const [, err] = await deleteGuitarById(guitarId);
      if (err) {
        setError(err);
      } else {
        sessionStorage.removeItem("cachedGuitars");
        sessionStorage.removeItem("cachedGuitarPage");
        fetchGuitars(page, guitarsPerPage);
      }
    }
  };

  const handleUpdate = (guitarId) => {
    setSelectedGuitar(guitarId);
    setShowForm(true);
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    sessionStorage.removeItem("cachedGuitars");
    sessionStorage.removeItem("cachedGuitarPage");
    fetchGuitars(page, guitarsPerPage);
  };

  const handleFormSuccess = async () => {
    sessionStorage.removeItem("cachedGuitars");
    sessionStorage.removeItem("cachedGuitarPage");
    await fetchGuitars(page, guitarsPerPage);
  };

  return {
    guitars,
    showForm,
    isEditing,
    selectedGuitar,
    loading,
    error,
    page,
    totalGuitars,
    setPage,
    setShowForm,
    setIsEditing,
    setSelectedGuitar,
    handleDelete,
    handleUpdate,
    handleCloseForm,
    handleFormSuccess,
  };
};