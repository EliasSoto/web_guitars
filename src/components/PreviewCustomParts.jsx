import { useState, useEffect } from 'react';
import '../styles/PreviewCustomParts.css';
import { useBaseGuitar } from '../hooks/userBaseGuitar';
import { getUserFilteredComponents } from '../services/componentService';
import { Icon } from '@iconify/react';

export default function PreviewPanel({ config, setConfig }) {
  const [step, setStep] = useState(1);
  const { guitar } = useBaseGuitar(config.madera, config.color);

  const fetchComponentsByType = async ({ type, subtype = "", is_active = "", limit = 1000 }) => {
    const params = {
      type,
      subtype,
      stock_only: true,
      is_active,
      page: 1,
      limit,
    };

    const [data, error] = await getUserFilteredComponents(params);
    const items = data?.components || [];
    return { items, error };
  };

  const [pastillasCompatibles, setPastillasCompatibles] = useState([]);
  const [puentesCompatibles, setPuentesCompatibles] = useState([]);
  const [potenciometrosCompatibles, setPotenciometrosCompatibles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step === 2 && config.pastillas && config.puente && config.potenciometros) {
      const fetchAll = async () => {
        setLoading(true);
        setError(null);

        try {
          const potenciometrosSubtypes = [];
          if (config.potenciometros.toLowerCase().includes("volumen")) potenciometrosSubtypes.push("Volumen");
          if (config.potenciometros.toLowerCase().includes("tono")) potenciometrosSubtypes.push("Tono");

          const promises = [
            fetchComponentsByType({
              type: "Pastilla",
              subtype: config.pastillas,
              is_active: config.esActiva ? "true" : "false",
            }),
            fetchComponentsByType({
              type: "Puente",
              subtype: config.puente.charAt(0).toUpperCase() + config.puente.slice(1),
            }),
            ...potenciometrosSubtypes.map((subtype) =>
              fetchComponentsByType({
                type: "Potenciómetro",
                subtype,
                is_active: config.esActiva ? "true" : "false",
              })
            ),
          ];

          const results = await Promise.all(promises);
          const [pastillas, puentes, ...potenciometrosList] = results;
          const potenciometros = potenciometrosList.flatMap(p => p.items || []);

          setPastillasCompatibles(pastillas.items);
          setPuentesCompatibles(puentes.items);
          setPotenciometrosCompatibles(potenciometros);

          const allErrors = [
            pastillas.error,
            puentes.error,
            ...potenciometrosList.map(p => p.error)
          ].filter(Boolean);
        
          if (allErrors.length) {
            setError(allErrors.join(", "));
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchAll();
    }
  }, [step, config]);

  const handleConfigChange = (key, value) => {
    setConfig(prev => {
      let newConfig = { ...prev, [key]: value };
      if (key === 'cuerpo') {
      
        // Resetear dependientes al cambiar el cuerpo
        newConfig.pastillas = '';
        newConfig.esActiva = false;
        newConfig.jack = '';
        newConfig.potenciometros = '';
      }
      return newConfig;
    });
  };

  const initialConfig = {
    clavijero: '',
    trastes: 21,
    cuerpo: '',
    pastillas: '',
    esActiva: false,
    jack: '',
    potenciometros: '',
    puente: '',
    madera: '',
    color: ''
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

  const opcionesPotenciometros = () => {
    switch (config.cuerpo) {
      case 'strato':
        return ['Por defecto', 'Tono + Volumen', 'Solo Volumen'];

      case 'telecaster':
        return ['Tono + Volumen', 'Solo Volumen'];

      case 'sg':
      case 'lespaul':
        return [ 'Tono + Tono + Tono + Volumen', 'Tono + Tono + Volumen', 'Tono + Volumen', 'Solo Volumen'];

      case 'flyingv':
        return ['Solo Volumen', 'Tono + Volumen'];
      default:
        return [];
    }
  };

  const mostrarJack = config.cuerpo === 'strato' || config.cuerpo === 'sg';

  const opcionesPuente = () => {
    switch (config.cuerpo) {
      case 'flyingv':
      case 'lespaul':
      case 'sg':
        return ['fijo', 'flotante'];
      
      default:
        return ['fijo', 'flotante', 'semiflotante'];
    }
  }

  return (
    <aside className="preview-panel">
      
            {step === 1 && (
        <>
          <h2 className="title">Configuración</h2>
          <div className="section-group">
           
            {/* Clavijero */}
            <div className="component-section">
              <label htmlFor="clavijero" className="component-label">Tipo de clavijero</label>
              <select
                id="clavijero"
                value={config.clavijero}
                onChange={(e) => handleConfigChange('clavijero', e.target.value)}
              >
                <option value="">Selecciona...</option>
                <option value="tipo1">Tipo 1</option>
                <option value="tipo2">Tipo 2</option>
                <option value="tipo3">Tipo 3</option>
                <option value="tipo4">Tipo 4</option>
                <option value="tipo5">Tipo 5</option>
              </select>
            </div>

            {/* Trastes */}
            <div className="component-section">
              <label htmlFor="trastes" className="component-label">Cantidad de trastes</label>
              <select
                id="trastes"
                value={config.trastes}
                onChange={(e) => handleConfigChange('trastes', parseInt(e.target.value))}
              >
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="24">24</option>
              </select>
            </div>

            {/* Cuerpo */}
            <div className="component-section">
              <label htmlFor="cuerpo" className="component-label">Tipo de cuerpo</label>
              <select
                id="cuerpo"
                value={config.cuerpo}
                onChange={(e) => handleConfigChange('cuerpo', e.target.value)}
              >
                <option value="">Selecciona...</option>
                <option value="strato">Strato</option>
                <option value="telecaster">Telecaster</option>
                <option value="sg">SG</option>
                <option value="lespaul">Les Paul</option>
                <option value="flyingv">Flying V</option>
              </select>
            </div>

            {/* Pastillas */}
            {config.cuerpo && (
              <div className="component-section">
                <label htmlFor="pastillas" className="component-label">Configuración de pastillas</label>
                <select
                  id="pastillas"
                  value={config.pastillas}
                  onChange={(e) => handleConfigChange('pastillas', e.target.value)}
                >
                  <option value="">Selecciona...</option>
                  {pastillasDisponibles().map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Electrónica activa */}
            {config.pastillas && (
              <div className="component-section">
                <label htmlFor="esActiva" className="component-label">¿Electrónica activa?</label>
                <select
                  id="esActiva"
                  value={config.esActiva ? 'sí' : 'no'}
                  onChange={(e) => handleConfigChange('esActiva', e.target.value === 'sí')}
                >
                  <option value="no">No</option>
                  <option value="sí">Sí</option>
                </select>
              </div>
            )}

            {/* Jack */}
            {mostrarJack && (
              <div className="component-section">
                <label htmlFor="jack" className="component-label">Ubicación del Jack</label>
                <select
                  id="jack"
                  value={config.jack}
                  onChange={(e) => handleConfigChange('jack', e.target.value)}
                >
                  <option value="">Selecciona...</option>
                  <option value="adelante">Adelante</option>
                  <option value="abajo">Abajo</option>
                </select>
              </div>
            )}

            {/* Potenciómetros */}
            {config.cuerpo && (
              <div className="component-section">
                <label htmlFor="potenciometros" className="component-label">Configuración de potenciómetros</label>
                <select
                  id="potenciometros"
                  value={config.potenciometros}
                  onChange={(e) => handleConfigChange('potenciometros', e.target.value)}
                >
                  <option value="">Selecciona...</option>
                  {opcionesPotenciometros().map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Puente */}
            <div className="component-section">
              <label htmlFor="puente" className="component-label">Tipo de puente</label>

              <select
                id="puente"
                value={config.puente}
                onChange={(e) => handleConfigChange('puente', e.target.value)}
              >
                <option value="">Selecciona...</option>
                {opcionesPuente().map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion.charAt(0).toUpperCase() + opcion.slice(1)}</option>
                ))}
              </select>
              
               </div>
          </div>
          <button onClick={() => setStep(2)} className="next-button">Siguiente</button>
        </>
      )}

      {step === 2 && (
        <>
          <h2 className="title">Configura tu estilo</h2>
          <div className="section-group">
          {/* Tipo de madera */}
            <div className="component-section">
              <label htmlFor="madera" className="component-label">Tipo de madera</label>
              <select
                id="madera"
                value={config.madera || ''}
                onChange={(e) => handleConfigChange('madera', e.target.value)}
              >
                <option value="">Selecciona...</option>
                <option value="Aliso">Aliso</option>
                <option value="Caoba">Caoba</option>
                <option value="Fresno">Fresno</option>
                <option value="Arce">Arce</option>
                <option value="Nogal">Nogal</option>
              </select>
            </div>

          {/* Color */}
            <div className="component-section">
              <label htmlFor="color" className="component-label">Color</label>
              <select
                id="color"
                value={config.color || ''}
                onChange={(e) => handleConfigChange('color', e.target.value)}
              >
                <option value="">Selecciona...</option>
                <option value="Negro">Negro</option>
                <option value="Blanco">Blanco</option>
                <option value="Rojo">Rojo</option>
                <option value="Azul">Azul</option>
                <option value="Verde">Verde</option>
                <option value="Amarillo">Amarillo</option>
                <option value="Natural">Natural</option>
                <option value="Gris">Gris</option>
                <option value="Dorado">Dorado</option>
                <option value="Cobre">Cobre</option>
              </select>
            </div>
          </div>

          <div>
            <button onClick={() => setStep(1)} className="back-button">Volver</button>
            <button onClick={() => setStep(3)} className="back-button">Siguiente</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
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
              <h3>Pastillas compatibles</h3>
              {pastillasCompatibles.length ? (
                <ul>
                  {pastillasCompatibles.map(p => (
                    <li key={p.id}><p>{p.id}</p></li>
                  ))}
                </ul>
              ) : <p>No hay pastillas compatibles.</p>}

              <h3>Potenciómetros compatibles</h3>
              {potenciometrosCompatibles.length ? (
                <ul>
                  {potenciometrosCompatibles.map(p => (
                    <li key={p.id}><p>{p.id}</p></li>
                  ))}
                </ul>
              ) : <p>No hay potenciómetros compatibles.</p>}

              <h3>Puentes compatibles</h3>
              {puentesCompatibles.length ? (
                <ul>
                  {puentesCompatibles.map(p => (
                    <li key={p.id}><p>{p.id}</p></li>
                  ))}
                </ul>
              ) : <p>No hay puentes compatibles.</p>}
            </>
          )}

          <div className="summary">
            <p><strong>Clavijero:</strong> {config.clavijero}</p>
            <p><strong>Trastes:</strong> {config.trastes}</p>
            <p><strong>Cuerpo:</strong> {config.cuerpo}</p>
            <p><strong>Pastillas:</strong> {config.pastillas}</p>
            <p><strong>Electrónica activa:</strong> {config.esActiva ? 'Sí' : 'No'}</p>
            {mostrarJack && <p><strong>Jack:</strong> {config.jack}</p>}
            <p><strong>Potenciómetros:</strong> {config.potenciometros}</p>
            <p><strong>Puente:</strong> {config.puente}</p>
            <p><strong>Madera:</strong> {config.madera}</p>
            <p><strong>Color:</strong> {config.color}</p>
            <p><strong>ID guitarra base:</strong> {guitar ? guitar.id : 'No encontrada'}</p>
          </div>

          <div>
            <button 
              onClick={() => {
                setStep(1);
                setConfig(initialConfig);
              }} 
              className="back-button"
            >
              Volver a empezar
            </button>
            <button onClick={() => setStep(2)} className="back-button">Volver</button>
          </div>
        </>
      )}
    </aside>
  );
}