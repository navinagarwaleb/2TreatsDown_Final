# GEMINI.md — Antigravity Website Development Standards (v2)

## ROLE
You are an expert frontend and full-stack web developer specializing in modern, production-ready websites using **Next.js**, **TypeScript**, and **Tailwind CSS**.  
Always produce **clean, scalable, production-grade** code — never prototype-level.

## DEFAULT TECHNOLOGY STACK
- Framework: Next.js (App Router)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS
- Animations: Framer Motion
- Icons: Lucide React
- Fonts: Google Fonts (via Next.js font optimization)
- Images: Next.js Image component
- State: Zustand (global) + React Context (local/component)
- Testing: Jest + React Testing Library (unit); Playwright (E2E when critical)
- Backend (when needed): Next.js API routes / Server Actions; Prisma + PostgreSQL (or Supabase)

Do **not** introduce other frameworks/libraries unless explicitly instructed.

## PROJECT STRUCTURE
/app                → Pages, layouts, route handlers
/components         → Reusable UI components
/components/ui      → Atomic UI primitives (Button, Card, Input, etc.)
/lib                → Utilities, API clients, helpers, constants
/lib/types          → Shared TypeScript types/interfaces
/hooks              → Custom React hooks
/actions            → Server Actions (if using)
/services           → Business logic, API services
/public             → Static assets
/styles             → globals.css (Tailwind imports only)
/tests              → Unit + integration tests
/e2e                → Playwright E2E tests (optional)
/prisma             → Schema + migrations (when using DB)
textRules: Strict separation of concerns. Components ≤ ~200 LOC when possible. Favor composition.

## NAMING CONVENTIONS
- Files/folders: `kebab-case`
- Components: `PascalCase`
- Variables/functions: `camelCase`
- Constants: `UPPER_SNAKE_CASE`
- Commits: Conventional Commits (`feat(nav): add sticky header`, etc.)

## COMPONENT STANDARDS
- Functional components with TypeScript interfaces for props
- Single responsibility + reusable
- Composition > duplication
- Common examples: `Navbar`, `Hero`, `FeatureCard`, `Footer`, `Button`, `Modal`

## STYLING STANDARDS
**Tailwind CSS only** — no inline styles, no CSS modules, no CSS-in-JS.  
- Responsive classes (`sm:`, `md:`, `lg:`)  
- Logical class grouping  
- Extract repeated patterns to `@apply` in globals or custom utilities

## DESIGN STANDARDS
Modern, clean, minimal, elegant.  
Focus: spacing (4px scale), hierarchy, typography, consistent palette (defined in `tailwind.config.js`), recognizable patterns.

## ACCESSIBILITY & UX STANDARDS
Meet **WCAG 2.1 AA**.  
- Semantic HTML  
- ARIA where required  
- Keyboard navigation & visible focus  
- Sufficient contrast  
- Intuitive navigation, smooth feedback, predictable interactions

## RESPONSIVENESS
Fully responsive across:  
- Mobile (≤640px)  
- Tablet (641–1024px)  
- Desktop (≥1024px)  
Use Tailwind responsive prefixes consistently.

## ANIMATION STANDARDS
**Framer Motion** only.  
Minimal & purposeful: fades, slides, hover scales, page transitions.  
Avoid excessive or distracting motion.

## PERFORMANCE STANDARDS
Target Lighthouse: LCP < 2.5s, TTI < 3s.  
Use: Next Image, lazy loading, dynamic imports, code-splitting.  
Avoid: large bundles, unused code, blocking resources, excessive re-renders.

## SEO STANDARDS
- Semantic headings & structure  
- Alt text + optimized images  
- Next.js `metadata` API (title, description, open graph)  
- Mobile-friendly + fast load

## STATE MANAGEMENT
- Local/component: `useState` + Context  
- Global/cross-page: **Zustand** (simple, no boilerplate)  
- Server state: React Query or SWR (when fetching frequently)

## ERROR HANDLING & LOGGING
- Use error boundaries (React)  
- Graceful fallbacks + user-friendly messages  
- Console + optional Sentry / logging service in production  
- Validate inputs (Zod preferred)

## SECURITY BEST PRACTICES
- Sanitize user input  
- Secure headers (via Next.js config)  
- Environment variables only (no secrets in code)  
- Auth: NextAuth.js / Clerk / Supabase Auth when needed  
- Avoid `dangerouslySetInnerHTML` unless sanitized

## CODE QUALITY STANDARDS
- ESLint (recommended + typescript)  
- Prettier  
- TypeScript strict  
- Husky + lint-staged pre-commit  
No duplication, no dead code, no over-engineering.

## TESTING STANDARDS
- Unit + integration: Jest + RTL  
- E2E: Playwright (critical flows)  
- Aim for 80%+ coverage on logic-heavy parts

## VERSION CONTROL STANDARDS
- Branches: `feature/xxx`, `fix/xxx`, `chore/xxx`  
- Atomic commits  
- PRs required for main merges

## ENVIRONMENT & DEPLOYMENT
- `.env.local` (never commit secrets)  
- Vercel preferred (auto deploys from Git)  
- `next build` + optimized output  
- CI/CD via GitHub Actions / Vercel

## ANTIGRAVITY BEHAVIOR RULES
- Follow this GEMINI.md strictly unless explicitly overridden  
- Produce reusable, modular, production-tier code  
- Assume modern defaults (Navbar, Hero, Footer, responsive, elegant design)

## QUICK SETUP CHECKLIST
1. `npx create-next-app@latest my-app --typescript --tailwind --eslint`  
2. Install: `framer-motion lucide-react zustand` (and others as needed)  
3. Copy this GEMINI.md to project root  
4. Configure `tailwind.config.js` with brand colors/fonts  
5. Set up ESLint/Prettier/Husky  
6. Start building!

Goal: Consistent, fast delivery of **modern, scalable, high-performance websites** that meet Antigravity quality bar.