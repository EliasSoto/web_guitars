export const formatPrice = (price) =>
  price?.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${day}-${month}-${year}`;
};

export const formatRut = (rut) => {
  if (!rut || typeof rut !== 'string') return '';

  const [numero, dv] = rut.split('-');
  if (!numero || !dv) return rut;

  const rutReverso = numero.split('').reverse();
  const rutFormateado = [];

  for (let i = 0; i < rutReverso.length; i++) {
    rutFormateado.push(rutReverso[i]);
    if ((i + 1) % 3 === 0 && i + 1 !== rutReverso.length) {
      rutFormateado.push('.');
    }
  }

  return rutFormateado.reverse().join('') + '-' + dv.toUpperCase();
};

export const capitalize = (text) => {
  if (!text || typeof text !== "string") return "";
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
