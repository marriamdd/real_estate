import { useEffect, useState } from "react";

const url = "https://api.real-estate-manager.redberryinternship.ge/api/cities";
const token = "9d00259e-59b1-40f6-b6a7-9d6b8d20b8b0";

export const useFetchCities = () => {
  const [cities, setCities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCities(data);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch agents:", error);
      }
    };

    fetchCities();
  }, []);

  return { cities, error };
};
