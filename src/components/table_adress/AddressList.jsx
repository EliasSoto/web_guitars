import { useEffect, useState } from 'react';
import { getAddressById } from '../../services/addressAdminService';

import AddressTableHead from './AddressTableHead';
import AddressRow from './AddressRow';

const AddressList = ({ userId, userName }) => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const fetchAddresses = async () => {
      setLoading(true);
      const [data, err] = await getAddressById(userId);
      if (err) {
        setError(err);
        
      } else {
        setAddresses(data);
      }
      setLoading(false);
    };

    fetchAddresses();
  }, [userId]);

  return (
    <div>
      <h2>Direcciones de {userName}</h2>
      <br />
      <table>
        <AddressTableHead />
        <tbody>
          {addresses.map((address) => (
            <AddressRow key={address.id} address={address} />
          ))}
        </tbody>
      </table>
      </div>
  );
};

export default AddressList;
