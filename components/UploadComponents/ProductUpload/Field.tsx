export const fields = [
  {
    label: "Name",
    key: "name",
    alternateMatches: ["Name"],
    fieldType: {
      type: "input",
    },
  },
  {
    label: "Quantity",
    key: "quantity",
    alternateMatches: ["quantity"],
    fieldType: {
      type: "input",
    },
  },
  {
    label: "Selling Price",
    key: "selling_price",
    alternateMatches: ["Selling Price"],
    fieldType: {
      type: "input",
    },
  },
  {
    label: "Strength",
    key: "strength",
    alternateMatches: ["strength", "Strength"],
    fieldType: {
      type: "input",
    },
  },
] as const;

// validations: [
//   {
//     // Can be "required" / "unique" / "regex"
//     rule: "required",
//     errorMessage: "Name is required",
//     // There can be "info" / "warning" / "error" levels. Optional. Default "error".
//     level: "error",
//   },
// ],
