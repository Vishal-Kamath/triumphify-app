import { Order } from "@/@types/order";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

function getTotals(all_orders: Order[]) {
  const quantity = all_orders.reduce(
    (total, curr) => total + curr.product_quantity,
    0,
  );
  const price = all_orders.reduce(
    (total, curr) =>
      total + curr.product_quantity * curr.product_variation_price,
    0,
  );
  const discount = all_orders.reduce(
    (total, curr) =>
      total +
      curr.product_quantity *
        ((curr.product_variation_price * curr.product_variation_discount) /
          100),
    0,
  );

  const total = price - discount;
  return { quantity, price, discount, total };
}
const OrderGroupDetails: FC<{ all_orders?: Order[] }> = ({ all_orders }) => {
  if (!all_orders) return null;

  const { quantity, price, discount, total } = getTotals(all_orders);
  return (
    <div className="flex flex-col">
      <div className="rounded-t-md border-1 border-b-0 border-slate-700 bg-slate-900 p-3 font-medium">
        Order group breackdowm
      </div>
      <table className="border-collapse select-none overflow-x-auto text-sm scrollbar-none max-lg:block [&>*>*>*]:border-1 [&>*>*>*]:border-slate-700 [&>*>*]:border-1 [&>*>*]:border-slate-700 [&>*]:border-1 [&>*]:border-slate-700">
        <thead className="bg-slate-900 font-medium text-slate-400">
          <tr className="text-xs">
            <th className="p-3 text-left">Details</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Price (per unit)</th>
            <th className="p-3">Discount (%)</th>
            <th className="p-3">Total</th>
          </tr>
        </thead>
        <tbody>
          {all_orders.map((order, index) => (
            <tr key={index + order.id} className="text-slate-300">
              <td className="w-full min-w-[15rem] p-3">
                <div className="flex gap-2">
                  <div className="flex flex-col">
                    <span className="font-medium text-slate-200">
                      {order.product_name}
                    </span>
                    <span className="text-slate-500">
                      {order.product_brand_name}
                    </span>
                  </div>
                  <Link
                    href={`/orders/details/${order.id}`}
                    className="h-fit text-slate-500 hover:text-slate-300"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </div>
              </td>
              <th className="w-full min-w-[5rem] p-3 text-xs">
                {order.product_quantity}
              </th>
              <th className="w-full min-w-[5rem] p-3 text-xs">
                {order.product_variation_price}
              </th>
              <th className="w-full min-w-[5rem] p-3 text-xs">
                {order.product_variation_discount}%
              </th>
              <th className="w-full min-w-[5rem] p-3 text-xs">
                {order.product_variation_price * order.product_quantity -
                  order.product_variation_price *
                    (order.product_variation_discount / 100) *
                    order.product_quantity}
              </th>
            </tr>
          ))}
          <tr className="text-slate-300">
            <td className="w-full min-w-[15rem] p-3"></td>
            <th className="w-full min-w-[5rem] p-3 text-xs">{quantity}</th>
            <th className="w-full min-w-[5rem] p-3 text-xs">{price}</th>
            <th className="w-full min-w-[5rem] p-3 text-xs">
              {discount ? (
                <span className="text-green-500">-{discount}</span>
              ) : (
                <span>0</span>
              )}
            </th>
            <th className="w-full min-w-[5rem] p-3 text-xs">{total}</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderGroupDetails;
