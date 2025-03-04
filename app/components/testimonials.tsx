'use client';

import { Star } from "lucide-react";

export default function Testimonials() {
    return (
        <section className="my-8 bg-neutral-100">
            <div id="container" className="px-16 py-8">
                <div className="flex flex-col items-center justify-center w-full gap-2">
                    <div className="flex flex-row items-center justify-center w-full gap-x-4">
                        <div className="h-[1px] w-full bg-neutral-400" />
                        <div className="text-nowrap text-3xl font-semibold">
                            <span>TESTIMONIALS</span>
                        </div>
                        <div className="h-[1px] w-full bg-neutral-400" />
                    </div>
                    <div>
                        <span className="text-neutral-600">
                            We appreciate your kind words.
                        </span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row justify-center items-center p-2 gap-4">
                    <div
                        id="card"
                        className="flex flex-col items-center justify-center p-4 shadow-lg rounded-lg bg-white "
                    >
                        <div className="flex flex-row items-center justify-between gap-x-4">
                            <div>
                                <div className="flex flex-row items-center justify-center gap-x-1 text-amber-300">
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                                <div>
                                    <p className="text-neutral-600">
                                        Professional Mentors is a game-changer
                                        for CA aspirants. The experienced
                                        faculty and flexible online classes have
                                        made a significant difference in my
                                        learning. I couldt ask for a better
                                        platform!
                                    </p>
                                </div>
                                <div className="flex flex-row items-center justify-center gap-x-2 text-sm my-2">
                                    <span className="text-black">
                                        Rohit Singh
                                    </span>
                                    <span className="text-neutral-500">
                                        Student
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        id="card"
                        className="flex flex-col items-center justify-center p-4 shadow-lg rounded-lg bg-white "
                    >
                        <div className="flex flex-row items-center justify-between gap-x-4">
                            <div>
                                <div className="flex flex-row items-center justify-center gap-x-1 text-amber-300">
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                                <div>
                                    <p className="text-neutral-600">
                                        Professional Mentors is a game-changer
                                        for CA aspirants. The experienced
                                        faculty and flexible online classes have
                                        made a significant difference in my
                                        learning. I couldt ask for a better
                                        platform!
                                    </p>
                                </div>
                                <div className="flex flex-row items-center justify-center gap-x-2 text-sm my-2">
                                    <span className="text-black">
                                        Rohit Singh
                                    </span>
                                    <span className="text-neutral-500">
                                        Student
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        id="card"
                        className="flex flex-col items-center justify-center p-4 shadow-lg rounded-lg bg-white "
                    >
                        <div className="flex flex-row items-center justify-between gap-x-4">
                            <div>
                                <div className="flex flex-row items-center justify-center gap-x-1 text-amber-300">
                                    <Star />
                                    <Star />
                                    <Star />
                                    <Star />
                                </div>
                                <div>
                                    <p className="text-neutral-600">
                                        Professional Mentors is a game-changer
                                        for CA aspirants. The experienced
                                        faculty and flexible online classes have
                                        made a significant difference in my
                                        learning. I couldt ask for a better
                                        platform!
                                    </p>
                                </div>
                                <div className="flex flex-row items-center justify-center gap-x-2 text-sm my-2">
                                    <span className="text-black">
                                        Rohit Singh
                                    </span>
                                    <span className="text-neutral-500">
                                        Student
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
