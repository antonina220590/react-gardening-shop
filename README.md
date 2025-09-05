# 🌱 Gardening Shop – React E-commerce Application

A fully-featured, responsive e-commerce web application for a gardening store, built with React and TypeScript.

🔗 **Live Demo:** [https://gardening-shop.onrender.com](https://gardening-shop.onrender.com)

🎨 **Figma Design:** [Figma](https://www.figma.com/design/GjdhfxXIfFrglI3XO1fkwf/%D0%98%D1%82%D0%BE%D0%B3%D0%BE%D0%B2%D1%8B%D0%B9-%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82--2024-?node-id=0-1&p=f&t=XO5QD8EulYWfzzqN-0)

📸 **Screenshot:**

![Main Page](/screenshots/mainPage.jpg)

---

## 📖 About The Project

This project was built as a portfolio piece to demonstrate a wide range of modern frontend development skills, including:

- Building a complex, multi-page SPA with React.
- Professional state management with Redux Toolkit and RTK Query.
- Creating a clean, scalable, and maintainable component architecture.
- Form handling & validation with React Hook Form and Yup.
- Implementing a pixel-perfect, responsive design from a Figma mockup.
- Full development cycle from setup to deployment.
- Code quality enforced with ESLint, Prettier, Husky, and Vite.
- Automated tests with Vitest and React Testing Library.

---

## ✨ Features

- **Product Browsing**: View all products, products by category, and sale items.
- **Dynamic Filtering & Sorting**: Client-side filtering by price, discount status, and various sorting options.
- **Shopping Cart**: Fully functional cart with the ability to add, remove, and change the quantity of items.
- **Order Form**: A validated form to submit orders to the backend.
- **Responsive Design**: The application is optimized for desktop, tablet, and mobile devices.
- **Modern UX**: Includes features like lazy-loading for images, toast notifications for feedback, smooth navigation.

---

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, React Router v7, Redux Toolkit (RTK Query), React Hook Form, Yup
- **Styling**: CSS Modules
- **Deployment**: Render.com

### 🧩 Tooling & Code Quality

- **Linter:** ESLint
- **Formatter:** Prettier
- **Git Hooks:** Husky
- **Pre-commit checks:** lint-staged
- **Pre-push Checks:** Running the full test suite with `npm run test`
- **Testing:** Vitest, React Testing Library

---

## 🚀 Local Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/antonina220590/react-gardening-shop](https://github.com/antonina220590/react-gardening-shop)
    cd react-gardening-shop
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Create a `.env.development` file** in the root and add the backend URL:

    ```
    VITE_API_BASE_URL=http://localhost:3333
    ```

4.  **Start the development server:**

    ```bash
    npm run dev
    ```

    The application will be available at `http://localhost:5173`.

5.  **Testing:**

    ```bash
    npm run test
    ```

    Create a `.env.test` file in the root and add the backend URL:

    ```
    VITE_API_BASE_URL=http://localhost:3333
    ```

👉 _(Note: This project requires the corresponding [backend server](https://github.com/antonina220590/telran-backend) to be running locally on port 3333.)_

## 📸 Demo

![App Demo](/screenshots/GIF.gif)
