import React, { useState } from 'react';
import api from '../api.js';

const AddProductModal = ({ isOpen, onClose, onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    unit: '',
    category: '',
    brand: '',
    stock: 0,
    status: '',
    image: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'stock' ? parseInt(value) || 0 : value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name.trim()) {
      setError('Product name is required');
      return;
    }
    
    if (formData.stock < 0) {
      setError('Stock must be non-negative');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      console.log('Sending product data:', formData);
      const response = await api.post('/products', {
        ...formData,
        changedBy: 'user',
      });
      console.log('Product created successfully:', response.data);

      // Reset form
      setFormData({
        name: '',
        unit: '',
        category: '',
        brand: '',
        stock: 0,
        status: '',
        image: '',
      });

      if (onProductAdded) {
        onProductAdded(response.data);
      }
      
      onClose();
    } catch (err) {
      console.error('Error creating product:', err);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to create product';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      unit: '',
      category: '',
      brand: '',
      stock: 0,
      status: '',
      image: '',
    });
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={handleClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0 }}>Add New Product</h2>
          <button
            onClick={handleClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#666',
            }}
          >
            ×
          </button>
        </div>

        {error && (
          <div
            style={{
              padding: '0.75rem',
              marginBottom: '1rem',
              backgroundColor: '#fee',
              color: '#c33',
              borderRadius: '4px',
              border: '1px solid #fcc',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Product Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Unit
            </label>
            <input
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              placeholder="e.g., kg, pieces, liters"
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g., Electronics, Clothing"
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Stock
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Status
            </label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              placeholder="e.g., Active, Inactive"
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              style={{
                width: '100%',
                padding: '0.5rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={handleClose}
              style={{
                padding: '0.5rem 1.5rem',
                fontSize: '1rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
                backgroundColor: 'white',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                padding: '0.5rem 1.5rem',
                fontSize: '1rem',
                border: 'none',
                borderRadius: '4px',
                backgroundColor: '#007bff',
                color: 'white',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                opacity: isSubmitting ? 0.6 : 1,
              }}
            >
              {isSubmitting ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;

