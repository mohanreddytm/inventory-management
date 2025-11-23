import React, { useState, useEffect } from 'react';
import api from './api.js';
import Header from './components/Header.js';
import ProductTable from './components/ProductTable.js';
import HistorySidebar from './components/HistorySidebar.js';
import AddProductModal from './components/AddProductModal.js';
import './styles.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Update filtered products when products, search, or category change
  useEffect(() => {
    let filtered = searchResults !== null ? searchResults : products;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchResults, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data);
      setSearchResults(null);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      alert('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchTerm) => {
    if (!searchTerm.trim()) {
      setSearchResults(null);
      return;
    }

    try {
      const response = await api.get(`/products/search?name=${encodeURIComponent(searchTerm)}`);
      setSearchResults(response.data);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
  };

  const handleProductUpdate = (updatedProduct) => {
    setProducts((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    if (searchResults) {
      setSearchResults((prev) => prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)));
    }
  };

  const handleProductAdded = (newProduct) => {
    setProducts((prev) => [...prev, newProduct].sort((a, b) => a.name.localeCompare(b.name)));
    // Clear search and filters to show the new product
    setSearchResults(null);
    setSelectedCategory('');
  };

  const handleViewHistory = (product) => {
    setSelectedProduct(product);
    setIsHistoryOpen(true);
  };

  const handleImportComplete = () => {
    fetchProducts();
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/products/export', {
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'products.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to export CSV');
    }
  };

  // Get unique categories
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))].sort();

  return (
    <div className="app">
      <Header
        onSearch={handleSearch}
        onCategoryFilter={handleCategoryFilter}
        categories={categories}
        onImport={() => {
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = '.csv';
          fileInput.onchange = async (e) => {
            const selectedFile = e.target.files[0];
            if (!selectedFile) return;

            const form = new FormData();
            form.append("csvFile", selectedFile); // name must match multer field

            try {
              const response = await api.post("/products/import", form, {
                headers: { "Content-Type": "multipart/form-data" }
              });

              const { added, skipped, duplicates } = response.data;
              let message = `Import complete!\nAdded: ${added}\nSkipped: ${skipped}`;
              if (duplicates && duplicates.length > 0) {
                message += `\nDuplicates: ${duplicates.join(', ')}`;
              }
              alert(message);
              fetchProducts();
            } catch (error) {
              alert(error.response?.data?.error || 'Failed to import CSV');
            }
          };
          fileInput.click();
        }}
        onExport={handleExport}
        onAddNew={() => setIsAddModalOpen(true)}
      />

      <main style={{ padding: '1rem' }}>
        {loading ? (
          <div>Loading products...</div>
        ) : (
          <ProductTable
            products={filteredProducts}
            onUpdate={handleProductUpdate}
            onViewHistory={handleViewHistory}
          />
        )}
      </main>

      <HistorySidebar
        product={selectedProduct}
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onProductAdded={handleProductAdded}
      />
    </div>
  );
}

export default App;

