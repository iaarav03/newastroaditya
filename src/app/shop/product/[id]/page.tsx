'use client'
import { useState, useEffect, use } from 'react'
import Image from 'next/image'
import { FaStar } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'react-hot-toast'
import Script from 'next/script'

interface Product {
  _id: string;
  userId: string;
  shopName: string;
  itemName: string;
  price: number;
  discountedprice?: number;
  description: string;
  category: string;
  stock: number;
  image: string[];
  rating: number;
  totalRatings: number;
}

interface OrderResponse {
  orderId: string;
  amount: number;
  currency: string;
  keyId: string;
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [processingPayment, setProcessingPayment] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
    
    // Check if Razorpay is loaded
    const checkRazorpay = setInterval(() => {
      if ((window as any).Razorpay) {
        setRazorpayLoaded(true);
        clearInterval(checkRazorpay);
      }
    }, 1000);
    
    return () => clearInterval(checkRazorpay);
  }, [resolvedParams.id]);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://astroalert-backend-m1hn.onrender.com/api/shop/${resolvedParams.id}`);
      if (!response.ok) throw new Error('Failed to fetch product');
      const data = await response.json();
      setProduct(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load product');
      setLoading(false);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    
    // Check if Razorpay is loaded
    if (!razorpayLoaded) {
      toast.error('Payment system is loading. Please try again in a moment.');
      return;
    }
    
    try {
      setProcessingPayment(true);
      toast.loading('Processing your order...');
      
      // Create an order in the backend
      const token = localStorage.getItem('token');
      if (!token) {
        toast.dismiss();
        toast.error('Please log in to make a purchase');
        router.push('/login');
        return;
      }
      
      const orderData = {
        items: [{
          productId: product._id,
          quantity: 1,
          price: product.discountedprice || product.price
        }],
        totalAmount: product.discountedprice || product.price
      };
      
      const orderResponse = await fetch('https://astroalert-backend-m1hn.onrender.com/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      });
      
      if (!orderResponse.ok) {
        const errorData = await orderResponse.json();
        throw new Error(errorData.error || 'Failed to create order');
      }
      
      const orderResult: OrderResponse = await orderResponse.json();
      toast.dismiss();
      
      // Get user info for prefill
      const userInfo = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Initialize Razorpay payment
      const options = {
        key: orderResult.keyId,
        amount: orderResult.amount, // Amount is already in paise
        currency: orderResult.currency,
        name: "Astroalert",
        description: `Purchase: ${product.itemName}`,
        order_id: orderResult.orderId,
        handler: function(response: any) {
          // Handle successful payment
          verifyPayment(response, orderResult.orderId);
        },
        prefill: {
          name: userInfo.name || "",
          email: userInfo.email || "",
          contact: userInfo.phone || ""
        },
        notes: {
          productId: product._id,
          productName: product.itemName
        },
        theme: {
          color: "#f97316"
        },
        modal: {
          ondismiss: function() {
            setProcessingPayment(false);
            toast.error('Payment cancelled');
          }
        }
      };
      
      try {
        const razorpay = new (window as any).Razorpay(options);
        razorpay.on('payment.failed', function(response: any) {
          toast.error('Payment failed: ' + (response.error?.description || 'Unknown error'));
          setProcessingPayment(false);
        });
        
        razorpay.open();
      } catch (razorpayError: any) {
        console.error('Razorpay error:', razorpayError);
        toast.error('Payment system error. Please try again later.');
        setProcessingPayment(false);
      }
      
    } catch (err: any) {
      toast.dismiss();
      console.error('Order error:', err);
      toast.error(err.message || 'Failed to process purchase');
      setProcessingPayment(false);
    }
  };
  
  const verifyPayment = async (paymentResponse: any, orderId: string) => {
    try {
      const token = localStorage.getItem('token');
      const verifyResponse = await fetch('https://astroalert-backend-m1hn.onrender.com/api/orders/verify-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          orderId: orderId,
          paymentId: paymentResponse.razorpay_payment_id,
          signature: paymentResponse.razorpay_signature
        })
      });
      
      if (!verifyResponse.ok) {
        const errorData = await verifyResponse.json();
        throw new Error(errorData.error || 'Payment verification failed');
      }
      
      toast.success('Payment successful!');
      router.push('/orders/success');
    } catch (err: any) {
      console.error('Verification error:', err);
      toast.error(err.message || 'Payment verification failed');
    } finally {
      setProcessingPayment(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
    </div>
  );

  if (error || !product) return (
    <div className="min-h-screen flex items-center justify-center text-red-500">
      {error || 'Product not found'}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8">
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
        onLoad={() => setRazorpayLoaded(true)}
        onError={() => {
          console.error('Failed to load Razorpay script');
          toast.error('Payment system unavailable');
        }}
      />
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-6 md:p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src={product.image[selectedImage] || '/placeholder.png'}
                  alt={product.itemName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto">
                {product.image.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 rounded-md overflow-hidden border-2 
                      ${selectedImage === index ? 'border-orange-500' : 'border-transparent'}`}
                  >
                    <Image
                      src={img}
                      alt={`${product.itemName} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <button
                onClick={() => router.back()}
                className="text-amber-600 hover:text-amber-700"
              >
                ← Back to Shop
              </button>
              
              <h1 className="text-3xl font-bold text-amber-900">{product.itemName}</h1>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <FaStar className="text-yellow-500" />
                  <span className="text-gray-600">
                    {product.rating.toFixed(1)} ({product.totalRatings} reviews)
                  </span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-amber-600">{product.category}</span>
              </div>

              <div className="space-y-2">
                <div className="text-3xl font-bold text-amber-900">
                  ₹{product.discountedprice || product.price}
                </div>
                {product.discountedprice && (
                  <div className="flex items-center gap-2">
                    <span className="text-lg text-gray-500 line-through">₹{product.price}</span>
                    <span className="text-green-600">
                      {(((product.price - product.discountedprice) / product.price) * 100).toFixed(0)}% OFF
                    </span>
                  </div>
                )}
              </div>

              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-amber-900">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Availability:</span>
                  <span className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                  </span>
                </div>

                {product.stock > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleBuyNow}
                    disabled={processingPayment || !razorpayLoaded}
                    className={`w-full md:w-auto px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 
                      text-white rounded-lg font-semibold hover:shadow-lg transition-all
                      ${(processingPayment || !razorpayLoaded) ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {processingPayment ? 'Processing...' : 'Buy Now'}
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
