/**
 * Project: AnimalRescue
 * File: AnimalCard.jsx
 * Author: Jarrale Butts
 * Created: 2024-09-16
 * Purpose: Displays a card for each animal with details and image.
 */

import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import { calculateAge } from '../utils/dateUtils';


const AnimalCard = ({ animal }) => {
  const age = calculateAge(animal.date_of_birth);

  // Images will dynamically assign stock images
  const imagePath = animal.animal_type === 'Dog' ? '/images/dogIcon.png' : '/images/catIcon.png';

  return (
    <Card className="my-3 p-2 text-center">
      {/* Link to the AnimalDetailScreen */}
      <Link to={`/animal/${animal._id}`}>
        <Card.Img style={{ width: '150px', height: '150px' }} src={imagePath} variant="top" />
      </Link>

      <Card.Body>
        {/* Link to the AnimalDetailScreen */}
        <Link to={`/animal/${animal._id}`}>
            <Card.Title>
                <strong>{animal.name || 'Need A Name'}</strong>
            </Card.Title>
        </Link>
      </Card.Body>

      {/* List group showing breed, age, and sex */}
      <ListGroup className="list-group-flush">
        <ListGroup.Item className='shorten-text'>{animal.breed}</ListGroup.Item>
        <ListGroup.Item>{age.years} years {age.months} months old</ListGroup.Item>
        <ListGroup.Item>{animal.sex_upon_outcome}</ListGroup.Item>
      </ListGroup>
    </Card>
  );
}

export default AnimalCard;