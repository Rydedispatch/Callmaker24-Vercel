# Contributing to Callmaker24

Thank you for your interest in contributing to Callmaker24! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Documentation](#documentation)

## Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome diverse perspectives
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards others

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Git installed
- PostgreSQL database access
- Required API keys (see .env.example)

### Setup Development Environment

1. **Fork the repository**
   ```bash
   # Click "Fork" button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Callmaker24-Vercel.git
   cd Callmaker24-Vercel
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/Rydedispatch/Callmaker24-Vercel.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your credentials
   ```

6. **Initialize database**
   ```bash
   npm run prisma:push
   ```

7. **Run development server**
   ```bash
   npm run dev
   ```

## Development Process

### Branch Naming Convention

- `feature/` - New features
- `bugfix/` - Bug fixes
- `hotfix/` - Critical fixes for production
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `test/` - Adding or updating tests

Examples:
- `feature/add-campaign-templates`
- `bugfix/fix-login-redirect`
- `docs/update-api-documentation`

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(campaigns): add email template system

Implement a template system for email campaigns with variables support.

Closes #123
```

```
fix(auth): resolve session expiration issue

Fixed a bug where sessions were expiring prematurely
due to incorrect token refresh logic.
```

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow coding standards
   - Add tests for new features
   - Update documentation

3. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature"
   ```

5. **Keep your branch updated**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] Self-review completed
- [ ] Branch is up-to-date with main

### Submitting a Pull Request

1. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "New Pull Request"
   - Select your branch
   - Fill out the PR template

2. **PR Title Format**
   ```
   [Type] Brief description

   Examples:
   [Feature] Add campaign templates
   [Fix] Resolve login redirect issue
   [Docs] Update API documentation
   ```

3. **PR Description Should Include**
   - What changed and why
   - Related issue numbers
   - Testing instructions
   - Screenshots (for UI changes)
   - Breaking changes (if any)

### Code Review Process

1. Automated checks run (linting, building)
2. Reviewers provide feedback
3. Address feedback and update PR
4. Once approved, maintainers will merge

### After Merge

1. Delete your feature branch
   ```bash
   git branch -d feature/your-feature-name
   git push origin --delete feature/your-feature-name
   ```

2. Update your local main
   ```bash
   git checkout main
   git pull upstream main
   ```

## Coding Standards

### TypeScript

- Use TypeScript for all files
- Enable strict mode
- Avoid `any` type (use `unknown` if needed)
- Define interfaces for all data structures
- Use type inference where appropriate

```typescript
// Good
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): User {
  // ...
}

// Avoid
function getUser(id: any): any {
  // ...
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use meaningful component names
- Implement proper prop types
- Add JSDoc comments for complex components

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {label}
    </button>
  );
}
```

### API Routes

- Use Zod for input validation
- Handle errors properly
- Return consistent response format
- Add rate limiting for sensitive endpoints
- Include proper TypeScript types

```typescript
// Good
const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = schema.parse(body);
    // Process data...
    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### Database Queries

- Use Prisma for all database operations
- Implement proper error handling
- Use transactions for related operations
- Add indexes for frequently queried fields
- Avoid N+1 queries

```typescript
// Good
const users = await prisma.user.findMany({
  where: { active: true },
  include: {
    subscription: true,
  },
  take: 10,
});

// Avoid
const users = await prisma.user.findMany();
for (const user of users) {
  const subscription = await prisma.subscription.findUnique({
    where: { userId: user.id },
  });
}
```

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first approach
- Use consistent spacing (4px grid)
- Implement responsive design
- Use semantic color names

```typescript
// Good
<div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
    Submit
  </button>
</div>
```

## Testing Guidelines

### Unit Tests

Test individual functions and components:

```typescript
describe('formatCurrency', () => {
  it('formats USD correctly', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('handles zero', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
});
```

### Integration Tests

Test API routes and database operations:

```typescript
describe('POST /api/contacts', () => {
  it('creates a new contact', async () => {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      body: JSON.stringify({
        firstName: 'John',
        email: 'john@example.com',
      }),
    });
    
    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data.firstName).toBe('John');
  });
});
```

### E2E Tests

Test complete user workflows (to be implemented).

## Documentation

### Code Documentation

- Add JSDoc comments for public APIs
- Document complex logic
- Include usage examples
- Document edge cases

```typescript
/**
 * Sends an SMS campaign to selected contacts
 * 
 * @param campaignId - The unique identifier of the campaign
 * @param contacts - Array of contact IDs to send to
 * @returns Promise that resolves when all messages are sent
 * 
 * @example
 * ```typescript
 * await sendSMSCampaign('campaign-123', ['contact-1', 'contact-2']);
 * ```
 */
async function sendSMSCampaign(
  campaignId: string,
  contacts: string[]
): Promise<void> {
  // Implementation...
}
```

### API Documentation

Update `docs/API.md` when:
- Adding new endpoints
- Modifying request/response format
- Changing authentication requirements
- Adding query parameters

### README Updates

Keep README.md current with:
- New features
- Setup changes
- Dependency updates
- Usage examples

## Questions?

- Open an issue for bugs or feature requests
- Use discussions for questions
- Join our community chat (if available)
- Email: support@callmaker24.com

## License

By contributing, you agree that your contributions will be licensed under the ISC License.

## Thank You!

Your contributions make Callmaker24 better for everyone. We appreciate your time and effort!
