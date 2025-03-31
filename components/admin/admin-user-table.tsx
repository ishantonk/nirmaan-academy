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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loading } from "../loading";

type User = {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null;
    role: string;
    createdAt: string;
};

export function AdminUserTable() {
    const [page, setPage] = useState(0);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["admin-users", page],
        queryFn: async () => {
            const response = await fetch(`/api/admin/users?page=${page}`);
            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }
            return response.json();
        },
    });

    const users = data?.users || [];
    const totalPages = data?.totalPages || 0;

    const updateUserRole = async (userId: string, role: string) => {
        try {
            const response = await fetch(`/api/admin/users/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ role }),
            });

            if (!response.ok) {
                throw new Error("Failed to update user role");
            }

            toast.success("User role updated", {
                description: "The user's role has been updated successfully.",
            });

            refetch();
        } catch {
            toast.error("Error", {
                description: "Failed to update user role",
            });
        }
    };

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => {
                const user = row.original;
                const initials = user.name
                    ? user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                    : "U";

                return (
                    <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage
                                src={user.image || ""}
                                alt={user.name || ""}
                            />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <span>{user.name || "Unnamed User"}</span>
                    </div>
                );
            },
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => {
                const role = row.original.role;

                return (
                    <Badge
                        variant={
                            role === "ADMIN"
                                ? "default"
                                : role === "INSTRUCTOR"
                                ? "secondary"
                                : "outline"
                        }
                    >
                        {role}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: "Joined",
            cell: ({ row }) => {
                return new Date(row.original.createdAt).toLocaleDateString();
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const user = row.original;

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
                                    updateUserRole(user.id, "STUDENT")
                                }
                                disabled={user.role === "STUDENT"}
                            >
                                Set as Student
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    updateUserRole(user.id, "INSTRUCTOR")
                                }
                                disabled={user.role === "INSTRUCTOR"}
                            >
                                Set as Instructor
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => updateUserRole(user.id, "ADMIN")}
                                disabled={user.role === "ADMIN"}
                            >
                                Set as Admin
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: users,
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
                                    No users found
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
