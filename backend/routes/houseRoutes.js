import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { authenticate } from "../middlewares/auth.js";
import House from "../models/House.js";
import User from "../models/User.js";

const router = express.Router();

// Get directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ===============================
// 💾 MULTER STORAGE (for Images)
// ===============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsPath = path.join(__dirname, "../uploads");
    cb(null, uploadsPath);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// =======================================================
// 🏡 1. UPLOAD A NEW GUEST HOUSE  (OWNER ONLY)
// =======================================================
router.post(
  "/upload",
  authenticate,
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "qrCode", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      if (req.user.role !== "owner") {
        return res.status(403).json({ message: "Only owners can upload guest houses" });
      }

      const {
        title,
        address,
        phone,
        price,
        rooms,
        guests,
        college,
        distance,
        amenities,
        categories,
        genderPreference,
        driveLink,
      } = req.body;

      if (!title || !address || !price || !driveLink) {
        return res
          .status(400)
          .json({ message: "Title, address, price, and media drive link are required." });
      }

      const qrCodeFile = req.files?.qrCode?.[0];
      if (!qrCodeFile) {
        return res.status(400).json({ message: "Payment QR code is required." });
      }

      const imageFiles = req.files?.images || [];
      const images = imageFiles.map((file) => file.filename);

      const parseArrayField = (value) => {
        if (!value) return [];
        if (Array.isArray(value)) return value.filter((item) => item && item.trim() !== "");
        return value
          .split(",")
          .map((item) => item.trim())
          .filter((item) => item !== "");
      };

      const amenitiesArray = parseArrayField(amenities);
      const categoriesArray = parseArrayField(categories);

      const ownerRecord = await User.findById(req.user.id).select("name");

      const newHouse = await House.create({
        title,
        address,
        ownerName: req.body.ownerName || ownerRecord?.name || "Owner",
        phone,
        price: Number(price),
        rooms: rooms ? Number(rooms) : undefined,
        guests: guests ? Number(guests) : undefined,
        college,
        distance,
        amenities: amenitiesArray,
        categories: categoriesArray,
        genderPreference: genderPreference || "Any",
        driveLink,
        qrCodeImage: qrCodeFile.filename,
        images,
        owner: req.user.id,
        status: "pending",
      });

      res.status(201).json({
        message:
          "Guest House Uploaded Successfully. It will be visible to renters once approved by admin.",
        house: newHouse,
      });
    } catch (err) {
      console.error("Upload Error:", err);
      res.status(500).json({ message: "Upload Failed", error: err.message });
    }
  }
);

// =======================================================
// 🏡 2b. GET PENDING HOUSES (ADMIN ONLY) - Must be before /:id routes
// =======================================================
router.get("/pending", authenticate, async (req, res) => {
  try {
    console.log("✅ Pending houses route hit");
    console.log("User role:", req.user.role);
    console.log("User ID:", req.user.id);
    
    if (req.user.role !== "admin") {
      console.log("❌ User is not admin");
      return res.status(403).json({ message: "Only admins can view pending houses" });
    }
    
    const houses = await House.find({ status: "pending" })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });
    console.log(`✅ Found ${houses.length} pending houses`);
    res.json(houses);
  } catch (err) {
    console.error("❌ Error in pending route:", err);
    res.status(500).json({ message: "Failed to fetch pending houses", error: err.message });
  }
});

// =======================================================
// 🏡 2. GET ALL HOUSES (PUBLIC - Only Approved)
// =======================================================
router.get("/", async (req, res) => {
  try {
    // Only return approved houses for public viewing
    const houses = await House.find({ status: "approved" })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch houses" });
  }
});

// =======================================================
// 🏡 2c. APPROVE/REJECT HOUSE (ADMIN ONLY)
// =======================================================
router.patch("/:id/approve", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can approve houses" });
    }

    const { action } = req.body; // "approve" or "reject"
    const house = await House.findById(req.params.id);

    if (!house) {
      return res.status(404).json({ message: "House not found" });
    }

    if (action === "approve") {
      house.status = "approved";
      house.approvedBy = req.user.id;
      house.approvedAt = new Date();
    } else if (action === "reject") {
      house.status = "rejected";
    } else {
      return res.status(400).json({ message: "Invalid action. Use 'approve' or 'reject'" });
    }

    await house.save();

    res.json({
      message: `House ${action === "approve" ? "approved" : "rejected"} successfully`,
      house,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update house status" });
  }
});

// =======================================================
// 🏡 3. GET SPECIFIC OWNER'S HOUSES (OWNER DASHBOARD) - Must be before /:id routes
// =======================================================
router.get("/owner", authenticate, async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.status(403).json({ message: "Only owners can view their properties" });
    }
    const houses = await House.find({ owner: req.user.id }).sort({ createdAt: -1 });
    res.json(houses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user's houses" });
  }
});

// =======================================================
// 🏡 3b. OWNER UPDATE VISIBILITY (UNLIST / RELIST)
// =======================================================
router.patch("/:id/visibility", authenticate, async (req, res) => {
  try {
    const { action } = req.body;
    if (!["unlist", "relist"].includes(action)) {
      return res.status(400).json({ message: "Invalid action. Use 'unlist' or 'relist'." });
    }

    const house = await House.findById(req.params.id);
    if (!house) return res.status(404).json({ message: "House not found" });

    const isOwner = house.owner.toString() === req.user.id;
    if (!isOwner && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not allowed to modify this house." });
    }

    if (action === "unlist") {
      house.status = "unlisted";
    } else if (action === "relist") {
      house.status = "pending";
      house.approvedBy = undefined;
      house.approvedAt = undefined;
    }

    await house.save({ validateBeforeSave: false });
    res.json({
      message: action === "unlist" ? "Property unlisted successfully." : "Property submitted for approval.",
      house,
    });
  } catch (err) {
    console.error("Visibility update failed:", err);
    res.status(500).json({ message: "Failed to update property visibility" });
  }
});

// =======================================================
// 🗑️ 4. DELETE HOUSE (OWNER ONLY)
// =======================================================
router.delete("/:id", authenticate, async (req, res) => {
  try {
    const house = await House.findById(req.params.id);

    if (!house) return res.status(404).json({ message: "House not found" });

    // Ensure only owner can delete
    if (house.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await house.deleteOne();

    res.json({ message: "House deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete house" });
  }
});

export default router;
