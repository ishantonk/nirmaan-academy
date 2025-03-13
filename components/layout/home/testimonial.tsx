import TestimonialCarousel from "../../testimonial/testimonial-carousel";
import Heading from "../../ui/heading";

export default function Testimonial() {
    return (
        <section>
            <div className="flex flex-col justify-center items-start gap-2 lg:gap-4 md:mx-4 lg:mx-16">
                <Heading description="Hear what our students have to say about us.">
                    Testimonials
                </Heading>
                <TestimonialCarousel />
            </div>
        </section>
    );
}
