import React from "react";
import { Link } from "react-router-dom";

export const websiteName = "StayNear";

export default function Home() {
    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative">
                {/* Hero Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <img 
                        className="w-full h-full object-cover"
                        src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Luxury Accommodation Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
                </div>

                {/* Hero Content */}
                <div className="relative z-10 max-w-screen-xl mx-auto px-4 py-28 sm:py-32 md:py-40 flex flex-col items-start">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
                        Find Your Perfect <span className="text-orange-500">Stay</span>
                    </h1>
                    <p className="text-lg md:text-xl text-white/80 max-w-xl mb-8">
                        Discover comfortable guest houses near your destination. 
                        Book with ease and enjoy your journey without accommodation worries.
                    </p>
                    
                    
                </div>
            </section>

            

            {/* How It Works Section */}
            <section className="py-16 bg-white">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">How {websiteName} Works</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Book your stay in three simple steps and enjoy a hassle-free experience
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Search</h3>
                            <p className="text-gray-600">
                                Find guest houses by location, price range, or amenities in your desired area.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Book</h3>
                            <p className="text-gray-600">
                                Select your dates and book your stay with our secure and easy booking system.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div className="bg-orange-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 mb-3">Enjoy</h3>
                            <p className="text-gray-600">
                                Relax and enjoy your stay with confidence knowing all details are taken care of.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-orange-600 to-indigo-700 text-white">
                <div className="max-w-screen-xl mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-6">List Your Guest House With Us</h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                        Own a guest house? Join our platform and reach thousands of potential guests looking for a place like yours.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            to="/upload-guest-house"
                            className="px-8 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300"
                        >
                            List Your Property
                        </Link>
                        <Link
                            to="/contact"
                            className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition duration-300"
                        >
                            Learn More
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
