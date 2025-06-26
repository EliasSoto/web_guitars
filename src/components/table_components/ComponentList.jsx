import { Icon } from "@iconify/react";
import useAdminComponents from "../../hooks/useAdminComponents";
import ComponentTableHead from "./ComponentTableHead";
import ComponentRow from "./ComponentRow";
import Modal from "../Modal";
import RegisterAdminComponentForm from "../forms/RegisterAdminComponentForm";
import UpdateAdminComponentForm from "../forms/UpdateAdminComponentForm";
import "../../styles/admin_table/TableUsers.css";
import { useState, useEffect } from "react";

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
    handleSearchByChange,
    handleSearchChange,
    componentsPerPage,
    handleDelete,
    fetchComponents,
    search,
    searchBy,
  } = useAdminComponents();

  const [operator, setOperator] = useState("greater");
  const [numberInput, setNumberInput] = useState("");

  useEffect(() => {
    setOperator("greater");
    setNumberInput("");
    // Eliminar esta línea para evitar llamadas duplicadas y bloqueo
    // if (searchBy !== "stock") {
    //   handleSearchChange("");
    // }
  }, [searchBy]);

  const handleOperatorChange = (e) => {
    const newOperator = e.target.value;
    setOperator(newOperator);
    if (numberInput) {
      handleSearchChange(`${newOperator} ${numberInput}`);
    }
  };

  const handleNumberChange = (e) => {
    const val = e.target.value;
    if (/^\d*$/.test(val)) {
      setNumberInput(val);
      if (val) {
        handleSearchChange(`${operator} ${val}`);
      } else {
        handleSearchChange("");
      }
    }
  };

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

  const totalPages = Math.ceil(totalComponents / componentsPerPage);

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Componentes</h1>

        <div className="search-add-container">
          <div className="search-bar">
            <Icon icon="ic:outline-search" width="2.5rem" height="2.5rem" />

            {searchBy === "stock" && (
              <select
                className="search-bar-select"
                value={operator}
                onChange={handleOperatorChange}
              >
                <option value="greater">Mayor</option>
                <option value="less">Menor</option>
                <option value="equal">Igual</option>
              </select>
            )}

            <input
              className="search-bar-input"
              placeholder={`Buscar por ${
                searchBy === "name"
                  ? "nombre"
                  : searchBy === "type"
                  ? "tipo"
                  : searchBy === "subtype"
                  ? "subtipo"
                  : "stock"
              }...`}
              value={searchBy === "stock" ? numberInput : search}
              onChange={(e) => {
                if (searchBy === "stock") {
                  handleNumberChange(e);
                } else {
                  handleSearchChange(e.target.value);
                }
              }}
            />

            <select
              className="search-bar-select"
              value={searchBy}
              onChange={(e) => {
                handleSearchByChange(e.target.value);
                setNumberInput(""); // Limpia input numérico para que sea editable
              }}
            >
              <option value="name">Nombre</option>
              <option value="type">Tipo</option>
              <option value="subtype">Subtipo</option>
              <option value="stock">Stock</option>
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
        <p>No se encontraron componentes.</p>
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
              disabled={page <= 0}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </button>

            {[...Array(totalPages).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`pagination-button ${page === num ? "active" : ""}`}
              >
                {num + 1}
              </button>
            ))}

            <button
              className="pagination-button"
              disabled={page >= totalPages - 1}
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
