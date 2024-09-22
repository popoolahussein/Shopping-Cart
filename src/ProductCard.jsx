import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductCard = ({ product, cartItems, setCartItems }) => {
  const existingItem = cartItems.find((item) => item.id === product.id);
  const quantity = existingItem ? existingItem.quantity : 0;

  const updateCart = (newQuantity) => {
    let updatedCartItems;

    if (newQuantity > 0) {
      updatedCartItems = existingItem
        ? cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: newQuantity } : item
          )
        : [...cartItems, { ...product, quantity: newQuantity }];
    } else {
      updatedCartItems = cartItems.filter((item) => item.id !== product.id);
    }

    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  const incrementQuantity = () => {
    updateCart(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      updateCart(quantity - 1);
    }
  };

  return (
    <div className="product-card">
      <img className='product-card-img' src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <div className="quantity-control">
        <button
          className='decrement-button'
          onClick={decrementQuantity}
          disabled={quantity === 0}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className='increment-button'
          onClick={incrementQuantity}
        >
          +
        </button>
      </div>
      <button className='go-to-cart'>
        <Link className="Navbar-ul-li-a" to="/cart">Go to Cart</Link>
      </button>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  setCartItems: PropTypes.func.isRequired,
};

export default ProductCard;
