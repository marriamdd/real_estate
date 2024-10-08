import { useFilterContext } from "../../context/ContextApi";
import AgentFormModal from "../agents/AddAgent";
import RegionsContainer from "../RegionsContainer";

import AddListing from "./AddListing";
import AreaCategory from "./AreaCategory";
import NumOfBedrooms from "./NumOfBedrooms";
import PriceCategory from "./PriceCategory";
import { CloseOutlined } from "@ant-design/icons";
import { Tag } from "antd";

export default function FilterList() {
  const { selectedItems, setSelectedItems, options, setTempSelectedItems } =
    useFilterContext();

  console.log(selectedItems, "selectedItems");
  const handleRemoveItem = (item) => {
    let updatedItems = { ...selectedItems };

    if (selectedItems.regions.includes(item)) {
      updatedItems.regions = selectedItems.regions.filter(
        (selected) => selected !== item
      );
      setTempSelectedItems((prev) => prev.filter((pr) => pr !== item));
    }

    if (selectedItems.prices.includes(item)) {
      updatedItems.prices = selectedItems.prices.filter(
        (selected) => selected !== item
      );
    }

    if (selectedItems.area.includes(item)) {
      updatedItems.area = selectedItems.area.filter(
        (selected) => selected !== item
      );
    }
    if (selectedItems.rooms.includes(item)) {
      updatedItems.rooms = selectedItems.rooms.filter(
        (selected) => selected !== item
      );
    }

    setSelectedItems(updatedItems);
  };

  const allSelectedItems = [
    ...selectedItems.regions,
    ...selectedItems.prices,
    ...selectedItems.area,
    ...selectedItems.rooms,
  ];

  const handleRemoveFlirtations = () => {
    setTempSelectedItems([]);
    localStorage.removeItem("selectedOptions");

    setSelectedItems({
      area: [],

      prices: [],

      regions: [],

      rooms: [],
    });
  };
  return (
    <div className="flex flex-col p-[6px] mt-[77px] gap-[24px]">
      <div className="flex justify-between">
        <div className="flex gap-[24px] p-[6px] rounded-[10px] border border-[#DBDBDB] bg-[#fff]">
          <RegionsContainer />
          <PriceCategory />
          <AreaCategory />
          <NumOfBedrooms />
        </div>
        <div className="flex gap-[16px]">
          <AddListing />
          <AgentFormModal />
        </div>
      </div>

      {allSelectedItems.length > 0 && (
        <div className="flex gap-[4px] flex-wrap">
          {allSelectedItems.map((item, index) => (
            <Tag
              key={index}
              style={{ color: "rgba(2, 21, 38, 0.80)" }}
              className="text-[14px] px-[10px] font-[400] h-[29px] flex items-center rounded-[43px]"
              closable
              onClose={() => handleRemoveItem(item)}
              closeIcon={<CloseOutlined />}
            >
              {options.find((option) => option.value === item)?.label || item}
            </Tag>
          ))}
          <p
            onClick={() => handleRemoveFlirtations()}
            className="text-[15px] cursor-pointer font-[500]"
          >
            გასუფთავება
          </p>
        </div>
      )}
    </div>
  );
}
