"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ArrowUp, ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
    const lastUpdated = "May 1, 2024";

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Header */}
                    <div className="flex items-center space-x-3 mb-6">
                        <ShieldCheck className="h-8 w-8 text-site-primary" />
                        <h1 className="text-3xl font-bold text-site-primary">
                            Privacy Policy
                        </h1>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Last Updated: {lastUpdated}
                    </p>

                    {/* Table of Contents */}
                    <div className="bg-gray-50 p-6 rounded-lg mb-8">
                        <h2 className="text-xl font-semibold mb-4">
                            Table of Contents
                        </h2>
                        <ol className="list-decimal list-inside space-y-2">
                            <li>
                                <a
                                    href="#overview"
                                    className="text-site-secondary hover:underline"
                                >
                                    Overview
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#info-we-collect"
                                    className="text-site-secondary hover:underline"
                                >
                                    Information We Collect
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#non-refundable"
                                    className="text-site-secondary hover:underline"
                                >
                                    Security of Your Information
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#process"
                                    className="text-site-secondary hover:underline"
                                >
                                    Advertisements & Third-Party Tracking
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#cancellations"
                                    className="text-site-secondary hover:underline"
                                >
                                    Advertisements
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#technical"
                                    className="text-site-secondary hover:underline"
                                >
                                    Third-Party Links & Services
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#fraudulent"
                                    className="text-site-secondary hover:underline"
                                >
                                    Disclosure of Personal Information
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#changes"
                                    className="text-site-secondary hover:underline"
                                >
                                    Data Retention Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-site-secondary hover:underline"
                                >
                                    Cookies & Tracking Technologies
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-site-secondary hover:underline"
                                >
                                    Children&apos;s Privacy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-site-secondary hover:underline"
                                >
                                    E-commerce Transactions
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-site-secondary hover:underline"
                                >
                                    User Rights & Choices
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-site-secondary hover:underline"
                                >
                                    Changes to This Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#contact"
                                    className="text-site-secondary hover:underline"
                                >
                                    Contact Information
                                </a>
                            </li>
                        </ol>
                    </div>

                    {/* Main Content */}
                    <ScrollArea className="h-[600px] pr-6">
                        <div className="space-y-8">
                            <section id="overview">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    1. Overview
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    Nirmaan Academy <br/> Welcome to Nirmaan Academy.
                                    Your privacy is critically important to us.
                                    Nirmaan Academy is committed to respecting
                                    and protecting your privacy regarding any
                                    information we may collect while operating
                                    our website. This Privacy Policy applies to
                                    www.nirmaanacademy.com and outlines how we
                                    collect, use, and safeguard your
                                    information.
                                </p>
                            </section>

                            <section id="info-we-collect">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    2. Information We Collect
                                </h2>
                                <p className="list-disc list-inside text-gray-700 space-y-2">
                                    Website Visitors Like most website
                                    operators, Nirmaan Academy collects
                                    non-personally identifiable information,
                                    such as browser type, language preference,
                                    referring site, and the date and time of
                                    each visitor request. This information helps
                                    us understand how users interact with our
                                    website to improve user experience and
                                    analyze trends. Personal Information Certain
                                    interactions with Nirmaan Academy may
                                    require collecting personally identifiable
                                    information, including but not limited to:
                                </p>
                                <ol className="list-disc list-inside text-gray-700 space-y-2 mb-2">
                                    <li>Full Name</li>
                                    <li>Email address</li>
                                    <li>Phone number</li>
                                    <li>Mailing Address (if applicable)</li>
                                    <li>
                                        Payment details for course enrollment
                                    </li>
                                    <li>User account credentials</li>
                                    <li>
                                        Profile information such as preferences
                                        and interests related to educational
                                        content
                                    </li>
                                </ol>
                                <p className="list-disc list-inside text-gray-700 space-y-2">
                                    We collect such information only when users
                                    voluntarily provide it, such as when signing
                                    up for a course, subscribing to newsletters,
                                    participating in forums, or making a
                                    purchase. Additionally, if you choose to
                                    sign in using third-party services such as
                                    Google or Facebook, we may collect basic
                                    profile information linked to those accounts
                                    with your consent.
                                </p>
                            </section>

                            <section id="non-refundable">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    3. Non-Refundable Items
                                </h2>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>
                                        Downloadable study materials, e-books,
                                        PDFs, and other digital resources
                                    </li>
                                    <li>
                                        One-on-one tutoring sessions or live
                                        classes that have already been attended
                                    </li>
                                    <li>
                                        Courses purchased during promotional
                                        offers, discounts, or bundled deals
                                    </li>
                                    <li>
                                        Any service that has been explicitly
                                        marked as non-refundable at the time of
                                        purchase
                                    </li>
                                </ul>
                            </section>

                            <section id="process">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    4. Process for Requesting a Refund
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-700">
                                        Users must submit a refund request via
                                        email at support@nirmaanacademy.com with
                                        the following details:
                                    </p>
                                    <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                                        <li>Full name</li>
                                        <li>Order ID or receipt number</li>
                                        <li>Reason for the refund request</li>
                                        <li>
                                            Any relevant screenshots or
                                            supporting information
                                        </li>
                                    </ul>
                                    <p className="text-gray-700">
                                        Our support team will review the request
                                        within 5-7 business days and determine
                                        eligibility.
                                    </p>
                                    <p className="text-gray-700">
                                        If approved, the refund will be
                                        processed to the original payment method
                                        within 7-14 business days.
                                    </p>
                                </div>
                            </section>

                            <section id="cancellations">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    5. Course Cancellations and Subscription
                                    Refunds
                                </h2>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>
                                        Users may cancel a subscription at any
                                        time from their account settings.
                                    </li>
                                    <li>
                                        If cancellation occurs before the next
                                        billing cycle, users will retain access
                                        until the end of the current cycle.
                                    </li>
                                    <li>
                                        Refunds for subscription-based services
                                        will be considered only if a billing
                                        error has occurred on our part.
                                    </li>
                                </ul>
                            </section>

                            <section id="technical">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    6. Technical Issues and Failed Access
                                </h2>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>
                                        If unable to access a purchased course
                                        due to technical errors, report to our
                                        support team.
                                    </li>
                                    <li>
                                        Refunds may be issued if the issue
                                        remains unresolved within 72 hours of
                                        reporting.
                                    </li>
                                    <li>
                                        Issues due to personal device
                                        incompatibility will not be eligible for
                                        a refund.
                                    </li>
                                </ul>
                            </section>

                            <section id="fraudulent">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    7. Fraudulent or Abusive Requests
                                </h2>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>
                                        Nirmaan Academy reserves the right to
                                        deny refund requests that appear to be
                                        fraudulent or abusive.
                                    </li>
                                    <li>
                                        Users found repeatedly requesting
                                        refunds while continuing to access
                                        courses may have their accounts
                                        suspended.
                                    </li>
                                </ul>
                            </section>

                            <section id="changes">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    8. Changes to the Refund Policy
                                </h2>
                                <ul className="list-disc list-inside text-gray-700 space-y-2">
                                    <li>
                                        Nirmaan Academy may update this policy
                                        at any time. Users are encouraged to
                                        review it periodically.
                                    </li>
                                    <li>
                                        Continued use after policy updates
                                        constitutes acceptance of the revised
                                        terms.
                                    </li>
                                </ul>
                            </section>

                            <section id="contact" className="pb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                    9. Contact Information
                                </h2>
                                <div className="bg-blue-50 p-6 rounded-lg">
                                    <p className="text-gray-700 leading-relaxed">
                                        For refund inquiries, contact our
                                        support team at:
                                        <br />
                                        Email:{" "}
                                        <a
                                            href="mailto:support@nirmaanacademy.com"
                                            className="text-blue-600 hover:underline"
                                        >
                                            support@nirmaanacademy.com
                                        </a>
                                        <br />
                                        Phone: +91 9050363676
                                    </p>
                                </div>
                            </section>
                        </div>
                    </ScrollArea>

                    {/* Back to Top Button */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <div className="flex justify-end">
                            <Button
                                onClick={scrollToTop}
                                variant="ghost"
                                className="flex items-center space-x-2"
                            >
                                <ArrowUp className="h-5 w-5" />
                                <span>Back to Top</span>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
