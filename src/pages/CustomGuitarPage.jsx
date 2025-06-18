import CustomizedGuitar from "../components/CustomizedGuitar/CustomizedGuitar";
import HeaderLogin from "../components/HeaderLogin.jsx";
import Footer from "../components/Footer.jsx";
import PreviewCustomParts from "../components/PreviewCustomParts.jsx";
import CustomizationSummary from "../components/CustomizationSummary.jsx";
import { useState } from 'react';
import '../styles/CustomGuitarPage.css' 

export default function PageLayout() {

  const [config, setConfig] = useState({
    clavijero: '',
    trastes: 21,
    cuerpo: '',
    pastillas: '',
    pastillasActivas: false,
    jack: '',
    potenciometros: '',
    puente: ''
  });

  return (
    <div className="page-container">
      
      <header className="page-header">
        <HeaderLogin />
      </header>

      <main className="page-main">

        <PreviewCustomParts config={config} setConfig={setConfig}/>

        {/*pasar prop*/}
        <CustomizedGuitar config={config} />

        <CustomizationSummary />

      </main>

      <footer className="page-footer">
        <Footer />
      </footer>

    </div>
  )
}
