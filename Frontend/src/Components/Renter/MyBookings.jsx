import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_ENDPOINTS } from "../../utils/apiConfig";
import { FiCalendar, FiMapPin, FiUser, FiCheckCircle, FiClock, FiDollarSign } from "react-icons/fi";

const MyBookings = () => {
  const { token, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "renter") {
      navigate("/login");
      return;
    }
    fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, user]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(API_ENDPOINTS.BOOKINGS.MINE, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to load bookings.");
      setBookings(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Bookings</h1>
          <p className="text-gray-600">
            Track the status of your booking requests and upcoming stays.
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-5xl mb-4">🛏️</div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">No bookings yet</h2>
            <p className="text-gray-600">
              Start exploring guest houses and send your first booking request!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow p-6 border-l-4 border-orange-500">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                      {booking.house?.title || "Guest House"}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-2 mt-1">
                      <FiMapPin /> {booking.house?.address || "Address not available"}
                    </p>
                    <p className="text-gray-600 flex items-center gap-2 mt-2">
                      <FiCalendar />
                      {new Date(booking.checkIn).toLocaleDateString()} -{" "}
                      {new Date(booking.checkOut).toLocaleDateString()}
                    </p>
                    {booking.message && (
                      <p className="text-gray-500 mt-2 italic">“{booking.message}”</p>
                    )}
                    <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-700">
                      <span className="flex items-center gap-2">
                        <FiDollarSign /> Total Paid: ₹{booking.totalAmount || 0}
                      </span>
                      <span className="text-xs text-gray-500">
                        Transaction ID: {booking.transactionId || "N/A"}
                      </span>
                    </div>
                    {booking.house?.driveLink && (
                      <a
                        href={booking.house.driveLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 text-xs mt-2 inline-block hover:underline"
                      >
                        View property media (Drive link)
                      </a>
                    )}
                  </div>
                  <div className="md:text-right">
                    <p className="text-sm uppercase text-gray-500">Status</p>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        booking.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : booking.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {booking.status === "approved" ? <FiCheckCircle /> : <FiClock />}
                      {booking.status}
                    </span>
                    <p className="text-gray-500 text-sm mt-3">
                      Requested on {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
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

export default MyBookings;

