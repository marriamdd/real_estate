import FilterList from "../components/filtrationComponents/FilterList";
import useGetListing from "../components/listings/GetListing";
import ActionAreaCard from "../components/ListItemPattern";

export default function ListingPage() {
  const { listings } = useGetListing();
  console.log(listings, "listingslistingssssssssssssssss");
  return (
    <div>
      {" "}
      <FilterList />
      <ActionAreaCard />
    </div>
  );
}
