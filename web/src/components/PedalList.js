// src/components/PedalList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PedalList() {
  // State for pedals and filter
  const [pedals, setPedals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  // Fetch pedals with optional filtering by category
  const fetchPedals = async () => {
    try {
      // Append query parameter if a category is selected
      const url = `http://localhost:3001/api/pedals${selectedCategory ? `?category_id=${selectedCategory}` : ''}`;
      const response = await fetch(url);
      const data = await response.json();
      setPedals(data);
    } catch (error) {
      console.error('Error fetching pedals:', error);
    }
  };

  // Fetch categories for the filtering dropdown
  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch pedals whenever the selected category changes
  useEffect(() => {
    fetchPedals();
  }, [selectedCategory]);

  // Fetch categories once on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <h2>Guitar Pedals</h2>

      {/* Filtering Component */}
      <div>
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

      {/* Pedals List */}
      <ul>
        {pedals.map((pedal) => (
          <li key={pedal.id}>
            {/* Link to the detail page */}
            <Link to={`/pedals/${pedal.id}`}>
              <h3>{pedal.name}</h3>
            </Link>
            <p>{pedal.description.substring(0, 100)}...</p>
            {pedal.image && (
              <img
                src={`http://localhost:3001/uploads/${pedal.image}`}
                alt={pedal.name}
                width="100"
              />
            )}
          </li>
        ))}
      </ul>

      {/* Link to Add New Pedal */}
      <Link to="/add">Add New Pedal</Link>
    </div>
  );
}

export default PedalList;
