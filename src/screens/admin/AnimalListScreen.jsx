/**
 * Project: AnimalShelter
 * File: admin/AnimalListScreen.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-25
 * Purpose: Displays more information than to non-admin users as a list of animals
 * currently in the shelter in a tabular format.
 *
 * Outcome: Employed strategies for building collaborative environments that
 * enable diverse audiences to support organizational decision-making in the
 * field of computer science by completing the following enhancement of the
 * updated GUI and admin SPA were designed with user experience in mind,
 * presenting data in a clear and accessible manner.
 */

import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAnimals } from '../../api/animals'
import { AnimalTable } from '../../components/AnimalTable'
import { Row, Col, Container } from 'react-bootstrap'
import LoadingSpinner from '../../components/LoadingSpinner'
import AlertMessage from '../../components/AlertMessage'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export function AnimalListScreen() {
  // Fetch the list of animals
  const {
    data: animals = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['animals'],
    queryFn: getAnimals,
  })

  return (
    <>
      <Header />
      <main>
        <Container>
          <Row className='align-items-center'>
            {/* Back arrow allows users to naviate to home screen */}
            <Link to='/'>
              <i className='bi bi-arrow-left-circle-fill text-dark fs-1'></i>
            </Link>
            <Col className='text-center'>
              <h1>Animals In Shelter</h1>
            </Col>
          </Row>

          {/* Conditional rendering */}
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <AlertMessage varient='danger'>{error.data.message}</AlertMessage>
          ) : (
            <>
              {/* Table displaying animal data */}
              <AnimalTable animals={animals} />
            </>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}

AnimalListScreen.propTypes = {
  data: PropTypes.shape({
    animals: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string,
        breed: PropTypes.string.isRequired,
        date_of_birth: PropTypes.string.isRequired,
        sex_upon_outcome: PropTypes.string.isRequired,
        animal_type: PropTypes.oneOf(['Dog', 'Cat']).isRequired,
      }),
    ),
  }),
}
