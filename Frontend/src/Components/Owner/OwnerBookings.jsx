import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_ENDPOINTS } from "../../utils/apiConfig";
import { FiCalendar, FiMapPin, FiUser, FiMail, FiDollarSign } from "react-icons/fi";

const OwnerBookings = () => {
  const { token, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [pendingBookings, setPendingBookings] = useState([]);
  const [upcomingBooking, setUpcomingBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "owner") {
      navigate("/login");
      return;
    }
    fetchPendingBookings();
    fetchUpcomingBooking();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const fetchPendingBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(API_ENDPOINTS.BOOKINGS.OWNER_PENDING, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load booking requests.");
      setPendingBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUpcomingBooking = async () => {
    try {
      const res = await fetch(API_ENDPOINTS.BOOKINGS.MINE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load bookings.");
      const now = new Date();
      const upcoming = data
        .filter((booking) => booking.status === "approved" && new Date(booking.checkIn) >= now)
        .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn))[0];
      setUpcomingBooking(upcoming || null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAction = async (bookingId, action) => {
    try {
      setActionLoading(bookingId);
      const res = await fetch(API_ENDPOINTS.BOOKINGS.STATUS(bookingId), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Failed to ${action} booking.`);
      fetchPendingBookings();
      fetchUpcomingBooking();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking requests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Requests</h1>
          <p className="text-gray-600">
            Review and respond to renters who are interested in your guest houses.
          </p>
        </div>

        {upcomingBooking && (
          <div className="bg-white rounded-lg shadow p-5 mb-6 border-l-4 border-green-500">
            <p className="text-sm uppercase text-green-600 font-semibold">Next Booking</p>
            <h3 className="text-xl font-semibold text-gray-800 mt-1">
              {upcomingBooking.house?.title || "Guest House"}
            </h3>
            <p className="text-gray-600 flex items-center gap-2 mt-2">
              <FiCalendar />
              {new Date(upcomingBooking.checkIn).toLocaleDateString()} -{" "}
              {new Date(upcomingBooking.checkOut).toLocaleDateString()}
            </p>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <FiUser /> {upcomingBooking.renter?.name || "Renter"}
            </p>
            <p className="text-gray-600 flex items-center gap-2 mt-1">
              <FiDollarSign /> ₹{upcomingBooking.totalAmount || 0}
            </p>
            <p className="text-xs text-gray-500">
              Transaction ID: {upcomingBooking.transactionId || "N/A"}
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {pendingBookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No pending requests</h2>
            <p className="text-gray-600">
              You have no booking requests waiting for approval. Check again later!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {pendingBookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow p-6">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {booking.house?.title || "Guest House"}
                    </h3>
                    <p className="text-gray-600 flex items-center mt-1">
                      <FiMapPin className="mr-2" /> {booking.house?.address || "Address not available"}
                    </p>
                    <div className="flex gap-4 text-sm text-gray-600 mt-3">
                      <span className="flex items-center gap-1">
                        <FiCalendar /> {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                        {new Date(booking.checkOut).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiUser /> {booking.guests || 1} guests
                      </span>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <p className="font-medium text-gray-700">Renter</p>
                    <p className="text-gray-800 flex items-center gap-2">
                      <FiUser /> {booking.renter?.name || "Name hidden"}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <FiMail /> {booking.renter?.email || "No email"}
                    </p>
                    {booking.message && (
                      <p className="text-gray-500 mt-2 italic">“{booking.message}”</p>
                    )}
                  </div>
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <FiDollarSign /> Total: ₹{booking.totalAmount || 0}
                  </p>
                  <p className="text-xs text-gray-500">
                    Transaction ID: {booking.transactionId || "N/A"}
                  </p>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => handleAction(booking._id, "approve")}
                    disabled={actionLoading === booking._id}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition disabled:bg-gray-400"
                  >
                    {actionLoading === booking._id ? "Processing..." : "Approve"}
                  </button>
                  <button
                    onClick={() => handleAction(booking._id, "reject")}
                    disabled={actionLoading === booking._id}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-medium transition disabled:bg-gray-400"
                  >
                    {actionLoading === booking._id ? "Processing..." : "Reject"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerBookings;

