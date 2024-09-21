import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from './Modal';

const Cart = ({ setCartItems }) => {
  const [cartItems, setLocalCartItems] = useState([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setLocalCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    setCartItems(cartItems); 
  }, [cartItems, setCartItems]);

  const updateLocalStorage = (items) => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  };

  const handleIncrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setLocalCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const handleDecrement = (id) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setLocalCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const handleRemove = (id) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setLocalCartItems(updatedCartItems);
    updateLocalStorage(updatedCartItems);
  };

  const handleClearCart = () => {
    setIsConfirmationModalOpen(true);
  };

  const handleConfirmClear = () => {
    setLocalCartItems([]);
    localStorage.removeItem('cartItems');
    setIsConfirmationModalOpen(false);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationModalOpen(false);
  };

  const handleCheckoutClick = () => {
    setIsSocialModalOpen(true);
    handleClearCart()
  };

  const handleCloseSocialModal = () => {
    setIsSocialModalOpen(false);
  };

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const generateCartText = () => {
    const cartItemsText = cartItems
      .map(
        (item) =>
          `Item: ${item.title}, Quantity: ${item.quantity}, Price: $${item.price}`
      )
      .join('\n');

    return `${cartItemsText}\n\nTotal Price: $${totalAmount.toFixed(2)}`;
  };

  const socialLinks = {
    email: `mailto:?subject=My Cart&body=${encodeURIComponent(generateCartText())}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(generateCartText())}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent('https://www.telegram.org')}&text=${encodeURIComponent(generateCartText())}`,
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 && <p>Your cart is empty.</p>}
      {cartItems.length > 0 && (
        <>
          <div className="cart-total">
            <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
          </div>
          <div className="button-box">
            <button className="clearCart" onClick={handleClearCart}>
              Clear Cart
            </button>
            <button onClick={handleCheckoutClick} className="checkout-button">
              Checkout
            </button>
          </div>

          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>${item.price}</p>
                <div className="quantity-control">
                  <button
                    className="decrement-button"
                    onClick={() => handleDecrement(item.id)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="increment-button"
                    onClick={() => handleIncrement(item.id)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-remove-button-box">
                  <button
                    className="cart-remove-button"
                    onClick={() => handleRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <Modal isOpen={isConfirmationModalOpen} onClose={handleCloseConfirmationModal}>
            <p>Are you sure you want to clear all items from your cart?</p>
            <div className="modal-buttons">
              <button onClick={handleConfirmClear}>Yes</button>
              <button onClick={handleCloseConfirmationModal}>No</button>
            </div>
          </Modal>

          <Modal isOpen={isSocialModalOpen} onClose={handleCloseSocialModal}>
            <h3>Share via:</h3>
            <div className="social-share">
              <a href={socialLinks.email} target="_blank" rel="noopener noreferrer">
                Email
              </a>
              <a href={socialLinks.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              <a href={socialLinks.telegram} target="_blank" rel="noopener noreferrer">
                Telegram
              </a>
            </div>
          </Modal>
        </>
      )}
    </div>
  );
};

Cart.propTypes = {
  setCartItems: PropTypes.func.isRequired,
};

export default Cart;
