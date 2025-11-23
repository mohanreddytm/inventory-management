# Inventory Management Backend

Backend API for the inventory management application built with Node.js, Express, and Prisma ORM.

## Setup Instructions

### 1. Environment Configuration

Create a `.env` file from the example:

```bash
cp .env.example .env
```

**Important:** Open `backend/.env` and replace `NEON_DATABASE_URL_HERE` with your actual Neon database connection string:

```
DATABASE_URL="postgresql://your-actual-neon-connection-string-here"
PORT=4000
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Prisma Setup

Generate Prisma Client:

```bash
npx prisma generate
```

Initialize the database schema:

```bash
npx prisma migrate dev --name init
```

Alternatively, if you want to push the schema without creating migrations:

```bash
npx prisma db push
```

### 4. Run the Server

Development mode (with auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server will run on `http://localhost:4000` (or the PORT specified in `.env`).

## API Endpoints

### Products

- `GET /api/products` - Get all products (optional `?category=CategoryName` query param)
- `GET /api/products/search?name=abc` - Search products by name (case-insensitive partial match)
- `PUT /api/products/:id` - Update a product
- `GET /api/products/:id/history` - Get inventory change history for a product

### Import/Export

- `POST /api/products/import` - Upload CSV file to import products (multipart/form-data, field name: `csvFile`)
- `GET /api/products/export` - Download all products as CSV file

## Database

This project uses PostgreSQL via Neon and Prisma ORM. The schema includes:

- **Product**: id, name (unique), unit, category, brand, stock, status, image
- **InventoryLog**: id, productId, oldStock, newStock, changedBy, timestamp

## Development Notes

- All routes are under `/api`
- CORS is enabled for frontend integration
- CSV import checks for duplicate names (case-insensitive) and skips them
- Stock changes are automatically logged in the InventoryLog table

## Testing

Basic test stubs are available in the `test` directory. Run tests with:

```bash
npm test
```

## Deployment

When deploying to services like Render, Railway, or Fly.io:

1. Set the `DATABASE_URL` environment variable to your Neon connection string
2. Set the `PORT` environment variable (if different from 4000)
3. Run `npx prisma generate` and `npx prisma migrate deploy` during build
4. Start the server with `npm start`

