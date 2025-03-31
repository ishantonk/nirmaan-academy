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

type Order = {
    id: string;
    amount: number;
    status: string;
    user: {
        name: string;
        email: string;
    };
    createdAt: string;
};

export function AdminOrderTable() {
    const [page, setPage] = useState(0);

    const { data, isLoading, refetch } = useQuery({
        queryKey: ["admin-orders", page],
        queryFn: async () => {
            const response = await fetch(`/api/admin/orders?page=${page}`);
            if (!response.ok) {
                throw new Error("Failed to fetch orders");
            }
            return response.json();
        },
    });

    const orders = data?.orders || [];
    const totalPages = data?.totalPages || 0;

    const updateOrderStatus = async (orderId: string, status: string) => {
        try {
            const response = await fetch(`/api/admin/orders/${orderId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                throw new Error("Failed to update order status");
            }

            toast.success("Order status updated", {
                description: "The order status has been updated successfully.",
            });

            refetch();
        } catch {
            toast.error("Error", {
                description: "Failed to update order status",
            });
        }
    };

    const columns: ColumnDef<Order>[] = [
        {
            accessorKey: "id",
            header: "Order ID",
            cell: ({ row }) => {
                return (
                    <span className="font-mono text-xs">{row.original.id}</span>
                );
            },
        },
        {
            accessorKey: "user.name",
            header: "Customer",
            cell: ({ row }) => {
                return (
                    <div>
                        <div>{row.original.user.name}</div>
                        <div className="text-xs text-muted-foreground">
                            {row.original.user.email}
                        </div>
                    </div>
                );
            },
        },
        {
            accessorKey: "amount",
            header: "Amount",
            cell: ({ row }) => {
                return formatPrice(row.original.amount);
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
                            status === "COMPLETED"
                                ? "default"
                                : status === "PENDING"
                                ? "secondary"
                                : status === "CANCELLED"
                                ? "destructive"
                                : "outline"
                        }
                    >
                        {status}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "createdAt",
            header: "Date",
            cell: ({ row }) => {
                return new Date(row.original.createdAt).toLocaleDateString();
            },
        },
        {
            id: "actions",
            cell: ({ row }) => {
                const order = row.original;

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
                                    updateOrderStatus(order.id, "COMPLETED")
                                }
                                disabled={order.status === "COMPLETED"}
                            >
                                Mark as Completed
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    updateOrderStatus(order.id, "PENDING")
                                }
                                disabled={order.status === "PENDING"}
                            >
                                Mark as Pending
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    updateOrderStatus(order.id, "CANCELLED")
                                }
                                disabled={order.status === "CANCELLED"}
                            >
                                Mark as Cancelled
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    updateOrderStatus(order.id, "REFUNDED")
                                }
                                disabled={order.status === "REFUNDED"}
                            >
                                Mark as Refunded
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: orders,
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
                                    No orders found
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
