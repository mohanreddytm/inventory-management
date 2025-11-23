# Inventory Management Frontend

React frontend for the inventory management application.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `frontend` directory (optional for local development):

```bash
REACT_APP_API_BASE_URL=http://localhost:4000/api
```

If not set, it defaults to `http://localhost:4000/api`.

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

1. Set the `REACT_APP_API_BASE_URL` environment variable to your deployed backend URL
   - Example: `https://your-backend.railway.app/api`
2. Build the app: `npm run build`
3. Deploy the `build` folder

### Vercel

1. Connect your repository
2. Set environment variable: `REACT_APP_API_BASE_URL`
3. Deploy

### Netlify

1. Connect your repository
2. Build command: `npm run build`
3. Publish directory: `build`
4. Add environment variable: `REACT_APP_API_BASE_URL`

## Development Notes

- Uses Axios for API calls
- Implements optimistic updates for better UX
- Search is debounced to reduce API calls
- History sidebar slides in from the right
- Stock values are color-coded (green for > 0, red for 0)

