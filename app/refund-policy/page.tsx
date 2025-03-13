import RefundPolicyDetail from "@/components/refund-policy/refund-policy-detail";
import Container from "@/components/ui/container";
import Heading from "@/components/ui/heading";
import { refundPolicyData } from "@/dummy-data";

export default function RefundPolicy() {
    return (
        <main>
            <Container>
                <section className="mx-auto max-w-7xl px-6 lg:px-8 my-4 space-y-8">
                    <Heading description={refundPolicyData.overview}>
                        {refundPolicyData.title}
                    </Heading>

                    <RefundPolicyDetail />
                </section>
            </Container>
        </main>
    );
}
