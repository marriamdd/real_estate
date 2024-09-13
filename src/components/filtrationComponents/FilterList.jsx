import { useFilterContext } from "../../context/ContextApi";
import RegionsContainer from "../RegionsContainer";
import PriceCategory from "./PriceCategory";
import { CloseOutlined } from "@ant-design/icons";
import { Tag } from "antd";

export default function FilterList() {
  const { selectedItems, setSelectedItems, options } = useFilterContext();

  const handleRemoveItem = (item) => {
    let updatedItems = {};

    if (selectedItems.regions.includes(item)) {
      updatedItems = {
        ...selectedItems,
        regions: selectedItems.regions.filter((selected) => selected !== item),
      };
    }

    if (selectedItems.prices.includes(item)) {
      updatedItems = {
        ...selectedItems,
        prices: selectedItems.prices.filter((selected) => selected !== item),
      };
    }

    setSelectedItems(updatedItems);
  };

  const allSelectedItems = [...selectedItems.regions, ...selectedItems.prices];

  return (
    <div className=" flex flex-col p-[6px] gap-[24px]">
      <div className="flex rounded-[10px] border border-[#DBDBDB] bg-[#fff]">
        <RegionsContainer />
        <PriceCategory />
      </div>
      <div className=" flex gap-[4px]">
        {allSelectedItems.map((item, index) => (
          <Tag
            style={{ color: " rgba(2, 21, 38, 0.80)" }}
            className="text-[14px] font-[400]   h-[29px] flex items-center rounded-[43px]"
            key={index}
            closable
            onClose={() => handleRemoveItem(item)}
            closeIcon={<CloseOutlined />}
          >
            {options.find((option) => option.value === item)?.label || item}
          </Tag>
        ))}
      </div>
    </div>
  );
}
