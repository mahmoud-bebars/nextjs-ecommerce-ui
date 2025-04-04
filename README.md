# 🛍️ Creiden Front-End Task

This is the solution to the **Front-End Developer Technical Task** for Creiden, built with the latest modern stack including **Next.js 15**, **Tailwind CSS 4**, **shadcn/ui**, and **Zustand** for state management.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) (using CSS Layers)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Fonts:** [Google Fonts (Poppins & Volkhov)](https://fonts.google.com/)
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/)
- **API:** [FakeStoreAPI](https://fakestoreapi.com/)

---

## 💡 Features

- ✅ Dark mode support (added for a modern UX)
- ✅ Fully responsive layout with Header & Footer
- ✅ Dynamic product listing via API
- ✅ Category filter with real-time API updates
- ✅ Cart management via Zustand (Add/Remove)
- ✅ Clean and modular code structure

---

## 📂 Folder Structure

```
. ├── app/
│ ├── favicon.ico # App icon
│ ├── layout.tsx # App layout with fonts, header, footer
│ ├── page.tsx # Home page with category filter & product grid
│ ├── produsct # Products page directory with category filter & product grid
│ │ ├── [id] # App Router dynamic route for product detail
│ │ └── page.tsx # Product detail page
│ ├── cart # Cart page directory
│ │ └── page.tsx # Cart page with cart items & checkout
│ ├── components/ # Reusable UI components
│ ├── store/
│ └── useProductStore.ts # Zustand store for product & cart state
│ ├── styles/
│ │ └── globals.css # Tailwind base + custom fonts
│ └── public/

```

---

## 🧪 How to Run Locally

```bash
# 1. Clone the repo
git clone https://github.com/mahmoud-bebars/nextjs-ecommerce-ui.git

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

Open http://localhost:3000 to view it in your browser.

## 📝 Notes

The project uses Zustand for a scalable and clean state management approach.
Fonts (Poppins & Volkhov) are imported using next/font/google and integrated with Tailwind via CSS variables.
While not required in the prompt, Dark Mode was added as a baseline accessibility/UX improvement.
