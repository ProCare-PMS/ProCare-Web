import React, { useState } from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface DropDownProps {
  icon?: LucideIcon;
  label?: string;
  useLink?: boolean;
}

const AvatarDropDown = ({
  icon: Icon,
  label,
  useLink = false,
}: DropDownProps) => {
  const [openModal, setOpenModal] = useState(false);

  const handleClick = () => {
    if (!useLink) {
      // Open modal logic here (you can implement this part)
      setOpenModal(true);
    }
  };

  if (!Icon) {
    return null; // Or some fallback JSX if applicable
  }
  return (
    <div className="bg-blue-600 absolute top-12 shadow-md hover:shadow-lg left-0 z-20 rounded-[8px]">
      <h3>dddd</h3>
      {useLink ? (
        <Link href={`/${label?.toLowerCase()}`} passHref>
          <a className="flex items-center p-2">
            <Icon size="24" /> {/* Render the icon */}
            <span className="ml-2">{label}</span> {/* Render the label */}
          </a>
        </Link>
      ) : (
        <div
          className="flex items-center p-2 cursor-pointer"
          onClick={handleClick}
        >
          <Icon size="24" /> {/* Render the icon */}
          <span className="ml-2">{label}</span> {/* Render the label */}
        </div>
      )}

      {/* Example Modal (replace with your modal implementation) */}
      {openModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2>Modal Content</h2>
            <button onClick={() => setOpenModal(false)}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AvatarDropDown;
