"use client";

import DemoVideo from "./components/demoVideo";
import Faculty from "./components/faculty";
import Hero from "./components/hero";
import Popular from "./components/popular";
import Testimonials from "./components/testimonials";

export default function Home() {
    return (
        <main>
            <div className="p-4 my-auto text-center flex flex-col">
                <Hero />
                <Popular />
                <Faculty />
                <Testimonials />
                <DemoVideo />
            </div>
        </main>
    );
}
