import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <main className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">
          🐕 Dog Fashion Shop
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Shop dog clothes with AI-powered virtual try-on
        </p>

        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 mb-12"
        >
          Start Shopping
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">🛍️ Shop</h2>
            <p className="text-gray-600">
              Browse our collection of dog clothing
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">🤖 AI Try-On</h2>
            <p className="text-gray-600">
              See how clothes look on your dog with AI
            </p>
          </div>

          <div className="p-6 border rounded-lg hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">🌍 Global</h2>
            <p className="text-gray-600">
              Worldwide shipping available
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
