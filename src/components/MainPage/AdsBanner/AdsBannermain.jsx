import { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner
import { getBanners } from '../../../ApiCall/mainPageLoader';
import './AdsBannermain.css';

function AdsBannermain() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setLoading(true);
        const data = await getBanners();
        setBanners(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBannerData();
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  if (loading) {
    return (
      <div className="carousel-container my-5 text-center">
        {/*  */}
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="carousel-container my-5 text-center">
        Error loading banners: {error.message}
      </div>
    );
  }

  return (
    <div className="carousel-container my-5">
      <Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel">
        {banners.map((banner) => (
          <Carousel.Item key={banner.id}>
            <a
              href={banner.bannerDetail.urlToDirect}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
            >
              <img
                className="d-block w-100 custom-carousel-image"
                src={banner.bannerDetail.imageUrl}
                alt={banner.bannerDetail.title}
              />
            </a>
            <Carousel.Caption>
              <h3>{banner.bannerDetail.title}</h3>
              <p>{banner.bannerDetail.title_detail}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default AdsBannermain;
