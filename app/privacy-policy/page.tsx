"use client";

import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import PrivacyPolicyDetail from "@/components/privacy-policy/privacy-policy-detail";
import { privacyPolicyData } from "@/dummy-data";

export default function PrivacyPolicyPage() {

    return (
        <main>
            <Container>
                <section className="mx-auto max-w-7xl px-6 lg:px-8 my-4 space-y-8">
                    <Heading description={privacyPolicyData.introduction}>
                        {privacyPolicyData.title}
                    </Heading>

                    <PrivacyPolicyDetail />
                </section>
            </Container>
        </main>
    );
}
