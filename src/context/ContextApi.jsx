import { createContext, useContext, useState, useEffect } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState(() => {
    // Retrieve data from local storage
    const storedItems = localStorage.getItem("selectedOptions");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      console.log("Retrieved from localStorage:", parsedItems); // Debugging
      return parsedItems;
    }
    // Return default if nothing is found
    console.log("No data in localStorage, using default"); // Debugging
    return { regions: [], prices: [], area: [] };
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log("Saving to localStorage:", selectedItems); // Debugging
    localStorage.setItem("selectedOptions", JSON.stringify(selectedItems));
  }, [selectedItems]);

  return (
    <FilterContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        options,
        setOptions,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
