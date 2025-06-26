import { useEffect, useState, useMemo } from "react";
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
  const [page, setPage] = useState(0);
  const [totalComponents, setTotalComponents] = useState(0);
  
  // Estados para búsqueda
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("name"); // 'name', 'type', 'subtype'

  const fetchComponents = async (page = 0, limit = componentsPerPage) => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedComponents(page + 1, limit);

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
    fetchComponents(page, componentsPerPage);
  }, [page]);

  const filteredComponents = useMemo(() => {
    if (!searchTerm) return components;

    const term = searchTerm.toLowerCase();
    return components.filter((comp) => {
      const name = comp.name?.toLowerCase() || "";
      const type = comp.type?.toLowerCase() || "";
      const subtype = comp.subtype?.toLowerCase() || "";

      switch(searchBy) {
        case "name": return name.includes(term);
        case "type": return type.includes(term);
        case "subtype": return subtype.includes(term);
        default: return true;
      }
    });
  }, [components, searchTerm, searchBy]);

  const handleDelete = async (componentId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este componente?")) {
      const [, err] = await deleteComponentByIdAdmin(componentId);
      if (err) {
        setError(err);
      } else {
        fetchComponents(page, componentsPerPage);
      }
    }
  };

  return {
    components: filteredComponents,
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
    searchTerm,
    setSearchTerm,
    searchBy,
    setSearchBy,
    handleDelete,
    fetchComponents
  };
}