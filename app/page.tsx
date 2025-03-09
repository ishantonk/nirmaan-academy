"use client";

import Faculty from "./components/faculty";
import Gallery from "./components/gallery";
import Hero from "./components/hero";
import LatestBlogs from "./components/latestBlogs";
import Popular from "./components/popular";
import Testimonials from "./components/testimonials";

export default function Home() {
    return (
        <main>
            <div className="p-4 my-auto text-center flex flex-col">
                <Hero />
                <Popular />
                <LatestBlogs />
                <Faculty />
                <Testimonials />
                <Gallery />
            </div>
        </main>
    );
}
