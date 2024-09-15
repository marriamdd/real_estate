import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Radio, Select, Upload } from "antd";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormDisabledDemo = () => {
  return (
    <div className="w-[790px]">
      <p className="text-[32px] text-center font-[500] pb-[62px] color-[#021526]">
        ლისტინგის დამატება
      </p>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}
      >
        <div className="flex flex-col">
          <p className="text-[16px] font-[500] text-[#1A1A1F] pb-[8px]">
            გარიგების ტიპი
          </p>
          <Radio.Group className="flex gap-[32px] pb-[80px]">
            <Radio className="w-[134px]" value="apple">
              იყიდება{" "}
            </Radio>
            <Radio className="w-[134px]" value="pear">
              ქირავდება{" "}
            </Radio>
          </Radio.Group>
        </div>

        <div className="flex flex-col pb-[22px]">
          <p>მდებარეობა</p>
          <div className="flex gap-[20px]">
            <Form.Item
              label="მისამართი"
              name="მისამართი"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
              <span className="flex gap-[5px]">
                {" "}
                <img src="/Vector.svg" alt="" />
                მინიმუმ ორი სიმბოლო
              </span>
            </Form.Item>
            <Form.Item
              name="საფოსტო ინდექსი"
              rules={[{ required: true, message: "Please input!" }]}
              label="საფოსტო ინდექსი *"
            >
              <Input />
              <span className="flex gap-[5px]">
                {" "}
                <img src="/Vector.svg" alt="" />
                მხოლოდ რიცხვები
              </span>
            </Form.Item>
          </div>
        </div>

        <Form.Item label="რეგიონი">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="ქალაქი">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <p>ბინის დეტალები </p>

        <div className="flex flex-col pb-[22px]">
          <div className="flex gap-[20px]">
            <Form.Item
              label="ფასი"
              name="ფასი"
              rules={[{ required: true, message: "Please input!" }]}
            >
              <Input />
              <span className="flex gap-[5px]">
                {" "}
                <img src="/Vector.svg" alt="" />
                მხოლოდ რიცხვები
              </span>
            </Form.Item>
            <Form.Item
              name="ფართობი"
              rules={[{ required: true, message: "Please input!" }]}
              label="საფოსტო ინდექსი *"
            >
              <Input />
              <span className="flex gap-[5px]">
                {" "}
                <img src="/Vector.svg" alt="" />
                მხოლოდ რიცხვები
              </span>
            </Form.Item>
          </div>
        </div>
        <Form.Item
          name="საძინებლების რაოდენობა"
          rules={[{ required: true, message: "Please input!" }]}
          label="საძინებლების რაოდენობა *"
        >
          <Input />
          <span className="flex gap-[5px]">
            {" "}
            <img src="/Vector.svg" alt="" />
            მხოლოდ რიცხვები
          </span>
        </Form.Item>

        <Form.Item label="აღწერა">
          <TextArea rows={4} />
          <span className="flex gap-[5px]">
            {" "}
            <img src="/Vector.svg" alt="" />
            მინიმუმ ხუთი სიტყვა
          </span>
        </Form.Item>

        <Form.Item
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload action="/upload.do" listType="ატვირთეთ ფოტო *">
            <button style={{ border: 0, background: "none" }} type="button">
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </button>
          </Upload>
        </Form.Item>
        <p>აგენტი</p>
        <Form.Item label="აირჩიე">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Button">
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormDisabledDemo;
