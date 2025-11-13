# API Documentation

## Authentication

All API routes (except auth routes) require authentication. Include the session cookie in your requests.

### Register User
```
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:** `201 Created`
```json
{
  "message": "User created successfully",
  "userId": "clxxx..."
}
```

---

## Campaigns

### List Campaigns
```
GET /api/campaigns
```

**Response:** `200 OK`
```json
[
  {
    "id": "clxxx...",
    "name": "Summer Sale",
    "type": "EMAIL",
    "status": "COMPLETED",
    "createdAt": "2024-01-15T10:00:00Z",
    "_count": {
      "campaignContacts": 150
    }
  }
]
```

### Create Campaign
```
POST /api/campaigns
```

**Request Body:**
```json
{
  "name": "Spring Newsletter",
  "type": "EMAIL",
  "subject": "Check out our spring collection!",
  "content": "Hello! Here's what's new...",
  "contactIds": ["clxxx...", "clyyy..."],
  "scheduledAt": "2024-03-01T09:00:00Z"
}
```

**Campaign Types:**
- `EMAIL` - Email campaign
- `SMS` - SMS campaign
- `VOICE` - Voice/IVR campaign

**Campaign Status:**
- `DRAFT` - Not yet sent
- `SCHEDULED` - Scheduled for future
- `ACTIVE` - Currently sending
- `COMPLETED` - Finished sending
- `PAUSED` - Temporarily stopped

**Response:** `201 Created`
```json
{
  "id": "clxxx...",
  "name": "Spring Newsletter",
  "type": "EMAIL",
  "status": "SCHEDULED",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

## Contacts

### List Contacts
```
GET /api/contacts?search=john&tag=customer
```

**Query Parameters:**
- `search` (optional): Search by name, email, phone, or company
- `tag` (optional): Filter by tag

**Response:** `200 OK`
```json
[
  {
    "id": "clxxx...",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "company": "Acme Inc",
    "tags": ["customer", "vip"],
    "createdAt": "2024-01-10T10:00:00Z"
  }
]
```

### Create Contact
```
POST /api/contacts
```

**Request Body:**
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "phone": "+1987654321",
  "company": "Tech Corp",
  "tags": ["lead", "marketing"],
  "customFields": {
    "industry": "Technology",
    "employees": "50-100"
  }
}
```

**Response:** `201 Created`
```json
{
  "id": "clxxx...",
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@example.com",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

## Helpdesk / Tickets

### List Tickets
```
GET /api/tickets
```

**Response:** `200 OK`
```json
[
  {
    "id": "clxxx...",
    "subject": "Need help with campaign",
    "description": "How do I schedule a campaign?",
    "status": "open",
    "priority": "medium",
    "createdAt": "2024-01-15T10:00:00Z",
    "responses": [
      {
        "id": "clyyy...",
        "content": "You can schedule a campaign by...",
        "isAI": true,
        "createdAt": "2024-01-15T10:05:00Z"
      }
    ]
  }
]
```

### Create Ticket
```
POST /api/tickets
```

**Request Body:**
```json
{
  "subject": "Question about pricing",
  "description": "What's included in the Professional plan?",
  "priority": "low",
  "category": "billing"
}
```

**Priority Levels:**
- `low` - Low priority
- `medium` - Medium priority
- `high` - High priority

**Response:** `201 Created`
```json
{
  "id": "clxxx...",
  "subject": "Question about pricing",
  "status": "open",
  "priority": "low",
  "createdAt": "2024-01-15T10:00:00Z"
}
```

---

## AI Chatbot

### Send Message to Chatbot
```
POST /api/chatbot
```

**Request Body:**
```json
{
  "message": "How do I create an SMS campaign?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Hello"
    },
    {
      "role": "assistant",
      "content": "Hi! How can I help you today?"
    }
  ]
}
```

**Response:** `200 OK`
```json
{
  "response": "To create an SMS campaign, go to the Campaigns page...",
  "timestamp": "2024-01-15T10:00:00Z"
}
```

---

## Stripe Integration

### Create Checkout Session
```
GET /api/stripe/checkout?plan=PROFESSIONAL
```

**Query Parameters:**
- `plan`: One of `STARTER`, `PROFESSIONAL`, or `ENTERPRISE`

**Response:** Redirects to Stripe Checkout

### Webhook Handler
```
POST /api/stripe/webhook
```

Handles Stripe webhook events:
- `checkout.session.completed` - Subscription created
- `invoice.payment_succeeded` - Payment successful
- `customer.subscription.deleted` - Subscription cancelled

---

## Error Responses

All API routes return consistent error responses:

**400 Bad Request**
```json
{
  "error": "Invalid email address"
}
```

**401 Unauthorized**
```json
{
  "error": "Unauthorized"
}
```

**500 Internal Server Error**
```json
{
  "error": "Internal server error"
}
```

---

## Rate Limiting

API routes are rate-limited to prevent abuse:
- Authentication: 5 requests per minute
- Campaign creation: 10 requests per minute
- Chatbot: 20 requests per minute
- All other routes: 60 requests per minute

---

## Webhooks

### Twilio SMS Webhook
```
POST /api/twilio/sms
```

Receives incoming SMS messages from Twilio.

### Twilio Voice Webhook
```
POST /api/twilio/voice
```

Handles incoming voice calls and IVR flow.

---

## Best Practices

1. **Always validate input** - Use Zod schemas for validation
2. **Handle errors gracefully** - Return appropriate HTTP status codes
3. **Use pagination** - For list endpoints with many results
4. **Cache responses** - Where appropriate to reduce database load
5. **Log important events** - For debugging and monitoring
6. **Rate limit requests** - Protect against abuse

---

## Examples

### cURL Examples

**Register a user:**
```bash
curl -X POST https://your-domain.vercel.app/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

**Create a campaign:**
```bash
curl -X POST https://your-domain.vercel.app/api/campaigns \
  -H "Content-Type: application/json" \
  -H "Cookie: next-auth.session-token=..." \
  -d '{
    "name": "Newsletter",
    "type": "EMAIL",
    "subject": "Weekly Update",
    "content": "Hello!",
    "contactIds": ["clxxx..."]
  }'
```

### JavaScript/TypeScript Examples

**Using fetch:**
```typescript
// Create contact
const response = await fetch('/api/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane@example.com',
  }),
});

const contact = await response.json();
```

**Chat with AI:**
```typescript
const response = await fetch('/api/chatbot', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'How do I export my contacts?',
    conversationHistory: [],
  }),
});

const { response: aiResponse } = await response.json();
```
