import Blogs from "@/components/home/blogs";
import Categories from "@/components/home/categories";
import Courses from "@/components/home/courses";
import Faculties from "@/components/home/faculties";
import Hero from "@/components/home/hero";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
    return (
        <main>
            <Hero />
            <Categories />
            <Courses />
            <Blogs />
            <Faculties />
            <Testimonials />
        </main>
    );
}
