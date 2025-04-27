import React from 'react';
import './Card.css';  // Aquí podrías agregar tus estilos, como por ejemplo un tamaño fijo para las imágenes

const Card = ({ title, description, image }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt={title} />
      </div>
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Card;