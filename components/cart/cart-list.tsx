"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { cartData, courses } from "@/dummy-data";

export default function CartList() {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        getCartCourses();
    }, []);

    const getCartCourses = () => {
        const listOfCoursesIdInCart = cartData;
        const listOfCourses = courses;
        const tempCart = listOfCourses.filter((course) =>
            listOfCoursesIdInCart.includes(course.id)
        );
        setCart(tempCart);
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    const proceedToCheckout = () => {
        alert(
            "Proceeding to checkout with: " +
                cart.map((item) => item.title).join(", ")
        );
    };

    return (
        <div className="p-4 mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-4">🛒 My Cart</h2>
            {cart.length > 0 ? (
                <div className="space-y-4">
                    {cart.map((item) => (
                        <Card
                            key={item.id}
                            className="flex items-center gap-4 p-4"
                        >
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-24 h-24 object-cover"
                            />
                            <CardContent className="flex-1">
                                <h3 className="text-lg font-semibold">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600">${item.price}</p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFromCart(item.id)}
                                >
                                    <Trash2 className="w-5 h-5 text-red-500" />
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">Your cart is empty.</p>
            )}
            {cart.length > 0 && (
                <div className="mt-4 space-y-2">
                    <Button
                        variant="destructive"
                        onClick={clearCart}
                        className="w-full"
                    >
                        Clear Cart
                    </Button>
                    <Button
                        variant="default"
                        onClick={proceedToCheckout}
                        className="w-full"
                    >
                        Proceed to Checkout
                    </Button>
                </div>
            )}
        </div>
    );
}
