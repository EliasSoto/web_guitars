import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GuitarCard.css";
import { useCart } from "../contexts/CartContext";
import { addToWishlist, deleteFromWishlist, isInWishlist } from "../services/wishlistService";
import { isAuthenticated, getCurrentUser } from "../services/userAuthService";
import { Icon } from "@iconify/react";

const GuitarCard = ({ id, model, brand, sale_price, liquidation_price, image_link, stock }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [inWishlist, setInWishlist] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authCheck = isAuthenticated();
    if (authCheck) {
      setUser(getCurrentUser());
    }
  }, []);

  useEffect(() => {
    const checkWishlist = async () => {
      setLoadingWishlist(true);
      
      // Solo se verifica el wishlist si el usuario está autenticado
      if (!user) {
        setInWishlist(false);
        setLoadingWishlist(false);
        return;
      }

      try {
        const [response, error] = await isInWishlist(id);
        if (!error && response?.is_in_wishlist !== undefined) {
          setInWishlist(response.is_in_wishlist);
        } else {
          console.error("Error en la respuesta del wishlist:", error);
          setInWishlist(false);
        }
      } catch (error) {
        console.error("Error al verificar wishlist:", error);
        setInWishlist(false);
      } finally {
        setLoadingWishlist(false);
      }
    };
    
    checkWishlist();
  }, [id, user]);

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
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

  const handleCardClick = () => {
    navigate(`/guitars/${id}`); // Navega a la página de detalles
  };

  const isLiquidation = liquidation_price && liquidation_price < sale_price;

  return (
    <div className="guitar-card" onClick={handleCardClick}>
      <div className="guitar-card-header">
        <div>
          <h2 className="guitar-card-model">{model}</h2>
          <p className="guitar-card-brand">{brand}</p>
        </div>
         <button 
          className={`guitar-card-wishlist ${inWishlist ? "active" : ""}`}
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
          title={inWishlist ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
            <Icon 
            icon={inWishlist ? "mdi:heart" : "mdi:heart"} 
            width="20" 
            height="20" 
          />
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
        <button 
          className="guitar-card-add-to-cart" 
          onClick={handleAddToCart}
        >
          Agregar al carro
        </button>
      </div>
    </div>
  );
};

export default GuitarCard;