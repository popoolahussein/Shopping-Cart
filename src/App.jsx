import { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Shop from './Shop';
import Cart from './Cart';
import Navbar from './Navbar';
import { CartContext } from './CartContext';

const App = () => {
  const { cartItems, setCartItems } = useContext(CartContext);

  return (
    <Router>
      <div className="App">
        <Navbar cartItems={cartItems} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop cartItems={cartItems} setCartItems={setCartItems} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
