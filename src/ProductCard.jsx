import { useState, useEffect, useContext } from 'react';
import QuantityControl from './QuantityControl.jsx';
import { CartContext } from './CartContext.jsx';

const ProductCard = ({ product }) => {
  const { cartItems, setCartItems } = useContext(CartContext);
  const existingItem = cartItems.find((item) => item.id === product.id);
  const [shopQuantity, setShopQuantity] = useState(0);

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

export default ProductCard;
