"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingCart, Trash2 } from "lucide-react";
import { cartData, courses } from "@/dummy-data";

export default function CheckoutPage() {
    const [cart, setCart] = useState([]);
    const [coupon, setCoupon] = useState("");

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

    const handleCheckout = () => {
        alert("Order placed successfully!");
        setCart([]);
    };

    return (
        <div className="p-4 mx-auto max-w-6xl grid md:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-4">🛒 My Cart Items</h2>
                <button
                    onClick={clearCart}
                    className="text-red-500 text-sm mb-4"
                >
                    (Clear Cart & Continue Shopping)
                </button>
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
            </div>

            {/* Order Summary */}
            <div className="border p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <p className="flex justify-between">
                    <span>Price</span>{" "}
                    <span>
                        ${cart.reduce((total, item) => total + item.price, 0)}
                    </span>
                </p>
                <p className="flex justify-between text-green-500">
                    <span>Handling Charges</span> <span>Free</span>
                </p>
                <hr className="my-2" />
                <p className="flex justify-between font-bold">
                    <span>Total</span>{" "}
                    <span>
                        ${cart.reduce((total, item) => total + item.price, 0)}
                    </span>
                </p>
                <p className="text-xs text-gray-500">
                    (Prices are inclusive of all taxes)
                </p>
                <Button className="w-full mt-4" onClick={handleCheckout}>
                    Place Order
                </Button>
                {/* Coupon Section */}
                <div className="mt-4">
                    <p className="text-sm mb-2">Apply Coupon Code</p>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Code"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                        />
                        <Button>Apply</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
