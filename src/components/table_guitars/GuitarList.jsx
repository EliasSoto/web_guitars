import { useEffect, useState, useMemo } from 'react';
import { getAdminPaginatedGuitars, deleteGuitarById } from '../../services/guitarAdminService';
import GuitarTableHead from './GuitarTableHead';
import "../../styles/admin_table/TableUsers.css";
import { Icon } from '@iconify/react';
import GuitarRow from './GuitarRow';
import Modal from '../Modal';
import RegisterAdminGuitarForm from '../forms/RegisterAdminGuitarForm';
import UpdateAdminGuitarForm from '../forms/UpdateAdminGuitarForm';

const guitarsPerPage = 10;

const GuitarList = () => {
  const [guitars, setGuitars] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedGuitar, setSelectedGuitar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalGuitars, setTotalGuitars] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchGuitars = async (page = 0, limit = guitarsPerPage) => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedGuitars(page + 1, limit);

    if (err) {
      setError(err);
    } else {
      setGuitars(data.guitars);
      setTotalGuitars(data.total);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuitars(page, guitarsPerPage);
  }, [page]);

const filteredGuitars = useMemo(() => {
  if (!searchTerm) return guitars;
  
  const term = searchTerm.toLowerCase();
  return guitars.filter(guitar => {
    // Convertimos cada campo a string y manejamos valores undefined/null
    const id = guitar.id?.toString() || '';
    const model = guitar.model?.toLowerCase() || '';
    const brand = guitar.brand?.toLowerCase() || '';
    const purchasePrice = guitar.purchase_price?.toString() || '';
    const salePrice = guitar.sale_price?.toString() || '';
    const stock = guitar.stock?.toString() || '';
    const color = guitar.color?.toLowerCase() || '';
    const purchaseDate = formatDate(guitar.purchase_date)?.toLowerCase() || '';
    const woodType = guitar.wood_type?.toLowerCase() || '';
    const isCustom = guitar.is_custom ? 'si' : 'no';

    return (
      id.includes(term) ||
      model.includes(term) ||
      brand.includes(term) ||
      purchasePrice.includes(term) ||
      salePrice.includes(term) ||
      stock.includes(term) ||
      color.includes(term) ||
      purchaseDate.includes(term) ||
      woodType.includes(term) ||
      isCustom.includes(term)
    );
  });
}, [guitars, searchTerm]);

// Función formatDate copiada desde GuitarRow para usarla en el filtrado
function formatDate(dateString) {
  if (!dateString) return 'No registrada';
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
}

  const handleDelete = async (guitarId) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta guitarra?")) {
      const [, err] = await deleteGuitarById(guitarId);
      if (err) {
        setError(err);
      } else {
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
    fetchGuitars(page, guitarsPerPage);
  };

  const handleFormSuccess = async () => {
    await fetchGuitars(page, guitarsPerPage);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Guitarras</h1>
        <div className="search-add-container">
          <div className="search-bar">
            <Icon icon="ic:outline-search" width="24" height="24" />
            <input
              type="text"
              placeholder="Buscar guitarras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Icon
            onClick={() => {
              setShowForm(true);
              setIsEditing(false);
              setSelectedGuitar(null);
            }}
            style={{ cursor: 'pointer' }}
            icon="mdi:guitar-electric"
            width="34"
            height="34"
            color="#3563E9"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando guitarras...</p>
        </div>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : filteredGuitars.length === 0 ? (
        <p>{searchTerm ? 'No se encontraron guitarras que coincidan con la búsqueda.' : 'No se encontraron guitarras.'}</p>
      ) : (
        <>
          <table>
            <GuitarTableHead />
            <tbody>
              {filteredGuitars.map((guitar) => (
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
            <button className="pagination-button" disabled={page === 0} onClick={() => setPage(page - 1)}>
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
    </div>
  );
};

export default GuitarList;