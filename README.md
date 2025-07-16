# Simple Book API

![screenshot](public/screenshot.png)

This is a simple full-stack web application for managing a personal book library. The project includes Node.js + Express REST API that lets you:

- Add new books

- Edit existing books

- Delete books

- List all books

## Getting Started

### Node Version Setup + Package Install

```sh
# Install node version from .nvmrc file
nvm install

# Use node version from .nvmrc file
nvm use
```

```sh
pnpm install
```

### Run Vue Frontend

```sh
pnpm run dev
```

### Run Server

```sh
pnpm run dev:server
```

### Build

```sh
pnpm run build
```

### Build + Deploy

```sh
pnpm run deploy
```

## 🔜 To-Do

- Component tests

## 📌 Notes

- This project uses PostgreSQL as the database engine to store book records.
- The PostgreSQL database is hosted on AlwaysData, a managed web hosting provider that supports external database access.
- All API operations (add, delete, update, and fetch books) are backed by SQL queries executed against this remote PostgreSQL instance.
