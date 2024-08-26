/**
 * Project: AnimalShelter
 * File: screens/Login.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-24
 * Purpose: Handles user login functionality.
 *
 * Outcome: Developed a security mindset that anticipates adversarial
 * exploits in software architecture and designs to expose potential
 * vulnerabilities, mitigate design flaws, and ensure privacy and
 * enhanced security of data and resources by completing the following
 * enhancements of transitioning from a Jupyter dashboard to a
 * full-stack web app while using industry security practices and
 * implementing features like login functionality would enhance security
 * by ensuring that only authorized users can access certain features
 * or data, thereby mitigating potential vulnerabilities.
 */

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { FormContainer } from '../components/FormContainer.jsx'
import { login } from '../api/users.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Login() {
  // State variables for form inputs
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Access setToken function from AuthContext to store the JWT token after successful login
  const { setToken } = useAuth()

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate()

  // useMutation hook to handle the login process
  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token) // Store the token in the context
      navigate('/') // Redirect to the home page after successful login
    },
    onError: () => alert('failed to login!'),
  })

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate() // Trigger the login mutation
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>

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
          value={loginMutation.isPending ? 'Logging in...' : 'Log In'}
          disabled={!username || !password || loginMutation.isPending}
          variant='primary'
          className='mt-2'
        >
          Login
        </Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New User? <Link to={'/signup'}>Signup</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}
