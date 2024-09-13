import RangeSelector from "./RangeSelector";

const areaPresets = [
  { low: "50 მ²", high: "50 მ²" },
  { low: "100 მ²", high: "100 М²" },
  { low: "150 М²", high: "150 М²" },
  { low: "200 М²", high: "200 М²" },
  { low: "300 М²", high: "300 М²" },
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
