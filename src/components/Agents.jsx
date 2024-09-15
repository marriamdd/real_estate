import { useEffect } from "react";

import { useFilterContext } from "../context/ContextApi";

const url = "https://api.real-estate-manager.redberryinternship.ge/api/agents";
const token = "9d00259e-59b1-40f6-b6a7-9d6b8d20b8b0";

const Agents = () => {
  const { agents, setAgents } = useFilterContext();
  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);

        setAgents(data);
      } catch (error) {
        console.error("Failed to fetch regions:", error);
      }
    };

    fetchRegions();
  }, []);
  console.log(agents, "getting agent");
  return <div></div>;
};

export default Agents;
