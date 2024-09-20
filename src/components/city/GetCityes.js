import { useEffect, useState } from "react";

const url = "https://api.real-estate-manager.redberryinternship.ge/api/cities";
const token = "9d0ec126-58d8-487a-b170-8661729e6d72";

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
