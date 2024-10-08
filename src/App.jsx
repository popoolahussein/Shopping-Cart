import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Home.jsx';
import Shop from './Shop.jsx';
import Cart from './Cart.jsx';
import Navbar from './Navbar.jsx';
import { CartContext } from './CartContext.jsx';

const App = () => {
    const { cartItems, setCartItems } = useContext(CartContext);
    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = () => {
            navigate('/');
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [navigate]);

    return (
        <div className="App">
            <Navbar cartItems={cartItems} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Shop" element={<Shop cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path="/Cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            </Routes>
        </div>
    );
};

export default App;
