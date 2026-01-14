import express from "express";
import Booking from "../models/Booking.js";
import House from "../models/House.js";
import { authenticate } from "../middlewares/auth.js";

const router = express.Router();

const normalizeDate = (dateString) => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return null;
  return date;
};

const hasOverlap = async (houseId, checkIn, checkOut, excludeBookingId) => {
  const query = {
    house: houseId,
    status: { $in: ["pending", "approved"] },
    $or: [
      {
        checkIn: { $lt: checkOut },
        checkOut: { $gt: checkIn },
      },
    ],
  };

  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }

  const overlapping = await Booking.findOne(query);
  return !!overlapping;
};

// ============================
// Check Availability
// ============================
router.post("/availability", authenticate, async (req, res) => {
  try {
    const { checkIn, checkOut } = req.body;

    const checkInDate = normalizeDate(checkIn);
    const checkOutDate = normalizeDate(checkOut);

    if (!checkInDate || !checkOutDate) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({ message: "Check-out must be after check-in." });
    }

    const conflictingBookings = await Booking.find({
      status: { $in: ["pending", "approved"] },
      $or: [
        {
          checkIn: { $lt: checkOutDate },
          checkOut: { $gt: checkInDate },
        },
      ],
    }).select("house");

    const unavailableHouseIds = conflictingBookings.map((booking) => booking.house);

    const availableHouses = await House.find({
      status: "approved",
      _id: { $nin: unavailableHouseIds },
    });

    res.json({ available: availableHouses });
  } catch (err) {
    console.error("Availability check failed:", err);
    res.status(500).json({ message: "Failed to check availability" });
  }
});

// ============================
// Create Booking Request (Renter)
// ============================
router.post("/", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "renter") {
      return res.status(403).json({ message: "Only renters can request bookings." });
    }

    const { houseId, checkIn, checkOut, guests, message, transactionId } = req.body;

    if (!houseId || !checkIn || !checkOut || !transactionId) {
      return res
        .status(400)
        .json({ message: "House, dates, and transaction ID are required." });
    }

    const checkInDate = normalizeDate(checkIn);
    const checkOutDate = normalizeDate(checkOut);

    if (!checkInDate || !checkOutDate || checkInDate >= checkOutDate) {
      return res.status(400).json({ message: "Invalid date range." });
    }

    const house = await House.findById(houseId);
    if (!house) {
      return res.status(404).json({ message: "House not found." });
    }

    const nights = Math.ceil(
      (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (nights <= 0) {
      return res.status(400).json({ message: "Stay must be at least one night." });
    }

    const totalAmount = nights * (house.price || 0);

    const overlap = await hasOverlap(houseId, checkInDate, checkOutDate);
    if (overlap) {
      return res.status(409).json({ message: "Selected dates are not available." });
    }

    const booking = await Booking.create({
      house: houseId,
      renter: req.user.id,
      owner: house.owner,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests || 1,
      message,
      transactionId,
      totalAmount,
    });

    res.status(201).json({
      message: "Booking request submitted. Awaiting owner approval.",
      booking,
    });
  } catch (err) {
    console.error("Failed to create booking:", err);
    res.status(500).json({ message: "Failed to create booking." });
  }
});

// ============================
// Get renter bookings
// ============================
router.get("/mine", authenticate, async (req, res) => {
  try {
    const filter =
      req.user.role === "renter"
        ? { renter: req.user.id }
        : req.user.role === "owner"
        ? { owner: req.user.id }
        : {};

    const bookings = await Booking.find(filter)
      .populate("house")
      .populate("renter", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
});

// ============================
// Owner: Pending requests
// ============================
router.get("/owner/pending", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owners can view pending requests." });
    }

    const bookings = await Booking.find({
      owner: req.user.id,
      status: "pending",
    })
      .populate("house")
      .populate("renter", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending bookings." });
  }
});

// ============================
// Update booking status (owner)
// ============================
router.patch("/:id/status", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owners can update bookings." });
    }

    const { action } = req.body;
    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ message: "Invalid action." });
    }

    const booking = await Booking.findById(req.params.id)
      .populate("house")
      .populate("renter", "name email");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found." });
    }

    if (booking.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "You cannot update this booking." });
    }

    if (action === "approve") {
      const overlap = await hasOverlap(
        booking.house,
        booking.checkIn,
        booking.checkOut,
        booking._id
      );
      if (overlap) {
        return res.status(409).json({ message: "Another booking already covers these dates." });
      }
      booking.status = "approved";
    } else {
      booking.status = "rejected";
    }

    await booking.save();

    res.json({
      message: `Booking ${action === "approve" ? "approved" : "rejected"} successfully.`,
      booking,
    });
  } catch (err) {
    console.error("Failed to update booking status:", err);
    res.status(500).json({ message: "Failed to update booking status." });
  }
});

export default router;

