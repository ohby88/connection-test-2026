"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { api, Product } from '@/lib/api';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, [productId]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const data = await api.getProduct(productId);
      setProduct(data);
    } catch (error) {
      console.error('Failed to load product:', error);
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

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product not found</h1>
          <Link href="/products" className="text-blue-600 hover:underline">
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <Link href="/products" className="text-blue-600 hover:underline mb-6 inline-block">
          ← Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-blue-600">
                ${product.price}
              </span>
              <span className="text-sm text-gray-500">
                {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="mb-6">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-2">
                <span className="font-semibold">Category:</span>
                <span className="capitalize">{product.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Size:</span>
                <span>{product.size}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">Color:</span>
                <span>{product.color}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <button
                disabled={product.stock === 0}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <Link
                href={`/ai-fitting?productId=${product.id}`}
                className="w-full block bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold text-center hover:bg-purple-700"
              >
                🤖 Try AI Virtual Fitting
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
