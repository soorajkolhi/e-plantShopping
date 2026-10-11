import React, { useState } from 'react';
import ProductList from './ProductList.jsx';
import AboutUs from './AboutUs.jsx';

function App() {
  const [showProductList, setShowProductList] = useState(false);

  return (
    <div className="app-container">
      <div className={`landing-page background-image ${showProductList ? "fade-out" : ""}`}
           style={{ display: showProductList ? 'none' : 'flex' }}>
        <div className="landing-content">
          <h1>Welcome To Paradise Nursery</h1>
          <p className="tagline">Where Green Meets Serenity</p>
          <button className="get-started-button" onClick={() => setShowProductList(true)}>
            Get Started
          </button>
        </div>
        <div className="aboutus-container">
          <AboutUs />
        </div>
      </div>
      {showProductList && <ProductList onHomeClick={() => setShowProductList(false)} />}
    </div>
  );
}

export default App;
