export const formatNumber = (num) => {
  if (isNaN(num)) return "Invalid Number";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};
