import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import AlertMessage from './AlertMessage';
import { useGetTopAnimalsQuery } from '../slices/animalsApiSlice';

const AnimalCarousel = () => {
  const { id: animalId } = useParams();  // Extract animal ID from the URL

  const { data: animals, isLoading, error } = useGetTopAnimalsQuery(animalId);

  return isLoading ? null : error ? (
    <AlertMessage variant='danger'>{error?.data?.message || error.error}</AlertMessage>
  ) : (
    <Carousel pause='hover' className='bg-primary mb-4'>
      {animals.map((animal) => (
        <Carousel.Item key={animal._id}>
          <Link to={`/animal/${animal._id}`}>
            <Image src={animal.image} alt={animal.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2 className='text-white text-right'>
                {animal.name} (${animal.color})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default AnimalCarousel;