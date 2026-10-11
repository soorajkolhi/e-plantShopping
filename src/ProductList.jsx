import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';

const img = (label) =>
  `https://placehold.co/200x200/2e7d32/ffffff/png?text=${encodeURIComponent(label)}`;
const plant = (name, cost, description) => ({ name, cost, description, image: img(name) });

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      plant('Snake Plant', 15, 'Produces oxygen at night, improving air quality.'),
      plant('Spider Plant', 12, 'Filters formaldehyde and xylene from the air.'),
      plant('Peace Lily', 18, 'Removes mold spores and purifies the air.'),
      plant('Boston Fern', 20, 'Adds humidity and removes toxins.'),
      plant('Rubber Plant', 17, 'Easy to grow and great at cleaning indoor air.'),
      plant('Aloe Vera', 14, 'Purifies air and its gel soothes burns.'),
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      plant('Lavender', 20, 'Calming scent that promotes relaxation.'),
      plant('Jasmine', 18, 'Sweet fragrance that uplifts the mood.'),
      plant('Rosemary', 15, 'Fresh aroma, also great for cooking.'),
      plant('Mint', 12, 'Refreshing scent that repels insects.'),
      plant('Lemon Balm', 14, 'Citrus scent that reduces stress.'),
      plant('Gardenia', 22, 'Large creamy flowers with a rich perfume.'),
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      plant('ZZ Plant', 25, 'Thrives on neglect and low light.'),
      plant('Pothos', 10, 'Fast-growing trailing vine, very forgiving.'),
      plant('Cast Iron Plant', 19, 'Nearly indestructible, tolerates shade.'),
      plant('Jade Plant', 13, 'Succulent that needs minimal watering.'),
      plant('Dracaena', 21, 'Tall, elegant and easy to care for.'),
      plant('Chinese Evergreen', 16, 'Handles low light and irregular watering.'),
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand" onClick={onHomeClick}>
          <span className="brand-name">Paradise Nursery</span>
        </div>
        <div className="navbar-links">
          <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>Home</a>
          <a href="#" onClick={(e) => { e.preventDefault(); setShowCart(false); }}>Plants</a>
          <a href="#" className="cart-link" onClick={(e) => { e.preventDefault(); setShowCart(true); }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="40" height="40">
              <rect width="156" height="156" fill="none"></rect>
              <circle cx="80" cy="216" r="12"></circle>
              <circle cx="184" cy="216" r="12"></circle>
              <path d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                fill="none" stroke="#faf9f9" strokeLinecap="round" strokeLinejoin="round" strokeWidth="14"></path>
            </svg>
            <span className="cart_quantity_count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((cat) => (
            <div key={cat.category}>
              <h1 className="category-title">{cat.category}</h1>
              <div className="product-list">
                {cat.plants.map((p) => (
                  <div className="product-card" key={p.name}>
                    <img className="product-image" src={p.image} alt={p.name} />
                    <div className="product-title">{p.name}</div>
                    <div className="product-description">{p.description}</div>
                    <div className="product-price">${p.cost}</div>
                    <button
                      className="product-button"
                      disabled={isInCart(p.name)}
                      onClick={() => dispatch(addItem(p))}
                    >
                      {isInCart(p.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
