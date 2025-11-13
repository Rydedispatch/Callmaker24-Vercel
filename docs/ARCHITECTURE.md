# Architecture Overview

## System Architecture

Callmaker24 is a modern full-stack application built with Next.js 14+ and follows a serverless architecture optimized for Vercel deployment.

### High-Level Architecture

```
┌─────────────────┐
│   Client/Users  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────┐
│   Next.js Frontend      │
│   (React Components)    │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│   Next.js API Routes    │
│   (Server Functions)    │
└────────┬────────────────┘
         │
    ┌────┴────┬────────┬────────┬──────────┐
    ▼         ▼        ▼        ▼          ▼
┌────────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐
│Database│ │Stripe│ │OpenAI│ │Twilio│ │NextAuth  │
│(Prisma)│ │      │ │      │ │      │ │          │
└────────┘ └──────┘ └──────┘ └──────┘ └──────────┘
```

### Tech Stack

#### Frontend
- **Framework:** Next.js 14+ with App Router
- **UI Library:** React 18+
- **Styling:** Tailwind CSS with custom design system
- **Icons:** Lucide React
- **Type Safety:** TypeScript (strict mode)

#### Backend
- **API:** Next.js API Routes (serverless functions)
- **Authentication:** NextAuth.js v5
- **Database:** PostgreSQL with Prisma ORM
- **Validation:** Zod schemas
- **Payment:** Stripe SDK
- **AI:** OpenAI GPT-4
- **Communication:** Twilio (SMS, Voice)

#### Infrastructure
- **Hosting:** Vercel (Edge Network)
- **Database:** PostgreSQL (Vercel Postgres / Supabase / Railway)
- **CI/CD:** GitHub Actions + Vercel
- **Monitoring:** Vercel Analytics

## Directory Structure

```
callmaker24-vercel/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions CI/CD
├── docs/
│   ├── API.md                 # API documentation
│   ├── ARCHITECTURE.md        # This file
│   └── DEPLOYMENT.md          # Deployment guide
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Static assets
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # Authentication endpoints
│   │   │   ├── campaigns/    # Campaign management
│   │   │   ├── contacts/     # Contact management
│   │   │   ├── tickets/      # Helpdesk tickets
│   │   │   ├── chatbot/      # AI chatbot
│   │   │   └── stripe/       # Payment processing
│   │   ├── dashboard/        # Dashboard pages
│   │   │   ├── campaigns/
│   │   │   ├── contacts/
│   │   │   ├── analytics/
│   │   │   ├── helpdesk/
│   │   │   └── settings/
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   ├── pricing/          # Pricing page
│   │   └── layout.tsx        # Root layout
│   ├── components/           # React components
│   │   └── dashboard/        # Dashboard components
│   ├── lib/                  # Utilities & configs
│   │   ├── auth.ts          # NextAuth config
│   │   ├── prisma.ts        # Prisma client
│   │   ├── stripe.ts        # Stripe config
│   │   ├── twilio.ts        # Twilio client
│   │   ├── openai.ts        # OpenAI client
│   │   └── utils.ts         # Helper functions
│   └── styles/
│       └── globals.css       # Global styles
├── .env.example              # Environment template
├── next.config.ts            # Next.js config
├── tailwind.config.ts        # Tailwind config
├── tsconfig.json             # TypeScript config
├── vercel.json               # Vercel config
└── package.json              # Dependencies
```

## Data Model

### Core Entities

#### User
- Primary entity for authentication and authorization
- Roles: ADMIN, MANAGER, AGENT, USER
- Relationships: campaigns, contacts, tickets, messages, calls, subscription

#### Contact
- Customer/lead information
- Custom fields support (JSON)
- Tag-based organization
- Relationships: campaigns, messages, calls

#### Campaign
- Marketing campaigns (EMAIL, SMS, VOICE)
- Status tracking (DRAFT, SCHEDULED, ACTIVE, PAUSED, COMPLETED)
- Relationships: contacts (through CampaignContact), messages, calls

#### Ticket
- Support ticket management
- AI-powered responses
- Priority levels: low, medium, high
- Relationships: responses

#### Subscription
- User subscription plans
- Stripe integration
- Plans: FREE, STARTER, PROFESSIONAL, ENTERPRISE

### Data Flow

#### Campaign Execution
```
1. User creates campaign
   ↓
2. Select contacts
   ↓
3. Schedule or send immediately
   ↓
4. API processes campaign
   ↓
5. Twilio sends messages/calls
   ↓
6. Track delivery status
   ↓
7. Update analytics
```

