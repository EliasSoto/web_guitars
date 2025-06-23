import { useEffect, useState } from "react";
import { getMyWishlist, deleteFromWishlist } from "../../services/wishlistService";
import "../../styles/UserWishlist.css";

export default function UserWishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      const [data, error] = await getMyWishlist(id);
      if (!error && data) setWishlist(data);
      else console.error("Error al obtener wishlist:", error);
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    const [_, error] = await deleteFromWishlist(id);
    if (!error) {
      setWishlist((prev) => prev.filter((item) => item.id !== id));
    } else {
      console.error("Error al eliminar de wishlist:", error);
    }
  };

  return (
    <div className="wishlist-section">
      <h2>Mis Favoritos</h2>
      {wishlist.length === 0 ? (
        <p>No tienes guitarras en tu wishlist.</p>
      ) : (
        <div className="wishlist-list">
          {wishlist.map((guitar) => (
            <div key={guitar.id} className="wishlist-item">
              <img
                src={guitar.image_link}
                alt={guitar.model}
                className="wishlist-image"
              />
              <div>
                <p><strong>{guitar.model}</strong> - {guitar.brand}</p>
                <p>Precio: ${guitar.sale_price}</p>
                <button onClick={() => handleRemove(guitar.id)}>
                  Quitar de favoritos
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
