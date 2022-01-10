import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaMailBulk,
  FaTiktok,
  FaLinkedin
} from 'react-icons/fa';
import {
  FooterContainer,
  FooterWrap,
  SocialMedia,
  SocialMediaWrap,
  SocialLogo,
  SocialIcons,
  SocialIconLink
} from './FooterElements';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWrap>
        <SocialMedia>
          <SocialMediaWrap>
            <SocialLogo to='/'>Châu Nhung</SocialLogo>
            <SocialIcons>
              <SocialIconLink href='https://www.facebook.com/nhung.chau.9235' target='_blank' aria-label='Facebook'>
                <FaFacebook />
              </SocialIconLink>
              <SocialIconLink
                href='https://www.tiktok.com/@chau_nhung_1802'
                target='_blank'
                aria-label='titok'
                rel='noopener noreferrer'
              >
                <FaTiktok />
              </SocialIconLink>

            </SocialIcons>
          </SocialMediaWrap>
        </SocialMedia>
      </FooterWrap>

    </FooterContainer>
  );
};

export default Footer;