#### AI Chatbot Flow
```
1. User sends message
   ↓
2. Build conversation context
   ↓
3. Send to OpenAI GPT-4
   ↓
4. Receive AI response
   ↓
5. Return to user
```

#### Payment Flow
```
1. User selects plan
   ↓
2. Create Stripe checkout session
   ↓
3. Redirect to Stripe
   ↓
4. User completes payment
   ↓
5. Webhook updates subscription
   ↓
6. User gains access to features
```

## API Design

### RESTful Principles
- **GET**: Retrieve resources
- **POST**: Create resources
- **PUT/PATCH**: Update resources (to be implemented)
- **DELETE**: Remove resources (to be implemented)

### Response Format
```typescript
// Success
{
  data: T,
  message?: string
}

// Error
{
  error: string,
  code?: string
}
```

### Authentication
- Session-based with NextAuth.js
- JWT tokens for API routes
- Role-based access control

### Rate Limiting
- Implemented at API route level
- Different limits per endpoint
- IP-based throttling

## Security

### Authentication & Authorization
- Passwords hashed with bcrypt (10 rounds)
- Session tokens stored securely
- Role-based access control
- CSRF protection

### Data Protection
- Environment variables for secrets
- No sensitive data in client code
- Database connection pooling
- SQL injection protection (Prisma)

### API Security
- Input validation (Zod)
- Output sanitization
- Rate limiting
- CORS configuration

### Third-Party Security
- Webhook signature verification (Stripe, Twilio)
- API key rotation support
- Secure credential storage

## Performance Optimization

### Frontend
- Server-side rendering (SSR)
- Static generation where possible
- Code splitting
- Image optimization
- Lazy loading

### Backend
- Database connection pooling
- Query optimization
- Caching strategies
- Serverless function optimization

### Database
- Indexed queries
- Efficient relationships
- Connection pooling
- Query result caching

## Scalability

### Horizontal Scaling
- Serverless functions (auto-scaling)
- CDN for static assets
- Database read replicas
- Distributed caching

### Vertical Scaling
- Database performance tuning
- Query optimization
- Connection pooling
- Resource monitoring

## Monitoring & Observability

### Metrics
- Vercel Analytics for Core Web Vitals
- Database performance metrics
- API response times
- Error rates

### Logging
- Console logging in development
- Structured logging in production
- Error tracking (Sentry recommended)
- Audit logs for sensitive operations

### Alerting
- Webhook failures
- Database connection issues
- High error rates
- Performance degradation

## Testing Strategy

### Unit Tests
- Individual functions
- Utility methods
- API route logic

### Integration Tests
- API endpoint testing
- Database operations
- Third-party integrations

### E2E Tests
- User workflows
- Critical paths
- Payment flows

## Deployment Architecture

### Vercel Deployment
```
GitHub Push
    ↓
GitHub Actions (CI/CD)
    ↓
Build & Test
    ↓
Vercel Preview (PRs)
    ↓
Vercel Production (main branch)
```

### Environment Variables
- Development: `.env.local`
- Preview: Vercel project settings
- Production: Vercel project settings

### Database Migrations
- Prisma migrations
- Run via CI/CD or manually
- Rollback support

## Future Enhancements

### Phase 1 (Current)
- ✅ Core features
- ✅ Basic integrations
- ✅ Authentication
- ✅ Payment processing

### Phase 2 (Planned)
- [ ] Advanced IVR flows
- [ ] Email templates
- [ ] Campaign A/B testing
- [ ] Advanced analytics

### Phase 3 (Planned)
- [ ] White-label options
- [ ] Multi-tenant support
- [ ] Advanced AI features
- [ ] Mobile app

### Phase 4 (Planned)
- [ ] Marketplace integrations
- [ ] Custom workflow builder
- [ ] API access for customers
- [ ] Advanced reporting

## Best Practices

### Code Quality
- TypeScript strict mode
- ESLint enforcement
- Consistent formatting
- Code reviews

### Development
- Feature branches
- Pull request workflow
- Automated testing
- Documentation updates

### Deployment
- Automated deployments
- Preview environments
- Rollback capability
- Zero-downtime releases

## Support & Maintenance

### Regular Updates
- Dependency updates
- Security patches
- Feature enhancements
- Bug fixes

### Monitoring
- Performance monitoring
- Error tracking
- User analytics
- System health checks

### Backup & Recovery
- Database backups
- Point-in-time recovery
- Disaster recovery plan
- Data export capabilities
