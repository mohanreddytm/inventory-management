import prisma from '../db.js';

// Create a new product
export const createProduct = async (req, res) => {
  try {
    console.log('Create product request received:', req.body);
    const { name, unit, category, brand, stock, status, image } = req.body;
    
    // Validate required fields
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    if (stock !== undefined && (isNaN(stock) || stock < 0)) {
      return res.status(400).json({ error: 'Stock must be a non-negative integer' });
    }
    
    // Check if name already exists (case-insensitive)
    const existingProduct = await prisma.product.findFirst({
      where: {
        name: {
          equals: name.trim(),
          mode: 'insensitive',
        },
      },
    });
    
    if (existingProduct) {
      return res.status(400).json({ error: 'Product name already exists' });
    }
    
    // Create product
    const newProduct = await prisma.product.create({
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
    
    // Log initial stock if it's greater than 0
    if (newProduct.stock > 0) {
      await prisma.inventoryLog.create({
        data: {
          productId: newProduct.id,
          oldStock: 0,
          newStock: newProduct.stock,
          changedBy: req.body.changedBy || 'system',
        },
      });
    }
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Product name already exists' });
    }
    res.status(500).json({ error: error.message || 'Failed to create product' });
  }
};

// Get all products with optional category filter
export const getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const where = category ? { category } : {};
    
    const products = await prisma.product.findMany({
      where,
      orderBy: { name: 'asc' },
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search products by name (case-insensitive partial match)
export const searchProducts = async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name || name.trim() === '') {
      return res.json([]);
    }
    
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
      orderBy: { name: 'asc' },
    });
    
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, unit, category, brand, stock, status, image } = req.body;
    
    // Validate required fields
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Name is required' });
    }
    
    if (stock !== undefined && (isNaN(stock) || stock < 0)) {
      return res.status(400).json({ error: 'Stock must be a non-negative integer' });
    }
    
    // Check if name is already taken by another product
    const existingProduct = await prisma.product.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
        NOT: {
          id: parseInt(id),
        },
      },
    });
    
    if (existingProduct) {
      return res.status(400).json({ error: 'Product name already exists' });
    }
    
    // Get current product to check stock change
    const currentProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
    });
    
    if (!currentProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    const oldStock = currentProduct.stock;
    const newStock = stock !== undefined ? parseInt(stock) : oldStock;
    
    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id: parseInt(id) },
      data: {
        name: name.trim(),
        unit: unit || null,
        category: category || null,
        brand: brand || null,
        stock: newStock,
        status: status || null,
        image: image || null,
      },
    });
    
    // Log inventory change if stock changed
    if (oldStock !== newStock) {
      await prisma.inventoryLog.create({
        data: {
          productId: parseInt(id),
          oldStock,
          newStock,
          changedBy: req.body.changedBy || 'system',
        },
      });
    }
    
    res.json(updatedProduct);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

// Get inventory history for a product
export const getProductHistory = async (req, res) => {
  try {
    const { id } = req.params;
    
    const logs = await prisma.inventoryLog.findMany({
      where: { productId: parseInt(id) },
      orderBy: { timestamp: 'desc' },
    });
    
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

