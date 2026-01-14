# 🚀 StayNear - Quick Start Guide

## ✅ What We Fixed

1. **Backend Configuration**
   - Fixed server.js code ordering
   - Added proper CORS for production
   - Added start/dev scripts to package.json
   - Added missing dependencies (joi, multer)

2. **Frontend Configuration**
   - Created centralized API configuration (`src/utils/apiConfig.js`)
   - Updated all API calls to use environment variables
   - Fixed signup component (removed duplicate code, improved styling)
   - Updated login component to use API config

3. **Login & Signup**
   - ✅ Both components now work correctly
   - ✅ Use environment-based API URLs
   - ✅ Proper error handling
   - ✅ Consistent styling

## 📋 Setup Steps

### 1. Install Dependencies

```bash
# Backend
cd StayNear/src/backend
npm install

# Frontend (from project root)
cd StayNear
npm install
```

### 2. Create Environment Files

**Backend** (`StayNear/src/backend/.env`):
```env
MONGO_URI=mongodb://localhost:27017/staynear
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`StayNear/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000
```

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd StayNear/src/backend
npm start
# or for auto-reload: npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd StayNear
npm run dev
```

### 4. Test Login/Signup

1. Open http://localhost:5173
2. Go to `/signup` - Create an account
3. Go to `/login` - Login with your credentials
4. Check browser console for any errors

## 🌐 Deployment

See `DEPLOYMENT.md` for complete instructions.

**Quick Deploy:**
1. **Backend:** Deploy to Railway/Render (set root directory to `src/backend`)
2. **Frontend:** Deploy to Vercel (set root directory to `StayNear`)
3. Update environment variables with production URLs

## 📁 Why Backend is in Frontend Folder?

The backend is at `src/backend/` inside the frontend project. This is **acceptable** and works fine for:
- ✅ Development
- ✅ Small to medium projects
- ✅ Quick deployment

**You can keep it this way** - we've configured everything to work properly.

If you want to separate them later, you can move `src/backend/` to root level as `backend/`.

## 🔍 Files Changed

- ✅ `src/backend/server.js` - Fixed structure and CORS
- ✅ `src/backend/package.json` - Added scripts and dependencies
- ✅ `src/utils/apiConfig.js` - NEW - Centralized API config
- ✅ `src/Components/Auth/login.jsx` - Uses API config
- ✅ `src/Components/Auth/signup.jsx` - Fixed and improved
- ✅ `src/Components/Upload/Upload.jsx` - Uses API config

## 🆘 Troubleshooting

**Backend won't start:**
- Check `.env` file exists in `src/backend/`
- Verify MongoDB is running (or use MongoDB Atlas)
- Check port 5000 is not in use

**Frontend can't connect to backend:**
- Verify backend is running on port 5000
- Check `VITE_API_BASE_URL` in frontend `.env`
- Check browser console for CORS errors

**Login/Signup not working:**
- Check backend logs for errors
- Verify MongoDB connection
- Check JWT_SECRET is set in backend `.env`

## 📚 Documentation

- `DEPLOYMENT.md` - Complete deployment guide
- `PROJECT_STRUCTURE.md` - Detailed project structure explanation

---

**Ready to deploy?** Follow `DEPLOYMENT.md` for step-by-step instructions! 🚀


