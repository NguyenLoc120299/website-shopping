import React from 'react';

import {
  SidebarContainer,
  Icon,
  CloseIcon,
  SidebarMenu,
  SidebarLink,
  SidebarRoute,
  SideBtnWrap
} from './SidebarElements';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>

      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarMenu>
        <SidebarLink to='/'>Khô các loại</SidebarLink>
        <SidebarLink to='/'>Đồ tươi sống</SidebarLink>
        <SidebarLink to='/'>Khác</SidebarLink>
      </SidebarMenu>
      <SideBtnWrap>
        <SidebarRoute to='/'>Liên hệ</SidebarRoute>
      </SideBtnWrap>

    </SidebarContainer>
  );
};

export default Sidebar;
