import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ cartItems }) => {
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

Navbar.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Navbar;
