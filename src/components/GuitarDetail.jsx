import React from 'react';
import '../styles/GuitarDetail.css'; // Crearemos este archivo de estilos

const GuitarDetail = ({ guitar, onClose }) => {
  const { 
    model, 
    brand, 
    sale_price, 
    liquidation_price, 
    image_link, 
    stock 
  } = guitar;

  const isLiquidation = liquidation_price && liquidation_price < sale_price;

  return (
    <div className="guitar-detail-container">
      <button className="close-button" onClick={onClose}>×</button>
      
      <h2 className="guitar-model">{model}</h2>
      <p className="guitar-brand">Marca: {brand}</p>
      
      <img 
        src={image_link || "https://www.ibanez.com/common/product_artist_file/file/p_region_RG550DX_1P_01_DYB.png"} 
        alt={`Guitarra ${model}`}
        className="guitar-image"
      />
      
      <div className="price-section">
        {isLiquidation ? (
          <>
            <p className="original-price">Precio original: ${sale_price}</p>
            <p className="discount-price">¡Oferta!: ${liquidation_price}</p>
          </>
        ) : (
          <p className="current-price">Precio: ${sale_price}</p>
        )}
      </div>
      
      <p className="stock-info">Stock disponible: {stock}</p>
      
      <div className="specifications">
        {/* Aquí puedes añadir más especificaciones técnicas si las tienes */}
        <p>Tipo: Eléctrica</p>
        <p>Color: Negro</p>
        <p>Número de cuerdas: 6</p>
      </div>
    </div>
  );
};

export default GuitarDetail;