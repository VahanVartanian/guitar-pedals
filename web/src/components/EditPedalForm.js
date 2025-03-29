import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditPedalForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedal, setPedal] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPedal = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/pedals/${id}`);
        const data = await response.json();
        setPedal(data);
        setName(data.name);
        setDescription(data.description);
        setPrice(data.price);
        setCategoryId(data.category_id);
      } catch (error) {
        console.error('Error fetching pedal:', error);
      }
    };
    fetchPedal();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('category_id', categoryId);
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await fetch(`http://localhost:3001/api/pedals/${id}`, {
        method: 'PUT',
        body: formData
      });
      if (response.ok) {
        alert('Pedal updated successfully!');
        navigate(`/pedals/${id}`);
      } else {
        alert('Failed to update pedal.');
      }
    } catch (error) {
      console.error('Error updating pedal:', error);
    }
  };

  if (!pedal) return <div>Loading...</div>;

  return (
    <div className="form-container">
      <h2>Edit Pedal</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          id="price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <label htmlFor="category">Category:</label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label htmlFor="image">Image:</label>
        <input
          id="image"
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <button type="submit">Update Pedal</button>
      </form>
    </div>
  );
}

export default EditPedalForm;
