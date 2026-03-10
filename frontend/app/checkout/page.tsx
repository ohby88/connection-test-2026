"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/CartContext';
import { api } from '@/lib/api';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create order
      const order = await api.createOrder({
        user_id: 'demo-user', // TODO: Replace with actual user ID
        items: items.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity,
          price: item.product.price,
        })),
        shipping_address: formData,
      });

      // Create Stripe checkout session
      const origin = typeof window !== 'undefined' ? window.location.origin : '';
      const { url } = await api.createCheckoutSession(
        order.id,
        `${origin}/order-success`,
        `${origin}/cart`
      );

      // Redirect to Stripe checkout
      if (url && typeof window !== 'undefined') {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to process checkout. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Shipping Form */}
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">ZIP Code</label>
                  <input
                    type="text"
                    required
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Country</label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed mt-6"
              >
                {loading ? 'Processing...' : 'Continue to Payment'}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white p-6 rounded-lg sticky top-24">
              <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {items.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        Qty: {quantity} × ${product.price}
                      </p>
                    </div>
                    <p className="font-semibold">
                      ${(product.price * quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-xl font-bold pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-800">
                  🔒 Secure payment powered by Stripe
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
