import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SortOption } from "@/types/sortOption"

interface SortDropdownProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const getSortOptionText = (option: SortOption): string => {
  const textMap: Record<SortOption, string> = {
    alphabetical: "A-Z",
    newest: "Newest",
    oldest: "Oldest",
  };
  return textMap[option];
};

const SortDropdown = forwardRef<HTMLDivElement, SortDropdownProps>(
  ({ sortOption, onSortChange, isOpen, onToggle }, ref) => {
    const handleSortChange = (option: SortOption) => {
      onSortChange(option);
    };

    return (
      <div className="relative w-full sm:w-auto" ref={ref}>
        <Button
          type="button"
          className="flex items-center gap-2 rounded-[12px] bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-inter w-full md:w-[120px]"
          variant="outline"
          onClick={onToggle}
        >
          {getSortOptionText(sortOption)} <ChevronDown size={16} />
        </Button>

        {isOpen && (
          <div className="bg-white absolute w-full md:w-[160px] top-12 left-0 z-20 rounded-[8px] shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
            <ul className="flex flex-col text-[#344054] items-center divide-y divide-gray-300">
              {(["alphabetical", "newest", "oldest"] as SortOption[]).map((option) => (
                <li
                  key={option}
                  className="px-3 py-2 text-sm w-full hover:bg-gray-50 transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => handleSortChange(option)}
                    className={`w-full text-left ${
                      sortOption === option ? "font-semibold" : ""
                    }`}
                  >
                    {getSortOptionText(option)}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

SortDropdown.displayName = "SortDropdown";
export default SortDropdown;