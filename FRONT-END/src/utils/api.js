// src/utils/api.js

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Generic API request handler
 */
async function request(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      credentials: "include", // for cookies / auth if needed
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "API request failed");
    }

    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

/* =========================
   AUTH
========================= */
export const login = (data) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const logout = () =>
  request("/auth/logout", { method: "POST" });

/* =========================
   USERS
========================= */
export const getUsers = () => request("/users");

export const createUser = (data) =>
  request("/users", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const deleteUser = (id) =>
  request(`/users/${id}`, { method: "DELETE" });

/* =========================
   DASHBOARD
========================= */
export const getDashboardStats = () =>
  request("/dashboard/stats");

/* =========================
   REPORTS
========================= */
export const getReports = (params = "") =>
  request(`/reports${params}`);
