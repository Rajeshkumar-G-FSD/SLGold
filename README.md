# SLGold - Vite + Node.js Project

A modern web application built with Vite and Node.js.

## Project Structure

```
SLGold/
├── src/
│   ├── main.js          # Frontend entry point
│   └── server.js        # Node.js server
├── public/
│   └── images/          # Public images folder
├── styles/
│   └── style.css        # Global styles
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── package.json         # Dependencies
└── .gitignore           # Git ignore rules
```

## Installation

```bash
npm install
```

## Development

Run the Vite dev server:

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Build

Create a production build:

```bash
npm run build
```

## Preview

Preview the production build:

```bash
npm run preview
```

## Server

Run the Node.js Express server (requires build first):

```bash
npm run build
npm run server
```

The server will run on `http://localhost:3000`

## Adding Images

Place your images in the `public/images/` folder. They will be served at `/images/` path in the application.

Example:
- Place image at: `public/images/my-image.png`
- Reference in HTML: `<img src="/images/my-image.png" alt="description">`

## Technologies

- **Vite** - Fast frontend build tool
- **Node.js** - JavaScript runtime
- **Express** - Web framework (for production server)
- **CSS3** - Styling
