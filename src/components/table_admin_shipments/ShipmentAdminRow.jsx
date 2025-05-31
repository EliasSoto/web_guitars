import { useEffect, useState } from "react";
import { getAdminUserById } from "../../services/userAdminService";

export default function ShipmentAdminRow({ shipment }) {
  const [userName, setUserName] = useState();

  useEffect(() => {
    const cachedName = sessionStorage.getItem(`userName_${shipment.user_id}`);

    if (cachedName) {
      setUserName(cachedName);
    } else {
      const fetchUserName = async () => {
        const [user, error] = await getAdminUserById(shipment.user_id);
        if (error) {
          setUserName("Usuario no encontrado");
          sessionStorage.setItem(`userName_${shipment.user_id}`, "Usuario no encontrado");
        } else {
          const name = user?.first_name || "Usuario sin nombre";
          setUserName(name);
          sessionStorage.setItem(`userName_${shipment.user_id}`, name);
        }
      };

      fetchUserName();
    }
  }, [shipment.user_id]);

  return (
    <tr>
      <td>{shipment.id}</td>
      <td>{userName}</td>
      <td>{shipment.shipment_date ?? "Por definir"}</td>
      <td>{shipment.delivery_date ?? "Por definir"}</td>
      <td>{shipment.tracking_status ?? "Por definir"}</td>
      <td>{shipment.price != null ? `$${shipment.price}` : "Por definir"}</td>
      <td>{shipment.shipping_provider ?? "Por definir"}</td>
      <td>{shipment.is_immediate_delivery === true ? "Sí" : shipment.is_immediate_delivery === false ? "No" : "Por definir"}</td>
    </tr>
  );
}
