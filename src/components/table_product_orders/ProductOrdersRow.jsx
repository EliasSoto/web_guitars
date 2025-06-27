export default function OrderProductRow({ detail, orderId }) {
  const isCustom = !!detail.custom_guitar;
  const guitar = isCustom ? detail.custom_guitar.guitar : detail.guitar;

  const brand = guitar?.brand ?? "N/A";
  const model = guitar?.model ?? "N/A";
  const color = isCustom ? detail.custom_guitar.custom_color : guitar?.color ?? "N/A";

  return (
    <tr>
      <td>{isCustom ? "Personalizado" : "Normal"}</td>
      <td>{brand}</td>
      <td>{model}</td>
      <td>{color}</td>
      <td>{detail.quantity}</td>
      <td>${detail.unit_price.toLocaleString()}</td>
      <td>${detail.total_price.toLocaleString()}</td>
    </tr>
  );
}
