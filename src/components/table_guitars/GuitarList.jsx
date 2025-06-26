import GuitarRow from './GuitarRow';
import GuitarTableHead from './GuitarTableHead';
import '../../styles/admin_table/TableUsers.css';
import { Icon } from '@iconify/react';
import Modal from '../Modal';
import RegisterAdminGuitarForm from '../forms/RegisterAdminGuitarForm';
import UpdateAdminGuitarForm from '../forms/UpdateAdminGuitarForm';
import useAdminGuitar from '../../hooks/useAdminGuitar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const GuitarList = () => {
  const {
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
  } = useAdminGuitar();

  // Obtener el valor actual del input de búsqueda
  const getCurrentSearchValue = () => {
    return searchBy === 'stock' ? search.split(' ')[1] || '' : search;
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Guitarras</h1>

        <div className="search-add-container">
          <div className="search-bar">
            <Icon icon="ic:outline-search" width="2.5rem" height="2.5rem" />

            {/* Select de operador de comparación - solo visible cuando searchBy es 'stock' */}
            {searchBy === 'stock' && (
              <select
                className="search-bar-select"
                value={comparisonOperator}
                onChange={(e) => handleComparisonOperatorChange(e.target.value)}
              >
                <option value="greater">Mayor</option>
                <option value="less">Menor</option>
                <option value="equal">Igual</option>
              </select>
            )}

            <input
              className="search-bar-input"
              type={searchBy === 'stock' ? 'number' : 'text'}
              placeholder={`Buscar por ${searchBy === 'model' ? 'modelo' : searchBy === 'brand' ? 'marca' : 'stock'}...`}
              value={getCurrentSearchValue()}
              onChange={(e) => handleSearchChange(e.target.value)}
            />
            
            <select
              className="search-bar-select"
              value={searchBy}
              onChange={(e) => handleSearchByChange(e.target.value)}
            >
              <option value="model">Modelo</option>
              <option value="brand">Marca</option>
              <option value="stock">Stock</option>
            </select>
          </div>

          <Icon
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setSelectedGuitar(null);
            }}
            style={{ cursor: 'pointer' }}
            color="#3563E9"
            icon="mdi:guitar-acoustic"
            width="34"
            height="34"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando guitarras...</p>
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error.message || error}</p>
      ) : guitars.length === 0 ? (
        <p>
          {search
            ? 'No se encontraron guitarras que coincidan con la búsqueda.'
            : 'No hay guitarras registradas.'}
        </p>
      ) : (
        <>
          <table>
            <GuitarTableHead />
            <tbody>
              {guitars.map((guitar) => (
                <GuitarRow
                  key={guitar.id}
                  guitar={guitar}
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

            {[...Array(Math.ceil(totalGuitars / guitarsPerPage)).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`pagination-button ${page === num ? 'active' : ''}`}
              >
                {num + 1}
              </button>
            ))}

            <button
              className="pagination-button"
              disabled={(page + 1) * guitarsPerPage >= totalGuitars}
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}

      <Modal isOpen={showForm} onClose={handleCloseForm}>
        {isEditing ? (
          <UpdateAdminGuitarForm guitarId={selectedGuitar} onSuccess={handleFormSuccess} />
        ) : (
          <RegisterAdminGuitarForm onSuccess={handleFormSuccess} />
        )}
      </Modal>

      <ToastContainer position="top-center" autoClose={900} hideProgressBar />
    </div>
  );
};

export default GuitarList;