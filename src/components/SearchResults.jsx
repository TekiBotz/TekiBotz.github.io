/**
 * Project: AnimalShelter
 * File: components/SearchResults.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-24
 * Purpose: Component that displays the search results for animals based on the user's query.
 *
 * Outcome: Design and evaluate computing solutions that solve a given problem using algorithmic
 * principles and computer science practices and standards appropriate to its solution, while managing
 * the trade-offs involved in design choices (data structures and algorithms) using the getAnimals function
 * and the search feature, including the pagination component, effectively meet the course outcome by
 * demonstrating a comprehensive approach to solving the problem of data retrieval and display,
 * applying key principles of computer science to achieve optimal complexity, efficiency, and performance.
 *
 *
 */

import { useQuery } from '@tanstack/react-query'
import { getAnimals } from '../api/animals'
import { useLocation, Link } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import { AnimalCard } from '../components/AnimalCard'
import LoadingSpinner from '../components/LoadingSpinner'
import AlertMessage from '../components/AlertMessage'
import { Header } from './Header'
import { Footer } from './Footer'

// SearchResults component
export function SearchResults() {
  // Extract the 'query' parameter from the URL
  const query = new URLSearchParams(useLocation().search).get('query')

  // Fetch animals matching the search query using React Query
  const {
    data: animals,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['searchAnimals', query],
    queryFn: () => getAnimals({ breed: query }), // Ensure the backend supports filtering by breed
    enabled: !!query, // Only run the query if the query parameter is present
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
              <h1>Search Results</h1>
            </Col>
          </Row>
          {/* Contitional Rendering */}
          {isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <AlertMessage variant='danger'>
              {error?.message || 'An error occurred while fetching results'}
            </AlertMessage>
          ) : (
            <>
              <Row>
                {animals.length > 0 ? (
                  animals.map((animal) => (
                    <Col key={animal._id} sm={12} md={6} lg={4} xl={3}>
                      <AnimalCard {...animal} />
                    </Col>
                  ))
                ) : (
                  <div>No results found</div>
                )}
              </Row>
            </>
          )}
        </Container>
      </main>

      <Footer />
    </>
  )
}
