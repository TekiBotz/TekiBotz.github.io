import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import animals from '../animals';
import AnimalCard from '../uiComponents/AnimalCard';

const AnimalDetailScreen = () => {
  const { id: animalID } = useParams();
  const animal = animals.find((p) => p._id === animalID);

  if (!animal) {
    return (
      <div>
        <Link to='/'>
          <i className="bi bi-arrow-left-circle-fill text-dark fs-1"></i>
        </Link>
        <h2 className='my-3 p-5'>The pet your looking for may have already been adopted! :D</h2>
      </div>
    );
  }

  return (
    <>
      <Link to='/'>
        <i className="bi bi-arrow-left-circle-fill text-dark fs-1"></i>
      </Link>
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
    </>
  );
};

export default AnimalDetailScreen;
