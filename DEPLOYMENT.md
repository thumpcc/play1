# Deployment Guide - GitHub Pages with GitHub Actions

**Repository:** play1
**Deployment Method:** GitHub Actions → GitHub Pages

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [GitHub Actions Workflow Setup](#github-actions-workflow-setup)
3. [Repository Settings Configuration](#repository-settings-configuration)
4. [Manual Deployment (Alternative)](#manual-deployment-alternative)
5. [Deployment Verification](#deployment-verification)
6. [Troubleshooting](#troubleshooting)

---

## 1. Prerequisites

### 1.1 Required Files
- ✅ React project initialized
- ✅ package.json configured with homepage
- ✅ vite.config.js or webpack config with base path
- ✅ GitHub repository created

### 1.2 GitHub Repository Permissions
- Write access to the repository
- GitHub Actions enabled
- GitHub Pages enabled (will be configured)

---

## 2. GitHub Actions Workflow Setup

### 2.1 Create Workflow Directory
```bash
mkdir -p .github/workflows
```

### 2.2 GitHub Actions Workflow File

**File: `.github/workflows/deploy.yml`**

#### Option A: Using Built-in GitHub Pages Action (Recommended)

```yaml
name: Deploy React App to GitHub Pages

on:
  push:
    branches:
      - main
      - claude/github-pages-setup-011CUp9TJpbakf789B2gLfHU
  workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
  contents: read
  pages: write
  id-token: write

# Allow only one concurrent deployment
concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build React app
        run: npm run build
        env:
          NODE_ENV: production

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'  # Change to './build' if using Create React App

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build

    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### Option B: Using gh-pages npm package (Alternative)

```yaml
name: Deploy to GitHub Pages (gh-pages)

on:
  push:
    branches:
      - main
      - claude/github-pages-setup-011CUp9TJpbakf789B2gLfHU
  workflow_dispatch:

permissions:
  contents: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NODE_ENV: production

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist  # Change to ./build for CRA
          cname: yourdomain.com  # Optional: only if using custom domain
```

### 2.3 Workflow Explanation

**Triggers:**
- `push` to main branch or your feature branch
- `workflow_dispatch` for manual runs

**Build Job:**
1. Checks out the code
2. Sets up Node.js 18 with npm caching
3. Installs dependencies
4. Builds the React app
5. Uploads build artifacts

**Deploy Job:**
1. Downloads build artifacts
2. Deploys to GitHub Pages
3. Returns deployment URL

---

## 3. Repository Settings Configuration

### 3.1 Enable GitHub Pages

**Steps:**
1. Go to your repository on GitHub
2. Navigate to **Settings** → **Pages**
3. Under **Source**, select:
   - **Option A (Recommended)**: **GitHub Actions** from the dropdown
   - **Option B**: **Deploy from a branch** → select `gh-pages` branch → `/ (root)`

![GitHub Pages Source Settings](https://docs.github.com/assets/cb-49013/mw-1440/images/help/pages/select-source.webp)

### 3.2 Configure Build and Deployment

If using **GitHub Actions** source:
- No additional configuration needed
- Workflow will automatically deploy

If using **Deploy from a branch**:
- Ensure your workflow creates a `gh-pages` branch
- Select that branch in settings

### 3.3 Custom Domain (Optional)

If you have a custom domain:
1. Add `CNAME` file to your `public/` directory:
   ```
   yourdomain.com
   ```
2. In GitHub Settings → Pages → Custom domain:
   - Enter your domain
   - Enable **Enforce HTTPS**

3. Configure DNS with your domain provider:
   ```
   Type: CNAME
   Name: www (or @)
   Value: [username].github.io
   ```

---

## 4. Manual Deployment (Alternative)

### 4.1 Using gh-pages Package

**Install:**
```bash
npm install --save-dev gh-pages
```

**Add scripts to package.json:**
```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Deploy:**
```bash
npm run deploy
```

### 4.2 Manual Git Deployment

```bash
# Build the app
npm run build

# Navigate to build directory
cd dist

# Initialize git if needed
git init
git add -A
git commit -m 'Deploy to GitHub Pages'

# Push to gh-pages branch
git push -f git@github.com:[username]/play1.git main:gh-pages

cd -
```

---

## 5. Deployment Verification

### 5.1 Check GitHub Actions

1. Go to **Actions** tab in your repository
2. Find your latest workflow run
3. Verify all steps completed successfully (green checkmarks)
4. Click on the workflow to see detailed logs

### 5.2 Access Your Site

**Default URL:**
```
https://[username].github.io/play1
```

**Custom Domain:**
```
https://yourdomain.com
```

### 5.3 Verify Deployment

Checklist:
- [ ] Site loads without errors
- [ ] Routing works (test multiple pages)
- [ ] Assets load correctly (images, CSS, JS)
- [ ] No console errors
- [ ] Mobile responsive works
- [ ] HTTPS is enforced

### 5.4 Check Build Status Badge (Optional)

Add to README.md:
```markdown
![Deploy Status](https://github.com/[username]/play1/actions/workflows/deploy.yml/badge.svg)
```

---

## 6. Troubleshooting

### 6.1 Blank Page After Deployment

**Issue:** Site loads but shows blank page

**Solutions:**
1. Check browser console for errors
2. Verify `base` in vite.config.js:
   ```javascript
   base: '/play1/'  // Must match repo name
   ```
3. Check `homepage` in package.json:
   ```json
   "homepage": "https://[username].github.io/play1"
   ```
4. Ensure basename in Router:
   ```javascript
   <BrowserRouter basename="/play1">
   ```

### 6.2 404 Error on Routes

**Issue:** Direct navigation to routes returns 404

**Solutions:**
1. Implement 404.html trick (see TECHNICAL_SPEC.md section 5.1)
2. Switch to HashRouter:
   ```javascript
   import { HashRouter } from 'react-router-dom';
   ```
3. Verify GitHub Pages is properly configured

### 6.3 GitHub Actions Workflow Fails

**Issue:** Workflow fails in Actions tab

**Common causes:**
1. **Build errors:** Check build logs for syntax errors
2. **Dependencies:** Run `npm install` locally to verify
3. **Node version:** Ensure workflow uses compatible Node version
4. **Permissions:** Check workflow permissions in yaml
5. **Branch protection:** Verify Actions can push to deployment branch

**Debug steps:**
```bash
# Test build locally
npm run build

# Check for errors
npm run lint  # If configured

# Verify dependencies
npm ci
```

### 6.4 Assets Not Loading (403 or 404)

**Issue:** Images, CSS, or JS files fail to load

**Solutions:**
1. Use relative paths for assets:
   ```javascript
   import logo from './assets/logo.png';
   ```
2. Check public folder structure
3. Verify base path in build config
4. Clear browser cache

### 6.5 GitHub Pages Not Updating

**Issue:** Changes not reflected on live site

**Solutions:**
1. Wait 2-5 minutes for propagation
2. Check Actions tab for deployment status
3. Hard refresh browser (Ctrl+F5)
4. Clear GitHub Pages cache (re-deploy)
5. Verify workflow ran successfully

### 6.6 Permission Errors in Workflow

**Issue:** Workflow fails with permission denied

**Solution:**
1. Go to Settings → Actions → General
2. Under **Workflow permissions**, select:
   - "Read and write permissions"
3. Enable "Allow GitHub Actions to create and approve pull requests"

### 6.7 Slow Initial Load

**Issue:** Site takes long to load initially

**Solutions:**
1. Implement code splitting:
   ```javascript
   const Component = lazy(() => import('./Component'));
   ```
2. Optimize images (use WebP, lazy loading)
3. Enable compression in build config
4. Review bundle size: `npm run build -- --stats`

---

## 7. Monitoring & Maintenance

### 7.1 Automated Checks

Add to workflow for quality assurance:

```yaml
- name: Run tests
  run: npm test

- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      https://[username].github.io/play1
    uploadArtifacts: true
```

### 7.2 Deployment Notifications

**Slack Notifications:**
```yaml
- name: Slack Notification
  uses: 8398a7/action-slack@v3
  with:
    status: ${{ job.status }}
    webhook_url: ${{ secrets.SLACK_WEBHOOK }}
```

### 7.3 Rollback Strategy

**To rollback to previous version:**
1. Find the previous successful workflow run
2. Re-run the deployment job
3. Or manually deploy from a previous commit:
   ```bash
   git checkout <previous-commit-hash>
   npm run deploy
   ```

---

## 8. Continuous Deployment Best Practices

### 8.1 Branch Strategy
- **main**: Production deployments
- **develop**: Development/staging (optional separate workflow)
- **feature branches**: No auto-deploy

### 8.2 Pre-deployment Checks
- Run tests before deployment
- Lint code
- Check bundle size
- Validate environment variables

### 8.3 Post-deployment Validation
- Automated smoke tests
- Lighthouse performance checks
- Broken link checker

---

## 9. Environment Variables

### 9.1 GitHub Secrets

For sensitive data:
1. Go to Settings → Secrets and variables → Actions
2. Add repository secrets
3. Reference in workflow:
   ```yaml
   env:
     VITE_API_KEY: ${{ secrets.API_KEY }}
   ```

### 9.2 Environment-specific Builds

```yaml
- name: Build for production
  run: npm run build
  env:
    NODE_ENV: production
    VITE_APP_ENV: production
    VITE_API_URL: https://api.production.com
```

---

## 10. Performance Optimization

### 10.1 Build Optimization

```yaml
- name: Cache dependencies
  uses: actions/cache@v3
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}

- name: Build with optimizations
  run: |
    npm run build
    npm run analyze  # If bundle analyzer configured
```

### 10.2 CDN Caching

GitHub Pages automatically provides CDN caching for:
- CSS files
- JavaScript bundles
- Images and assets

**Cache headers are set automatically**

---

## 11. Quick Reference Commands

```bash
# Local development
npm run dev

# Production build locally
npm run build && npm run preview

# Manual deployment (if using gh-pages)
npm run deploy

# Check workflow status
gh workflow view deploy.yml  # Requires GitHub CLI

# Re-run failed workflow
gh run rerun <run-id>

# Watch workflow logs
gh run watch
```

---

## 12. Checklist: First Time Deployment

- [ ] React app builds successfully locally
- [ ] package.json homepage is configured
- [ ] vite.config.js base path is set
- [ ] Router basename matches repo name
- [ ] .github/workflows/deploy.yml created
- [ ] Changes committed and pushed to main/feature branch
- [ ] GitHub Actions workflow runs successfully
- [ ] GitHub Pages source configured in settings
- [ ] Site accessible at github.io URL
- [ ] All routes work correctly
- [ ] Assets load without errors
- [ ] Mobile responsive works
- [ ] HTTPS is enforced

---

## 13. Support & Resources

- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **Vite Deployment:** https://vitejs.dev/guide/static-deploy.html#github-pages
- **React Router:** https://reactrouter.com/en/main/start/overview

---

**Last Updated:** November 5, 2025
**Maintained by:** [Your Name]
**Questions?** Open an issue in the repository
