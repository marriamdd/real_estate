import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useFormLogic = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitted },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const token = "9d00259e-59b1-40f6-b6a7-9d6b8d20b8b0";
    const url =
      "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";

    const formData = new FormData();

    formData.append("price", data.price);
    formData.append("zip_code", data.zip_code);
    formData.append("description", data.description);
    formData.append("area", data.area);

    formData.append("city_id", data.city_id.toString());
    formData.append("region_id", data.region_id.toString());
    formData.append("agent_id", data.agent_id.toString());

    formData.append("address", data.address);
    formData.append("bedrooms", data.bedrooms);
    formData.append("is_rental", data.is_rental);
    console.log(data);
    console.log("smbmitted");

    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]);
    } else {
      console.error("Image file is missing or not properly selected");
      return;
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      navigate("/");
      console.log("Form submission successful:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Form submission failed with validation error:",
          error.response.data
        );
      } else {
        console.error("Form submission failed:", error);
      }
    }
  };

  return { register, handleSubmit, setValue, errors, isSubmitted, onSubmit };
};
