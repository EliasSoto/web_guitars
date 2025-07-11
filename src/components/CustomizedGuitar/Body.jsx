import "./GuitarStyles.css"
import Headstock from "./GuitarComponents/Headstock";
import Neck from "./GuitarComponents/Neck";
import BodyGuitar from "./GuitarComponents/BodyGuitar";
import Bridge from "./GuitarComponents/Bridge";
import Jack from "./GuitarComponents/Jack";
import "./GuitarComponents/Pots/PotConfigStrat.jsx"
import PotConfigStrat from "./GuitarComponents/Pots/PotConfigStrat.jsx";
import PickupsConfig from "./GuitarComponents/PickupsConfig.jsx";
import PotConfigTele from "./GuitarComponents/Pots/PotConfigTele.jsx";
import PotConfigFlyingV from "./GuitarComponents/Pots/PotConfigFlyingV.jsx";
import FirstMessageCustom from "./FirstMessageCustom.jsx";
import PotConfigLesPaul from "./GuitarComponents/Pots/PotConfigLesPaul.jsx";
import PotConfigSG from "./GuitarComponents/Pots/PotConfigSG.jsx";
import PotConfigMachinegun from "./GuitarComponents/Pots/PotConfigMachinegun.jsx";

export default function Body({config }) {
  const { clavijero,cuerpo, pastillas, jack, puente, potenciometros } = config;

   const noHayNadaSeleccionado =
    !clavijero &&
    !cuerpo &&
    !pastillas &&
    !jack &&
    !puente &&
    !potenciometros;

  if (noHayNadaSeleccionado) {
    return <FirstMessageCustom />;
  }

  const PotComponents = {
  strato: PotConfigStrat,
  telecaster: PotConfigTele,
  flyingv: PotConfigFlyingV,
  lespaul: PotConfigLesPaul,
  sg: PotConfigSG,
  machinegun: PotConfigMachinegun,
  };

  const SelectedPotComponent = PotComponents[cuerpo];

  return (
    
    <svg
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="72.5 42 44 150"
    className="guitar-svg"
    >

      {/* CUERPO DE LA GUITARRA */}
      <BodyGuitar type={cuerpo} />
      {/* CUERPO DE LA GUITARRA */}

      {/* CLAVIJERO Y NECK   */}
      {clavijero && (
        <>
          <Neck />
          <Headstock type={clavijero} />
        </>
      )}
      {/* CLAVIJERO Y NECK   */}

      {/* POTENCIOMETROS */}
      {SelectedPotComponent && <SelectedPotComponent type={potenciometros} />}
      {/* POTENCIOMETROS */}

      {/* CONFIGURACION DE LAS PASTILLAS */}
      <PickupsConfig type={pastillas} typebody={cuerpo}> </PickupsConfig>
      {/* CONFIGURACION DE LAS PASTILLAS */}

      {/* PUENTE */}
      <Bridge type={puente} typebody={cuerpo}/>
      {/* PUENTE */}

      {/* JACK */}
      {jack === "adelante" && (
        <Jack type={cuerpo} />
      )} 
      {/* JACK */} 

    </svg>
  );
}




