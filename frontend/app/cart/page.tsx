"use client";

import { useCart } from '@/lib/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();
  const router = useRouter();

  const handleCheckout = () => {
    // Navigate to checkout page
    router.push('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 text-sm"
          >
            Clear Cart
          </button>
        </div>

        <div className="space-y-4 mb-8">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 p-4 border rounded-lg bg-white"
            >
              {/* Product Image */}
              <img
                src={product.image_url}
                alt={product.name}
                className="w-24 h-24 object-cover rounded"
              />

              {/* Product Details */}
              <div className="flex-1">
                <Link
                  href={`/products/${product.id}`}
                  className="font-semibold text-lg hover:text-blue-600"
                >
                  {product.name}
                </Link>
                <p className="text-sm text-gray-600">
                  {product.color} · {product.size}
                </p>
                <p className="text-blue-600 font-semibold mt-1">
                  ${product.price}
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(product.id, quantity - 1)}
                  className="w-8 h-8 border rounded hover:bg-gray-100"
                >
                  -
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => updateQuantity(product.id, quantity + 1)}
                  disabled={quantity >= product.stock}
                  className="w-8 h-8 border rounded hover:bg-gray-100 disabled:bg-gray-200 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>

              {/* Subtotal */}
              <div className="flex flex-col items-end justify-between">
                <button
                  onClick={() => removeItem(product.id)}
                  className="text-red-600 hover:text-red-700 text-sm"
                >
                  Remove
                </button>
                <p className="font-bold text-lg">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div className="border-t pt-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-2xl font-bold">Total:</span>
            <span className="text-3xl font-bold text-blue-600">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-4">
            <Link
              href="/products"
              className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold text-center hover:bg-gray-300"
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleCheckout}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
