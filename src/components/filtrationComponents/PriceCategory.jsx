import RangeSelector from "./RangeSelector";

const pricePresets = [
  { low: "50 000 ₾", high: "50 000 ₾" },
  { low: "100 000 ₾", high: "100 000 ₾" },
  { low: "150 000 ₾", high: "150 000 ₾" },
  { low: "200 000 ₾", high: "200 000 ₾" },
  { low: "300 000 ₾", high: "300 000 ₾" },
];

const PriceCategory = () => {
  return (
    <RangeSelector
      presets={pricePresets}
      label="არჩევა ფასით"
      placeholderLow="დან ₾"
      placeholderHigh="დან ₾"
      minLabel="მინ. ფასი"
      maxLabel="მაქს. ფასი"
      type="prices"
    />
  );
};

export default PriceCategory;
