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
              <div
                style={{ letterSpacing: "0.48px" }}
                className="absolute top-[23px] left-[23px] p-[6px] rounded-[15px] text-[white] font-[500] text-[12px] bg-[#02152680]"
              >
                {listing.is_rental ? "ქირავდება" : "იყიდება"}
              </div>
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
                  className="text-[28px] pl-[15px]  text-[#021526] font-700"
                  gutterBottom
                  variant="h5"
                  component="div"
                >
                  {formatPrice(listing.price)}
                </Typography>
                <div className="flex flex-col gap-[10px] pl-[15px] text-[16px] text-[#021526B2]">
                  <div className="flex text-[#021526B2]">
                    <img src="/location-marker.svg" alt="" />{" "}
                    {listing.city.name} , {listing.address}
                  </div>

                  <div className="flex items-center gap-[32px]">
                    <div className="flex gap-[5px] ">
                      <img src="/bed.svg" alt="" />{" "}
                      <span className="text-[16px] text-[#021526B2]">
                        {" "}
                        {listing.bedrooms}
                      </span>
                    </div>

                    <div className="flex gap-[5px] ">
                      <img src="/Vector (6).svg" alt="" />
                      <span>{listing.area}</span> <span>მ ²</span>
                    </div>
                    <div className="flex gap-[5px] ">
                      <img src="/Vector (7).svg" alt="" />
                      <span>{listing.zip_code}</span>
                    </div>
                  </div>
                </div>
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
