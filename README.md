# Vite + React GitHub Pages

A modern React application built with Vite and deployed to GitHub Pages using GitHub Actions.

## Features

- ⚛️ **React 18** - Latest version of React
- ⚡ **Vite 6** - Fast build tool and dev server
- 🎨 **Modern UI** - Clean and responsive design
- 🔄 **React Router** - Client-side routing with two demo pages
- 🚀 **Automated Deployment** - GitHub Actions workflow for CI/CD
- 📦 **GitHub Pages** - Free hosting

## Pages

1. **Home** (`/`) - Welcome page with project overview
2. **About** (`/about`) - Information about the tech stack

## Getting Started

### Prerequisites

- Node.js 20 or higher
- npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd play1

# Install dependencies
npm install
```

### Development

```bash
# Start the development server
npm run dev
```

Visit `http://localhost:5173` to see your app.

### Build

```bash
# Build for production
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

## Deployment

This project is configured to automatically deploy to GitHub Pages when changes are pushed to the main/master branch.

### Setup GitHub Pages

1. Go to your repository Settings
2. Navigate to Pages
3. Under "Build and deployment", select "GitHub Actions" as the source
4. Push to main/master branch to trigger deployment

The site will be available at: `https://<username>.github.io/play1/`

## Project Structure

```
play1/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   └── vite.svg               # Static assets
├── src/
│   ├── pages/
│   │   ├── Home.jsx           # Home page component
│   │   ├── About.jsx          # About page component
│   │   └── Page.css           # Shared page styles
│   ├── App.jsx                # Main app component with routing
│   ├── App.css                # App styles
│   ├── main.jsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # HTML template
├── package.json               # Dependencies and scripts
├── vite.config.js            # Vite configuration
└── README.md                  # This file
```

## Technologies

- **React** - UI library
- **Vite** - Build tool
- **React Router** - Routing library
- **GitHub Actions** - CI/CD
- **GitHub Pages** - Hosting

## License

See the [LICENSE](LICENSE) file for details.
