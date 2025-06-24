import { useEffect, useState } from "react";
import { getMyWishlist, deleteFromWishlist } from "../../services/wishlistService";
import { getAdminGuitarById } from "../../services/guitarAdminService";
import "../../styles/UserWishlist.css";

export default function UserWishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistWithDetails = async () => {
      setLoading(true);
      const [data, error] = await getMyWishlist(1, 10);
      if (!error && data?.wishlist) {
        try {
          // Traemos los detalles de cada guitarra
          const guitarsWithDetails = await Promise.all(
            data.wishlist.map(async (item) => {
              const [guitarData, guitarError] = await getAdminGuitarById(item.guitar_id);
              if (!guitarError && guitarData) {
                return { ...item, guitar: guitarData };
              }
              // En caso de error devolvemos el item sin guitarra para manejarlo
              return { ...item, guitar: null };
            })
          );
          setWishlist(guitarsWithDetails.filter((item) => item.guitar)); // Filtrar los que tienen datos
        } catch (e) {
          console.error("Error obteniendo detalles de guitarras:", e);
          setWishlist([]);
        }
      } else {
        console.error("Error al obtener wishlist:", error);
        setWishlist([]);
      }
      setLoading(false);
    };

    fetchWishlistWithDetails();
  }, []);

  const handleRemove = async (wishlistItemId, guitarId) => {
    const [_, error] = await deleteFromWishlist(guitarId);
    if (!error) {
      setWishlist((prev) => prev.filter((item) => item.id !== wishlistItemId));
    } else {
      console.error("Error al eliminar de wishlist:", error);
    }
  };

  if (loading) return <p>Cargando favoritos...</p>;

  if (wishlist.length === 0) return <p>No tienes guitarras en tu wishlist.</p>;

  return (
    <div className="wishlist-section">
      <h2>Mis Favoritos</h2>
      <div className="wishlist-list">
        {wishlist.map(({ id, guitar }) => (
          <div key={id} className="wishlist-item">
            <img
              src={guitar.image_link}
              alt={guitar.model}
              className="wishlist-image"
            />
            <div>
              <p><strong>{guitar.model}</strong> - {guitar.brand}</p>
              <p>Precio: ${guitar.sale_price}</p>
              <button onClick={() => handleRemove(id, guitar.id)}>Quitar de favoritos</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
