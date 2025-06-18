
import './GuitarStyles.css';
import Body from './Body';

export default function CustomizedGuitar({config}) {
  return (
    <div className='customized-guitar'>
      <Body config={config} />
    </div>
  );
}

