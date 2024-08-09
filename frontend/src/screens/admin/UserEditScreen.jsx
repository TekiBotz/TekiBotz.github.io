import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import AlertMessage from '../../uiComponents/AlertMessage.jsx';
import LoadingSpinner from '../../uiComponents/LoadingSpinner.jsx';
import FormContainer from '../../uiComponents/FormContainer';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useGetUserDetialsQuery, useUpdateUserMutation } from '../../slices/usersApiSlice.js'

const UserEditScreen = () => {
  const { id: userId } = useParams();  // Extract userId from the URL parameters

  // State hooks to hold name and email inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  // Fetch user details and handle loading and error states
  const { data: user, isLoading, error, refetch } = useGetUserDetialsQuery(userId);

  // Mutation to update user data
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();


  const navigate = useNavigate();  // Hook to navigate to another route

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // Update the user with the new data
      await updateUser({ userId, name, email, isAdmin });
      toast.success('user updated successfully');
      refetch();  // Refetch the updated user details
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Set fields with current data
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <LoadingSpinner />}
        {/* Conditional rendering */}
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <AlertMessage variant='danger'>
            {error?.data?.message || error.error}
          </AlertMessage>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='email'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-2' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;