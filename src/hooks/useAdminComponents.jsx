import { useEffect, useState } from "react";
import { 
  getAdminPaginatedComponents, 
  deleteComponentByIdAdmin 
} from "../services/componentService";

const componentsPerPage = 10;

export default function useAdminComponents() {
  const [components, setComponents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);  // Internamente usamos 0, pero en fetch sumamos +1
  const [totalComponents, setTotalComponents] = useState(0);

  // Estados de búsqueda
  const [search, setSearch] = useState('');
  const [searchBy, setSearchBy] = useState('name');

  const fetchComponents = async (pageParam, limit, searchParam, searchByParam) => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedComponents(
      pageParam + 1, // API pagina desde 1
      limit,
      searchParam,
      searchByParam
    );

    if (err) {
      setError(err);
    } else {
      setComponents(data.components);
      setTotalComponents(data.total);
      setError(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    // Cada vez que cambian page, search o searchBy se recarga la data
    fetchComponents(page, componentsPerPage, search, searchBy);
  }, [page, search, searchBy]);

  const handleDelete = async (componentId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este componente?")) {
      const [, err] = await deleteComponentByIdAdmin(componentId);
      if (err) {
        setError(err);
      } else {
        // Recargar la página actual después de eliminar
        fetchComponents(page, componentsPerPage, search, searchBy);
      }
    }
  };

  const handleSearchChange = (value) => {
    setSearch(value);
    setPage(0); // resetear página para nueva búsqueda
    // NO llamar fetchComponents acá, ya lo hace el useEffect
  };

  const handleSearchByChange = (value) => {
    setSearchBy(value);
    setPage(0);
    setSearch(''); // limpiar texto al cambiar filtro de búsqueda
    // NO llamar fetchComponents acá, ya lo hace el useEffect
  };

  return {
    components,
    handleSearchByChange,
    handleSearchChange,
    showForm,
    setShowForm,
    isEditing,
    setIsEditing,
    selectedComponent,
    setSelectedComponent,
    loading,
    error,
    page,
    setPage,
    totalComponents,
    componentsPerPage,
    handleDelete,
    fetchComponents,
    search,
    setSearch,
    searchBy,
    setSearchBy,
  };
}
