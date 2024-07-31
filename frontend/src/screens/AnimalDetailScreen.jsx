import { React, useState, useEffect } from 'react';   // Used to connect to an external system
import { useParams, Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import AnimalCard from '../uiComponents/AnimalCard';
import axios from 'axios';

const AnimalDetailScreen = () => {
  const [animal, setAnimal] = useState({});

  const { id: animalId } = useParams();

  useEffect(() => {
    const fetchAnimal = async () => {
      const { data } = await axios.get(`/api/animals/${animalId}`);
      setAnimal(data);
    };
    
    fetchAnimal();
  }, [animalId]);

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
