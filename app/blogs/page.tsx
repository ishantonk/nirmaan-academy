import Heading from "@/components/ui/heading";
import BlogList from "@/components/blog/blog-list";
import Container from "@/components/ui/container";

export default function BlogsPage() {
    return (
        <main>
            <Container>
                <section className="mx-auto max-w-7xl px-1 md:px-6 lg:px-8 my-4 space-y-8">
                    <Heading description="Explore a world of knowledge with our curated blogs.">
                        From the blog
                    </Heading>

                    <BlogList />
                </section>
            </Container>
        </main>
    );
}
