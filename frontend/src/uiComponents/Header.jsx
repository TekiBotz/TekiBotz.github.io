import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap'; // Used for routing, speeds up performance
import animalLogo2 from '../assets/animalLogo2.png'

const Header = () => {
  return (
    <header>
        <Navbar bg="dark" variant="dark">
            <Container>
                <LinkContainer to='/'>
                <Navbar.Brand>
                    <img src={animalLogo2} alt='Animal Rescue' />
                    Pet Rescue
                </Navbar.Brand>
                </LinkContainer>
                    <Nav className="ms-auto">
                        <LinkContainer to='/login'>
                        <Nav.Link>
                            <FaUser /> Sign In
                        </Nav.Link>
                        </LinkContainer>
                    </Nav>
            </Container>
        </Navbar>
    </header>
  )
}

export default Header;