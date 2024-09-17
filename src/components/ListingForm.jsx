// import { stringify } from "postcss";
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useFetchAgents } from "./agents/GetAgents";
// import useAddListing from "./listings/AddListings";

const FormComponent = () => {
  const savedFormData = JSON.parse(localStorage.getItem("formData")) || {
    transactionType: "sale",
  };
  // const { ragav } = useAddListing();
  // console.log(ragav);
  console.log(savedFormData, "savedFormData");
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    trigger,
    reset,
    register,
    watch,
  } = useForm({
    mode: "onChange",
  });
  console.log(watch("image"), "image");

  const { agents } = useFetchAgents();
  console.log(agents, "agents");
  useEffect(() => {
    const newFormData = { ...savedFormData, image: null };
    const storagedImage = localStorage.getItem("imageUrl");

    if (storagedImage) {
      setImageURL(storagedImage);
    }
    reset(newFormData);
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log("Form submitted:", data);
      navigate("/");
      localStorage.removeItem("imageUrl");
      localStorage.removeItem("formData");
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const watchAllFields = watch();

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(watchAllFields));
  }, [watchAllFields]);

  const [imageURL, setImageURL] = useState(null);
  const [fileName, setFileName] = useState("");
  const [size, setSize] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file.size, "images size ");
    setSize(file.size);
    console.log(file.size <= 1048576 || "არ უნდა აღემატებოდეს 1MB-ს");
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem("imageUrl", reader.result);
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
      trigger("image");
    }
  };

  console.log(imageURL, "stored image");
  const handleImageRemove = (e) => {
    e.preventDefault();

    setImageURL(null);
    setFileName("");
    localStorage.removeItem("imageUrl");

    trigger("image");
  };
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

  const validateDescription = (value) => {
    const wordCount = value?.trim().split(/\s+/).length;
    return wordCount >= 5 || "მინიმუმ ხუთი სიტყვა";
  };

  console.log(errors);
  console.log(imageURL, "srccc");
  return (
    <div className="w-[790px] mx-auto bg-white p-8 rounded-md">
      <p className="text-[16px] font-[500]  text-center mb-[60px]">
        ლისტინგის დამატება
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="radio-group">
          <label className="block text-gray-700 font-medium">
            გარიგების ტიპი <span className="text-[#F93B1D]">*</span>
          </label>
          <div className="flex gap-[32px] pb-[80px] items-center space-x-4 mt-2">
            <label>
              <input
                className="mr-[5px]"
                type="radio"
                value="sale"
                {...register("transactionType", {
                  required: "გთხოვთ აირჩიოთ გარიგების ტიპი",
                })}
              />
              იყიდება
            </label>
            <label>
              <input
                className="mr-[5px]"
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
        <div className="flex gap-[20px]">
          <div className="w-[386px]">
            <label className="block text-gray-700 font-medium">
              მისამართი <span className="text-[#F93B1D]">*</span>
            </label>
            <Controller
              name="address"
              defaultValue={savedFormData.address || ""}
              control={control}
              rules={{
                required: "მინიმუმ ორი სიმბოლო",

                minLength: {
                  value: 2,
                  message: "მინიმუმ ორი სიმბოლო",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  className={`mt-2 p-2 border rounded-md w-full ${
                    errors.address
                      ? "border-[#F93B1D]"
                      : address?.trim().length > 2
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("address");
                  }}
                />
              )}
            />

            <p
              className={`text-sm flex gap-[5px] ${
                errors.address
                  ? "text-[#F93B1D]"
                  : address && address.trim().length >= 2
                  ? "text-green-500"
                  : "text-gray-700"
              }`}
            >
              {errors.address ? (
                <img src="/Vector (4).svg" alt="Error icon" />
              ) : address && address.trim().length >= 2 ? (
                <img src="/Vector (3).svg" alt="Success icon" />
              ) : (
                <img src="/Vector.svg" alt="Default icon" />
              )}
              {errors.address ? errors.address.message : "მინიმუმ ორი სიმბოლო"}
            </p>
          </div>

          <div className="w-[386px]">
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
                  message: "მხოლოდ რიცხვები ",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`mt-2 p-2 border rounded-md w-full ${
                    errors.zipCode
                      ? "border-[#F93B1D]"
                      : zipCode?.trim().length > 2
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("zipCode");
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
              {errors.zipCode ? errors.zipCode.message : "მხოლოდ რიცხვები"}
            </p>
          </div>
        </div>
        <div className="flex gap-[20px]">
          <div className="w-[386px]">
            <label className="block text-gray-700 font-medium">
              რეგიონი <span className="text-[#F93B1D]">*</span>
            </label>
            <Controller
              name="region"
              control={control}
              defaultValue={savedFormData.region || ""}
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
                    trigger("region");
                  }}
                >
                  <option value="">აირჩიეთ</option>
                  <option value="region1">Region 1</option>
                  <option value="region2">Region 2</option>
                </select>
              )}
            />
          </div>

          <div className="w-[386px]">
            <label className="block text-gray-700 font-medium">
              ქალაქი <span className="text-[#F93B1D]">*</span>
            </label>

            <Controller
              name="city"
              defaultValue={savedFormData.city || ""}
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
                    trigger("city");
                  }}
                >
                  <option value="">აირჩიეთ</option>
                  <option value="city1">City 1</option>
                  <option value="city2">City 2</option>
                </select>
              )}
            />
          </div>
        </div>
        <div className="flex gap-[20px]">
          <div className="w-[386px]">
            <label className="block text-gray-700 font-medium">
              ფასი <span className="text-[#F93B1D]">*</span>
            </label>
            <Controller
              name="price"
              defaultValue={savedFormData.price || ""}
              control={control}
              rules={{
                required: "გთხოვთ შეიყვანოთ ფასი",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "მხოლოდ რიცხვები ",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`mt-2 p-2 border rounded-md w-full ${
                    errors.price
                      ? "border-[#F93B1D]"
                      : price
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("price");
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
              {errors.price ? errors.price.message : "მხოლოდ რიცხვები"}
            </p>
          </div>

          <div className="w-[386px]">
            <label className="block text-gray-700 font-medium">
              ფართი <span className="text-[#F93B1D]">*</span>
            </label>
            <Controller
              name="area"
              defaultValue={savedFormData.area || ""}
              control={control}
              rules={{
                required: "გთხოვთ შეიყვანოთ ფართი",
                pattern: {
                  value: /^[0-9]*$/,
                  message: "მხოლოდ რიცხვები ",
                },
              }}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className={`mt-2 p-2 border rounded-md w-full ${
                    errors.area
                      ? "border-[#F93B1D]"
                      : area
                      ? "border-green-500"
                      : "border-gray-300"
                  }`}
                  onChange={(e) => {
                    field.onChange(e);
                    trigger("area");
                  }}
                />
              )}
            />
            <p
              className={`text-sm flex gap-[5px] ${
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
              {errors.area ? errors.area.message : "მხოლოდ რიცხვები"}
            </p>
          </div>
        </div>

        <div className="w-[386px]">
          <label className="block text-gray-700 font-medium">
            საძინებლებს რაოდენობა <span className="text-[#F93B1D]">*</span>
          </label>
          <Controller
            defaultValue={savedFormData.bedrooms || ""}
            name="bedrooms"
            control={control}
            rules={{ required: "მხოლოდ რიცხვები" }}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                min={1}
                className={`mt-2 p-2 border rounded-md w-full ${
                  errors.bedrooms
                    ? "border-[#F93B1D]"
                    : bedrooms
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("bedrooms");
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
            {errors.bedrooms ? errors.bedrooms.message : "მხოლოდ რიცხვები"}
          </p>
        </div>

        <div className="w-[788px]">
          <label className="block text-gray-700 font-medium">
            აღწერა <span className="text-[#F93B1D]">*</span>
          </label>
          <Controller
            name="description"
            defaultValue={savedFormData.description || ""}
            control={control}
            rules={{ validate: validateDescription }}
            render={({ field }) => (
              <textarea
                {...field}
                className={`mt-2 p-2 min-h-[120px] border rounded-md w-full ${
                  errors.description
                    ? "border-[#F93B1D]"
                    : description && description.trim().split(/\s+/).length >= 5
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("description");
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

        <div className="w-[788px] ">
          <label className="block text-gray-700 font-medium">
            ატვირთეთ ფოტო *
          </label>
          <Controller
            name="image"
            control={control}
            rules={{
              required: "ატვირთეთ ფოტო",
              validate: {
                lessThan1MB: (files) => {
                  if (!files?.length) return "ატვირთეთ ფოტო";

                  return size <= 1048576 || "არ უნდა აღემატებოდეს 1MB-ს";
                },
              },
            }}
            render={({ field }) => (
              <>
                {!imageURL && (
                  <input
                    type="file"
                    accept="image/*"
                    id="file-upload"
                    {...field}
                    className="hidden"
                    onChange={(e) => {
                      handleImageChange(e);
                      field.onChange(e);
                    }}
                  />
                )}

                <label
                  htmlFor="file-upload"
                  className={`cursor-pointer flex flex-col items-center justify-center p-2 h-[120px] border border-dashed rounded-md w-full ${
                    imageURL
                      ? "border-green-500"
                      : errors.image
                      ? "border-[#F93B1D]"
                      : "border-gray-300"
                  }`}
                >
                  {imageURL && (
                    <div className="relative mt-4">
                      <img
                        src={imageURL || localStorage.getItem("imageUrl")}
                        width={92}
                        height={82}
                        className="rounded-[4px] mb-[20px]"
                        alt="Preview"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          handleImageRemove(e);
                          field.onChange(e);
                        }}
                        className="absolute bottom-[15px]  right-[-8px] p-1 w-[24px] h-[23px] rounded-full  bg-white border border-[black] shadow-md"
                      >
                        <img src="/trash-2.svg" alt="" />
                      </button>
                    </div>
                  )}
                  {!imageURL && <img src="/plus-circle.svg" />}
                </label>
              </>
            )}
          />
        </div>
        <div className="w-[386px]">
          <label className="block pb-[15px] text-[16px] text-gray-700 font-medium">
            აგენტი <span className="text-[#F93B1D]">*</span>
          </label>
          <span className="w-[14px] ">აირჩიე</span>
          <Controller
            name="agent"
            defaultValue={savedFormData.agent || ""}
            control={control}
            rules={{ required: "გთხოვთ აირჩიოთ აგენტი" }}
            render={({ field }) => (
              <select
                {...field}
                className={`mt-2 p-2 border rounded-md w-full ${
                  errors.agent
                    ? "border-[#F93B1D]"
                    : agent
                    ? "border-green-500"
                    : "border-gray-300"
                }`}
                onChange={(e) => {
                  field.onChange(e);
                  trigger("agent");
                }}
              >
                {agents.map((agent) => (
                  <option key={agent.id} value={agent.id}>
                    {`${agent.name} ${agent.surname}`}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
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
