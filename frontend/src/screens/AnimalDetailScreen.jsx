/**
 * Project: AnimalRescue
 * File: AnimalDetailScreen.jsx
 * Author: Jarrale Butts
 * Created: 2024-09-17
 * Purpose: Displays the details of a specific animal based on its ID.
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AnimalCard from '../uiComponents/AnimalCard';
import LoadingSpinner from '../uiComponents/LoadingSpinner';
import AlertMessage from '../uiComponents/AlertMessage';
import { useGetAnimalDetailsQuery } from '../slices/animalsApiSlice';

const AnimalDetailScreen = () => {
  // Get the animal ID from the route parameters
  const { id: animalId } = useParams();

  // Fetch animal details based on the animal ID
  const { data: animal, isLoading, error } = useGetAnimalDetailsQuery(animalId);

  return (
    <>
      {/* Back arrow allows users to naviate to home screen */}
      <Link to='/'>
        <i className="bi bi-arrow-left-circle-fill text-dark fs-1"></i>
      </Link>
      {/* Conditional rendering */}
      { isLoading ? (
          <LoadingSpinner/>
      ) : error ? (
          <AlertMessage varient='danger'>
            {error?.data?.message || error.error}
          </AlertMessage>
      ) : (
        <>
          <Row className="my-3">
            <Col md={6} className="mx-auto">
              {/* Display animal card with its details */}
              <AnimalCard animal={animal} />
            </Col>
          </Row>
        </>) }
      
    </>
  );
};

export default AnimalDetailScreen;
