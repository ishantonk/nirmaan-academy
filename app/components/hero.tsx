"use client";

import Link from "next/link";
import Container from "./container";

export default function Hero() {
    return (
        <section className="bg-gradient-to-b from-black to-gray-900 py-8 px-4">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Notice Board */}
                    <div className="col-span-1 bg-site-secondary rounded-lg p-6 border-2 border-site-highlight">
                        <div className="text-center mb-4">
                            <div className="border-dashed border-2 border-white py-1 mb-2">
                                <h3 className="text-xl font-bold text-white">
                                    |||||||||||||||||||||||||||
                                </h3>
                            </div>
                            <div className="bg-white rounded py-1 mb-2">
                                <h3 className="text-xl font-bold text-orange-500">
                                    NOTIC BOARD
                                </h3>
                            </div>
                            <h4 className="text-xl font-bold text-yellow-500 mt-2">
                                IMPORTANT REMINDER
                            </h4>
                            <div className="border-t border-gray-500 my-4"></div>
                        </div>

                        <ul className="text-white space-y-6 list-disc pl-6">
                            <li className="text-sm">
                                Mock Test Papers for CMA Intermediate Dec.2024
                                released.
                            </li>
                            <li className="text-sm">
                                Get Latest Studio Recorded Classes For CMA & CA
                                June/Dec 24 Attempt.
                            </li>
                        </ul>
                    </div>

                    {/* Carousel */}
                    <div className="col-span-2">
                        {/* <HeroCarousel /> */}
                    </div>

                    {/* Courses List */}
                    <div className="col-span-1 bg-site-secondary rounded-lg p-6 border-2 border-site-highlight flex flex-col">
                        <h3 className="text-xl font-bold text-yellow-500 text-center mb-6">
                            Click & Visit Our
                        </h3>
                        <h4 className="text-xl font-bold text-yellow-500 text-center mb-6">
                            👇 Different Courses 👇
                        </h4>

                        <div className="space-y-4 flex-1 flex flex-col justify-center">
                            <Link href="#" className="block">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-center py-3 rounded-md hover:from-orange-500 hover:to-yellow-500 transition-all">
                                    <span className="text-white font-bold">
                                        CA (Chartered Accountant)
                                    </span>
                                </div>
                            </Link>

                            <Link href="#" className="block">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-center py-3 rounded-md hover:from-orange-500 hover:to-yellow-500 transition-all">
                                    <span className="text-white font-bold">
                                        CMA (Cost and management accounting)
                                    </span>
                                </div>
                            </Link>

                            <Link href="#" className="block">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-center py-3 rounded-md hover:from-orange-500 hover:to-yellow-500 transition-all">
                                    <span className="text-white font-bold">
                                        CS (Company Secretary)
                                    </span>
                                </div>
                            </Link>

                            <Link href="#" className="block">
                                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-center py-3 rounded-md hover:from-orange-500 hover:to-yellow-500 transition-all">
                                    <span className="text-white font-bold">
                                        B.COM
                                    </span>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
