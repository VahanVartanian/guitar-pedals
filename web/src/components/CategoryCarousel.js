// src/components/CategoryCarousel.js
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';

const CategoryCarousel = ({ category, pedals }) => {
  const carouselRef = useRef(null);
  const [scrollInterval, setScrollInterval] = useState(null);

  // Auto-scroll on hover near edges with faster scrolling
  const handleMouseMove = (e) => {
    const container = carouselRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX;
    const threshold = 100; // pixels from the edge to trigger scrolling

    if (mouseX - rect.left < threshold) {
      // Near left edge: scroll left
      if (!scrollInterval) {
        const interval = setInterval(() => {
          container.scrollBy({ left: -15, behavior: 'smooth' });
        }, 20);
        setScrollInterval(interval);
      }
    } else if (rect.right - mouseX < threshold) {
      // Near right edge: scroll right
      if (!scrollInterval) {
        const interval = setInterval(() => {
          container.scrollBy({ left: 15, behavior: 'smooth' });
        }, 20);
        setScrollInterval(interval);
      }
    } else {
      if (scrollInterval) {
        clearInterval(scrollInterval);
        setScrollInterval(null);
      }
    }
  };

  const handleMouseLeave = () => {
    if (scrollInterval) {
      clearInterval(scrollInterval);
      setScrollInterval(null);
    }
  };

  // Manual scroll on button click for accessibility
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="category-carousel">
      <h3>{category.name}</h3>
      <div
        className="carousel-container"
        ref={carouselRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {pedals.map((pedal) => (
          <Tilt
            key={pedal.id}
            tiltMaxAngleX={10}
            tiltMaxAngleY={10}
            glareEnable={true}
            glareMaxOpacity={0.2}
            scale={1.05}
            transitionSpeed={250}
          >
            <div className="card">
              <Link to={`/pedals/${pedal.id}`}>
                <h4>{pedal.name}</h4>
              </Link>
              {pedal.image && (
                <img
                  src={`http://localhost:3001/uploads/${pedal.image}`}
                  alt={pedal.name}
                />
              )}
              <p>{pedal.description.substring(0, 100)}...</p>
            </div>
          </Tilt>
        ))}
      </div>
      {/* Navigation buttons for accessibility */}
      <div className="carousel-controls">
        <button className="carousel-button" onClick={scrollLeft}>‹</button>
        <button className="carousel-button" onClick={scrollRight}>›</button>
      </div>
    </div>
  );
};

export default CategoryCarousel;
