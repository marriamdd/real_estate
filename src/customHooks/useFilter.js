import { useFilterContext } from "../context/ContextApi"; // Ensure this path is correct
import useGetListing from "./GetListing";

export const useFilterListings = () => {
  const { selectedItems } = useFilterContext(); // Access the selected filters from context
  const { listings } = useGetListing(); // Get the available listings

  // Function to parse a range string into a numeric array
  const parseRange = (rangeStr, isPrice = false) => {
    const range = rangeStr
      .replace(/[^\d -]/g, "")
      .split("-")
      .map((val) => parseFloat(val.trim()));
    return isPrice ? range.map((val) => val * 1000) : range;
  };

  // If no filters are applied, return all listings
  if (
    !selectedItems.regions.length &&
    !selectedItems.area.length &&
    !selectedItems.prices.length &&
    !selectedItems.rooms.length
  ) {
    return listings;
  }

  // Filter listings based on selected filter criteria
  return listings.filter((listing) => {
    const { city, bedrooms, area, price } = listing;

    // Check if listing matches region filter
    const matchesRegion =
      !selectedItems.regions.length ||
      selectedItems.regions.includes(city?.region_id);

    // Check if listing matches room filter
    const matchesRooms =
      !selectedItems.rooms.length ||
      selectedItems.rooms.includes(String(bedrooms));

    // Check if listing matches area filter
    const matchesArea =
      !selectedItems.area.length ||
      selectedItems.area.some((range) => {
        const [minArea, maxArea] = parseRange(range);
        return area >= minArea && area <= maxArea;
      });

    // Check if listing matches price filter
    const matchesPrice =
      !selectedItems.prices.length ||
      selectedItems.prices.some((range) => {
        const [minPrice, maxPrice] = parseRange(range, true);
        return price >= minPrice && price <= maxPrice;
      });

    // Return true if all filters match
    return matchesRegion && matchesRooms && matchesArea && matchesPrice;
  });
};

export default useFilterListings;
