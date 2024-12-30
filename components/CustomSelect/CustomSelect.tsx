import React from "react";
import Select, { StylesConfig } from "react-select";

type customSelectType = {
  idField: string;
  nameField: string;
  className?: string;
  isMulti?: boolean;
  isClearable?: boolean;
  optionData?: any[];
  disabled?: boolean;
  value?: any;
  onChange?: (selected: any) => void;
};

export default function CustomSelect({
  idField,
  nameField,
  className,
  isMulti,
  isClearable,
  optionData,
  disabled,
  value,
  onChange,
}: customSelectType) {
  return (
    <Select
      options={optionData}
      isMulti={!!isMulti}
      isClearable={!!isClearable}
      id={idField}
      name={nameField}
      isDisabled={!!disabled}
      value={value}
      onChange={onChange}
      className={className}
    ></Select>
  );
}
