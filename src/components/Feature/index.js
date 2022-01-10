import React from 'react';
import { FeatureContainer, FeatureButton } from './FeatureElements';
import link from '../../assets/video/download.mp4'
const Feature = () => {
  return (
    <FeatureContainer>
      <h1> Hải sản Châu Nhung</h1>
      <p>Ghẹ xanh, ghẹ đỏ, bề bề đang bơi</p>
      <FeatureButton>Liên hệ ngay</FeatureButton>
      {/* <video autoPlay loop muted>
        <source src={link} type="video/mp4" />


      </video> */}
    </FeatureContainer>
  );
};

export default Feature;
