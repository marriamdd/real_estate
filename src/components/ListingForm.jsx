import { useState, useEffect, useRef } from "react";
import ButtonPrimary from "./ForListings.jsx/ButtonPrimary";

import { useFileUpload } from "./ForListings.jsx/useFileUpload";
import { useFormLogic } from "./ForListings.jsx/useFormLogic";
import { useNavigate } from "react-router-dom";
import useClickOutside from "../customHooks/UseClickOutSide";
import { useFilterContext } from "../context/ContextApi";
import AgentFormModal from "./agents/AddAgent";
import { useFetchAgents } from "./agents/GetAgents";
const AddListing = () => {
  const { setAddingAgentModal, addingAgentModal } = useFilterContext();
  const { register, handleSubmit, setValue, errors, isSubmitted, onSubmit } =
    useFormLogic("real-estates");
  const navigate = useNavigate();
  const agentModalRef = useRef();
  const regionRef = useRef();
  const cityRef = useRef();
  useClickOutside(agentModalRef, () => setShowAgentOptions(false));
  useClickOutside(regionRef, () => setShowRegionOptions(false));
  useClickOutside(cityRef, () => setShowCityOptions(false));
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [showRegionOptions, setShowRegionOptions] = useState(false);
  const [showCityOptions, setShowCityOptions] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedRegionId, setSelectedRegionId] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const { agents } = useFetchAgents();
  const [showAgentOptions, setShowAgentOptions] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);

  useEffect(() => {
    fetchRegions();
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedRegionId !== null) {
      const filtered = cities.filter(
        (city) => city.region_id === selectedRegionId
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
    }
  }, [selectedRegionId, cities]);

  const fetchRegions = async () => {
    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/regions"
      );
      const data = await response.json();
      setRegions(data);
    } catch (error) {
      console.error("Failed to fetch regions", error);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/cities"
      );
      const data = await response.json();
      setCities(data);
    } catch (error) {
      console.error("Failed to fetch cities", error);
    }
  };

  const handleRegionSelect = (region) => {
    setSelectedRegion(region.name);
    setSelectedRegionId(region.id);
    setValue("region_id", region.id);
    setShowRegionOptions(false);
    setSelectedCity(null);
    setValue("city_id", 0);
  };

  const handleCitySelect = (city) => {
    setSelectedCity(city.name);
    setValue("city_id", city.id);
    setShowCityOptions(false);
  };

  const { imagePreview, isPreviewVisible, handleFileChange, handleDelete } =
    useFileUpload();

  const handleAgentSelect = (agent) => {
    setSelectedAgent(agent.name);
    setValue("agent_id", agent.id);
    setShowAgentOptions(false);
  };
  const handleClick = () => {
    navigate("/");
    console.log("Button clicked");
  };
  return (
    <div className="mt-[62px] max-w-[790px] mx-auto text-black">
      <h1 className="font-medium text-[2rem] leading-[2.4rem] text-center">
        ლისტინგის დამატება
      </h1>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        {/* sell type */}
        <p className="mt-[61px] mb-2 font-medium text-blackSecondary leading-[1.221rem]">
          გარიგების ტიპი
        </p>
        <div className="flex items-center gap-20">
          <span className="radio flex justify-start items-center gap-2">
            <input
              {...register("is_rental", {
                required: true,
                valueAsNumber: true,
              })}
              type="radio"
              id="sell"
              value={0}
              checked
            />
            <label
              htmlFor="sell"
              className="radio-label text-sm leading-[1.05rem]"
            >
              იყიდება
            </label>
          </span>
          <span className="radio flex justify-start items-center gap-2">
            <input
              {...register("is_rental", {
                required: true,
                valueAsNumber: true,
              })}
              type="radio"
              id="rent"
              value={1}
            />
            <label
              htmlFor="rent"
              className="radio-label text-sm leading-[1.05rem]"
            >
              ქირავდება
            </label>
          </span>
        </div>

        <p className="mt-20 mb-2 font-medium text-blackSecondary leading-[1.221rem]">
          მდებარეობა
        </p>
        <div className="mt-[22px] grid grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="location"
              className="font-medium text-sm leading-[1.05rem]"
            >
              მისამართი *
            </label>
            <input
              {...register("address", { required: true, minLength: 2 })}
              type="text"
              id="location"
              className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${
                errors.address
                  ? "border-[#F93B1D]"
                  : isSubmitted
                  ? "border-[#45A849]"
                  : "border-black"
              } rounded-md`}
            />
            <div className="mt-1 flex items-center gap-[7px]">
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.40918L3.125 9.591L0 5.87199"
                  stroke={`${
                    errors.address
                      ? "#f93b1d"
                      : isSubmitted
                      ? "#45a849"
                      : "#021526"
                  }`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className={`text-sm leading-[1.05rem] ${
                  errors.address
                    ? "text-[#F93B1D]"
                    : isSubmitted
                    ? "text-[#45A849]"
                    : "text-black"
                }`}
              >
                მინიმუმ ორი სიმბოლო
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="postId"
              className="font-medium text-sm leading-[1.05rem]"
            >
              საფოსტო ინდექსი *
            </label>
            <input
              {...register("zip_code", { required: true, pattern: /^[0-9]+$/ })}
              type="text"
              id="postId"
              className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${
                errors.zip_code
                  ? "border-[#F93B1D]"
                  : isSubmitted
                  ? "border-[#45A849]"
                  : "border-black"
              } rounded-md`}
            />
            <div className="mt-1 flex items-center gap-[7px]">
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.40918L3.125 9.591L0 5.87199"
                  stroke={`${
                    errors.zip_code
                      ? "#f93b1d"
                      : isSubmitted
                      ? "#45a849"
                      : "#021526"
                  }`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className={`text-sm leading-[1.05rem] ${
                  errors.zip_code
                    ? "text-[#F93B1D]"
                    : isSubmitted
                    ? "text-[#45A849]"
                    : "text-black"
                }`}
              >
                მხოლოდ რიცხვები
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="region"
              className="font-medium text-sm leading-[1.05rem]"
            >
              რეგიონი
            </label>
            <div ref={regionRef} className="select-menu w-full relative">
              <div
                className={`select flex items-center justify-between px-[10px] py-3 border border-solid ${
                  errors.region_id
                    ? "border-[#F93B1D]"
                    : isSubmitted
                    ? "border-[#45A849]"
                    : "border-black"
                } rounded-lg cursor-pointer`}
                onClick={() => setShowRegionOptions(!showRegionOptions)}
              >
                <span className="text-sm leading-4 text-black">
                  {selectedRegion || "აირჩიეთ რეგიონი"}
                </span>
                <svg
                  className={`cityChevron transition-all duration-100 ${
                    showRegionOptions ? "rotate-180" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {showRegionOptions && (
                <div className="options-list absolute w-full mt-1 bg-white text-sm leading-4 border-solid max-h-40 border-grey rounded-lg shadow-lg z-10 overflow-y-auto customScroll transition-all duration-100">
                  {regions.map((region) => (
                    <div
                      key={region.id}
                      className="option py-2 px-4 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleRegionSelect(region)}
                    >
                      {region.name}
                    </div>
                  ))}
                </div>
              )}

              <input
                {...register("region_id", { required: true })}
                type="hidden"
                value={selectedRegion || ""}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="city"
              className="font-medium text-sm leading-[1.05rem]"
            >
              ქალაქი
            </label>
            <div ref={cityRef} className="select-menu w-full relative">
              <div
                className={`select flex items-center justify-between px-[10px] py-3 border border-solid ${
                  errors.city_id
                    ? "border-[#F93B1D]"
                    : isSubmitted
                    ? "border-[#45A849]"
                    : "border-black"
                } rounded-lg cursor-pointer`}
                onClick={() => setShowCityOptions(!showCityOptions)}
              >
                <span className="text-sm leading-4 text-black">
                  {selectedCity || "აირჩიეთ ქალაქი"}
                </span>
                <svg
                  className={`cityChevron transition-all duration-100 ${
                    showCityOptions ? "rotate-180" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {showCityOptions && (
                <div className="options-list absolute w-full mt-1 bg-white text-sm leading-4 border-solid max-h-40 border-grey rounded-lg shadow-lg z-10 overflow-y-auto customScroll transition-all duration-100">
                  {filteredCities.map((city) => (
                    <div
                      key={city.id}
                      className="option py-2 px-4 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleCitySelect(city)}
                    >
                      {city.name}
                    </div>
                  ))}
                </div>
              )}

              <input
                id="city"
                {...register("city_id", { required: true })}
                type="hidden"
                value={selectedCity || ""}
              />
            </div>
          </div>
        </div>

        <p className="mt-[100px] mb-2 font-medium text-blackSecondary leading-[1.221rem]">
          ბინის დეტალები
        </p>
        <div className="mt-[22px] grid grid-cols-2 gap-5">
          <div>
            <label
              htmlFor="price"
              className="font-medium text-sm leading-[1.05rem]"
            >
              ფასი
            </label>
            <input
              {...register("price", { required: true })}
              type="number"
              id="price"
              step="10000"
              min="10000"
              className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${
                errors.price
                  ? "border-[#F93B1D]"
                  : isSubmitted
                  ? "border-[#45A849]"
                  : "border-black"
              } rounded-md`}
            />
            <div className="mt-1 flex items-center gap-[7px]">
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.40918L3.125 9.591L0 5.87199"
                  stroke={`${
                    errors.price
                      ? "#f93b1d"
                      : isSubmitted
                      ? "#45a849"
                      : "#021526"
                  }`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className={`text-sm leading-[1.05rem] ${
                  errors.price
                    ? "text-[#F93B1D]"
                    : isSubmitted
                    ? "text-[#45A849]"
                    : "text-black"
                }`}
              >
                მხოლოდ რიცხვები
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="area"
              className="font-medium text-sm leading-[1.05rem]"
            >
              ფართობი
            </label>
            <input
              {...register("area", { required: true })}
              type="number"
              id="area"
              step="1"
              min="0"
              className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${
                errors.price
                  ? "border-[#F93B1D]"
                  : isSubmitted
                  ? "border-[#45A849]"
                  : "border-black"
              } rounded-md`}
            />
            <div className="mt-1 flex items-center gap-[7px]">
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.40918L3.125 9.591L0 5.87199"
                  stroke={`${
                    errors.area
                      ? "#f93b1d"
                      : isSubmitted
                      ? "#45a849"
                      : "#021526"
                  }`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className={`text-sm leading-[1.05rem] ${
                  errors.area
                    ? "text-[#F93B1D]"
                    : isSubmitted
                    ? "text-[#45A849]"
                    : "text-black"
                }`}
              >
                მხოლოდ რიცხვები
              </p>
            </div>
          </div>

          <div>
            <label
              htmlFor="bedrooms"
              className="font-medium text-sm leading-[1.05rem]"
            >
              საძინებლების რაოდენობა *
            </label>
            <input
              {...register("bedrooms", { required: true })}
              type="number"
              id="bedrooms"
              min={1}
              className={`mt-[5px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${
                errors.price
                  ? "border-[#F93B1D]"
                  : isSubmitted
                  ? "border-[#45A849]"
                  : "border-black"
              } rounded-md`}
            />
            <div className="mt-1 flex items-center gap-[7px]">
              <svg
                width="11"
                height="11"
                viewBox="0 0 11 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 1.40918L3.125 9.591L0 5.87199"
                  stroke={`${
                    errors.bedrooms
                      ? "#f93b1d"
                      : isSubmitted
                      ? "#45a849"
                      : "#021526"
                  }`}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p
                className={`text-sm leading-[1.05rem] ${
                  errors.bedrooms
                    ? "text-[#F93B1D]"
                    : isSubmitted
                    ? "text-[#45A849]"
                    : "text-black"
                }`}
              >
                მხოლოდ რიცხვები
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="description"
            className="font-medium text-sm leading-[1.05rem]"
          >
            აღწერა *
          </label>
          <textarea
            {...register("description", {
              required: true,
              validate: (value) => value.trim().split(/\s+/).length >= 5,
            })}
            id="description"
            className={`mt-[5px] min-h-[135px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${
              errors.description
                ? "border-[#F93B1D]"
                : isSubmitted
                ? "border-[#45A849]"
                : "border-black"
            } rounded-md resize-none`}
          />
          <div className="mt-1 flex items-center gap-[7px]">
            <svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 1.40918L3.125 9.591L0 5.87199"
                stroke={`${
                  errors.description
                    ? "#f93b1d"
                    : isSubmitted
                    ? "#45a849"
                    : "#021526"
                }`}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p
              className={`text-sm leading-[1.05rem] ${
                errors.description
                  ? "text-[#F93B1D]"
                  : isSubmitted
                  ? "text-[#45A849]"
                  : "text-black"
              }`}
            >
              მინიმუმ ხუთი სიტყვა
            </p>
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="image"
            className="font-medium text-sm leading-[1.05rem]"
          >
            ატვირთეთ ფოტო *
          </label>
          <div
            className={`relative mt-[5px] min-h-[135px] w-full px-[10px] py-3 text-sm leading-[1.05rem] border border-solid border-darkGrey ${
              errors.image
                ? "border-[#F93B1D]"
                : isSubmitted
                ? "border-[#45A849]"
                : "border-black"
            } rounded-md overflow-hidden`}
          >
            <input
              type="file"
              id="image"
              className="w-[0.01px] h-[0.01px]"
              {...register("image", {
                required: true,
                validate: (fileList) =>
                  fileList.length > 0 ? true : "ფოტო უნდა აირჩიოთ",
              })}
              onChange={handleFileChange}
            />
            <label htmlFor="image">
              <svg
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="#2D3648"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 8V16"
                  stroke="#2D3648"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 12H16"
                  stroke="#2D3648"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </label>
            {isPreviewVisible && (
              <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <img
                  id="image-preview"
                  src={imagePreview}
                  alt=""
                  className="max-h-[82px] rounded-[4px]"
                />
                <svg
                  id="delete-preview"
                  onClick={handleDelete}
                  className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 cursor-pointer"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="11.5"
                    fill="white"
                    stroke="#021526"
                  />
                  <path
                    d="M6.75 8.5H7.91667H17.25"
                    stroke="#021526"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M16.0834 8.50033V16.667C16.0834 16.9764 15.9605 17.2732 15.7417 17.492C15.5229 17.7107 15.2262 17.8337 14.9167 17.8337H9.08341C8.774 17.8337 8.47725 17.7107 8.25846 17.492C8.03966 17.2732 7.91675 16.9764 7.91675 16.667V8.50033M9.66675 8.50033V7.33366C9.66675 7.02424 9.78966 6.72749 10.0085 6.5087C10.2272 6.28991 10.524 6.16699 10.8334 6.16699H13.1667C13.4762 6.16699 13.7729 6.28991 13.9917 6.5087C14.2105 6.72749 14.3334 7.02424 14.3334 7.33366V8.50033"
                    stroke="#021526"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8333 11.417V14.917"
                    stroke="#021526"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.1667 11.417V14.917"
                    stroke="#021526"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>

        <p className="mt-20 mb-2 font-medium text-blackSecondary leading-[1.221rem]">
          აგენტი
        </p>

        <div className="flex flex-col gap-[5px] ">
          <div className="select-menu w-[384px] relative">
            <div ref={agentModalRef}>
              <div
                className={`select flex items-center justify-between px-[10px] py-3 border border-solid ${
                  errors.agent_id
                    ? "border-[#F93B1D]"
                    : isSubmitted
                    ? "border-[#45A849]"
                    : "border-black"
                } rounded-lg cursor-pointer`}
                onClick={() => setShowAgentOptions(!showAgentOptions)}
              >
                <span className="text-sm leading-4 text-black">
                  {selectedAgent || "აირჩიეთ "}
                </span>
                <svg
                  className={`cityChevron transition-all duration-100 ${
                    showAgentOptions ? "rotate-180" : ""
                  }`}
                  width="16"
                  height="16"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {showAgentOptions && (
                <div className="options-list absolute border border-[#808A93] w-full mt-1 bg-white text-sm leading-4 border-solid max-h-40 border-grey rounded-lg shadow-lg z-10 overflow-y-auto customScroll transition-all duration-100">
                  <div
                    onClick={() => setAddingAgentModal(true)}
                    className="flex option items-center border-b border-[#808A93] gap-[8px] py-2 px-4 cursor-pointer hover:bg-gray-100"
                  >
                    <img src="/plus-circle.svg" alt="დამატება" />
                    <span>დაამატე აგენტი</span>
                  </div>
                  {agents.map((agent) => (
                    <div
                      key={agent.id}
                      className="option border-b border-[#808A93] py-2 px-4 cursor-pointer hover:bg-gray-100"
                      onClick={() => handleAgentSelect(agent)}
                    >
                      {agent.name}
                    </div>
                  ))}
                </div>
              )}
              {addingAgentModal && <AgentFormModal />}
            </div>
            <input
              {...register("agent_id", { required: true })}
              type="hidden"
              value={selectedAgent || ""}
            />
          </div>
          {errors.agent_id ? (
            <span className="text-[#F93B1D] text-sm">აირჩიეთ აგენტი</span>
          ) : (
            ""
          )}
        </div>

        <div className="mt-[90px] w-full flex justify-end items-center gap-[15px]">
          <button
            type="button"
            className="py-[14px] px-4 bg-white text-[#F93B1D] border border-solid border-[#F93B1D] rounded-[10px]"
            onClick={handleClick}
          >
            გაუქმება
          </button>
          <ButtonPrimary text="დაამატე ლისტინგი" type="submit" />
        </div>
      </form>

      <div className="mb-[200px]"></div>
    </div>
  );
};

export default AddListing;
