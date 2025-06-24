// En UserReviewsList.jsx - Adaptar para los datos recibidos
import { useState, useEffect } from "react";
import { getMyReviews, deleteMyReview, updateMyReview } from "../../services/reviewService";
import StarRating from "../StarRating";
import { getGuitarById } from "../../services/guitarService";

export default function UserReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [reviewsData, reviewsError] = await getMyReviews();
        
        if (reviewsError) throw new Error(reviewsError);
        if (!reviewsData) throw new Error("No se recibieron datos");
        
        // Obtener información adicional de cada guitarra
        const enrichedReviews = await Promise.all(
          reviewsData.map(async review => {
            try {
              const [guitarData] = await getGuitarById(review.guitar_id);
              return {
                ...review,
                guitar_model: guitarData?.model || "Guitarra desconocida",
                guitar_image: guitarData?.image_link
              };
            } catch {
              return {
                ...review,
                guitar_model: "Guitarra desconocida",
                guitar_image: null
              };
            }
          })
        );
        
        setReviews(enrichedReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Cargando reseñas...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (reviews.length === 0) return <div>No tienes reseñas todavía</div>;

  return (
    <div className="user-reviews-container">
      <h2>Mis Reseñas</h2>
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-card">
            <div className="review-header">
              <h3>{review.guitar_model}</h3>
              {review.guitar_image && (
                <img 
                  src={review.guitar_image} 
                  alt={review.guitar_model}
                  className="guitar-thumbnail"
                />
              )}
              <StarRating rating={review.rating} editable={false} />
            </div>
            <p className="review-comment">{review.comment}</p>
            <p className="review-date">
              {new Date(review.created_at).toLocaleDateString("es-ES", {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}