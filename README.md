# WealthMind

A personal finance management application built with React, TypeScript, and Vite.

## Project Structure (FSD)

This project follows the **Feature-Sliced Design (FSD)** architectural methodology.

- **app**: Root of the application. Contains global styles, providers, and the main App component.
- **pages**: Application pages. Each page is a composition of widgets and features.
- **widgets**: Large self-contained blocks of the user interface (e.g., Sidebar, Charts, KPI Overview).
- **features**: User interactions that provide business value (e.g., Add Transaction).
- **entities**: Domain entities (e.g., Finance/Transactions) with their own logic, types, and UI components.
- **shared**: Reusable components and utilities that are not bound to any specific domain (e.g., UI kit, API helpers, Libs).

## Tech Stack

- **React 19**
- **TypeScript**
- **Vite**
- **Tailwind CSS**
- **Shadcn UI**
- **Recharts** (for data visualization)
- **React Hook Form** + **Zod** (for form validation)

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
