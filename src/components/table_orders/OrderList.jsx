import { useEffect } from "react";
import OrderRow from "./OrderRow";
import OrderTableHead from "./OrderTableHead";
import "../../styles/admin_table/TableUsers.css";
import { useUserOrder } from "../../hooks/useUserOrder";
import { getUserOrdersPaginated } from "../../services/userOrderService";

const ordersPerPage = 10;

export default function OrderList({ userName }) {
  const {
    orders,
    setOrders,
    total,
    setTotal,
    loading,
    page,
    setPage,
    setLoading,
    setError,
  } = useUserOrder();

  const fetchOrders = async (page = 1, limit = ordersPerPage) => {
    setLoading(true);
    const [data, err] = await getUserOrdersPaginated(page, limit);

    if (err) {
      setError(err);
    } else {
      setOrders(data.orders);
      setTotal(data.total);

      sessionStorage.setItem("cachedOrders", JSON.stringify(data));
      sessionStorage.setItem("cachedOrderPage", page);
    }
    setLoading(false);
  };

  useEffect(() => {
    const cachedData = sessionStorage.getItem("cachedOrders");
    const cachedPage = Number(sessionStorage.getItem("cachedOrderPage"));
  
    if (cachedData && cachedPage === page) {
      const parsed = JSON.parse(cachedData);
      setOrders(parsed.orders);
      setTotal(parsed.total);
      setLoading(false);
    } else {
      fetchOrders(page, ordersPerPage);
    }
  }, [page]);

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Órdenes de {userName}</h2>
      </div>

      {loading ? (
        <p>Cargando órdenes...</p>
      ) : orders.length === 0 ? (
        <p>No se encontraron órdenes.</p>
      ) : (
        <>
          <table>
            <OrderTableHead />
            <tbody>
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} />
              ))}
            </tbody>
          </table>

          <div className="pagination-controls">
            <button
              className="pagination-button"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Anterior
            </button>

            {[...Array(Math.ceil(total / ordersPerPage)).keys()].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num + 1)}
                className={`pagination-button ${
                  page === num + 1 ? "active" : ""
                }`}
              >
                {num + 1}
              </button>
            ))}

            <button
              className="pagination-button"
              disabled={page * ordersPerPage >= total}
              onClick={() => setPage(page + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}
