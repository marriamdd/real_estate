import useGetListing from "./GetListing";

const useFilterByRegion = ({ currentEstate }) => {
  const { listings } = useGetListing();

  return listings.filter((listing) => {
    const regionId = currentEstate?.city?.region_id;

    if (!regionId) {
      return false; // No region to match
    }

    // Check if the listing's region matches the current estate's region
    return listing.city?.region?.id === regionId;
  });
};

export default useFilterByRegion;
