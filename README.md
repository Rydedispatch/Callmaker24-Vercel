# Callmaker24-Vercel

A production-ready Next.js web application for Email & SMS Marketing, AI Chatbot, Helpdesk, IVR System, and Customer CRM - deployed on Vercel.

## 🚀 Features

### Core Features
- **Email & SMS Marketing**: Create and manage marketing campaigns with scheduling
- **AI Chatbot + Helpdesk**: Intelligent customer support with OpenAI integration
- **IVR System**: Interactive Voice Response with Twilio integration
- **Customer CRM**: Complete customer relationship management
- **Analytics & Reporting**: Comprehensive business insights and metrics
- **Payment Processing**: Stripe integration for subscription management
- **Role-Based Access Control**: Admin, Manager, Agent, and User roles

### Technical Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (production)
- **Authentication**: NextAuth.js
- **Payment**: Stripe
- **AI**: OpenAI API
- **Communications**: Twilio (SMS & Voice)
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ and npm
- Git
- A PostgreSQL database (for production)
- API keys for:
  - OpenAI
  - Stripe
  - Twilio
  - Email service (SendGrid/Resend)

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Rydedispatch/Callmaker24-Vercel.git
cd Callmaker24-Vercel
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and configure your environment variables:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/callmaker24"

# NextAuth
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"

# Email Provider
EMAIL_SERVER_HOST="smtp.sendgrid.net"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="apikey"
EMAIL_SERVER_PASSWORD="your-sendgrid-api-key"
EMAIL_FROM="noreply@callmaker24.com"

# Twilio
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="your-twilio-phone-number"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Stripe
STRIPE_SECRET_KEY="your-stripe-secret-key"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="your-stripe-webhook-secret"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_APP_NAME="Callmaker24"
```

### 4. Set up the database

Generate Prisma client:

```bash
npx prisma generate
```

Run database migrations:

```bash
npx prisma migrate dev
```

Seed the database (optional):

```bash
npm run db:seed
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
callmaker24-vercel/
├── prisma/
│   └── schema.prisma          # Database schema
├── src/
│   ├── app/
│   │   ├── api/               # API routes
│   │   ├── auth/              # Authentication pages
│   │   ├── dashboard/         # Dashboard pages
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Landing page
│   ├── components/
│   │   ├── layout/            # Layout components
│   │   ├── providers/         # Context providers
│   │   └── ui/                # Reusable UI components
│   ├── lib/
│   │   ├── auth.ts            # NextAuth configuration
│   │   └── prisma.ts          # Prisma client
│   └── types/                 # TypeScript type definitions
├── .env.example               # Example environment variables
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🎯 Key Features Implementation

### Authentication
- Email/password and Google OAuth
- Role-based access control (RBAC)
- Protected routes and API endpoints
- Session management

### Customer CRM
- Customer database with full CRUD operations
- Activity tracking and timeline
- Customer segmentation and tagging
- Import/export functionality

### Marketing Campaigns
- Email and SMS campaign creation
- Campaign scheduling
- Template library
- Analytics and tracking

### AI Chatbot & Helpdesk
- OpenAI-powered responses
- Ticket management system
- Conversation history
- AI-suggested responses

### IVR System
- Twilio Voice integration
- Call routing and management
- Call recording and transcription
- Analytics and reporting

### Payment & Billing
- Stripe subscription management
- Multiple pricing tiers
- Payment history and invoices
- Usage-based billing

## 📦 Scripts

```bash
# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run type-check       # Run TypeScript type checking

# Database
npx prisma generate      # Generate Prisma client
npx prisma migrate dev   # Run migrations
npx prisma studio        # Open Prisma Studio
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Rydedispatch/Callmaker24-Vercel)

### Environment Variables for Production

Make sure to set all environment variables in your Vercel project settings:
- Database connection (use Vercel Postgres or external PostgreSQL)
- API keys for all services
- Update `NEXTAUTH_URL` to your production domain
- Generate a secure `NEXTAUTH_SECRET`

## 🔒 Security

- CSRF protection enabled
- Secure headers configured
- Input validation with Zod
- SQL injection prevention with Prisma
- XSS protection
- Rate limiting on API routes

## 🧪 Testing

```bash
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
```

## 📚 API Documentation

API documentation is available at `/api/docs` when running the application.

### Main Endpoints

- `/api/auth/*` - Authentication endpoints
- `/api/customers` - Customer management
- `/api/campaigns` - Campaign management
- `/api/messages` - Message handling
- `/api/tickets` - Support tickets
- `/api/calls` - IVR and call management
- `/api/stripe` - Payment processing

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@callmaker24.com or join our Slack channel.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Prisma](https://www.prisma.io/)
- [NextAuth.js](https://next-auth.js.org/)
- [Stripe](https://stripe.com/)
- [OpenAI](https://openai.com/)
- [Twilio](https://www.twilio.com/)

---

Built with ❤️ by the Callmaker24 Team
