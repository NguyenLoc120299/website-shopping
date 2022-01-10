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

import { Modal } from 'react-bootstrap';
const Products = ({ heading, data }) => {
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  const [single, setSignle] = useState('')
  const handleShow = (breakpoint, p) => {
    setFullscreen(breakpoint);
    setShow(true);
    setSignle(p)
  }
  return (
    <ProductsContainer>
      <ProductsHeading>{heading}</ProductsHeading>
      <ProductWrapper>
        {data.map((product, index) => {
          return (
            <ProductCard key={index} onClick={() => handleShow(true, product)}>
              <ProductImg src={product.img} alt={product.alt} />
              <ProductInfo >
                <ProductTitle>{product.name}</ProductTitle>
                <ProductDesc>{product.desc}</ProductDesc>
                <ProductPrice>{(product.price).toLocaleString()} vnđ/kg</ProductPrice>
                <ProductButton>{product.button}</ProductButton>
              </ProductInfo>
            </ProductCard>
          );
        })}
      </ProductWrapper>
      {


        <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              <ProductTitle>{single.name}</ProductTitle>   </Modal.Title>
          </Modal.Header>
          <Modal.Body>Chưa có ảnh</Modal.Body>
        </Modal>

      }
    </ProductsContainer>
  );
};

export default Products;
