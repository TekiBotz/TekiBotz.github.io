import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';    // Used for routing
import { calculateAge } from '../utils/dateUtils';


const AnimalCard = ({ animal}) => {
  const age = calculateAge(animal.birthDate);
  return (
    <Card className="my-3 p-2 text-center">
      <Link to={`/animal/${animal._id}`}>
        <Card.Img src={animal.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/animal/${animal._id}`}>
            <Card.Title as="div">
                <strong>{animal.name}</strong>
            </Card.Title>
        </Link>
        <Card.Text>
            {animal.description}
        </Card.Text>
        
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className='shorten-text'>{animal.breed}</ListGroup.Item>
        <ListGroup.Item>{animal.animal_type}</ListGroup.Item>
        <ListGroup.Item>{age.years} years {age.months} months old</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default AnimalCard;