import { Form, Input, Radio, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const FormDisabledDemo = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Form values:", values);
  };
  const navigate = useNavigate();
  return (
    <div className="w-[790px]">
      <p className="text-[32px] text-center font-[500] pb-[62px] color-[#021526]">
        ლისტინგის დამატება
      </p>
      <Form
        form={form}
        layout="vertical"
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
      >
        <Form.Item
          label="გარიგების ტიპი"
          name="transactionType"
          rules={[
            { required: true, message: "Please select the transaction type!" },
          ]}
        >
          <Radio.Group>
            <Radio value={0}>იყიდება</Radio>
            <Radio value={1}>ქირავდება</Radio>
          </Radio.Group>
        </Form.Item>
        <div className="flex items-center gap-[20px]">
          <Form.Item
            label="მისამართი"
            name="address"
            rules={[
              { required: true, message: "Please input the address!" },
              { min: 2, message: "Address must be at least 2 characters!" },
            ]}
            style={{ flex: 1 }}
            className="flex flex-col"
          >
            <Input />
            <span className="flex gap-[5px]">
              <img src="/Vector.svg" alt="" />
              მინიმუმ ორი სიმბოლო
            </span>
          </Form.Item>

          <Form.Item
            className="text-nowrap flex flex-col"
            name="zipCode"
            rules={[
              { required: true, message: "Please input the zip code!" },
              { pattern: /^\d+$/, message: "Zip code must be numeric!" },
            ]}
            style={{ flex: 1 }}
          >
            <label className="pb-[5px]" htmlFor="საფოსტო ინდექსი">
              საფოსტო ინდექსი
            </label>
            <Input />
            <span className="flex gap-[5px]">
              <img src="/Vector.svg" alt="" />
              მხოლოდ რიცხვები
            </span>
          </Form.Item>
        </div>
        <div className="flex items-center gap-[20px] pb-[101px]">
          <Form.Item
            label="რეგიონი"
            name="regionId"
            rules={[{ required: true, message: "Please select the region!" }]}
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="ქალაქი"
            name="cityId"
            rules={[{ required: true, message: "Please select the city!" }]}
          >
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
        </div>
        <p className="text-[16px] font-[500] pb-[22px]">ბინის დეტალები</p>
        <div className="flex items-center gap-[20px]">
          <Form.Item
            label="ფასი"
            name="price"
            rules={[
              { required: true, message: "Please input the price!" },
              {
                type: "number",
                min: 0,
                message: "Price must be a positive number!",
              },
            ]}
          >
            <Input type="number" />
            <span className="flex gap-[5px]">
              <img src="/Vector.svg" alt="" />
              მხოლოდ რიცხვები
            </span>
          </Form.Item>

          <Form.Item
            label="ფართობი"
            name="area"
            rules={[
              { required: true, message: "Please input the area!" },
              {
                type: "number",
                min: 0,
                message: "Area must be a positive number!",
              },
            ]}
          >
            <Input type="number" />
            <span className="flex gap-[5px]">
              <img src="/Vector.svg" alt="" />
              მხოლოდ რიცხვები
            </span>
          </Form.Item>
        </div>
        <Form.Item
          label="საძინებლების რაოდენობა"
          name="bedrooms"
          rules={[
            { required: true, message: "Please input the number of bedrooms!" },
            {
              type: "number",
              min: 0,
              message: "Bedrooms must be a positive number!",
            },
          ]}
        >
          <Input type="number" />
          <span className="flex gap-[5px]">
            <img src="/Vector.svg" alt="" />
            მხოლოდ რიცხვები
          </span>
        </Form.Item>

        <Form.Item
          className="area"
          label="აღწერა"
          name="description"
          rules={[
            { required: true, message: "Please input the description!" },
            { min: 5, message: "Description must be at least 5 words!" },
          ]}
        >
          <TextArea rows={4} />
          <span className="flex gap-[5px]">
            <img src="/Vector.svg" alt="" />
            მინიმუმ ხუთი სიტყვა
          </span>
        </Form.Item>

        <Form.Item
          className="img pb-[80px]"
          label="ატვირთეთ ფოტო "
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            className="border-2 border-dotted border-[#2D3648] h-[120px] bg-white rounded-[8px] w-[788px] p-4"
            action="/upload.do"
            listType="picture"
          >
            <button className=" flex   justify-center w-[788px]" type="button">
              <div>
                <img
                  className="pt-[30px]"
                  src="/plus-circle.svg"
                  alt="add_img"
                />
              </div>
            </button>
          </Upload>
        </Form.Item>
        <p className="text-[16px] font-[500] pb-[22px]">აგენტი</p>
        <Form.Item
          className="pb-[90px]"
          label="აგენტი"
          name="agentId"
          rules={[{ required: true, message: "Please select the agent!" }]}
        >
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <div className="flex w-[788px] justify-end gap-[15px] pb-[90px]">
          <button
            className="text-[#F93B1D] rounded-[10px] h-[47px] py-[10px] border border-[#F93B1D] px-[16px] text-[16px] font-[500] "
            onClick={() => navigate("/")}
          >
            გაუქმება
          </button>
          <button
            className="bg-[#F93B1D] rounded-[10px] h-[47px] py-[10px] border text-[white] px-[16px] text-[16px] font-[500] "
            type="submit"
          >
            დაამატე ლისტინგი
          </button>
        </div>
      </Form>
    </div>
  );
};

export default FormDisabledDemo;
