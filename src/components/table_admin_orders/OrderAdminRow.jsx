import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { getAdminUserById } from "../../services/userAdminService";

export default function OrderRow({ order }) {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const cachedName = sessionStorage.getItem(`userName_${order.user_id}`);

    if (cachedName) {
      setUserName(cachedName);
    } else {
      const fetchUserName = async () => {
        const [user, error] = await getAdminUserById(order.user_id);
        if (error) {
          console.error("Error fetching user:", error);
          setUserName("Usuario no encontrado");
          sessionStorage.setItem(`userName_${order.user_id}`, "Usuario no encontrado");
        } else {
          const name = user?.first_name || "Usuario sin nombre";
          setUserName(name);
          sessionStorage.setItem(`userName_${order.user_id}`, name);
        }
      };

      fetchUserName();
    }
  }, [order.user_id]);

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
      <td>{order.total_price}</td>
      <td>{totalQuantity}</td>
    </tr>
  );
}
