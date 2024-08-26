/**
 * Project: AnimalShelter
 * File: components/Header.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-24
 * Purpose: Responsible for rendering the header of the application including a navigation bar with
 *          brand logo, search functionality, and user authentication links.
 */

import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap'
import { FaUser } from 'react-icons/fa'
import { LinkContainer } from 'react-router-bootstrap'
import animalLogo2 from '../assets/animalLogo2.png'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'
import { User } from './User.jsx'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Header component
export function Header() {
  const { token, setToken } = useAuth()
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  let sub = null
  let isAdmin = false

  if (token) {
    // Decode the token to get user information
    const decodedToken = jwtDecode(token)
    sub = decodedToken.sub
    isAdmin = decodedToken.isAdmin || false // Check if the user is an admin
  }

  // Prevents default form submission behavior and navigates to the search results page.
  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
        <Container>
          {/* Brand logo and title */}
          <LinkContainer to='/'>
            <Navbar.Brand>
              <img src={animalLogo2} alt='Animal Rescue' />
              Pet Rescue
            </Navbar.Brand>
          </LinkContainer>

          {/* Search Bar */}
          <Form className='d-flex ms-auto' onSubmit={handleSearchSubmit}>
            <FormControl
              type='search'
              placeholder='Search Animals'
              className='me-2'
              aria-label='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant='outline-success' type='submit'>
              Search
            </Button>
          </Form>

          {/* Navigation Links */}
          <Nav className='ms-auto'>
            {sub ? (
              <NavDropdown title={<User id={sub} />} id='username'>
                {/* Admin Link */}
                {isAdmin && (
                  <LinkContainer to='/admin'>
                    <NavDropdown.Item>Admin</NavDropdown.Item>
                  </LinkContainer>
                )}
                {/* Logout */}
                <NavDropdown.Item onClick={() => setToken(null)}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to='/login'>
                <Nav.Link href='/login'>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}
