/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
export default function DeleteEstate({ id }) {
  const token = "9d0ec126-58d8-487a-b170-8661729e6d72";
  console.log(id, "id");
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  const deleteEstate = async () => {
    try {
      const resp = await fetch(
        `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (resp.ok) {
        navigate("/");
        console.log("Estate deleted successfully");
      } else {
        console.error("Failed to delete estate");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleCancel = () => {
    setDeleteModal(false);
  };
  return (
    <div className="text-[12px] w-[130px] font-[500] text-[#676E76] border border-[#676E76] flex items-center justify-center h-[34px] rounded-[8px]">
      <button className="cursor-pointer" onClick={() => setDeleteModal(true)}>
        ლისტინგის წაშლა
      </button>
      <Modal
        title="გსურთ წაშალოთ ლისტინგი?"
        visible={deleteModal}
        onCancel={handleCancel}
        footer={null}
        centered
        destroyOnClose
        className="deleteModal"
      >
        <div className="flex text-[16px] mb-[20px] gap-[30px] font-[500]">
          <button
            onClick={() => setDeleteModal(false)}
            className="w-[103px] rounded-[10px] py-[10px] text-[#F93B1D] border border-[#F93B1D] "
          >
            გაუქმება
          </button>
          <button
            onClick={deleteEstate}
            className="w-[143px] rounded-[10px] text-[white] bg-[#F93B1D] border"
          >
            დადასტურება
          </button>
        </div>
      </Modal>
    </div>
  );
}
