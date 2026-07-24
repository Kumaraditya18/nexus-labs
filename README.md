# 🌌 NEXUS LABS — Quantum Hardware Architecture

[![Live Production](https://img.shields.io/badge/Vercel-Live%20Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://nexus-labs-ten.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Kumaraditya18%2Fnexus--labs-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Kumaraditya18/nexus-labs)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.2-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon%20Cloud-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech)

---

## 🏛️ Executive Overview

**NEXUS LABS** is a luxury consumer technology hardware storefront engineered with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS**, and **PostgreSQL (Neon Cloud)**. 

The application blends GTA VI kinetic 3D scroll storytelling, spatial audio synthesis via Web Audio API, real-time logistics telemetry, AI natural language product search, and role-based user access controls.

- **🌐 Live Production Domain**: [https://nexus-labs-ten.vercel.app](https://nexus-labs-ten.vercel.app)
- **👑 Primary Owner**: `kumaraditya1814@gmail.com`

---

## 🚀 Key Architectural Features

### 1. 🎬 GTA VI Style Kinetic 3D Scroll Stage (`ScrollStorytelling.tsx`)
- Viewport stage starting at pixel 0 with perspective transforms (`rotateX`, `rotateY`, `scale`, `translateY`).
- Dynamic background radial lighting and smooth state transitions.

### 2. 🗄️ Production Neon PostgreSQL Cloud Integration (`src/lib/db.ts`)
- **Automated Schema & Seeding**: Tables `users`, `products`, and `orders` automatically initialize on startup.
- Pre-seeded with 14 reference hardware devices (Pulse ANC, Vision 32" OLED, Keystone Keyboard, Book Pro 16).
- Connected to Neon cloud database: `ep-jolly-dew-ax17o252-pooler.c-4.us-east-2.aws.neon.tech`.

### 3. 👑 User Access Control & Admin Privilege Delegation (`/admin`)
- Primary Admin (`kumaraditya1814@gmail.com`) receives direct access to the **Executive Command Center**.
- **Admin Promotion System**: Features a user table allowing the primary owner to promote any registered account to administrator in real time.

### 4. 🔍 AI Natural Language Spotlight Search (`Cmd + K`)
- Instant spotlight dialog triggered via header pill or `Cmd + K` / `Ctrl + K`.
- Real-time client-side query matching against hardware names, categories, and engineering specs.

### 5. 📦 Dynamic Logistics Telemetry & Invoices (`/orders` & `/orders/[id]`)
- Step-by-step carrier progress timeline (DHL Express Priority & FedEx Priority Global).
- PDF Digital Invoice receipt download trigger.

### 6. 📱 100% Mobile Responsive Architecture (`Navbar.tsx`)
- Slide-down mobile navigation drawer (`Menu` / `X` toggles).
- Minimalist top header bar with zero extra whitespace padding on smartphones.

---

## 🛠️ Tech Stack & Dependencies

- **Framework**: [Next.js 16 (App Router & Turbopack)](https://nextjs.org)
- **Library**: [React 19](https://react.dev)
- **Database**: [PostgreSQL 18 (Neon Cloud)](https://neon.tech)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) & Vanilla CSS Glassmorphism
- **Animations**: [Framer Motion](https://www.framer-motion.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Confetti & FX**: Canvas Confetti & Web Audio API Synthesizer

---

## 🔑 Environment Setup

Create a `.env.local` file in the root directory:

```env
# Production Neon PostgreSQL Database Connection
DATABASE_URL="postgresql://neondb_owner:npg_bT7AMD6wQRvd@ep-jolly-dew-ax17o252-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require"

# Next.js Environment Mode
NODE_ENV="production"
```

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Kumaraditya18/nexus-labs.git
   cd nexus-labs
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Launch dev server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Verify production build**:
   ```bash
   npx eslint src/ --quiet && npm run build
   ```

---

## 🚀 Deploying to Vercel

1. Import your GitHub repository: `Kumaraditya18/nexus-labs`.
2. Set Environment Variable:
   - `DATABASE_URL`: `postgresql://neondb_owner:npg_bT7AMD6wQRvd@ep-jolly-dew-ax17o252-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require`
3. Click **Deploy**.

---

## 📜 License

NEXUS LABS © 2026. All rights reserved. Forged for quantum hardware architecture.
