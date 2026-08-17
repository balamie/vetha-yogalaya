# Local Testing Guide

## Option 1: Two-Terminal Setup (Recommended)

### Terminal 1: Start the Worker
```powershell
cd "D:\Skills\Web Designing\projects\vetha-yogalaya\worker"
npm run dev
```

Wait for the message: `Ready on http://127.0.0.1:8787`

### Terminal 2: Start the Frontend
```powershell
cd "D:\Skills\Web Designing\projects\vetha-yogalaya"
npm run dev
```

Wait for the message: `Local: http://localhost:5174/`

### Test in Browser
1. Open http://localhost:5174
2. Scroll to the "Free Trial Class" section
3. Click on a date (Friday or Monday)
4. Fill in child details and submit
5. You should see a confirmation screen

---

## Option 2: Quick API Test (Without Frontend)

If you just want to test the Worker API directly:

### 1. Start the Worker
```powershell
cd "D:\Skills\Web Designing\projects\vetha-yogalaya\worker"
npm run dev
```

### 2. Test Health Check
Open in browser: http://localhost:8787/
Should show: `{"status":"ok"}`

### 3. Test Availability
Open in browser: http://localhost:8787/api/availability?date=2025-06-20
Should show: `{"date":"2025-06-20","booked":0,"remaining":15,"full":false}`

### 4. Test Booking (Use curl or Postman)
```bash
curl -X POST http://localhost:8787/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"child_name":"Test Child","child_age":7,"parent_phone":"9876543210","session_date":"2025-06-20"}'
```

### 5. Test Admin (With Basic Auth)
```bash
curl -u admin:testpassword123 http://localhost:8787/api/admin/bookings
```

---

## Troubleshooting

### Worker won't start
- Check if port 8787 is already in use: `netstat -ano | findstr :8787`
- Kill any process using that port: `taskkill /PID <PID> /F`

### Frontend can't connect to Worker
- Make sure both are running
- Check that .env has: `VITE_BOOKING_API_URL=http://localhost:8787`
- Check browser console for CORS errors

### D1 database errors
- Local D1 is stored in `.wrangler/state/` directory
- If corrupted, delete that directory and restart the Worker

---

## Admin Login Credentials (Local Testing)

For local testing, you can use:
- Username: `admin`
- Password: `testpassword123`

Note: These are just for local testing. In production, you'll set real credentials via `wrangler secret put`.
