# StayNear Project Structure

## 📁 Current Structure

```
StayNear/
├── src/
│   ├── backend/              # Backend Express API
│   │   ├── controllers/
│   │   │   └── authController.js
│   │   ├── middlewares/
│   │   │   ├── auth.js
│   │   │   └── role.js
│   │   ├── models/
│   │   │   ├── House.js
│   │   │   └── User.js
│   │   ├── routes/
│   │   │   ├── auth.js        # Main auth routes (uses controller)
│   │   │   ├── authRoutes.js  # Duplicate/old routes (can be removed)
│   │   │   └── houseRoutes.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── validators.js
│   │   ├── server.js          # Main backend server
│   │   └── package.json
│   ├── Components/            # React components
│   │   ├── Auth/
│   │   │   ├── login.jsx      # ✅ Fixed - uses API config
│   │   │   ├── signup.jsx     # ✅ Fixed - improved styling
│   │   │   └── ProtectedRoute.jsx
│   │   └── ...
│   ├── context/
│   │   └── AuthContext.jsx    # Authentication context
│   └── utils/
│       ├── apiConfig.js       # ✅ NEW - Centralized API config
│       └── auth.js
├── package.json               # Frontend dependencies
└── DEPLOYMENT.md              # ✅ NEW - Deployment guide
```

## 🔍 Why Backend is in Frontend Folder?

**Current Structure:** Backend is nested at `src/backend/` inside the frontend project.

**Reasons this might have happened:**
1. Started as a monorepo approach
2. Quick development setup
3. Shared utilities/configuration

**Is this a problem?**
- ✅ **For development:** Works fine
- ⚠️ **For deployment:** Can work but separation is better
- ✅ **For this project:** Acceptable, we've configured it properly

**Should you change it?**
- **Keep it** if you want quick deployment
- **Separate it** if you want:
  - Independent scaling
  - Separate CI/CD pipelines
  - Better organization for larger teams

## ✅ What We Fixed

1. **Backend Server (`server.js`)**
   - Fixed code ordering (app was used before definition)
   - Added proper CORS configuration
   - Improved error handling

2. **Backend Package.json**
   - Added `start` script for production
   - Added `dev` script for development
   - Added missing dependencies (`joi`, `multer`)
   - Set `type: "module"` for ES6 imports

3. **Frontend API Configuration**
   - Created `apiConfig.js` for centralized API URLs
   - Uses environment variables (`VITE_API_BASE_URL`)
   - Updated all API calls to use config

4. **Login Component**
   - Now uses `API_ENDPOINTS` from config
   - Works with environment variables

5. **Signup Component**
   - Removed duplicate/unused code
   - Improved styling to match login
   - Uses `API_ENDPOINTS` from config
   - Better error handling

6. **Upload Component**
   - Updated to use API config
   - Environment-aware API calls

## 🔧 Configuration Files Needed

### Backend `.env` (in `src/backend/`)
```env
MONGO_URI=mongodb://localhost:27017/staynear
PORT=5000
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

### Frontend `.env` (in `StayNear/`)
```env
VITE_API_BASE_URL=http://localhost:5000
```

## 🚀 Deployment Options

See `DEPLOYMENT.md` for detailed instructions. Quick summary:

1. **Vercel (Frontend) + Railway (Backend)** - Recommended
2. **Render (Both)** - Simple, all-in-one
3. **Heroku (Backend) + Vercel (Frontend)** - Traditional

## 📝 Next Steps

1. Create `.env` files (see above)
2. Install dependencies:
   ```bash
   # Backend
   cd src/backend && npm install
   
   # Frontend
   cd .. && npm install
   ```
3. Set up MongoDB (local or Atlas)
4. Test locally
5. Deploy using `DEPLOYMENT.md` guide

## ⚠️ Important Notes

- **Never commit `.env` files** - They contain secrets
- **Backend and Frontend can stay together** - It's fine for this project
- **For production:** Consider separating them for better scalability
- **CORS must match** - Backend `FRONTEND_URL` must match actual frontend URL


