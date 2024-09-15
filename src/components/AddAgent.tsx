import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AgentFormModal: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setVisible(false);
  };
  const token = "9d00259e-59b1-40f6-b6a7-9d6b8d20b8b0";

  const handleSubmit = async (values: any) => {
    try {
      const formData = new FormData();
      formData.append("name", values.firstName);
      formData.append("surname", values.lastName);
      formData.append("email", values.email);
      formData.append("phone", values.phoneNumber);

      if (values.image && values.image.length > 0) {
        formData.append("avatar", values.image[0].originFileObj);
      }

      const response = await fetch(
        "https://api.real-estate-manager.redberryinternship.ge/api/agents",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("application/json")) {
        const data = await response.json();
        console.log("API response:", data);
        message.success("Agent added successfully");
      } else {
        const responseText = await response.text();
        console.error("Error response:", responseText);
        if (responseText.includes("<!doctype html>")) {
          throw new Error("Received HTML response, possibly an error page");
        }
        throw new Error("Received unexpected response format");
      }
      setVisible(false);
    } catch (error) {
      console.error("Error:", error);
      message.error(
        "Failed to add agent. Please check your input and try again."
      );
    }
  };

  const validateRedberryEmail = (_: any, value: string) => {
    if (value && !value.endsWith("@redberry.ge")) {
      return Promise.reject(new Error("Email must end with @redberry.ge"));
    }
    return Promise.resolve();
  };

  return (
    <>
      <button
        onClick={() => setVisible(true)}
        className="text-[16px] text-[#F93B1D] rounded-[10px] border border-[#F93B1D] font-[500] py-[10px] px-[16px]"
      >
        + აგენტის დამატება
      </button>
      <Modal
        title="აგენტი დამატება"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        centered
        destroyOnClose
        className="custom-modal"
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateTrigger={["onChange", "onBlur"]}
          onValuesChange={() => {
            form.validateFields().catch(() => {});
          }}
        >
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="firstName"
              label="სახელი"
              rules={[
                { required: true, message: "გთხოვთ,შეიყვანეთ სახელი" },
                {
                  min: 2,
                  message: "გთხოვთ, შეიყვანეთ  მინიმუმ ორი სიმბოლო",
                },
              ]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="გვარი"
              rules={[
                { required: true, message: "გთხოვთ, შეიყვანეთ გვარი" },
                {
                  min: 2,
                  message: "გთხოვთ, შეიყვანეთ  მინიმუმ ორი სიმბოლო",
                },
              ]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          </div>

          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="email"
              label="ელ-ფოსტა*"
              rules={[
                { required: true, message: "გთხოვთ, შეიყვანოთ მეილი" },
                { validator: validateRedberryEmail },
              ]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="ტელეფონის ნომერი"
              rules={[
                {
                  required: true,
                  message: "გთხოვთ, შეიყვანეთ ტელეფონის ნომერი",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "ნომერი უნდა შეიცვადეს მხოლოდ ციფრებს",
                },
              ]}
              style={{ flex: 1 }}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            name="image"
            label="ატვირთეთ ფოტო *"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => e.fileList}
            rules={[{ required: true, message: "გთხოვთ ატვირთეთ ფოტო" }]}
          >
            <Upload beforeUpload={() => false} listType="picture">
              <div className="upload-container ">
                <img
                  src="/plus-circle.svg"
                  alt="Upload Icon"
                  className="upload-icon"
                />
              </div>
            </Upload>
          </Form.Item>

          <div className="flex w-full justify-end gap-[15px] pr-[85px]">
            <button
              className="bg-[#F93B1D] rounded-[10px] h-[47px] py-[10px] border text-[white] px-[16px] text-[16px] font-[500] "
              type="submit"
            >
              დამატება
            </button>
            <button
              className="text-[#F93B1D] rounded-[10px] h-[47px] py-[10px] border border-[#F93B1D] px-[16px] text-[16px] font-[500] "
              onClick={handleCancel}
            >
              გაუქმება
            </button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default AgentFormModal;
