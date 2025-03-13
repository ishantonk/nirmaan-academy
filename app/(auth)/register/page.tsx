// Users log in with email/password or OAuth.

import RegisterForm from "@/components/auth/register-form";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";

export default function LoginPage() {
    return (
        <main>
            <Container>
                <section className="mx-auto max-w-7xl px-6 lg:px-8 my-4 space-y-8">
                    <Heading description="Unlock a world of knowledge and enhance your skills!">
                        Create Account
                    </Heading>

                    <RegisterForm />
                </section>
            </Container>
        </main>
    );
}
