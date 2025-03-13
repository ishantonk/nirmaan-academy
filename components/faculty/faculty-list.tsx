"use client";
import { useState } from "react";
import { facultyMembers } from "@/dummy-data";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationLink,
} from "@/components/ui/pagination";
import FacultyCard from "./faculty-card";

const ITEMS_PER_PAGE = 9;

export default function FacultyList() {
    const [currentPage, setCurrentPage] = useState(1);

    // Paginate Blogs
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedFaculty = facultyMembers.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );
    const totalPages = Math.ceil(facultyMembers.length / ITEMS_PER_PAGE);

    return (
        <div className="mx-auto">
            {/* Faculty Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-9">
                {paginatedFaculty.map((faculty) => (
                    <FacultyCard key={faculty.id} faculty={faculty} />
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
