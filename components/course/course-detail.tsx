import { Button } from "@/components/ui/button";
import { Heart, Minus, Plus, Star } from "lucide-react";
import Image from "next/image";

type CourseProps = {
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
};
type onAddToCartProp = () => void;
type onWishlistProp = () => void;

export default function CourseDetail({
    course,
    onAddToCart,
    onWishlist,
}: {
    course: CourseProps;
    onAddToCart: onAddToCartProp;
    onWishlist: onWishlistProp;
}) {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Course Image */}
                <div className="bg-gray-50 rounded-lg flex items-center justify-center p-4">
                    <div className="relative w-full max-w-md mx-auto aspect-square">
                        <Image
                            src={
                                course.thumbnail ||
                                // "todo: default course image"
                                ""
                            }
                            alt={course.title}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 50vw"
                            priority
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col space-y-6">
                    <div>
                        <h1 className="text-3xl font-medium text-gray-900">
                            {course.title}
                        </h1>
                        <div className="flex items-baseline mt-1">
                            <span className="text-2xl font-medium text-gray-900">
                                ${course.price}
                            </span>
                        </div>
                        <p className="text-gray-600 mt-1">
                            {course.language} {course.category} {course.faculty}
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <p className="text-gray-700 leading-relaxed">
                            {course.description}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white w-full sm:w-1/2 py-6">
                            Add To Cart
                        </Button>
                        <Button
                            variant="outline"
                            className="border-gray-300 text-gray-900 w-full sm:w-1/2 py-6"
                        >
                            <Heart className="w-5 h-5 mr-2" />
                            Wishlist
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
