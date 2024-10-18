/**
 * Project: AnimalRescue
 * File: Header.js
 * Author: Jarrale Butts
 * Created: 2024-09-16
 * Purpose: Displays the header of the application.
 */

import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBar from './SearchBar';
import animalLogo2 from '../assets/animalLogo2.png';

const Header = () => {
	// Access user info from store.js
	const { userInfo } = useSelector((state) => state.auth);

	const dispatch = useDispatch();  // Triggers a state change
	const navigate = useNavigate();  // Hook to navigate to another route

	// Mutation to handle logout
	const [logoutApiCall] = useLogoutMutation();

	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();  // Api call to logout
			dispatch(logout());  // Clear user credentials from store.js
			navigate('/login');  // Redirect to login page
		} catch (err) {
			console.log(err);
		}
	}

  return (
    <header>
			<Navbar bg="dark" variant="dark" expand='md' collapseOnSelect>
				<Container>
					{/* Brand logo and title */}
					<LinkContainer to='/'>
						<Navbar.Brand>
							<img src={animalLogo2} alt='Animal Rescue' />
							Pet Rescue
						</Navbar.Brand>
					</LinkContainer>
					
					{/* Toggle button for responsive menu */}
					<Navbar.Toggle aria-controls='basic-navbar-nav' /> 
          <Navbar.Collapse id='basic-navbar-nav'>
						<Nav className="ms-auto">
							<SearchBar />  {/* SearchBar component */}

							{/* User links: Profile and Logout */}
							{ userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={logoutHandler}>
										Logout
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								// Link to login page if not signed in
								<LinkContainer to='/login'>
									<Nav.Link href='/login'>
										<FaUser /> Sign In
									</Nav.Link>
								</LinkContainer>
							)}

							{/* Admin links */}
							{userInfo && userInfo.isAdmin && (
								<NavDropdown title='Admin' id='adminmenu'>
									<LinkContainer to='/admin/animallist'>
										<NavDropdown.Item>Shelter List</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to='/admin/userlist'>
										<NavDropdown.Item>Users</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
    </header>
  )
}

export default Header;