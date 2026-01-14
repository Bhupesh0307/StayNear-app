import React from "react";
import { websiteName } from "../Home/Home";
import TeamGrid from "../TeamGrid/TeamGrid";
import { Link } from "react-router-dom";
export default function About() {
    return (
        <div className="bg-gradient-to-b from-white to-gray-50">
            {/* Hero Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12">
                        {/* Text Section */}
                        <div className="w-full md:w-1/2">
                            <div className="max-w-lg">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                                    Our Mission at <span className="text-orange-600">{websiteName}</span>
                                </h1>
                                <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                                We're transforming the way college students find accommodation by creating a seamless and trustworthy platform that connects them with quality housing options near their institutions.
                                </p>
                                <div className="mt-8 flex space-x-4">
                                    <Link 
                                        to="/guest-house"
                                        className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-medium rounded-lg hover:from-orange-700 hover:to-orange-800 transition duration-300 shadow-md"
                                    >
                                    Find Housing
                                    </Link>
                                    <Link 
                                        to="/upload-guest-house"
                                        className="px-6 py-3 bg-white text-orange-600 border border-orange-200 font-medium rounded-lg hover:bg-orange-50 transition duration-300 shadow-sm"
                                    >
                                        List Your Property
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2">
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-orange-100 rounded-full opacity-70"></div>
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange-100 rounded-full opacity-70"></div>
                                <img
                                    src="https://i.pinimg.com/736x/06/fd/9d/06fd9dde192fe02644663c4bda0cf6ca.jpg"
                                    alt="College students looking for accommodation"
                                    className="relative z-10 w-full h-auto rounded-lg shadow-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                        <p className="text-lg text-gray-600">
                            We understand the challenges students face when moving to a new city for education.
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row items-center gap-16">
                        <div className="w-full md:w-1/2">
                            <img
                                src="https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Students struggling with housing"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>

                        <div className="w-full md:w-1/2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">The Challenge</h3>
                            <p className="text-gray-600 mb-6">
                               Students relocating to new cities for education often face significant challenges in finding suitable accommodation near their institutions. The available options are fragmented, involve multiple intermediaries, and lack a streamlined booking process.

                                The search for housing can be stressful and time-consuming, detracting from the excitement of starting a new educational journey. As a result, many students settle for accommodations that are far from ideal due to limited information and choices.
                            </p>
                            <p className="text-gray-600">
                            The search for housing can be stressful and time-consuming, diminishing the excitement of starting a new educational journey. Many students end up settling for accommodations that are far from ideal due to limited information and available options.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse md:flex-row items-center gap-16 mt-20">
                        <div className="w-full md:w-1/2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h3>
                            <p className="text-gray-600 mb-6">
                            {websiteName} was created to address this gap by providing a centralized, user-friendly platform that connects students with verified accommodation options near their educational institutions. We eliminate the need for intermediaries and streamline the booking process.
                            </p>
                            <p className="text-gray-600">
                            Our platform provides comprehensive information, transparent pricing, and a seamless booking experience. We personally verify each property to ensure quality and safety, giving both students and parents peace of mind.
                            </p>
                        </div>

                        <div className="w-full md:w-1/2">
                            <img
                                src="https://images.pexels.com/photos/7148384/pexels-photo-7148384.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="Our housing solution"
                                className="w-full h-auto rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-orange-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
                        <p className="text-lg text-gray-600">
                            These core principles guide everything we do at {websiteName}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Value 1 */}
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Safety</h3>
                            <p className="text-gray-600">
                            We verify every property listed on our platform to ensure that students have access to safe and high-quality accommodation options.
                            </p>
                        </div>

                        {/* Value 2 */}
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Transparency</h3>
                            <p className="text-gray-600">
                                Clear, honest information about properties, pricing, and policies with no hidden fees or surprise costs.
                            </p>
                        </div>

                        {/* Value 3 */}
                        <div className="bg-white p-8 rounded-lg shadow-md text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Community</h3>
                            <p className="text-gray-600">
                                Building connections between students and quality housing providers to create supportive living environments.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
                        <p className="text-lg text-gray-600">
                            Passionate individuals working to transform student housing
                        </p>
                    </div>

                    <TeamGrid />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-orange-600 to-indigo-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-white mb-6">Join the {websiteName} Community</h2>
                    <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                    Whether you're a student searching for accommodation or a property owner with spaces to rent, we're here to make the process simple and stress-free.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link 
                            to="/guest-house"
                            className="px-8 py-3 bg-white text-orange-600 font-medium rounded-lg hover:bg-gray-100 transition duration-300 shadow-md"
                        >
                        Find Housing
                        </Link>
                        <Link 
                            to="/upload-guest-house"
                            className="px-8 py-3 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition duration-300"
                        >
                        List Your Property
                        </Link>
                    </div>       
                </div>
            </section>
        </div>
    );
}