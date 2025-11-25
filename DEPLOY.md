# Deployment Guide

## GitHub Setup

1. Create a new repository on GitHub (don't initialize with README)

2. Add the remote and push:
```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

## Vercel Deployment

### Option 1: Via Vercel Dashboard (Recommended)
1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Add Environment Variables:
   - `ADMIN_PASSWORD` = your admin password (e.g., `includemyself123!`)
   - `RESEND_API_KEY` = your Resend API key (if you have one, otherwise leave empty)
   - `NEXT_PUBLIC_BASE_URL` = your Vercel deployment URL (will be auto-filled after first deploy)
6. Click "Deploy"

### Option 2: Via Vercel CLI
```bash
npm i -g vercel
vercel
```

## Environment Variables Needed in Vercel

- `ADMIN_PASSWORD` - Password for admin access
- `RESEND_API_KEY` - (Optional) For contact form emails
- `NEXT_PUBLIC_BASE_URL` - Your production URL (auto-set by Vercel)

## Post-Deployment

After deployment, update `NEXT_PUBLIC_BASE_URL` in Vercel environment variables with your actual Vercel URL if needed.

