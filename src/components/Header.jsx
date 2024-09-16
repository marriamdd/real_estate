import { useNavigate } from "react-router-dom";
import { useFetchAgents } from "./agents/GetAgents";

export default function Header() {
  const navigate = useNavigate();
  const { agents } = useFetchAgents();
  console.log(agents);
  return (
    <div className="w-full pb-[30px] py-[38px] border-b border-b-[ #DBDBDB]">
      <img
        onClick={() => navigate("/")}
        className="w-[150px] h-[24px]  ml-[162px]"
        src="/31a111bebc15f4f9df757da172ce198d.png"
        alt="logo"
      />
    </div>
  );
}
