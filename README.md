# Blinkit — 1:1 UI Reverse Engineering ⚡

A pixel-perfect, 1:1 user interface reproduction of [Blinkit](https://blinkit.com/) (India's last-minute app) built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Lucide React**.

This project accurately reverse-engineers Blinkit's visual language, typography, quick-commerce UX patterns, dark-store delivery mechanics, and customer journey.

---

## 🌟 Key Features

### 1. 1:1 Header & Location Mechanics
- **Brand Wordmark:** Canonical Blinkit lowercase logo (`blink` in yellow, `it` in green).
- **Location Selector:** Live delivery estimate (`Delivery in 8 MINS`) with area selector (`B-Block, Sector 49 - Gurugram ▾`). Clicking triggers the interactive location selector.
- **Search Bar:** Centered, rounded search bar with animated rotating placeholder (`Search "milk"`, `Search "chips"`, `Search "bread"`, `Search "atta"`) and real-time suggestion search modal.
- **Authentication:** Simulated mobile + 4-digit OTP login with user profile dropdown.
- **Dynamic Cart Pill:** Green `#0C831F` pill displaying real-time `{count} items | ₹{subtotal}`.

### 2. Authentic Blinkit Category Grid & Visual Assets
- **Official Category Slices:** 20 verified category tiles directly powered by Blinkit's layout engine:
  - Paan Corner, Dairy, Bread & Eggs, Fruits & Vegetables, Cold Drinks & Juices, Snacks & Munchies
  - Breakfast & Instant Food, Sweet Tooth, Bakery & Biscuits, Tea, Coffee & Health Drinks, Atta, Rice & Dal
  - Masala & Oil, Sauces & Spreads, Chicken & Meat, Organic, Baby Care, Pharma & Wellness, Cleaning Essentials, Pet Care
- **Hero Promotional Banners:** Pharmacy at your doorstep, Pet Care store, Baby Care store, Print store (₹2/page), and Paan corner specials.

### 3. Product Cards & Quantity Steppers
- Instant toggle between default `ADD` state and solid `#0C831F` green stepper (`-`, qty, `+`).
- `⚡ 8 MINS` / `10 MINS` delivery speed badges.
- Unit indicators (`500 ml`, `1 kg`, `Pack of 4`).
- Strikethrough MRP with calculated percentage discounts.

### 4. Interactive Product Details View
- High-resolution pack showcase with interactive multi-image thumbnail gallery.
- Pack size variant switcher (e.g. `500 ml` vs `1 L`).
- Authentic product details: Shelf life, country of origin, FSSAI / manufacturer info, and key features list.

### 5. Slide-In Shopping Cart Drawer
- **Free Delivery Progress Meter:** Dynamic threshold tracker for free delivery over ₹199.
- Itemized grocery list with inline quantity adjusters.
- **Delivery Tip Selector:** Direct tip options for delivery partners (`₹10`, `₹20`, `₹30`, `₹50`).
- **Bill Details Breakdown:** Item total, delivery charges, handling fee (₹4), Feeding India donation (₹1 toggle), and savings banner.
- **Live Delivery Simulator:** Simulated checkout with 3-stage animated live delivery tracking (`Order Placed` ➔ `Packing at Dark Store` ➔ `Delivery Partner Assigned`).

### 6. Full Category Browsing Page (`/cn/...`)
- Sticky left category sidebar with active green border indicator.
- Horizontal subcategory pill filters.
- Sorting by Relevance, Price: Low to High, Price: High to Low, and Highest Discount.

---

## 🎨 Color Palette

| Token | Hex | Role |
| :--- | :--- | :--- |
| **Blinkit Yellow** | `#F8CB46` | Brand accent & Logo |
| **Blinkit Green** | `#0C831F` | Action buttons (ADD, Checkout, Badges) |
| **Blinkit Charcoal** | `#1C1C1C` | High contrast headings & text |
| **Page Background** | `#F4F6FB` | Clean quick-commerce canvas |
| **Badge Background**| `#F3F9F4` | Delivery time badges & tags |

---

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite 5 + TypeScript
- **Styling:** Tailwind CSS + PostCSS
- **Icons:** Lucide React + Official Blinkit SVGs
- **State Management:** React Context API + LocalStorage persistence

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/NaikAtharva002/blinkit-clone.git
cd blinkit-clone

# Install dependencies
npm install

# Start the local development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 📄 License

This project is created for educational and reverse-engineering research purposes. All trademarks and brand assets belong to Blink Commerce Private Limited.
