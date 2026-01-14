import React, { useState } from "react";
import { websiteName } from "../Home/Home";

export default function Contact() {
    const [messageVisible, setMessageVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    async function handleSubmit(event) {
        event.preventDefault();
        setIsSubmitting(true);
        
        const formData = new FormData(event.target);
        // Replace with your own access key from web3forms.com
        formData.append("access_key", "00a074c0-eaf0-4204-b5cf-440d1cf34346");
        
        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);
        
        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: json,
            });
            
            const result = await response.json();
            if (result.success) {
                // Reset form fields
                event.target.reset();
                setMessageVisible(true);
                setTimeout(() => setMessageVisible(false), 3000); // Hide message after 3 seconds
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-gray-50 to-gray-100">
  <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
                {/* Contact Info Section */}
                <div className="bg-gradient-to-br from-orange-600 to-indigo-700 p-8 md:w-2/5 text-white">
                    <h1 className="text-3xl font-bold mb-6">Get in Touch</h1>
                    <p className="text-gray-100 mb-8">
                        We'd love to hear from you! Please fill out the form, and we'll get back to you as soon as possible.
                    </p>

                    {/* Contact Details */}
                    <div className="space-y-6">
                        {/* Address */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold">Our Location</h3>
                                <p className="text-gray-100 mt-1">Rupa Ki Nangal Post Sumel Via Jamdoli LNMIIT Jaipur</p>
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold">Phone</h3>
                                <p className="text-gray-100 mt-1">+91 6377491725</p>
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 bg-white/20 p-2 rounded-full">
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    className="w-6 h-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <div className="ml-4">
                                <h3 className="text-lg font-semibold">Email</h3>
                                <p className="text-gray-100 mt-1">{websiteName}123@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    {/* Social Media - Optional */}
                    <div className="mt-10">
                        <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                        <div className="flex justify-center space-x-4 mt-4">
                            <a href="https://x.com/bhupesh_jh60422" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                </svg>
                            </a>
                            <a href="https://www.instagram.com/bhupesh.jhaa/" className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                                </svg>
                            </a>
                            
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="p-8 md:w-3/5">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                    
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="John Doe"
                                required
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="john@example.com"
                                required
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                                Subject
                            </label>
                            <input
                                type="text"
                                id="subject"
                                name="subject"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="How can we help you?"
                                required
                            />
                        </div>
                        
                        <div className="mb-6">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Write your message here..."
                                required
                            ></textarea>
                        </div>
                        
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full px-6 py-3 text-white font-medium rounded-lg transition-colors ${
                                isSubmitting 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-gradient-to-br from-orange-600 to-indigo-700 hover:bg-gradient-to-br hover:from-orange-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                            }`}
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </form>
                </div>
            </div>
            
            {/* Floating success message */}
            {messageVisible && (
                <div className="fixed bottom-10 right-6 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg flex items-center animate-fadeIn">
                    Message sent successfully
                    <svg 
                        className="ml-2 w-5 h-5" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth="2" 
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
            )}
        </div>
    );
}