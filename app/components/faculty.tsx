'use client'

import Image from "next/image";

export default function Faculty() {
    return (
        <section className="my-8">
            <div id="container" className="px-16 py-8">
                <div className="flex flex-col items-center justify-center w-full gap-2">
                    <div className="flex flex-row items-center justify-center w-full gap-x-4">
                        <div className="h-[1px] w-full bg-neutral-400" />
                        <div className="text-nowrap text-3xl font-semibold">
                            <span>OUR FACULTY</span>
                        </div>
                        <div className="h-[1px] w-full bg-neutral-400" />
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-between gap-x-4">
                        <div
                            id="card"
                            className="flex flex-col items-center justify-center w-64"
                        >
                            <div className="">
                                <Image
                                    src={"/4.png"}
                                    alt="course"
                                    width={240}
                                    height={240}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="py-4">
                                <div className="pb-2">
                                    <p className="text-neutral-600 text-sm">
                                        CMA SUMIT RASTOGI
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            id="card"
                            className="flex flex-col items-center justify-center w-64"
                        >
                            <div className="">
                                <Image
                                    src={"/1.png"}
                                    alt="course"
                                    width={240}
                                    height={240}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="py-4">
                                <div className="pb-2">
                                    <p className="text-neutral-600 text-sm">
                                        CMA SUMIT RASTOGI
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            id="card"
                            className="flex flex-col items-center justify-center w-64"
                        >
                            <div className="">
                                <Image
                                    src={"/2.png"}
                                    alt="course"
                                    width={240}
                                    height={240}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="py-4">
                                <div className="pb-2">
                                    <p className="text-neutral-600 text-sm">
                                        CMA SUMIT RASTOGI
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div
                            id="card"
                            className="flex flex-col items-center justify-center w-64"
                        >
                            <div className="">
                                <Image
                                    src={"/5.png"}
                                    alt="course"
                                    width={240}
                                    height={240}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="py-4">
                                <div className="pb-2">
                                    <p className="text-neutral-600 text-sm">
                                        CMA SUMIT RASTOGI
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
