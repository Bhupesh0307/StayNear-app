import mongoose from "mongoose";


const userSchema = new mongoose.Schema(
{
name: { type: String, required: true, trim: true },
email: { type: String, required: true, unique: true, lowercase: true, trim: true },
password: { type: String, required: true },
role: { type: String, enum: ["admin", "owner", "renter"], default: "renter" },
phone: { type: String },
avatarUrl: { type: String },
},
{ timestamps: true }
);


export default mongoose.model("User", userSchema);