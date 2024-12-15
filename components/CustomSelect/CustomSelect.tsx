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
};

export default function CustomSelect({
  idField,
  nameField,
  className,
  isMulti,
  isClearable,
  optionData,
  disabled,
}: customSelectType) {
  return (
    <Select
      options={optionData}
      isMulti={!!isMulti}
      isClearable={!!isClearable}
      id={idField}
      name={nameField}
      isDisabled={!!disabled}
      //styles={}
      className={className}
    ></Select>
  );
}
