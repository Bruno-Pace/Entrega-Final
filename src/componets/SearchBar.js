import React from "react";

const SearchBar = ({ setSearch }) => {
  const handleSearch = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    setSearch(searchValue);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar Pokémon..."
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
