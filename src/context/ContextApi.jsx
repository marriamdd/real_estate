import { createContext, useContext, useState, useEffect } from "react";

const FilterContext = createContext();

// eslint-disable-next-line react/prop-types
export const FilterProvider = ({ children }) => {
  const [selectedItems, setSelectedItems] = useState(() => {
    const storedItems = localStorage.getItem("selectedOptions");
    return storedItems ? JSON.parse(storedItems) : { regions: [], prices: [] };
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
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
