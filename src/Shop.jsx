import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import ProductCard from './ProductCard';

const Shop = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const imageContainerRef = useRef(null); // Initialize the ref for the image container
  const carouselIntervalRef = useRef(null); // To store the interval reference

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
      if (!imageContainerRef.current) return; // Ensure the ref is not null

      const maxScrollLeft = imageContainerRef.current.scrollWidth - imageContainerRef.current.clientWidth;

      if (imageContainerRef.current.scrollLeft >= maxScrollLeft) {
        imageContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        imageContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    const scrollAmount = window.innerWidth < 600 ? 150 : 300;

    // Only set interval if imageContainerRef is not null
    if (imageContainerRef.current) {
      carouselIntervalRef.current = setInterval(scrollCarousel, 1500); // Store interval reference
    }

    return () => clearInterval(carouselIntervalRef.current); // Clear interval on component unmount
  }, [products]); // Ensure products are loaded before setting the scroll interval

  const handleMouseEnter = () => {
    clearInterval(carouselIntervalRef.current); // Pause the scroll when hovering
  };

  const handleMouseLeave = () => {
    const scrollAmount = window.innerWidth < 600 ? 150 : 300;
    const scrollCarousel = () => {
      if (!imageContainerRef.current) return; // Ensure the ref is not null

      const maxScrollLeft = imageContainerRef.current.scrollWidth - imageContainerRef.current.clientWidth;

      if (imageContainerRef.current.scrollLeft >= maxScrollLeft) {
        imageContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        imageContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };
    // Resume the scroll when not hovering
    if (imageContainerRef.current) {
      carouselIntervalRef.current = setInterval(scrollCarousel, 1500);
    }
  };

  return (
    <div
      className="shop"
      ref={imageContainerRef}
      onMouseEnter={handleMouseEnter} // Pause scroll on hover
      onMouseLeave={handleMouseLeave} // Resume scroll when mouse leaves
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
