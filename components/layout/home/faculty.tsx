import FacultyCarousel from "@/components/faculty/faculty-carousel";
import Heading from "@/components/ui/heading";

export default function Faculty() {
    return (
        <section>
            <div className="flex flex-col justify-center items-start gap-2 lg:gap-4 md:mx-4 lg:mx-16">
                <Heading description="Meet the experts guiding your learning journey.">
                    Our faculty
                </Heading>

                <FacultyCarousel />
            </div>
        </section>
    );
}
