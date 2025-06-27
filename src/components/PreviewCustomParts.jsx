import { useState, useEffect } from 'react';
import '../styles/PreviewCustomParts.css';
import { Icon } from '@iconify/react';

export default function PreviewPanel({config, setConfig, step, setStep, selectedComponent, setSelectedComponent, maxComponentes, selectedComponents, setSelectedComponents, compatibles, loading, error, agregarComponente, estaSeleccionado, handleConfigChange, handleCreateCustomGuitar, isStep1Complete, isStep2Complete, headstockOptions, bodyOptions, woodOptions, bridgeOptions, mostrarJack, initialConfig}) {

  const defaultImage = 'https://res.cloudinary.com/de5qrezpl/image/upload/v1750967058/guiafnh33wb3dx0twv0g.png';
  const [selectedCategory, setSelectedCategory] = useState('Pastillas');
  const [hoveredComponent, setHoveredComponent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleResetStep = () => {
    setStep(1);
  };

  const pastillasDisponibles = () => {
    switch (config.cuerpo) {
      case 'strato': 
        return ['SSS', 'SSH', 'HH', 'SH', 'H'];
        
      case 'telecaster':
      case 'lespaul':
      case 'sg':
      case 'flyingv':
         return ['HH', 'SH', 'H'];
     
         default: 
      return [];
    }
  };

  const opcionesPotenciometros = (cuerpo) => {
    switch (cuerpo) {
      case 'strato':
        return ['Tono + Tono + Volumen', 'Tono + Volumen', 'Solo Volumen'];
      case 'telecaster':
        return ['Tono + Volumen', 'Solo Volumen'];
      case 'sg':
      case 'lespaul':
        return ['Tono + Tono + Tono + Volumen', 'Tono + Tono + Volumen', 'Tono + Volumen', 'Solo Volumen'];
      case 'flyingv':
        return ['Solo Volumen', 'Tono + Volumen'];
      default:
        return [];
    }
  };

  const opcionesPuente = () => {
    let tipos = [];

    switch (config.cuerpo) {
      case 'flyingv':
      case 'lespaul':
      case 'sg':
        tipos = ['fijo', 'flotante'];
        break;
      default:
        tipos = ['fijo', 'flotante', 'semiflotante'];
        break;
    }

    return tipos.map((tipo) => bridgeOptions[tipo]);
  };

  const handleMouseEnter = (component, event) => {
    setHoveredComponent(component);
    setShowModal(true);
    setModalPosition({
      x: window.innerWidth / 2 - 150,
      y: window.innerHeight / 2 - 150
    });
  };

  const handleMouseLeave = () => {
    setShowModal(false);
    setHoveredComponent(null);
  };
  
  return (
    <aside className="preview-panel">
      
      {step === 1 && (
        <>
          <h2 className="title">Configuración</h2>
          <div className="section-group">
           
            {/* Clavijero */}
            <label htmlFor="clavijero" className="component-label">Tipo de clavijero</label>
            <div className="component-section">
               <div className="component-options-grid">
                {headstockOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`component-option ${config.clavijero === option.value ? 'selected' : ''}`}
                    onClick={() => handleConfigChange('clavijero', option.value)}
                  >
                    <img 
                      src={option.img}
                      alt={option.name}
                      className="component-image"
                    />
                    <div className="tooltip">{option.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trastes */}
            <div className="component-section">
              <label htmlFor="trastes" className="component-label">Cantidad de trastes</label>
              <div className="component-button-options-row">
                {[21, 22, 24].map((cantidad) => (
                  <div
                    key={cantidad}
                    className={`component-button-option ${config.trastes === cantidad ? 'selected' : ''}`}
                    onClick={() => handleConfigChange('trastes', cantidad)}
                  >
                    {cantidad}
                  </div>
                ))}
              </div>
            </div>

            {/* Cuerpo */}
            <div className="component-section">
              <label htmlFor="cuerpo" className="component-label">Tipo de cuerpo</label>
              <div className="component-options-grid">
                {bodyOptions.map((option) => (
                  <div
                    key={option.value}
                    className={`component-option ${config.cuerpo === option.value ? 'selected' : ''}`}
                    onClick={() => handleConfigChange('cuerpo', option.value)}
                  >
                    <img 
                      src={option.img}
                      alt={option.name}
                      className="component-image"
                    />
                    <div className="tooltip">{option.name}</div>
                  </div>
                ))}
              </div>
            </div>


            {/* Pastillas */}
            {config.cuerpo && (
              <div className="component-section">
                <label htmlFor="pastillas" className="component-label">Configuración de pastillas</label>
                <div className="component-button-options-row">
                  {pastillasDisponibles().map((option) => (
                    <div
                      key={option}
                      className={`component-button-option ${config.pastillas === option ? 'selected' : ''}`}
                      onClick={() => handleConfigChange('pastillas', option)}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}


            {/* Electrónica activa */}
            {config.pastillas && (
              <div className="component-section">
                <label htmlFor="esActiva" className="component-label">¿Electrónica activa?</label>
                <div className="component-button-options-row">
                  {['no', 'sí'].map((option) => (
                    <div
                      key={option}
                      className={`component-button-option ${(config.esActiva ? 'sí' : 'no') === option ? 'selected' : ''}`}
                      onClick={() => handleConfigChange('esActiva', option === 'sí')}
                    >
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Jack */}
            {mostrarJack && (
              <div className="component-section">
                <label htmlFor="jack" className="component-label">Ubicación del Jack</label>
                <div className="component-button-options-row">
                  {['adelante', 'abajo'].map((opcion) => (
                    <div
                      key={opcion}
                      className={`component-button-option ${config.jack === opcion ? 'selected' : ''}`}
                      onClick={() => handleConfigChange('jack', opcion)}
                    >
                      {opcion.charAt(0).toUpperCase() + opcion.slice(1)}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Potenciómetros */}
            {config.cuerpo && (
              <div className="component-section">
                <label htmlFor="potenciometros" className="component-label">Configuración de potenciómetros</label>
                <div className="component-button-options-row-v2">
                  {opcionesPotenciometros(config.cuerpo).map((opcion) => (
                    <div
                      key={opcion}
                      className={`component-button-option-v2 ${config.potenciometros === opcion ? 'selected' : ''}`}
                      onClick={() => handleConfigChange('potenciometros', opcion)}
                    >
                      {opcion}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Puente */}
            <div className="component-section">
              <label htmlFor="puente" className="component-label">Tipo de puente</label>
              <div className="component-options-grid">
                {opcionesPuente().map((option) => (
                  <div
                    key={option.value}
                    className={`component-option ${config.puente === option.value ? 'selected' : ''}`}
                    onClick={() => handleConfigChange('puente', option.value)}
                  >
                    <img 
                      src={option.img}
                      alt={option.name}
                      className="component-image"
                    />
                    <div className="tooltip">{option.name}</div>
                  </div>
                ))}
              </div>
            </div>
            
          </div >
          <button onClick={() => handleNextStep()} className="confirm-button" disabled={!isStep1Complete()}>Siguiente</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="title">Configura tu estilo</h2>
          <div className="section-group">
          {/* Tipo de madera */}
            <div className="component-selection-section">
              <label className="component-label">Tipo de madera</label>
              <div className="component-options-grid">
                {woodOptions.map((wood) => (
                  <div
                    key={wood.name}
                    className={`component-option ${config.madera === wood.name ? 'selected' : ''}`}
                    onClick={() => handleConfigChange('madera', wood.name)}
                  >
                    <img 
                      src={wood.img}
                      alt={wood.name}
                      className="component-image"
                    />
                    <span>{wood.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Color personalizado */}
            <div className="component-section">
              <label className="component-label">Color personalizado</label>
              <div className="color-picker-wrapper">
                <input
                  type="color"
                  id="color"
                  value={config.color || '#000000'}
                  onChange={(e) => handleConfigChange('color', e.target.value)}
                  className="color-picker-large"
                />
                <span className="color-value-large">{(config.color || '#000000').toUpperCase()}</span>
              </div>
            </div>
          </div>

          <div className='button-row'>
            <button onClick={() => handlePreviousStep()} className="confirm-button">Volver</button>
            <button onClick={() => handleNextStep()} className="confirm-button" disabled={!isStep2Complete()}>Siguiente</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          {showModal && hoveredComponent && (
            <div 
              className="component-detail-modal"
              style={{
                position: 'fixed',
                left: `${modalPosition.x}px`,
                top: `${modalPosition.y}px`,
                zIndex: 1000
              }}
              onMouseEnter={() => setShowModal(true)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="modal-content">
                <h4>Detalle del componente</h4>
                <p><strong>Nombre:</strong> {hoveredComponent.name}</p>
                <p><strong>Marca:</strong> {hoveredComponent.brand}</p>
                <p><strong>Material:</strong> {hoveredComponent.material}</p>
                <p><strong>Descripción:</strong> {hoveredComponent.description}</p>
                <p><strong>Precio venta:</strong> ${hoveredComponent.sale_price}</p>
                <p><strong>Stock disponible:</strong> {hoveredComponent.stock}</p>
              </div>
            </div>
          )}
          <h2 className="title">Componentes Compatibles</h2>
          {loading && 
          <Icon
            icon="line-md:loading-loop"
            width={40}
            height={40}
            className="loading-icon"
          />}
          {error && <p style={{ color: 'red' }}>Error: {error}</p>}

          {!loading && (
          <>
            {selectedCategory === 'Pastillas' && (<aside>
            <details>
              <summary>Pastillas compatibles</summary>
                      
              {config.pastillas.includes('S') && maxComponentes.pastillas.S > 0 && (
                <>
                  <h4>Pastillas Simple (S) - {selectedComponents.pastillas.S.length}/{maxComponentes.pastillas.S}</h4>
                  {compatibles.pastillas.S.length ? (
                    compatibles.pastillas.S.map((p, index) => (
                      <img
                        key={`s-${index}`}
                        src={p.image_link || defaultImage}
                        className={`component-item-image ${estaSeleccionado(p) ? 'selected' : ''}`}
                        onClick={() => {
                          agregarComponente(p);
                          setSelectedComponent(p);
                        }}
                        onMouseEnter={(e) => handleMouseEnter(p, e)}
                        onMouseLeave={handleMouseLeave}
                        onError={(e) => {
                          e.target.src = defaultImage;
                          e.target.onerror = null;
                        }}
                        alt={`Pastilla ${p.name}`}
                      />
                    ))
                  ) : <p>No hay pastillas S compatibles.</p>}
                </>
              )}
          
              {config.pastillas.includes('H') && maxComponentes.pastillas.H > 0 && (
                <>
                  <h4>Pastillas Humbucker (H) - {selectedComponents.pastillas.H.length}/{maxComponentes.pastillas.H}</h4>
                  {compatibles.pastillas.H.length ? (
                    compatibles.pastillas.H.map((p, index) => (
                      <img
                        key={`h-${index}`}
                        src={p.image_link || defaultImage}
                        className={`component-item-image ${estaSeleccionado(p) ? 'selected' : ''}`}
                        onClick={() => {
                          agregarComponente(p);
                          setSelectedComponent(p);
                        }}
                        onMouseEnter={(e) => handleMouseEnter(p, e)}
                        onMouseLeave={handleMouseLeave}
                        onError={(e) => {
                          e.target.src = defaultImage;
                          e.target.onerror = null;
                        }}
                        alt={`Pastilla ${p.name}`}
                      />
                    ))
                  ) : <p>No hay pastillas H compatibles.</p>}
                </>
              )}
          
              <button
                onClick={() => setSelectedComponents(prev => ({ ...prev, pastillas: { S: [], H: [] } }))}
                className="clear-button"
              >
                Limpiar selección
              </button>
            </details>
            
            <details>
              <summary>Potenciómetros compatibles</summary>
            
              {config.potenciometros.toLowerCase().includes('volumen') && maxComponentes.potenciometros.volumen > 0 && (
                <>
                  <h4>Volumen - {selectedComponents.potenciometros.volumen.length}/{maxComponentes.potenciometros.volumen}</h4>
                  {compatibles.potenciometros.volumen.length ? (
                    compatibles.potenciometros.volumen.map((p, index) => (
                      <img
                        key={`vol-${index}`}
                        src={p.image_link || defaultImage}
                        className={`component-item-image ${estaSeleccionado(p) ? 'selected' : ''}`}
                        onClick={() => {
                          agregarComponente(p);
                          setSelectedComponent(p);
                        }}
                        onMouseEnter={(e) => handleMouseEnter(p, e)}
                        onMouseLeave={handleMouseLeave}
                        onError={(e) => {
                          e.target.src = defaultImage;
                          e.target.onerror = null;
                        }}
                        alt={`Potenciómetro ${p.name}`}
                      />
                    ))
                  ) : <p>No hay potenciómetros de volumen compatibles.</p>}
                </>
              )}
          
              {config.potenciometros.toLowerCase().includes('tono') && maxComponentes.potenciometros.tono > 0 && (
                <>
                  <h4>Tono - {selectedComponents.potenciometros.tono.length}/{maxComponentes.potenciometros.tono}</h4>
                  {compatibles.potenciometros.tono.length ? (
                    compatibles.potenciometros.tono.map((p, index) => (
                      <img
                        key={`tono-${index}`}
                        src={p.image_link || defaultImage}
                        className={`component-item-image ${estaSeleccionado(p) ? 'selected' : ''}`}
                        onClick={() => {
                          agregarComponente(p);
                          setSelectedComponent(p);
                        }}
                        onMouseEnter={(e) => handleMouseEnter(p, e)}
                        onMouseLeave={handleMouseLeave}
                        onError={(e) => {
                          e.target.src = defaultImage;
                          e.target.onerror = null;
                        }}
                        alt={`Potenciómetro ${p.name}`}
                      />
                    ))
                  ) : <p>No hay potenciómetros de tono compatibles.</p>}
                </>
              )}
          
              <button
                onClick={() => setSelectedComponents(prev => ({ ...prev, potenciometros: { volumen: [], tono: [] } }))}
                className="clear-button"
              >
                Limpiar selección
              </button>
            </details>
            
            <details>
              <summary>Puentes compatibles</summary>
            
              {compatibles.puentes.length ? (
                <>
                  {compatibles.puentes.map((p, index) => (
                    <img
                      key={index}
                      src={p.image_link || defaultImage}
                      className={`component-item-image ${estaSeleccionado(p) ? 'selected' : ''}`}
                      onClick={() => {
                        agregarComponente(p);
                        setSelectedComponent(p);
                      }}
                      onMouseEnter={(e) => handleMouseEnter(p, e)}
                      onMouseLeave={handleMouseLeave}
                      onError={(e) => {
                        e.target.src = defaultImage;
                        e.target.onerror = null;
                      }}
                      alt={`Puente ${p.name}`}
                    />
                  ))}
                  <button
                    onClick={() => setSelectedComponents(prev => ({ ...prev, puente: null }))}
                    className="clear-button"
                  >
                    Limpiar selección
                  </button>
                </>
              ) : <p>No hay puentes compatibles.</p>}
            </details>          
            {/* Navegación */}
            <div className="button-row">
              <button onClick={() => {handleResetStep(); setConfig(initialConfig);}} className="confirm-button">Volver a empezar</button>
              <button onClick={() => handlePreviousStep()} className="confirm-button">Volver</button>
            </div>
          </aside>
            )}
          </>
          )}
        </>
      )}
    </aside>
  );
}