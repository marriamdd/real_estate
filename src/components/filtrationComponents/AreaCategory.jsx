import RangeSelector from "./RangeSelector";

const areaPresets = [
  { low: "50 მ²", high: "50 მ²" },
  { low: "100 მ²", high: "100 მ²" },
  { low: "150 მ²", high: "150 მ²" },
  { low: "200 მ²", high: "200 მ²" },
  { low: "300 მ²", high: "300 მ²" },
];

const AreaCategory = () => {
  return (
    <RangeSelector
      presets={areaPresets}
      label="არჩევა ფართით"
      placeholderLow="დან მ²"
      placeholderHigh="დან მ²"
      minLabel="მინ. ფართი"
      maxLabel="მაქს. ფართი"
      type="area"
    />
  );
};

export default AreaCategory;
