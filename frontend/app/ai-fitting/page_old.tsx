"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { api, Product, AIFittingResult } from '@/lib/api';

export default function AIFittingPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('productId');

  const [product, setProduct] = useState<Product | null>(null);
  const [dogImageUrl, setDogImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIFittingResult | null>(null);

  useEffect(() => {
    if (productId) {
      loadProduct(parseInt(productId));
    }
  }, [productId]);

  const loadProduct = async (id: number) => {
    try {
      const data = await api.getProduct(id);
      setProduct(data);
    } catch (error) {
      console.error('Failed to load product:', error);
    }
  };

  const handleGenerate = async () => {
    if (!dogImageUrl || !productId) return;

    try {
      setLoading(true);
      const fitting = await api.createAIFitting({
        user_id: 'demo-user', // TODO: Replace with actual user ID from auth
        dog_image_url: dogImageUrl,
        product_id: parseInt(productId),
      });
      setResult(fitting);

      // Poll for result if processing
      if (fitting.status === 'processing') {
        pollForResult(fitting.id);
      }
    } catch (error) {
      console.error('Failed to create fitting:', error);
      alert('Failed to generate AI fitting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const pollForResult = async (fittingId: string) => {
    const maxAttempts = 30;
    let attempts = 0;

    const interval = setInterval(async () => {
      try {
        attempts++;
        const fitting = await api.getAIFitting(fittingId);
        setResult(fitting);

        if (fitting.status !== 'processing' || attempts >= maxAttempts) {
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Failed to poll fitting result:', error);
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">🤖 AI Virtual Fitting</h1>

        {product && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Selected Product:</h2>
            <div className="flex items-center gap-4">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-600">
                  {product.color} · {product.size}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Input */}
          <div>
            <label className="block font-semibold mb-2">
              Dog Photo URL
            </label>
            <input
              type="url"
              value={dogImageUrl}
              onChange={(e) => setDogImageUrl(e.target.value)}
              placeholder="https://example.com/dog-photo.jpg"
              className="w-full border rounded-lg px-4 py-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Paste a URL to your dog's photo (for demo purposes)
            </p>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={!dogImageUrl || !productId || loading}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Generating...' : 'Generate AI Fitting'}
          </button>

          {/* Result */}
          {result && (
            <div className="mt-8 border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Result</h3>

              {result.status === 'processing' && (
                <div className="text-center py-8">
                  <div className="animate-spin w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                  <p>Generating your AI fitting... This may take a minute.</p>
                </div>
              )}

              {result.status === 'completed' && result.result_image_url && (
                <div>
                  <img
                    src={result.result_image_url}
                    alt="AI Fitting Result"
                    className="w-full rounded-lg"
                  />
                  <div className="mt-4 flex gap-4">
                    <a
                      href={result.result_image_url}
                      download
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-center hover:bg-blue-700"
                    >
                      Download Image
                    </a>
                    <button
                      onClick={() => setResult(null)}
                      className="flex-1 bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {result.status === 'failed' && (
                <div className="text-center py-8 text-red-600">
                  <p>Failed to generate AI fitting. Please try again.</p>
                  <button
                    onClick={() => setResult(null)}
                    className="mt-4 bg-gray-200 py-2 px-4 rounded-lg hover:bg-gray-300"
                  >
                    Try Again
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
