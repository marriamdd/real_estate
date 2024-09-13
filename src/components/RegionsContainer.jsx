import { useState, useEffect } from "react";
import CheckboxSelector from "../components/CheckboxSelector";

const RegionsContainer = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await fetch(
          "https://api.real-estate-manager.redberryinternship.ge/api/regions",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        const data = await response.json();
        console.log(data);

        const formattedOptions = data.map((region) => ({
          value: region.id,
          label: region.name,
        }));

        setOptions(formattedOptions);
      } catch (error) {
        console.error("Failed to fetch regions:", error);
      }
    };

    fetchRegions();
  }, []);
  console.log(options);
  return (
    <div>
      <CheckboxSelector options={options} />
    </div>
  );
};

export default RegionsContainer;
