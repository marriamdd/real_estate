import { Carousel } from "antd";
import useFilterByRegion from "../customHooks/FilterByRegion.js";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { formatPrice } from "../../public/utils/formatPrice.js";
import { formatRange } from "../../public/utils/formatRange.js";

// eslint-disable-next-line react/prop-types
const SimilarLocationEstates = ({ currentEstate }) => {
  const filteredListings = useFilterByRegion({ currentEstate });

  return (
    <Carousel
      infinite
      slidesToShow={4}
      dots={false}
      swipeToSlide
      draggable
      prevArrow={
        filteredListings.length > 4 ? (
          <img src="/Icon Right (1).svg" alt="" />
        ) : null
      }
      nextArrow={
        filteredListings.length > 4 ? (
          <img src="/Icon Right.svg" alt="" />
        ) : null
      }
    >
      {filteredListings.length > 0 ? (
        filteredListings.map((listing) => (
          <Link to={`/listing/${listing.id}`} key={listing.id}>
            <Card sx={{ width: 385, marginBottom: 2, height: 455 }}>
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
                  image={listing?.image}
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
          </Link>
        ))
      ) : (
        <div></div>
      )}
    </Carousel>
  );
};

export default SimilarLocationEstates;
