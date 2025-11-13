# Callmaker24 - Marketing Automation & CRM Platform

A full-featured, production-ready Next.js web application for marketing automation, customer relationship management, AI-powered support, and communication services.

## 🚀 Features

### Core Functionality
- **Email & SMS Marketing** - Create and send targeted campaigns using Twilio
- **AI Chatbot & Helpdesk** - 24/7 automated support powered by OpenAI
- **IVR System** - Interactive Voice Response with Twilio Voice
- **Customer CRM** - Comprehensive contact and customer management
- **Analytics & Reporting** - Real-time insights and performance metrics
- **Payment Processing** - Secure subscription management with Stripe

### Technical Features
- **Role-Based Access Control** - Admin, Manager, Agent, and User roles
- **Campaign Builder** - Visual campaign creation for email, SMS, and voice
- **Real-time Analytics** - Track campaign performance and customer engagement
- **Scalable Architecture** - Built for high performance and scalability
- **Full TypeScript** - Type-safe codebase for reliability
- **Responsive Design** - Works seamlessly on all devices

## 🛠️ Tech Stack

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** NextAuth.js v5
- **Database:** PostgreSQL with Prisma ORM
- **Payments:** Stripe
- **AI:** OpenAI GPT-4
- **Communications:** Twilio (SMS, Voice, IVR)
- **Deployment:** Vercel

## 📋 Prerequisites

Before you begin, ensure you have:
- Node.js 18+ installed
- PostgreSQL database (local or hosted)
- Stripe account and API keys
- OpenAI API key
- Twilio account with phone number
- Vercel account (for deployment)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Rydedispatch/Callmaker24-Vercel.git
cd Callmaker24-Vercel
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file and configure your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/callmaker24"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here" # Generate with: openssl rand -base64 32

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Twilio
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+1234567890"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push

# (Optional) Open Prisma Studio to manage data
npm run prisma:studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📦 Project Structure

```
callmaker24-vercel/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── campaigns/     # Campaign management
│   │   │   ├── contacts/      # Contact management
│   │   │   ├── chatbot/       # AI chatbot API
│   │   │   ├── tickets/       # Helpdesk tickets
│   │   │   └── stripe/        # Payment processing
│   │   ├── dashboard/         # Dashboard pages
│   │   │   ├── campaigns/     # Campaign views
│   │   │   ├── contacts/      # Contact views
│   │   │   ├── analytics/     # Analytics dashboard
│   │   │   ├── helpdesk/      # Support tickets
│   │   │   └── settings/      # User settings
│   │   ├── login/             # Login page
│   │   ├── register/          # Registration page
│   │   ├── pricing/           # Pricing page
│   │   └── page.tsx           # Landing page
│   ├── components/            # React components
│   │   └── dashboard/         # Dashboard components
│   ├── lib/                   # Utilities and configurations
│   │   ├── auth.ts           # NextAuth configuration
│   │   ├── prisma.ts         # Prisma client
│   │   ├── stripe.ts         # Stripe configuration
│   │   ├── twilio.ts         # Twilio client
│   │   ├── openai.ts         # OpenAI client
│   │   └── utils.ts          # Helper functions
│   └── styles/               # Global styles
├── prisma/
│   └── schema.prisma         # Database schema
├── public/                   # Static assets
└── package.json             # Dependencies

```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema to database
- `npm run prisma:studio` - Open Prisma Studio

## 🌐 Deployment to Vercel

### Quick Deploy

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy!

### Detailed Steps

1. **Prepare Your Repository**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Configure Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables (same as .env)

3. **Database Setup**
   - Use a hosted PostgreSQL (Supabase, Railway, or Vercel Postgres)
   - Update DATABASE_URL in Vercel environment variables

4. **Stripe Webhook Setup**
   - Add Vercel deployment URL to Stripe webhooks
   - Webhook endpoint: `https://your-domain.vercel.app/api/stripe/webhook`
   - Update STRIPE_WEBHOOK_SECRET in Vercel

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application

## 🔐 Security Best Practices

- Never commit `.env` file to version control
- Rotate API keys regularly
- Use strong passwords for database
- Enable 2FA for all service accounts
- Keep dependencies updated
- Use environment variables for all secrets
- Implement rate limiting on API routes

## 📊 Database Schema

Key models:
- **User** - User accounts with role-based access
- **Contact** - Customer contact information
- **Campaign** - Marketing campaigns (email, SMS, voice)
- **Message** - Individual messages sent
- **Call** - Voice call records
- **Ticket** - Support tickets
- **Subscription** - User subscription plans
- **Analytics** - Performance metrics

## 🤝 API Integration

### Stripe Integration
- Subscription management
- Payment processing
- Webhook handling for subscription events

### Twilio Integration
- SMS messaging via Messaging Service
- Voice calls via Programmable Voice
- IVR system support

### OpenAI Integration
- AI-powered chatbot responses
- Automated ticket responses
- Natural language processing

## 🎨 Customization

### Branding
- Update colors in `tailwind.config.ts`
- Replace logo references in components
- Modify landing page content

### Features
- Add new roles in Prisma schema
- Create custom campaign types
- Extend analytics metrics

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
# Verify DATABASE_URL format
# Run: npx prisma db push --force-reset
```

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Stripe Webhook Issues
- Verify webhook secret is correct
- Check webhook endpoint is publicly accessible
- Review Stripe dashboard for failed webhooks

## 📄 License

ISC

## 👥 Support

For support and questions:
- Create an issue on GitHub
- Email: support@callmaker24.com
- Documentation: [docs.callmaker24.com](https://docs.callmaker24.com)

## 🙏 Acknowledgments

Built with:
- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Stripe](https://stripe.com/)
- [Twilio](https://www.twilio.com/)
- [OpenAI](https://openai.com/)
- [Tailwind CSS](https://tailwindcss.com/)
