import { useFilterContext } from "../context/ContextApi";
import useGetListing from "./GetListing";

export const useFilterListings = () => {
  const { selectedItems } = useFilterContext();
  const { listings } = useGetListing();

  const parseRange = (rangeStr, isPrice = false) => {
    const range = rangeStr
      .replace(/[^\d -]/g, "")
      .split("-")
      .map((val) => parseFloat(val.trim()));
    return isPrice ? range.map((val) => val * 1000) : range;
  };

  if (
    !selectedItems.regions.length &&
    !selectedItems.area.length &&
    !selectedItems.prices.length &&
    !selectedItems.rooms.length
  ) {
    return listings;
  }

  return listings.filter((listing) => {
    const { city, bedrooms, area, price } = listing;

    const matchesRegion =
      !selectedItems.regions.length ||
      selectedItems.regions.includes(city?.region_id);

    const matchesRooms =
      !selectedItems.rooms.length ||
      selectedItems.rooms.includes(String(bedrooms));

    const matchesArea =
      !selectedItems.area.length ||
      selectedItems.area.some((range) => {
        const [minArea, maxArea] = parseRange(range);
        return area >= minArea && area <= maxArea;
      });

    const matchesPrice =
      !selectedItems.prices.length ||
      selectedItems.prices.some((range) => {
        const [minPrice, maxPrice] = parseRange(range, true);
        return price >= minPrice && price <= maxPrice;
      });

    return matchesRegion && matchesRooms && matchesArea && matchesPrice;
  });
};

export default useFilterListings;
