import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import useGetListing from "./listings/GetListing";

export default function ActionAreaCard() {
  const { listings } = useGetListing();
  console.log(listings, "listings from useGetListing");
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " ₾";
  };
  return (
    <div className="flex flex-wrap gap-[10px] mt-[32px] rounded-[14px]">
      {listings && listings.length > 0 ? (
        listings.map((listing) => (
          <Card
            key={listing.id}
            height="455"
            sx={{ width: 385, marginBottom: 2, height: 455 }}
          >
            <CardActionArea>
              <CardMedia
                component="img"
                height="307" // Updated height to 307px
                image={
                  listing.image ||
                  "/static/images/cards/contemplative-reptile.jpg"
                }
                alt={listing.city?.name || "Real Estate Image"}
                sx={{ objectFit: "cover" }} // Ensure the image covers the container
              />
              <CardContent>
                <Typography
                  className="text-[28px] text-[#021526] font-700"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {formatPrice(listing.price)}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {listing.address || "No address available"}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Price:{" "}
                  {listing.price ? `$${listing.price}` : "No price available"}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Bedrooms: {listing.bedrooms}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  Area: {listing.area} sq. ft.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))
      ) : (
        <Typography variant="h6">Loading Listings...</Typography>
      )}
    </div>
  );
}
