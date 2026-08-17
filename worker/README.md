# Local Development Setup

## Quick Start

Open two terminals:

### Terminal 1: Start the Worker (port 8787)
```bash
cd worker
npm run dev
```

### Terminal 2: Start the Frontend (port 5174)
```bash
cd ..
npm run dev
```

## Testing the Booking System

1. Open http://localhost:5174 in your browser
2. Scroll to the "Free Trial Class" section
3. Click on a date (Friday or Monday)
4. Fill in child details and submit
5. You should see a confirmation screen

## Testing Admin (with Basic Auth)

1. Open http://localhost:5174/admin/bookings in your browser
2. Enter credentials:
   - Username: admin
   - Password: testpassword123
3. You should see the bookings table (empty at first)

## Manual API Testing

### Check availability
```bash
curl http://localhost:8787/api/availability?date=2025-06-20
```

### Create a booking
```bash
curl -X POST http://localhost:8787/api/bookings \
  -H "Content-Type: application/json" \
  -d '{"child_name":"Test Child","child_age":7,"parent_phone":"9876543210","session_date":"2025-06-20"}'
```

### List bookings (admin)
```bash
curl -u admin:testpassword123 http://localhost:8787/api/admin/bookings
```

## Troubleshooting

- If the Worker fails to start, make sure port 8787 is not in use
- If the frontend can't reach the Worker, check that VITE_BOOKING_API_URL is set correctly in .env
- For local D1, wrangler dev automatically creates a local database in .wrangler/state/
