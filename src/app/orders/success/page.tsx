'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

export default function OrderSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to shop after 5 seconds
    const timer = setTimeout(() => {
      router.push('/shop');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <FaCheckCircle className="text-green-500 text-6xl" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Payment Successful!
        </h1>
        
        <p className="text-gray-600 mb-6">
          Thank you for your purchase! Your order has been successfully placed and will be processed soon.
        </p>

        <div className="space-y-3">
          <button
            onClick={() => router.push('/orders/my-orders')}
            className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg font-medium transition-colors"
          >
            View My Orders
          </button>
          
          <button
            onClick={() => router.push('/shop')}
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-lg font-medium transition-colors"
          >
            Continue Shopping
          </button>
        </div>
        
        <p className="text-gray-400 text-sm mt-6">
          You will be redirected to the shop in 5 seconds...
        </p>
      </motion.div>
    </div>
  );
} 