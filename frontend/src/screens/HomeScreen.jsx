import React from 'react';
import { Row, Col } from 'react-bootstrap';
import AnimalCard from '../uiComponents/AnimalCard';
import animals from '../animals';

const HomeScreen = () => {
  return (
    <>
        <div className='my-2'>
        <h2>Rescue A Pet</h2>
        </div>
        
        <Row>
            {animals.map((animal) => (
                <Col key={animal._id} sm={12} md={6} lg={4} xl={3}>
                    <AnimalCard animal={animal} />
                </Col>
            ))}
        </Row>
    </>
  );
};

export default HomeScreen