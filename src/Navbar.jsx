import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CartContext } from './CartContext.jsx';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className='Navbar'>
      <h1>My Shop</h1>
      <ul className='Navbar-ul'>
        <li className='Navbar-li'><Link className="Navbar-ul-li-a" to="/">Home</Link></li>
        <li className='Navbar-li'><Link className="Navbar-ul-li-a" to="/shop">Shop</Link></li>
        <li className='Navbar-li'><Link className="Navbar-ul-li-a" to="/cart">Cart ({totalItems})</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
