import { formatNumber } from "./ formatNumber";
import { formatPrice } from "./formatPrice";

export const formatRange = (range, isPrice = false) => {
  const [min, max] = range;
  if (isPrice) {
    return ` ${formatPrice(min)} - ${formatPrice(max)}`;
  } else {
    return `${formatNumber(min)} მ² - ${formatNumber(max)} მ²`;
  }
};
