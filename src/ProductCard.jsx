import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const ProductCard = ({ product, cartItems, setCartItems }) => {
  const existingItem = cartItems.find((item) => item.id === product.id);
  const [quantity, setQuantity] = useState(existingItem ? existingItem.quantity : 0);

  const updateLocalStorage = (updatedCartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

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
    updateLocalStorage(updatedCartItems); // Update localStorage
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart(newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateCart(newQuantity);
    }
  };

  const addToCart = () => {
    setQuantity(1);
    updateCart(1);
  };

  useEffect(() => {
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (savedCartItems.length > 0) {
      setCartItems(savedCartItems);
    }
  }, [setCartItems]);

  return (
    <div className="product-card">
      <img className='product-card-img' src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>

      {quantity === 0 ? (
        <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>
      ) : (
        <div className="quantity-control">
          <button className="decrement-button" onClick={decrementQuantity}>-</button>
          <span>{quantity}</span>
          <button className="increment-button" onClick={incrementQuantity}>+</button>
        </div>
      )}
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
