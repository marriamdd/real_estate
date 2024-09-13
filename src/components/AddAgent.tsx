import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AgentFormModal: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values: any) => {
    console.log("Form Data:", values);
    message.success("Agent added successfully");
    setVisible(false);
  };

  const validateRedberryEmail = (_: any, value: string) => {
    if (value && !value.endsWith("@redberry.ge")) {
      return Promise.reject(new Error("Email must end with @redberry.ge"));
    }
    return Promise.resolve();
  };

  return (
    <>
      <Button type="primary" onClick={() => setVisible(true)}>
        Add Agent
      </Button>

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
