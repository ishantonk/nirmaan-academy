import { Star } from "lucide-react";
import { Card } from "../ui/card";

interface TestimonialCardProps {
    quote: string;
    author: string;
    role: string;
    rating?: number;
}

export function TestimonialCard({
    testimonial,
}: {
    testimonial: TestimonialCardProps;
}) {
    return (
        <Card className="max-w-md p-8 bg-white rounded-2xl shadow-lg">
            <div className="relative">
                <div className="absolute -top-8 -left-4 text-[80px] font-serif text-emerald-100">
                    &quot;
                </div>
                <blockquote className="relative text-gray-700 h-44 leading-relaxed mb-6 text-center overflow-hidden">
                    {testimonial.quote}
                </blockquote>
            </div>

            <div className="flex justify-center mb-4">
                {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                        key={index}
                        size={24}
                        className={`${
                            index < testimonial.rating!
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-200"
                        }`}
                    />
                ))}
            </div>

            <div className="text-center">
                <div className="font-semibold text-gray-900 mb-1">
                    {testimonial.author}
                </div>
                <div className="text-gray-600 text-sm">{testimonial.role}</div>
            </div>
        </Card>
    );
}
