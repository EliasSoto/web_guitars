
export default function OrderProductRow({ detail, orderId }) {
const guitar = detail.guitar;

  return (
    <tr>
      <td>{guitar.is_custom ? "Personalizado" : "Normal"}</td>
      <td>{guitar.brand}</td>
      <td>{guitar.model}</td>
      <td>{detail.quantity}</td>
      <td>${detail.unit_price}</td>
      <td>${detail.total_price}</td>
    </tr>
  );
}
