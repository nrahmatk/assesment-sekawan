import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchInputProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInput: React.FC<SearchInputProps> = ({ search, setSearch }) => {
  const [showSearch, setShowSearch] = React.useState(false);

  return (
    <>
      <button
        onClick={() => setShowSearch(prev => !prev)}
        className="border rounded-xl px-2 py-1"
      >
        <FaSearch />
      </button>
      {showSearch && (
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-xl px-2 py-1"
        />
      )}
    </>
  );
};

export default SearchInput;
