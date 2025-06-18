export default function CustomizationSummary() {
  const styles = {
    aside: {
      padding: '1rem',
      borderLeft: '1px solid #e5e7eb', // gray-200
      height: '100%',
      width: '100%',
      fontFamily: 'system-ui, sans-serif',
    },
    h2: {
      fontSize: '1.125rem', // text-lg
      fontWeight: '600',
      marginBottom: '1rem',
    },
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem', // space-y-2
      fontSize: '0.875rem', // text-sm
      color: '#4b5563', // gray-700
    },
    li: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    totalDiv: {
      marginTop: '1.5rem',
      borderTop: '1px solid #e5e7eb',
      paddingTop: '1rem',
      display: 'flex',
      justifyContent: 'space-between',
      fontWeight: '700',
      color: '#111827', // gray-900
    },
    button: {
      marginTop: '1.5rem',
      width: '100%',
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '0.5rem 0',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.3s ease',
    },
  };

  return (
    <aside style={styles.aside}>
      <h2 style={styles.h2}>Resumen</h2>
      <ul style={styles.ul}>
        <li style={styles.li}>
          <span>Cuerpo:</span>
          <span>Stratocaster</span>
        </li>
        <li style={styles.li}>
          <span>Mástil:</span>
          <span>Arce</span>
        </li>
        <li style={styles.li}>
          <span>Pastillas:</span>
          <span>HSS</span>
        </li>
        <li style={styles.li}>
          <span>Color:</span>
          <span>Rojo</span>
        </li>
      </ul>

      <div style={styles.totalDiv}>
        <span>Total estimado:</span>
        <span>$450.000</span>
      </div>

      <button
        style={styles.button}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#374151')} 
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#000')}
      >
        Finalizar pedido
      </button>
    </aside>
  );
}
