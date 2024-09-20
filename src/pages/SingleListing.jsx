import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import EstateDetails from "../components/currentestate/EstateDetails";
import SimilarLocationEstates from "../components/SimilarLocationEstates";

export default function SingleListing() {
  const { id } = useParams();
  const [currentEstate, setCurrentEstate] = useState(null);
  const token = "9d0ec126-58d8-487a-b170-8661729e6d72";
  useEffect(() => {
    const fetchSingleEstate = async () => {
      try {
        const fetchingEstate = await fetch(
          `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const estateData = await fetchingEstate.json();
        setCurrentEstate(estateData);
      } catch (error) {
        console.error("Failed to fetch estate:", error);
      }
    };
    fetchSingleEstate();
  }, [id]);

  console.log(currentEstate, "curr");
  const navigate = useNavigate();
  return (
    <div className="pb-[230px]">
      <img
        onClick={() => navigate("/")}
        className="pt-[64px] cursor-pointer pb-[24px]"
        src="/Icon Right (1).svg"
        alt="back home"
      />
      <EstateDetails currentEstate={currentEstate} />
      <p className="text-[32px] text-[#021526] pt-[97px] pb-[52px] font-[500]">
        ბინები მსგავს ლოკაციაზე
      </p>
      <SimilarLocationEstates currentEstate={currentEstate} />
    </div>
  );
}
