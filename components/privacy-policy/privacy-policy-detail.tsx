"use client";

import { Separator } from "@/components/ui/separator";
import { privacyPolicyData } from "@/dummy-data";

export default function PrivacyPolicyDetail() {
    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Scope</h2>
                <p>{privacyPolicyData.scope}</p>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    Information We Collect
                </h2>
                <p>
                    {privacyPolicyData.information_we_collect.website_visitors}
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {privacyPolicyData.information_we_collect.personal_information.map(
                        (item, index) => (
                            <li key={index}>{item}</li>
                        )
                    )}
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">
                    How We Use Information
                </h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {privacyPolicyData.how_we_use_information.map(
                        (use, index) => (
                            <li key={index}>{use}</li>
                        )
                    )}
                </ul>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Data Security</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                    {privacyPolicyData.data_security.measures.map(
                        (measure, index) => (
                            <li key={index}>{measure}</li>
                        )
                    )}
                </ul>
                <p>{privacyPolicyData.data_security.disclaimer}</p>
            </div>

            <Separator />

            <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Contact Information</h2>
                <p>
                    <strong>Email:</strong>{" "}
                    <a
                        href={`mailto:${privacyPolicyData.contact_information.email}`}
                        className="text-blue-600 hover:underline"
                    >
                        {privacyPolicyData.contact_information.email}
                    </a>
                </p>
                <p>
                    <strong>Phone:</strong>{" "}
                    {privacyPolicyData.contact_information.phone}
                </p>
                <p>
                    <strong>Address:</strong>{" "}
                    {privacyPolicyData.contact_information.address}
                </p>
            </div>
        </div>
    );
}
