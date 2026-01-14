// API Configuration
// This file centralizes API endpoint configuration
// In production, VITE_API_BASE_URL should be set in environment variables

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000" || "https://staynear-app-backend.onrender.com";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    ME: `${API_BASE_URL}/api/auth/me`,
  },
  HOUSES: {
    UPLOAD: `${API_BASE_URL}/api/houses/upload`,
    LIST: `${API_BASE_URL}/api/houses`,
    OWNER: `${API_BASE_URL}/api/houses/owner`,
    PENDING: `${API_BASE_URL}/api/houses/pending`,
    APPROVE: (id) => `${API_BASE_URL}/api/houses/${id}/approve`,
    VISIBILITY: (id) => `${API_BASE_URL}/api/houses/${id}/visibility`,
    DETAIL: (id) => `${API_BASE_URL}/api/houses/${id}`,
    DELETE: (id) => `${API_BASE_URL}/api/houses/${id}`,
  },
  BOOKINGS: {
    BASE: `${API_BASE_URL}/api/bookings`,
    AVAILABILITY: `${API_BASE_URL}/api/bookings/availability`,
    MINE: `${API_BASE_URL}/api/bookings/mine`,
    OWNER_PENDING: `${API_BASE_URL}/api/bookings/owner/pending`,
    STATUS: (id) => `${API_BASE_URL}/api/bookings/${id}/status`,
  },
};

