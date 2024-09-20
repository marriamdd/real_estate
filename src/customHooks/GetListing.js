import { useEffect, useState } from "react";

const url =
  "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";
const token = "9d0ec126-58d8-487a-b170-8661729e6d72";
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
