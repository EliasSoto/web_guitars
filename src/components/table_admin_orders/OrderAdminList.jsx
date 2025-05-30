
import { useEffect, useState } from "react";
import { getAdminPaginatedOrders } from "../../services/orderAdminService";
import OrderAdminTableHead from "./OrderAdminTableHead";
import OrderAdminRow from "./OrderAdminRow";
import "../../styles/admin_table/TableUsers.css";

const ordersPerPage = 10;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  const fetchOrders = async (page = 0, limit = ordersPerPage) => {
    setLoading(true);
    const [data, err] = await getAdminPaginatedOrders(page + 1, limit);

    if (err) {
      setError(err);
    } else {
      setOrders(data.orders);
      setTotalOrders(data.total);
      sessionStorage.setItem("cachedOrders", JSON.stringify(data));
      sessionStorage.setItem("cachedOrderPage", page);
    }

    setLoading(false);
  };

  useEffect(() => {
    const cachedData = sessionStorage.getItem("cachedOrders");
    const cachedPage = sessionStorage.getItem("cachedOrderPage");

    if (cachedData && Number(cachedPage) === page) {
      const parsed = JSON.parse(cachedData);
      setOrders(parsed.orders);
      setTotalOrders(parsed.total);
      setLoading(false);
    } else {
      fetchOrders(page, ordersPerPage);
    }
  }, [page]);

  return (
    <div className="table-container">
      <div className="table-header">
        <h1>Lista de Pedidos</h1>
      </div>

      <table>
        <OrderAdminTableHead />
        <tbody>
          {orders.map((order) => (
            <OrderAdminRow key={order.id} order={order} />
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

        {[...Array(Math.ceil(totalOrders / ordersPerPage)).keys()].map((num) => (
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
          disabled={(page + 1) * ordersPerPage >= totalOrders}
          onClick={() => setPage(page + 1)}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default OrderList;
