import { React, useState, useEffect } from 'react';  // Used to connect to an external system
import { Row, Col } from 'react-bootstrap';
import AnimalCard from '../uiComponents/AnimalCard';
import axios from 'axios';


const HomeScreen = () => {
  const [animals, setAnimals] = useState([]);

  useEffect(() => {
    const fetchAnimals = async () => {
      const { data } = await axios.get('/api/animals');
      setAnimals(data);
    };
    
    fetchAnimals();
  }, []);

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