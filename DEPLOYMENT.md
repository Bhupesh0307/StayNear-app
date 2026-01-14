# StayNear Deployment Guide

This guide will help you deploy both the frontend and backend of StayNear.

## 📁 Project Structure

Currently, the backend is nested inside the frontend project at `src/backend/`. This is acceptable for deployment, but you have two options:

### Option 1: Keep Current Structure (Recommended for Quick Deployment)
- Frontend: React app in `StayNear/`
- Backend: Express server in `StayNear/src/backend/`

### Option 2: Separate Backend (Recommended for Production)
- Move `src/backend/` to root level as `backend/`
- This allows independent scaling and deployment

---

## 🔧 Pre-Deployment Setup

### 1. Backend Environment Variables

Create a `.env` file in `StayNear/src/backend/`:

```env
# MongoDB Connection (use MongoDB Atlas for production)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/staynear?retryWrites=true&w=majority

# Server Port (will be set by hosting platform)
PORT=5000

# JWT Secret (generate a strong random string)
JWT_SECRET=your-super-secret-jwt-key-min-32-characters-long
JWT_EXPIRES_IN=7d

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-domain.com
```

### 2. Frontend Environment Variables

Create a `.env` file in `StayNear/`:

```env
# Backend API URL
VITE_API_BASE_URL=https://your-backend-api.com
```

**Important:** For local development, use:
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Install Dependencies

**Backend:**
```bash
cd StayNear/src/backend
npm install
```

**Frontend:**
```bash
cd StayNear
npm install
```

### 4. Install Missing Backend Dependencies

The backend needs `joi` and `multer`:

```bash
cd StayNear/src/backend
npm install joi multer
```

---

## 🚀 Deployment Options

### Option A: Deploy to Vercel (Frontend) + Railway/Render (Backend)

#### Backend Deployment (Railway/Render)

1. **Railway:**
   - Go to [railway.app](https://railway.app)
   - Create new project
   - Connect your GitHub repository
   - Add service → Select `src/backend` directory
   - Set environment variables in Railway dashboard
   - Deploy

2. **Render:**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect your GitHub repository
   - Root Directory: `src/backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Set environment variables
   - Deploy

#### Frontend Deployment (Vercel)

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Root Directory: `StayNear` (or leave as root)
4. Build Command: `npm run build`
5. Output Directory: `dist`
6. Add Environment Variable:
   - `VITE_API_BASE_URL` = your backend URL (e.g., `https://your-backend.railway.app`)
7. Deploy

---

### Option B: Deploy Both to Render

1. **Backend Service:**
   - Create Web Service
   - Root Directory: `src/backend`
   - Build: `npm install`
   - Start: `npm start`
   - Environment Variables: Add all backend env vars

2. **Frontend Service:**
   - Create Static Site
   - Root Directory: `StayNear`
   - Build Command: `npm run build`
   - Publish Directory: `dist`
   - Environment Variables: `VITE_API_BASE_URL`

---

### Option C: Deploy to Heroku

#### Backend:

1. Create `Procfile` in `StayNear/src/backend/`:
```
web: node server.js
```

2. Install Heroku CLI and login:
```bash
heroku login
```

3. Create Heroku app:
```bash
cd StayNear/src/backend
heroku create staynear-backend
```

4. Set environment variables:
```bash
heroku config:set MONGO_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-secret
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
```

5. Deploy:
```bash
git add .
git commit -m "Deploy backend"
git push heroku main
```

#### Frontend:

Deploy to Vercel or Netlify (Heroku is not ideal for static sites).

---

## 📝 Step-by-Step Deployment (Recommended: Vercel + Railway)

### Step 1: Prepare MongoDB

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Replace `<password>` with your database password

### Step 2: Deploy Backend to Railway

1. Sign up at [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Click "Add Service" → "GitHub Repo"
5. In service settings:
   - **Root Directory:** `src/backend`
   - **Start Command:** `npm start`
6. Go to "Variables" tab and add:
   ```
   MONGO_URI=mongodb+srv://...
   JWT_SECRET=your-secret-key-here
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://your-frontend.vercel.app
   ```
7. Railway will auto-deploy. Copy the generated URL (e.g., `https://staynear-backend.railway.app`)

### Step 3: Deploy Frontend to Vercel

1. Sign up at [vercel.com](https://vercel.com)
2. Click "Add New Project" → Import your GitHub repo
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `StayNear`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Add Environment Variable:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** Your Railway backend URL (e.g., `https://staynear-backend.railway.app`)
5. Click "Deploy"

### Step 4: Update Backend CORS

After frontend is deployed, update backend `FRONTEND_URL` environment variable in Railway to match your Vercel URL.

---

## ✅ Post-Deployment Checklist

- [ ] Backend is accessible (test: `https://your-backend.com/`)
- [ ] Frontend can connect to backend (check browser console)
- [ ] Login/Signup works
- [ ] MongoDB connection is working
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] JWT tokens are being generated

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** Backend not starting
- Check environment variables are set
- Verify MongoDB connection string
- Check logs in Railway/Render dashboard

**Problem:** CORS errors
- Update `FRONTEND_URL` in backend environment variables
- Ensure frontend URL matches exactly (including https://)

### Frontend Issues

**Problem:** API calls failing
- Check `VITE_API_BASE_URL` is set correctly
- Verify backend URL is accessible
- Check browser console for errors

**Problem:** Build fails
- Run `npm install` locally first
- Check for missing dependencies
- Verify Node.js version compatibility

---

## 📦 Local Development

### Running Backend Locally:
```bash
cd StayNear/src/backend
npm install
# Create .env file with your variables
npm start
# or for development with auto-reload:
npm run dev
```

### Running Frontend Locally:
```bash
cd StayNear
npm install
# Create .env file with VITE_API_BASE_URL=http://localhost:5000
npm run dev
```

---

## 🔐 Security Notes

1. **Never commit `.env` files** - They should be in `.gitignore`
2. **Use strong JWT secrets** - Generate with: `openssl rand -base64 32`
3. **Use HTTPS in production** - Both Vercel and Railway provide this
4. **Restrict MongoDB access** - Use IP whitelist in MongoDB Atlas
5. **Validate all inputs** - Already implemented with Joi validators

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Setup](https://www.mongodb.com/docs/atlas/getting-started/)

---

## 🎯 Quick Reference

**Backend URL:** `https://your-backend.railway.app`  
**Frontend URL:** `https://your-frontend.vercel.app`  
**API Endpoints:**
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `POST /api/houses/upload` - Upload guest house

---

Need help? Check the logs in your hosting platform's dashboard!


