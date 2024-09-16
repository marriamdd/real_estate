export default function AgentComponent() {
  return (
    <div className="w-[503px] h-[174px] border border-[#DBDBDB] rounded-[8px] py-[24px] px-[20px]">
      <div className="flex">
        <div className="w-[50px] h-[50px] bg-[red]"></div>
        <div className="flex flex-col">
          <p>sopo gelovani</p>
          <span>აგენტი</span>
        </div>
      </div>
      <div>
        <div className="flex gap-[5px]">
          <img src="/Shape.svg" alt="gmail_icon" />
          <p>gmail</p>
        </div>
        <div className="flex gap-[5px]">
          <img src="/Vector (2).svg" alt="mobile_icon" />
          <p>number</p>
        </div>
      </div>
    </div>
  );
}
