import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getAdminUserById } from "../../services/userAdminService";
import { getShipmentStatusByOrderIdAdmin } from "../../services/shipmentAdminService";

export default function OrderRow({ order, onViewDetails }) {
  const [userName, setUserName] = useState();
  const [shipmentStatus, setShipmentStatus] = useState("Cargando...");

  useEffect(() => {
    const cachedName = sessionStorage.getItem(`userName_${order.user_id}`);

    if (cachedName) {
      setUserName(cachedName);
    } else {
      const fetchUserName = async () => {
        const [user, error] = await getAdminUserById(order.user_id);
        const name = !error ? user?.first_name || "Usuario sin nombre" : "Usuario no encontrado";
        setUserName(name);
        sessionStorage.setItem(`userName_${order.user_id}`, name);
      };

      fetchUserName();
    }

    const fetchShipmentStatus = async () => {
      const [data, err] = await getShipmentStatusByOrderIdAdmin(order.id);
      if (!err && data?.tracking_status) {
        setShipmentStatus(data.tracking_status);
      } else {
        setShipmentStatus("No disponible");
      }
    };

    fetchShipmentStatus();
  }, [order.user_id, order.id]);

  const totalQuantity = order.order_details.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <tr>
      <td>{order.id}</td>
      <td>{userName}</td>
      <td>{order.order_date}</td>
      <td>{order.payment_method}</td>
      <td>{order.status}</td>
      <td>{shipmentStatus}</td>
      <td>{order.total_price}</td>
      <td>{totalQuantity}</td>
      <td className="action-icons">
        {order.status === "procesado" && (
          <Icon
            icon="icon-park-outline:preview-open"
            width={22}
            height={22}
            color="#3563E9"
            style={{ cursor: "pointer" }}
            onClick={() => onViewDetails(order.id)}
          />
        )}
      </td>
    </tr>
  );
}
