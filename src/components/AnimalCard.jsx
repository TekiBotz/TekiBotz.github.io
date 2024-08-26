/**
 * Project: AnimalShelter
 * File: components/AnimalCard.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-23
 * Purpose: AnimalCard component easily displays detailed information about each animal.
 *
 * Outcome: Employed strategies for building collaborative environments that
 * enable diverse audiences to support organizational decision-making in the
 * field of computer science by completing the following enhancement of the
 * updated GUI and admin SPA were designed with user experience in mind,
 * presenting data in a clear and accessible manner.
 */

import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import { calculateAge } from '../utils/dateUtils'

// AnimalCard component
export function AnimalCard({
  date_of_birth,
  _id,
  name,
  breed,
  sex_upon_outcome,
  animal_type,
}) {
  // Calculate the age of the animal based on the date of birth
  const age = calculateAge(date_of_birth)

  // Dynamically assign stock images based on animal type
  const imagePath =
    animal_type === 'Dog' ? '/images/dogIcon.png' : '/images/catIcon.png'

  return (
    <Card className='my-3 p-2 text-center'>
      {/* Link to the AnimalDetailScreen */}
      <a href={`/animal/${_id}`}>
        <Card.Img
          style={{ width: '150px', height: '150px' }}
          src={imagePath}
          variant='top'
        />
      </a>

      <Card.Body>
        {/* Link to the AnimalDetailScreen */}
        <a href={`/animal/${_id}`}>
          <Card.Title>
            <strong>{name || 'Need A Name'}</strong>
          </Card.Title>
        </a>
      </Card.Body>
      <ListGroup className='list-group-flush'>
        <ListGroup.Item className='shorten-text'>{breed}</ListGroup.Item>
        <ListGroup.Item>
          {age.years} years {age.months} months old
        </ListGroup.Item>
        <ListGroup.Item>{sex_upon_outcome}</ListGroup.Item>
      </ListGroup>
    </Card>
  )
}

AnimalCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string,
  breed: PropTypes.string.isRequired,
  date_of_birth: PropTypes.string.isRequired,
  animal_type: PropTypes.oneOf(['Dog', 'Cat']).isRequired,
  sex_upon_outcome: PropTypes.string.isRequired,
}
