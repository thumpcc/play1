# Technical Specification Document

## React GitHub Pages Application

**Version:** 1.0
**Date:** November 5, 2025

---

## 1. Technology Stack

### 1.1 Core Technologies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0"
}
```

### 1.2 Build Tools
**Option A: Vite (Recommended for modern React)**
```json
{
  "vite": "^5.0.0",
  "@vitejs/plugin-react": "^4.2.0"
}
```

**Option B: Create React App**
```bash
npx create-react-app app-name
```

### 1.3 Development Dependencies
```json
{
  "eslint": "^8.55.0",
  "prettier": "^3.1.0",
  "gh-pages": "^6.1.0"
}
```

---

## 2. Project Setup

### 2.1 Initialize React Project

**Using Vite (Recommended):**
```bash
npm create vite@latest . -- --template react
npm install
npm install react-router-dom
npm install --save-dev gh-pages
```

**Using Create React App:**
```bash
npx create-react-app .
npm install react-router-dom
npm install --save-dev gh-pages
```

### 2.2 Configure package.json

```json
{
  "name": "play1",
  "version": "1.0.0",
  "homepage": "https://[username].github.io/play1",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Note:**
- For Vite: use `"deploy": "gh-pages -d dist"`
- For CRA: use `"deploy": "gh-pages -d build"`

---

## 3. Routing Configuration

### 3.1 React Router Setup

**src/App.js:**
```javascript
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router basename="/play1">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
```

**Key Points:**
- Use `basename="/play1"` to match your repo name
- This ensures routing works correctly on GitHub Pages subdirectory

### 3.2 Alternative: Hash Router (Simpler for GitHub Pages)

```javascript
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
```

**Pros:** No 404 configuration needed
**Cons:** URLs will include `#` (e.g., `/#/about`)

---

## 4. Build Configuration

### 4.1 Vite Configuration

**vite.config.js:**
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/play1/', // Must match your repo name
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom']
        }
      }
    }
  }
});
```

### 4.2 Environment Variables

**Create .env file:**
```
VITE_APP_TITLE=My React App
VITE_API_URL=https://api.example.com
```

**Usage in code:**
```javascript
const title = import.meta.env.VITE_APP_TITLE;
```

---

## 5. GitHub Pages Specific Configuration

### 5.1 404 Handling for BrowserRouter

**public/404.html:**
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Redirecting...</title>
    <script>
      // Single Page Apps for GitHub Pages
      // https://github.com/rafgraph/spa-github-pages
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body>
  </body>
</html>
```

**public/index.html (add to head):**
```html
<script>
  // Single Page Apps for GitHub Pages
  (function(l) {
    if (l.search[1] === '/' ) {
      var decoded = l.search.slice(1).split('&').map(function(s) {
        return s.replace(/~and~/g, '&')
      }).join('?');
      window.history.replaceState(null, null,
          l.pathname.slice(0, -1) + decoded + l.hash
      );
    }
  }(window.location))
</script>
```

### 5.2 CNAME File (Optional - for custom domain)

**public/CNAME:**
```
yourdomain.com
```

---

## 6. Component Architecture

### 6.1 Recommended Structure

```
src/
├── components/
│   ├── common/
│   │   ├── Button.js
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── Layout.js
│   ├── features/
│   │   └── [feature-specific components]
│   └── ui/
│       └── [reusable UI components]
├── pages/
│   ├── Home.js
│   ├── About.js
│   └── NotFound.js
├── hooks/
│   └── [custom React hooks]
├── utils/
│   └── [helper functions]
├── styles/
│   ├── global.css
│   └── variables.css
├── assets/
│   ├── images/
│   └── icons/
├── App.js
└── index.js
```

### 6.2 Example Component Pattern

```javascript
// src/components/common/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
```

---

## 7. Styling Options

### 7.1 Option A: CSS Modules
```javascript
import styles from './Button.module.css';

const Button = ({ children }) => (
  <button className={styles.button}>{children}</button>
);
```

### 7.2 Option B: Styled Components
```bash
npm install styled-components
```

