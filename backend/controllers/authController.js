import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { registerValidator, loginValidator } from "../utils/validators.js";


const SALT_ROUNDS = 10;


export const register = async (req, res, next) => {
try {
const { error } = registerValidator(req.body);
if (error) return res.status(400).json({ message: error.details[0].message });


const { name, email, password, role } = req.body;
const normalizedRole = ["owner", "renter"].includes(role) ? role : "renter";


const existing = await User.findOne({ email });
if (existing) return res.status(400).json({ message: "Email already registered" });


const hashed = await bcrypt.hash(password, SALT_ROUNDS);
const user = await User.create({ name, email, password: hashed, role: normalizedRole });


res.status(201).json({ message: "User registered", user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
next(err);
}
};


export const login = async (req, res, next) => {
try {
const { error } = loginValidator(req.body);
if (error) return res.status(400).json({ message: error.details[0].message });


const { email, password } = req.body;
const user = await User.findOne({ email });
if (!user) return res.status(401).json({ message: "Invalid credentials" });


const match = await bcrypt.compare(password, user.password);
if (!match) return res.status(401).json({ message: "Invalid credentials" });


const payload = { id: user._id, role: user.role };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || "7d" });


res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
} catch (err) {
next(err);
}
};


export const me = async (req, res, next) => {
try {
const user = await User.findById(req.user.id).select("-password");
if (!user) return res.status(404).json({ message: "User not found" });
res.json({ user });
} catch (err) {
next(err);
}
};