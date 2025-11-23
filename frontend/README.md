# Inventory Management Frontend

React frontend for the inventory management application.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `frontend` directory:

```bash
cp .env.example .env
```

Or manually create `.env` with:

```bash
REACT_APP_API_BASE_URL="https://inventory-management-py4o.onrender.com/api"
```

If not set, it defaults to `https://inventory-management-py4o.onrender.com/api` (deployed backend).

### 3. Run the Application

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`.

## Features

- **Product List**: View all products in a table format
- **Search**: Real-time search with debouncing (250ms delay)
- **Category Filter**: Filter products by category
- **Inline Editing**: Edit products directly in the table
- **CSV Import**: Upload CSV files to import products
- **CSV Export**: Download all products as CSV
- **Inventory History**: View stock change history for each product

## CSV Import Format

The CSV file should have the following columns (in order):

```
name,unit,category,brand,stock,status,image
```

Example:
```
Product A,kg,Electronics,Brand X,100,Active,https://example.com/image.jpg
Product B,pieces,Clothing,Brand Y,50,Active,
```

- `name` is required and must be unique (case-insensitive)
- Duplicate names will be skipped during import
- Empty fields are allowed except for `name`

## Deployment

When deploying to Vercel, Netlify, or similar platforms:

**Important:** Set the `REACT_APP_API_BASE_URL` environment variable to the deployed backend URL in your hosting provider.

### Set Environment Variable

Set `REACT_APP_API_BASE_URL` to `https://inventory-management-py4o.onrender.com/api` in your hosting provider (Vercel/Netlify).

### Vercel

1. Connect your repository
2. Go to Settings → Environment Variables
3. Add environment variable: 
   - Name: `REACT_APP_API_BASE_URL`
   - Value: `https://inventory-management-py4o.onrender.com/api`
4. Deploy

### Netlify

1. Connect your repository
2. Go to Site settings → Environment variables
3. Add environment variable:
   - Key: `REACT_APP_API_BASE_URL`
   - Value: `https://inventory-management-py4o.onrender.com/api`
4. Build command: `npm run build`
5. Publish directory: `build`
6. Deploy

### Local Testing Before Deploy

```bash
cp .env.example .env
npm install
npm start
```

### Production Build

For production deploy: set env var `REACT_APP_API_BASE_URL=https://inventory-management-py4o.onrender.com/api` and trigger a build.

## Development Notes

- Uses Axios for API calls
- Implements optimistic updates for better UX
- Search is debounced to reduce API calls
- History sidebar slides in from the right
- Stock values are color-coded (green for > 0, red for 0)

