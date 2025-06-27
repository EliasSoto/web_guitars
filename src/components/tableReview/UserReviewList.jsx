import { useEffect, useState } from "react";
import { getMyReviews, deleteMyReview } from "../../services/reviewService";
import { getAdminGuitarById } from "../../services/guitarAdminService";
import "../../styles/UserReviews.css";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import StarRating from "../StarRating";

export default function UserReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviewsWithDetails = async () => {
      setLoading(true);

      const [data, error] = await getMyReviews();
      if (error || !data) {
        console.error("Error al obtener reseñas:", error);
        setReviews([]);
        setLoading(false);
        return;
      }

      try {
        const reviewsWithDetails = await Promise.all(
          data.map(async (review) => {
            const [guitarData, guitarError] = await getAdminGuitarById(review.guitar_id);
            return {
              ...review,
              guitar: !guitarError && guitarData ? guitarData : null,
            };
          })
        );

        setReviews(reviewsWithDetails.filter((item) => item.guitar));
      } catch (e) {
        console.error("Error obteniendo detalles de guitarras:", e);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewsWithDetails();
  }, []);

  const handleDelete = async (reviewId) => {
    const [_, error] = await deleteMyReview(reviewId);
    if (error) {
      console.error("Error al eliminar reseña:", error);
      return;
    }

    setReviews((prev) => prev.filter((item) => item.id !== reviewId));
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Mis Reseñas</h2>
      </div>

      {loading ? (
        <div className="loading-container">
          <Icon icon="line-md:loading-loop" width="40" height="40" className="loading-icon" />
          <p>Cargando reseñas...</p>
        </div>
      ) : reviews.length === 0 ? (
        <p>No tienes reseñas todavía.</p>
      ) : (
        <div className="user-review-list">
        {reviews.map(({ id, rating, comment, created_at, guitar }) => (
          <div key={id} className="user-review-card">
            <img
              src={guitar.image_link}
              alt={`${guitar.brand} ${guitar.model}`}
              className="user-review-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://res.cloudinary.com/de5qrezpl/image/upload/v1750967058/guiafnh33wb3dx0twv0g.png";
              }}
            />
            <div className="user-review-content">
              <div className="user-review-header">
                <p className="user-review-title">
                  <strong>{guitar.model}</strong> - {guitar.brand}
                </p>
                <StarRating rating={rating} editable={false} />
              </div>
              <p className="user-review-comment">{comment}</p>
              <p className="user-review-date">
                {new Date(created_at).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <div className="user-review-actions">
                <Link to={`/guitars/${guitar.id}`} className="user-review-view-btn">
                  Ver guitarra
                </Link>
                <button
                  className="user-review-delete-btn"
                  onClick={() => handleDelete(id)}
                >
                  Eliminar reseña
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}