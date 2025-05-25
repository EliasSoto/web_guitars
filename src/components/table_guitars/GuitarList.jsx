import { useEffect, useState } from 'react';
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



  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Guitarras</h1>
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
