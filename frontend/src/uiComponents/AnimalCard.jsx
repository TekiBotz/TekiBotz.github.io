import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';    // Used for routing
import { calculateAge } from '../utils/dateUtils';


const AnimalCard = ({ animal }) => {
  const age = calculateAge(animal.date_of_birth);
  const imagePath = animal.animal_type === 'Dog' ? '/images/dogIcon.png' : '/images/catIcon.png';   // Images can be added for the different animals at a later date, this will dynamically assign a stock image
  return (
    <Card className="my-3 p-2 text-center">
      <Link to={`/animal/${animal._id}`}>
        <Card.Img style={{ width: '150px', height: '150px' }} src={imagePath} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/animal/${animal._id}`}>
            <Card.Title>
                <strong>{animal.name}</strong>
            </Card.Title>
        </Link>
        
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className='shorten-text'>{animal.breed}</ListGroup.Item>
        <ListGroup.Item>{age.years} years {age.months} months old</ListGroup.Item>
        <ListGroup.Item>{animal.sex_upon_outcome}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default AnimalCard;