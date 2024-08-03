import React, { useRef } from "react";
import { FaFilter } from "react-icons/fa";
import { useOutsideClick } from "@/hooks/useOutsideClick"; // Import hook

interface FilterMenuProps {
  filterPriority: string;
  filterStatus: string;
  onFilterPriorityChange: (priority: string) => void;
  onFilterStatusChange: (status: string) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  filterPriority,
  filterStatus,
  onFilterPriorityChange,
  onFilterStatusChange,
}) => {
  const [showFilterMenu, setShowFilterMenu] = React.useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setShowFilterMenu(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setShowFilterMenu(prev => !prev)}
        className="border rounded-xl px-2 py-1"
      >
        <FaFilter />
      </button>
      {showFilterMenu && (
        <div className="absolute top-12 right-0 bg-white border rounded-xl shadow-lg p-4">
          <div>
            <h3 className="font-semibold mb-2">Filter By Priority</h3>
            <button
              onClick={() => onFilterPriorityChange("HIGH")}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            >
              High Priority
            </button>
            <button
              onClick={() => onFilterPriorityChange("MEDIUM")}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            >
              Medium Priority
            </button>
            <button
              onClick={() => onFilterPriorityChange("LOW")}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            >
              Low Priority
            </button>
            <button
              onClick={() => onFilterPriorityChange("")}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100 mt-2"
            >
              Clear Priority Filter
            </button>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Filter By Status</h3>
            <button
              onClick={() => onFilterStatusChange("resolved")}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            >
              Resolved
            </button>
            <button
              onClick={() => onFilterStatusChange("unresolved")}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100"
            >
              Unresolved
            </button>
            <button
              onClick={() => onFilterStatusChange("")}
              className="block w-full text-left px-2 py-1 hover:bg-gray-100 mt-2"
            >
              Clear Status Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
