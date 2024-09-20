/* eslint-disable react/prop-types */

import AgentComponent from "../agents/AgentComponent";
import DeleteEstate from "../DeleteEstate";
import { formatPrice } from "../ListItemPattern";

export default function EstateDetails({ currentEstate }) {
  console.log(currentEstate, "currentEstate from details");
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = String(date.getUTCFullYear()).slice(-2);

    return `${day}/${month}/${year}`;
  }

  return (
    <div className="flex gap-[68px]">
      <div className="relative">
        <img
          className="w-[839px] h-[670px]"
          src={currentEstate?.image}
          alt=""
        />
        <div
          className="absolute top-[23px] left-[23px] p-[6px] rounded-[15px] text-[white] font-[500] text-[12px] bg-[#02152680]"
          style={{ letterSpacing: "0.48px" }}
        >
          {currentEstate?.is_rental ? "ქირავდება" : "იყიდება"}
        </div>
        <div className="flex gap-[16px] pt-[5px] text-[16px] font-[400] justify-end text-[#808A93]">
          <span>გამოქვეყნების თარიღი</span>
          <span>{formatDate(currentEstate?.created_at)}</span>
        </div>
      </div>
      <div className="">
        <h2 className="text-[#021526] pb-[24px] text-[48px] font-[700]">
          {formatPrice(currentEstate?.price)}
        </h2>
        <div className="flex flex-col gap-[16px] pl-[15px] font-[400] text-[24px] text-[#021526B2]">
          <div className="flex text-[#021526B2] items-center gap-[10px]">
            <img
              className="w-[22px] h-[22px]"
              src="/location-marker.svg"
              alt="Location marker icon"
            />
            {currentEstate?.city.name}, {currentEstate?.address}
          </div>
          <div className="flex items-center gap-[10px]">
            <img
              className="w-[22px] h-[22px]"
              src="/Vector (6).svg"
              alt="Area icon"
            />
            <span>{`ფართი ${currentEstate?.area} მ²`}</span>
          </div>
          <div className="flex items-center gap-[10px]">
            <img className="w-[22px] h-[22px]" src="/bed.svg" alt="Bed icon" />
            <span className="text-[16px] text-[#021526B2]">
              {` საძინებელი ${currentEstate?.bedrooms}`}
            </span>
          </div>

          <div className="flex items-center gap-[10px]">
            <img
              className="w-[22px] h-[22px]"
              src="/Vector (7).svg"
              alt="Zip code icon"
            />
            <span>{`საფოსტო ინდექსი ${currentEstate?.zip_code}`}</span>
          </div>
          <div className="w-[503px]">
            <p className="pt-[30px] text-wrap text-[16px] leading-[26px] font-[400]">
              {currentEstate?.description}
            </p>
          </div>
          <AgentComponent agent={currentEstate?.agent} />
          <DeleteEstate id={currentEstate?.id} />
        </div>
      </div>
    </div>
  );
}
