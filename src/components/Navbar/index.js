import React from 'react';
import { Nav, NavLink, NavIcon, Bars } from './NavbarElements';

const Navbar = ({ toggle }) => {
  return (
    <>
      <Nav>
        <NavLink to='/'>Cẩm Nhung</NavLink>
        <NavIcon onClick={toggle}>
          <p className='text_nav'>Mại dô</p>
          <Bars />
        </NavIcon>
      </Nav>
    </>
  );
};

export default Navbar;
