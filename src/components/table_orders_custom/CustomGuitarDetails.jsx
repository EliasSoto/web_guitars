import { useEffect, useState, useRef } from "react";
import { getUserOrderById } from "../../services/userOrderService";
import { Icon } from "@iconify/react";
import "../../styles/CustomGuitarDetails.css";
import DownloadRecievePDF from "../DownloadRecievePDF";
import { formatPrice, formatDate } from "../../utils/common";

export default function CustomGuitarDetailsUser({ orderId }) {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const boletaRef = useRef();

  const fetchOrder = async () => {
    setLoading(true);
    const [data, err] = await getUserOrderById(orderId);

    if (err) {
      setError(err);
    } else {
      setOrder(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  if (loading)
    return (
      <div className="loading-container">
        <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
        <p>Cargando detalles del pedido...</p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;
  if (!order) return <p>No se encontró la orden.</p>;

  return (
    <div>
      <div className="custom-order-container" ref={boletaRef}>
        <header className="order-header">
          <div className="header-info">
            <h2 className="order-title">Detalles del Pedido #{order.id}</h2>
            <DownloadRecievePDF targetRef={boletaRef} orderId={order.id} />
          </div>

          <p className="order-date"><strong>Fecha:</strong> {formatDate(order.order_date)}</p>
          <p className="order-status"><strong>Estado:</strong> {order.status}</p>
          <p className="order-payment"><strong>Método de pago:</strong> {order.payment_method}</p>
          <p className="order-total"><strong>Total:</strong> {formatPrice(order.total_price)}</p>

          {/* Si existe estado de envío, mostrarlo */}
          {order.shipment_status && (
            <p className="order-shipment-status"><strong>Estado de envío:</strong> {order.shipment_status}</p>
          )}
        </header>

        {order.order_details.map((detail, i) => {
          const custom = detail.custom_guitar;

          if (!custom) return null;

          const hasActiveElectronics = custom.component_details?.some(
            (cd) => cd.component.type === "Pastilla" && cd.component.is_active === true
          );

          return (
            <section key={i} className="guitar-build-section">
              <h3 className="guitar-title">Guitarra Personalizada</h3>
              <ul className="guitar-specs">
                <li><strong>Modelo base:</strong> {custom.guitar?.model} – {custom.guitar?.wood_type}</li>
                <li><strong>Color personalizado:</strong> {custom.custom_color}</li>
                <li><strong>Trastes:</strong> {custom.custom_fret}</li>
                {custom.jack_position && <li><strong>Jack:</strong> {custom.jack_position}</li>}
                <li><strong>Tipo electrónica:</strong> {hasActiveElectronics ? "Activa" : "Pasiva"}</li>
                <li><strong>Precio:</strong> {formatPrice(custom.total_price)}</li>
              </ul>

              <h4 className="components-title">Componentes</h4>
              <ul className="components-list">
                {custom.component_details.map((cd, idx) => (
                  <li key={idx} className="component-item">
                    <strong>{cd.quantity}x</strong> {cd.component.name} – {cd.component.type} {cd.component.subtype ? ` (${cd.component.subtype})` : ""} - {formatPrice(cd.component.sale_price)}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
