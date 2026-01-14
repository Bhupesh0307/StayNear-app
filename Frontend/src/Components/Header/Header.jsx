import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import StayNearLogo from "../../assets/Yellow and Black Modern Media Logo.png";
import { AuthContext } from "../../context/AuthContext";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/guest-house", label: "Housing" },
    { to: "/contact", label: "Contact Us" },
  ];

  if (user?.role === "owner") {
    navLinks.splice(3, 0, { to: "/upload-guest-house", label: "Upload" });
    navLinks.push({ to: "/owner-properties", label: "My Properties" });
    navLinks.push({ to: "/owner-bookings", label: "Requests" });
  }

  if (user?.role === "renter") {
    navLinks.push({ to: "/my-bookings", label: "My Bookings" });
  }

  if (user?.role === "admin") {
    navLinks.push({ to: "/admin-dashboard", label: "Admin" });
  }

  return (
    <header className="shadow sticky top-0 z-50 bg-white w-full transition-all duration-300">
      <nav className="border-b border-gray-200 px-4 lg:px-6 py-3">
        <div className="flex justify-between items-center">
          {/* ✅ Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={StayNearLogo}
              className="h-10 w-auto rounded-lg"
              alt="StayNear Logo"
            />
            <span className="text-lg font-semibold text-gray-800">
              StayNear
            </span>
          </Link>

          {/* ✅ Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-gray-800 focus:outline-none"
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* ✅ Navigation Links */}
          <div
            className={`${
              menuOpen
                ? "block absolute top-16 left-0 w-full bg-white border-t border-gray-200"
                : "hidden"
            } lg:flex lg:items-center lg:static lg:w-auto`}
          >
            <ul className="flex flex-col lg:flex-row lg:space-x-8 items-center text-center lg:text-left">
              {navLinks.map((item) => (
                <li key={item.to} className="w-full lg:w-auto">
                  <NavLink
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block py-3 px-4 transition-all ${
                        isActive
                          ? "text-orange-600 font-semibold"
                          : "text-gray-700 hover:text-orange-600"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}

              {/* ✅ Auth Buttons / User Info */}
              <li className="mt-2 lg:mt-0">
                {!user ? (
                  <div className="flex flex-col lg:flex-row gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setMenuOpen(false)}
                      className="border border-orange-600 text-orange-600 px-4 py-2 rounded-md hover:bg-orange-50 transition"
                    >
                      Signup
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col lg:flex-row items-center gap-3">
                    <div className="flex flex-col lg:flex-row items-center gap-2">
                      <span className="text-gray-800 font-medium">
                        Hi, {user.name || user.email}
                      </span>
                      {user.role && (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : user.role === "owner"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {user.role}
                        </span>
                      )}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
