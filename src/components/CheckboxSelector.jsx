import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Checkbox, Tag } from "antd";
import { CloseOutlined, DownOutlined } from "@ant-design/icons";

const CheckboxSelector = ({ options }) => {
  const storedItems = JSON.parse(localStorage.getItem("selectedOptions"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(storedItems);
  const [tempSelectedItems, setTempSelectedItems] = useState([]);
  const modalRef = useRef(null);

  useEffect(() => {
    // Load selected items from localStorage
    const storedItems =
      JSON.parse(localStorage.getItem("selectedOptions")) || [];
    console.log("Loaded from localStorage:", storedItems); // Debugging line
    setSelectedItems(storedItems);
    setTempSelectedItems(storedItems); // Sync tempSelectedItems with selectedItems
  }, []);

  useEffect(() => {
    // Update localStorage whenever selectedItems changes
    console.log("Saving to localStorage:", selectedItems); // Debugging line
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
  };

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getColumns = (items, itemsPerColumn) => {
    const columns = [];
    for (let i = 0; i < items.length; i += itemsPerColumn) {
      columns.push(items.slice(i, i + itemsPerColumn));
    }
    return columns;
  };

  const columns = getColumns(options, 4);

  return (
    <div className="relative">
      <button
        onClick={toggleModal}
        className="text-lg flex items-center gap-2 relative z-10"
      >
        რეგიონი
        <DownOutlined
          className={`transition-transform duration-300 ${
            isModalOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>

      <div
        ref={modalRef}
        className={`absolute w-[731px] p-6 flex flex-col items-start gap-8 rounded-lg border border-[#DBDBDB] bg-white shadow-lg transition-all duration-300 
        ${
          isModalOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 invisible"
        } z-0`}
        style={{ top: "50px", zIndex: 10, left: 0 }}
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

// Define PropTypes for the component
CheckboxSelector.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CheckboxSelector;
