import AboutDetail from "@/components/about/about-detail";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import { ScrollArea } from "@/components/ui/scroll-area";
import { aboutUsData } from "@/dummy-data";
import Image from "next/image";

export default function AboutPage() {
    return (
        <main>
            <Container>
                <section className="mx-auto max-w-7xl px-6 lg:px-8 my-4 space-y-8">
                    <Heading description={aboutUsData.tagline}>
                        {aboutUsData.title}
                    </Heading>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* About Image */}
                        <div className="bg-gray-50 rounded-lg flex items-center justify-center p-4">
                            <div className="relative w-full max-w-md mx-auto aspect-square">
                                <Image
                                    src={"/2-1.webp"}
                                    alt={"about us image"}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    priority
                                />
                            </div>
                        </div>

                        {/* About Info */}

                        <ScrollArea className="h-96 p-4">
                            <AboutDetail />
                        </ScrollArea>
                    </div>
                </section>
            </Container>
        </main>
    );
}
