'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns'

interface OrderItem {
  productId: {
    _id: string;
    itemName: string;
    image: string[];
    price: number;
    discountedPrice?: number;
  };
  quantity: number;
  price: number;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed';
  createdAt: string;
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/login');
        return;
      }

      const response = await fetch('https://astroalert-backend-m1hn.onrender.com/api/orders/my-orders', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const data = await response.json();
      setOrders(data);
    } catch (err: any) {
      setError(err.message || 'Failed to load orders');
      toast.error('Failed to load your orders');
    } finally {
      setLoading(false);
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-500 bg-green-50';
      case 'pending':
        return 'text-amber-500 bg-amber-50';
      case 'cancelled':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-500 bg-green-50';
      case 'pending':
        return 'text-amber-500 bg-amber-50';
      case 'failed':
        return 'text-red-500 bg-red-50';
      default:
        return 'text-gray-500 bg-gray-50';
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      {error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-amber-900">My Orders</h1>
            <button
              onClick={() => router.push('/shop')}
              className="text-amber-600 hover:text-amber-700"
            >
              Continue Shopping
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
              <button
                onClick={() => router.push('/shop')}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-lg"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border rounded-lg overflow-hidden bg-white"
                >
                  <div className="bg-gray-50 p-4 border-b flex flex-wrap justify-between items-center gap-2">
                    <div>
                      <span className="text-gray-500 text-sm">Order ID: </span>
                      <span className="font-medium">{order._id}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 text-sm">Ordered: </span>
                      <span className="font-medium">
                        {formatDistanceToNow(new Date(order.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <span className={`text-xs px-2 py-1 rounded-full ${getOrderStatusColor(order.status)}`}>
                        {order.status.toUpperCase()}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex py-3 border-b last:border-b-0">
                        <div className="w-20 h-20 relative flex-shrink-0">
                          <Image
                            src={item.productId.image[0] || '/placeholder.png'}
                            alt={item.productId.itemName}
                            fill
                            className="object-cover rounded"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{item.productId.itemName}</h3>
                          <div className="text-sm text-gray-500">
                            Qty: {item.quantity} × ₹{item.price}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-medium">₹{item.quantity * item.price}</div>
                        </div>
                      </div>
                    ))}

                    <div className="mt-4 border-t pt-4 flex justify-between">
                      <span className="font-medium">Total Amount:</span>
                      <span className="font-bold text-amber-900">₹{order.totalAmount}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
} 