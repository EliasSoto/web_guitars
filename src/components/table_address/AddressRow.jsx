
export default function AddressRow({ address }) {
  return (
    <tr key={address.id}>
      <td>{address.id}</td>
      <td>{address.street_name}</td>
      <td>{address.commune}</td>
      <td>{address.region}</td>
      <td>{address.address_type}</td>
      <td>{address.directions || '—'}</td>
      <td>{address.is_active ? 'Activa' : 'Inactiva'}</td>
    </tr>
  );
}
