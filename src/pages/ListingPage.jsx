import FilterList from "../components/filtrationComponents/FilterList";
// import { useGetListing } from "../customHooks/GetListing.js";
import ActionAreaCard from "../components/ListItemPattern";
import useGetListing from "../customHooks/GetListing";

export default function ListingPage() {
  const { listings } = useGetListing();
  console.log(listings, "listingslistingssssssssssssssss");
  return (
    <div>
      <FilterList />
      <ActionAreaCard />
    </div>
  );
}
