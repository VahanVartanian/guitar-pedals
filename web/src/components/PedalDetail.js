import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function PedalDetail() {
  const { id } = useParams();
  const [pedal, setPedal] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedal = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/pedals/${id}`);
        const data = await response.json();
        setPedal(data);
      } catch (error) {
        console.error('Error fetching pedal:', error);
      }
    };
    fetchPedal();
  }, [id]);

  const deletePedal = async () => {
    if (window.confirm('Are you sure you want to delete this pedal?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/pedals/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          alert('Pedal deleted successfully.');
          navigate('/');
        } else {
          alert('Error deleting pedal.');
        }
      } catch (error) {
        console.error('Error deleting pedal:', error);
      }
    }
  };

  if (!pedal) return <div>Loading...</div>;

  return (
    <div className="card">
      <h2>{pedal.name}</h2>
      {pedal.image && (
        <img src={`http://localhost:3001/uploads/${pedal.image}`} alt={pedal.name} />
      )}
      <p>{pedal.description}</p>
      <p>Price: ${pedal.price}</p>
      <p>Category: {pedal.category_id}</p>
      <div>
        <button onClick={deletePedal}>Delete Pedal</button>
        <Link to={`/edit/${pedal.id}`}>
          <button>Edit Pedal</button>
        </Link>
      </div>
      <br />
      <Link to="/">Back to List</Link>
    </div>
  );
}

export default PedalDetail;
