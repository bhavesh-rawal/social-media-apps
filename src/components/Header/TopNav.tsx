import React from 'react'
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Top_Navbar = (props: any) => {

  return (
    <>
      <Navbar sticky="top" expand="lg" data-bs-theme="light"
        className="bg-body-tertiary bg-light"
        style={{
          background: 'rgb(0, 0, 0)',
          backgroundImage: 'linear-gradient(180deg, rgba(0,0,0,0.3757878151260504) 0%, rgba(255,255,255,1) 100%)',
        }}>
        <Container fluid>
          <Link className='text-decoration-none' to="/">
            <Navbar.Brand>Home</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" className='toggle-button' />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className="me-auto ">
              {
                props.Navs.map((i: any, indx: number) => (
                  <>
                    <Link className='text-decoration-none text-dark mx-2' to={i.nav} key={indx}>{i.titls}</Link>
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