```javascript
import styled from 'styled-components';

const Button = styled.button`
  background: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
`;
```

### 7.3 Option C: Tailwind CSS
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 8. State Management

### 8.1 Context API (Simple state)

```javascript
// src/context/AppContext.js
import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
```

### 8.2 Redux (Complex state)
```bash
npm install @reduxjs/toolkit react-redux
```

---

## 9. Performance Optimization

### 9.1 Code Splitting
```javascript
import React, { lazy, Suspense } from 'react';

const About = lazy(() => import('./pages/About'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <About />
    </Suspense>
  );
}
```

### 9.2 Image Optimization
- Use WebP format with fallbacks
- Implement lazy loading
- Optimize image sizes

```javascript
<img
  src="image.webp"
  alt="description"
  loading="lazy"
/>
```

---

## 10. SEO Configuration

### 10.1 React Helmet
```bash
npm install react-helmet-async
```

```javascript
import { Helmet } from 'react-helmet-async';

const Home = () => (
  <>
    <Helmet>
      <title>Home - My React App</title>
      <meta name="description" content="Welcome to my React app" />
      <meta property="og:title" content="Home - My React App" />
      <meta property="og:description" content="Welcome to my React app" />
    </Helmet>
    <div>Content...</div>
  </>
);
```

---

## 11. Testing

### 11.1 Unit Testing Setup
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

**Example test:**
```javascript
import { render, screen } from '@testing-library/react';
import Button from './Button';

test('renders button', () => {
  render(<Button>Click me</Button>);
  expect(screen.getByText('Click me')).toBeInTheDocument();
});
```

---

## 12. CI/CD Pipeline

### 12.1 GitHub Actions Workflow

See DEPLOYMENT.md for complete GitHub Actions configuration.

**Key steps:**
1. Checkout code
2. Setup Node.js
3. Install dependencies
4. Run tests (if applicable)
5. Build project
6. Deploy to GitHub Pages

---

## 13. Environment-Specific Builds

### 13.1 Development
```bash
npm run dev
# Runs on http://localhost:5173 (Vite)
```

### 13.2 Production Build
```bash
npm run build
# Creates optimized build in dist/ folder
```

### 13.3 Preview Production Build
```bash
npm run preview
# Preview production build locally
```

---

## 14. Security Considerations

### 14.1 Dependencies
- Regularly update dependencies: `npm audit`
- Use `npm audit fix` to resolve vulnerabilities
- Review dependency licenses

### 14.2 Content Security Policy

**Add to index.html:**
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline';">
```

---

## 15. Browser Support

### 15.1 Target Browsers
- Chrome: Last 2 versions
- Firefox: Last 2 versions
- Safari: Last 2 versions
- Edge: Last 2 versions
- Mobile: iOS Safari 12+, Chrome Android 90+

### 15.2 Polyfills (if needed)
```bash
npm install core-js regenerator-runtime
```

---

## 16. Monitoring & Analytics

### 16.1 Google Analytics (Optional)
```bash
npm install react-ga4
```

```javascript
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');
ReactGA.send("pageview");
```

---

## 17. Best Practices

1. **Component Design**
   - Keep components small and focused
   - Use functional components with hooks
   - Implement proper prop validation

2. **Performance**
   - Memoize expensive computations
   - Implement lazy loading
   - Optimize bundle size

3. **Code Quality**
   - Use ESLint and Prettier
   - Follow consistent naming conventions
   - Write meaningful comments

4. **Accessibility**
   - Use semantic HTML
   - Implement ARIA labels
   - Ensure keyboard navigation

---

## 18. Troubleshooting

### Common Issues:

**Issue: Blank page after deployment**
- Check `base` in vite.config.js matches repo name
- Verify `homepage` in package.json is correct
- Check browser console for errors

**Issue: 404 on routes**
- Implement 404.html redirect trick
- Or switch to HashRouter

**Issue: Assets not loading**
- Verify base path configuration
- Check asset paths use relative imports

---

## 19. References & Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [GitHub Pages SPA Trick](https://github.com/rafgraph/spa-github-pages)
- [React Best Practices](https://react.dev/learn)
