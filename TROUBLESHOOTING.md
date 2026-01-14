# Troubleshooting Guide - Upload "Failed to fetch" Error

## 🔍 Common Causes

The "Failed to fetch" error means the frontend cannot reach the backend server. Here are the most common causes:

### 1. **Backend Server Not Running**
**Symptom:** "Failed to fetch" error when trying to upload

**Solution:**
1. Open a terminal and navigate to backend directory:
   ```bash
   cd StayNear/src/backend
   ```

2. Start the backend server:
   ```bash
   npm start
   ```

3. You should see:
   ```
   MongoDB connected
   Server running on port 5000
   ```

4. Verify the server is running by visiting: http://localhost:5000
   - You should see: `{"ok":true,"message":"StayNear API"}`

### 2. **Wrong API URL**
**Symptom:** Frontend trying to connect to wrong URL

**Solution:**
1. Check your frontend `.env` file in `StayNear/`:
   ```env
   VITE_API_BASE_URL=http://localhost:5000
   ```

2. **Important:** After changing `.env`, you MUST restart the frontend dev server:
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   npm run dev
   ```

3. Check the browser console - it should log: `Uploading to: http://localhost:5000/api/houses/upload`

### 3. **CORS Issues**
**Symptom:** Request blocked by CORS policy

**Solution:**
1. Check backend `.env` file in `StayNear/src/backend/`:
   ```env
   FRONTEND_URL=http://localhost:5173
   ```

2. Make sure the frontend is running on port 5173 (Vite default)

3. Restart backend after changing `.env`

### 4. **MongoDB Not Connected**
**Symptom:** Backend starts but crashes or doesn't connect

**Solution:**
1. Check backend `.env` file:
   ```env
   MONGO_URI=mongodb://localhost:27017/staynear
   ```

2. Make sure MongoDB is running:
   - If using local MongoDB: Start MongoDB service
   - If using MongoDB Atlas: Check connection string is correct

3. Check backend console for MongoDB connection errors

### 5. **Port Already in Use**
**Symptom:** Backend won't start, port 5000 already in use

**Solution:**
1. Find what's using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   
   # Mac/Linux
   lsof -i :5000
   ```

2. Either:
   - Stop the other service using port 5000
   - Or change backend port in `.env`:
     ```env
     PORT=5001
     ```
   - Then update frontend `.env`:
     ```env
     VITE_API_BASE_URL=http://localhost:5001
     ```

## ✅ Quick Checklist

Before uploading, verify:

- [ ] Backend server is running (`npm start` in `src/backend`)
- [ ] Backend shows "Server running on port 5000"
- [ ] MongoDB is connected (check backend console)
- [ ] Frontend `.env` has `VITE_API_BASE_URL=http://localhost:5000`
- [ ] Backend `.env` has `FRONTEND_URL=http://localhost:5173`
- [ ] Both servers restarted after changing `.env` files
- [ ] You're logged in with an "owner" account
- [ ] Browser console shows correct API URL when uploading

## 🧪 Test Backend Connection

1. **Test backend is running:**
   ```bash
   curl http://localhost:5000
   ```
   Should return: `{"ok":true,"message":"StayNear API"}`

2. **Test from browser:**
   - Open: http://localhost:5000
   - Should see the JSON response

3. **Test API endpoint:**
   ```bash
   curl http://localhost:5000/api/houses
   ```
   Should return an array (empty if no houses)

## 🔧 Debug Steps

1. **Check browser console:**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for the log: `Uploading to: http://localhost:5000/api/houses/upload`
   - Check Network tab to see if request is being sent

2. **Check backend console:**
   - Look for incoming requests
   - Check for any error messages
   - Verify MongoDB connection

3. **Verify environment variables:**
   ```bash
   # In frontend directory
   echo $VITE_API_BASE_URL  # Should show http://localhost:5000
   
   # Note: In Vite, env vars must start with VITE_ and require server restart
   ```

## 🚨 Still Not Working?

1. **Clear browser cache and restart:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

2. **Check firewall/antivirus:**
   - May be blocking localhost connections

3. **Try different browser:**
   - Rule out browser-specific issues

4. **Check both terminals:**
   - Backend terminal should show requests coming in
   - Frontend terminal should not show errors

5. **Verify file paths:**
   - Make sure you're in the correct directories
   - Backend: `StayNear/src/backend/`
   - Frontend: `StayNear/`

## 📝 Example Working Setup

**Terminal 1 (Backend):**
```bash
cd StayNear/src/backend
npm start
# Output: MongoDB connected
# Output: Server running on port 5000
```

**Terminal 2 (Frontend):**
```bash
cd StayNear
npm run dev
# Output: VITE v6.x.x  ready in xxx ms
# Output: ➜  Local:   http://localhost:5173/
```

**Browser:**
- Open http://localhost:5173
- Login as owner
- Go to upload page
- Fill form and upload
- Check console for: `Uploading to: http://localhost:5000/api/houses/upload`

If you see this log but still get "Failed to fetch", the backend is likely not running or not accessible.


