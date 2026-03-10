"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { api } from '@/lib/api';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const orderId = searchParams.get('order_id');
  const { clearCart } = useCart();
  const [loading, setLoading] = useState(true);
  const [sessionData, setSessionData] = useState<any>(null);

  useEffect(() => {
    if (sessionId) {
      loadSession();
      clearCart();
    }
  }, [sessionId]);

  const loadSession = async () => {
    try {
      const data = await api.getStripeSession(sessionId!);
      setSessionData(data);
    } catch (error) {
      console.error('Failed to load session:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase
        </p>

        {orderId && (
          <div className="bg-gray-50 p-4 rounded-lg mb-8">
            <p className="text-sm text-gray-600 mb-1">Order ID</p>
            <p className="font-mono font-semibold">{orderId}</p>
          </div>
        )}

        {sessionData?.customer_email && (
          <p className="text-gray-600 mb-8">
            A confirmation email has been sent to{' '}
            <span className="font-semibold">{sessionData.customer_email}</span>
          </p>
        )}

        <div className="flex gap-4 justify-center">
          <Link
            href="/products"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
