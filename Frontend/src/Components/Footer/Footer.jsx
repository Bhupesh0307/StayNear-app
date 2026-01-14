import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Twitter, Github, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react";
import StayNearLogo from "../../assets/Yellow and Black Modern Media Logo.png";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-white border-t">
            <div className="mx-auto w-full max-w-screen-xl p-6 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Logo and About Section */}
                    <div className="md:col-span-1">
                        <Link to="/" className="inline-block">
                            <img src={StayNearLogo} className="h-16 w-auto rounded-lg mb-4" alt="StayNear Logo" />
                        </Link>
                        <p className="text-gray-600 text-sm mb-4">
                            Finding comfortable and affordable accommodation near your college made simple.
                        </p>
                        <div className="flex flex-col space-y-2 text-gray-600 text-sm">
                            <div className="flex items-center">
                                <MapPin size={16} className="mr-2 text-blue-600" />
                                <span>Jaipur, Rajasthan, India</span>
                            </div>
                            <div className="flex items-center">
                                <Phone size={16} className="mr-2 text-blue-600" />
                                <span>+91 63774 91725</span>
                            </div>
                            <div className="flex items-center">
                                <Mail size={16} className="mr-2 text-blue-600" />
                                <span>info@staynear.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:col-span-3">
                        {/* Quick Links */}
                        <div>
                            <h2 className="text-sm font-bold text-gray-900 uppercase mb-4">Quick Links</h2>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        About Us
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/guest-house" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        Guest Houses
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/upload-guest-house" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        List Your Property
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        Contact Us
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h2 className="text-sm font-bold text-gray-900 uppercase mb-4">Resources</h2>
                            <ul className="space-y-3">
                                
                                <li>
                                    <a
                                        href="https://github.com/Bhupesh0307/StayNear"
                                        className="text-gray-600 hover:text-blue-600 transition-colors"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        GitHub Repository
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Legal */}
                        <div>
                            <h2 className="text-sm font-bold text-gray-900 uppercase mb-4">Legal</h2>
                            <ul className="space-y-3">
                                <li>
                                    <Link to="/policy-page" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/policy-page" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        Terms & Conditions
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/policy-page" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        Cookie Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/policy-page" className="text-gray-600 hover:text-blue-600 transition-colors">
                                        Refund Policy
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-200 mb-6" />

                {/* Copyright & Socials */}
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <span className="text-sm text-gray-600 mb-4 sm:mb-0">
                        © {currentYear}{" "}
                        <a 
                            href="https://www.linkedin.com/in/bhupesh-jha-09aa5323a/" 
                            className="text-blue-600 hover:underline"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Bhupesh Jha
                        </a>
                        . All Rights Reserved.
                    </span>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        
                        <a href="https://x.com/bhupesh_jh60422" className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                            <Twitter size={18} />
                            <span className="sr-only">Twitter</span>
                        </a>
                        <a href="https://github.com/Bhupesh0307/StayNear" target="_blank" rel="noreferrer" className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                            <Github size={18} />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href="https://www.linkedin.com/in/bhupesh-jha-09aa5323a/" target="_blank" rel="noreferrer" className="bg-gray-100 p-2 rounded-full text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors">
                            <Linkedin size={18} />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        
                    </div>
                </div>
            </div>
        </footer>
    );
}