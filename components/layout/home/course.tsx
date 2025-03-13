import CourseCarousel from "../../course/course-carousel";
import Heading from "../../ui/heading";

export default function Course() {
    return (
        <section>
            <div className="flex flex-col justify-center items-start gap-2 lg:gap-4 md:mx-4 lg:mx-16">
                <Heading description="Explore our most popular courses, loved by learners worldwide.">
                    Popular courses
                </Heading>
                <CourseCarousel />
            </div>
        </section>
    );
}
