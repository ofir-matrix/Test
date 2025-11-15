# GitHub Pages Deployment Guide

## Your Web App Link

Once GitHub Pages is enabled, your web app will be available at:

**https://ofir-matrix.github.io/Test**

## Setup Instructions

### Option 1: Using GitHub Actions (Recommended)

1. **Enable GitHub Pages:**
   - Go to your repository: https://github.com/ofir-matrix/Test
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**
   - Save the settings

2. **Push to main branch:**
   ```bash
   git checkout main
   git merge cursor/get-github-hosted-web-app-link-fe56
   git push origin main
   ```

3. **Trigger deployment:**
   - The GitHub Actions workflow will automatically deploy when you push to main
   - Or go to **Actions** tab and manually trigger the workflow

### Option 2: Using Static Site (Simpler)

1. **Enable GitHub Pages:**
   - Go to **Settings** → **Pages**
   - Under "Source", select **Deploy from a branch**
   - Choose branch: **main** (or **master** if that's your default)
   - Choose folder: **/ (root)**
   - Click **Save**

2. **Push your code:**
   ```bash
   git checkout main
   git merge cursor/get-github-hosted-web-app-link-fe56
   git push origin main
   ```

## Verify Deployment

After enabling GitHub Pages and pushing your code:
- Wait 1-2 minutes for GitHub to build and deploy
- Visit: **https://ofir-matrix.github.io/Test**
- Check the **Actions** tab to see deployment status

## Current Status

- ✅ Web app files created (`index.html`)
- ✅ GitHub Actions workflow configured (`.github/workflows/deploy.yml`)
- ✅ `.nojekyll` file added (prevents Jekyll processing)
- ⏳ GitHub Pages needs to be enabled in repository settings
- ⏳ Code needs to be pushed to main/master branch
