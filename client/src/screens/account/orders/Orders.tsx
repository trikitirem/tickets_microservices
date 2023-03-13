import { useQuery } from "react-query";
import { OrdersApiPaths, QueryKeys, request } from "../../../common";
import { OrderResponse } from "./dto";
import { OrderCard } from "./OrderCard";

export const Orders = () => {
  const { data, isLoading, error } = useQuery(
    QueryKeys.GET_ORDERS,
    (): Promise<OrderResponse> => request(OrdersApiPaths.OrdersIndex)
  );

  if (isLoading) {
    return <p>Loading your orders...</p>;
  }

  if (error) {
    return <p className="text-red-500">COULD_NOT_LOAD_ORDERS</p>;
  }

  if (data) {
    return data.orders.length >= 1 ? (
      <div className="grid grid-cols-3 gap-4">
        {data.orders.map((order) => (
          <OrderCard order={order} key={order.id} />
        ))}
      </div>
    ) : (
      <p>You have no ticket yet</p>
    );
  }

  return null;
};
