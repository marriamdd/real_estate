import { Carousel } from "antd";
import useFilterByRegion from "../customHooks/FilterByRegion.js";

const contentStyle = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

const SimilarLocationEstates = ({ currentEstate }) => {
  const filteredListings = useFilterByRegion({ currentEstate });

  return (
    <Carousel
      arrows
      infinite={true}
      slidesToShow={4}
      dots={false}
      swipeToSlide={true}
      dotsRender={false}
      draggable
    >
      {filteredListings.length > 0 ? (
        filteredListings.map((listing) => (
          <div key={listing.id}>
            <h3 style={contentStyle}>{listing.address}</h3>
            {/* You can add more details about the listing here */}
          </div>
        ))
      ) : (
        <div>
          <h3 style={contentStyle}>No listings available</h3>
        </div>
      )}
    </Carousel>
  );
};

export default SimilarLocationEstates;
