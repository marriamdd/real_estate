import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Checkbox } from "antd";
import FilterButton from "../filtrationComponents/FilterButton";
import { useFilterContext } from "../../context/ContextApi";
import useClickOutside from "../../customHooks/UseClickOutSide";

const CheckboxSelector = ({ options }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    selectedItems,
    setSelectedItems,
    tempSelectedItems,
    setTempSelectedItems,
  } = useFilterContext();

  const modalRef = useRef(null);

  useClickOutside(modalRef, () => setIsModalOpen(false));
  useEffect(() => {
    const storedOptions =
      JSON.parse(localStorage.getItem("selectedOptions")) || {};

    const regions = storedOptions.regions || [];
    setTempSelectedItems(regions);
  }, []);

  useEffect(() => {
    const updatedOptions = { ...selectedItems, regions: tempSelectedItems };
    localStorage.setItem("selectedOptions", JSON.stringify(updatedOptions));
  }, [tempSelectedItems, selectedItems]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedTempItems = checked
      ? [...tempSelectedItems, value]
      : tempSelectedItems.filter((item) => item !== value);

    setTempSelectedItems(updatedTempItems);
  };

  const applySelection = () => {
    setSelectedItems((prev) => ({ ...prev, regions: tempSelectedItems }));
    setIsModalOpen(false);
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
    <div className="flex gap-4 flex-col">
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
        style={{ top: "230px", zIndex: 10 }}
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
