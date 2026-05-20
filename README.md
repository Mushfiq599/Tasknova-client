# TaskNova — Micro Task & Earning Platform

A modern full-stack micro-tasking platform where **Workers** complete tasks to earn coins and **Buyers** post tasks to get real results. Built with Next.js, Firebase, and MongoDB.

---

## 🌐 Live Site
👉 **[https://tasknova.vercel.app](https://tasknova.vercel.app)**

## 🔐 Admin Credentials
- **Email:** admin@tasknova.com
- **Password:** Admin@123

---

## ✨ Features

- 🌗 **Dark & Light Theme** — toggle between dark neon fintech and sky blue light mode, saved to localStorage
- 👤 **Role-Based Dashboards** — separate dashboards for Worker, Buyer and Admin with protected routes
- 🔐 **Firebase Authentication** — email/password and Google Sign-In with JWT token storage
- 💰 **Coin Economy** — buyers purchase coins ($1 = 10 coins), workers earn and withdraw (20 coins = $1)
- 📋 **Task Management** — buyers create, edit and delete tasks; workers browse and submit
- ✅ **Submission Review** — buyers approve or reject worker submissions with instant coin transfer
- 🔔 **Notification System** — real-time notifications for approvals, rejections and withdrawals
- 📊 **Admin Panel** — manage users, tasks, roles and approve withdrawal requests
- 💳 **Coin Purchase** — Stripe-ready coin purchase with 4 pricing packages
- 🏧 **Withdrawal System** — workers request withdrawals via Bkash, Nagad, Rocket or Stripe
- 📱 **Fully Responsive** — optimized for mobile, tablet and desktop including dashboard
- 🎞️ **Premium Animations** — scroll reveal, card hover lift, floating hero, auto-marquee testimonials
- 🔍 **Task Search & Filter** — search by title or buyer name with real-time filtering
- 📄 **Paginated Submissions** — worker submissions table with full pagination

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS v4 + Custom CSS |
| Auth | Firebase Authentication |
| HTTP Client | Axios with JWT interceptors |
| State | React Context + TanStack Query |
| Animations | CSS Intersection Observer |
| Icons | React Icons |
| Notifications | React Hot Toast |

---

## 📁 Project Structure

```
client/
├── app/
│   ├── layout.js               # Root layout with providers
│   ├── page.js                 # Homepage
│   ├── login/page.js
│   ├── register/page.js
│   └── dashboard/
│       ├── layout.js
│       ├── worker-home/
│       ├── task-list/
│       ├── my-submissions/
│       ├── withdrawals/
│       ├── buyer-home/
│       ├── add-task/
│       ├── my-tasks/
│       ├── purchase-coin/
│       ├── payment-history/
│       ├── admin-home/
│       ├── manage-users/
│       └── manage-tasks/
├── components/
│   ├── shared/                 # Navbar, Footer, Logo
│   ├── ui/                     # Button, Badge, Modal, StatCard
│   ├── dashboard/              # Sidebar, Header, Notifications
│   │   ├── worker/
│   │   ├── buyer/
│   │   └── admin/
│   └── home/                   # Hero, Stats, HowItWorks, etc.
├── context/                    # AuthContext, ThemeContext
├── hooks/                      # useAuth, useReveal
├── api/                        # axiosInstance
├── config/                     # firebase.js
└── utils/                      # helpers.js
```

---

## 🚀 Run Locally

```bash
# Clone the repo
git clone https://github.com/yourusername/tasknova-client

# Install dependencies
cd client
npm install

# Add environment variables
cp .env.example .env.local
# Fill in Firebase and API keys

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Environment Variables

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

---

## 🔗 Related Repositories
- **Server:** [https://github.com/yourusername/tasknova-server](https://github.com/yourusername/tasknova-server)