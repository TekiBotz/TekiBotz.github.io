import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AnimalCard from '../uiComponents/AnimalCard';
import LoadingSpinner from '../uiComponents/LoadingSpinner';
import AlertMessage from '../uiComponents/AlertMessage';
import { useGetAnimalDetailsQuery } from '../slices/animalsApiSlice';

const AnimalDetailScreen = () => {
  const { id: animalId } = useParams();  // Extract animal ID from the URL

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
            <Col md={4}>
              <AnimalCard animal={animal} />
            </Col>
            <Col md={4} className="d-flex justify-content-center align-items-center">
                <div>
                    <h3 className="text-md-right">Data Driven Charts/Graph</h3>
                </div>
            </Col>
          </Row>
        </>) }
      
    </>
  );
};

export default AnimalDetailScreen;
