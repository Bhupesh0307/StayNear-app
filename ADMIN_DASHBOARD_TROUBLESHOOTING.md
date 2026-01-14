# Admin Dashboard - "Not Found" Error Troubleshooting

## 🔍 Issue: "Not Found" Error When Accessing Admin Dashboard

If you're getting a "Not Found" error even though you're logged in as admin and the backend is running, follow these steps:

## ✅ Step-by-Step Fix

### 1. **Restart Backend Server**

The route was just added, so you MUST restart the backend:

```bash
# Stop the current backend server (Ctrl+C)
# Then restart:
cd StayNear/src/backend
npm start
```

**Important:** After any route changes, you MUST restart the backend server.

### 2. **Verify Backend is Running**

Check backend console for:
```
MongoDB connected
Server running on port 5000
```

### 3. **Test the Route Directly**

Open your browser and go to:
```
http://localhost:5000/api/houses/test
```

You should see:
```json
{"message":"House routes are working!","path":"/test"}
```

If this works, the routes are registered correctly.

### 4. **Test Pending Route (Requires Auth)**

You can't test this directly in browser (needs auth token), but check backend console when you try to access the admin dashboard. You should see:
```
✅ Pending houses route hit
User role: admin
User ID: [your-id]
```

If you DON'T see this, the route isn't being hit.

### 5. **Check Browser Console**

Open DevTools (F12) → Console tab and look for:
- `🔍 Fetching pending houses from: http://localhost:5000/api/houses/pending`
- `📡 Response status: [status code]`

**Status Codes:**
- `404` = Route not found (server needs restart or route not registered)
- `401` = Not authenticated (token missing/invalid)
- `403` = Forbidden (not admin role)
- `200` = Success

### 6. **Verify Environment Variables**

**Backend** (`StayNear/src/backend/.env`):
```env
MONGO_URI=mongodb://localhost:27017/staynear
PORT=5000
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`StayNear/.env`):
```env
VITE_API_BASE_URL=http://localhost:5000
```

**Important:** After changing `.env` files, restart both servers!

### 7. **Check Token is Valid**

In browser console, run:
```javascript
localStorage.getItem('token')
```

Should return a long string. If it's null or empty, you need to login again.

### 8. **Verify Admin Role**

In browser console:
```javascript
JSON.parse(localStorage.getItem('user'))
```

Check the `role` field - it should be `"admin"`.

## 🐛 Common Issues

### Issue 1: Route Not Found (404)
**Cause:** Backend server not restarted after adding route
**Fix:** Restart backend server

### Issue 2: Token Missing
**Cause:** Not logged in or token expired
**Fix:** Logout and login again as admin

### Issue 3: Wrong Role
**Cause:** User role is not "admin"
**Fix:** 
- Check user role in database
- Or create new admin account:
  - Sign up with role "admin"
  - Or update existing user in database

### Issue 4: CORS Error
**Cause:** Backend CORS not configured for frontend URL
**Fix:** Check `FRONTEND_URL` in backend `.env` matches your frontend URL

### Issue 5: Backend Not Running
**Cause:** Backend server crashed or not started
**Fix:** 
- Check backend terminal for errors
- Restart backend server
- Check MongoDB is connected

## 🧪 Quick Test

1. **Test backend is accessible:**
   ```
   http://localhost:5000/
   ```
   Should return: `{"ok":true,"message":"StayNear API"}`

2. **Test house routes:**
   ```
   http://localhost:5000/api/houses/test
   ```
   Should return: `{"message":"House routes are working!","path":"/test"}`

3. **Test pending route (in browser console):**
   ```javascript
   fetch('http://localhost:5000/api/houses/pending', {
     headers: {
       'Authorization': 'Bearer ' + localStorage.getItem('token')
     }
   }).then(r => r.json()).then(console.log)
   ```
   Should return array of pending houses or error message

## 📝 Next Steps

If still not working after restarting:

1. Check backend console for any error messages
2. Check browser console for detailed error logs
3. Verify the route is in the correct file: `src/backend/routes/houseRoutes.js`
4. Make sure route is defined BEFORE any `/:id` routes
5. Check that `router.get("/pending", ...)` is properly exported

---

**Most Common Fix:** Restart the backend server! 🚀


