import React, { useRef } from 'react';
import api from '../api.js';

const ImportExport = ({ onImportComplete }) => {
  const fileInputRef = useRef(null);

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const response = await api.post('/products/import', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const { added, skipped, duplicates } = response.data;
      let message = `Import complete!\nAdded: ${added}\nSkipped: ${skipped}`;
      if (duplicates && duplicates.length > 0) {
        message += `\nDuplicates: ${duplicates.join(', ')}`;
      }
      alert(message);

      if (onImportComplete) {
        onImportComplete();
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to import CSV');
    } finally {
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleExport = async () => {
    try {
      const response = await api.get('/products/export', {
        responseType: 'blob',
      });

      // Create blob and download
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

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        accept=".csv"
        onChange={handleImport}
        style={{ display: 'none' }}
      />
      <button onClick={() => fileInputRef.current?.click()}>Import CSV</button>
      <button onClick={handleExport}>Export CSV</button>
    </>
  );
};

export default ImportExport;

