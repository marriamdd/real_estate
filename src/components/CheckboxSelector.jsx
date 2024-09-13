import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Checkbox, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import FilterButton from "./FilterButton";

const CheckboxSelector = ({ options }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(
    JSON.parse(localStorage.getItem("selectedOptions"))
  );
  const [tempSelectedItems, setTempSelectedItems] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem("selectedOptions")) || [];
    setSelectedItems(storedItems);
    setTempSelectedItems(storedItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedOptions", JSON.stringify(selectedItems));
  }, [selectedItems]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedTempItems = checked
      ? [...tempSelectedItems, value]
      : tempSelectedItems.filter((item) => item !== value);

    setTempSelectedItems(updatedTempItems);
  };

  const applySelection = () => {
    setSelectedItems(tempSelectedItems);
    setIsModalOpen(false);
  };

  const removeSelectedItem = (value) => {
    const updatedItems = selectedItems.filter((item) => item !== value);
    setSelectedItems(updatedItems);
    setTempSelectedItems(updatedItems);
    localStorage.setItem("selectedOptions", JSON.stringify(updatedItems));
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const getColumns = (items, itemsPerColumn) => {
    const columns = [];
    for (let i = 0; i < items.length; i += itemsPerColumn) {
      columns.push(items.slice(i, i + itemsPerColumn));
    }
    return columns;
  };

  const columns = getColumns(options, 4);

  return (
    <div className="flex gap-4">
      <FilterButton
        label="რეგიონი"
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />

      <div
        ref={modalRef}
        className={`absolute w-[731px] p-6 flex flex-col items-start gap-8 rounded-lg border border-[#DBDBDB] bg-white shadow-lg transition-all duration-300 
        ${
          isModalOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 invisible"
        } z-0`}
        style={{ top: "140px", zIndex: 10 }}
      >
        <p className="text-lg font-semibold">რეგიონის მიხედვით</p>
        <div className="grid grid-cols-3 w-[679px] gap-[50px]">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-4">
              {column.map((option) => (
                <Checkbox
                  key={option.value}
                  value={option.value}
                  checked={tempSelectedItems.includes(option.value)}
                  onChange={handleCheckboxChange}
                  className="custom-checkbox"
                >
                  {option.label}
                </Checkbox>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full justify-end items-center flex">
          <button
            onClick={applySelection}
            className="py-[8px] text-[#FFF] text-[14px] font-[500] px-[14px] bg-[#F93B1D] rounded-[8px] gap-[2px]"
          >
            არჩევა
          </button>
        </div>
      </div>
      <div className="mt-6 flex gap-2">
        {selectedItems.map((item) => (
          <Tag
            key={item}
            closable
            onClose={() => removeSelectedItem(item)}
            closeIcon={<CloseOutlined />}
          >
            {options.find((option) => option.value === item)?.label || item}
          </Tag>
        ))}
      </div>
    </div>
  );
};

CheckboxSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CheckboxSelector;
