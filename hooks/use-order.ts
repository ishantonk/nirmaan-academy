import { useQuery } from "@tanstack/react-query";
import {
  getOrders,
  getOrderById,
  getOrdersByUser,
  createOrder,
  updateOrder,
  deleteOrder,
  updatePaymentStatus,
  updateOrderStatus,
} from "@/lib/api";
import type {
  CreateOrderInput,
  UpdateOrderInput,
  OrderListQueryInput,
} from "@/lib/validators";
import type { OrderDTO } from "@/lib/services";
import useAppMutation from "./use-app-mutation";

export const ordersQueryKey = ["orders"];

/** Get Orders (List) Hook */
export function useOrders(query?: OrderListQueryInput) {
  return useQuery<{
    items: OrderDTO[];
    nextCursor?: string;
    total?: number;
  }>({
    queryKey: [ordersQueryKey, query],
    queryFn: ({ signal }) => getOrders(query!, signal),
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Order by ID Hook */
export function useOrderById(id: string) {
  return useQuery<OrderDTO>({
    queryKey: [...ordersQueryKey, id],
    queryFn: ({ signal }) => getOrderById(id, signal),
    enabled: !!id,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Get Orders by User ID Hook */
export function useOrdersByUser(userId: string) {
  return useQuery<OrderDTO[]>({
    queryKey: [...ordersQueryKey, "user", userId],
    queryFn: ({ signal }) => getOrdersByUser(userId, signal),
    enabled: !!userId,
    staleTime: 1000 * 60,
    retry: 2,
  });
}

/** Create Order Hook */
export function useCreateOrder(onSuccessCallback?: () => void) {
  return useAppMutation<CreateOrderInput>(createOrder, {
    onSuccessMessage: "Order created successfully!",
    onSuccessCallback,
    invalidateKeys: ordersQueryKey,
  });
}

/** Update Order Hook */
export function useUpdateOrder(onSuccessCallback?: () => void) {
  return useAppMutation<UpdateOrderInput>(updateOrder, {
    onSuccessMessage: "Order updated successfully!",
    onSuccessCallback,
    invalidateKeys: ordersQueryKey,
  });
}

/** Delete Order Hook */
export function useDeleteOrder(onSuccessCallback?: () => void) {
  return useAppMutation<string>(deleteOrder, {
    onSuccessMessage: "Order deleted successfully!",
    onSuccessCallback,
    invalidateKeys: ordersQueryKey,
  });
}

/** Update Payment Status Hook */
export function useUpdatePaymentStatus(onSuccessCallback?: () => void) {
  return useAppMutation<{
    id: string;
    paymentStatus: OrderDTO["paymentStatus"];
  }>(({ id, paymentStatus }) => updatePaymentStatus(id, paymentStatus), {
    onSuccessMessage: "Payment status updated successfully!",
    onSuccessCallback,
    invalidateKeys: ordersQueryKey,
  });
}

/** Update Order Status Hook */
export function useUpdateOrderStatus(onSuccessCallback?: () => void) {
  return useAppMutation<{ id: string; status: OrderDTO["status"] }>(
    ({ id, status }) => updateOrderStatus(id, status),
    {
      onSuccessMessage: "Order status updated successfully!",
      onSuccessCallback,
      invalidateKeys: ordersQueryKey,
    }
  );
}
