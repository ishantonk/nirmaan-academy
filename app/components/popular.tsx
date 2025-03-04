import Image from "next/image";

export default function Popular() {
    return (
        <section className="my-8">
            <div id="container" className="px-16 py-8">
                <div className="flex flex-col items-center justify-center w-full gap-2">
                    <div className="flex flex-row items-center justify-center w-full gap-x-4">
                        <div className="h-[1px] w-full bg-neutral-400" />
                        <div className="text-nowrap text-3xl font-semibold">
                            <span>POPULAR PRODUCTS</span>
                        </div>
                        <div className="h-[1px] w-full bg-neutral-400" />
                    </div>
                    <div>
                        <span className="text-neutral-600">
                            Visit our shop to see amazing creations from our
                            designers.
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                    <div className="flex flex-row gap-x-4 text-neutral-800 font-semibold my-4">
                        <div>
                            <span>Best Selling</span>
                        </div>
                        <div>
                            <span>Top Rating</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center justify-between gap-x-4">
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
                                        Business Laws And Ethics By Professor
                                        Nitin Bhardwaj
                                    </p>
                                </div>
                                <div className="text-primary">
                                    <p>₹4,900.00 – ₹6,400.00</p>
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
                                        Business Laws And Ethics By Professor
                                        Nitin Bhardwaj
                                    </p>
                                </div>
                                <div className="text-primary">
                                    <p>₹4,900.00 – ₹6,400.00</p>
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
                                        Business Laws And Ethics By Professor
                                        Nitin Bhardwaj
                                    </p>
                                </div>
                                <div className="text-primary">
                                    <p>₹4,900.00 – ₹6,400.00</p>
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
                                        Business Laws And Ethics By Professor
                                        Nitin Bhardwaj
                                    </p>
                                </div>
                                <div className="text-primary">
                                    <p>₹4,900.00 – ₹6,400.00</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
