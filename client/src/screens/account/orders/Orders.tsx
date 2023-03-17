import { useQuery } from "react-query";
import { OrdersApiPaths, QueryKeys, request } from "../../../common";
import { OrderResponse } from "./dto";
import { OrderCard } from "./OrderCard";

export const Orders = () => {
  const { data, error } = useQuery(
    QueryKeys.GET_ORDERS,
    (): Promise<OrderResponse> => request(OrdersApiPaths.Index)
  );

  if (error) {
    return <p className="text-red-500">COULD_NOT_LOAD_ORDERS</p>;
  }

  if (data) {
    return data.orders.length >= 1 ? (
      <div>
        <p className="py-2 text-2xl">Orders</p>
        <div className="grid grid-cols-3 gap-4">
          {data.orders.map((order) => (
            <OrderCard order={order} key={order.id} />
          ))}
        </div>
      </div>
    ) : (
      <p className="py-2">You have no orders yet!</p>
    );
  }

  return null;
};
