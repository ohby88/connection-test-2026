# 강아지 옷 쇼핑몰 프로젝트

## 프로젝트 개요
강아지 옷 쇼핑몰 + AI 가상 피팅 서비스

## 핵심 기능
### 기본 기능
- 강아지 옷 쇼핑몰 (상품 목록, 상세, 장바구니, 결제)

### 차별화 기능
- **AI 가상 피팅**: 강아지 사진 업로드 → 옷 입혀보기
- 사진/동영상으로 결과 생성
- 실시간 미리보기

## 기술 스택 (확정)
### Frontend
- **Next.js 14** (App Router) - SEO 최적화, 글로벌 검색 노출
- **Tailwind CSS** - 빠른 UI 개발
- **Vercel** - 무료 호스팅 (글로벌 CDN)

### Backend
- **FastAPI (Python)** - 빠른 개발 + AI 통합 용이
- **Supabase** - 무료 PostgreSQL + Auth + Storage (500MB DB, 1GB Storage)
- **Railway/Render** - 무료 티어로 FastAPI 배포

### AI 가상 피팅
- **Replicate API** - 사용한 만큼만 결제 (초기엔 거의 무료)
  - Stable Diffusion + ControlNet
  - 서버 관리 불필요
- 대안: **Hugging Face Inference API** (무료 티어)

### Payment
- **Stripe** - 글로벌 결제 (190+ 국가)
- 수수료만 발생 (초기 비용 0)

### Deployment
- Frontend: Vercel (무료)
- Backend: Railway (무료 $5 크레딧/월)
- Database: Supabase (무료)
- Storage: Supabase Storage (무료)

## 프로젝트 구조
```
dog-fashion-shop/
├── frontend/          # Next.js
├── backend/           # FastAPI
├── ai/                # AI 가상 피팅
└── shared/            # 공통 타입/상수
```

## 현재 상태
- [x] GitHub 저장소 설정 완료
- [x] 기술 스택 최종 결정
- [x] 프로젝트 구조 생성
- [x] Backend API 개발 (Products, Orders, Payment, AI Fitting, Upload)
- [x] Frontend UI 개발 (홈, 상품, 장바구니, 체크아웃, AI 피팅)
- [x] 장바구니 및 상태 관리
- [x] Stripe 결제 연동
- [x] 이미지 업로드 (Supabase Storage)
- [ ] Supabase 설정 및 테스트
- [ ] Replicate API 설정
- [ ] 배포 (Vercel + Railway)

## Git 정보
- 저장소: https://github.com/ohby88/connection-test-2026
- SSH 키 설정 완료
- 회사/집 양쪽 작업 가능
