import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../utils/apiConfig";

const UploadGuestHouse = () => {
  const { user, token, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if not authenticated or not owner
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    if (user?.role !== "owner") {
      setError("Only owners can upload guest houses.");
      // Redirect to home after showing error
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user, isAuthenticated, navigate]);

  const [form, setForm] = useState({
    title: "",
    address: "",
    ownerName: user?.name || "",
    phone: "",
    price: "",
    rooms: "",
    guests: "",
    distance: "",
    college: "",
    amenities: [],
    categories: [],
    genderPreference: "Any",
    driveLink: "",
  });

  const [images, setImages] = useState([]);
  const [qrCodeFile, setQrCodeFile] = useState(null);
  const categoryOptions = ["PG Accommodation", "Hostel", "Studio", "Apartment", "Shared Room", "Private Room"];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAmenity = (amenity) => {
    const exists = form.amenities.includes(amenity);
    setForm({
      ...form,
      amenities: exists
        ? form.amenities.filter((a) => a !== amenity)
        : [...form.amenities, amenity],
    });
  };

  const handleImageUpload = (e) => {
    setImages([...e.target.files]);
  };

  const handleCategoryToggle = (category) => {
    const exists = form.categories.includes(category);
    setForm({
      ...form,
      categories: exists
        ? form.categories.filter((c) => c !== category)
        : [...form.categories, category],
    });
  };

  const handleQrUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setQrCodeFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.driveLink.trim()) {
      setError("Please provide the Google Drive link with property media.");
      return;
    }
    if (!qrCodeFile) {
      setError("Please upload a payment QR code.");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("address", form.address);
    formData.append("ownerName", form.ownerName);
    formData.append("phone", form.phone);
    formData.append("price", form.price);
    formData.append("rooms", form.rooms);
    formData.append("guests", form.guests);
    formData.append("distance", form.distance);
    formData.append("college", form.college);
    formData.append("genderPreference", form.genderPreference);
    formData.append("driveLink", form.driveLink.trim());
    
    // Append amenities as array
    form.amenities.forEach((a) => {
      formData.append("amenities", a);
    });

    form.categories.forEach((c) => {
      formData.append("categories", c);
    });

    // Append images
    images.forEach((img) => {
      formData.append("images", img);
    });

    formData.append("qrCode", qrCodeFile);

    try {
      if (!token) {
        throw new Error("You must be logged in to upload a guest house");
      }

      if (user?.role !== "owner") {
        throw new Error("Only owners can upload guest houses");
      }

      const uploadUrl = API_ENDPOINTS.HOUSES.UPLOAD;
      console.log("Uploading to:", uploadUrl);

      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          // Don't set Content-Type for FormData - browser will set it with boundary
        },
        body: formData,
      });

      // Check if response is ok before trying to parse JSON
      if (!res.ok) {
        let errorMessage = "Upload failed";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch (e) {
          // If response is not JSON, use status text
          errorMessage = res.statusText || `Server error (${res.status})`;
        }
        throw new Error(errorMessage);
      }

      const data = await res.json();

      alert("Guest House Uploaded Successfully! It will be visible to everyone after admin approval.");
      navigate("/guest-house");

    } catch (err) {
      let errorMessage = err.message || "Failed to upload guest house. Please try again.";
      
      // Provide more helpful error messages
      if (err.message.includes("Failed to fetch") || err.name === "TypeError") {
        errorMessage = "Cannot connect to server. Please make sure the backend is running on port 5000.";
      }
      
      setError(errorMessage);
      console.error("Upload error:", err);
      console.error("API URL:", API_ENDPOINTS.HOUSES.UPLOAD);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-orange-600 mb-4">
        Upload Guest House
      </h2>

      <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Guest House Name"
          value={form.title} onChange={handleChange} required
          className="border p-2 rounded" />

        <input type="text" name="address" placeholder="Address in Jaipur"
          value={form.address} onChange={handleChange} required
          className="border p-2 rounded" />

        <input type="text" name="ownerName" placeholder="Owner Name"
          value={form.ownerName} onChange={handleChange}
          className="border p-2 rounded" />

        <input type="text" name="phone" placeholder="Phone Number"
          value={form.phone} onChange={handleChange} required
          className="border p-2 rounded" />

        <input type="number" name="price" placeholder="₹ Price per night"
          value={form.price} onChange={handleChange} required
          className="border p-2 rounded" />

        <div className="grid grid-cols-2 gap-4">
          <input type="number" name="rooms" placeholder="Total Rooms"
            value={form.rooms} onChange={handleChange} className="border p-2 rounded" />

          <input type="number" name="guests" placeholder="Guests Capacity"
            value={form.guests} onChange={handleChange} className="border p-2 rounded" />
        </div>

        <input type="text" name="college" placeholder="Near College (LNM, JECRC, MNIT...)"
          value={form.college} onChange={handleChange} className="border p-2 rounded" />

        <input type="text" name="distance" placeholder="Distance from college (e.g. 1.2 km)"
          value={form.distance} onChange={handleChange} className="border p-2 rounded" />

        <label className="font-medium mt-2">Gender Preference</label>
        <select
          name="genderPreference"
          value={form.genderPreference}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Any">Any</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label className="font-medium">Categories</label>
        <div className="flex flex-wrap gap-3">
          {categoryOptions.map((category) => (
            <label key={category} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.categories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
              />
              {category}
            </label>
          ))}
        </div>

        <label className="font-medium">Amenities</label>
        <div className="flex gap-3">
          {["WiFi", "AC", "Gym", "Parking", "Food"].map((a) => (
            <label key={a} className="flex gap-2 items-center">
              <input
                type="checkbox"
                checked={form.amenities.includes(a)}
                onChange={() => handleAmenity(a)}
              />
              {a}
            </label>
          ))}
        </div>

        <label className="font-medium">Google Drive Media Folder Link</label>
        <input
          type="url"
          name="driveLink"
          placeholder="https://drive.google.com/..."
          value={form.driveLink}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />
        <p className="text-xs text-gray-500 -mt-2 mb-2">
          Upload all property photos/videos to Drive and share a view-only link.
        </p>

        <label className="font-medium">Upload Images</label>
        <input type="file" multiple onChange={handleImageUpload}
          className="border p-2 rounded" />

        <label className="font-medium mt-2">Payment QR Code (Required)</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleQrUpload}
          className="border p-2 rounded"
          required
        />
        <p className="text-xs text-gray-500">
          Renters will pay using this QR code during booking. Ensure it is clear and up to date.
        </p>

        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-orange-600 text-white py-2 rounded hover:bg-orange-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
};

export default UploadGuestHouse;
