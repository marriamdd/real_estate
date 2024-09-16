import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FormComponent = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    register,
    watch,
    setValue,
  } = useForm({
    mode: "onChange", // Trigger validation on change
    defaultValues: {
      transactionType: "sale", // Default value for transactionType
    },
  });

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted:", data);
      navigate("/"); // Navigate to root path on successful submission
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  // Watching form fields to check their validity
  const address = watch("address");
  const zipCode = watch("zipCode");
  const region = watch("region");
  const city = watch("city");
  const price = watch("price");
  const area = watch("area");
  const bedrooms = watch("bedrooms");
  const description = watch("description");
  const agent = watch("agent");
  const image = watch("image");

  // Validate word count for description
  const validateDescription = (value) => {
    const wordCount = value.trim().split(/\s+/).length;
    return wordCount >= 5 || "მინიმუმ ხუთი სიტყვა";
  };

  return (
    <div className="w-[790px] mx-auto bg-white p-8 rounded-md">
      <p className="text-[16px] font-[500] font-semibold text-center mb-[60px]">
        ლისტინგის დამატება
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Transaction Type */}
        <div>
          <label className="block text-gray-700 font-medium">
            გარიგების ტიპი <span className="text-[#F93B1D]">*</span>
          </label>
          <div className="flex gap-[32px] pb-[80px] items-center space-x-4 mt-2">
            <label>
              <input
                type="radio"
                value="sale"
                {...register("transactionType", {
                  required: "გთხოვთ აირჩიოთ გარიგების ტიპი",
                })}
                defaultChecked
              />
              იყიდება
            </label>
            <label>
              <input
                type="radio"
                value="rent"
                {...register("transactionType", {
                  required: "გთხოვთ აირჩიოთ გარიგების ტიპი",
                })}
              />
              ქირავდება
            </label>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-gray-700 font-medium">
            მისამართი <span className="text-[#F93B1D]">*</span>
          </label>
          <Controller
            name="address"
            control={control}
            rules={{ required: "მინიმუმ ორი სიმბოლო", minLength: 2 }}
            render={({ field }) => (
              <input
                {...field}
                className={`mt-2 p-2 border rounded-md w-full ${
                  errors.address
                    ? "border-[#F93B1D]"
                    : address
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("address"); // Validate on change
                }}
              />
            )}
          />
          <p
            className={`text-sm flex gap-[5px] ${
              errors.address
                ? "text-[#F93B1D]"
                : address && address.length >= 2
                ? "text-green-500"
                : "text-gray-700"
            }`}
          >
            {errors.address ? (
              <img src="/Vector (4).svg" alt="Error icon" />
            ) : address && address.length >= 2 ? (
              <img src="/Vector (3).svg" alt="Success icon" />
            ) : (
              <img src="/Vector.svg" alt="Default icon" />
            )}
            {errors.address ? errors.address.message : "მინიმუმ ორი სიმბოლო"}
          </p>
        </div>

        {/* Zip Code */}
        <div>
          <label className="block text-gray-700 font-medium">
            საფოსტო ინდექსი <span className="text-[#F93B1D]">*</span>
          </label>
          <Controller
            name="zipCode"
            control={control}
            rules={{
              required: "გთხოვთ შეიყვანოთ საფოსტო ინდექსი",
              pattern: {
                value: /^[0-9]*$/,
                message: "მხოლოდ რიცხვები უნდა იყოს",
              },
            }}
            render={({ field }) => (
              <input
                {...field}
                type="text" // Use type="text" to handle the pattern validation
                className={`mt-2 p-2 border rounded-md w-full ${
                  errors.zipCode
                    ? "border-[#F93B1D]"
                    : zipCode
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("zipCode"); // Validate on change
                }}
              />
            )}
          />
          <p
            className={`text-sm flex gap-[5px] ${
              errors.zipCode
                ? "text-[#F93B1D]"
                : zipCode && /^[0-9]*$/.test(zipCode)
                ? "text-green-500"
                : "text-gray-700"
            }`}
          >
            {errors.zipCode ? (
              <img src="/Vector (4).svg" alt="Error icon" />
            ) : zipCode && /^[0-9]*$/.test(zipCode) ? (
              <img src="/Vector (3).svg" alt="Success icon" />
            ) : (
              <img src="/Vector.svg" alt="Default icon" />
            )}
            {errors.zipCode
              ? errors.zipCode.message
              : "მხოლოდ რიცხვები უნდა იყოს"}
          </p>
        </div>

        {/* Region */}
        <div>
          <label className="block text-gray-700 font-medium">
            რეგიონი <span className="text-[#F93B1D]">*</span>
          </label>
          <Controller
            name="region"
            control={control}
            rules={{ required: "გთხოვთ აირჩიოთ რეგიონი" }}
            render={({ field }) => (
              <select
                {...field}
                className={`mt-2 p-2 border rounded-md w-full ${
                  errors.region
                    ? "border-[#F93B1D]"
                    : region
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("region"); // Validate on change
                }}
              >
                <option value="">აირჩიეთ</option>
                <option value="region1">Region 1</option>
                <option value="region2">Region 2</option>
              </select>
            )}
          />
          <p
            className={`text-sm flex gap-[5px] ${
              errors.region
                ? "text-[#F93B1D]"
                : region
                ? "text-green-500"
                : "text-gray-700"
            }`}
          >
            {errors.region ? (
              <img src="/Vector (4).svg" alt="Error icon" />
            ) : region ? (
              <img src="/Vector (3).svg" alt="Success icon" />
            ) : (
              <img src="/Vector.svg" alt="Default icon" />
            )}
            {errors.region ? errors.region.message : "გთხოვთ აირჩიოთ რეგიონი"}
          </p>
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700 font-medium">
            ქალაქი <span className="text-[#F93B1D]">*</span>
          </label>
          <Controller
            name="city"
            control={control}
            rules={{ required: "გთხოვთ აირჩიოთ ქალაქი" }}
            render={({ field }) => (
              <select
                {...field}
                className={`mt-2 p-2 border rounded-md w-full ${
                  errors.city
                    ? "border-[#F93B1D]"
                    : city
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("city"); // Validate on change
                }}
              >
                <option value="">აირჩიეთ</option>
                <option value="city1">City 1</option>
                <option value="city2">City 2</option>
              </select>
            )}
          />
          <p
            className={`text-sm flex gap-[5px] ${
              errors.city
                ? "text-[#F93B1D]"
                : city
                ? "text-green-500"
                : "text-gray-700"
            }`}
          >
            {errors.city ? (
              <img src="/Vector (4).svg" alt="Error icon" />
            ) : city ? (
              <img src="/Vector (3).svg" alt="Success icon" />
            ) : (
              <img src="/Vector.svg" alt="Default icon" />
            )}
            {errors.city ? errors.city.message : "გთხოვთ აირჩიოთ ქალაქი"}
          </p>
        </div>

        {/* Price */}
        <div>
          <label className="block text-gray-700 font-medium">
            ფასი <span className="text-[#F93B1D]">*</span>
          </label>
          <Controller
            name="price"
            control={control}
            rules={{ required: "გთხოვთ შეიყვანოთ ფასი" }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`mt-2 p-2 border rounded-md w-full ${
                  errors.price
                    ? "border-[#F93B1D]"
                    : price
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("price"); // Validate on change
                }}
              />
            )}
          />
          <p
            className={`text-sm flex gap-[5px] ${
              errors.price
                ? "text-[#F93B1D]"
                : price
                ? "text-green-500"
                : "text-gray-700"
            }`}
          >
            {errors.price ? (
              <img src="/Vector (4).svg" alt="Error icon" />
            ) : price ? (
              <img src="/Vector (3).svg" alt="Success icon" />
            ) : (
              <img src="/Vector.svg" alt="Default icon" />
            )}
            {errors.price ? errors.price.message : "გთხოვთ შეიყვანოთ ფასი"}
          </p>
        </div>

        {/* Area */}
        <div>
          <label className="block text-gray-700 font-medium">
            ფართი <span className="text-[#F93B1D]">*</span>
          </label>
          <Controller
            name="area"
            control={control}
            rules={{ required: "გთხოვთ შეიყვანოთ ფართი" }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`mt-2 p-2 border rounded-md w-full ${
                  errors.area
                    ? "border-[#F93B1D]"
                    : area
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("area"); // Validate on change
                }}
              />
            )}
          />
          <p
            className={`text-sm flex gap-[5px]${
              errors.area
                ? "text-[#F93B1D]"
                : area
                ? "text-green-500"
                : "text-gray-700"
            }`}
          >
            {errors.area ? (
              <img src="/Vector (4).svg" alt="Error icon" />
            ) : area ? (
              <img src="/Vector (3).svg" alt="Success icon" />
            ) : (
              <img src="/Vector.svg" alt="Default icon" />
            )}
            {errors.area ? errors.area.message : "გთხოვთ შეიყვანოთ ფართი"}
          </p>
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-gray-700 font-medium">
            საძინებლები <span className="text-[#F93B1D]">*</span>
          </label>
          <Controller
            name="bedrooms"
            control={control}
            rules={{ required: "გთხოვთ შეიყვანოთ საძინებლების რაოდენობა" }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className={`mt-2 p-2 border rounded-md w-full ${
                  errors.bedrooms
                    ? "border-[#F93B1D]"
                    : bedrooms
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("bedrooms"); // Validate on change
                }}
              />
            )}
          />
          <p
            className={`text-sm flex gap-[5px] ${
              errors.bedrooms
                ? "text-[#F93B1D]"
                : bedrooms
                ? "text-green-500"
                : "text-gray-700"
            }`}
          >
            {errors.bedrooms ? (
              <img src="/Vector (4).svg" alt="Error icon" />
            ) : bedrooms ? (
              <img src="/Vector (3).svg" alt="Success icon" />
            ) : (
              <img src="/Vector.svg" alt="Default icon" />
            )}
            {errors.bedrooms
              ? errors.bedrooms.message
              : "გთხოვთ შეიყვანოთ საძინებლების რაოდენობა"}
          </p>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-medium">
            აღწერა <span className="text-[#F93B1D]">*</span>
          </label>
          <Controller
            name="description"
            control={control}
            rules={{ validate: validateDescription }}
            render={({ field }) => (
              <textarea
                {...field}
                className={`mt-2 p-2 border rounded-md w-full ${
                  errors.description
                    ? "border-[#F93B1D]"
                    : description && description.trim().split(/\s+/).length >= 5
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("description"); // Validate on change
                }}
              />
            )}
          />
          <p
            className={`text-sm flex gap-[5px] ${
              errors.description
                ? "text-[#F93B1D]"
                : description && description.trim().split(/\s+/).length >= 5
                ? "text-green-500"
                : "text-gray-700"
            }`}
          >
            {errors.description ? (
              <img src="/Vector (4).svg" alt="Error icon" />
            ) : description && description.trim().split(/\s+/).length >= 5 ? (
              <img src="/Vector (3).svg" alt="Success icon" />
            ) : (
              <img src="/Vector.svg" alt="Default icon" />
            )}
            {errors.description
              ? errors.description.message
              : "მინიმუმ ხუთი სიტყვა"}
          </p>
        </div>

        {/* Agent */}
        <div>
          <label className="block text-gray-700 font-medium">აგენტი</label>
          <Controller
            name="agent"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="text"
                className={`mt-2 p-2 border rounded-md w-full ${
                  agent ? "border-green-500" : "border-gray-300"
                }`}
              />
            )}
          />
        </div>

        {/* Image */}
        <div>
          <label className="block text-gray-700 font-medium">სურათი</label>
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="file"
                className={`mt-2 p-2 border rounded-md w-full ${
                  image ? "border-green-500" : "border-gray-300"
                }`}
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded-md"
          >
            გამგზავრება
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormComponent;
