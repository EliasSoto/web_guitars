import React, { useState, useEffect } from 'react';
import '../styles/GuitarDetail.css';
import { getReviewsByGuitar, getAverageRatingByGuitar, createReview } from '../services/reviewService';
import StarRating from './StarRating';

const GuitarDetail = ({ guitar, onClose }) => {
  const { 
    model, 
    brand, 
    sale_price, 
    liquidation_price, 
    image_link, 
    stock,
    id: guitarId 
  } = guitar;

  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: '',
    guitar_id: guitarId
  });
  const [loading, setLoading] = useState({
    reviews: true,
    submit: false
  });
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({
    rating: false,
    comment: false
  });

  const isLiquidation = liquidation_price && liquidation_price < sale_price;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(prev => ({...prev, reviews: true}));
        const [reviewsData, reviewsError] = await getReviewsByGuitar(guitarId);
        const [averageData, averageError] = await getAverageRatingByGuitar(guitarId);
        
        if (reviewsError || averageError) {
          throw new Error(reviewsError || averageError || 'Error al cargar reseñas');
        }
        
        setReviews(reviewsData || []);
        setAverageRating(averageData?.average || 0);
        setError(null);
      } catch (err) {
        setError({
          title: 'Error al cargar reseñas',
          message: err.message || 'No se pudieron cargar las reseñas. Intenta nuevamente.'
        });
      } finally {
        setLoading(prev => ({...prev, reviews: false}));
      }
    };

    fetchReviews();
  }, [guitarId]);

  const validateForm = () => {
    const errors = {
      rating: newReview.rating === 0,
      comment: newReview.comment.trim() === ''
    };
    setFormErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(prev => ({...prev, submit: true}));
      const [data, error] = await createReview(newReview);
      
      if (error) {
        throw new Error(error);
      }
      
      // Actualizar lista de reseñas
      const [reviewsData, reviewsError] = await getReviewsByGuitar(guitarId);
      const [averageData, averageError] = await getAverageRatingByGuitar(guitarId);
      
      if (reviewsError || averageError) {
        throw new Error(reviewsError || averageError || 'Error al actualizar reseñas');
      }
      
      setReviews(reviewsData || []);
      setAverageRating(averageData?.average || 0);
      setNewReview({
        rating: 0,
        comment: '',
        guitar_id: guitarId
      });
      setError(null);
      setFormErrors({ rating: false, comment: false });
    } catch (err) {
      setError({
        title: 'Error al enviar reseña',
        message: err.message || 'No se pudo enviar tu reseña. Intenta nuevamente.'
      });
    } finally {
      setLoading(prev => ({...prev, submit: false}));
    }
  };

  const handleRatingChange = (rating) => {
    setNewReview({...newReview, rating});
    if (formErrors.rating) {
      setFormErrors({...formErrors, rating: false});
    }
  };

  const handleCommentChange = (e) => {
    setNewReview({...newReview, comment: e.target.value});
    if (formErrors.comment) {
      setFormErrors({...formErrors, comment: false});
    }
  };

  return (
    <div className="guitar-detail-container">
      
      <h2 className="guitar-model">{model}</h2>
      <p className="guitar-brand">Marca: {brand}</p>
      
      <div className="rating-summary">
        <div className="average-rating">
          <StarRating 
            rating={Math.round(averageRating * 10) / 10} // Redondea a 1 decimal
            editable={false} 
          />
          <span className="average-value">
            {averageRating.toFixed(1)}/5 ({reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'})
          </span>
        </div>
      </div>
      
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
        <p>Tipo: Eléctrica</p>
        <p>Color: Negro</p>
        <p>Número de cuerdas: 6</p>
      </div>
      
      <div className="reviews-section">
        <h3>Reseñas</h3>
        
        {loading.reviews && !reviews.length ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <div className="error-message-container">
            <h4 className="error-title">{error.title}</h4>
            <p className="error-message">{error.message}</p>
            <button 
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Reintentar
            </button>
          </div>
        ) : reviews.length === 0 ? (
          <p className="no-reviews">No hay reseñas aún. ¡Sé el primero en opinar!</p>
        ) : (
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-item">
                <div className="review-header">
                  <div className="review-user">
                    <div className="user-avatar">
                      {review.user_name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <div className="user-info">
                      <span className="review-author">
                        {review.user_name || 'Usuario anónimo'}
                      </span>
                      <StarRating 
                        rating={review.rating} 
                        editable={false} 
                        size="small"
                      />
                    </div>
                  </div>
                  <span className="review-date">
                    {new Date(review.created_at).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
        
        <form onSubmit={handleSubmitReview} className="review-form">
          <h4>Deja tu reseña</h4>
          
          <div className="form-group">
            <label>Calificación <span className="required">*</span></label>
            <StarRating 
              rating={newReview.rating} 
              editable={true} 
              onRatingChange={handleRatingChange}
            />
            {formErrors.rating && (
              <p className="error-message">Por favor selecciona una calificación</p>
            )}
          </div>
          
          <div className="form-group">
            <label htmlFor="comment">Comentario <span className="required">*</span></label>
            <textarea
              id="comment"
              value={newReview.comment}
              onChange={handleCommentChange}
              rows="4"
              className={formErrors.comment ? 'error-field' : ''}
              placeholder="Escribe tu experiencia con esta guitarra..."
            />
            {formErrors.comment && (
              <p className="error-message">Por favor escribe un comentario</p>
            )}
          </div>
          
          {error && (
            <div className="error-message-container">
              <p className="error-message">{error.message}</p>
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={loading.submit} 
            className="submit-review-btn"
          >
            {loading.submit ? (
              <>
                <span className="spinner"></span>
                Enviando...
              </>
            ) : 'Publicar reseña'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuitarDetail;