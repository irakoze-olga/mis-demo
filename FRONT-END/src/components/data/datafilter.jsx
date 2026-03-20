import React from "react";

/**
 * DataFilter Component
 * Reusable search and filter bar
 */
const DataFilter = ({
  searchValue,
  onSearchChange,
  filterValue,
  onFilterChange,
  filterOptions = [],
  placeholder = "Search...",
}) => {
  return (
    <div style={styles.container}>
      <input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        style={styles.input}
      />

      <select
        value={filterValue}
        onChange={(e) => onFilterChange(e.target.value)}
        style={styles.select}
      >
        <option value="">All</option>
        {filterOptions.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

/**
 * Internal CSS Styles
 */
const styles = {
  container: {
    display: "flex",
    gap: "10px",
    marginBottom: "15px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  select: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
};

export default DataFilter;
