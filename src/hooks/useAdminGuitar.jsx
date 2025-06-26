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

  // Construir término de búsqueda (simple passthrough)
  const buildSearchTerm = (value) => value;

  const fetchGuitars = useCallback(
    async (pageParam = 0, limit = guitarsPerPage, searchValue = '', searchType = 'model') => {
      setLoading(true);
      setError(null);

      const term = buildSearchTerm(searchValue);

      try {
        const [data, err] = await getAdminPaginatedGuitars(pageParam + 1, limit, term, searchType);

        if (err) {
          setError(err);
        } else if (data) {
          setGuitars(data.guitars || []);
          setTotalGuitars(data.total || 0);

          sessionStorage.setItem('cachedGuitars', JSON.stringify(data));
          sessionStorage.setItem('cachedGuitarPage', pageParam.toString());
          sessionStorage.setItem('cachedGuitarSearch', searchValue);
          sessionStorage.setItem('cachedGuitarSearchBy', searchType);
          setError(null);
        }
      } catch (e) {
        setError(e.message || 'Error al obtener guitarras');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const cachedData = sessionStorage.getItem('cachedGuitars');
    const cachedPage = sessionStorage.getItem('cachedGuitarPage');
    const cachedSearch = sessionStorage.getItem('cachedGuitarSearch') || '';
    const cachedSearchBy = sessionStorage.getItem('cachedGuitarSearchBy') || 'model';

    if (
      cachedData &&
      Number(cachedPage) === page &&
      cachedSearch === search &&
      cachedSearchBy === searchBy
    ) {
      const parsed = JSON.parse(cachedData);
      setGuitars(parsed.guitars || []);
      setTotalGuitars(parsed.total || 0);
      setLoading(false);
    } else {
      fetchGuitars(page, guitarsPerPage, search, searchBy);
    }
  }, [page, search, searchBy, fetchGuitars]);

  const clearCache = () => {
    sessionStorage.removeItem('cachedGuitars');
    sessionStorage.removeItem('cachedGuitarPage');
    sessionStorage.removeItem('cachedGuitarSearch');
    sessionStorage.removeItem('cachedGuitarSearchBy');
  };

  const handleDelete = async (guitarId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta guitarra?')) {
      const [, err] = await deleteGuitarById(guitarId);
      if (err) {
        setError(err);
      } else {
        clearCache();
        fetchGuitars(page, guitarsPerPage, search, searchBy);
      }
    }
  };

  const handleCloseForm = () => {
    setShowForm(false);
    clearCache();
    fetchGuitars(page, guitarsPerPage, search, searchBy);
  };

  const handleFormSuccess = useCallback(async () => {
    clearCache();
    await fetchGuitars(page, guitarsPerPage, search, searchBy);
  }, [page, search, searchBy, fetchGuitars]);

  const handleUpdate = (guitarId) => {
    setSelectedGuitar(guitarId);
    setShowForm(true);
    setIsEditing(true);
  };

  // Manejo de cambios en la búsqueda
  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(0);
  };

  const handleSearchByChange = (newSearchBy) => {
    setSearchBy(newSearchBy);
    setSearch('');
    setPage(0);
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
    searchBy,
    handleSearchChange,
    handleSearchByChange,
    guitarsPerPage,
  };
}
