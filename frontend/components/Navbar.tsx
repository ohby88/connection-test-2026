"use client";

import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-2xl font-bold">🐕 Dog Fashion</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Shop
            </Link>
            <Link
              href="/ai-fitting"
              className="text-gray-700 hover:text-purple-600 font-medium"
            >
              AI Try-On
            </Link>
            <Link
              href="/cart"
              className="relative text-gray-700 hover:text-blue-600 font-medium"
            >
              🛒 Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
