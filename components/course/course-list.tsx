"use client";
import { useState, useMemo } from "react";
import CourseCard from "./course-card";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { courses } from "@/dummy-data";

const ITEMS_PER_PAGE = 12;

export default function CoursesList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Get unique categories
    const categories = useMemo(() => {
        const allCategories = courses.map((course) => course.category);
        return ["All", ...new Set(allCategories)];
    }, []);

    // Filtered Course
    const filteredCourse = useMemo(() => {
        return selectedCategory === "All"
            ? courses
            : courses.filter((course) => course.category === selectedCategory);
    }, [selectedCategory]);

    // Paginate Course
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedCourses = filteredCourse.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const onAddToCart = () => {};
    const onWishlist = () => {};
    const onQuickView = () => {};

    const totalPages = Math.ceil(filteredCourse.length / ITEMS_PER_PAGE);

    return (
        <div className="mx-auto">
            {/* Category Filter */}
            <div className="mb-6 flex justify-between items-center">
                <Select
                    onValueChange={setSelectedCategory}
                    value={selectedCategory}
                >
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Filter by Category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                                {category}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {paginatedCourses.map((course) => (
                    <CourseCard
                        key={course.id}
                        course={course}
                        onAddToCart={onAddToCart}
                        onWishlist={onWishlist}
                        onQuickView={onQuickView}
                    />
                ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <Pagination className="mt-8 flex justify-center">
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.max(prev - 1, 1)
                                    )
                                }
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    onClick={() => setCurrentPage(i + 1)}
                                    isActive={i + 1 === currentPage}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    setCurrentPage((prev) =>
                                        Math.min(prev + 1, totalPages)
                                    )
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}
