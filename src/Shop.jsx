import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';
import Modal from './Modal';

const Shop = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const imageContainerRef = useRef(null);
  const carouselIntervalRef = useRef(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (!existingItem) {
      const updatedCartItems = [...cartItems, { ...product, quantity }];
      setCartItems(updatedCartItems);
    } else {
      setSelectedProduct({ ...product, quantity });
      setIsModalOpen(true);
    }
  };

  const handleReplaceItem = () => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === selectedProduct.id ? { ...item, quantity: selectedProduct.quantity } : item
    );
    setCartItems(updatedCartItems);
    setIsModalOpen(false);
  };

  const handleKeepItem = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const scrollCarousel = () => {
      if (!imageContainerRef.current) return;

      const maxScrollLeft = imageContainerRef.current.scrollWidth - imageContainerRef.current.clientWidth;

      if (imageContainerRef.current.scrollLeft >= maxScrollLeft) {
        imageContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        imageContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    const scrollAmount = window.innerWidth < 600 ? 150 : 300;

    if (imageContainerRef.current) {
      carouselIntervalRef.current = setInterval(scrollCarousel, 5000);
    }

    return () => clearInterval(carouselIntervalRef.current);
  }, [products]);

  const handleMouseEnter = () => {
    clearInterval(carouselIntervalRef.current);
  };

  const handleMouseLeave = () => {
    const scrollAmount = window.innerWidth < 600 ? 150 : 300;
    const scrollCarousel = () => {
      if (!imageContainerRef.current) return;

      const maxScrollLeft = imageContainerRef.current.scrollWidth - imageContainerRef.current.clientWidth;

      if (imageContainerRef.current.scrollLeft >= maxScrollLeft) {
        imageContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        imageContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    if (imageContainerRef.current) {
      carouselIntervalRef.current = setInterval(scrollCarousel, 5000);
    }
  };

  return (
    <div
      className="shop"
      ref={imageContainerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} />
      ))}

      <Modal isOpen={isModalOpen} onClose={handleKeepItem}>
        <p>This item is already in your cart. Do you want to replace it?</p>
        <div className='quantity-control'>
        <button className='decrement-button' onClick={handleReplaceItem}>Replace</button>
        <button className='increment-button' onClick={handleKeepItem}>Retain</button>
        </div>
      </Modal>
    </div>
  );
};

Shop.propTypes = {
  cartItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  })).isRequired,
  setCartItems: PropTypes.func.isRequired,
};

export default Shop;
