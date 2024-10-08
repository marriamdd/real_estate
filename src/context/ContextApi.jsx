import { createContext, useContext, useState, useEffect } from "react";

const FilterContext = createContext();

// eslint-disable-next-line react/prop-types
export const FilterProvider = ({ children }) => {
  const [addingAgentModal, setAddingAgentModal] = useState(false);
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
  const [tempSelectedItems, setTempSelectedItems] = useState([]);
  const [lowValue, setLowValue] = useState("");
  const [highValue, setHighValue] = useState("");
  return (
    <FilterContext.Provider
      value={{
        lowValue,
        setLowValue,
        highValue,
        setHighValue,
        tempSelectedItems,
        setTempSelectedItems,
        selectedItems,
        setSelectedItems,
        options,
        setOptions,
        agents,
        setAgents,
        addingAgentModal,
        setAddingAgentModal,
        allSelectedCategory,
        setAllSelectedCategory,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
