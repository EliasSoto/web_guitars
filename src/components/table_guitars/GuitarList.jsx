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

import { useState, useEffect } from 'react'; // Agregar useState y useEffect

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
    handleSearchChange,
    handleSearchByChange,
    guitarsPerPage,
  } = useAdminGuitar();

  // Estado local para el operador (greater, less, equal)
  const [operator, setOperator] = useState('greater');
  // Estado local para el valor numérico del input cuando searchBy es stock
  const [numberInput, setNumberInput] = useState('');

  // Cuando cambia searchBy, resetear operador y número
  useEffect(() => {
    setOperator('greater');
    setNumberInput('');
    // Si no es stock, pasamos search vacío para limpiar la búsqueda
    if (searchBy !== 'stock') {
      handleSearchChange('');
    }
  }, [searchBy]);

  // Manejar cambio operador
  const handleOperatorChange = (e) => {
    const newOperator = e.target.value;
    setOperator(newOperator);
    if (numberInput) {
      handleSearchChange(`${newOperator} ${numberInput}`);
    }
  };

  // Manejar cambio input cuando searchBy === 'stock'
  const handleNumberChange = (e) => {
    const val = e.target.value;
    // Permitir solo números
    if (/^\d*$/.test(val)) {
      setNumberInput(val);
      if (val) {
        handleSearchChange(`${operator} ${val}`);
      } else {
        // Si el input queda vacío, limpiar búsqueda
        handleSearchChange('');
      }
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Guitarras</h1>

        <div className="search-add-container">
          <div className="search-bar">
            <Icon icon="ic:outline-search" width="2.5rem" height="2.5rem" />

            {/* Select de operador - visible solo para stock */}
            {searchBy === 'stock' && (
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
                searchBy === 'model' ? 'modelo' : searchBy === 'brand' ? 'marca' : 'stock'
              }...`}
           
              value={searchBy === 'stock' ? numberInput : search}
              onChange={(e) => {
                if (searchBy === 'stock') {
                  handleNumberChange(e);
                } else {
                  handleSearchChange(e.target.value);
                }
              }}
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

      {/* Resto del componente sigue igual */}
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
