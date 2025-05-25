import React from "react";
import "../styles/GuitarCard.css";

const GuitarCard = ({
  model = "Modelo",
  brand = "Marca",
  sale_price = null,
  liquidation_price = null,
  image_link = "",
}) => {
  // Función para formatear precios
  const formatPrice = (price) => {
    if (!price) return "";
    return new Intl.NumberFormat('es-CL').format(price);
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
          src={image_link || "https://via.placeholder.com/300x200?text=Guitarra"}
          alt={`Guitarra ${model}`}
          className="guitar-card-image"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200?text=Guitarra";
          }}
        />
        {isLiquidation && (
          <div className="liquidation-badge">LIQUIDACIÓN</div>
        )}
      </div>

      <div className="guitar-card-footer">
        <div className="guitar-card-prices">
          {isLiquidation ? (
            <>
              <p className="guitar-card-original-price">${formatPrice(sale_price)}</p>
              <p className="guitar-card-liquidation-price">${formatPrice(liquidation_price)}</p>
            </>
          ) : (
            <p className="guitar-card-final-price">${formatPrice(sale_price)}</p>
          )}
        </div>
        <button className="guitar-card-add-to-cart">Agregar al carro</button>
      </div>
    </div>
  );
};

export default GuitarCard;