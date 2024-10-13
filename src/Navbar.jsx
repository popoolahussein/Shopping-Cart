import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
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
