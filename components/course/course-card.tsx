import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
type onQuickViewProp = () => void;

export default function CourseCard({
    course,
    onAddToCart,
    onWishlist,
    onQuickView,
}: {
    course: CourseProps;
    onAddToCart: onAddToCartProp;
    onWishlist: onWishlistProp;
    onQuickView: onQuickViewProp;
}) {
    return (
        <div className={cn("group block space-y-4 overflow-hidden relative")}> 
            {course.isOnSale && (
                <div className="absolute top-3 left-0 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-r-md shadow-md z-10">
                    On Sale
                </div>
            )}
            <div className="absolute top-3 right-3 flex space-x-2 z-10">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onWishlist}
                    className="hover:text-red-500 hover:bg-background/60"
                >
                    <Heart className="w-5 h-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onQuickView}
                    className="hover:text-blue-500 hover:bg-background/60"
                >
                    <Eye className="w-5 h-5" />
                </Button>
            </div>
            <Link href={`/courses/${course.slug}`}> 
                <div className="relative">
                    <div className="overflow-hidden bg-gray-100">
                        <Image
                            src={course.thumbnail}
                            alt={course.title}
                            width={200}
                            height={200}
                            className="aspect-square w-full object-cover transition-transform duration-300 will-change-transform group-hover:scale-105"
                        />
                    </div>
                </div>
            </Link>
            <div className="space-y-2 px-3">
                <h3 className="font-medium line-clamp-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                    {course.description}
                </p>
                <div className="flex items-center gap-2">
                    {course.isOnSale && (
                        <span className="text-sm text-muted-foreground line-through">
                            ${course.price}
                        </span>
                    )}
                    {course.discountedPrice && (
                        <span className="text-sm font-medium text-indigo-600">
                            ${course.discountedPrice}
                        </span>
                    )}
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    onClick={onAddToCart}
                    className="w-full flex items-center justify-center mt-2"
                >
                    <ShoppingCart className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}