# Deployment Guide for Callmaker24

## Prerequisites

Before deploying, ensure you have:
1. A Vercel account
2. Your code pushed to a Git repository (GitHub, GitLab, or Bitbucket)
3. All required API keys and credentials
4. A PostgreSQL database (we recommend Vercel Postgres, Supabase, or Railway)

## Step 1: Database Setup

### Option A: Vercel Postgres (Recommended)

1. Go to your Vercel dashboard
2. Navigate to Storage → Create Database → Postgres
3. Follow the prompts to create your database
4. Copy the `DATABASE_URL` connection string

### Option B: Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to Settings → Database
3. Copy the connection string (Connection pooling mode)
4. Format: `postgresql://postgres:[password]@[host]:6543/postgres`

### Option C: Railway

1. Create a project at [railway.app](https://railway.app)
2. Add a PostgreSQL database
3. Copy the `DATABASE_URL` from the Variables tab

## Step 2: Environment Variables

Configure these environment variables in Vercel:

```bash
# Database
DATABASE_URL=postgresql://...

# NextAuth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-a-random-32-char-string

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_STARTER_PRICE_ID=price_...
STRIPE_PROFESSIONAL_PRICE_ID=price_...
STRIPE_ENTERPRISE_PRICE_ID=price_...

# OpenAI
OPENAI_API_KEY=sk-...

# Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+1...
TWILIO_MESSAGING_SERVICE_SID=MG...

# Email
EMAIL_FROM=noreply@your-domain.com
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=SG...

# App
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NEXT_PUBLIC_APP_NAME=Callmaker24
```

## Step 3: Deploy to Vercel

### Via Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build`
   - Output Directory: .next
4. Add all environment variables from Step 2
5. Click "Deploy"

### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Add environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production
# ... add all other variables
```

## Step 4: Database Migration

After deployment, initialize your database:

```bash
# Option 1: Via Vercel CLI
vercel env pull .env.production
npm run prisma:push

# Option 2: Via GitHub Actions (recommended)
# Add a workflow file (see CI/CD section below)
```

## Step 5: Configure Stripe Webhooks

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter URL: `https://your-domain.vercel.app/api/stripe/webhook`
4. Select events:
   - `checkout.session.completed`
   - `invoice.payment_succeeded`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret
6. Update `STRIPE_WEBHOOK_SECRET` in Vercel

## Step 6: Configure Stripe Products

Create your subscription products in Stripe:

1. Go to Products → Add Product
2. Create three products:
   - Starter ($29/month)
   - Professional ($99/month)
   - Enterprise ($299/month)
3. Copy the Price IDs
4. Update environment variables in Vercel:
   - `STRIPE_STARTER_PRICE_ID`
   - `STRIPE_PROFESSIONAL_PRICE_ID`
   - `STRIPE_ENTERPRISE_PRICE_ID`

## Step 7: Configure Twilio

### Phone Number
1. Buy a phone number in [Twilio Console](https://console.twilio.com)
2. Update `TWILIO_PHONE_NUMBER` environment variable

### Messaging Service
1. Go to Messaging → Services
2. Create a new Messaging Service
3. Add your phone number to the service
4. Copy the Messaging Service SID
5. Update `TWILIO_MESSAGING_SERVICE_SID` environment variable

### Voice Configuration
1. Go to your phone number settings
2. Configure Voice & Fax:
   - When a call comes in: Webhook
   - URL: `https://your-domain.vercel.app/api/twilio/voice`
   - HTTP Method: POST

## Step 8: Custom Domain (Optional)

1. Go to Vercel Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Update `NEXTAUTH_URL` and `NEXT_PUBLIC_APP_URL` environment variables

## Step 9: Verify Deployment

1. Visit your deployed site
2. Test user registration and login
3. Create a test campaign
4. Verify Stripe checkout flow
5. Test AI chatbot functionality
6. Check analytics dashboard

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Commits to `main` branch
- **Preview**: Pull requests and other branches

## Monitoring

### Vercel Analytics
Enable in Project Settings → Analytics

### Error Tracking
Consider adding:
- Sentry for error tracking
- LogRocket for session replay
- Datadog for APM

## Security Checklist

- [ ] All API keys are in environment variables
- [ ] NEXTAUTH_SECRET is a strong random string
- [ ] Stripe webhook secret is configured
- [ ] Database connection uses SSL
- [ ] Rate limiting is enabled on API routes
- [ ] CORS is properly configured
- [ ] Content Security Policy headers are set

## Performance Optimization

1. **Enable Vercel Analytics**: Track Core Web Vitals
2. **Add Image Optimization**: Use Next.js Image component
3. **Enable Caching**: Configure headers in `next.config.ts`
4. **Database Connection Pooling**: Use Prisma's connection pooling
5. **CDN**: Vercel automatically provides global CDN

## Rollback

If something goes wrong:

```bash
# Via Vercel CLI
vercel rollback

# Via Dashboard
# Go to Deployments → Select previous deployment → Promote to Production
```

## Troubleshooting

### Build Failures
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json`
- Ensure environment variables are set

### Database Connection Issues
- Verify DATABASE_URL format
- Check database is accessible from Vercel
- Enable connection pooling

### Webhook Failures
- Verify webhook URLs are publicly accessible
- Check webhook signing secrets
- Review webhook logs in service dashboards

## Support

For deployment issues:
- Vercel: [vercel.com/support](https://vercel.com/support)
- Prisma: [prisma.io/docs](https://www.prisma.io/docs)
- Stripe: [stripe.com/docs](https://stripe.com/docs)
