// import Body from './Body';
// import Pickguard from './Pickguard';
// import Pickups from './Pickups';
// import Bridge from './Bridge';
// import Neck from './Neck';
// import Headstock from './Headstock';

// export default function CustomizedGuitar() {
//   return (
//     <div className="relative w-[500px] h-[500px] bg-white">
//       <Headstock />
//       <Neck />

//       {/* Cuerpo y componentes montados sobre él */}
//       <Body />
//       <Pickguard />
//       <Pickups />
//       <Bridge />
//     </div>
//   );
// }


import Headstock from './GuitarComponents/Headstock';
import Neck from './GuitarComponents/Neck';
import BodyParts from './BodyParts';

export default function CustomizedGuitar() {
  return (
    <div className="relative w-[500px] h-[500px] bg-white">
      <Headstock />
      <Neck />
      <BodyParts />
    </div>
  );
}
