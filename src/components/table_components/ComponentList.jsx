import { Icon } from "@iconify/react";
import useAdminComponents from "../../hooks/useAdminComponents";
import ComponentTableHead from "./ComponentTableHead";
import ComponentRow from "./ComponentRow";
import Modal from "../Modal";
import RegisterAdminComponentForm from "../forms/RegisterAdminComponentForm";
import UpdateAdminComponentForm from "../forms/UpdateAdminComponentForm";
import "../../styles/admin_table/TableUsers.css";

const ComponentList = () => {
  const {
    components,
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
  } = useAdminComponents();

  const handleUpdate = (componentId) => {
    setSelectedComponent(componentId);
    setShowForm(true);
    setIsEditing(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    fetchComponents(page, componentsPerPage);
  };

  const handleFormSuccess = async () => {
    await fetchComponents(page, componentsPerPage);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Componentes</h1>
        <div className="search-add-container">
          <div className="search-bar">
            <Icon icon="ic:outline-search" width={24} height={24} />
            <input
              type="text"
              placeholder={`Buscar por ${
                searchBy === 'name' ? 'nombre' : 
                searchBy === 'type' ? 'tipo' : 
                'subtipo'
              }`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="search-bar-select"
              value={searchBy}
              onChange={(e) => setSearchBy(e.target.value)}
            >
              <option value="name">Nombre</option>
              <option value="type">Tipo</option>
              <option value="subtype">Subtipo</option>
            </select>
          </div>
          <Icon
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setSelectedComponent(null);
            }}
            style={{ cursor: "pointer" }}
            icon="uiw:component"
            width={34}
            height={34}
            color="#3563E9"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon
            icon="line-md:loading-loop"
            width={40}
            height={40}
            className="loading-icon"
          />
          <p>Cargando componentes...</p>
        </div>
      ) : error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : components.length === 0 ? (
        <p>
          {searchTerm
            ? "No se encontraron componentes que coincidan con la búsqueda."
            : "No se encontraron componentes."}
        </p>
      ) : (
        <>
          <table>
            <ComponentTableHead />
            <tbody>
              {components.map((component) => (
                <ComponentRow
                  key={component.id}
                  component={component}
                  handleDelete={handleDelete}
                  handleUpdate={handleUpdate}
                />
              ))}
            </tbody>
          </table>

          <div className="pagination-controls">
            <button
              className="pagination-button"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </button>

            {[...Array(Math.ceil(totalComponents / componentsPerPage)).keys()].map(
              (num) => (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  className={`pagination-button ${page === num ? "active" : ""}`}
                >
                  {num + 1}
                </button>
              )
            )}

            <button
              className="pagination-button"
              disabled={(page + 1) * componentsPerPage >= totalComponents}
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      <Modal isOpen={showForm} onClose={handleCloseForm}>
        {isEditing ? (
          <UpdateAdminComponentForm
            componentId={selectedComponent}
            onSuccess={handleFormSuccess}
          />
        ) : (
          <RegisterAdminComponentForm onSuccess={handleFormSuccess} />
        )}
      </Modal>
    </div>
  );
};

export default ComponentList;