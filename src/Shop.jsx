import { useState, useEffect, useRef, useContext } from 'react';
import ProductCard from './ProductCard.jsx';
import { CartContext } from './CartContext.jsx';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const imageContainerRef = useRef(null);
  const carouselIntervalRef = useRef(null);
  const { cartItems, setCartItems } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

  useEffect(() => {
    if (imageContainerRef.current) {
      carouselIntervalRef.current = setInterval(scrollCarousel, 5000);
    }

    return () => clearInterval(carouselIntervalRef.current);
  }, [products]);

  const handleMouseEnter = () => {
    clearInterval(carouselIntervalRef.current);
  };

  const handleMouseLeave = () => {
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
      {loading ? (
        <div>Loading...</div>
      ) : (
        products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            cartItems={cartItems} 
            setCartItems={setCartItems} 
          />
        ))
      )}
    </div>
  );
};

export default Shop;
