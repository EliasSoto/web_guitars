import React from "react";
import "../styles/PaymentLoading.css";

export default function PaymentLoading() {
  return (
    <div className="payment-loading-overlay">
      <div className="payment-loading-box">
        <div className="loader-bar"></div>
        <p className="payment-loading-text">Procesando tu compra...</p>
      </div>
    </div>
  );
}
