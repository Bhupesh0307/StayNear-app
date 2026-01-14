import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/apiConfig";
import { FiCheck, FiX, FiImage, FiMapPin, FiPhone, FiUser, FiDollarSign, FiUsers } from "react-icons/fi";
import { FaSchool } from "react-icons/fa";

const AdminDashboard = () => {
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [pendingHouses, setPendingHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    // Wait for auth context to finish loading
    if (authLoading) return;

    if (!isAuthenticated || !token) {
      navigate("/login");
      return;
    }
    if (user?.role !== "admin") {
      navigate("/");
      return;
    }
    // Only fetch if we have token and user is admin
    if (token && user?.role === "admin") {
      fetchPendingHouses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAuthenticated, token, navigate, authLoading]);

  const fetchPendingHouses = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      const url = API_ENDPOINTS.HOUSES.PENDING;
      console.log("🔍 Fetching pending houses from:", url);
      console.log("🔍 Token available:", !!token);
      console.log("🔍 Token (first 20 chars):", token ? token.substring(0, 20) + "..." : "none");

      const res = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("📡 Response status:", res.status);
      console.log("📡 Response headers:", Object.fromEntries(res.headers.entries()));

      if (!res.ok) {
        let errorMessage = "Failed to fetch pending houses";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = res.statusText || `Server error (${res.status})`;
        }
        throw new Error(errorMessage);
      }

      const houses = await res.json();
      console.log("Fetched houses:", houses);
      setPendingHouses(houses);
    } catch (err) {
      const errorMsg = err.message || "Failed to load pending houses";
      setError(errorMsg);
      console.error("Error fetching pending houses:", err);
      console.error("Error details:", {
        message: err.message,
        name: err.name,
        stack: err.stack,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (houseId) => {
    try {
      setProcessing({ ...processing, [houseId]: true });
      const res = await fetch(API_ENDPOINTS.HOUSES.APPROVE(houseId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: "approve" }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to approve house");
      }

      // Remove from pending list
      setPendingHouses(pendingHouses.filter((h) => h._id !== houseId));
      alert("House approved successfully! It is now visible to the public.");
    } catch (err) {
      alert(err.message || "Failed to approve house");
      console.error("Error approving house:", err);
    } finally {
      setProcessing({ ...processing, [houseId]: false });
    }
  };

  const handleReject = async (houseId) => {
    if (!window.confirm("Are you sure you want to reject this guest house? This action cannot be undone.")) {
      return;
    }

    try {
      setProcessing({ ...processing, [houseId]: true });
      const res = await fetch(API_ENDPOINTS.HOUSES.APPROVE(houseId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: "reject" }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to reject house");
      }

      // Remove from pending list
      setPendingHouses(pendingHouses.filter((h) => h._id !== houseId));
      alert("House rejected successfully.");
    } catch (err) {
      alert(err.message || "Failed to reject house");
      console.error("Error rejecting house:", err);
    } finally {
      setProcessing({ ...processing, [houseId]: false });
    }
  };

  const getImageUrl = (imageName) => {
    if (!imageName) return "https://via.placeholder.com/400x300?text=No+Image";
    const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000" || "https://staynear-app-backend.onrender.com";
    return `${API_BASE}/uploads/${imageName}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading pending houses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Review and approve pending guest house listings
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <span className="font-medium">{error}</span>
              <button
                onClick={fetchPendingHouses}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
              >
                Retry
              </button>
            </div>
            <p className="text-sm mt-2 text-red-600">
              💡 Make sure the backend server is running on port 5000 and you're logged in as admin.
            </p>
          </div>
        )}

        {pendingHouses.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              No Pending Houses
            </h2>
            <p className="text-gray-600">
              All guest houses have been reviewed. Check back later for new submissions.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendingHouses.map((house) => (
              <div
                key={house._id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-200">
                  {house.images && house.images.length > 0 ? (
                    <img
                      src={getImageUrl(house.images[0])}
                      alt={house.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/400x300?text=No+Image";
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiImage size={48} />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-semibold">
                    PENDING
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {house.title || "Untitled Guest House"}
                  </h3>

                  <div className="space-y-2 mb-4">
                    {house.address && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <FiMapPin className="mr-2" size={16} />
                        <span>{house.address}</span>
                      </div>
                    )}

                    {house.ownerName && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <FiUser className="mr-2" size={16} />
                        <span>Owner: {house.ownerName}</span>
                      </div>
                    )}

                    {house.phone && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <FiPhone className="mr-2" size={16} />
                        <span>{house.phone}</span>
                      </div>
                    )}

                    {house.price && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <FiDollarSign className="mr-2" size={16} />
                        <span>₹{house.price}/night</span>
                      </div>
                    )}

                    {house.college && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <FaSchool className="mr-2" size={16} />
                        <span>Near {house.college}</span>
                      </div>
                    )}

                    {house.distance && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <span>{house.distance} from college</span>
                      </div>
                    )}

                    {house.rooms && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <FiUsers className="mr-2" size={16} />
                        <span>{house.rooms} rooms, {house.guests || "N/A"} guests</span>
                      </div>
                    )}
                  </div>

                  {/* Amenities */}
                  {house.amenities && house.amenities.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-medium text-gray-700 mb-1">Amenities:</p>
                      <div className="flex flex-wrap gap-1">
                        {house.amenities.map((amenity, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleApprove(house._id)}
                      disabled={processing[house._id]}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <FiCheck size={18} />
                      {processing[house._id] ? "Processing..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handleReject(house._id)}
                      disabled={processing[house._id]}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <FiX size={18} />
                      {processing[house._id] ? "Processing..." : "Reject"}
                    </button>
                  </div>

                  {/* Submission Info */}
                  {house.createdAt && (
                    <p className="text-xs text-gray-500 mt-2">
                      Submitted: {new Date(house.createdAt).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {pendingHouses.length > 0 && (
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <p className="text-3xl font-bold text-yellow-600">{pendingHouses.length}</p>
                <p className="text-gray-600">Pending Review</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

