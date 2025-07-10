import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getGuitarById } from "../services/guitarService";
import { getReviewsByGuitar, createReview, updateMyReview, deleteMyReview, getMyReviewById, getMyReviewByGuitarId } from "../services/reviewService";
import StarRating from "../components/StarRating";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/GuitarDetailPage.css";
import { useCart } from "../contexts/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const GuitarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [guitar, setGuitar] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [editingReview, setEditingReview] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [loading, setLoading] = useState({
    guitar: true,
    reviews: true,
  });
  const [error, setError] = useState({
    guitar: null,
    reviews: null,
  });
  const [canReview, setCanReview] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    rating: 0,
    comment: "",
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [formErrors, setFormErrors] = useState({
    rating: false,
    comment: false,
  });
  const [userId, setUserId] = useState(null);

  // Obtener userId al cargar el componente
  useEffect(() => {
    setUserId(localStorage.getItem("user_id"));
  }, []);

  const [myReview, setMyReview] = useState(null);

  // Obtener mi reseña para esta guitarra al cargar (y cuando cambia id o userId)
  useEffect(() => {
    const fetchMyReview = async () => {
      if (!id) return;
      try {
        const [reviewData, error] = await getMyReviewByGuitarId(id);
        if (!error && reviewData) {
          setMyReview(reviewData);
        } else {
          setMyReview(null);
        }
      } catch (err) {
        console.error("Error fetching my review:", err);
        setMyReview(null);
      }
    };
    fetchMyReview();
  }, [id]);

  // Obtener datos de la guitarra
  useEffect(() => {
    const fetchGuitar = async () => {
      try {
        const [guitarData, guitarError] = await getGuitarById(id);
        if (guitarError) throw new Error(guitarError);
        setGuitar(guitarData);
        setError((prev) => ({ ...prev, guitar: null }));
      } catch (err) {
        setError((prev) => ({
          ...prev,
          guitar: err.message || "Error al cargar la guitarra",
        }));
        console.error("Error fetching guitar:", err);
        toast.error("Error al cargar los detalles de la guitarra");
      } finally {
        setLoading((prev) => ({ ...prev, guitar: false }));
      }
    };

    fetchGuitar();
  }, [id]);

  // Obtener reseñas
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const [reviewsData, reviewsError] = await getReviewsByGuitar(id);
        if (reviewsError) throw new Error(reviewsError);

        const avg =
          reviewsData && reviewsData.length > 0
            ? reviewsData.reduce((sum, review) => sum + review.rating, 0) /
              reviewsData.length
            : 0;

        setReviews(reviewsData || []);
        setAverageRating(avg);
        setError((prev) => ({ ...prev, reviews: null }));
      } catch (err) {
        setError((prev) => ({
          ...prev,
          reviews: err.message || "Error al cargar las reseñas",
        }));
        console.error("Error fetching reviews:", err);
        toast.error("Error al cargar las reseñas");
      } finally {
        setLoading((prev) => ({ ...prev, reviews: false }));
      }
    };

    if (id) {
      fetchReviews();
    }
  }, [id]);

  // Verificar si el usuario puede reseñar
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      setCanReview(true);
    }
  }, [id]);

  // Función para editar reseñas
  const handleEditReview = () => {
    if (!myReview) {
      toast.error("No tienes reseña para editar");
      return;
    }
    setEditingReview(myReview);
    setReviewForm({
      rating: myReview.rating,
      comment: myReview.comment,
    });
    setShowReviewForm(true);
  };

  // Función para actualizar reseñas
  const handleUpdateReview = async (e) => {
    e.preventDefault();

    if (!editingReview) {
      toast.error("No se ha seleccionado ninguna reseña para editar");
      return;
    }

    try {
      const [data, error] = await updateMyReview(editingReview.id, {
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });

      if (error) throw new Error(error);

      // Actualiza mi review y también el listado general
      setMyReview(data);
      setReviews((prev) =>
        prev.map((review) =>
          review.id === editingReview.id ? { ...review, ...reviewForm } : review
        )
      );

      // Recalcular promedio
      const newAvg =
        reviews.reduce((sum, review) => {
          return (
            sum +
            (review.id === editingReview.id ? reviewForm.rating : review.rating)
          );
        }, 0) / reviews.length;

      setAverageRating(newAvg);
      setEditingReview(null);
      setReviewForm({ rating: 0, comment: "" });
      setShowReviewForm(false);

      toast.success("¡Reseña actualizada con éxito!");
    } catch (err) {
      toast.error(err.message || "Error al actualizar la reseña");
    }
  };


  // Función para eliminar la reseña
  const handleDeleteReview = async () => {
    if (!myReview) {
      toast.error("No tienes reseña para eliminar");
      return;
    }
    if (!window.confirm("¿Estás seguro de que quieres eliminar tu reseña?")) return;

    try {
      setIsDeleting(true);
      const [success, error] = await deleteMyReview(myReview.id);
      if (error) throw new Error(error);

      // Quitar mi review de la lista y del estado
      setReviews((prev) => prev.filter((r) => r.id !== myReview.id));
      setMyReview(null);

      // Recalcular promedio
      const updatedReviews = reviews.filter((r) => r.id !== myReview.id);
      const newAvg =
        updatedReviews.length > 0
          ? updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length
          : 0;
      setAverageRating(newAvg);

      setShowReviewForm(false);
      setEditingReview(null);

      toast.success("Reseña eliminada correctamente");
    } catch (err) {
      toast.error(err.message || "Error al eliminar la reseña");
    } finally {
      setIsDeleting(false);
    }
  };


  const handleAddToCart = () => {
    if (!guitar) return;

    try {
      addToCart({
        id: guitar.id,
        model: guitar.model,
        brand: guitar.brand,
        sale_price: guitar.sale_price,
        liquidation_price: guitar.liquidation_price,
        image_link: guitar.image_link,
        stock: guitar.stock,
      });

      // Redirigir al carrito después de agregar
      setTimeout(() => {
        navigate("/checkout");
      }, 1000);
      
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      toast.error("Error al agregar al carrito. Por favor intenta nuevamente.");
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    // Validación básica
    if (reviewForm.rating === 0 || reviewForm.comment.trim() === "") {
      setFormErrors({
        rating: reviewForm.rating === 0,
        comment: reviewForm.comment.trim() === "",
      });
      return;
    }

    try {
      const [data, error] = await createReview({
        guitar_id: id,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });

      if (error) {
        toast.error(
          error.includes("comprado")
            ? "Debes haber comprado esta guitarra para reseñarla"
            : error
        );
        return;
      }

      // Actualizar reseñas
      const [reviewsData] = await getReviewsByGuitar(id);
      setReviews(reviewsData || []);

      // Actualizar promedio
      const avg =
        reviewsData?.length > 0
          ? reviewsData.reduce((sum, r) => sum + r.rating, 0) /
            reviewsData.length
          : 0;

      setAverageRating(avg);
      setReviewForm({ rating: 0, comment: "" });
      setShowReviewForm(false);

      toast.success("¡Reseña publicada con éxito!");
    } catch (err) {
      toast.error(err.message || "Error al enviar reseña");
    }
  };

  // Estados de carga
  if (loading.guitar) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando detalles de la guitarra...</p>
      </div>
    );
  }

  if (error.guitar) {
    return (
      <div className="error-screen">
        <h3>Error al cargar la guitarra</h3>
        <p>{error.guitar}</p>
        <button onClick={() => navigate(-1)}>Volver atrás</button>
      </div>
    );
  }

  if (!guitar) {
    return <div>Guitarra no encontrada</div>;
  }

  const isLiquidation =
    guitar.liquidation_price && guitar.liquidation_price < guitar.sale_price;
  const liquidationDiscount = isLiquidation
    ? Math.round(
        ((guitar.sale_price - guitar.liquidation_price) / guitar.sale_price) *
          100
      )
    : 0;

  return (
    <div className="guitar-detail-page">
      <Header />
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />

      <main className="detail-container">
            <button className="back-button" onClick={() => navigate(-1)}>
          &larr; Volver
        </button>
      
        <div className="guitar-detail-content">
       
          {/* Columna de imagen */}
          <div className="guitar-image-column">
            <img
              src={
                guitar.image_link ||
                "https://www.ibanez.com/common/product_artist_file/file/p_region_RG550DX_1P_01_DYB.png"
              }
              alt={`Guitarra ${guitar.model}`}
              className="guitar-image"
              onError={(e) => {
                e.target.src =
                  "https://www.ibanez.com/common/product_artist_file/file/p_region_RG550DX_1P_01_DYB.png";
              }}
            />

            {isLiquidation && (
              <div className="discount-badge">-{liquidationDiscount}%</div>
            )}
          </div>

          {/* Columna de información */}
          <div className="guitar-info-column">
            <h1 className="guitar-model">{guitar.model}</h1>
            <p className="guitar-brand">{guitar.brand}</p>

            <div className="rating-summary">
              <StarRating rating={averageRating} editable={false} />
              <span>
                ({reviews.length} {reviews.length === 1 ? "reseña" : "reseñas"})
              </span>
            </div>

            <div className="guitar-description">
              <h2>Descripción</h2>
              <p className="guitar-description">{guitar.description}</p>
            </div>

            <h2>Especificaciones</h2>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Tipo de madera:</span>
                <span className="spec-value">{guitar.wood_type}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Color:</span>
                <span className="spec-value">{guitar.color}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Trastes:</span>
                <span className="spec-value">{guitar.fret_count}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Tipo:</span>
                <span className="spec-value">
                  {guitar.is_custom ? "Personalizada" : "Estándar"}
                </span>
              </div>
            </div>

            <div className="price-section">
              {isLiquidation ? (
                <>
                  <div className="price-row">
                    <span className="original-price">
                      ${guitar.sale_price.toLocaleString()}
                    </span>
                    <span className="discount-tag">OFERTA</span>
                  </div>
                  <p className="discount-price">
                    ${guitar.liquidation_price.toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="current-price">
                  ${guitar.sale_price.toLocaleString()}
                </p>
              )}
            </div>

            <div className="stock-info">
              {guitar.stock > 0 ? (
                <span className="in-stock">
                  Disponible ({guitar.stock} en stock)
                </span>
              ) : (
                <span className="out-of-stock">Agotado</span>
              )}
            </div>

            <button
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={guitar.stock <= 0}
            >
              {guitar.stock > 0 ? "Agregar al carrito" : "No disponible"}
            </button>

            <div className="reviews-section">
              <h3>Reseñas</h3>

              {canReview && !showReviewForm && !myReview && (
                <button
                  className="write-review-btn"
                  onClick={() => setShowReviewForm(true)}
                >
                  Escribir una reseña
                </button>
              )}

              {showReviewForm && (
                <form
                  className="review-form"
                  onSubmit={editingReview ? handleUpdateReview : handleSubmitReview}
                >
                  {/* Aquí va todo el contenido actual del formulario */}
              
                  <h4>{editingReview ? "Editar reseña" : "Escribe tu reseña"}</h4>
              
                  <div className="form-group">
                    <StarRating
                      rating={reviewForm.rating}
                      editable={true}
                      onRatingChange={(rating) => {
                        setReviewForm({ ...reviewForm, rating });
                        setFormErrors({ ...formErrors, rating: false });
                      }}
                    />
                    {formErrors.rating && (
                      <p className="error-message">Por favor selecciona una calificación</p>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <textarea
                      value={reviewForm.comment}
                      onChange={(e) => {
                        setReviewForm({
                          ...reviewForm,
                          comment: e.target.value,
                        });
                        setFormErrors({ ...formErrors, comment: false });
                      }}
                      placeholder="Cuéntanos tu experiencia con esta guitarra..."
                      className={formErrors.comment ? "error-field" : ""}
                      required
                    />
                    {formErrors.comment && (
                      <p className="error-message">Por favor escribe un comentario</p>
                    )}
                  </div>
                  
                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setShowReviewForm(false);
                        setEditingReview(null);
                        setReviewForm({ rating: 0, comment: "" });
                      }}
                    >
                      Cancelar
                    </button>
                    <button type="submit">
                      {editingReview ? "Actualizar reseña" : "Enviar reseña"}
                    </button>
                    {editingReview && (
                      <button
                        type="button"
                        className="delete-review-btn"
                        onClick={handleDeleteReview}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Eliminando..." : "Eliminar reseña"}
                      </button>
                    )}
                  </div>
                </form>
              )}


              {loading.reviews ? (
                <p>Cargando reseñas...</p>
              ) : error.reviews ? (
                <div className="reviews-error">
                  <p>No se pudieron cargar las reseñas: {error.reviews}</p>
                </div>
              ) : reviews.length === 0 ? (
                <p className="no-reviews">
                  No hay reseñas aún. ¡Sé el primero en opinar!
                </p>
              ) : (
                <div className="reviews-list">
                  {reviews.map((review) => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <div className="review-user">
                          <div className="user-avatar">
                            {review.user_name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <div className="user-info">
                            <StarRating
                              rating={review.rating}
                              editable={false}
                              size="small"
                            />
                          </div>
                        </div>
                        <div className="review-actions">
                          {myReview && review.id === myReview.id && (
                            <div className="review-actions">
                              <button className="edit-review-btn" onClick={handleEditReview}>
                                Editar
                              </button>
                              <button
                                className="delete-review-btn"
                                onClick={handleDeleteReview}
                                disabled={isDeleting}
                              >
                                Eliminar
                              </button>
                            </div>
                          )}
                          <span className="review-date">
                            {new Date(review.created_at).toLocaleDateString(
                              "es-ES",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GuitarDetailPage;