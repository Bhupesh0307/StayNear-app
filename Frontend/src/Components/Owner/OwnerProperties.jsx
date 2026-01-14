import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_ENDPOINTS } from "../../utils/apiConfig";
import { FiMapPin, FiPhone, FiEdit3, FiImage } from "react-icons/fi";

const OwnerProperties = () => {
  const { token, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState({ id: null, type: null });
  const statusStyles = {
    approved: "bg-green-100 text-green-700",
    pending: "bg-yellow-100 text-yellow-700",
    rejected: "bg-red-100 text-red-700",
    unlisted: "bg-gray-100 text-gray-700",
  };
  const placeholderImage = "https://via.placeholder.com/400x300?text=No+Image";
  const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "owner") {
      navigate("/login");
      return;
    }
    fetchProperties();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(API_ENDPOINTS.HOUSES.OWNER, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load properties.");
      setProperties(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVisibilityChange = async (houseId, action) => {
    const confirmMsg =
      action === "unlist"
        ? "Are you sure you want to unlist this property? Renters will no longer see it."
        : "Relist this property? It will be sent for admin approval.";
    if (!window.confirm(confirmMsg)) return;
    try {
      setActionLoading({ id: houseId, type: action });
      const res = await fetch(API_ENDPOINTS.HOUSES.VISIBILITY(houseId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update property.");
      await fetchProperties();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  const handleDelete = async (houseId) => {
    if (
      !window.confirm(
        "This will permanently remove the property and related bookings. Continue?"
      )
    )
      return;
    try {
      setActionLoading({ id: houseId, type: "delete" });
      const res = await fetch(API_ENDPOINTS.HOUSES.DELETE(houseId), {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete property.");
      await fetchProperties();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading({ id: null, type: null });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your properties...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Properties</h1>
            <p className="text-gray-600">
              Manage the guest houses you’ve listed on the platform.
            </p>
          </div>
          <button
            onClick={() => navigate("/upload-guest-house")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-md font-semibold"
          >
            <FiEdit3 className="inline mr-2" />
            Add New Property
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {properties.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-5xl mb-4">🏠</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No properties yet</h2>
            <p className="text-gray-600">
              Start adding properties to showcase your guest houses to renters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {properties.map((house) => (
              <div key={house._id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="h-48 bg-gray-100">
                  {house.images && house.images.length > 0 ? (
                    <img
                      src={`${API_BASE}/uploads/${house.images[0]}`}
                      alt={house.title}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = placeholderImage)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <FiImage size={48} />
                    </div>
                  )}
                </div>
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800">{house.title}</h3>
                      <p className="text-gray-600 flex items-center gap-2 mt-2">
                        <FiMapPin />
                        {house.address}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2 mt-1">
                        <FiPhone />
                        {house.phone || "No phone number"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        statusStyles[house.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {house.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                      ₹{house.price}/night
                    </span>
                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-700">
                      {house.rooms || "N/A"} rooms
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700">
                      {house.guests || "N/A"} guests
                    </span>
                    <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                      Gender: {house.genderPreference || "Any"}
                    </span>
                  </div>
                  {house.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                      {house.categories.map((cat) => (
                        <span key={cat} className="px-2 py-1 rounded-full bg-gray-100">
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                  {house.driveLink && (
                    <a
                      href={house.driveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center text-sm text-blue-600 hover:underline"
                    >
                      View Google Drive media folder
                    </a>
                  )}
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-700">Payment QR Code</p>
                      <p className="text-xs text-gray-500">
                        Renters will see this when submitting booking requests.
                      </p>
                    </div>
                    <img
                      src={
                        house.qrCodeImage
                          ? `${API_BASE}/uploads/${house.qrCodeImage}`
                          : placeholderImage
                      }
                      alt="QR Code"
                      className="w-20 h-20 object-contain border rounded"
                      onError={(e) => (e.target.src = placeholderImage)}
                    />
                  </div>
                  <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-100 mt-4">
                    {house.status === "unlisted" ? (
                      <button
                        onClick={() => handleVisibilityChange(house._id, "relist")}
                        disabled={
                          actionLoading.id === house._id && actionLoading.type === "relist"
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded-md text-sm font-medium hover:bg-green-700 disabled:bg-gray-400"
                      >
                        {actionLoading.id === house._id && actionLoading.type === "relist"
                          ? "Processing..."
                          : "Relist"}
                      </button>
                    ) : (
                      <button
                        onClick={() => handleVisibilityChange(house._id, "unlist")}
                        disabled={
                          actionLoading.id === house._id && actionLoading.type === "unlist"
                        }
                        className="px-4 py-2 bg-yellow-500 text-white rounded-md text-sm font-medium hover:bg-yellow-600 disabled:bg-gray-400"
                      >
                        {actionLoading.id === house._id && actionLoading.type === "unlist"
                          ? "Processing..."
                          : "Unlist"}
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(house._id)}
                      disabled={actionLoading.id === house._id && actionLoading.type === "delete"}
                      className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700 disabled:bg-gray-400"
                    >
                      {actionLoading.id === house._id && actionLoading.type === "delete"
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerProperties;

