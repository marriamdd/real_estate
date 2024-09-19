import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import useGetListing from "./listings/GetListing";
import { useFilterContext } from "../context/ContextApi";

const formatNumber = (num) => {
  if (isNaN(num)) return "Invalid Number";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const formatPrice = (price) => {
  return `${formatNumber(price)} ₾`;
};

const formatRange = (range, isPrice = false) => {
  const [min, max] = range;
  if (isPrice) {
    return `${formatPrice(min)} - ${formatPrice(max)}`;
  } else {
    return `${formatNumber(min)} m² - ${formatNumber(max)} m²`;
  }
};

export default function ActionAreaCard() {
  const { selectedItems } = useFilterContext();
  const { listings } = useGetListing();

  const parseRange = (rangeStr, isPrice = false) => {
    const range = rangeStr
      .replace(/[^\d -]/g, "")
      .split("-")
      .map((val) => parseFloat(val.trim()));
    return isPrice ? range.map((val) => val * 1000) : range;
  };

  const filterListings = () => {
    if (
      selectedItems.regions.length === 0 &&
      selectedItems.area.length === 0 &&
      selectedItems.prices.length === 0 &&
      selectedItems.rooms.length === 0
    ) {
      return listings;
    }

    return listings.filter((listing) => {
      const { city, bedrooms, area, price } = listing;

      const matchesRegion =
        selectedItems.regions.length === 0 ||
        selectedItems.regions.includes(city?.region_id);

      const matchesRooms =
        selectedItems.rooms.length === 0 ||
        selectedItems.rooms.includes(String(bedrooms));

      const matchesArea =
        selectedItems.area.length === 0 ||
        selectedItems.area.some((range) => {
          const [minArea, maxArea] = parseRange(range);
          return area >= minArea && area <= maxArea;
        });

      const matchesPrice =
        selectedItems.prices.length === 0 ||
        selectedItems.prices.some((range) => {
          const [minPrice, maxPrice] = parseRange(range, true);
          return price >= minPrice && price <= maxPrice;
        });

      return matchesRegion && matchesRooms && matchesArea && matchesPrice;
    });
  };

  const filteredListings = filterListings();

  return (
    <div className="flex flex-wrap gap-[10px] mt-[32px] rounded-[14px]">
      {filteredListings.length > 0 ? (
        filteredListings.map((listing) => (
          <Card
            key={listing.id}
            sx={{ width: 385, marginBottom: 2, height: 455 }}
          >
            <CardActionArea>
              <div
                className="absolute top-[23px] left-[23px] p-[6px] rounded-[15px] text-[white] font-[500] text-[12px] bg-[#02152680]"
                style={{ letterSpacing: "0.48px" }}
              >
                {listing.is_rental ? "ქირავდება" : "იყიდება"}
              </div>
              <CardMedia
                component="img"
                height="307"
                image={
                  listing.image ||
                  "/static/images/cards/contemplative-reptile.jpg"
                }
                alt={
                  listing.city?.name
                    ? `Image of property in ${listing.city.name}`
                    : "Real Estate Image"
                }
                sx={{ objectFit: "cover" }}
              />
              <CardContent>
                <Typography
                  className="text-[28px] pl-[15px] text-[#021526] font-700"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {formatPrice(listing.price)}
                </Typography>
                <div className="flex flex-col gap-[10px] pl-[15px] text-[16px] text-[#021526B2]">
                  <div className="flex text-[#021526B2] items-center gap-[5px]">
                    <img
                      src="/location-marker.svg"
                      alt="Location marker icon"
                    />
                    {listing.city.name}, {listing.address}
                  </div>
                  <div className="flex items-center gap-[32px]">
                    <div className="flex items-center gap-[5px]">
                      <img src="/bed.svg" alt="Bed icon" />
                      <span className="text-[16px] text-[#021526B2]">
                        {listing.bedrooms}
                      </span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <img src="/Vector (6).svg" alt="Area icon" />
                      <span>{formatRange([listing.area, listing.area])}</span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <img src="/Vector (7).svg" alt="Zip code icon" />
                      <span>{listing.zip_code}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <p className="text-[20px] text-[#021526CC] pl-[5px] pt-[35px] font-[400]">
          აღნიშნული მონაცემებით განცხადება არ იძებნება
        </p>
      )}
    </div>
  );
}
