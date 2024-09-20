import { formatNumber } from "./ formatNumber";

export const formatPrice = (price) => {
  return `${formatNumber(price)} ₾`;
};
