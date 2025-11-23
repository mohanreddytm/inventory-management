import React from 'react';
import ProductRow from './ProductRow.js';

const ProductTable = ({ products, onUpdate, onViewHistory }) => {
  if (products.length === 0) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>No products found</div>;
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f5f5f5' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Image</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Name</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Unit</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Category</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Brand</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Stock</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow
              key={product.id}
              product={product}
              onUpdate={onUpdate}
              onViewHistory={onViewHistory}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;

