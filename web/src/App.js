// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PedalList from './components/PedalList';
import PedalDetail from './components/PedalDetail';
import AddPedalForm from './components/AddPedalForm';
import EditPedalForm from './components/EditPedalForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <h1>Guitar Pedals Collection</h1>
        </header>
        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/add">Add Pedal</Link>
        </nav>
        <main className="container">
          <Routes>
            <Route path="/" element={<PedalList />} />
            <Route path="/pedals/:id" element={<PedalDetail />} />
            <Route path="/add" element={<AddPedalForm />} />
            <Route path="/edit/:id" element={<EditPedalForm />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} Guitar Pedals Collection</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
