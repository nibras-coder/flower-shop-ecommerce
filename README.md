# Flower Shop E-Commerce Platform

A full-stack e-commerce management system for online flower shopping, custom bouquets, and order delivery tracking. This repository is organized as a monorepo containing both the React frontend and the Express backend.

## Overview

This platform is designed to support:

- online flower catalog browsing
- customizable bouquet ordering
- customer authentication and secure sessions
- admin-facing backend services for managing products and orders
- delivery and order tracking workflows

## Technology Stack

- **Frontend:** React.js, Vite, TypeScript, Tailwind CSS v4
- **Backend:** Node.js, Express.js, JWT Authentication
- **Database:** MongoDB Atlas, Mongoose ODM

## Project Structure

```text
flower-shop-ecommerce/
├── backend/       # Express server, API routes, models, controllers, and config
├── frontend/      # React client, Vite setup, UI components, and styles
├── .gitignore     # Root ignore file for node_modules and environment files
├── README.md      # Project documentation
└── package.json   # Root package metadata (if present)
```

## Prerequisites

Before contributing, make sure you have the following installed:

- Node.js (v18 or higher)
- Git
- A running MongoDB Atlas cluster for database access

## Installation and Local Development

Follow these steps to run both the frontend and backend locally.

### 1. Clone the Repository

```bash
git clone https://github.com/nibras-coder/flower-shop-ecommerce
cd flower-shop-ecommerce
```

### 2. Backend Setup

Open a terminal and navigate to the backend directory:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder and add the following values:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_generated_secret_key
```

Start the backend development server:

```bash
npm run dev
```

The server will run at `http://localhost:5000`.

### 3. Frontend Setup

Open a new terminal, then run:

```bash
cd frontend
npm install
npm run dev
```

The frontend app will be available at `http://localhost:5173`.

## Git Workflow and Contributions

- Never commit directly to the `main` branch.
- Create a feature branch before making changes:

```bash
git checkout -b feature/your-feature-name
```

- Ensure `.env`, `node_modules`, and local generated files are never committed.
- Submit a pull request for review before merging into `main`.

## Notes

This project is intended for local development and learning, and can be extended with additional order management, product catalogs, or payment integrations as the app grows.
