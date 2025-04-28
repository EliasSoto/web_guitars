


export default function UserRow({ user, setSelectedUser, setShowDetail, setShowForm, handleDelete }) {
    return (
      <tr key={user.id}>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
        <td>{user.rut}</td>
        <td>
          <button onClick={() => { setSelectedUser(user); setShowDetail(true); }}>
            R
          </button>
          <button onClick={() => { setSelectedUser(user); setShowForm(true); }}>
            U
          </button>
          <button onClick={() => handleDelete(user.id)}>
            D
          </button>
        </td>
      </tr>
    );
  }
  