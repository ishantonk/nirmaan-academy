"use client";

import { Separator } from "@/components/ui/separator";
import { refundPolicyData } from "@/dummy-data";

export default function RefundPolicyDetail() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Refund Eligibility</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {Object.values(
                        refundPolicyData
                            .refund_eligibility
                    ).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Non-Refundable Items</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {refundPolicyData.non_refundable_items.map(
                        (item, index) => (
                            <li key={index}>{item}</li>
                        )
                    )}
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Refund Request Process
                </h2>
                <p>
                    {
                        refundPolicyData
                            .refund_request_process.submission
                    }
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {refundPolicyData.refund_request_process.required_details.map(
                        (detail, index) => (
                            <li key={index}>{detail}</li>
                        )
                    )}
                </ul>
                <p>
                    {
                        refundPolicyData
                            .refund_request_process.review_timeline
                    }
                </p>
                <p>
                    {
                        refundPolicyData
                            .refund_request_process.refund_processing
                    }
                </p>
            </div>

            <Separator />

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <p>
                    <strong>Email:</strong>{" "}
                    <a
                        href={`mailto:${refundPolicyData.contact_information.email}`}
                        className="text-blue-600 hover:underline"
                    >
                        {
                            refundPolicyData
                                .contact_information.email
                        }
                    </a>
                </p>
                {refundPolicyData.contact_information
                    .phone && (
                    <p>
                        <strong>Phone:</strong>{" "}
                        {
                            refundPolicyData
                                .contact_information.phone
                        }
                    </p>
                )}
            </div>
        </div>
    );
}
