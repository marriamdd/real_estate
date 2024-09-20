import { useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import EstateDetails from "../components/currentestate/EstateDetails";

export default function SingleListing() {
  const { id } = useParams();
  const [currentEstate, setCurrentEstate] = useState(null);
  const token = "9d00259e-59b1-40f6-b6a7-9d6b8d20b8b0";
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
    <div>
      <img
        onClick={() => navigate("/")}
        className="pt-[64px] cursor-pointer pb-[24px]"
        src="/Icon Right (1).svg"
        alt="back home"
      />
      <EstateDetails currentEstate={currentEstate} />
    </div>
  );
}
