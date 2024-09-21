import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const useFormLogic = () => {
  const savedFormData = JSON.parse(localStorage.getItem("formData")) || {};
  const defaultIsRental =
    savedFormData.is_rental !== undefined ? Number(savedFormData.is_rental) : 0;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitted },
  } = useForm({
    defaultValues: {
      is_rental: defaultIsRental,
    },
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    setLoading(true);
    const token = "9d0ec126-58d8-487a-b170-8661729e6d72";
    const url =
      "https://api.real-estate-manager.redberryinternship.ge/api/real-estates";

    const formData = new FormData();
    formData.append("price", data.price);
    formData.append("zip_code", data.zip_code);
    formData.append("description", data.description);
    formData.append("area", data.area);
    formData.append("city_id", data.city_id.toString());
    formData.append("region_id", data.region_id.toString());
    formData.append("agent_id", data.agent_id);
    formData.append("address", data.address);
    formData.append("bedrooms", data.bedrooms);
    formData.append("is_rental", data.is_rental.toString()); // Convert to string for API

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

      localStorage.removeItem("formData");
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
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    isSubmitted,
    onSubmit,
    loading,
  };
};
