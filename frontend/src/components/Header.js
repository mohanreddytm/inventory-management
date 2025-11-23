import React, { useState } from 'react';

const Header = ({ onSearch, onCategoryFilter, categories, onImport, onExport, onAddNew }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (onSearch) {
        onSearch(searchTerm);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (onCategoryFilter) {
      onCategoryFilter(category);
    }
  };

  return (
    <header style={{ padding: '1rem', borderBottom: '1px solid #ddd', marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flex: 1 }}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem', fontSize: '1rem', flex: 1, maxWidth: '300px' }}
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={onImport} style={{ padding: '0.5rem 1rem' }}>
            Import CSV
          </button>
          <button onClick={onExport} style={{ padding: '0.5rem 1rem' }}>
            Export CSV
          </button>
          <button onClick={onAddNew} style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none' }}>
            Add New Product
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

