import React, { useEffect, useState } from 'react';
import api from '../api.js';

const HistorySidebar = ({ product, isOpen, onClose }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && product) {
      setLoading(true);
      api
        .get(`/products/${product.id}/history`)
        .then((response) => {
          setHistory(response.data);
        })
        .catch((error) => {
          console.error('Failed to fetch history:', error);
          alert('Failed to load history');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isOpen, product]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        right: 0,
        top: 0,
        width: '400px',
        height: '100vh',
        backgroundColor: 'white',
        boxShadow: '-2px 0 8px rgba(0,0,0,0.1)',
        zIndex: 1000,
        padding: '1rem',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>Inventory History - {product?.name}</h2>
        <button onClick={onClose} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}>
          ×
        </button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : history.length === 0 ? (
        <div>No history available</div>
      ) : (
        <div>
          {history.map((log) => (
            <div
              key={log.id}
              style={{
                padding: '1rem',
                marginBottom: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '4px',
              }}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>
                {new Date(log.timestamp).toLocaleString()}
              </div>
              <div>
                Stock: <span style={{ color: 'red' }}>{log.oldStock}</span> →{' '}
                <span style={{ color: 'green' }}>{log.newStock}</span>
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginTop: '0.25rem' }}>
                Changed by: {log.changedBy}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistorySidebar;

