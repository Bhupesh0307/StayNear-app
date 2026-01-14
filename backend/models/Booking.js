import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    house: { type: mongoose.Schema.Types.ObjectId, ref: "House", required: true },
    renter: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: true },
    guests: { type: Number, default: 1 },
    transactionId: { type: String, required: true },
    totalAmount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    message: { type: String },
  },
  { timestamps: true }
);

// Prevent overlapping bookings for same house
bookingSchema.index({ house: 1, checkIn: 1, checkOut: 1 });

export default mongoose.model("Booking", bookingSchema);

