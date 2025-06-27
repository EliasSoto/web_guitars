import { useState } from 'react';
import '../styles/CustomizationSummary.css';

export default function CustomizationSummary({ selectedComponents, totalPrice, step, onConfirm, config, headstockOptions, bodyOptions, woodOptions }) {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleConfirm = () => {
    if (!paymentMethod) {
      alert('Por favor, selecciona un método de pago');
      return;
    }
    onConfirm(paymentMethod);
  };

  const getComponentsList = () => {
    const components = [];

    // Agregar clavijero seleccionado
    if (config.clavijero) {
      const selectedHeadstock = headstockOptions.find(h => h.value === config.clavijero);
      if (selectedHeadstock) {
        components.push({
          id: 'headstock',
          name: `Clavijero: ${selectedHeadstock.name}`,
          price: selectedHeadstock.price
        });
      }
    }

    // Agregar cuerpo seleccionado
    if (config.cuerpo) {
      
      const selectedBody = bodyOptions.find(b => b.value === config.cuerpo);
      if (selectedBody) {
        components.push({
          id: 'body',
          name: `Cuerpo: ${selectedBody.name}`,
          price: selectedBody.price
        });
      }
    }

    // Agregar madera seleccionada
    if (config.madera) {
      const selectedWood = woodOptions.find(w => w.name === config.madera);
      if (selectedWood) {
        components.push({
          id: 'wood',
          name: `Madera: ${selectedWood.name}`,
          price: selectedWood.price
        });
      }
    }

    if (step >= 2) {
      selectedComponents.pastillas.S.forEach((p, i) => {
        components.push({ id: `s-${i}`, name: `Pastilla S: ${p.name}`, price: p.sale_price });
      });
      selectedComponents.pastillas.H.forEach((p, i) => {
        components.push({ id: `h-${i}`, name: `Pastilla H: ${p.name}`, price: p.sale_price });
      });
      selectedComponents.potenciometros.volumen.forEach((p, i) => {
        components.push({ id: `vol-${i}`, name: `Pot. Volumen: ${p.name}`, price: p.sale_price });
      });
      selectedComponents.potenciometros.tono.forEach((p, i) => {
        components.push({ id: `tono-${i}`, name: `Pot. Tono: ${p.name}`, price: p.sale_price });
      });

      if (step === 3 && selectedComponents.puente) {
        components.push({
          id: 'puente',
          name: `Puente: ${selectedComponents.puente.name}`,
          price: selectedComponents.puente.sale_price
        });
      }
    }

    return components;
  };

  const components = getComponentsList();

  return (
    <div className="customization-summary-container">
      <h3 className="customization-summary-title">Tu configuración</h3>

      {components.length > 0 ? (
        <>
          <div>
            {components.map(comp => (
              <div key={comp.id} className="customization-summary-component">
                <span className="customization-summary-name">{comp.name}</span>
                <span>${comp.price.toLocaleString('es-CL')}</span>
              </div>
            ))}
          </div>

          <div className="customization-summary-total">
            <span>Total estimado:</span>
            <span>
              ${components.reduce((sum, c) => sum + (c.price || 0), 0).toLocaleString('es-CL')}
            </span>
          </div>

          {step === 3 && (
            <>
              <div className="checkout-section">
                <h3>Método de pago</h3>
                <select 
                  value={paymentMethod} 
                  onChange={handlePaymentChange}
                  className="payment-method-select"
                >
                  <option value="" disabled hidden>
                    Selecciona un método
                  </option>
                  <option value="tarjeta">Tarjeta de crédito/débito</option>
                  <option value="transferencia">Transferencia bancaria</option>
                  <option value="paypal">PayPal</option>
                </select>
              </div>

              <button 
                className="confirm-button"
                onClick={handleConfirm}
              >
                Confirmar pedido
              </button>
            </>
          )}
        </>
      ) : (
        <p className="customization-summary-empty">
          {step === 1
            ? "Comienza seleccionando las características de tu guitarra"
            : "No hay componentes seleccionados aún"}
        </p>
      )}
    </div>
  );
}