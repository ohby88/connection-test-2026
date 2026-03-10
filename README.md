# 🐕 Dog Fashion Shop - AI Virtual Fitting

A global e-commerce platform for dog clothing with AI-powered virtual try-on features.

## ✨ Features

- 🛍️ **E-commerce** - Browse and purchase dog clothes
- 🤖 **AI Virtual Fitting** - Upload your dog's photo and see how clothes look with AI
- 📸 **Image & Video Generation** - Get AI-generated photos and videos
- 🌍 **Global Reach** - Worldwide shipping with Stripe payments
- 💰 **Cost-Efficient** - Built with free/low-cost services

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework with SEO optimization
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type safety
- **Vercel** - Free hosting with global CDN

### Backend
- **FastAPI** (Python) - High-performance API
- **Supabase** - PostgreSQL database + Auth + Storage
- **Railway/Render** - Free tier deployment

### AI
- **Replicate API** - Stable Diffusion + ControlNet for virtual fitting
- **Alternative**: Hugging Face Inference API (free tier)

### Payment
- **Stripe** - Global payment processing (190+ countries)

## 📁 Project Structure

```
dog-fashion-shop/
├── frontend/              # Next.js frontend
│   ├── app/              # App router pages
│   ├── components/       # React components
│   └── lib/              # Utilities
├── backend/              # FastAPI backend
│   ├── api/
│   │   └── routes/      # API endpoints
│   ├── models/          # Database models
│   ├── services/        # Business logic
│   └── main.py          # FastAPI app
├── ai/                   # AI virtual fitting
│   └── fitting.py       # AI service
└── shared/              # Shared schemas
    └── schema.sql       # Database schema
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.10+
- npm or yarn
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/ohby88/connection-test-2026.git
cd connection-test-2026
```

2. **Backend Setup**
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Setup environment variables
cp .env.example .env
# Edit .env with your API keys

# Run backend
python main.py
# API will run on http://localhost:8000
```

3. **Frontend Setup**
```bash
cd frontend

# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local
# Edit .env.local with your API keys

# Run development server
npm run dev
# App will run on http://localhost:3000
```

4. **Database Setup**

- Create a Supabase account (free): https://supabase.com
- Create a new project
- Run the SQL in `shared/schema.sql` in Supabase SQL Editor
- Copy your Supabase URL and keys to .env files

5. **AI Setup**

- Create a Replicate account: https://replicate.com
- Get your API token
- Add to backend/.env: `REPLICATE_API_TOKEN=your_token`

6. **Payment Setup**

- Create a Stripe account: https://stripe.com
- Get your API keys (test mode)
- Add to .env files

## 📝 Environment Variables

### Backend (.env)
```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key
REPLICATE_API_TOKEN=your_replicate_api_token
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

## 🎯 Development Roadmap

### Phase 1: MVP (Weeks 1-2)
- [x] Project setup
- [x] Basic structure
- [ ] Product catalog
- [ ] Shopping cart
- [ ] Stripe checkout
- [ ] AI virtual fitting (photos)

### Phase 2: Features (Weeks 3-4)
- [ ] Video generation
- [ ] User accounts
- [ ] Order history
- [ ] Size recommendations

### Phase 3: Growth
- [ ] Social feed
- [ ] Style recommendations
- [ ] Subscription service
- [ ] Mobile app (React Native)

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel
```

### Backend (Railway)
- Connect GitHub repo
- Select backend folder
- Add environment variables
- Deploy

### Database (Supabase)
- Already hosted (free tier)

## 💡 Cost Breakdown (Free Tier)

- **Vercel**: $0 (100GB bandwidth/month)
- **Railway**: $0 ($5 credit/month)
- **Supabase**: $0 (500MB DB, 1GB storage)
- **Replicate**: Pay per use (~$0.002/image)
- **Stripe**: 2.9% + $0.30 per transaction

**Monthly cost**: ~$0-5 for low traffic

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📄 License

MIT License

## 🔗 Links

- **Repository**: https://github.com/ohby88/connection-test-2026
- **Live Demo**: Coming soon

## 📧 Contact

For questions or support, open an issue on GitHub.

---

Built with ❤️ and Claude AI
