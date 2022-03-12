import React, { useEffect } from 'react';
import { FeatureContainer, FeatureButton } from './FeatureElements';
import link from '../../assets/video/video.mp4'
import ScrollAnimation from 'react-animate-on-scroll';
const Feature = () => {
  useEffect(() => {
    document.getElementById('video').play()

  }, [])
  return (
    <FeatureContainer>
      <h1>
        Hải sản Châu Nhung
      </h1>
      <p>Ghẹ xanh, ghẹ đỏ, bề bề đang bơi</p>
      <FeatureButton style={{
        zIndex: '10'
      }}>Liên hệ ngay</FeatureButton>
      <video autoPlay loop muted id='video'>
        <source src={link} type="video/mp4" />


      </video>
    </FeatureContainer>
  );
};

export default Feature;
