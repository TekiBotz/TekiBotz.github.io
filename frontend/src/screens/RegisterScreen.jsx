import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../uiComponents/FormContainer';
import LoadingSpinner from '../uiComponents/LoadingSpinner';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegisterScreen = () => {
	// State hooks to hold input fields
  const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

	const dispatch = useDispatch();  // Triggers a state change
	const navigate = useNavigate();  // Hook to navigate to another route

	// Mutation to handle registration
	const [register, { isLoading }] = useRegisterMutation();

	// Access user info from store.js
	const { userInfo } = useSelector((state) => state.auth);

	// Redirects after registration, if redirect URL is provided
	const { search } = useLocation();
	const searchParams = new URLSearchParams(search);
	const redirect = searchParams.get('redirect') || '/';

	// If the user is already logged in, redirect to intended page
	useEffect(() => {
		if (userInfo) {
			navigate(redirect);
		}
	}, [userInfo, redirect, navigate]);

	const submitHandler = async (e) => {
		e.preventDefault();
		// Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error('Passwords don\'t match');
    } else {
      try {
				// Call the mutation to update the profile
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));  // // Update store.js with credentials
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
	};

	return (
		<FormContainer>
			<h1>Sign Up</h1>

			<Form onSubmit={submitHandler}>
				<Form.Group controlId='name' className='my-3'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Enter name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='email' className='my-3'>
					<Form.Label>Email</Form.Label>
					<Form.Control
						type='email'
						placeholder='Enter email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='password' className='my-3'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId='confirmPassword' className='my-3'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button disabled={isLoading} type='submit' variant='primary' className='mt-2'>
					Register
				</Button>

				{ isLoading && <LoadingSpinner /> }
			</Form>

			<Row className='py-3'>
				<Col>
					Existing User? <Link to={ redirect ? `/login?redirect=${redirect}` : '/login' }>Login</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default RegisterScreen;