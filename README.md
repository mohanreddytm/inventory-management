# Inventory Management App

Full-stack inventory management application with React frontend and Node.js/Express backend using PostgreSQL (Neon) via Prisma ORM.

## Project Structure

```
inventory-management-app/
├── backend/          # Node.js + Express + Prisma backend
├── frontend/         # React frontend
└── README.md         # This file
```

## Features

- ✅ Product list with search and category filtering
- ✅ Inline product editing
- ✅ CSV import/export functionality
- ✅ Inventory change history logging
- ✅ Real-time search with debouncing
- ✅ Responsive design

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Neon PostgreSQL database account

### Step 1: Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create `.env` file from example:
   ```bash
   cp .env.example .env
   ```

3. **IMPORTANT**: Open `backend/.env` and replace `NEON_DATABASE_URL_HERE` with your actual Neon database connection string:
   ```
   DATABASE_URL="postgresql://your-actual-neon-connection-string-here"
   PORT=4000
   ```

4. Install dependencies:
   ```bash
   npm install
   ```

5. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

6. Initialize database schema:
   ```bash
   npx prisma migrate dev --name init
   ```
   
   Or if you prefer to push without migrations:
   ```bash
   npx prisma db push
   ```

7. Start the backend server:
   ```bash
   npm run dev
   ```

   The backend will run on `http://localhost:4000`

### Step 2: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. (Optional) Create `.env` file for custom API URL:
   ```bash
   echo "REACT_APP_API_BASE_URL=http://localhost:4000/api" > .env
   ```

4. Start the frontend development server:
   ```bash
   npm start
   ```

   The frontend will open at `http://localhost:3000`

## Pre-Deployment Checklist

Before deploying, ensure you've completed:

- [ ] Filled `backend/.env` with your Neon database connection string
- [ ] Ran `cd backend && npm install && npx prisma generate && npx prisma migrate dev --name init && npm run dev`
- [ ] Ran `cd frontend && npm install && npm start`
- [ ] Tested import/export functionality end-to-end
- [ ] Verified search and filter features work correctly
- [ ] Tested inline editing and history viewing

## Deployment

### Backend Deployment (Render/Railway/Fly.io)

1. Connect your repository
2. Set environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `PORT`: (optional, defaults to 4000)
3. Build commands:
   ```bash
   npm install
   npx prisma generate
   npx prisma migrate deploy
   ```
4. Start command: `npm start`

### Frontend Deployment (Vercel/Netlify)

1. Connect your repository
2. Set environment variable:
   - `REACT_APP_API_BASE_URL`: Your deployed backend URL (e.g., `https://your-backend.railway.app/api`)
3. Build command: `npm run build`
4. Publish directory: `build`

## API Endpoints

### Products
- `GET /api/products` - Get all products (optional `?category=CategoryName`)
- `GET /api/products/search?name=abc` - Search products by name
- `PUT /api/products/:id` - Update a product
- `GET /api/products/:id/history` - Get inventory history

### Import/Export
- `POST /api/products/import` - Import products from CSV
- `GET /api/products/export` - Export all products as CSV

## Database Schema

- **Product**: id, name (unique), unit, category, brand, stock, status, image
- **InventoryLog**: id, productId, oldStock, newStock, changedBy, timestamp

## CSV Import Format

CSV files should have the following header row:
```
name,unit,category,brand,stock,status,image
```

Duplicate product names (case-insensitive) will be skipped during import.

## Development Notes

- Backend uses ES modules (`"type": "module"` in package.json)
- Frontend uses Create React App
- All API routes are under `/api`
- CORS is enabled for frontend integration
- Stock changes are automatically logged in InventoryLog

## Troubleshooting

### Database Connection Issues

If you encounter Prisma connection errors:
1. Verify your `DATABASE_URL` in `backend/.env` is correct
2. Ensure your Neon database is accessible
3. Check that SSL mode is set correctly in the connection string

### Frontend Can't Connect to Backend

1. Ensure backend is running on port 4000
2. Check `REACT_APP_API_BASE_URL` environment variable
3. Verify CORS is enabled in backend

## License

ISC

