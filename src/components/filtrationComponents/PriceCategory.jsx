import { useState, useEffect, useRef } from "react";
import FilterButton from "./FilterButton";
import { useFilterContext } from "../../context/ContextApi";
import useClickOutside from "../../customHooks/UseClickOutSide";

const PriceCategory = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lowPrice, setLowPrice] = useState("");
  const [highPrice, setHighPrice] = useState("");

  const { setSelectedItems } = useFilterContext();
  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setIsModalOpen(false));
  const pricePresets = [
    { low: "50,000 ₾", high: "50,000 ₾" },
    { low: "100,000 ₾", high: "100,000 ₾" },
    { low: "150,000 ₾", high: "150,000 ₾" },
    { low: "200,000 ₾", high: "200,000 ₾" },
    { low: "300,000 ₾", high: "300,000 ₾" },
  ];

  useEffect(() => {
    const storedItems =
      JSON.parse(localStorage.getItem("selectedOptions")) || {};
    const storedPrice = storedItems.prices?.[0] || "";
    if (storedPrice) {
      const [low, high] = storedPrice.split(" - ");
      setLowPrice(low);
      setHighPrice(high);
    }
  }, []);

  useEffect(() => {
    const updatedOptions = {
      prices: [lowPrice && highPrice ? `${lowPrice} - ${highPrice}` : ""],
    };
    localStorage.setItem("selectedOptions", JSON.stringify(updatedOptions));
    setSelectedItems((prev) => ({ ...prev, prices: updatedOptions.prices }));
  }, [lowPrice, highPrice]);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleApplySelection = () => {
    const priceRange = `${lowPrice} - ${highPrice}`;
    setSelectedItems((prev) => ({
      ...prev,
      prices: [priceRange],
    }));
    setIsModalOpen(false);
  };

  const handleLowPriceClick = (price) => {
    setLowPrice(price);
    if (
      parseFloat(price.replace(",", "")) >
      parseFloat(highPrice.replace(",", ""))
    ) {
      setHighPrice(price);
    }
  };

  const handleHighPriceClick = (price) => {
    setHighPrice(price);
    if (
      parseFloat(price.replace(",", "")) < parseFloat(lowPrice.replace(",", ""))
    ) {
      setLowPrice(price);
    }
  };

  return (
    <div className="relative">
      <FilterButton
        label="არჩევა ფასით"
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
        <p className="text-[16px] font-[500]">ფართობის მიხედვით</p>

        <div className="flex gap-4 mt-4">
          <div className="flex-1">
            <input
              type="text"
              value={lowPrice}
              onChange={(e) => setLowPrice(e.target.value)}
              placeholder="დან ₾"
              className="w-full p-2 border border-[#808A93] rounded-md mb-4"
            />
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-[500] mb-[16px]">მინ. ფასი</p>
              {pricePresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleLowPriceClick(preset.low)}
                  className={`text-[14px] font-[400] text-start `}
                >
                  {preset.low}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1">
            <input
              type="text"
              value={highPrice}
              onChange={(e) => setHighPrice(e.target.value)}
              placeholder="დან ₾"
              className="w-full p-2 border border-[#808A93] rounded-md mb-4"
            />
            <div className="flex flex-col gap-2">
              <p className="text-[14px] font-[500] mb-[16px]">მაქს. ფასი</p>
              {pricePresets.map((preset, index) => (
                <button
                  key={index}
                  onClick={() => handleHighPriceClick(preset.high)}
                  className={`text-[14px] rounded-[18px] font-[400] text-start`}
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

export default PriceCategory;
