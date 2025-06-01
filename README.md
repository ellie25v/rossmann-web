# React Rossmann Product Catalog Demo

A simple React-based web application created to demonstrate API functionality for an online product catalog with city-based product availability and user-specific shopping carts.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Built With](#built-with)
- [Features](#features)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [API Configuration and Usage](#api-configuration-and-usage)

---

## About The Project

This application serves as a frontend demonstration for an API handling product catalogs across multiple cities. Users can select a city and one of the pre-configured accounts, browse available products, view product details, and manage a shopping cart — all operations are handled via API calls.

This project was built for demo purposes as part of a diploma project.

---

## Built With
- [React](https://react.dev/)
- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/) 
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)

---

## Features

- City-based product catalog
- User dropdown for quick account selection
- Shopping cart modal with product management
- Product detail modal
- Full API integration for data retrieval and cart updates

---

## Project Structure

```
src/
├── comp/
│ ├── header/
│ │ ├── Header.jsx
│ │ ├── UserDropdown.jsx
│ ├── modals/
│ │ ├── CartModal.jsx
│ │ └── ProductDetailModal.jsx
│ ├── ProductCatalog.jsx
│ ├── ProductCard.jsx
├── services/
│ └── api.jsx
├── App.jsx
├── main.jsx
```

## Features

- 🌐 View product catalog by city
- 👤 Select an existing demo user
- 🛒 Add products to a shopping cart
- 📝 Cart items persist via REST API
- 🎨 Styled using Tailwind CSS
- ⚡️ Fast development with Vite

---

## Installation

1. Clone the repository:

```
git clone https://github.com/ellie25v/rossmann-web.git
```
2. Install dependencies:

```
npm install
npm run dev
```

## API Configuration and Usage
Make sure your backend API is running locally:

API base URL: http://localhost:1300

Product images URL: http://localhost:1100

Project Link: https://ellie25v.github.io/rossmann-web/
