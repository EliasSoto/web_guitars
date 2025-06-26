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
  const [comparisonOperator, setComparisonOperator] = useState('greater');

  // Función para construir el término de búsqueda
  // Modifica la función buildSearchTerm en useAdminGuitar.js
const buildSearchTerm = useCallback((searchValue, searchType, operator) => {
  if (searchType === 'stock' && searchValue) {
    // Asegurarnos que el valor sea un número válido
    const numericValue = parseInt(searchValue);
    if (isNaN(numericValue) || numericValue < 0) return '';
    
    // Mapear los operadores a los que espera la API
    const operatorTranslation = {
      'greater': 'mayor',
      'less': 'menor',
      'equal': 'igual'
    };
    
    return `${operatorTranslation[operator]} ${numericValue}`;
  }
  return searchValue;
}, []);

  const fetchGuitars = useCallback(async (page = 0, limit = guitarsPerPage, searchValue = '', searchType = 'model') => {
    setLoading(true);
    const term = buildSearchTerm(searchValue, searchType, comparisonOperator);

    
    const [data, err] = await getAdminPaginatedGuitars(page + 1, limit, term, searchType);

    if (err) {
      setError(err);
    } else {
      setGuitars(data.guitars);
      setTotalGuitars(data.total);

      sessionStorage.setItem("cachedGuitars", JSON.stringify(data));
      sessionStorage.setItem("cachedGuitarPage", page);
      sessionStorage.setItem("cachedGuitarSearch", searchValue);
      sessionStorage.setItem("cachedGuitarSearchBy", searchType);
      setError(null);
    }

    setLoading(false);
  }, [buildSearchTerm, comparisonOperator]);

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
  }, [page, search, searchBy, fetchGuitars]);

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
  }, [page, search, searchBy, fetchGuitars]);

  const handleUpdate = (guitarId) => {
    setSelectedGuitar(guitarId);
    setShowForm(true);
    setIsEditing(true);
  };

  // Manejo de cambios en la búsqueda
  const handleSearchChange = (value) => {
    const term = searchBy === 'stock' ? `${comparisonOperator} ${value}` : value;
    setSearch(term);
    setPage(0);
  };

  const handleSearchByChange = (newSearchBy) => {
    setSearchBy(newSearchBy);
    setSearch('');
    setPage(0);
  };

  const handleComparisonOperatorChange = (operator) => {
    setComparisonOperator(operator);
    if (searchBy === 'stock' && search) {
      const value = search.split(' ')[1] || '';
      setSearch(`${operator} ${value}`);
      setPage(0);
    }
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
    comparisonOperator,
    handleSearchChange,
    handleSearchByChange,
    handleComparisonOperatorChange,
    guitarsPerPage,
  };
}