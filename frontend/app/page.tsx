import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              🐶 Dog Fashion Shop
            </h1>
            <p className="text-xl md:text-3xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Dress your pup in style with AI-powered virtual try-on
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-blue-600 text-lg font-semibold px-8 py-4 rounded-full hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg"
              >
                🛍️ Start Shopping
              </Link>
              <Link
                href="/ai-fitting"
                className="bg-purple-700 text-white text-lg font-semibold px-8 py-4 rounded-full hover:bg-purple-800 transition-all transform hover:scale-105 shadow-lg"
              >
                ✨ Try AI Fitting
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🛍️</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Premium Collection</h3>
            <p className="text-gray-600 leading-relaxed">
              Browse our curated collection of stylish and comfortable dog clothing for all breeds and sizes
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🤖</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">AI Virtual Try-On</h3>
            <p className="text-gray-600 leading-relaxed">
              Upload your dog's photo and see how they look in our outfits using advanced AI technology
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all">
            <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-5xl">🌍</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Global Shipping</h3>
            <p className="text-gray-600 leading-relaxed">
              Fast and reliable worldwide shipping to over 190 countries with secure payment processing
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4">
            Ready to dress up your furry friend?
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join thousands of happy pet owners worldwide
          </p>
          <Link
            href="/products"
            className="bg-white text-purple-600 text-lg font-semibold px-10 py-4 rounded-full hover:bg-purple-50 inline-block transition-all transform hover:scale-105 shadow-lg"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
