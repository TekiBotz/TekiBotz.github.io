/**
 * Project: AnimalShelter
 * File: screens/AnimalDetailScreen.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-24
 * Purpose: Displays detailed information about a specific animal.
 */

import { useParams, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getAnimalById } from '../api/animals'
import { AnimalCard } from '../components/AnimalCard'
import { Header } from '../components/Header'
import { Container } from 'react-bootstrap'
import { Footer } from '../components/Footer'
import { Row, Col } from 'react-bootstrap'
import LoadingSpinner from '../components/LoadingSpinner'
import AlertMessage from '../components/AlertMessage'
import 'bootstrap-icons/font/bootstrap-icons.css'

export function AnimalDetailScreen() {
  // Get the animal ID from the route parameters
  const { id } = useParams()

  // Fetch the specific animal by ID
  const {
    data: animal,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['animal', id],
    queryFn: () => getAnimalById(id),
  })

  return (
    <>
      <Header />
      <main>
        <Container>
          {/* Back arrow allows users to naviate to home screen */}
          <Link to='/'>
            <i className='bi bi-arrow-left-circle-fill text-dark fs-1'></i>
          </Link>
          {/* Conditional rendering */}
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <AlertMessage variant='danger'>
              {error?.message || 'An error occurred while fetching results'}
            </AlertMessage>
          ) : (
            <>
              <Row className='my-3'>
                <Col md={6}>
                  <AnimalCard {...animal} />
                </Col>
              </Row>
            </>
          )}
        </Container>
      </main>
      <Footer />
    </>
  )
}
