export const CONDITION_LABELS = [
  "normal",
  "mild",
  "moderate",
  "severe",
  "extremely severe",
];

export const formatResultDate = (dateValue) => {
  if (!dateValue) {
    return "";
  }

  return new Date(dateValue).toISOString().split("T")[0];
};

export const calculateAverage = (values = []) => {
  if (!values.length) {
    return 0;
  }

  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
};
