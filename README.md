# عدسة (Adasa) — Photography Blog

A React + Vite single-page app that recreates [adasa-psi.vercel.app](https://adasa-psi.vercel.app/), an Arabic (RTL) blog about photography. Built as a routing-focused assignment: no backend, no API calls — all content comes from a static `posts.json` file, treated exactly like a response from a server.

## Live Demo: adasa-photography-five.vercel.app

## Features

- **Home** — hero, category strip, featured articles, "explore by topic" cards, a latest-posts carousel, and a newsletter signup
- **Blog** — full-text search, category filtering (chip buttons), grid/list view toggle, and pagination (6 posts per page) — all synced to the URL query string
- **Blog Details** — full article view with author info, tags, and related posts
- **About** ("من نحن") — mission, values, and the full writer team (pulled from the post authors already in the data)
- **404** — shown for any unmatched route
- Fully responsive, including a collapsible mobile navbar

## Tech Stack

- React 18 + Vite
- React Router v6 (client-side routing, `useSearchParams` for Blog page state)
- Bootstrap 5 (RTL build) for layout/grid
- Bootstrap Icons
- Plain CSS (`index.css`) for the dark/orange theme on top of Bootstrap

## Project Structure

```
src/
├── components/     # Navbar, Footer, Layout, PostCard, Pagination, Logo
├── pages/          # Home, Blog, BlogDetails, About, NotFound
├── data/
│   ├── posts.json     # source data — posts, categories, site info
│   └── postsData.js   # helpers (lookup by slug, related posts, category colors/icons, team list)
├── index.css       # theme tokens + all custom styles
├── App.jsx         # route definitions
└── main.jsx        # entry point
```

## Getting Started

```bash
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Data

Everything renders from `src/data/posts.json` — posts, categories, and site info. There are no API calls anywhere in the app.