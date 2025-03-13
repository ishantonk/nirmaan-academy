import Heading from "@/components/ui/heading";
import ImageCarousel from "@/components/layout/carousel/image-carousel";

export default function Gallery() {
    return (
        <section>
            <div className="flex flex-col justify-center items-start gap-2 lg:gap-4 md:mx-4 lg:mx-16">
                <Heading description="Explore moments captured from our journey.">
                    Our gallery
                </Heading>

                <div className="mx-auto max-w-3xl">
                    <ImageCarousel />
                </div>
            </div>
        </section>
    );
}
