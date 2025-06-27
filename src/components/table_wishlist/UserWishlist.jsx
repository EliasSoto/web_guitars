import { useEffect, useState } from "react";
import { getMyWishlist, deleteFromWishlist } from "../../services/wishlistService";
import { getAdminGuitarById } from "../../services/guitarAdminService";
import "../../styles/UserWishlist.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function UserWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistWithDetails = async () => {
      setLoading(true);

      const [data, error] = await getMyWishlist(1, 10);
      if (error || !data?.wishlist) {
        console.error("Error al obtener wishlist:", error);
        setWishlist([]);
        setLoading(false);
        return;
      }

      try {
        const guitarsWithDetails = await Promise.all(
          data.wishlist.map(async (item) => {
            const [guitarData, guitarError] = await getAdminGuitarById(item.guitar_id);
            return {
              ...item,
              guitar: !guitarError && guitarData ? guitarData : null,
            };
          })
        );

        setWishlist(guitarsWithDetails.filter((item) => item.guitar));
      } catch (e) {
        console.error("Error obteniendo detalles de guitarras:", e);
        setWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistWithDetails();
  }, []);

  const handleRemove = async (wishlistItemId, guitarId) => {
    const [_, error] = await deleteFromWishlist(guitarId);
    if (error) {
      console.error("Error al eliminar de wishlist:", error);
      return;
    }

    setWishlist((prev) => prev.filter((item) => item.id !== wishlistItemId));
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Mis Favoritos</h2>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando favoritos...</p>
        </div>
      ) : wishlist.length === 0 ? (
        <p>No tienes guitarras en tu wishlist.</p>
      ) : (
        <div className="wishlist-list">
          {wishlist.map(({ id, guitar }) => (
            <div key={id} className="wishlist-item">
              <img
                src={guitar.image_link}
                alt={`${guitar.brand} ${guitar.model}`}
                className="wishlist-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://res.cloudinary.com/de5qrezpl/image/upload/v1750967058/guiafnh33wb3dx0twv0g.png";
                }}
              />
              <div className="wishlist-details">
                <div className="wishlist-header">
                  <p>
                    <strong>{guitar.model}</strong> - {guitar.brand}
                  </p>
                </div>
                <p className="wishlist-description">{guitar.description}</p>
                <p className="wishlist-price">Precio: ${guitar.sale_price}</p>
                <div className="wishlist-actions">
                  <Link to={`/guitars/${guitar.id}`} className="view-wish-button">
                    Ver detalles
                  </Link>
                  <button
                    className="remove-wish-button"
                    onClick={() => handleRemove(id, guitar.id)}
                  >
                    Quitar de favoritos
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
