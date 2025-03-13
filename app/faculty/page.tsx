import Container from "../../components/ui/container";
import Heading from "@/components/ui/heading";
import FacultyList from "@/components/faculty/faculty-list";

export default function FacultyPage() {
    return (
        <main>
            <Container>
                <section className="mx-auto max-w-7xl px-6 lg:px-8 my-4 space-y-8">
                    <Heading
                        description="We're a dynamic group of individuals who are
            passionate about what we do and dedicated to delivering
            the best results for our clients."
                    >
                        Our team
                    </Heading>

                    <FacultyList />
                </section>
            </Container>
        </main>
    );
}
