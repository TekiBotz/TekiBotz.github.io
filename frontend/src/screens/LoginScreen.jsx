import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../uiComponents/FormContainer';
import LoadingSpinner from '../uiComponents/LoadingSpinner';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const LoginScreen = () => {
	// State hooks to hold email and password inputs
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();  // Triggers a state change
	const navigate = useNavigate();  // Hook to navigate to another route

	// Mutation to handle login
	const [login, { isLoading }] = useLoginMutation();

	// Access user info from store.js
	const { userInfo } = useSelector((state) => state.auth);

	// Redirects after login, if redirect URL is provided
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
		try {
			const res = await login({ email, password }).unwrap();  // Attempt login with credentials
			dispatch(setCredentials({ ...res }));  // If successful, update store with credentials
			navigate(redirect);
		} catch (err) {
			toast.error(err?.data?.message || err.message || 'Email or password invalid');
		}
	};

	return (
		<FormContainer>
			<h1>Sign In</h1>

			<Form onSubmit={submitHandler}>
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

				<Button disabled={isLoading} type='submit' variant='primary' className='mt-2'>
					Sign In
				</Button>

				{ isLoading && <LoadingSpinner /> }
			</Form>

			<Row className='py-3'>
				<Col>
					New User?{' '}
					<Link to={ redirect ? `/register?redirect=${redirect}` : '/register' }>
						Register
					</Link>
				</Col>
			</Row>
		</FormContainer>
	)
}

export default LoginScreen;