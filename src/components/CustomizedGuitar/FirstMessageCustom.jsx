export default function FirstMessageCustom() {
  return (
    <div
      style={{
        padding: '1rem',
        textAlign: 'center',
        fontSize: '0.95rem',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6',
        color: '#333',
      }}
    >
      <p style={{ fontStyle: 'italic', marginBottom: '1rem' }}>
        Personalizar tu guitarra es una forma nueva de tocar
      </p>
      <ol
        style={{
          listStyle: 'decimal',
          textAlign: 'left',
          paddingLeft: '1.2rem',
          margin: '0 auto',
          display: 'inline-block',
        }}
      >
        <li>Elige el cuerpo.</li>
        <li>Configura las pastillas.</li>
        <li>Define el puente y los potenciómetros.</li>
        <li>Ajusta detalles como el jack y clavijero.</li>
        <li>Visualiza cómo quedará.</li>
      </ol>
    </div>
  );
}
