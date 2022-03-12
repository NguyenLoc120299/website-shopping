import React, { useState } from 'react';
import {
  ProductsContainer,
  ProductWrapper,
  ProductsHeading,
  ProductTitle,
  ProductCard,
  ProductImg,
  ProductInfo,
  ProductDesc,
  ProductPrice,
  ProductButton
} from './ProductsElements';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles



// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
const Products = ({ heading, data }) => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [single, setSingle] = useState('')
  const handleShow = (p) => {
    setShow(true);
    setSingle(p)
  }
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <ProductsContainer>
      <ProductsHeading>{heading}</ProductsHeading>
      <ProductWrapper>
        {data && data.map((product, index) => {
          return (
            <ProductCard key={index} onClick={() => handleShow(product)}>
              <ProductImg src={product?.image[0]} alt={''} />
              <ProductInfo >
                <ProductTitle>{product.name}</ProductTitle>
                {/* <ProductDesc>{product.desc}</ProductDesc> */}
                <ProductPrice>{(product.price).toLocaleString()} vnđ/kg</ProductPrice>
                <ProductButton>Đặt hàng</ProductButton>
              </ProductInfo>
            </ProductCard>
          );
        })}
      </ProductWrapper>


      <div className='modal_product d-flex justify-content-center align-items-center' style={show ? { transform: 'scale(1)' } : { transform: 'scale(0)' }}>
        <span className='close__modal' onClick={() => setShow(false)}>x</span>
        <div className='container'>
          <div className='row'>
            <Swiper
              style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",
              }}
              loop={true}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper2"
            >
              {
                single && single?.image.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img src={item} />
                  </SwiperSlide>
                ))
              }

            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              loop={true}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="mySwiper py-2"
            >
              {
                single && single?.image.map((item, index) => (
                  <SwiperSlide key={index}>
                    <img src={item} />
                  </SwiperSlide>
                ))
              }


            </Swiper>
          </div>
        </div>
      </div>


    </ProductsContainer >
  );
};

export default Products;
