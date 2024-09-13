import { useState } from "react";
import FilterButton from "./FilterButton"; // Assuming the path is correct

const FilterButtonsGroup = () => {
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [isModalOpen3, setIsModalOpen3] = useState(false);
  const [isModalOpen4, setIsModalOpen4] = useState(false);
  const [isModalOpen5, setIsModalOpen5] = useState(false);

  return (
    <div className="flex gap-4">
      <FilterButton
        label="არჩევა ფასით"
        isModalOpen={isModalOpen1}
        toggleModal={setIsModalOpen1}
      />
      <FilterButton
        label="რეგიონი"
        isModalOpen={isModalOpen2}
        toggleModal={setIsModalOpen2}
      />
      <FilterButton
        label="კატეგორია"
        isModalOpen={isModalOpen3}
        toggleModal={setIsModalOpen3}
      />
      <FilterButton
        label="მდგომარეობა"
        isModalOpen={isModalOpen4}
        toggleModal={setIsModalOpen4}
      />
      <FilterButton
        label="ფასის კატეგორია"
        isModalOpen={isModalOpen5}
        toggleModal={setIsModalOpen5}
      />
    </div>
  );
};

export default FilterButtonsGroup;
