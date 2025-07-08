import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/GuitarCard.css";
import { useCart } from "../contexts/CartContext";
import { addToWishlist, deleteFromWishlist, isInWishlist } from "../services/wishlistService";
import { isAuthenticated, getCurrentUser } from "../services/userAuthService";
import { Icon } from "@iconify/react";
import { formatPrice } from "../utils/common.js";

const GuitarCard = ({ id, model, brand, sale_price, liquidation_price, image_link, stock }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [inWishlist, setInWishlist] = useState(false);
  const [loadingWishlist, setLoadingWishlist] = useState(true);
  const [user, setUser] = useState(null);


  const imageCache = new Map();
  const [imgSrc, setImgSrc] = useState(image_link || "https://res.cloudinary.com/de5qrezpl/image/upload/v1750967058/guiafnh33wb3dx0twv0g.png");

  useEffect(() => {
    const defaultImg = "https://res.cloudinary.com/de5qrezpl/image/upload/v1750967058/guiafnh33wb3dx0twv0g.png";

    const loadImage = async (url) => {
      if (!url) {
        setImgSrc(defaultImg);
        return;
      }

      if (imageCache.has(url)) {
        setImgSrc(imageCache.get(url));
      } else {
        const img = new Image();
        img.onload = () => {
          imageCache.set(url, url);
          setImgSrc(url);
        };
        img.onerror = () => {
          imageCache.set(url, defaultImg);
          setImgSrc(defaultImg);
        };
        img.src = url;
      }
    };

    loadImage(image_link);
  }, [image_link]);

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
    navigate(`/guitars/${id}`);
  };

  const isLiquidation = liquidation_price && liquidation_price < sale_price;

  return (
    <div className="guitar-card" onClick={handleCardClick}>
      <div className="guitar-card-header">
        <div>
          <h2 className="guitar-card-model">{model}</h2>
          <p className="guitar-card-brand">{brand}</p>
        </div>
        {user && (
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
        )}
      </div>

      <div className="guitar-card-image-container">
        <img
          src={imgSrc}
          alt={`Guitarra ${model}`}
          className="guitar-card-image"
        />
      </div>

      <div className="guitar-card-footer">
        <div className="guitar-card-prices">
          {isLiquidation ? (
            <>
              <p className="guitar-card-sale-price">{formatPrice(sale_price)}</p>
              <p className="guitar-card-liquidation-price">{formatPrice(liquidation_price)}</p>
            </>
          ) : (
            <p className="guitar-card-final-price">{formatPrice(sale_price)}</p>
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