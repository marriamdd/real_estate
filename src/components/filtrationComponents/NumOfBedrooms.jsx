import { useRef, useState } from "react";
import FilterButton from "./FilterButton";
import { useFilterContext } from "../../context/ContextApi";
import useClickOutside from "../../customHooks/UseClickOutSide";

export default function NumOfBedrooms() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedItems } = useFilterContext();
  const [roomsNum, setRoomsNum] = useState("");

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setIsModalOpen(false));
  const handleApplySelection = () => {
    setSelectedItems((prev) => ({
      ...prev,
      rooms: [roomsNum],
    }));
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="relative">
        <FilterButton
          label={"საძინებლების რაოდენობა"}
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
        />

        <div
          ref={modalRef}
          className={`absolute w-[282px] p-6 flex flex-col gap-4 rounded-lg border border-[#DBDBDB] bg-white shadow-lg transition-all duration-300 
          ${
            isModalOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 invisible"
          } z-0`}
          style={{ top: "50px", zIndex: 10, left: 0 }}
        >
          <p className="text-[16px] font-[500]">საძინებლების რაოდენობა</p>

          <div className="flex gap-4 mt-4">
            <div className="flex-1">
              <input
                min={1}
                type="number"
                value={roomsNum}
                onChange={(e) => setRoomsNum(e.target.value)}
                className="w-[50px] p-2 border border-[#808A93] rounded-md mb-4"
              />
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
    </div>
  );
}
