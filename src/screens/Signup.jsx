/**
 * Project: AnimalShelter
 * File: screens/Signup.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-24
 * Purpose: Provide a sign-up form for new users to create an account.
 */

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer.jsx'
import { signup } from '../api/users.js'

export function Signup() {
  // State hooks for managing form input values
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate()

  // Mutation for handling the signup process
  const signupMutation = useMutation({
    mutationFn: () => signup({ username, email, password }), // Calls signup API with form data
    onSuccess: () => navigate('/login'), // Redirect to login page on successful signup
    onError: () => alert('failed to sign up!'),
  })

  // Prevents the default form behavior and triggers the signup mutation.
  const handleSubmit = (e) => {
    e.preventDefault()
    signupMutation.mutate()
  }

  return (
    <FormContainer>
      <h1>Sign Up</h1>

      <Form onSubmit={handleSubmit}>
        <Link to='/'>
          <i className='bi bi-arrow-left-circle-fill text-dark fs-1'></i>
        </Link>
        <Form.Group controlId='username' className='my-3'>
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

        <Button
          type='submit'
          value={signupMutation.isPending ? 'Signing up...' : 'Sign Up'}
          disabled={
            !username || !email || !password || signupMutation.isPending
          }
          variant='primary'
          className='mt-2'
        >
          Signup
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          Existing User? <Link to={'/login'}>Login</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
