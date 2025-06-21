import { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './AdsBannermain.css'; // You can create this CSS file to add custom styles
import imgageone from '../../../assets/B2.png';
import imgagetwo from '../../../assets/B1.png';
import imgagethree from '../../../assets/B3.png';

function AdsBannermain() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="carousel-container my-5">
      <Carousel activeIndex={index} onSelect={handleSelect} className="custom-carousel">
        <Carousel.Item>
          <img
            className="d-block w-100 custom-carousel-image"
            src={imgageone}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 custom-carousel-image"
            src={imgagetwo}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 custom-carousel-image"
            src={imgagethree}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default AdsBannermain;
