'use client';
import Image from "next/image";

export default function DemoVideo() {
    return (
        <section className="bg-black">
            <div id="container" className="px-16 py-8">
                <div className="flex flex-col items-center justify-center w-full gap-2">
                    <div className="flex flex-row items-center justify-center w-full gap-x-4">
                        <div className="h-[1px] w-full bg-white" />
                        <div className="text-nowrap text-3xl font-semibold text-white">
                            <span>DEMO LECTURE</span>
                        </div>
                        <div className="h-[1px] w-full bg-white" />
                    </div>
                </div>

                <div className="flex flex-row justify-center items-center p-16">
                    <Image
                        src={"/Professionals-Mentors-Main-Banner.jpg"}
                        alt="video"
                        width={800}
                        height={600}
                    />
                </div>
            </div>
        </section>
    );
}
