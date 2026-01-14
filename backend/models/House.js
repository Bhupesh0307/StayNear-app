import mongoose from "mongoose";

const houseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    address: { type: String, required: true },
    ownerName: { type: String },
    phone: { type: String },
    price: { type: Number, required: true },
    rooms: Number,
    guests: Number,
    college: String,
    distance: String,
    amenities: [String],
    categories: [String],
    genderPreference: {
      type: String,
      enum: ["Any", "Male", "Female"],
      default: "Any",
    },
    driveLink: { type: String, required: true },
    qrCodeImage: { type: String, required: true },
    images: [String],
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: {
      type: String,
    enum: ["pending", "approved", "rejected", "unlisted"],
      default: "pending",
    },
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    approvedAt: Date,
  },
  { timestamps: true }
);

export default mongoose.model("House", houseSchema);
