import React from "react";
import Image from "next/image";

interface SearchInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

function SearchFieldInput({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchInputProps) {
  return (
    <div className={className}>
      <div className="iconInputholder flex items-center gap-4 border-2 border-[#EAEBF0] rounded-xl px-2">
        <span className="w-7 h-10 flex justify-center items-center px-1">
          <Image
            src="/assets/images/searchVector.svg"
            alt="search icon"
            width={100}
            height={100}
          />
        </span>
        <span className="inputHolder flex-1">
          <input
            type="text"
            className="outline-0 h-6 border-none w-full"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </span>
      </div>
    </div>
  );
}

export default SearchFieldInput;
