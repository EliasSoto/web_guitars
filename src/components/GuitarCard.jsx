
// GuitarCard.jsx
import React from 'react';

const GuitarCard = () => {
  return (
    <div className="max-w-xs rounded-2xl bg-white shadow-lg p-5 text-center relative">
      <div className="flex justify-between items-start">
        <div className="text-left">
          <h2 className="text-lg font-bold text-gray-900">Modelo</h2>
          <p className="text-sm text-gray-400">Marca</p>
        </div>
        <button className="text-gray-400 text-xl hover:text-red-500">
          ♥
        </button>
      </div>

      <div className="my-4">
        <img
          src="/path-to-image/guitar.png" // cambia esto por la ruta real de tu imagen
          alt="Guitarra"
          className="mx-auto max-h-40 object-contain"
        />
      </div>

      <div className="mt-4 text-left">
        <p className="text-xl font-bold text-gray-900">$Precio Final</p>
        <p className="text-sm text-gray-400 line-through">$Precio Remate</p>
      </div>

      <button className="mt-4 w-full bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700">
        Agregar al carro
      </button>
    </div>
  );
};

export default GuitarCard;
