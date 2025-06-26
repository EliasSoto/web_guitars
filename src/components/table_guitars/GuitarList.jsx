
import GuitarTableHead from './GuitarTableHead';
import "../../styles/admin_table/TableUsers.css";
import { Icon } from '@iconify/react';
import GuitarRow from './GuitarRow';
import Modal from '../Modal';
import RegisterAdminGuitarForm from '../forms/RegisterAdminGuitarForm';
import useAdminUsers from '../../hooks/useAdminUsers';


const guitarsPerPage = 10;

const GuitarList = () => {
  const {
    guitars,
    showForm,
    isEditing,
    selectedGuitar,
    loading,
    error,
    page,
    totalGuitars,
    setPage,
    setShowForm,
    setIsEditing,
    setSelectedGuitar,
    handleDelete,
    handleUpdate,
    handleCloseForm,
    handleFormSuccess,
  } = useAdminGuitar(guitarsPerPage);

  

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
          icon="mdi:guitar-acoustic"
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