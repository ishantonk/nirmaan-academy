import { OrderDTO } from "@/lib/services";
import {
  CreateOrderInput,
  UpdateOrderInput,
  OrderListQueryInput,
} from "@/lib/validators";
import { apiRequest, toSearchParams } from "@/lib/api/utils";

/** Get list of orders (Protected - Admin or User) */
export async function getOrders(
  params?: OrderListQueryInput,
  signal?: AbortSignal
): Promise<{
  items: OrderDTO[];
  nextCursor?: string;
  total?: number; // optional expensive count
}> {
  const queryString = toSearchParams(params ?? {});
  return apiRequest<{
    items: OrderDTO[];
    nextCursor?: string;
    total?: number;
  }>(`/api/orders?${queryString}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get order by ID (Protected - Owner or Admin) */
export async function getOrderById(
  id: string,
  signal?: AbortSignal
): Promise<OrderDTO> {
  return apiRequest<OrderDTO>(`/api/orders/${id}`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Get orders by User ID (Protected) */
export async function getOrdersByUser(
  userId: string,
  signal?: AbortSignal
): Promise<OrderDTO[]> {
  return apiRequest<OrderDTO[]>(`/api/users/${userId}/orders`, {
    method: "GET",
    cache: "no-store",
    signal,
  });
}

/** Create order (Protected) */
export async function createOrder(
  input: CreateOrderInput,
  signal?: AbortSignal
): Promise<OrderDTO> {
  return apiRequest<OrderDTO>(`/api/orders`, {
    method: "POST",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Update order (Protected - Admin) */
export async function updateOrder(
  input: UpdateOrderInput,
  signal?: AbortSignal
): Promise<OrderDTO> {
  return apiRequest<OrderDTO>(`/api/orders/${input.id}`, {
    method: "PUT",
    body: JSON.stringify(input),
    cache: "no-store",
    signal,
  });
}

/** Delete order (Protected - Admin) */
export async function deleteOrder(
  id: string,
  signal?: AbortSignal
): Promise<{ id: string }> {
  return apiRequest<{ id: string }>(`/api/orders/${id}`, {
    method: "DELETE",
    cache: "no-store",
    signal,
  });
}

/** Update Payment Status (Protected) */
export async function updateStatusPayment(
  id: string,
  paymentStatus: OrderDTO["paymentStatus"],
  signal?: AbortSignal
): Promise<OrderDTO> {
  return apiRequest<OrderDTO>(`/api/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ paymentStatus }),
    cache: "no-store",
    signal,
  });
}

/** Update Order Status (Protected) */
export async function updateStatusOrder(
  id: string,
  status: OrderDTO["status"],
  signal?: AbortSignal
): Promise<OrderDTO> {
  return apiRequest<OrderDTO>(`/api/orders/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
    cache: "no-store",
    signal,
  });
}
