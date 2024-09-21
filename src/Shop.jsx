import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const Shop = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const imageContainerRef = useRef(null);
  const carouselIntervalRef = useRef(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const addToCart = (product, quantity) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    let updatedCartItems;
    if (existingItem) {
      updatedCartItems = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCartItems = [...cartItems, { ...product, quantity }];
    }
    setCartItems(updatedCartItems);
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
      carouselIntervalRef.current = setInterval(scrollCarousel, 1500);
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
      carouselIntervalRef.current = setInterval(scrollCarousel, 1500);
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
