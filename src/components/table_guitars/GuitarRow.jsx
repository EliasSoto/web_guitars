import { Icon } from '@iconify/react';
import { formatPrice, formatDate } from '../../utils/common';

export default function GuitarRow({ guitar, handleDelete, handleUpdate }) {
  
  return (
    <tr key={guitar.id}>
      <td>{guitar.id}</td>
      <td>{guitar.model}</td>
      <td>{guitar.brand}</td>
      <td>{formatPrice(guitar.purchase_price)}</td>
      <td>{formatPrice(guitar.sale_price)}</td>
      <td>{guitar.stock}</td>
      <td>{guitar.color}</td>
      <td>{formatDate(guitar.purchase_date)}</td>
      <td>{guitar.wood_type}</td>
      <td>{guitar.is_custom ? 'Si' : 'No'}</td>

      <td>
        <Icon
          color="#FFC10C"
          onClick={() => handleUpdate(guitar.id)}
          icon="lucide:edit"
          width="20"
          height="20"
          style={{ cursor: 'pointer', marginRight: '10px' }}
        />
        <Icon
          color="#ED3F3F"
          onClick={() => handleDelete(guitar.id)}
          icon="material-symbols:delete-outline-rounded"
          width="22"
          height="22"
          style={{ cursor: 'pointer' }}
        />
      </td>
    </tr>
  );
}