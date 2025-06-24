import React, { useState, useEffect } from "react";
import "../styles/GuitarCard.css";
import { useCart } from "../contexts/CartContext";
import Modal from "./Modal";
import GuitarDetail from "./GuitarDetail";
import { addToWishlist, deleteFromWishlist, isInWishlist } from "../services/wishlistService";

const GuitarCard = ({ id, model, brand, sale_price, liquidation_price, image_link, stock }) => {
  const { addToCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [inWishlist, setInWishlist] = useState(false);


  useEffect(() => {
  const checkWishlist = async () => {
    try {
      const token = localStorage.getItem("access_token");
      if (!token) return;

      const [data, error] = await isInWishlist(id);
      if (!error && data?.is_in_wishlist) {
        setInWishlist(true);
      } else {
        setInWishlist(false);
      }
    } catch (error) {
      console.error("Error al verificar wishlist:", error);
    }
  };

  checkWishlist();
}, [id]);





  const handleWishlistToggle = async (e) => {
    e.stopPropagation(); // evita abrir el modal al hacer clic en el botón
    try {
      if (inWishlist) {
        await deleteFromWishlist(id);
        setInWishlist(false);
      } else {
        await addToWishlist(id);
        setInWishlist(true);
      }
    } catch (error) {
      console.error("Error al actualizar wishlist:", error);
    }
  };


  const handleAddToCart = (e) => {
    e.stopPropagation(); 
    addToCart({
      id,
      model,
      brand,
      sale_price,
      liquidation_price,
      image_link, 
      stock
    });
  };

  const isLiquidation = liquidation_price && liquidation_price < sale_price;

  return (
    <>
      <div className="guitar-card" onClick={() => setIsModalOpen(true)}>
        <div className="guitar-card-header">
          <div>
            <h2 className="guitar-card-model">{model}</h2>
            <p className="guitar-card-brand">{brand}</p>
          </div>

        <div className={`wishlist-button ${inWishlist ? "active" : ""}`}
          onClick={handleWishlistToggle}
          title={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {inWishlist ? "❤️" : "🤍"}
        </div>

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
          <button 
            className="guitar-card-add-to-cart" 
            onClick={handleAddToCart}
          >
            Agregar al carro
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <GuitarDetail 
          guitar={{ id, model, brand, sale_price, liquidation_price, image_link, stock }}
          onAddToCart={handleAddToCart}
          onClose={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default GuitarCard;