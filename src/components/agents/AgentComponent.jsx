/* eslint-disable react/prop-types */

export default function AgentComponent({ agent }) {
  const formateNumber = (num) => {
    return num?.replace(/(\d{3})(\d{2})(\d{2})(\d{2})/, "$1 $2 $3 $4");
  };
  return (
    <div className="w-[503px] h-[174px] flex flex-col gap-[14px] text-[#676E76] border border-[#DBDBDB] rounded-[8px] py-[24px] px-[20px]">
      <div className="flex gap-[14px]">
        <div className="">
          {" "}
          <img
            className="rounded-[100px] w-[75px] h-[75px]"
            src={agent?.avatar}
            alt=""
          />
        </div>
        <div className="flex flex-col">
          <p className="text-[16px] text-[#021526] font-[400]">
            {agent?.name} {agent?.surname}
          </p>
          <span className="text-[14px]">აგენტი</span>
        </div>
      </div>
      <div>
        <div className="flex text-[14px] gap-[8px]">
          <img src="/Shape.svg" alt="gmail_icon" />
          <p>{agent?.email}</p>
        </div>
        <div className="flex text-[14px] gap-[8px]">
          <img src="/Vector (2).svg" alt="mobile_icon" />
          <p>{formateNumber(agent?.phone)}</p>
        </div>
      </div>
    </div>
  );
}
