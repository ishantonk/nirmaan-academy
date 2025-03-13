"use client";
import { useState, useMemo } from "react";
import BlogCard from "@/components/blog/blog-card";
import { blogs } from "@/dummy-data";
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

const ITEMS_PER_PAGE = 6;

export default function BlogList() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [sortOption, setSortOption] = useState("newest");

    // Get unique categories
    const categories = useMemo(() => {
        const allCategories = blogs.map((blog) => blog.category);
        return ["All", ...new Set(allCategories)];
    }, []);

    // Filtered Blogs
    const filteredBlogs = useMemo(() => {
        return selectedCategory === "All"
            ? blogs
            : blogs.filter((blog) => blog.category === selectedCategory);
    }, [selectedCategory]);

    // Sorted Blogs
    const sortedBlogs = useMemo(() => {
        return [...filteredBlogs].sort((a, b) => {
            if (sortOption === "newest")
                return new Date(b.published_date).getTime() - new Date(a.published_date).getTime();
            if (sortOption === "oldest")
                return new Date(a.published_date).getTime() - new Date(b.published_date).getTime();
            if (sortOption === "title-asc")
                return a.title.localeCompare(b.title);
            if (sortOption === "title-desc")
                return b.title.localeCompare(a.title);
            return 0;
        });
    }, [filteredBlogs, sortOption]);

    // Paginate Blogs
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedBlogs = sortedBlogs.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );
    const totalPages = Math.ceil(sortedBlogs.length / ITEMS_PER_PAGE);

    return (
        <div className="mx-auto">
            {/* Filters */}
            <div className="mb-6 flex justify-between items-center">
                {/* Category Filter */}
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

                {/* Sort Options */}
                <Select onValueChange={setSortOption} value={sortOption}>
                    <SelectTrigger className="w-48">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="title-asc">Title (A-Z)</SelectItem>
                        <SelectItem value="title-desc">Title (Z-A)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {paginatedBlogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
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
