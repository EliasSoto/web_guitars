import CustomizedGuitar from "../components/CustomizedGuitar/CustomizedGuitar";
import HeaderLogin from "../components/HeaderLogin.jsx";
import Footer from "../components/Footer.jsx";
import PreviewCustomParts from "../components/PreviewCustomParts.jsx";
import CustomizationSummary from "../components/CustomizationSummary.jsx";
import { useState } from 'react';
import '../styles/CustomGuitarPage.css' 
import { useCustomGuitar } from "../hooks/useCustomGuitar.jsx";
import { ToastContainer } from 'react-toastify';

export default function PageLayout() {
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
  
  const [config, setConfig] = useState(initialConfig);

  const {
    step,
    setStep,
    selectedComponent,
    setSelectedComponent,
    maxComponentes,
    selectedComponents,
    setSelectedComponents,
    compatibles,
    loading,
    error,
    agregarComponente,
    estaSeleccionado,
    handleConfigChange,
    handleCreateCustomGuitar,
    isStep1Complete,
    isStep2Complete,
    headstockOptions,
    bodyOptions,
    woodOptions,
    bridgeOptions,
    mostrarJack,
    totalPrice
  } = useCustomGuitar(config, setConfig, initialConfig);

  return (
    <div className="page-container">
      <header className="page-header">
        <HeaderLogin />
      </header>

      <main className="page-main">
        <PreviewCustomParts 
          config={config}
          setConfig={setConfig}
          step={step}
          setStep={setStep}
          selectedComponent={selectedComponent}
          setSelectedComponent={setSelectedComponent}
          maxComponentes={maxComponentes}
          selectedComponents={selectedComponents}
          setSelectedComponents={setSelectedComponents}
          compatibles={compatibles}
          loading={loading}
          error={error}
          agregarComponente={agregarComponente}
          estaSeleccionado={estaSeleccionado}
          handleConfigChange={handleConfigChange}
          handleCreateCustomGuitar={handleCreateCustomGuitar}
          isStep1Complete={isStep1Complete}
          isStep2Complete={isStep2Complete}
          headstockOptions={headstockOptions}
          bodyOptions={bodyOptions}
          woodOptions={woodOptions}
          bridgeOptions={bridgeOptions}
          mostrarJack={mostrarJack}
          initialConfig={initialConfig}
        />
        <CustomizedGuitar config={config} />
        <CustomizationSummary 
          selectedComponents={selectedComponents}
          totalPrice={totalPrice}
          step={step}
          onConfirm={handleCreateCustomGuitar}
        />
      </main>

      <footer className="page-footer">
        <Footer />
      </footer>
      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </div>
  )
}