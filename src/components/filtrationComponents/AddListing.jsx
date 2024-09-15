import { useNavigate } from "react-router-dom";

export default function AddListing() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => navigate("/addListing")}
        className="text-[16px] h-[100%] bg-[#F93B1D] rounded-[10px] text-[white] font-[500] py-[10px] px-[16px]"
      >
        + ლისტინგის დამატება
      </button>
    </div>
  );
}
