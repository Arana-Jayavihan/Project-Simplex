import React from 'react';
import banner1 from '../../assets/bannerImages/03.png'
import banner10 from '../../assets/bannerImages/10.png'
import banner19 from '../../assets/bannerImages/19.png'
import banner50 from '../../assets/bannerImages/50.png'
import banner57 from '../../assets/bannerImages/57.png'
import banner4 from '../../assets/bannerImages/04.png'
import banner60 from '../../assets/bannerImages/60.png'
import "bootstrap/dist/css/bootstrap.min.css";
import { Carousel } from 'react-bootstrap';

const Slider = () => {
    return (
        <Carousel fade variant="dark" style={{ margin: "2% 2%" }}>
            <Carousel.Item interval={5000} style={{ bordarRadius: '15px' }}>
                <img
                    className="d-block w-100"
                    src={banner1}
                    alt="First slide"
                    style={{ bordarRadius: '15px' }}
                />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src={banner4}
                    alt="second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src={banner10}
                    alt="second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src={banner19}
                    alt="second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src={banner50}
                    alt="second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src={banner57}
                    alt="second slide"
                />
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <img
                    className="d-block w-100"
                    src={banner60}
                    alt="second slide"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default Slider;
