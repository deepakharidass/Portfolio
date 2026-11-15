# Deepak H — Minimalist Monochrome Editorial Portfolio

A production-ready, award-quality personal portfolio website for Computer Science Engineering graduate **Deepak H**, expressed in a strict **Minimalist Monochrome** design system inspired by architectural monographs, Swiss typography, and high-fashion broadsheets.

---

## 🏛️ Design System: Minimalist Monochrome

1. **Pure Binary Palette:** Absolute `#000000` (black) and `#FFFFFF` (white), with functional neutral greys (`#525252`, `#E5E5E5`) strictly for metadata and hairline dividers. Color inversion replaces accent colors for focus and emphasis.
2. **Sharp Rectilinear Geometry:** `border-radius: 0px` globally across every button, card, input, and modal.
3. **Planar Depth (Zero Shadows):** `box-shadow: none` globally. Spatial hierarchy is articulated strictly via line weight (hairline 1px, medium 2px, thick 4px, anchor 8px), contrast inversion, and generous negative space.
4. **Editorial Typography Trio:**
   - **Display / Headlines:** *Playfair Display* (dramatic scale, italic emphasis)
   - **Body Prose:** *Source Serif 4* (bookmaker rhythm and readability)
   - **Labels / Telemetry:** *JetBrains Mono* (dates, indexes, metrics, code)
5. **Layered Textures:** Subtle paper noise SVG, hairline horizontal lines, 40px architectural grids, and diagonal timeline textures that preserve tactile authenticity in both light and dark themes.

---

## 🚀 Where Can You Build and Host This for Free?

You can build, customize, and deploy this portfolio completely **for free** on these top platforms:

1. **Google AI Studio (Current Environment):**
   - **Cost:** Free.
   - **Capabilities:** Interactive real-time coding, live preview container, automatic backend environment variable injection (`GEMINI_API_KEY`), and instant deployment.
