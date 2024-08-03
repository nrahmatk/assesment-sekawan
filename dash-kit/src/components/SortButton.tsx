import React, { useRef } from "react";
import { FaSort } from "react-icons/fa";
import { useOutsideClick } from "@/hooks/useOutsideClick";

interface SortButtonProps {
  onSortChange: (sort: string) => void;
}

const SortButton: React.FC<SortButtonProps> = ({ onSortChange }) => {
  const [showSortMenu, setShowSortMenu] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setShowSortMenu(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setShowSortMenu(prev => !prev)}
        className="border rounded-xl px-2 py-1"
      >
        <FaSort />
      </button>
      {showSortMenu && (
        <div className="absolute top-12 right-0 bg-white border rounded-xl shadow-lg p-4">
          <h3 className="font-semibold mb-2">Sort By</h3>
          <button
            onClick={() => onSortChange("updated")}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
          >
            Updated
          </button>
          <button
            onClick={() => onSortChange("title")}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
          >
            Title
          </button>
          <button
            onClick={() => onSortChange("customerName")}
            className="block w-full text-left px-2 py-1 hover:bg-gray-100"
          >
            Customer Name
          </button>
        </div>
      )}
    </div>
  );
};

export default SortButton;
