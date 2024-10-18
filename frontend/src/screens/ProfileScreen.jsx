/**
 * Project: AnimalRescue
 * File: ProfileScreen.jsx
 * Author: Jarrale Butts
 * Created: 2024-09-20
 * Purpose: Allows users to view and update their profile information, 
 *          including name, email, and password.
 */

import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingSpinner from '../uiComponents/LoadingSpinner';
import { useProfileMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import FormContainer from '../uiComponents/FormContainer';


const ProfileScreen = () => {
  // State hooks to hold input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();  // Triggers a state change

  // Access user info from store.js
  const { userInfo } = useSelector((state) => state.auth);

  // Mutation to handle profile update
  const [updateProfile, { isLoading:loadingUpdateProfile }] = useProfileMutation();

  // Set fields with current data
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  },  [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
		e.preventDefault();
    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error('Passwords don\'t match');
    } else {
      try {
        // Call the mutation to update the profile
        const res = await updateProfile({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));  // Update store.js with credentials
        toast.success('Profile updated successfully!')
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    }
	};

  return (
    <FormContainer>
        <h2>User Profile</h2>

        {/* Form for updating profile */}
        <Form onSubmit={submitHandler}>
          {/* Name input field */}
          <Form.Group controlId='name' className='my-4'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          {/* Email input field */}
          <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
				</Form.Group>

        {/* Password input field */}
				<Form.Group controlId='password' className='my-3'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Enter password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

        {/* Password confirmation input field */}
				<Form.Group controlId='confirmPassword' className='my-3'>
					<Form.Label>Confirm Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					></Form.Control>
				</Form.Group>
        
        {/* Update button */}
        <Button type='submit' variant='primary' className='mt-2'>
					Update
				</Button>

        {/* Show spinner while profile is updating */}
        { loadingUpdateProfile && <LoadingSpinner /> }
      </Form>
    </FormContainer>
  )
}

export default ProfileScreen