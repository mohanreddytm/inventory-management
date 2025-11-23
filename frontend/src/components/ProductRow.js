import React, { useState } from 'react';
import api from '../api.js';

const ProductRow = ({ product, onUpdate, onViewHistory }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    unit: product.unit || '',
    category: product.category || '',
    brand: product.brand || '',
    stock: product.stock,
    status: product.status || '',
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'stock' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSave = async () => {
    // Validation
    if (!formData.name.trim()) {
      alert('Name is required');
      return;
    }
    if (formData.stock < 0) {
      alert('Stock must be non-negative');
      return;
    }

    setIsSaving(true);
    try {
      const updated = await api.put(`/products/${product.id}`, {
        ...formData,
        changedBy: 'user',
      });
      onUpdate(updated.data);
      setIsEditing(false);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to update product');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: product.name,
      unit: product.unit || '',
      category: product.category || '',
      brand: product.brand || '',
      stock: product.stock,
      status: product.status || '',
    });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <tr>
        <td>
          {product.image && (
            <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
          )}
        </td>
        <td>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.25rem' }}
          />
        </td>
        <td>
          <input
            type="text"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.25rem' }}
          />
        </td>
        <td>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.25rem' }}
          />
        </td>
        <td>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.25rem' }}
          />
        </td>
        <td>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            min="0"
            style={{ width: '100%', padding: '0.25rem' }}
          />
        </td>
        <td>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            style={{ width: '100%', padding: '0.25rem' }}
          />
        </td>
        <td>
          <button onClick={handleSave} disabled={isSaving} style={{ marginRight: '0.5rem' }}>
            {isSaving ? 'Saving...' : 'Save'}
          </button>
          <button onClick={handleCancel}>Cancel</button>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        {product.image && (
          <img src={product.image} alt={product.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
        )}
      </td>
      <td>{product.name}</td>
      <td>{product.unit || '-'}</td>
      <td>{product.category || '-'}</td>
      <td>{product.brand || '-'}</td>
      <td>
        <span style={{ color: product.stock > 0 ? 'green' : 'red', fontWeight: 'bold' }}>
          {product.stock}
        </span>
      </td>
      <td>{product.status || '-'}</td>
      <td>
        <button onClick={() => setIsEditing(true)} style={{ marginRight: '0.5rem' }}>
          Edit
        </button>
        <button onClick={() => onViewHistory(product)}>History</button>
      </td>
    </tr>
  );
};

export default ProductRow;

