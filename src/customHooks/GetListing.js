import { useEffect, useState } from "react";

const url =
  "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";
const token = "9d00259e-59b1-40f6-b6a7-9d6b8d20b8b0";
const useGetListing = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchListings = async () => {
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
        setListings(data);
      } catch (error) {
        setError(error.message);
        console.error("Failed to fetch agents:", error);
      }
    };

    fetchListings();
  }, []);
  return { listings, setListings, error };
};

export default useGetListing;
