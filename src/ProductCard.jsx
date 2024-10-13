import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QuantityControl from './QuantityControl.jsx';
import { addToCart, removeFromCart } from './cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const existingItem = cartItems.find((item) => item.id === product.id);
  const [shopQuantity, setShopQuantity] = useState(existingItem ? existingItem.quantity : 0);

  const updateCart = (newQuantity) => {
    if (newQuantity > 0) {
      if (!existingItem) {
        dispatch(addToCart({ ...product, quantity: newQuantity }));
      }
    } else if (newQuantity === 0 && existingItem) {
      dispatch(removeFromCart(product.id));
    }
  };

  const incrementShopQuantity = () => {
    const newQuantity = shopQuantity + 1;
    setShopQuantity(newQuantity);
    updateCart(newQuantity);
  };

  const decrementShopQuantity = () => {
    if (shopQuantity > 0) {
      const newQuantity = shopQuantity - 1;
      setShopQuantity(newQuantity);
      updateCart(newQuantity);
    }
  };

  useEffect(() => {
    if (existingItem) {
      setShopQuantity(existingItem.quantity);
    } else {
      setShopQuantity(0);
    }
  }, [existingItem]);

  return (
    <div className="product-card">
      <img className="product-card-img" src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>

      {shopQuantity > 0 ? (
        <QuantityControl
          quantity={shopQuantity}
          onIncrement={incrementShopQuantity}
          onDecrement={decrementShopQuantity}
        />
      ) : (
        <button className="add-to-cart" onClick={incrementShopQuantity}>
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
