// Users log in with email/password or OAuth.

import LoginForm from "@/components/auth/login-form";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";

export default function LoginPage() {
    return (
        <main>
            <Container>
                <section className="mx-auto max-w-7xl px-6 lg:px-8 my-4 space-y-8">
                    <Heading description="Sign in to your account to access your profile and settings.">
                        Sign in
                    </Heading>

                    <LoginForm />
                </section>
            </Container>
        </main>
    );
}
