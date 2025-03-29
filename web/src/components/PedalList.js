// src/components/PedalList.js
import React, { useState, useEffect } from 'react';
import CategoryCarousel from './CategoryCarousel';

function PedalList() {
  const [pedals, setPedals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch all pedals from the API
  const fetchPedals = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/pedals');
      const data = await response.json();
      setPedals(data);
    } catch (error) {
      console.error('Error fetching pedals:', error);
    }
  };

  // Fetch all categories from the API
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories');
      const data = await response.json();
      console.log('Fetched Categories:', data);
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchPedals();
  }, []);

  // If a category is selected from the dropdown, filter to that category only; otherwise, show all
  const filteredCategories = selectedCategory
    ? categories.filter((cat) => String(cat.id) === selectedCategory)
    : categories;

  return (
    <div>
      <h2>Guitar Pedals Collection</h2>
      {/* Dropdown Filter */}
      <div className="filter">
        <label htmlFor="categoryFilter">Filter by Category:</label>
        <select
          id="categoryFilter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {/* Display a carousel for each filtered category */}
      {filteredCategories.map((category) => {
        const filteredPedals = pedals.filter(
          (pedal) => pedal.category_id === category.id
        );
        if (filteredPedals.length === 0) return null;
        return (
          <CategoryCarousel
            key={category.id}
            category={category}
            pedals={filteredPedals}
          />
        );
      })}
    </div>
  );
}

export default PedalList;
