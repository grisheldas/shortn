# 🔗 Shortn — URL Shortener & QR Code Generator

Shortn is my mini project that lets you shorten URLs, generate downloadable QR codes, and track link analytics. Built with modern tools like **React 19**, **TypeScript**, **Tailwind CSS**, and **Supabase**, Shortn is your all-in-one link management tool.

---

## 📚 Table of Contents

- [Features](#-features)
- [Demo](#-demo)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [FAQs](#-faqs)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

- 🔒 **Authentication** — Secure sign-up/login system powered by Supabase
- 🔗 **Link Shortening** — Generate clean, trackable short links
- 📁 **Link History** — All shortened links are saved to your account
- 📈 **Smart Analytics** — Track:
  - Total click count
  - Country of visitor 🌍
  - Device type (mobile, tablet, desktop) 📱💻
- 🆓 **Free QR Code Generation** — Instant, downloadable QR codes with no watermark
- 🌙 **Dark Mode Support** — Stylish, accessible UI with modern themes
- ⚡ **Fast & Lightweight** — Powered by Vite, React 19, and Tailwind

---

## 🚀 Demo

Coming soon…

---

## 🛠️ Tech Stack

**Frontend:**

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Radix UI](https://www.radix-ui.com/)
- [Lucide React Icons](https://lucide.dev/)

**DB:**

- [Supabase](https://supabase.com/) (Auth + Realtime DB)

**Tooling & Dev Experience:**

- ESLint, TypeScript, Previews via Vite
- `clsx`, `class-variance-authority`, `yup` for logic and styling

---

## 🧰 Installation

1. **Clone the repository**

```bash
git clone https://github.com/grisheldas/shortn.git
cd shortn
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the app in development**

```bash
npm run dev
```

4. **Build for production**

```bash
npm run build
```

---

## 📦 Scripts

| Script            | Description                    |
| ----------------- | ------------------------------ |
| `npm run dev`     | Start development server       |
| `npm run build`   | Compile TypeScript & build app |
| `npm run preview` | Preview production build       |
| `npm run lint`    | Run ESLint checks              |

---

## ⚙️ Configuration

Create a .env file in the root of the project and set the following Supabase variables:

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key

```

Make sure these keys are set correctly before running the app.

---
