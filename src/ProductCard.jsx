import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import QuantityControl from './QuantityControl';

const ProductCard = ({ product, cartItems, setCartItems }) => {
  const existingItem = cartItems.find((item) => item.id === product.id);
  const [shopQuantity, setShopQuantity] = useState(0);

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
    updateLocalStorage(updatedCartItems);
  };

  const incrementShopQuantity = () => {
    setShopQuantity(shopQuantity + 1);
  };

  const decrementShopQuantity = () => {
    if (shopQuantity > 0) {
      const newQuantity = shopQuantity - 1;
      setShopQuantity(newQuantity);
      if (newQuantity === 0) {
        updateCart(0);
      }
    }
  };

  const addToCart = () => {
    setShopQuantity(1);
    updateCart(1);
  };

  useEffect(() => {
    if (existingItem) {
      setShopQuantity(existingItem.quantity);
    }
  }, [existingItem]);

  return (
    <div className="product-card">
      <img className="product-card-img" src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>

      {existingItem ? (
        <QuantityControl
          quantity={shopQuantity}
          onIncrement={incrementShopQuantity}
          onDecrement={decrementShopQuantity}
        />
      ) : (
        <button className="add-to-cart" onClick={addToCart}>
          Add to Cart
        </button>
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
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  setCartItems: PropTypes.func.isRequired,
};

export default ProductCard;
