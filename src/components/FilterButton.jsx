import { useRef, useEffect } from "react";
import { DownOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";

const FilterButton = ({ label, isModalOpen, toggleModal }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleModal]);

  return (
    <div className="relative flex gap-[24px]">
      <button
        onClick={() => toggleModal((prev) => !prev)}
        className="text-lg flex items-center gap-2 relative z-10"
      >
        {label}
        <DownOutlined
          className={`transition-transform duration-300 ${
            isModalOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <p>mm</p>
    </div>
  );
};

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default FilterButton;
