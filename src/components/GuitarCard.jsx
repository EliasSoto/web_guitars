import React from "react";
import "../styles/GuitarCard.css";
import { useCart } from "../contexts/CartContext";

const GuitarCard = ({ id, model, brand, sale_price, liquidation_price, image_link }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id,
      model,
      brand,
      sale_price,
      liquidation_price,
      image_link
    });
  };

  // Determinar si está en liquidación
  const isLiquidation = liquidation_price && liquidation_price < sale_price;

  return (
    <div className="guitar-card">
      <div className="guitar-card-header">
        <div>
          <h2 className="guitar-card-model">{model}</h2>
          <p className="guitar-card-brand">{brand}</p>
        </div>
        <button className="guitar-card-wishlist" aria-label="Añadir a favoritos">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      <div className="guitar-card-image-container">
        <img
          src={image_link || "https://www.ibanez.com/common/product_artist_file/file/p_region_RG550DX_1P_01_DYB.png"}
          alt={`Guitarra ${model}`}
          className="guitar-card-image"
          onError={(e) => {
            e.target.src = "https://www.ibanez.com/common/product_artist_file/file/p_region_RG550DX_1P_01_DYB.png";
          }}
        />
        
      </div>

      <div className="guitar-card-footer">
          <div className="guitar-card-prices">
            {isLiquidation ? (
              <>
                <p className="guitar-card-sale-price">${sale_price}</p>
                <p className="guitar-card-liquidation-price">${liquidation_price}</p>
              </>
            ) : (
              <p className="guitar-card-final-price">${sale_price}</p>
            )}
          </div>
        <button className="guitar-card-add-to-cart" onClick={handleAddToCart}>Agregar al carro</button>
      </div>
    </div>
  );
};

export default GuitarCard;