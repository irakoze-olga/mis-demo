// src/utils/helpers.js

/**
 * Format numbers with commas
 * Example: 12000 → 12,000
 */
export const formatNumber = (value) => {
  if (value == null) return "0";
  return Number(value).toLocaleString();
};

/**
 * Format date to readable form
 * Example: 2026-02-01 → Feb 1, 2026
 */
export const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Filter table data by search text
 */
export const filterBySearch = (data, search, fields = []) => {
  if (!search) return data;

  return data.filter((item) =>
    fields.some((field) =>
      String(item[field] || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    )
  );
};

/**
 * Filter data by exact field match
 */
export const filterByValue = (data, field, value) => {
  if (!value) return data;
  return data.filter((item) => item[field] === value);
};

/**
 * Capitalize first letter
 */
export const capitalize = (text = "") =>
  text.charAt(0).toUpperCase() + text.slice(1);

/**
 * Debounce function (for search inputs)
 */
export const debounce = (func, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};
