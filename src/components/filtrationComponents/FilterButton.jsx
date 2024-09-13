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
    <div className="relative ">
      <button
        onClick={() => toggleModal((prev) => !prev)}
        className="text-lg flex items-center gap-2 relative py-[8px] px-[14px] z-10"
      >
        {label}
        <DownOutlined
          className={`transition-transform duration-300 ${
            isModalOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
    </div>
  );
};

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isModalOpen: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
};

export default FilterButton;
