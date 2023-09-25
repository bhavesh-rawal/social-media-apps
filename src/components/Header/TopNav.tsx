import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Top_Navbar = (props: any) => {
 
  return (
    <>
      <Navbar sticky="top" expand="lg" data-bs-theme="dark" className="bg-body-tertiary bg-dark">
      <Container fluid>
          <Link className='text-decoration-none' to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto ">
              {
                props.Navs.map((i: any, indx: number) => (
                  <>
                    <Link className='text-decoration-none mx-2' to={i.nav} key={indx}>{i.titls}</Link>
                  </>
                ))
              }
            </Nav>
           
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
export default Top_Navbar
