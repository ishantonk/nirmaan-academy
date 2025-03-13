import BlogCarousel from "../../blog/blog-carousel";
import Heading from "../../ui/heading";

export default function Blog() {
    return (
        <section>
            <div className="flex flex-col justify-center items-start gap-2 lg:gap-4 md:mx-4 lg:mx-16">
                <Heading description="Stay updated with our newest insights and trends.">
                    Latest Blogs
                </Heading>

                <BlogCarousel />
            </div>
        </section>
    );
}
