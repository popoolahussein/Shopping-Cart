import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const Home = () => {
  const [shopItems, setShopItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const imageContainerRef = useRef(null);
  const autoScrollRef = useRef(null);
  
  useEffect(() => {
    const fetchShopItems = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setShopItems(data.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching shop items:', error);
        setError('Failed to load products, please try again later.');
        setLoading(false);
      }
    };

    fetchShopItems();
  }, []);

  useEffect(() => {
    if (imageContainerRef.current) {
      gsap.fromTo(
        imageContainerRef.current.children,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.5,
          stagger: 0.3,
          ease: 'power3.out',
        }
      );
    }
  }, [shopItems]);

  useEffect(() => {
    const scrollCarousel = () => {
      if (!imageContainerRef.current) return;

      const scrollAmount = window.innerWidth < 600 ? 150 : 300;
      const maxScrollLeft = imageContainerRef.current.scrollWidth - imageContainerRef.current.clientWidth;

      if (imageContainerRef.current.scrollLeft >= maxScrollLeft) {
        imageContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        imageContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    autoScrollRef.current = setInterval(scrollCarousel, 1500);

    return () => clearInterval(autoScrollRef.current);
  }, []);

  const handleMouseEnter = () => {
    clearInterval(autoScrollRef.current);
  };


  const handleMouseLeave = () => {
    const scrollCarousel = () => {
      const scrollAmount = window.innerWidth < 600 ? 150 : 300;
      const maxScrollLeft = imageContainerRef.current.scrollWidth - imageContainerRef.current.clientWidth;
      if (imageContainerRef.current.scrollLeft >= maxScrollLeft) {
        imageContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        imageContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    };

    autoScrollRef.current = setInterval(scrollCarousel, 1500);
  };

  return (
    <div className="home-container">
      <div className="background-animation"></div>
      <div className="home-content">
        <h1 className="home-title">Explore Our Exclusive Products</h1>
        <p className="home-description">Dive into our curated collection and find your favorites!</p>
        {loading ? (
          <div className="spinner">Loading...</div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div
            className="image-carousel"
            ref={imageContainerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {shopItems.map((item) => (
              <div key={item.id} className="image-card">
                <img
                  src={item.image}
                  alt={`Image of ${item.title}`}
                  className="product-image"
                />
                <div className="image-overlay">
                  <h3>{item.title}</h3>
                  <p>{item.description.slice(0, 70)}...</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
