import prisma from '../db.js';
import { parse } from 'csv-parse/sync';
import { stringify } from 'csv-stringify/sync';

// Import products from CSV
export const importProducts = async (req, res) => {
  try {
    console.log("File received:", req.file);
    
    if (!req.file) {
      return res.status(400).json({ error: 'No CSV file uploaded' });
    }
    
    const fileBuffer = req.file.buffer.toString('utf-8');
    
    // Parse CSV
    const records = parse(fileBuffer, {
      columns: true,
      skip_empty_lines: true,
      trim: true,
    });
    
    let added = 0;
    let skipped = 0;
    const duplicates = [];
    
    for (const record of records) {
      const { name, unit, category, brand, stock, status, image } = record;
      
      // Validate required field
      if (!name || name.trim() === '') {
        skipped++;
        continue;
      }
      
      // Check for duplicate (case-insensitive)
      const existing = await prisma.product.findFirst({
        where: {
          name: {
            equals: name.trim(),
            mode: 'insensitive',
          },
        },
      });
      
      if (existing) {
        duplicates.push(name);
        skipped++;
        continue;
      }
      
      // Insert new product
      try {
        await prisma.product.create({
          data: {
            name: name.trim(),
            unit: unit || null,
            category: category || null,
            brand: brand || null,
            stock: parseInt(stock) || 0,
            status: status || null,
            image: image || null,
          },
        });
        added++;
      } catch (error) {
        skipped++;
      }
    }
    
    res.json({
      added,
      skipped,
      duplicates: duplicates.length > 0 ? duplicates : undefined,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export all products as CSV
export const exportProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: { name: 'asc' },
    });
    
    // Convert to CSV format
    const csvData = stringify(products, {
      header: true,
      columns: ['name', 'unit', 'category', 'brand', 'stock', 'status', 'image'],
    });
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
    res.send(csvData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

