import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import WishlistList from "@/components/wishlist/wishlist-list";

export default function WishlistPage() {
    return (
        <main>
            <Container>
                <section className="mx-auto max-w-7xl px-6 lg:px-8 my-4 space-y-8">
                    <Heading
                        description="Your Personalized Wishlist: Keep Track of Your
                            Favorite Items and Plans."
                    >
                        Wishlist
                    </Heading>

                    <WishlistList />
                </section>
            </Container>
        </main>
    );
}
