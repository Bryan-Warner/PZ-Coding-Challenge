import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'; // Make sure your CSS file is correctly imported

function App() {
  const [cheeses, setCheeses] = useState([]);
  const [selectedCheeseId, setSelectedCheeseId] = useState(null);
  const [weight, setWeight] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:3000/api/cheeses') 
      .then(response => {
        setCheeses(response.data);
      })
      .catch(error => console.error('Error fetching cheeses:', error));
  }, []);

  const handleCheeseSelection = (event) => {
    setSelectedCheeseId(parseInt(event.target.value, 10));
  };

  const handleWeightChange = (event) => {
    setWeight(event.target.value);
  };

  const calculateTotal = () => {
    const cheese = cheeses.find(cheese => cheese.id === selectedCheeseId);
    if (cheese && weight > 0) {
      setTotalPrice((cheese.pricePerKilo * weight).toFixed(2));
    } else {
      setTotalPrice(0);
    }
  };

  return (
    <div className="app">
      <div className="content-wrapper">
        <nav className="navbar">
          <h1>PZ Cheeseria</h1>
          <ul className="nav-links">
            <li><a href="#catalog">Catalog</a></li>
            <li><a href="#calculator">Calculator</a></li>
          </ul>
        </nav>
        
        <main className="main-content">
          <section id="catalog" className="cheese-gallery">
            <h2>Cheese Catalog</h2>
            {cheeses.map(cheese => (
              <div key={cheese.id} className="cheese-card" onClick={() => setSelectedCheeseId(cheese.id)}>
              <img src={`http://localhost:3000${cheese.imageURL}`} alt={cheese.name} className="cheese-image" />


                <div className="cheese-info">
                  <h3>{cheese.name}</h3>
                  <p>{cheese.color} - ${cheese.pricePerKilo}/kg</p>
                </div>
              </div>
            ))}
          </section>
          <section id="calculator" className="calculator">
            <h2>Cheese Calculator</h2>
            <div>
              <label htmlFor="selected-cheese">Choose a cheese:</label>
              <select id="selected-cheese" value={selectedCheeseId || ''} onChange={handleCheeseSelection}>
                <option value="">Select a cheese</option>
                {cheeses.map(cheese => (
                  <option key={cheese.id} value={cheese.id}>{cheese.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="weight">Weight (kg):</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={handleWeightChange}
                placeholder="Enter weight in kilos"
                min="0"
              />
              <button onClick={calculateTotal} className="calculate-button">Calculate</button>
              <p className="total-price">Total Price: ${totalPrice}</p>
            </div>
          </section>
        </main>
      </div>
      <footer className="footer">
        <p>© 2024 PZ Cheeseria. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
