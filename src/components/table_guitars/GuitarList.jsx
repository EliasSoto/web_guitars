import { useEffect, useState } from 'react';
import { getAdminPaginatedGuitars } from '../../services/guitarAdminService';

import GuitarTableHead from './GuitarTableHead';
import "../../styles/admin_table/TableUsers.css";
import { Icon } from '@iconify/react';

import GuitarRow from './GuitarRow';

const guitarsPerPage = 10;

const GuitarList = () => {
  const [guitars, setGuitars] = useState([]);
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

  const handleDelete = (id) => {
    console.log(`Eliminar guitarra con ID: ${id}`);
    // Aquí puedes agregar la lógica de eliminación real
  };

  const handleUpdate = (id) => {
    console.log(`Editar guitarra con ID: ${id}`);
    // Aquí puedes redirigir a una página de edición o abrir un modal
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Guitarras</h1>
        <Icon
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
        <button disabled={page === 0} onClick={() => setPage(page - 1)}>
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
          disabled={(page + 1) * guitarsPerPage >= totalGuitars}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default GuitarList;