2. **Vercel (Recommended for Next.js / React Web Deployments):**
   - **Cost:** 100% Free Hobby Tier.
   - **Steps:** Push this repository to GitHub, go to [vercel.com](https://vercel.com), click "Import Project", and click Deploy. Free automated SSL, custom domain support, and lightning-fast global CDN edge network.
3. **GitHub Pages (Free Static Hosting):**
   - **Cost:** 100% Free.
   - **Steps:** Run `npm run build`, push `dist/` to the `gh-pages` branch or configure GitHub Actions with `peaceiris/actions-gh-pages`.
4. **Render or Railway (Free Full-Stack Server Tier):**
   - **Cost:** Free tier available.
   - **Capabilities:** Runs `server.ts` Node.js express backend with webhooks, rate limiting, and Gemini API proxy routes.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS v4 + Motion
- **Icons:** `lucide-react` (size 20/24, thin `strokeWidth={1.5}`, `currentColor`)
- **Backend:** Express full-stack proxy running Gemini AI concierge (`@google/genai`) and contact form rate-limiting dispatch
- **Data Engine:** Centralized typed JSON files under `src/data/` for rapid maintenance without touching JSX

## 🧭 Page Navigation

The site uses React Router with separate pages for `/` (About), `/education`, `/domains`, `/projects`, and `/contact`. The `/about` URL redirects to `/`, and the legacy `/resume` URL redirects to `/education`. The About page combines the hero introduction and profile section. The Education page combines academic history with resume details and the resume download. Domain cards open `/domains/frontend`, `/domains/pm`, `/domains/uiux`, or `/domains/analytics`. The navbar and footer remain shared across routes.

The Express production server and Vite development server provide SPA route fallback. Static deployments include a Netlify `_redirects` rule and a GitHub Pages `404.html` redirect so direct page refreshes can return to the app.

---

## 📁 Repository Structure

```
├── .env.example                  # Environment configuration template
├── index.html                    # HTML entry point with Google Fonts & SEO metadata
├── metadata.json                 # AI Studio capability and applet metadata
├── package.json                  # Dependencies and full-stack run scripts
├── server.ts                     # Full-stack Express server (Vite dev & static prod)
├── tsconfig.json                 # Strict TypeScript configuration
├── vite.config.ts                # Vite build & Tailwind CSS plugin configuration
└── src/
    ├── App.tsx                   # Shared application layout and React Router routes
    ├── main.tsx                  # React DOM mount point
    ├── index.css                 # Monochrome tokens, @custom-variant dark, textures
    ├── types/                    # Typed data schemas (Project, Skill, Milestone, Chat)
    ├── data/
    │   ├── profile.json          # Personal bio, creed, contacts, social URLs
    │   ├── skills.json           # Detailed skill items with proficiencies and years
    │   ├── projects.json         # 6 production-ready projects across all 3 domains
    │   ├── education.json        # Academic pedigree, milestones, and honors
    │   └── chatbotData.json      # Grounded RAG knowledge base for the AI agent
    ├── context/
    │   └── ThemeContext.tsx      # Binary light/dark mode provider (no flash)
    ├── hooks/
    │   ├── useTypingEffect.ts    # Title typewriter animation with reduced-motion support
    │   ├── useCounter.ts         # Stepped number counter for stats band
    │   └── useScrollSpy.ts       # Active nav section detection
    ├── components/
    │   ├── layout/
    │   │   ├── Navbar.tsx        # Sticky header with active indicator & mobile drawer
    │   │   ├── Footer.tsx        # Inverted monochrome footer with vertical line texture
    │   │   ├── ThemeToggle.tsx   # Sharp bordered square mode switcher
    │   │   ├── ScrollProgress.tsx# 3px top rule scroll indicator
    │   │   ├── BackToTop.tsx     # Bordered square quick-scroll button
    │   │   └── LoadingScreen.tsx # Fast non-blocking editorial monogram screen
    │   ├── sections/
    │   │   ├── HeroSection.tsx   # Oversized display typography & specimen frame
    │   │   ├── AboutSection.tsx  # Boxed drop cap & editorial pull quote
    │   │   ├── EducationSection.tsx # Linear vertical timeline with square nodes
    │   │   ├── DomainsSection.tsx   # Tri-pillar capability cards (invert on hover)
    │   │   ├── StatsSection.tsx     # Inverted monochrome counter band
    │   │   ├── ResumeSection.tsx    # A4 specification breakdown & progress quantifiers
    │   │   ├── FeaturedProjectsSection.tsx # Filter chips, search bar, & case modal
    │   │   └── ContactSection.tsx   # Strict bottom-border inputs & spam prevention
    │   ├── domain/
    │   │   └── DomainView.tsx    # Deep dive pages for the operational domains
    │   ├── pages/
    │   │   └── NotFoundPage.tsx  # Unknown-route page
    │   ├── chatbot/
    │   │   └── ChatWidget.tsx    # Floating bottom-right "ASK AI" concierge
    │   └── ui/
    │       ├── Button.tsx        # Sharp primary, outline, and ghost buttons
    │       ├── SectionRule.tsx   # 4px monolithic dividers
    │       ├── SectionHeading.tsx# Editorial section markers
    │       ├── SkillProgressBar.tsx # Stepped animated progress bars
    │       └── PullQuote.tsx     # Typographic pull quote with large quotation mark
    └── assets/
        └── resume/
            └── Deepak_Haridass_Resume.pdf
```

---

## ⚡ Quickstart & Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Fill in your `GEMINI_API_KEY` (or configure it in AI Studio Secrets).
To enable contact-form delivery:
1. Create a Resend account and verify a domain you control in its Domains dashboard. Complete the DNS verification records Resend provides.
2. Create an API key in Resend.
3. Copy `.env.example` to `.env` and set:
   - `RESEND_API_KEY` to the new Resend API key.
   - `CONTACT_TO_EMAIL` to the inbox that should receive contact messages (currently set to `deepakharidass1@gmail.com` in the example).
   - `CONTACT_FROM_EMAIL` to a sender address on the domain verified with Resend, for example `Portfolio Contact <noreply@your-verified-domain.com>`.
4. Restart `npm run dev`, submit a test message, and check the server console for “Contact email accepted by Resend”. The email includes the visitor’s name, email, subject, message, and UTC send time; replies use the visitor email as Reply-To.

The app uses the existing Express endpoint and Resend because this project already has a Node backend and Resend integration. `.env` is ignored by Git. The WhatsApp number can be changed in `src/data/profile.json` (`whatsappNumber`, digits only with country code).

### 3. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the portfolio.
In development, saved changes to the source files and `src/data/` JSON files appear through Vite's live reload. Production changes require a new build and deployment.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## ✏️ How to Customize Your Content

All personal data is completely decoupled into `src/data/`:
- **Change Name, Bio, or Social Links:** Edit `src/data/profile.json`.
- **Add or Update Projects:** Edit `src/data/projects.json`.
- **Modify Skills & Proficiencies:** Edit `src/data/skills.json`.
- **Update Education & Honors:** Edit `src/data/education.json`.
- **Update AI Chatbot Knowledge:** Edit `src/data/chatbotData.json`.
- **Replace Resume PDF:** Overwrite `/public/assets/resume/Deepak_Haridass_Resume.pdf`.

---

## ✅ Design QA Checklist

- [x] **Strict Monochrome:** Zero accent colors, zero gradients, zero pastel buttons.
- [x] **Zero Border Radius:** `border-radius: 0px` globally enforced via CSS.
- [x] **Zero Shadows:** No blur, no drop shadows, no glassmorphism.
- [x] **Monolithic Dividers:** 4px structural rules separating all major sections.
- [x] **Inverted Stats Band:** High-contrast solid black band with white typography and vertical lines.
- [x] **Accessible Focus States:** Visible `focus-visible:outline` with 3px offset.
- [x] **Reduced Motion:** All counters, typing animations, and loaders respect `prefers-reduced-motion`.
- [x] **Dual Theme Parity:** Light and dark themes maintain AAA contrast and inverse textures.
