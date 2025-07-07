export const formatPrice = (price) =>
  price?.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('T')[0].split('-');
  return `${day}-${month}-${year}`;
};