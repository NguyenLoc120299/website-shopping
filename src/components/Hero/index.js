import React, { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import "animate.css/animate.min.css";
import {
  HeroContainer,
  HeroContent,
  HeroItems,
  HeroH1,
  HeroP,
  HeroBtn
} from './HeroElements';

const Hero = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const handleClick = () => {
    window.location.href = 'https://www.facebook.com/nhung.chau.9235'
  }
  return (
    <HeroContainer>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <HeroContent>
        <HeroItems>
          <ScrollAnimation animateIn='animate__zoomIn' >
            <HeroH1>Hải sản Châu Nhung</HeroH1>
          </ScrollAnimation>
          <ScrollAnimation animateIn='animate__fadeInUp'>
            <HeroP>Khô nào cũng có - Cá nào cũng ngon</HeroP>
            <HeroBtn onClick={() => handleClick()}>Đặt hàng ngay</HeroBtn>
          </ScrollAnimation>

        </HeroItems>
      </HeroContent>
    </HeroContainer>
  );
};

export default Hero;
