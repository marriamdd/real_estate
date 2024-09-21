import { Spin } from "antd";
// eslint-disable-next-line react/prop-types
const ButtonPrimary = ({ text, type = "submit", onClick, loading }) => {
  return (
    <button
      type={type}
      className="py-[14px] px-4 bg-[#F93B1D] text-white rounded-[10px]"
      onClick={onClick}
      disabled={loading}
    >
      {loading ? <Spin /> : text}
    </button>
  );
};

export default ButtonPrimary;
