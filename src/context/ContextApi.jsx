import { createContext, useContext, useState, useEffect } from "react";

const FilterContext = createContext();

// eslint-disable-next-line react/prop-types
export const FilterProvider = ({ children }) => {
  const [estates, setEstates] = useState();
  const [agents, setAgents] = useState();

  const [allSelectedCategory, setAllSelectedCategory] = useState([]);
  const [selectedItems, setSelectedItems] = useState(() => {
    const storedItems = localStorage.getItem("selectedOptions");
    if (storedItems) {
      const parsedItems = JSON.parse(storedItems);
      console.log("Retrieved from localStorage:", parsedItems);
      return parsedItems;
    }

    return { regions: [], prices: [], area: [], rooms: [] };
  });
  const [options, setOptions] = useState([]);

  useEffect(() => {
    console.log("Saving to localStorage:", selectedItems);
    localStorage.setItem("selectedOptions", JSON.stringify(selectedItems));
  }, [selectedItems]);

  return (
    <FilterContext.Provider
      value={{
        selectedItems,
        setSelectedItems,
        options,
        setOptions,
        agents,
        setAgents,
        estates,
        setEstates,
        allSelectedCategory,
        setAllSelectedCategory,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
