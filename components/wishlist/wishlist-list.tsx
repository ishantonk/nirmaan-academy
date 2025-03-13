"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, ShoppingCart, Trash2, Eye } from "lucide-react";
import { courses, wishlistData } from "@/dummy-data";
import Image from "next/image";

export default function WishlistList() {
    const [wishlist, setWishlist] = useState<
        {
            id: number;
            title: string;
            slug: string;
            category: string;
            duration: string;
            level: string;
            language: string;
            faculty: string;
            price: number;
            discountedPrice: number;
            isOnSale: boolean;
            description: string;
            thumbnail: string;
        }[]
    >([]);
    const [selected, setSelected] = useState<number[]>([]);

    useEffect(() => {
        getWishlist();
    }, []);

    const getWishlist = () => {
        const listOfCoursesIdInWishlist = wishlistData;
        const listOfCourses = courses;
        const tempWishlist = listOfCourses.filter((course) =>
            listOfCoursesIdInWishlist.includes(course.id)
        );
        setWishlist(tempWishlist);
    };

    const toggleSelect = (id: number) => {
        setSelected((prev) =>
            prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id]
        );
    };

    const removeFromWishlist = (id: number) => {
        setWishlist((prev) => prev.filter((course) => course.id !== id));
        setSelected((prev) => prev.filter((item) => item !== id));
    };

    const emptyWishlist = () => {
        setWishlist([]);
        setSelected([]);
    };

    const checkout = () => {
        alert(`Checking out courses: ${selected.join(", ")}`);
        setWishlist((prev) =>
            prev.filter((course) => !selected.includes(course.id))
        );
        setSelected([]);
    };

    return (
        <div className="p-4 mx-auto max-w-6xl">
            {wishlist.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((course) => (
                        <Card
                            key={course.id}
                            className="rounded-lg overflow-hidden flex flex-row p-0"
                        >
                            <Image
                                src={course.thumbnail}
                                alt={course.title}
                                width={200}
                                height={200}
                                className="w-full h-40 object-cover"
                            />
                            <CardContent className="p-4 flex flex-col gap-2">
                                <h3 className="text-sm font-semibold">
                                    {course.title}
                                </h3>
                                <p className="text-gray-600">${course.price}</p>
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                toggleSelect(course.id)
                                            }
                                        >
                                            <Checkbox
                                                checked={selected.includes(
                                                    course.id
                                                )}
                                            />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Eye className="w-5 h-5 text-gray-500" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                removeFromWishlist(course.id)
                                            }
                                        >
                                            <Trash2 className="w-5 h-5 text-red-500" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center mt-10">
                    <Heart className="w-20 h-20 text-neutral-300 mb-4" />
                    <p className="text-lg font-semibold">
                        Your wishlist is empty
                    </p>
                    <p className="text-sm text-gray-500">
                        Add items to your wishlist to see them here.
                    </p>
                </div>
            )}

            {wishlist.length > 0 && (
                <div className="flex flex-col gap-3 mt-5">
                    <Button
                        onClick={checkout}
                        disabled={selected.length === 0}
                        className="w-full flex items-center gap-2"
                    >
                        <ShoppingCart className="w-5 h-5" /> Checkout
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={emptyWishlist}
                        className="w-full"
                    >
                        Empty Wishlist
                    </Button>
                </div>
            )}
        </div>
    );
}
