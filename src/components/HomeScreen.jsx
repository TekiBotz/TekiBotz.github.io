/**
 * Project: AnimalShelter
 * File: components/HomeScreen.jsx
 * Author: Jarrale Butts
 * Created: 2024-08-24
 * Purpose: HomeScreen component for displaying a list of animals on AnimalCards, along with pagination to limit
 *          the number of animals per page.
 */

import PropTypes from 'prop-types'
import { Row, Col } from 'react-bootstrap'
import { AnimalCard } from './AnimalCard'
import LoadingSpinner from './LoadingSpinner'
import AlertMessage from './AlertMessage'
import { useState } from 'react'

// HomeScreen component
export function HomeScreen({
  animals = [],
  isLoading,
  error,
  onPageChange,
  totalCount,
}) {
  const ITEMS_PER_PAGE = 12 // Number of animals to display per page
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE)

  // Sets the current page and triggers the callback function to fetch new data.
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    onPageChange(pageNumber) // Fetch new data for the selected page
  }

  // Dynamically generates pagination buttons based on the total number of pages.
  const renderPageNumbers = () => {
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`btn btn-sm mx-1 ${
            currentPage === i ? 'btn-primary' : 'btn-secondary'
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      )
    }
    return pageNumbers
  }

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <AlertMessage variant='danger'>
          {error?.data?.message || error.error}
        </AlertMessage>
      ) : (
        <>
          <div className='my-2'>
            <h2>Rescue A Pet</h2>
          </div>
          <Row>
            {animals.map((animal) => (
              <Col key={animal._id} sm={12} md={6} lg={4} xl={3}>
                <AnimalCard {...animal} />
              </Col>
            ))}
          </Row>
          <div className='d-flex justify-content-center mt-4'>
            <button
              className={`btn btn-sm mr-2 ${
                currentPage === 1 ? 'disabled' : ''
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {renderPageNumbers()}
            <button
              className={`btn btn-sm ml-2 ${
                currentPage === totalPages ? 'disabled' : ''
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  )
}

HomeScreen.propTypes = {
  animals: PropTypes.arrayOf(PropTypes.shape(AnimalCard.propTypes)).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
  totalCount: PropTypes.number.isRequired,
}
