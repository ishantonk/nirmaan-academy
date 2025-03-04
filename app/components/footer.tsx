"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import Container from "./container";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Footer() {
    const [email, setEmail] = useState("");

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle newsletter subscription
        console.log("Subscribed with email:", email);
        setEmail("");
        // You would typically send this to your API
    };

    return (
        <footer className="flex flex-col justify-center items-center bg-site-primary text-site-highlight px-4 py-12">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Logo and Contact Info */}
                    <div className="space-y-6">
                        {/* Logo */}
                        <div className="flex items-center space-x-2">
                            <Link
                                href="/"
                                className="flex items-center space-x-4"
                            >
                                <div className="relative">
                                    <Image
                                        src="/logo.png"
                                        alt="Logo"
                                        width={56}
                                        height={56}
                                    />
                                </div>
                                <span className="text-lg font-medium text-site-highlight">
                                    Nirmaan Academy
                                </span>
                            </Link>
                        </div>

                        {/* Contact Info */}
                        <div className="space-y-4 text-site-accent">
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                <span>
                                    A-50, Raj Nagar extension, Ghaziabad, UP
                                    201017
                                </span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 flex-shrink-0" />
                                <span>+918586826126</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 flex-shrink-0" />
                                <span>Professionalmentorss@gmail.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Store Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">
                            STORES LINKS
                        </h3>
                        <ul className="space-y-4 text-site-accent">
                            <li>
                                <Link
                                    href="/shop"
                                    className="hover:text-white transition-colors"
                                >
                                    Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/cart"
                                    className="hover:text-white transition-colors"
                                >
                                    Cart
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/wishlist"
                                    className="hover:text-white transition-colors"
                                >
                                    Wishlist
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/checkout"
                                    className="hover:text-white transition-colors"
                                >
                                    Checkout
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/account"
                                    className="hover:text-white transition-colors"
                                >
                                    My account
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Useful Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">
                            USEFUL LINKS
                        </h3>
                        <ul className="space-y-4 text-site-accent">
                            <li>
                                <Link
                                    href="/blog"
                                    className="hover:text-white transition-colors"
                                >
                                    Latest Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/privacy"
                                    className="hover:text-white transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/returns"
                                    className="hover:text-white transition-colors"
                                >
                                    Refund & Returns Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/shipping"
                                    className="hover:text-white transition-colors"
                                >
                                    Shipping and Delivery Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/terms"
                                    className="hover:text-white transition-colors"
                                >
                                    Terms & Condition
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">
                            GET LATEST UPDATES
                        </h3>
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <div className="grid grid-cols-1 gap-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        className="bg-transparent border-site-secondary focus:border-gray-500"
                                    />
                                    <Input
                                        type="text"
                                        placeholder="Contact Numb"
                                        className="bg-transparent border-site-secondary focus:border-gray-500"
                                    />
                                </div>
                                <Input
                                    type="email"
                                    placeholder="Email*"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="bg-transparent border-site-secondary focus:border-gray-500"
                                />
                                <Button
                                    type="submit"
                                    className="w-full bg-site-accent text-site-secondary hover:bg-site-highlight transition-colors duration-200 ease-in"
                                >
                                    SUBSCRIBE
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-site-secondary text-center text-site-accent text-sm">
                    <p>
                        © {new Date().getFullYear()} Nirmaan Academy. All
                        rights reserved.
                    </p>
                </div>
            </Container>
        </footer>
    );
}
