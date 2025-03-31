"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/format";
import { Loading } from "../loading";

type Course = {
    id: string;
    title: string;
    price: number;
    status: string;
    featured: boolean;
    instructor: {
        name: string;
    };
    category: {
        name: string;
    };
    createdAt: string;
};

export function AdminCourseTable() {
    const [page, setPage] = useState(0);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["admin-courses", page],
        queryFn: async () => {
            const response = await fetch(`/api/admin/courses?page=${page}`);
            if (!response.ok) {
                throw new Error("Failed to fetch courses");
            }
            return response.json();
        },
    });

    const courses = data?.courses || [];
    const totalPages = data?.totalPages || 0;

    const updateCourseStatus = async (courseId: string, status: string) => {
        try {
            const response = await fetch(`/api/admin/courses/${courseId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error("Failed to update course status");
            }

            toast.success("Course status updated", {
                description: "The course status has been updated successfully.",
            });

            refetch();
        } catch {
            toast.error("Error", {
                description: "Failed to update course status",
            });
        }
    };

    const toggleCourseFeatured = async (
        courseId: string,
        featured: boolean
    ) => {
        try {
            const response = await fetch(`/api/admin/courses/${courseId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ featured }),
            });

            if (!response.ok) {
                throw new Error("Failed to update course featured status");
            }

            toast.success("Course updated", {
                description: `The course has been ${
                    featured ? "featured" : "unfeatured"
                } successfully.`,
            });

            refetch();
        } catch {
            toast.error("Error", {
                description: "Failed to update course",
            });
        }
    };

    const columns: ColumnDef<Course>[] = [
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "instructor.name",
            header: "Instructor",
        },
        {
            accessorKey: "category.name",
            header: "Category",
        },
        {
            accessorKey: "price",
            header: "Price",
            cell: ({ row }) => {
                return formatPrice(row.original.price);
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.original.status;

                return (
                    <Badge
                        variant={
                            status === "PUBLISHED"
                                ? "default"
                                : status === "DRAFT"
                                ? "secondary"
                                : "outline"
                        }
                    >
                        {status}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "featured",
            header: "Featured",
            cell: ({ row }) => {
                return row.original.featured ? "Yes" : "No";
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const course = row.original;

                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    updateCourseStatus(course.id, "PUBLISHED")
                                }
                                disabled={course.status === "PUBLISHED"}
                            >
                                Publish
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    updateCourseStatus(course.id, "DRAFT")
                                }
                                disabled={course.status === "DRAFT"}
                            >
                                Set as Draft
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    updateCourseStatus(course.id, "ARCHIVED")
                                }
                                disabled={course.status === "ARCHIVED"}
                            >
                                Archive
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() =>
                                    toggleCourseFeatured(
                                        course.id,
                                        !course.featured
                                    )
                                }
                            >
                                {course.featured ? "Unfeature" : "Feature"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: courses,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No courses found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((old) => Math.max(0, old - 1))}
                    disabled={page === 0}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((old) => old + 1)}
                    disabled={page >= totalPages - 1}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
