import React, { useState } from "react";
import { Modal, Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const AgentFormModal = () => {
  const [visible, setVisible] = useState(true);
  const [form] = Form.useForm();

  const handleCancel = () => {
    setVisible(false);
  };

  const handleSubmit = (values) => {
    console.log("Form Data:", values);
    message.success("Agent added successfully");
    setVisible(false);
  };

  // Custom validator for Redberry email
  const validateRedberryEmail = (_, value) => {
    if (value && !value.endsWith("@redberry.ge")) {
      return Promise.reject(new Error("Email must end with @redberry.ge"));
    }
    return Promise.resolve();
  };

  return (
    <>
      {/* Button to trigger modal */}
      <Button type="primary" onClick={() => setVisible(true)}>
        Add Agent
      </Button>

      {/* Modal */}
      <Modal
        style={{ width: "1009px" }}
        title="Add New Agent"
        visible={visible}
        onCancel={handleCancel}
        footer={null}
        centered
        destroyOnClose
        maskStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Gray transparent background
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          validateTrigger={["onBlur", "onChange"]} // Trigger validation on blur and input change
        >
          {/* Name and Last Name side by side */}
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[
                { required: true, message: "Please enter your first name" },
                {
                  min: 2,
                  message: "First name must be at least 2 characters long",
                },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="First Name" />

              <div className="flex">
                <img src="/Vector.svg" alt="" />
                <p> მინიმუმ ორი სიმბოლო</p>
              </div>
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[
                { required: true, message: "Please enter your last name" },
                {
                  min: 2,
                  message: "Last name must be at least 2 characters long",
                },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Last Name" />
              <div className="flex">
                <img src="/Vector.svg" alt="" />
                <p> მინიმუმ ორი სიმბოლო</p>
              </div>
            </Form.Item>
          </div>

          {/* Phone Number and Gmail side by side */}
          <div style={{ display: "flex", gap: "16px" }}>
            <Form.Item
              name="phoneNumber"
              label="Phone Number"
              rules={[
                { required: true, message: "Please enter your phone number" },
                {
                  pattern: /^[0-9]+$/,
                  message: "Phone number must only contain numbers",
                },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Phone Number" />
              <div className="flex">
                <img src="/Vector.svg" alt="" />
                <p>მხოლოდ რიცხვები</p>
              </div>
            </Form.Item>
            <Form.Item
              name="email"
              label="Gmail"
              rules={[
                { required: true, message: "Please enter your Gmail" },
                { validator: validateRedberryEmail },
              ]}
              style={{ flex: 1 }}
            >
              <Input placeholder="Gmail" />
              <div className="flex">
                <img src="/Vector.svg" alt="" />
                <p>გამოიყენეთ @redberry.ge ფოსტა</p>
              </div>
            </Form.Item>
          </div>

          {/* Upload Image */}
          <Form.Item
            name="image"
            label="Upload Image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: "Please upload an image" }]}
          >
            <Upload beforeUpload={() => false} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>

          {/* Submit button */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Agent
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AgentFormModal;
