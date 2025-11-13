# Callmaker24 Quick Start Guide

Get up and running with Callmaker24 in under 10 minutes!

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js 18 or higher
- ✅ npm or yarn
- ✅ A PostgreSQL database
- ✅ Git

## Step 1: Clone & Install (2 minutes)

```bash
# Clone the repository
git clone https://github.com/Rydedispatch/Callmaker24-Vercel.git
cd Callmaker24-Vercel

# Install dependencies
npm install
```

## Step 2: Get Your API Keys (3 minutes)

### Required Services

#### 1. Database (Choose One)
- **Vercel Postgres** (Recommended for Vercel deployment)
  - Go to vercel.com/storage
  - Create a PostgreSQL database
  - Copy the `DATABASE_URL`

- **Supabase** (Free tier available)
  - Go to supabase.com
  - Create a project
  - Copy the connection string from Settings → Database

#### 2. NextAuth Secret
```bash
# Generate a secure random string
openssl rand -base64 32
```

#### 3. Stripe (Payment Processing)
- Go to stripe.com/register
- Get your test API keys from Dashboard → Developers → API keys
- Save: `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`

#### 4. OpenAI (AI Chatbot)
- Go to platform.openai.com
- Create API key
- Save: `OPENAI_API_KEY`

#### 5. Twilio (SMS & Voice)
- Go to twilio.com/try-twilio
- Get your Account SID and Auth Token
- Buy a phone number
- Save: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`

## Step 3: Configure Environment (2 minutes)

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit with your favorite editor
nano .env.local  # or vi, code, etc.
```

**Minimal configuration to get started:**
```env
# Database (Required)
DATABASE_URL="your-postgres-connection-string"

# Authentication (Required)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generated-secret-from-step-2"

# Stripe (Required for payments)
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# OpenAI (Required for AI features)
OPENAI_API_KEY="sk-..."

# Twilio (Required for SMS/Voice)
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+1234567890"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Step 4: Initialize Database (1 minute)

```bash
# Generate Prisma client
npm run prisma:generate

# Push schema to database
npm run prisma:push
```

## Step 5: Start Development Server (30 seconds)

```bash
npm run dev
```

🎉 **Your app is now running at http://localhost:3000**

## Step 6: Create Your First Account (1 minute)

1. Open http://localhost:3000
2. Click "Get Started" or "Sign Up"
3. Fill in your details:
   - Name: Your Name
   - Email: your@email.com
   - Password: (minimum 8 characters)
4. Click "Create account"

## Step 7: Explore the Dashboard (2 minutes)

After logging in, you'll see the dashboard with:
- 📊 **Dashboard** - Overview of your stats
- 📧 **Campaigns** - Create email/SMS campaigns
- 👥 **Contacts** - Manage your customer list
- 📈 **Analytics** - View performance metrics
- 💬 **Helpdesk** - AI-powered support tickets
- ⚙️ **Settings** - Configure your account

## Quick Feature Tests

### Test 1: Add a Contact
```
1. Go to Contacts
2. Click "Add Contact"
3. Fill in details:
   - First Name: John
   - Email: john@example.com
   - Phone: +1234567890
4. Save
```

### Test 2: Create a Campaign
```
1. Go to Campaigns
2. Click "New Campaign"
3. Select type: SMS
4. Add name: "Welcome Message"
5. Write content: "Welcome to Callmaker24!"
6. Select contacts
7. Send or Schedule
```

### Test 3: AI Chatbot
```
1. Go to Helpdesk
2. Click "New Ticket"
3. Subject: "How do I create a campaign?"
4. Description: "I need help..."
5. Submit
6. See AI-generated response!
```

### Test 4: Check Analytics
```
1. Go to Analytics
2. View your metrics:
   - Total contacts
   - Campaign stats
   - Message delivery
```

## Common Issues & Solutions

### Issue: Database Connection Error
```bash
# Check your DATABASE_URL format
postgresql://user:password@host:5432/database

# Verify database is accessible
npm run prisma:studio
```

### Issue: Build Errors
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Issue: Prisma Client Errors
```bash
# Regenerate Prisma client
npm run prisma:generate

# Reset database (WARNING: Deletes data)
npm run prisma:push -- --force-reset
```

### Issue: Port Already in Use
```bash
# Use a different port
PORT=3001 npm run dev
```

## Next Steps

### 1. Set Up Stripe Products
Create subscription products in your Stripe Dashboard:
- Starter: $29/month
- Professional: $99/month
- Enterprise: $299/month

Copy the Price IDs and add to your `.env.local`:
```env
STRIPE_STARTER_PRICE_ID="price_..."
STRIPE_PROFESSIONAL_PRICE_ID="price_..."
STRIPE_ENTERPRISE_PRICE_ID="price_..."
```

### 2. Configure Twilio Webhooks
For incoming SMS/calls:
```
SMS: http://localhost:3000/api/twilio/sms
Voice: http://localhost:3000/api/twilio/voice
```

### 3. Deploy to Production
Follow our [Deployment Guide](./docs/DEPLOYMENT.md) to deploy to Vercel.

### 4. Explore Advanced Features
- Campaign templates
- Custom contact fields
- Advanced analytics
- API integrations

## Development Tips

### Hot Reload
Changes to code are automatically reflected - no restart needed!

### Database Management
```bash
# Open Prisma Studio for visual database management
npm run prisma:studio
```

### View Logs
```bash
# Server logs appear in your terminal
# Check the browser console for client-side logs
```

### Code Quality
```bash
# Run linter
npm run lint

# Build for production (test)
npm run build
```

## Learning Resources

### Documentation
- [README.md](./README.md) - Full documentation
- [API Documentation](./docs/API.md) - API reference
- [Architecture](./docs/ARCHITECTURE.md) - System design
- [Deployment](./docs/DEPLOYMENT.md) - Deployment guide

### External Resources
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Stripe API](https://stripe.com/docs/api)
- [Twilio API](https://www.twilio.com/docs)
- [OpenAI API](https://platform.openai.com/docs)

## Need Help?

- 📖 Check the [full documentation](./README.md)
- 💬 Open an [issue on GitHub](https://github.com/Rydedispatch/Callmaker24-Vercel/issues)
- 📧 Email: support@callmaker24.com

## Success Checklist

After completing this guide, you should have:
- ✅ Local development environment running
- ✅ Database connected and initialized
- ✅ User account created
- ✅ Dashboard accessible
- ✅ Test contact created
- ✅ Test campaign created
- ✅ AI chatbot tested

**Congratulations! You're ready to build with Callmaker24! 🚀**

---

**Time to Production:** With this setup, you're just a few steps away from deploying to production. Check out our [Deployment Guide](./docs/DEPLOYMENT.md) when you're ready!
