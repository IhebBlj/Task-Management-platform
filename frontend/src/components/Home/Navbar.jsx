import {React,useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

 const Header=styled.div`
     background-color: #ffffff;
    position: fixed;
      width: 100%;
      height: 40px;
       display: flex;
       justify-content: space-between;
       align-items: center;
       padding: 30px;
   margin: 0;
   
       position: fixed; 
       top: 0;
       width: 100%; 
       z-index: 1000;
       transition: box-shadow 0.3s ease;
       border-bottom: 1px solid #ccc;
 `
 const Icon=styled.div`
       display: flex;
      align-items: center;
 `
 const IMG=styled.img`
 height: 50px;
 `
 const Logo=styled.p`
        font-size: 24px;
       font-weight: bolder;
       color: #37474F;
       margin: 0;
       padding: 0;
 `
 const NavLink=styled.a`
        margin-left: 20px;
       text-decoration: none;
       color: #37474F;
       font-size: 17px;
       transition: all 0.3s ease;
       &:hover{
        text-decoration:underline;}
 `
 const MenuToggle = styled.div`
  display: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;
 const Underline=styled.a`
         margin-left: 20px;

       transition: all 0.3s ease;
       &:hover{
        text-decoration:underline;

       }

 `
 const Started=styled.a`

       display: inline-block;
       margin: 10px;
       padding: 15px 30px;
       border-radius: 25px;
       text-decoration: none;
       color: #fff;
       font-size: 15px;
       background-color: #1B4332;

       margin-right: 15px;
  
      `
const NavLinks = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background-color: #ffffff;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    ${({ showMenu }) => showMenu && `display: flex;`}
  }
`;


return (
    <Header>
      <Icon>
        <IMG src="../images/taskroomicon.png" alt="icontask" />
        <Logo>TaskRoom</Logo>
      </Icon>
      <MenuToggle onClick={toggleMenu}>&#9776;</MenuToggle>

      <NavLinks showMenu={showMenu}>
        <Underline href="/">Home</Underline>
        <NavLink href="#services">Services</NavLink>
        <NavLink href="#about">About us</NavLink>
        <Underline href="/contact">Contact</Underline>
        <Underline href="/signin">Sign In</Underline>
        <Started href="/signup">
          <span>Get Started</span>
        </Started>
      </NavLinks>
    </Header>
  );
}

export default Navbar;
