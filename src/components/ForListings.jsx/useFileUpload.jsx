import { useState } from "react";

export const useFileUpload = () => {
  const [imagePreview, setImagePreview] = useState("");
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);

  const handleFileChange = (e) => {
    const fileInput = e.target;
    if (fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];

      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result);
        setIsPreviewVisible(true);
      };
      reader.readAsDataURL(file);

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInput.files = dataTransfer.files;
    }
  };

  const handleDelete = () => {
    setImagePreview("");
    setIsPreviewVisible(false);

    const fileInput =
      document.querySelector < HTMLInputElement > 'input[type="file"]';
    if (fileInput) {
      fileInput.value = "";
    }
  };

  return {
    imagePreview,
    isPreviewVisible,
    handleFileChange,
    handleDelete,
  };
};
