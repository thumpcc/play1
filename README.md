# Play1 - React GitHub Pages App

A modern React application deployed on GitHub Pages with automated CI/CD using GitHub Actions.

## Features

- ⚛️ **React 18** - Latest React features with hooks
- ⚡ **Vite** - Lightning-fast build tool
- 🎨 **Modern UI** - Responsive design with smooth animations
- 🔄 **React Router** - Client-side routing
- 🚀 **GitHub Actions** - Automated deployment
- 📱 **Responsive** - Works on all devices

## Live Demo

Visit the live app: [https://thumpcc.github.io/play1](https://thumpcc.github.io/play1)

## Tech Stack

- React 18.3.1
- React Router 6.28.0
- Vite 6.0.3
- GitHub Pages
- GitHub Actions

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The app is automatically deployed to GitHub Pages when changes are pushed to the main branch or the feature branch. The deployment is handled by GitHub Actions workflow defined in `.github/workflows/deploy.yml`.

## Project Structure

```
play1/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/                     # Static assets
├── src/
│   ├── components/             # React components
│   ├── pages/                  # Page components
│   │   ├── Home.jsx           # Home page
│   │   ├── About.jsx          # About page
│   │   └── *.css              # Page styles
│   ├── App.jsx                # Main App component
│   ├── main.jsx               # Entry point
│   └── *.css                  # Global styles
├── index.html                 # HTML template
├── vite.config.js             # Vite configuration
├── package.json               # Dependencies and scripts
└── README.md                  # This file
```

## Documentation

For more detailed documentation, see:

- [PRD.md](./PRD.md) - Product Requirements Document
- [TECHNICAL_SPEC.md](./TECHNICAL_SPEC.md) - Technical Specifications
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment Guide

## License

See [LICENSE](./LICENSE) file for details.
