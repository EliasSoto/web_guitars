import React, { useState } from "react";
import "../styles/GuitarCard.css"; // Reutilizamos estilos del card
import { deleteFromWishlist } from "../services/wishlistService";

export default function WishlistItem({ guitar, onRemoved }) {
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    const [_, error] = await deleteFromWishlist(guitar.id);
    if (!error) {
      onRemoved(guitar.id); // informa al padre para quitarlo del estado
    } else {
      console.error("Error al quitar de favoritos:", error);
    }
    setRemoving(false);
  };

  return (
    <div className="guitar-card wishlist-item">
      <div className="guitar-card-header">
        <div>
          <h2 className="guitar-card-model">{guitar.model}</h2>
          <p className="guitar-card-brand">{guitar.brand}</p>
        </div>
        <button
          className="wishlist-button active"
          onClick={handleRemove}
          disabled={removing}
          title="Quitar de favoritos"
        >
          💖
        </button>
      </div>

      <div className="guitar-card-image-container">
        <img
          src={
            guitar.image_link ||
            "https://www.ibanez.com/common/product_artist_file/file/p_region_RG550DX_1P_01_DYB.png"
          }
          alt={`Guitarra ${guitar.model}`}
          className="guitar-card-image"
          onError={(e) => {
            e.target.src =
              "https://www.ibanez.com/common/product_artist_file/file/p_region_RG550DX_1P_01_DYB.png";
          }}
        />
      </div>

      <div className="guitar-card-footer">
        <div className="guitar-card-prices">
          {guitar.liquidation_price &&
          guitar.liquidation_price < guitar.sale_price ? (
            <>
              <p className="guitar-card-sale-price">${guitar.sale_price}</p>
              <p className="guitar-card-liquidation-price">
                ${guitar.liquidation_price}
              </p>
            </>
          ) : (
            <p className="guitar-card-final-price">${guitar.sale_price}</p>
          )}
        </div>
      </div>
    </div>
  );
}
