/**
 * Project: AnimalRescue
 * File: UserListScreen.jsx
 * Author: Jarrale Butts
 * Created: 2024-09-26
 * Purpose: Displays a list of users with the ability to edit or delete users. 
 */

import React from 'react';
import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaTrash, FaTimes, FaEdit, FaCheck } from 'react-icons/fa';
import AlertMessage from '../../uiComponents/AlertMessage';
import LoadingSpinner from '../../uiComponents/LoadingSpinner';
import { toast } from 'react-toastify';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';

const UserListScreen = () => {
  // Fetch user details and handle loading and error states
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  // Mutation to delete a user
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {  // Confirm deletion
      try {
        await deleteUser(id);
        toast.success('User deleted');
        refetch();  // Refetch the list of users after deletion
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>
      {/* Show spinner during delete operation */}
      {loadingDelete && <LoadingSpinner />}

      {/* Conditional rendering */}
      {isLoading ? (
        <LoadingSpinner />  // Show spinner while loading users
      ) : error ? (
        <AlertMessage varient='danger'>
          {error?.data?.message || error.error}
        </AlertMessage> 
      ) : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />  // Green check if admin
                    ) : (
                      <FaTimes style={{ color: 'red' }} />  // Red cross if not admin
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button variant='danger' className='btn-sm' 
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />  {/* Delete button */}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        
      )}
    </>
  )
}

export default UserListScreen;