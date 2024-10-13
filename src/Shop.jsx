import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './cartSlice';
import ProductCard from './ProductCard.jsx';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const imageContainerRef = useRef(null);
  const carouselIntervalRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    const scrollCarousel = () => {
      if (!imageContainerRef.current) return;

      const maxScrollLeft = imageContainerRef.current.scrollWidth - imageContainerRef.current.clientWidth;
      const scrollAmount = window.innerWidth < 600 ? 150 : 300;

      if (imageContainerRef.current.scrollLeft >= maxScrollLeft) {
        imageContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        imageContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

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

  const handleAddToCart = (product) => {
    dispatch(addToCart({ id: product.id, title: product.title, price: product.price, quantity: 1 }));
  };

  return (
    <div
      className="shop"
      ref={imageContainerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={() => handleAddToCart(product)} />
      ))}
    </div>
  );
};

export default Shop;
