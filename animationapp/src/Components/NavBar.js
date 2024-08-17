import { useState,useEffect } from "react";
import {Navbar,Nav,Container} from "react-bootstrap";
import logo from '../Assets/img/logo.svg';
import navIcon1 from '../Assets/img/nav-icon1.svg';
// import navIcon2 from '../Assets/img/nav-icon2.svg';
// import navIcon3 from '../Assets/img/nav-icon3.svg';
import {HashLink} from 'react-router-hash-link';
export const NavBar=()=>{
  const[activeLink,setActiveLink]=useState('home');
  const[scrolling,setScrolling]=useState[false];
  useEffect(()=>{
    const onScroll=()=>{
      if(window.scrollY >50){
        setScrolling(true);
      }else{
        setScrolling(false);
    }
  }
  window.addEventListener("scroll",onScroll);
  return ()=>window.removeEventListener("scroll",onScroll);
}, [])
const onUpdateActiveLink=(value)=>{
  setActiveLink(value);
}
  return(
    <Navbar expand="lg" className={scrolling?"scrolling":""}>
      <Container>
        <Navbar.Brand href="#home">
            <img src={logo} alt="Graphics" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
            <span className="navbar-toggling-icon"></span>
        </Navbar.Toggle>
         <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home" className={activeLink==='home' ? 'active navbar-link':'navbar-link'} onClick={()=>onUpdateActiveLink('home')}>Home</Nav.Link>
            <Nav.Link href="#skills" className={activeLink==='skills' ? 'active navbar-link':'navbar-link'} onClick={()=>onUpdateActiveLink('skills')}>Skills</Nav.Link>
            <Nav.Link href="#project" className={activeLink==='projects' ? 'active navbar-link':'navbar-link'} onClick={()=>onUpdateActiveLink('projects')}>Projects</Nav.Link>
          </Nav>
          <span className="nav-social">
              <div className="social-icon">
                  <a href="#"><img src={navIcon1} /></a>
              </div>
              <HashLink to='#connect'>
                  <button className="coldplay"><span>Lets Connect</span></button>
              </HashLink>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
