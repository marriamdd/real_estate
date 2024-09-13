import PropTypes from "prop-types";
import { useState, useRef } from "react";
import FilterButton from "./FilterButton";
import { useFilterContext } from "../../context/ContextApi";
import useClickOutside from "../../customHooks/UseClickOutSide";

const RangeSelector = ({
  presets,
  label,
  placeholderLow,
  placeholderHigh,
  minLabel,
  maxLabel,
  type, // New prop to specify the type (e.g., "price" or "area")
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lowValue, setLowValue] = useState("");
  const [highValue, setHighValue] = useState("");

  const { setSelectedItems } = useFilterContext();
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setIsModalOpen(false));

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleApplySelection = () => {
    const range = `${lowValue} - ${highValue}`;
    setSelectedItems((prev) => ({
      ...prev,
      [type]: [range],
    }));
    setIsModalOpen(false);
  };

  const handleLowValueClick = (value) => {
    setLowValue(value);
    if (
      parseFloat(value.replace(",", "")) >
      parseFloat(highValue.replace(",", ""))
    ) {
      setHighValue(value);
    }
  };

  const handleHighValueClick = (value) => {
    setHighValue(value);
    if (
      parseFloat(value.replace(",", "")) < parseFloat(lowValue.replace(",", ""))
    ) {
      setLowValue(value);
    }
  };

  return (
    <div className="relative">
      <FilterButton
        label={label}
        isModalOpen={isModalOpen}
        toggleModal={toggleModal}
      />

      <div
        ref={modalRef}
        className={`absolute w-[382px] p-6 flex flex-col gap-4 rounded-lg border border-[#DBDBDB] bg-white shadow-lg transition-all duration-300 
        ${
          isModalOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-10 invisible"
        } z-0`}
        style={{ top: "50px", zIndex: 10, left: 0 }}
      >
        <p className="text-[16px] font-[500]">{label}</p>

        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <input
              type="text"
              value={lowValue}
              onChange={(e) => setLowValue(e.target.value)}
              placeholder={placeholderLow}
              className="w-full p-2 border border-[#808A93] rounded-md mb-4"
            />
            <div className="flex flex-col gap-2">
              <p className="text-[14px] text-[#021526] font-bold mb-[5px]">
                {minLabel}
              </p>
              {presets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleLowValueClick(preset.low)}
                  className="text-[14px] font-[400] text-start"
                >
                  {preset.low}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <input
              type="text"
              value={highValue}
              onChange={(e) => setHighValue(e.target.value)}
              placeholder={placeholderHigh}
              className="w-full p-2 border border-[#808A93] rounded-md mb-4"
            />
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-bold mb-[5px]">{maxLabel}</p>
              {presets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleHighValueClick(preset.high)}
                  className="text-[14px] rounded-[18px] font-[400] text-start"
                >
                  {preset.high}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full justify-end items-center flex mt-4">
          <button
            onClick={handleApplySelection}
            className="py-[8px] text-[#FFF] text-[14px] font-[500] px-[14px] bg-[#F93B1D] rounded-[8px] gap-[2px]"
          >
            არჩევა
          </button>
        </div>
      </div>
    </div>
  );
};

RangeSelector.propTypes = {
  presets: PropTypes.arrayOf(
    PropTypes.shape({
      low: PropTypes.string.isRequired,
      high: PropTypes.string.isRequired,
    })
  ).isRequired,
  label: PropTypes.string.isRequired,
  placeholderLow: PropTypes.string.isRequired,
  placeholderHigh: PropTypes.string.isRequired,
  minLabel: PropTypes.string.isRequired,
  maxLabel: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["prices", "area"]).isRequired, // Specify the type prop
};

export default RangeSelector;
