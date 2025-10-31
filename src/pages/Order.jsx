import { useEffect, useState } from "react";
import api from "../services/api";
import { BoxCubeIcon } from "../icons";
import { toast } from "react-toastify";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/api/admin/orders");
      setOrders(response.data.orders || []);
    } catch (error) {
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, "0")}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getFullYear()}`;
  };

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <BoxCubeIcon className="text-blue-600" />
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 rounded-lg shadow-sm"
            >
              {/* Order Header (click to expand) */}
              <div
                onClick={() => toggleExpand(order.id)}
                className="bg-gray-100 px-4 py-3 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition"
              >
                <div>
                  <h2 className="font-semibold text-lg text-blue-700">
                    Order #{order.order_number}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Customer:{" "}
                    {order.user
                      ? `${order.user.first_name} ${order.user.last_name}`
                      : "—"}
                    {" • "}
                    {formatDate(order.created_at)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Order Status:
                    </span>
                    <span
                      className={`px-3 py-1 rounded text-sm font-semibold ${
                        order.order_status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.order_status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {order.order_status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-700">
                      Total Amount:
                    </span>
                    <span className="text-lg font-bold text-gray-800">
                      ${order.total_amount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expand Section — Show items only if selected */}
              {expandedOrderId === order.id && (
                <div className="p-4 border-t border-gray-200 bg-white">
                  {order.order_items && order.order_items.length > 0 ? (
                    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">S.No</th>
                          <th className="px-4 py-2 text-left">Product</th>
                          <th className="px-4 py-2 text-left">Unit</th>
                          <th className="px-4 py-2 text-left">Qty</th>
                          <th className="px-4 py-2 text-left">Price</th>
                          <th className="px-4 py-2 text-left">Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.order_items.map((item, idx) => (
                          <tr
                            key={item.id}
                            className="hover:bg-gray-50 border-b border-gray-100"
                          >
                            <td className="px-4 py-2">{idx + 1}</td>
                            <td className="px-4 py-2">
                              {item.product?.name || "—"}
                            </td>
                            <td className="px-4 py-2">
                              {item.unit?.name || "—"}
                            </td>
                            <td className="px-4 py-2">{item.quantity || "—"}</td>
                            <td className="px-4 py-2">
                              ${Number(item.price)?.toFixed(2) || "—"}
                            </td>
                            <td className="px-4 py-2">
                              <img
                                src={
                                  item.product?.images?.[0] || "/no-image.png"
                                }
                                alt={item.product?.name || "Product"}
                                className="w-12 h-12 rounded object-cover"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-sm text-gray-500">No items found.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
